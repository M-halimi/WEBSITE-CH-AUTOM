import { redirect } from "next/navigation";
import Link from "next/link";
import { clientLogout, getClientSession } from "@/actions/clientAuthActions";
import { getTranslator } from "@/i18n/server";

export const dynamic = "force-dynamic";

export default async function ClientDashboardLayout({ children }: { children: React.ReactNode }) {
  const session = await getClientSession();
  if (!session) redirect("/login?redirect=/dashboard");
  const { t } = getTranslator();

  return (
    <div className="min-h-screen bg-muted/20">
      <div className="border-b border-border bg-card">
        <div className="mx-auto flex max-w-[1500px] flex-wrap items-center justify-between gap-3 px-4 py-3 sm:px-6">
          <nav className="flex flex-wrap items-center gap-2 text-xs font-bold">
            <Link href="/dashboard" className="rounded-full px-3 py-2 hover:bg-muted">{t("admin.dashboard")}</Link>
            <Link href="/dashboard/blueprints" className="rounded-full px-3 py-2 hover:bg-muted">{t("nav.workflows")}</Link>
            <Link href="/dashboard/subscription" className="rounded-full px-3 py-2 hover:bg-muted">{t("nav.subscription")}</Link>
            <Link href="/dashboard/profile" className="rounded-full px-3 py-2 hover:bg-muted">{t("nav.account")}</Link>
          </nav>
          <form action={clientLogout}><button className="rounded-full border border-border px-4 py-2 text-xs font-bold hover:bg-muted">{t("nav.logout")}</button></form>
        </div>
      </div>
      <main className="mx-auto w-full max-w-[1500px] p-4 sm:p-6 lg:p-8">{children}</main>
    </div>
  );
}
