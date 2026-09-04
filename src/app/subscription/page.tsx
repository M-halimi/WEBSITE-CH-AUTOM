import Link from "next/link";
import { redirect } from "next/navigation";
import { CalendarDays, CheckCircle2, Clock3, MessageCircle, ShieldAlert } from "lucide-react";
import { getClientSession } from "@/actions/clientAuthActions";
import { getTranslator } from "@/i18n/server";
import type { MessageKey } from "@/i18n/messages";
import { localizePlan } from "@/i18n/plan-content";
import { getSiteSettings } from "@/lib/settings";
import { generateSubscriptionWhatsAppLink } from "@/lib/whatsapp";
import type { SubscriptionState } from "@/lib/subscriptions";

export const dynamic = "force-dynamic";

const statusKeys: Record<SubscriptionState, MessageKey> = {
  NONE: "status.none", PENDING: "status.pending", ACTIVE: "status.active", EXPIRED: "status.expired",
  CANCELLED: "status.cancelled", SUSPENDED: "status.suspended", PAYMENT_FAILED: "status.paymentFailed",
};
const descriptionKeys: Partial<Record<SubscriptionState, MessageKey>> = {
  PENDING: "subscription.pendingText", ACTIVE: "subscription.activeText", EXPIRED: "subscription.expiredText",
  CANCELLED: "subscription.cancelledText", SUSPENDED: "subscription.suspendedText", PAYMENT_FAILED: "subscription.failedText",
};

export default async function SubscriptionPage() {
  const session = await getClientSession();
  if (!session) redirect("/login?redirect=/subscription");
  const { locale, t } = getTranslator();
  const settings = await getSiteSettings();
  const state = session.subscriptionState || "NONE";
  const subscription = session.subscription;
  const plan = subscription?.plan ? localizePlan({ ...subscription.plan, features: typeof subscription.plan.features === "string" ? JSON.parse(subscription.plan.features) : subscription.plan.features }, locale) : null;
  const whatsappUrl = generateSubscriptionWhatsAppLink({ phoneNumber: settings.whatsappNumber, locale, userName: session.name, planName: plan?.name, status: t(statusKeys[state]) });
  const formatDate = (value?: Date | string | null) => value ? new Intl.DateTimeFormat(locale === "ar" ? "ar-MA" : "en-GB", { dateStyle: "medium" }).format(new Date(value)) : t("common.notAvailable");

  if (state === "NONE") {
    return <div className="mx-auto max-w-2xl px-4 py-20 text-center"><ShieldAlert className="mx-auto h-12 w-12 text-amber-500" /><h1 className="mt-5 text-3xl font-black">{t("subscription.noneTitle")}</h1><p className="mt-3 text-muted-foreground">{t("subscription.noneText")}</p><Link href="/plans" className="mt-7 inline-flex rounded-full bg-[#ffd233] px-6 py-3 text-sm font-black text-black">{t("subscription.viewPlans")}</Link></div>;
  }

  return (
    <div className="mx-auto max-w-3xl px-4 py-14 sm:px-6 sm:py-20">
      <header><h1 className="text-3xl font-black sm:text-4xl">{t("subscription.title")}</h1><p className="mt-2 text-muted-foreground">{t("subscription.subtitle")}</p></header>
      <section className="mt-8 overflow-hidden rounded-3xl border border-border bg-card shadow-sm">
        <div className="flex flex-col justify-between gap-5 border-b border-border p-6 sm:flex-row sm:items-center">
          <div><p className="text-xs font-bold uppercase tracking-wider text-muted-foreground">{t("subscription.plan")}</p><h2 className="mt-1 text-2xl font-black">{plan?.name || t("common.notAvailable")}</h2></div>
          <span className={`inline-flex w-fit items-center gap-2 rounded-full px-4 py-2 text-xs font-black ${state === "ACTIVE" ? "bg-emerald-500/10 text-emerald-600" : state === "PENDING" ? "bg-amber-500/10 text-amber-700 dark:text-amber-300" : "bg-red-500/10 text-red-600"}`}><CheckCircle2 className="h-4 w-4" />{t(statusKeys[state])}</span>
        </div>
        <div className="grid gap-4 p-6 sm:grid-cols-2">
          <div className="rounded-2xl bg-muted/50 p-4"><span className="flex items-center gap-2 text-xs font-bold text-muted-foreground"><CalendarDays className="h-4 w-4" />{t("subscription.start")}</span><strong className="mt-2 block text-sm">{formatDate(subscription?.currentPeriodStart)}</strong></div>
          <div className="rounded-2xl bg-muted/50 p-4"><span className="flex items-center gap-2 text-xs font-bold text-muted-foreground"><Clock3 className="h-4 w-4" />{t("subscription.renewal")}</span><strong className="mt-2 block text-sm">{formatDate(subscription?.currentPeriodEnd)}</strong></div>
        </div>
        <div className="px-6 pb-6"><h3 className="text-sm font-black">{state === "PENDING" ? t("subscription.pendingTitle") : t(statusKeys[state])}</h3><p className="mt-2 text-sm leading-6 text-muted-foreground">{descriptionKeys[state] ? t(descriptionKeys[state]!) : ""}</p></div>
      </section>
      <div className="mt-6 flex flex-col gap-3 sm:flex-row"><a href={whatsappUrl} target="_blank" rel="noreferrer" className="inline-flex flex-1 items-center justify-center gap-2 rounded-xl bg-emerald-500 px-5 py-3 text-sm font-black text-white"><MessageCircle className="h-4 w-4" />{t("contact.button")}</a><Link href="/plans" className="inline-flex items-center justify-center rounded-xl border border-border bg-card px-5 py-3 text-sm font-bold">{t("nav.plans")}</Link></div>
    </div>
  );
}
