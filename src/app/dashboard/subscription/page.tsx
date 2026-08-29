import { redirect } from "next/navigation";
import { getClientSession } from "@/actions/clientAuthActions";
import { getSubscriptionPlans, checkWorkflowLimit } from "@/actions/subscriptionActions";
import { SubscriptionManager } from "@/components/dashboard/SubscriptionManager";

export const dynamic = "force-dynamic";

export default async function ClientSubscriptionPage() {
  const session = await getClientSession();
  if (!session) {
    redirect("/login?redirect=/dashboard/subscription");
  }

  const [plans, quota] = await Promise.all([
    getSubscriptionPlans(),
    checkWorkflowLimit(session.id),
  ]);

  return (
    <div className="py-2">
      <SubscriptionManager
        plans={plans}
        currentSubscription={session.subscription}
        userId={session.id}
        workflowUsage={{
          used: quota.used,
          limit: quota.limit,
          remaining: quota.remaining,
          isUnlimited: quota.isUnlimited,
        }}
      />
    </div>
  );
}

