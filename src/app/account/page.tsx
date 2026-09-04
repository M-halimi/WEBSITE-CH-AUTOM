import { redirect } from "next/navigation";
import { Building2, LogOut, Mail, User } from "lucide-react";
import { getClientSession, clientLogout } from "@/actions/clientAuthActions";
import { getTranslator } from "@/i18n/server";

export const dynamic = "force-dynamic";

export default async function AccountPage() {
  const session = await getClientSession();
  if (!session) redirect("/login?redirect=/account");
  const { t } = getTranslator();
  const fields = [[User, t("account.name"), session.name], [Mail, t("account.email"), session.email], [Building2, t("account.company"), session.company]] as const;
  return <div className="mx-auto max-w-2xl px-4 py-14 sm:px-6 sm:py-20"><h1 className="text-3xl font-black">{t("account.title")}</h1><p className="mt-2 text-muted-foreground">{t("account.subtitle")}</p><section className="mt-8 divide-y divide-border overflow-hidden rounded-2xl border border-border bg-card">{fields.map(([Icon, label, value]) => <div key={label} className="flex items-center gap-4 p-5"><Icon className="h-5 w-5 text-amber-500" /><div><p className="text-xs font-bold text-muted-foreground">{label}</p><p className="mt-1 text-sm font-semibold">{value || t("common.notAvailable")}</p></div></div>)}</section><form action={clientLogout} className="mt-6"><button className="inline-flex items-center gap-2 rounded-xl border border-red-500/30 px-5 py-3 text-sm font-bold text-red-600"><LogOut className="h-4 w-4" />{t("nav.logout")}</button></form></div>;
}
