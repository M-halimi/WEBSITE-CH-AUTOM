"use server";

import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";
import { requireAdminSession } from "@/actions/authActions";

const allowedStatuses = ["PENDING", "ACTIVE", "EXPIRED", "CANCELLED", "SUSPENDED", "PAYMENT_FAILED"];

export async function updateSubscriptionStatus(formData: FormData) {
  await requireAdminSession();
  const id = String(formData.get("id") || "");
  const status = String(formData.get("status") || "").toUpperCase();
  if (!id || !allowedStatuses.includes(status)) throw new Error("Invalid subscription update.");
  const subscription = await prisma.subscription.findUnique({ where: { id }, select: { userId: true, billingPeriod: true } });
  if (!subscription) throw new Error("Subscription not found.");
  const data: { status: string; currentPeriodStart?: Date; currentPeriodEnd?: Date } = { status };
  if (status === "ACTIVE") {
    data.currentPeriodStart = new Date();
    data.currentPeriodEnd = new Date();
    if (subscription.billingPeriod === "YEARLY") data.currentPeriodEnd.setFullYear(data.currentPeriodEnd.getFullYear() + 1);
    else data.currentPeriodEnd.setMonth(data.currentPeriodEnd.getMonth() + 1);
  }
  await prisma.$transaction(async (tx) => {
    if (status === "ACTIVE") {
      await tx.subscription.updateMany({ where: { userId: subscription.userId, status: "ACTIVE", id: { not: id } }, data: { status: "CANCELLED" } });
    }
    await tx.subscription.update({ where: { id }, data });
  });
  revalidatePath("/admin/subscriptions");
  revalidatePath("/subscription");
}

export async function updatePlan(formData: FormData) {
  await requireAdminSession();
  const id = String(formData.get("id") || "");
  const name = String(formData.get("name") || "").trim();
  const tagline = String(formData.get("tagline") || "").trim();
  const price = Number(formData.get("price"));
  const currency = String(formData.get("currency") || "USD").toUpperCase();
  const billingPeriod = String(formData.get("billingPeriod") || "MONTHLY").toUpperCase();
  const features = String(formData.get("features") || "").split(/\r?\n/).map((feature) => feature.trim()).filter(Boolean);
  const supportLevel = String(formData.get("supportLevel") || "").trim();
  const workflowLimit = Number(formData.get("workflowLimit"));
  const active = formData.get("active") === "on";
  const isPopular = formData.get("isPopular") === "on";
  if (!id || !name || !tagline || !features.length || !["USD", "MAD", "EUR"].includes(currency) || !["MONTHLY", "YEARLY"].includes(billingPeriod) || !Number.isFinite(price) || price < 0 || !Number.isInteger(workflowLimit) || workflowLimit < 0) throw new Error("Invalid plan update.");
  await prisma.plan.update({
    where: { id },
    data: { name, tagline, price, currency, billingPeriod, features: JSON.stringify(features), supportLevel, workflowLimit, isPopular, active },
  });
  revalidatePath("/admin/plans");
  revalidatePath("/plans");
}

export async function updateUserRole(formData: FormData) {
  await requireAdminSession();
  const id = String(formData.get("id") || "");
  const role = String(formData.get("role") || "").toUpperCase();
  if (!id || !["CLIENT", "ADMIN"].includes(role)) throw new Error("Invalid user role update.");
  await prisma.user.update({ where: { id }, data: { role } });
  revalidatePath("/admin/users");
}
