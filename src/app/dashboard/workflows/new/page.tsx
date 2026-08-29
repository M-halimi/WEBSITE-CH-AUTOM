import { redirect } from "next/navigation";
import { getClientSession } from "@/actions/clientAuthActions";
import { checkWorkflowLimit } from "@/actions/subscriptionActions";
import { getAllPlatforms } from "@/lib/ensurePlatforms";
import { WorkflowWizard } from "@/components/dashboard/WorkflowWizard";

export const dynamic = "force-dynamic";

export default async function NewWorkflowRequestPage() {
  const session = await getClientSession();
  if (!session) {
    redirect("/login?redirect=/dashboard/workflows/new");
  }

  const [quota, platforms] = await Promise.all([
    checkWorkflowLimit(session.id),
    getAllPlatforms(),
  ]);

  return (
    <div className="py-2">
      <WorkflowWizard
        userId={session.id}
        userName={session.name || "Client"}
        userCompany={session.company}
        quota={quota}
        platforms={platforms}
      />
    </div>
  );
}

