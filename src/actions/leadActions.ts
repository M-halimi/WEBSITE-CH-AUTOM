"use server";

import { z } from "zod";
import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";
import { requireAdminSession } from "@/actions/authActions";
import { checkRateLimit } from "@/lib/rate-limit";

const leadSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please provide a valid email address"),
  whatsapp: z.string().optional(),
  company: z.string().optional(),
  message: z.string().optional(),
  workflowId: z.string().optional(),
});

export async function submitLeadRequest(formData: FormData) {
  try {
    const rawData = {
      name: formData.get("name") as string,
      email: formData.get("email") as string,
      whatsapp: (formData.get("whatsapp") as string) || undefined,
      company: (formData.get("company") as string) || undefined,
      message: (formData.get("message") as string) || undefined,
      workflowId: (formData.get("workflowId") as string) || undefined,
    };

    const validated = leadSchema.safeParse(rawData);
    if (!validated.success) {
      return {
        success: false,
        error: validated.error.errors[0]?.message || "Invalid input data",
      };
    }

    // Rate Limiting by Email
    const { allowed } = checkRateLimit(`lead_${validated.data.email}`, 4, 60 * 1000);
    if (!allowed) {
      return {
        success: false,
        error: "Too many requests. Please wait a minute before submitting again.",
      };
    }

    const lead = await prisma.leadRequest.create({
      data: {
        name: validated.data.name,
        email: validated.data.email,
        whatsapp: validated.data.whatsapp,
        company: validated.data.company,
        message: validated.data.message,
        workflowId: validated.data.workflowId || null,
        status: "NEW",
      },
    });

    revalidatePath("/admin/requests");
    revalidatePath("/admin");

    return {
      success: true,
      leadId: lead.id,
    };
  } catch (error) {
    console.error("Lead submission error:", error);
    return {
      success: false,
      error: "Something went wrong while submitting your request. Please try again or reach out on WhatsApp.",
    };
  }
}

export async function updateLeadStatus(id: string, status: string) {
  await requireAdminSession();
  try {
    await prisma.leadRequest.update({
      where: { id },
      data: { status },
    });
    revalidatePath("/admin/requests");
    revalidatePath("/admin");
    return { success: true };
  } catch (error) {
    console.error("Update lead error:", error);
    return { success: false, error: "Failed to update status" };
  }
}

export async function deleteLeadRequest(id: string) {
  await requireAdminSession();
  try {
    await prisma.leadRequest.delete({
      where: { id },
    });
    revalidatePath("/admin/requests");
    revalidatePath("/admin");
    return { success: true };
  } catch (error) {
    console.error("Delete lead error:", error);
    return { success: false, error: "Failed to delete request" };
  }
}

