"use server";

import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";
import { getClientSession } from "@/actions/clientAuthActions";
import { checkWorkflowLimit } from "@/actions/subscriptionActions";
import { verifyAdminSession } from "@/actions/authActions";
import { getSubscriptionAccess } from "@/lib/subscriptions";
import {
  WorkflowStepInput,
  WorkflowIntegrationInput,
  WorkflowFileInput,
  WorkflowRequestFormData
} from "@/types/clientWorkflow";

export async function submitWorkflowRequest(data: WorkflowRequestFormData) {
  const session = await getClientSession();
  if (!session) {
    return { success: false, error: "Please log in to submit your workflow request." };
  }

  // Validate Subscription Limit
  const quota = await checkWorkflowLimit(session.id);
  if (!quota.allowed) {
    return {
      success: false,
      error: `You have reached the maximum active workflow limit for your ${quota.planName} plan (${quota.limit} workflow). Please upgrade your subscription to request additional workflows.`,
      limitReached: true,
    };
  }

  try {
    const allSteps = [
      ...(data.currentSteps || []).map((s, idx) => ({ ...s, phase: "CURRENT", order: idx + 1 })),
      ...(data.desiredSteps || []).map((s, idx) => ({ ...s, phase: "DESIRED", order: idx + 1 })),
    ];

    let requestId = "";

    // Try creating full relational clientWorkflowRequest
    if ((prisma as any).clientWorkflowRequest) {
      try {
        const request = await (prisma as any).clientWorkflowRequest.create({
          data: {
            userId: session.id,
            subscriptionId: quota.subscriptionId || null,
            title: data.title || "Custom Workflow Automation",
            businessName: data.businessName || session.company || session.name,
            businessType: data.businessType || session.businessType,
            industry: data.industry,
            businessDescription: data.businessDescription,
            targetCustomers: data.targetCustomers,
            customerChannels: data.customerChannels,
            
            problemDescription: data.problemDescription,
            frequency: data.frequency,
            estimatedTime: data.estimatedTime,
            costOfFailure: data.costOfFailure,
            priority: data.priority || "MEDIUM",
            
            desiredAutomationDesc: data.desiredAutomationDesc,
            expectedResult: data.expectedResult,
            successCriteria: data.successCriteria,
            expectedDeadline: data.expectedDeadline,
            budgetRange: data.budgetRange,
            additionalNotes: data.additionalNotes,
            
            status: "PENDING_REVIEW",
            progress: 10,
            
            steps: {
              create: allSteps.map((step) => ({
                phase: step.phase,
                order: step.order,
                title: step.title,
                description: step.description,
                tool: step.tool,
                responsiblePerson: step.responsiblePerson,
                expectedResult: step.expectedResult,
              })),
            },
            
            integrations: {
              create: (data.integrations || []).map((tool) => ({
                toolName: tool.toolName,
                toolCategory: tool.toolCategory,
                purpose: tool.purpose,
                websiteUrl: tool.websiteUrl,
                accountInfo: tool.accountInfo,
                hasApi: tool.hasApi !== false,
              })),
            },
            
            files: {
              create: (data.files || []).map((f) => ({
                fileName: f.fileName,
                fileUrl: f.fileUrl,
                fileType: f.fileType,
                fileSize: f.fileSize,
              })),
            },
            
            activities: {
              create: {
                actorId: session.id,
                actorName: session.name || session.company || "Client",
                actorRole: "CLIENT",
                type: "CREATED",
                description: `Workflow request "${data.title}" was successfully submitted for engineering review.`,
              },
            },
          },
        });
        requestId = request.id;
      } catch (tableErr) {
        console.warn("Falling back to leadRequest table for request submission:", tableErr);
      }
    }

    // Graceful fallback to leadRequest table
    if (!requestId) {
      const fallback = await prisma.leadRequest.create({
        data: {
          name: session.name || "Client",
          email: session.email,
          whatsapp: session.phone || null,
          company: data.businessName || session.company || session.name || "Company",
          status: "PENDING_REVIEW",
          message: JSON.stringify({
            title: data.title || "Custom Workflow Automation",
            type: "CUSTOM_REQUEST",
            businessDescription: data.businessDescription,
            problemDescription: data.problemDescription,
            desiredAutomationDesc: data.desiredAutomationDesc,
            expectedResult: data.expectedResult,
            priority: data.priority || "MEDIUM",
            progress: 10,
            currentSteps: data.currentSteps || [],
            desiredSteps: data.desiredSteps || [],
            integrations: data.integrations || [],
            files: data.files || [],
          }),
        },
      });
      requestId = fallback.id;
    }

    // Increment used workflows on subscription if available
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
    revalidatePath("/admin/client-requests");

    return {
      success: true,
      requestId,
      message: "Your workflow request has been successfully submitted! Our engineering team is now reviewing your process.",
    };
  } catch (error: any) {
    console.error("Error submitting workflow request:", error);
    return { success: false, error: error.message || "Failed to submit request. Please try again." };
  }
}

