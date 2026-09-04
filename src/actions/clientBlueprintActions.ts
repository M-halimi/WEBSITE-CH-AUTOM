"use server";

import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";
import { getClientSession } from "@/actions/clientAuthActions";
import { checkWorkflowLimit } from "@/actions/subscriptionActions";
import { canAccessWorkflow } from "@/lib/subscriptions";

export async function getMarketplaceBlueprints() {
  try {
    const workflows = await prisma.workflow.findMany({
      where: { status: "PUBLISHED" },
      include: {
        category: true,
        platforms: { include: { platform: true } },
        steps: { orderBy: { order: "asc" } },
      },
      orderBy: { views: "desc" },
    });
    return workflows;
  } catch (error) {
    console.error("Error fetching marketplace blueprints:", error);
    return [];
  }
}

export async function activateBlueprintForClient(workflowId: string, customConfig?: any) {
  const session = await getClientSession();
  if (!session) {
    return { success: false, authRequired: true, error: "Please log in to activate this workflow blueprint." };
  }

  const access = await canAccessWorkflow(session.id);
  if (!access.canOpen) {
    return {
      success: false,
      subscriptionRequired: true,
      subscriptionState: access.state,
      error: "An active SaaS subscription is required to activate workflows.",
    };
  }

  // Plan-level workflow quotas are evaluated only after the central access check.
  const quota = await checkWorkflowLimit(session.id);
  if (!quota.allowed) {
    return {
      success: false,
      error: `You have reached the maximum active workflow limit for your ${quota.planName} plan (${quota.limit} workflow). Please upgrade your plan to activate additional blueprints.`,
      limitReached: true,
    };
  }

  try {
    const blueprint = await prisma.workflow.findFirst({
      where: { id: workflowId, status: "PUBLISHED" },
      include: {
        steps: { orderBy: { order: "asc" } },
        platforms: { include: { platform: true } },
      },
    });

    if (!blueprint) {
      return { success: false, error: "Workflow blueprint not found." };
    }

    // Generate unique dedicated webhook endpoint for client
    const webhookSlug = `hook_${session.id.slice(0, 6)}_${blueprint.slug.slice(0, 10)}`;
    const generatedWebhookUrl = `https://api.autoflows.com/v1/webhook/${webhookSlug}`;

    let projectId = "";

    // Try creating full relational clientWorkflowRequest
    if ((prisma as any).clientWorkflowRequest) {
      try {
        const clientProject = await (prisma as any).clientWorkflowRequest.create({
          data: {
            userId: session.id,
            subscriptionId: quota.subscriptionId || null,
            title: blueprint.title,
            businessName: session.company || session.name,
            businessType: session.businessType || "E-commerce",
            problemDescription: `Pre-configured production blueprint: ${blueprint.summary}`,
            desiredAutomationDesc: blueprint.description,
            expectedResult: blueprint.outcomesDescription || "Turnkey automated execution.",
            status: "APPROVED", // Immediately active & approved!
            progress: 100, // Ready to run
            assignedToName: "AutoFlows Engine (Turnkey)",
            estimatedDeliveryTime: "Instant Active",
            priority: "HIGH",
            
            steps: {
              create: (blueprint.steps || []).map((step, idx) => ({
                phase: "DESIRED",
                order: step.order || idx + 1,
                title: step.name,
                description: step.description || `Node execution for ${step.appName || "Engine"}`,
                tool: step.appName || "Automation Node",
                expectedResult: "Automated webhook trigger & data payload processed",
              })),
            },

            integrations: {
              create: (blueprint.platforms || []).map((p) => ({
                toolName: p.platform.name,
                purpose: `Connected for ${blueprint.title}`,
                hasApi: true,
              })),
            },

            activities: {
              create: {
                actorId: session.id,
                actorName: session.name || "Client",
                actorRole: "CLIENT",
                type: "CREATED",
                description: `Client activated ready-made blueprint "${blueprint.title}". Dedicated Webhook: ${generatedWebhookUrl}`,
              },
            },
          },
        });
        projectId = clientProject.id;
      } catch (tableErr) {
        console.warn("Notice: Falling back to leadRequest table for blueprint activation:", tableErr);
      }
    }

    // Graceful fallback to LeadRequest table if clientWorkflowRequest table is not yet pushed
    if (!projectId) {
      const fallback = await prisma.leadRequest.create({
        data: {
          name: session.name || "Client",
          email: session.email,
          whatsapp: session.phone || null,
          company: session.company || session.name || "Company",
          workflowId: blueprint.id,
          status: "APPROVED",
          message: JSON.stringify({
            title: blueprint.title,
            type: "BLUEPRINT_ACTIVATION",
            webhookUrl: generatedWebhookUrl,
            progress: 100,
            summary: blueprint.summary,
            description: blueprint.description,
            steps: (blueprint.steps || []).map((s, idx) => ({
              order: idx + 1,
              title: s.name,
              tool: s.appName || "Engine",
              phase: "DESIRED",
              expectedResult: "Automated webhook execution",
            })),
            integrations: (blueprint.platforms || []).map((p) => ({
              toolName: p.platform.name,
            })),
          }),
        },
      });
      projectId = fallback.id;
    }

    // Increment used quota on subscription if subscription model exists
    if (quota.subscriptionId && (prisma as any).subscription) {
      try {
        await (prisma as any).subscription.update({
          where: { id: quota.subscriptionId },
          data: { usedWorkflowsCount: { increment: 1 } },
        });
      } catch (e) {}
    }

    revalidatePath("/dashboard");
    revalidatePath("/dashboard/workflows");
    revalidatePath("/dashboard/blueprints");

    return {
      success: true,
      projectId,
      webhookUrl: generatedWebhookUrl,
      message: `Blueprint "${blueprint.title}" is now active in your workspace!`,
    };
  } catch (error: any) {
    console.error("Error activating blueprint:", error);
    return { success: false, error: error.message || "Failed to activate workflow." };
  }
}

export async function toggleDeployedWorkflowStatus(projectId: string, currentStatus: string) {
  const session = await getClientSession();
  if (!session) {
    return { success: false, error: "Unauthorized." };
  }
  if (!(await canAccessWorkflow(session.id)).canOpen) {
    return { success: false, error: "An active subscription is required." };
  }

  try {
    const newStatus = currentStatus === "APPROVED" || currentStatus === "COMPLETED" ? "PAUSED" : "APPROVED";
    
    if ((prisma as any).clientWorkflowRequest) {
      try {
        await (prisma as any).clientWorkflowRequest.updateMany({
          where: { id: projectId, userId: session.id },
          data: { status: newStatus },
        });
      } catch (e) {}
    }

    // Fallback update on leadRequest
    try {
      await prisma.leadRequest.updateMany({
        where: { id: projectId, email: session.email },
        data: { status: newStatus },
      });
    } catch (e) {}

    revalidatePath(`/dashboard/workflows/${projectId}`);
    revalidatePath("/dashboard/workflows");
    revalidatePath("/dashboard");

    return { success: true, newStatus };
  } catch (error: any) {
    return { success: false, error: error.message || "Failed to update status." };
  }
}
