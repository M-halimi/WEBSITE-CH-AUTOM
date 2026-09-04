"use server";

import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";
import { getClientSession } from "@/actions/clientAuthActions";
import { getAllPlans, type PlanData } from "@/lib/ensurePlans";
import { getSubscriptionAccess } from "@/lib/subscriptions";

export async function getSubscriptionPlans(): Promise<PlanData[]> {
  return getAllPlans();
}

export async function checkWorkflowLimit(userId: string) {
  const session = await getClientSession();
  if (!session || session.id !== userId) {
    return { allowed: false, limit: 0, used: 0, remaining: 0, planName: "None", requiresPlan: true, isUnlimited: false, subscriptionId: null };
  }
  const access = await getSubscriptionAccess(userId);
  if (!access.allowed || !access.subscription?.plan) {
    return { allowed: false, limit: 0, used: 0, remaining: 0, planName: "None", requiresPlan: true, isUnlimited: false, subscriptionId: null };
  }

  const limit = access.subscription.plan.workflowLimit;
  const isUnlimited = limit >= 900;
  const used = await prisma.clientWorkflowRequest.count({
    where: { userId, status: { notIn: ["CANCELLED", "REJECTED"] } },
  });
  const remaining = isUnlimited ? 999 : Math.max(0, limit - used);
  return {
    allowed: isUnlimited || remaining > 0,
    limit,
    used,
    remaining,
    planName: access.subscription.plan.name,
    isUnlimited,
    requiresPlan: false,
    subscriptionId: access.subscription.id,
  };
}

export async function subscribeToPlan(planIdOrSlug: string, billingPeriod: "MONTHLY" | "YEARLY" = "MONTHLY") {
  const session = await getClientSession();
  if (!session) return { success: false, authRequired: true, errorKey: "auth.error.required" as const };

  try {
    const plans = await getAllPlans();
    const targetPlan = plans.find((plan) => (plan.id === planIdOrSlug || plan.slug === planIdOrSlug) && plan.active);
    if (!targetPlan?.id) return { success: false, errorKey: "plans.error.notFound" as const };

    await prisma.subscription.updateMany({
      where: { userId: session.id, status: { in: ["PENDING", "PAYMENT_FAILED", "PAST_DUE"] } },
      data: { status: "CANCELLED" },
    });

    const end = new Date();
    if (billingPeriod === "YEARLY") end.setFullYear(end.getFullYear() + 1);
    else end.setMonth(end.getMonth() + 1);

    await prisma.subscription.create({
      data: {
        userId: session.id,
        planId: targetPlan.id,
        status: "PENDING",
        billingPeriod,
        currentPeriodStart: new Date(),
        currentPeriodEnd: end,
        provider: "MANUAL",
      },
    });

    revalidatePath("/plans");
    revalidatePath("/subscription");
    return { success: true, planName: targetPlan.name, destination: "/subscription" };
  } catch (error) {
    console.error("Plan selection error:", error);
    return { success: false, errorKey: "plans.error.submit" as const };
  }
}

export async function cancelClientSubscription(subscriptionId: string) {
  const session = await getClientSession();
  if (!session) return { success: false, error: "Unauthorized." };
  const owned = await prisma.subscription.findFirst({ where: { id: subscriptionId, userId: session.id }, select: { id: true } });
  if (!owned) return { success: false, error: "Subscription not found." };
  await prisma.subscription.update({ where: { id: owned.id }, data: { status: "CANCELLED" } });
  revalidatePath("/subscription");
  return { success: true };
}
