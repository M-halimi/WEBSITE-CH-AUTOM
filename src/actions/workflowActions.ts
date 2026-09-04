"use server";

import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";
import { slugify } from "@/lib/utils";
import { requireAdminSession } from "@/actions/authActions";

import { StepInput, WorkflowFormData } from "@/types/workflow";

export async function createWorkflow(data: WorkflowFormData) {
  await requireAdminSession();
  try {
    const slug = data.slug ? slugify(data.slug) : slugify(data.title);

    // Check slug collision
    const existing = await prisma.workflow.findUnique({ where: { slug } });
    const finalSlug = existing ? `${slug}-${Date.now().toString().slice(-4)}` : slug;

    const workflow = await prisma.workflow.create({
      data: {
        title: data.title,
        slug: finalSlug,
        summary: data.summary,
        description: data.description,
        difficulty: data.difficulty || "BEGINNER",
        estimatedTime: data.estimatedTime || "15 mins",
        status: data.status || "DRAFT",
        featured: data.featured || false,
        imageUrl: data.imageUrl || null,
        categoryId: data.categoryId || null,
        triggersDescription: data.triggersDescription,
        outcomesDescription: data.outcomesDescription,
        stepsCount: data.steps.length,
        platforms: data.platformIds && data.platformIds.length > 0
          ? {
              create: data.platformIds.map((platformId) => ({
                platform: { connect: { id: platformId } },
              })),
            }
          : undefined,
        tags: data.tagIds && data.tagIds.length > 0
          ? {
              create: data.tagIds.map((tagId) => ({
                tag: { connect: { id: tagId } },
              })),
            }
          : undefined,
        steps: {
          create: data.steps.map((step, idx) => ({
            order: step.order || idx + 1,
            name: step.name,
            type: step.type || "ACTION",
            appName: step.appName,
            description: step.description,
            icon: step.icon,
          })),
        },
      },
    });

    revalidatePath("/workflows");
    revalidatePath("/admin/workflows");
    revalidatePath("/");

    return { success: true, workflow };
  } catch (error: any) {
    console.error("Create workflow error:", error);
    return { success: false, error: error.message || "Failed to create workflow." };
  }
}

export async function updateWorkflow(id: string, data: WorkflowFormData) {
  await requireAdminSession();
  try {
    const slug = data.slug ? slugify(data.slug) : slugify(data.title);

    // Delete existing steps and recreate them cleanly
    await prisma.workflowStep.deleteMany({
      where: { workflowId: id },
    });

    // Delete existing platform and tag links
    await prisma.workflowOnPlatform.deleteMany({
      where: { workflowId: id },
    });
    await prisma.workflowOnTag.deleteMany({
      where: { workflowId: id },
    });

    const workflow = await prisma.workflow.update({
      where: { id },
      data: {
        title: data.title,
        slug,
        summary: data.summary,
        description: data.description,
        difficulty: data.difficulty,
        estimatedTime: data.estimatedTime,
        status: data.status,
        featured: data.featured,
        imageUrl: data.imageUrl !== undefined ? data.imageUrl : undefined,
        categoryId: data.categoryId || null,
        triggersDescription: data.triggersDescription,
        outcomesDescription: data.outcomesDescription,
        stepsCount: data.steps.length,
        platforms: data.platformIds && data.platformIds.length > 0
          ? {
              create: data.platformIds.map((platformId) => ({
                platform: { connect: { id: platformId } },
              })),
            }
          : undefined,
        tags: data.tagIds && data.tagIds.length > 0
          ? {
              create: data.tagIds.map((tagId) => ({
                tag: { connect: { id: tagId } },
              })),
            }
          : undefined,
        steps: {
          create: data.steps.map((step, idx) => ({
            order: step.order || idx + 1,
            name: step.name,
            type: step.type || "ACTION",
            appName: step.appName,
            description: step.description,
            icon: step.icon,
          })),
        },
      },
    });

    revalidatePath("/workflows");
    revalidatePath(`/workflows/${slug}`);
    revalidatePath("/admin/workflows");
    revalidatePath("/");

    return { success: true, workflow };
  } catch (error: any) {
    console.error("Update workflow error:", error);
    return { success: false, error: error.message || "Failed to update workflow." };
  }
}

export async function deleteWorkflow(id: string) {
  await requireAdminSession();
  try {
    await prisma.workflow.delete({
      where: { id },
    });
    revalidatePath("/workflows");
    revalidatePath("/admin/workflows");
    revalidatePath("/");
    return { success: true };
  } catch (error: any) {
    console.error("Delete workflow error:", error);
    return { success: false, error: "Failed to delete workflow" };
  }
}

export async function togglePublishStatus(id: string, currentStatus: string) {
  await requireAdminSession();
  try {
    const newStatus = currentStatus === "PUBLISHED" ? "DRAFT" : "PUBLISHED";
    await prisma.workflow.update({
      where: { id },
      data: { status: newStatus },
    });
    revalidatePath("/workflows");
    revalidatePath("/admin/workflows");
    revalidatePath("/");
    return { success: true, status: newStatus };
  } catch (error: any) {
    console.error("Toggle publish error:", error);
    return { success: false, error: "Failed to toggle status" };
  }
}

export async function parseN8nJson(jsonString: string) {
  await requireAdminSession();
  try {
    const parsed = JSON.parse(jsonString);
    const nodes = parsed.nodes || [];
    
    const detectedNodes = nodes.map((node: any, idx: number) => {
      const typeStr = (node.type || "").toLowerCase();
      let stepType = "ACTION";
      if (typeStr.includes("webhook") || typeStr.includes("trigger") || idx === 0) {
        stepType = "TRIGGER";
      } else if (typeStr.includes("if") || typeStr.includes("switch") || typeStr.includes("router")) {
        stepType = "CONDITION";
      } else if (typeStr.includes("code") || typeStr.includes("function") || typeStr.includes("set")) {
        stepType = "TRANSFORM";
      }

      // Extract clean app name
      const rawName = node.name || node.type?.split(".").pop() || `Node ${idx + 1}`;
      const appName = node.type?.split(".").slice(-2, -1)[0] || "n8n Node";

      return {
        order: idx + 1,
        name: rawName,
        type: stepType,
        appName: appName.charAt(0).toUpperCase() + appName.slice(1),
        description: `Configured parameters: ${Object.keys(node.parameters || {}).slice(0, 3).join(", ") || "Standard node execution"}`,
      };
    });

    const workflowTitle = parsed.name || "Imported n8n Workflow";

    return {
      success: true,
      data: {
        title: workflowTitle,
        nodesCount: nodes.length,
        steps: detectedNodes,
      },
    };
  } catch (err: any) {
    return { success: false, error: "Invalid JSON format: " + err.message };
  }
}

export async function createPlatform(name: string, color: string = "amber") {
  await requireAdminSession();
  try {
    const trimmed = name.trim();
    if (!trimmed) {
      return { success: false, error: "Platform name cannot be empty." };
    }
    const slug = slugify(trimmed);

    // Check if platform already exists
    let existing = await prisma.platform.findFirst({
      where: {
        OR: [{ slug }, { name: { equals: trimmed } }],
      },
    });

    if (existing) {
      return { success: true, platform: existing };
    }

    const platform = await prisma.platform.create({
      data: {
        name: trimmed,
        slug,
        color,
      },
    });

    revalidatePath("/admin/workflows/new");
    revalidatePath("/admin/workflows");
    revalidatePath("/workflows");

    return { success: true, platform };
  } catch (error: any) {
    return { success: false, error: error.message || "Failed to create platform." };
  }
}