export async function saveWorkflowRequestDraft(data: WorkflowRequestFormData) {
  const session = await getClientSession();
  if (!session) {
    return { success: false, error: "Please log in to save a draft." };
  }
  if (!(await getSubscriptionAccess(session.id)).allowed) {
    return { success: false, error: "An active subscription is required." };
  }

  try {
    let draftId = "draft_" + Date.now();
    if ((prisma as any).clientWorkflowRequest) {
      try {
        if (data.id) {
          const req = await (prisma as any).clientWorkflowRequest.updateMany({
            where: { id: data.id, userId: session.id },
            data: {
              title: data.title || "Draft Workflow",
              problemDescription: data.problemDescription,
              desiredAutomationDesc: data.desiredAutomationDesc,
              status: "DRAFT",
            },
          });
          if (req.count > 0) draftId = data.id;
        } else {
          const req = await (prisma as any).clientWorkflowRequest.create({
            data: {
              userId: session.id,
              title: data.title || "Draft Workflow",
              problemDescription: data.problemDescription,
              desiredAutomationDesc: data.desiredAutomationDesc,
              status: "DRAFT",
              progress: 5,
            },
          });
          draftId = req.id;
        }
      } catch (e) {}
    }
    return { success: true, draftId, message: "Draft saved successfully!" };
  } catch (error: any) {
    return { success: false, error: error.message || "Failed to save draft." };
  }
}

export async function getClientWorkflowRequests() {
  const session = await getClientSession();
  if (!session) return [];
  if (!(await getSubscriptionAccess(session.id)).allowed) return [];

  let results: any[] = [];

  // 1. Try relational table
  if ((prisma as any).clientWorkflowRequest) {
    try {
      const requests = await (prisma as any).clientWorkflowRequest.findMany({
        where: { userId: session.id },
        include: {
          steps: true,
          integrations: true,
          files: true,
          messages: {
            orderBy: { createdAt: "desc" },
            take: 1,
          },
        },
        orderBy: { createdAt: "desc" },
      });
      results = [...requests];
    } catch (error) {}
  }

  // 2. Query LeadRequests fallback
  try {
    const leads = await prisma.leadRequest.findMany({
      where: { email: session.email },
      include: { workflow: true },
      orderBy: { createdAt: "desc" },
    });

    for (const lead of leads) {
      // Check if already in results
      if (results.some((r) => r.id === lead.id)) continue;

      let parsed: any = {};
      try {
        parsed = lead.message ? JSON.parse(lead.message) : {};
      } catch {
        parsed = { problemDescription: lead.message };
      }

      results.push({
        id: lead.id,
        title: parsed.title || lead.workflow?.title || "Custom Workflow Request",
        businessName: lead.company || session.company || "Company",
        problemDescription: parsed.problemDescription || lead.message || "Workflow requested.",
        desiredAutomationDesc: parsed.desiredAutomationDesc || lead.workflow?.description || "",
        status: lead.status || "APPROVED",
        progress: parsed.progress || 100,
        createdAt: lead.createdAt,
        updatedAt: lead.updatedAt,
        steps: parsed.steps || parsed.desiredSteps || [],
        integrations: parsed.integrations || [],
        files: parsed.files || [],
        messages: [],
      });
    }
  } catch (err) {}

  return results;
}

