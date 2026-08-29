import { redirect } from "next/navigation";
import { getClientSession } from "@/actions/clientAuthActions";
import { ClientProfileForm } from "@/components/dashboard/ClientProfileForm";
import { User, Building2 } from "lucide-react";

export const dynamic = "force-dynamic";

export default async function ClientProfilePage() {
  const session = await getClientSession();
  if (!session) {
    redirect("/login?redirect=/dashboard/profile");
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-xl sm:text-2xl font-black text-foreground dark:text-white tracking-tight flex items-center gap-2">
          <User className="h-5 w-5 text-amber-600 dark:text-[#ffd233]" />
          Account & Company Profile
        </h1>
        <p className="text-xs text-muted-foreground dark:text-[#71717a] mt-0.5">
          Manage your organization name, WhatsApp contact number, and default business settings.
        </p>
      </div>

      <ClientProfileForm user={session} />
    </div>
  );
}

