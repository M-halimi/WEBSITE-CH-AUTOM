import { MessageCircle, ShieldCheck } from "lucide-react";
import { getClientSession } from "@/actions/clientAuthActions";
import { getTranslator } from "@/i18n/server";
import { getSiteSettings } from "@/lib/settings";
import { generateSubscriptionWhatsAppLink } from "@/lib/whatsapp";

export const dynamic = "force-dynamic";

export default async function ContactPage() {
  const { locale, t } = getTranslator();
  const [session, settings] = await Promise.all([getClientSession(), getSiteSettings()]);
  const url = generateSubscriptionWhatsAppLink({ phoneNumber: settings.whatsappNumber, locale, userName: session?.name, planName: session?.subscription?.plan?.name, status: session?.subscriptionState ? t((`status.${session.subscriptionState === "PAYMENT_FAILED" ? "paymentFailed" : session.subscriptionState.toLowerCase()}`) as any) : undefined });
  return <div className="mx-auto max-w-2xl px-4 py-20 text-center"><span className="mx-auto grid h-16 w-16 place-items-center rounded-2xl bg-emerald-500/10 text-emerald-600"><MessageCircle className="h-8 w-8" /></span><h1 className="mt-6 text-3xl font-black sm:text-4xl">{t("contact.title")}</h1><p className="mx-auto mt-4 max-w-xl leading-7 text-muted-foreground">{t("contact.subtitle")}</p><a href={url} target="_blank" rel="noreferrer" className="mt-8 inline-flex items-center gap-2 rounded-full bg-emerald-500 px-7 py-3.5 text-sm font-black text-white"><MessageCircle className="h-5 w-5" />{t("contact.button")}</a><p className="mt-6 flex items-start justify-center gap-2 text-xs leading-5 text-muted-foreground"><ShieldCheck className="h-4 w-4 shrink-0 text-emerald-500" />{t("contact.safe")}</p></div>;
}
