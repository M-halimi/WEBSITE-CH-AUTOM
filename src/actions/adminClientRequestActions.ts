"use server";

import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";
import { verifyAdminSession } from "@/actions/authActions";

export async function getAllAdminClientRequests(statusFilter?: string, search?: string) {
  const isAdmin = await verifyAdminSession();
  if (!isAdmin) return [];

  try {
    if ((prisma as any).clientWorkflowRequest) {
      const where: any = {};
      if (statusFilter && statusFilter !== "ALL") {
        where.status = statusFilter;
      }
      if (search && search.trim()) {
        const q = search.trim();
        where.OR = [
          { title: { contains: q } },
          { businessName: { contains: q } },
          { user: { name: { contains: q } } },
          { user: { email: { contains: q } } },
        ];
      }

      const requests = await (prisma as any).clientWorkflowRequest.findMany({
        where,
        include: {
          user: {
            select: { id: true, name: true, email: true, company: true, phone: true, country: true },
          },
          subscription: {
            include: { plan: true },
          },
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

      return requests;
    }
  } catch (error) {
    console.error("Error fetching admin client workflow requests:", error);
  }
  return [];
}

export async function getAdminClientRequestById(requestId: string) {
  const isAdmin = await verifyAdminSession();
  if (!isAdmin) return null;

  try {
    if ((prisma as any).clientWorkflowRequest) {
      const request = await (prisma as any).clientWorkflowRequest.findUnique({
        where: { id: requestId },
        include: {
          user: {
            select: { id: true, name: true, email: true, company: true, phone: true, country: true, businessType: true },
          },
          subscription: {
            include: { plan: true },
          },
          steps: {
            orderBy: { order: "asc" },
          },
          integrations: true,
          files: true,
          messages: {
            orderBy: { createdAt: "asc" }, // Admin sees both internal and public messages
          },
          activities: {
            orderBy: { createdAt: "desc" },
          },
        },
      });

      return request;
    }
  } catch (error) {
    console.error("Error fetching admin client workflow detail:", error);
  }
  return null;
}

export async function updateClientWorkflowStatus(requestId: string, status: string, progress?: number) {
  const isAdmin = await verifyAdminSession();
  if (!isAdmin) {
    return { success: false, error: "Unauthorized." };
  }

  try {
    const data: any = { status };
    if (typeof progress === "number") {
      data.progress = progress;
    } else {
      // Auto-set reasonable progress per status
      if (status === "APPROVED") data.progress = 25;
      if (status === "IN_PROGRESS") data.progress = 50;
      if (status === "TESTING") data.progress = 85;
      if (status === "COMPLETED") data.progress = 100;
    }

    const updated = await (prisma as any).clientWorkflowRequest.update({
      where: { id: requestId },
      data,
    });

    // Log Activity
    await (prisma as any).clientWorkflowActivity.create({
      data: {
        requestId,
        actorName: "AutoFlows Team",
        actorRole: "TEAM",
        type: "STATUS_CHANGE",
        description: `Project status was updated to "${status}" (${data.progress}% progress).`,
      },
    });

    revalidatePath(`/admin/client-requests/${requestId}`);
    revalidatePath(`/dashboard/workflows/${requestId}`);
    revalidatePath("/dashboard/workflows");
    revalidatePath("/dashboard");

    return { success: true, updated };
  } catch (error: any) {
    return { success: false, error: error.message || "Failed to update status." };
  }
}

export async function updateClientWorkflowEstimates(
  requestId: string,
  assignedToName: string,
  complexity: string,
  price: string,
  deliveryTime: string,
  internalNotes: string,
) {
  const isAdmin = await verifyAdminSession();
  if (!isAdmin) {
    return { success: false, error: "Unauthorized." };
  }

  try {
    const updated = await (prisma as any).clientWorkflowRequest.update({
      where: { id: requestId },
      data: {
        assignedToName: assignedToName || null,
        estimatedComplexity: complexity || null,
        estimatedPrice: price || null,
        estimatedDeliveryTime: deliveryTime || null,
        internalNotes: internalNotes || null,
      },
    });

    // Log Activity
    await (prisma as any).clientWorkflowActivity.create({
      data: {
        requestId,
        actorName: "Admin Architect",
        actorRole: "TEAM",
        type: "ESTIMATE_SET",
        description: `Updated project estimates (Delivery: ${deliveryTime || "TBD"}, Assigned: ${assignedToName || "Unassigned"}).`,
      },
    });

    revalidatePath(`/admin/client-requests/${requestId}`);
    revalidatePath(`/dashboard/workflows/${requestId}`);

    return { success: true, message: "Project estimates and assignment updated!" };
  } catch (error: any) {
    return { success: false, error: error.message || "Failed to save estimates." };
  }
}

