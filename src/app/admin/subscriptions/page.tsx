import { updateSubscriptionStatus } from "@/actions/adminSubscriptionActions";
import { prisma } from "@/lib/prisma";
import { getTranslator } from "@/i18n/server";

export const dynamic = "force-dynamic";

export default async function AdminSubscriptionsPage() {
  const { locale, t } = getTranslator();
  const subscriptions = await prisma.subscription.findMany({ include: { user: true, plan: true }, orderBy: { createdAt: "desc" } });
  const statuses = ["PENDING", "ACTIVE", "EXPIRED", "CANCELLED", "SUSPENDED", "PAYMENT_FAILED"];
  return <div className="space-y-6"><header><h1 className="text-2xl font-black">{t("admin.subscriptions")}</h1><p className="mt-1 text-sm text-muted-foreground">{t("admin.reviewSubscriptions")}</p></header><div className="overflow-x-auto rounded-2xl border border-border bg-card"><table className="w-full text-start text-xs"><thead className="border-b border-border bg-muted/50"><tr><th className="p-4">{t("admin.customer")}</th><th className="p-4">{t("admin.plans")}</th><th className="p-4">{t("admin.provider")}</th><th className="p-4">{t("admin.created")}</th><th className="p-4">{t("subscription.status")}</th></tr></thead><tbody className="divide-y divide-border">{subscriptions.map((subscription) => <tr key={subscription.id}><td className="p-4"><strong className="block">{subscription.user.name || "—"}</strong><span className="text-muted-foreground">{subscription.user.email}</span></td><td className="p-4 font-bold">{subscription.plan.name}</td><td className="p-4">{subscription.provider}</td><td className="p-4">{subscription.createdAt.toLocaleDateString(locale === "ar" ? "ar-MA" : "en-GB")}</td><td className="p-4"><form action={updateSubscriptionStatus} className="flex gap-2"><input type="hidden" name="id" value={subscription.id} /><select name="status" defaultValue={subscription.status === "CANCELED" ? "CANCELLED" : subscription.status} className="h-9 rounded-lg border border-border bg-background px-2">{statuses.map((status) => <option key={status}>{status}</option>)}</select><button className="rounded-lg bg-[#ffd233] px-3 font-bold text-black">{t("admin.save")}</button></form></td></tr>)}</tbody></table>{subscriptions.length === 0 && <p className="p-8 text-center text-muted-foreground">{t("admin.noSubscriptions")}</p>}</div></div>;
}
