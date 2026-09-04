import { prisma } from "@/lib/prisma";

export type SubscriptionState =
  | "NONE"
  | "PENDING"
  | "ACTIVE"
  | "EXPIRED"
  | "CANCELLED"
  | "SUSPENDED"
  | "PAYMENT_FAILED";

export function normalizeSubscriptionState(subscription: any, now = new Date()): SubscriptionState {
  if (!subscription) return "NONE";
  const raw = String(subscription.status || "").toUpperCase();
  if (raw === "ACTIVE" && subscription.currentPeriodEnd && new Date(subscription.currentPeriodEnd) <= now) return "EXPIRED";
  if (["PENDING", "TRIALING", "INCOMPLETE"].includes(raw)) return "PENDING";
  if (raw === "ACTIVE") return "ACTIVE";
  if (["EXPIRED"].includes(raw)) return "EXPIRED";
  if (["CANCELED", "CANCELLED"].includes(raw)) return "CANCELLED";
  if (["SUSPENDED", "PAUSED"].includes(raw)) return "SUSPENDED";
  if (["PAYMENT_FAILED", "PAST_DUE", "UNPAID", "INCOMPLETE_EXPIRED"].includes(raw)) return "PAYMENT_FAILED";
  return "PENDING";
}

export async function getPrimarySubscription(userId: string) {
  try {
    const subscriptions = await prisma.subscription.findMany({
      where: { userId },
      include: { plan: true },
      orderBy: { createdAt: "desc" },
    });
    const active = subscriptions.find((item) => normalizeSubscriptionState(item) === "ACTIVE");
    return active || subscriptions[0] || null;
  } catch {
    return null;
  }
}

export async function getSubscriptionAccess(userId: string) {
  const subscription = await getPrimarySubscription(userId);
  const state = normalizeSubscriptionState(subscription);
  return { subscription, state, allowed: state === "ACTIVE" };
}

/**
 * The single access policy for catalog workflows.
 *
 * Workflow metadata is always public so visitors can discover the product.
 * Running/activating a workflow requires an authenticated user with an active
 * SaaS subscription. Keep this policy here instead of reproducing status
 * checks in pages and client components.
 */
export async function canAccessWorkflow(userId?: string | null) {
  if (!userId) {
    return {
      isAuthenticated: false,
      canPreview: true,
      canOpen: false,
      state: "NONE" as SubscriptionState,
      subscription: null,
    };
  }

  const access = await getSubscriptionAccess(userId);
  return {
    isAuthenticated: true,
    canPreview: true,
    canOpen: access.allowed,
    state: access.state,
    subscription: access.subscription,
  };
}