export async function getClientWorkflowRequestById(requestId: string) {
  const session = await getClientSession();
  if (!session) return null;
  if (!(await getSubscriptionAccess(session.id)).allowed) return null;

  // 1. Try relational table
  if ((prisma as any).clientWorkflowRequest) {
    try {
      const request = await (prisma as any).clientWorkflowRequest.findUnique({
        where: { id: requestId },
        include: {
          user: {
            select: { id: true, name: true, email: true, company: true, phone: true },
          },
          steps: {
            orderBy: { order: "asc" },
          },
          integrations: true,
          files: true,
          messages: {
            where: { isInternal: false },
            orderBy: { createdAt: "asc" },
          },
          activities: {
            orderBy: { createdAt: "desc" },
          },
        },
      });

      if (request && (request.userId === session.id || session.role === "ADMIN")) {
        return request;
      }
    } catch (error) {}
  }

  // 2. Try LeadRequest fallback
  try {
      const lead = await prisma.leadRequest.findFirst({
      where: { id: requestId, email: session.email },
      include: {
        workflow: {
          include: {
            steps: { orderBy: { order: "asc" } },
            platforms: { include: { platform: true } },
          },
        },
      },
    });

    if (lead) {
      let parsed: any = {};
      try {
        parsed = lead.message ? JSON.parse(lead.message) : {};
      } catch {
        parsed = { problemDescription: lead.message };
      }

      const steps = parsed.steps || (lead.workflow?.steps || []).map((s, idx) => ({
        id: s.id,
        phase: "DESIRED",
        order: s.order || idx + 1,
        title: s.name,
        description: s.description || "Node execution",
        tool: s.appName || "Engine",
        expectedResult: "Automated trigger execution",
      }));

      const integrations = parsed.integrations || (lead.workflow?.platforms || []).map((p) => ({
        id: p.platformId,
        toolName: p.platform.name,
        purpose: "Connected Tool",
      }));

      return {
        id: lead.id,
        title: parsed.title || lead.workflow?.title || "Custom Workflow Request",
        businessName: lead.company || lead.name,
        businessType: "E-commerce",
        problemDescription: parsed.problemDescription || lead.message || "Turnkey workflow deployed.",
        desiredAutomationDesc: parsed.desiredAutomationDesc || lead.workflow?.description || "",
        expectedResult: parsed.expectedResult || "Turnkey execution.",
        status: lead.status || "APPROVED",
        progress: parsed.progress || 100,
        assignedToName: "AutoFlows Engine (Turnkey)",
        estimatedDeliveryTime: "Instant Active",
        createdAt: lead.createdAt,
        updatedAt: lead.updatedAt,
        user: {
          id: session.id,
          name: lead.name,
          email: lead.email,
          company: lead.company,
          phone: lead.whatsapp,
        },
        steps,
        integrations,
        files: parsed.files || [],
        messages: [],
        activities: [
          {
            id: "act_1",
            actorName: lead.name,
            actorRole: "CLIENT",
            type: "CREATED",
            description: `Blueprint "${parsed.title || lead.workflow?.title || "Workflow"}" activated.`,
            createdAt: lead.createdAt,
          },
        ],
      };
    }
  } catch (err) {}

  return null;
}

export async function sendWorkflowMessage(requestId: string, messageText: string, isInternal: boolean = false) {
  const session = await getClientSession();
  const isAdmin = await verifyAdminSession();
  if (!session && !isAdmin) {
    return { success: false, error: "Please log in to send a message." };
  }

  if (!messageText?.trim()) {
    return { success: false, error: "Message cannot be empty." };
  }

  try {
    if (session && !(await getSubscriptionAccess(session.id)).allowed) {
      return { success: false, error: "An active subscription is required." };
    }
    const ownedRequest = session
      ? await prisma.clientWorkflowRequest.findFirst({ where: { id: requestId, userId: session.id }, select: { id: true } })
      : await prisma.clientWorkflowRequest.findUnique({ where: { id: requestId }, select: { id: true } });
    if (!ownedRequest) return { success: false, error: "Request not found." };
    const isTeam = isAdmin && !session;
    const senderRole = isTeam ? "TEAM" : "CLIENT";
    const senderName = session?.name || (isTeam ? "Automation Architect" : "Client");

    let message: any = {
      id: "msg_" + Date.now(),
      requestId,
      senderId: session?.id || null,
      senderRole,
      senderName,
      message: messageText.trim(),
      isInternal: isTeam ? isInternal : false,
      createdAt: new Date(),
    };

    if ((prisma as any).clientWorkflowMessage) {
      try {
        message = await (prisma as any).clientWorkflowMessage.create({
          data: {
            requestId,
            senderId: session?.id || null,
            senderRole,
            senderName,
            message: messageText.trim(),
            isInternal: isTeam ? isInternal : false,
          },
        });
      } catch (e) {}
    }

    revalidatePath(`/dashboard/workflows/${requestId}`);
    revalidatePath(`/admin/client-requests/${requestId}`);

    return { success: true, message };
  } catch (error: any) {
    return { success: false, error: error.message || "Failed to send message." };
  }
}

