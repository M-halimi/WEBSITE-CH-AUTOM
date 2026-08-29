import { notFound, redirect } from "next/navigation";
import { verifyAdminSession } from "@/actions/authActions";
import { getAdminClientRequestById } from "@/actions/adminClientRequestActions";
import { AdminClientRequestControl } from "@/components/admin/AdminClientRequestControl";

export const dynamic = "force-dynamic";

export default async function AdminClientRequestDetailPage({
  params,
}: {
  params: { id: string };
}) {
  const isAdmin = await verifyAdminSession();
  if (!isAdmin) {
    redirect("/login?redirect=/admin/client-requests");
  }

  const request = await getAdminClientRequestById(params.id);
  if (!request) {
    notFound();
  }

  return (
    <div className="py-2">
      <AdminClientRequestControl request={request} />
    </div>
  );
}

