"use server";

import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";
import { getClientSession } from "@/actions/clientAuthActions";
import { getAllPlans, PlanData } from "@/lib/ensurePlans";

export async function getSubscriptionPlans(): Promise<PlanData[]> {
  return getAllPlans();
}

export async function checkWorkflowLimit(userId: string) {
  try {
    const user = await prisma.user.findUnique({
      where: { id: userId },
    });

    if (!user) {
      return { allowed: false, limit: 0, used: 0, remaining: 0, planName: "None", requiresPlan: true, isUnlimited: false };
    }

    // 1. Determine active plan
    let activePlan: any = null;
    let subscriptionId: string | null = null;

    if ((prisma as any).subscription) {
      try {
        const sub = await (prisma as any).subscription.findFirst({
          where: { userId, status: "ACTIVE" },
          include: { plan: true },
          orderBy: { createdAt: "desc" },
        });
        if (sub && sub.plan) {
          activePlan = sub.plan;
          subscriptionId = sub.id;
        }
      } catch (e) {}
    }

    // Default to Starter plan if no subscription record yet
    if (!activePlan) {
      const allPlans = await getAllPlans();
      activePlan = allPlans[0]; // Starter (1 limit)
    }

    const limit = activePlan.workflowLimit || 1;
    const isUnlimited = limit >= 900;

    // 2. Count all active workflows (from both clientWorkflowRequest & leadRequest)
    let usedCount = 0;

    if ((prisma as any).clientWorkflowRequest) {
      try {
        const count = await (prisma as any).clientWorkflowRequest.count({
          where: {
            userId,
            status: { notIn: ["CANCELLED", "REJECTED"] },
          },
        });
        usedCount += count;
      } catch (e) {}
    }

    // Also count active lead requests for this user email
    try {
      const leadCount = await prisma.leadRequest.count({
        where: {
          email: user.email,
          status: { notIn: ["CANCELLED", "REJECTED"] },
        },
      });
      // If we got both, take the max to prevent double counting
      usedCount = Math.max(usedCount, leadCount);
    } catch (e) {}

    const remaining = isUnlimited ? 999 : Math.max(0, limit - usedCount);
    const allowed = isUnlimited || remaining > 0;

    return {
      allowed,
      limit,
      used: usedCount,
      remaining,
      planName: activePlan.name || "Starter",
      isUnlimited,
      requiresPlan: false,
      subscriptionId,
    };
  } catch (error) {
    console.error("Error checking workflow limit:", error);
    return { allowed: false, limit: 1, used: 1, remaining: 0, planName: "Starter", isUnlimited: false, requiresPlan: false };
  }
}

export async function subscribeToPlan(planIdOrSlug: string, billingPeriod: "MONTHLY" | "YEARLY" = "MONTHLY") {
  const session = await getClientSession();
  if (!session) {
    return { success: false, error: "Please log in or register to select a plan." };
  }

  try {
    const plans = await getAllPlans();
    const targetPlan = plans.find((p) => p.id === planIdOrSlug || p.slug === planIdOrSlug);

    if (!targetPlan) {
      return { success: false, error: "Selected plan was not found." };
    }

    const now = new Date();
    const periodEnd = new Date();
    if (billingPeriod === "YEARLY") {
      periodEnd.setFullYear(periodEnd.getFullYear() + 1);
    } else {
      periodEnd.setMonth(periodEnd.getMonth() + 1);
    }

    // Cancel previous active subscriptions if any
    if ((prisma as any).subscription) {
      try {
        await (prisma as any).subscription.updateMany({
          where: {
            userId: session.id,
            status: "ACTIVE",
          },
          data: {
            status: "CANCELED",
          },
        });

        // Create new active subscription
        await (prisma as any).subscription.create({
          data: {
            userId: session.id,
            planId: targetPlan.id || targetPlan.slug,
            status: "ACTIVE",
            billingPeriod,
            currentPeriodStart: now,
            currentPeriodEnd: periodEnd,
            provider: "MANUAL",
            usedWorkflowsCount: 0,
          },
        });
      } catch (e) {}
    }

    revalidatePath("/dashboard");
    revalidatePath("/dashboard/subscription");
    revalidatePath("/dashboard/workflows/new");
    revalidatePath("/dashboard/blueprints");

    return {
      success: true,
      message: `Successfully updated your subscription to the ${targetPlan.name} plan!`,
      planName: targetPlan.name,
    };
  } catch (error: any) {
    console.error("Error subscribing to plan:", error);
    return { success: false, error: error.message || "Failed to activate subscription." };
  }
}

export async function cancelClientSubscription(subscriptionId: string) {
  const session = await getClientSession();
  if (!session) {
    return { success: false, error: "Unauthorized." };
  }

  try {
    if ((prisma as any).subscription) {
      await (prisma as any).subscription.update({
        where: { id: subscriptionId },
        data: {
          status: "CANCELED",
        },
      });
    }

    revalidatePath("/dashboard/subscription");
    return { success: true, message: "Subscription cancelled." };
  } catch (error: any) {
    return { success: false, error: error.message || "Failed to cancel subscription." };
  }
}