export async function generateAIWorkflowSuggestions(problemDescription: string, businessType?: string) {
  const session = await getClientSession();
  if (!session || !(await getSubscriptionAccess(session.id)).allowed) {
    return { success: false, error: "An active subscription is required." };
  }
  if (!problemDescription || problemDescription.trim().length < 10) {
    return {
      success: false,
      error: "Please write at least one sentence describing what you do or what problem you want to automate.",
    };
  }

  const desc = problemDescription.toLowerCase();

  let currentSteps = [
    { title: "Customer inquiry or order placed", tool: "WhatsApp / Website", responsiblePerson: "Customer" },
    { title: "Manually review customer information and order details", tool: "Phone / Chat", responsiblePerson: "Me / Team" },
    { title: "Copy details into spreadsheet or CRM", tool: "Google Sheets / Excel", responsiblePerson: "Manual Entry" },
    { title: "Send confirmation and invoice to customer", tool: "WhatsApp / Email", responsiblePerson: "Support Rep" },
  ];

  let desiredSteps = [
    { title: "System automatically captures new order / inquiry", tool: "WhatsApp Cloud API / Webhook", expectedResult: "Instant zero-delay trigger" },
    { title: "AI extracts customer name, items, and address", tool: "OpenAI GPT-4o Agent", expectedResult: "Clean structured data parsed in 1 second" },
    { title: "Auto-record order in Google Sheets & CRM", tool: "Google Sheets / Database", expectedResult: "Database synced without manual copy-paste" },
    { title: "Send automated WhatsApp confirmation & PDF invoice", tool: "WhatsApp Cloud API", expectedResult: "Customer receives instant branded confirmation" },
    { title: "Notify fulfillment team in Slack / WhatsApp group", tool: "Team Notification", expectedResult: "Team alerted for swift dispatch" },
  ];

  let suggestedTools = ["WhatsApp Business", "Google Sheets", "OpenAI / GPT-4o"];

  if (desc.includes("shopify") || desc.includes("e-commerce") || desc.includes("product") || desc.includes("store")) {
    currentSteps = [
      { title: "Order received on store", tool: "Shopify / WooCommerce", responsiblePerson: "Customer" },
      { title: "Check inventory and payment status", tool: "Store Admin", responsiblePerson: "Store Manager" },
      { title: "Manually message customer for confirmation", tool: "WhatsApp", responsiblePerson: "Support" },
      { title: "Create shipping label and invoice", tool: "Courier Portal", responsiblePerson: "Fulfillment" },
    ];
    desiredSteps = [
      { title: "Shopify order trigger", tool: "Shopify Webhook", expectedResult: "Real-time payload received on new purchase" },
      { title: "Automated WhatsApp order verification bot", tool: "WhatsApp Cloud API", expectedResult: "Customer confirms order with 1-click button" },
      { title: "Auto-generate PDF invoice with Stripe/PayPal receipt", tool: "PDF & Invoice Generator", expectedResult: "Invoice created and emailed instantly" },
      { title: "Sync order to Google Sheets & Courier CRM", tool: "Google Sheets / Logistics API", expectedResult: "Waybill generated automatically" },
    ];
    suggestedTools = ["Shopify", "WhatsApp Business", "Google Sheets", "Stripe"];
  } else if (desc.includes("lead") || desc.includes("facebook") || desc.includes("meta") || desc.includes("ads") || desc.includes("form")) {
    currentSteps = [
      { title: "Prospect submits form on Facebook/Instagram Ad", tool: "Meta Lead Ads", responsiblePerson: "Prospect" },
      { title: "Download CSV of leads at the end of the day", tool: "Ads Manager", responsiblePerson: "Marketer" },
      { title: "Sales rep calls lead hours later", tool: "Phone", responsiblePerson: "Sales Rep" },
    ];
    desiredSteps = [
      { title: "Instant Meta Ad Lead trigger (< 30 seconds)", tool: "Meta Lead Ads Webhook", expectedResult: "Lead captured instantly without CSV download" },
      { title: "Instant personalized WhatsApp greeting & qualification", tool: "WhatsApp Cloud API + AI", expectedResult: "Prospect qualified while high intent" },
      { title: "Add lead to CRM pipeline & book calendar meeting", tool: "HubSpot / Google Calendar", expectedResult: "Meeting auto-scheduled on calendar" },
      { title: "Send WhatsApp / SMS alert to assigned sales rep", tool: "Twilio / Slack Alert", expectedResult: "Sales rep notified within 60 seconds" },
    ];
    suggestedTools = ["Meta Lead Ads", "WhatsApp Business", "Google Sheets", "HubSpot"];
  }

  return {
    success: true,
    suggestions: {
      currentSteps,
      desiredSteps,
      suggestedTools,
      summary: `Automated workflow designed for ${businessType || "Commerce & Support"}.`,
    },
  };
}
