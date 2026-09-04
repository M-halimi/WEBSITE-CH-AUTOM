import { PlanCards } from "@/components/subscription/PlanCards";
import { getClientSession } from "@/actions/clientAuthActions";
import { getSubscriptionPlans } from "@/actions/subscriptionActions";
import { getTranslator } from "@/i18n/server";
import { getSiteSettings } from "@/lib/settings";
import { generateSubscriptionWhatsAppLink } from "@/lib/whatsapp";

export const dynamic = "force-dynamic";

export default async function PlansPage() {
  const { locale, t } = getTranslator();
  const [plans, session, settings] = await Promise.all([getSubscriptionPlans(), getClientSession(), getSiteSettings()]);
  const whatsappUrl = generateSubscriptionWhatsAppLink({
    phoneNumber: settings.whatsappNumber,
    locale,
    userName: session?.name,
    planName: session?.subscription?.plan?.name,
    status: session?.subscriptionState,
  });
  return (
    <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6 sm:py-20">
      <header className="mx-auto mb-12 max-w-3xl text-center">
        <span className="rounded-full bg-[#ffd233]/20 px-4 py-2 text-xs font-black text-amber-800 dark:text-amber-300">{t("plans.eyebrow")}</span>
        <h1 className="mt-5 text-3xl font-black tracking-tight sm:text-5xl">{t("plans.title")}</h1>
        <p className="mt-4 text-sm leading-7 text-muted-foreground sm:text-base">{t("plans.subtitle")}</p>
      </header>
      <PlanCards plans={plans} signedIn={Boolean(session)} currentPlanSlug={session?.subscriptionState === "ACTIVE" ? session.subscription?.plan?.slug : undefined} whatsappUrl={whatsappUrl} />
    </div>
  );
}
