import { redirect } from "next/navigation";
import { getClientSession } from "@/actions/clientAuthActions";
import { checkWorkflowLimit } from "@/actions/subscriptionActions";
import { getMarketplaceBlueprints } from "@/actions/clientBlueprintActions";
import { ClientBlueprintCatalog } from "@/components/dashboard/ClientBlueprintCatalog";

export const dynamic = "force-dynamic";

export default async function ClientBlueprintsPage() {
  const session = await getClientSession();
  if (!session) {
    redirect("/login?redirect=/dashboard/blueprints");
  }

  const [workflows, quota] = await Promise.all([
    getMarketplaceBlueprints(),
    checkWorkflowLimit(session.id),
  ]);

  return (
    <div className="py-2">
      <ClientBlueprintCatalog workflows={workflows} quota={quota} />
    </div>
  );
}

