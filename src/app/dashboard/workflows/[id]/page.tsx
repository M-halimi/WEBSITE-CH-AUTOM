import { notFound, redirect } from "next/navigation";
import { getClientSession } from "@/actions/clientAuthActions";
import { getClientWorkflowRequestById } from "@/actions/clientWorkflowActions";
import { WorkflowProjectDetail } from "@/components/dashboard/WorkflowProjectDetail";

export const dynamic = "force-dynamic";

export default async function WorkflowDetailPage({
  params,
}: {
  params: { id: string };
}) {
  const session = await getClientSession();
  if (!session) {
    redirect(`/login?redirect=/dashboard/workflows/${params.id}`);
  }

  const request = await getClientWorkflowRequestById(params.id);
  if (!request) {
    notFound();
  }

  return (
    <div className="py-2">
      <WorkflowProjectDetail
        request={request}
        currentUserId={session.id}
        isTeamUser={session.role === "ADMIN"}
      />
    </div>
  );
}

