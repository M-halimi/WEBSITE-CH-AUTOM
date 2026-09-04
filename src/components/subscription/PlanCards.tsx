"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { Check, Loader2, MessageCircle } from "lucide-react";
import { subscribeToPlan } from "@/actions/subscriptionActions";
import type { PlanData } from "@/lib/ensurePlans";
import { useI18n } from "@/components/i18n/I18nProvider";
import { localizePlan } from "@/i18n/plan-content";
import type { MessageKey } from "@/i18n/messages";

export function PlanCards({ plans, signedIn, currentPlanSlug, whatsappUrl }: { plans: PlanData[]; signedIn: boolean; currentPlanSlug?: string; whatsappUrl: string }) {
  const router = useRouter();
  const { locale, t } = useI18n();
  const [pending, setPending] = React.useState<string | null>(null);
  const [error, setError] = React.useState<string | null>(null);

  const select = async (plan: PlanData) => {
    if (!signedIn) {
      router.push(`/register?plan=${encodeURIComponent(plan.slug)}`);
      return;
    }
    setPending(plan.slug);
    setError(null);
    const result = await subscribeToPlan(plan.slug, plan.billingPeriod === "YEARLY" ? "YEARLY" : "MONTHLY");
    setPending(null);
    if (result.success) router.push(result.destination || "/subscription");
    else setError(result.errorKey ? t(result.errorKey as MessageKey) : t("auth.error.generic"));
  };

  return (
    <>
      {error && <p role="alert" className="mb-5 rounded-xl border border-red-500/30 bg-red-500/10 p-4 text-sm text-red-600">{error}</p>}
      <div className="grid gap-6 md:grid-cols-3">
        {plans.map((rawPlan) => {
          const plan = localizePlan(rawPlan, locale);
          const current = currentPlanSlug === plan.slug;
          return (
            <article key={plan.slug} className={`relative flex flex-col rounded-3xl border bg-card p-6 shadow-sm ${plan.isPopular ? "border-2 border-[#ffd233]" : "border-border"}`}>
              {plan.isPopular && <span className="absolute -top-3 start-6 rounded-full bg-[#ffd233] px-3 py-1 text-[10px] font-black text-black">{t("common.recommended")}</span>}
              <div className="mb-5">
                <h2 className="text-xl font-black">{plan.name}</h2>
                <p className="mt-2 min-h-12 text-sm leading-6 text-muted-foreground">{plan.tagline}</p>
              </div>
              <div className="mb-6 flex items-end gap-1"><strong className="text-4xl font-black">{new Intl.NumberFormat(locale, { style: "currency", currency: plan.currency, maximumFractionDigits: 0 }).format(plan.price)}</strong><span className="pb-1 text-xs text-muted-foreground">/ {plan.billingPeriod === "YEARLY" ? t("common.year") : t("common.month")}</span></div>
              <p className="mb-3 text-xs font-black uppercase tracking-wider text-muted-foreground">{t("plans.features")}</p>
              <ul className="mb-7 flex-1 space-y-3 text-sm">
                {plan.features.map((feature) => <li key={feature} className="flex items-start gap-2"><Check className="mt-0.5 h-4 w-4 shrink-0 text-emerald-500" /><span>{feature}</span></li>)}
              </ul>
              <button disabled={pending === plan.slug || current} onClick={() => select(rawPlan)} className={`flex h-11 items-center justify-center gap-2 rounded-xl text-sm font-black disabled:opacity-70 ${current ? "border border-emerald-500/30 bg-emerald-500/10 text-emerald-600" : "bg-[#ffd233] text-black hover:bg-[#f5c71a]"}`}>
                {pending === plan.slug ? <><Loader2 className="h-4 w-4 animate-spin" />{t("plans.pending")}</> : current ? t("common.current") : t("plans.subscribe", { plan: plan.name })}
              </button>
            </article>
          );
        })}
      </div>
      <div className="mt-8 flex flex-col items-center justify-between gap-4 rounded-2xl border border-border bg-card p-5 text-center sm:flex-row sm:text-start">
        <p className="text-sm font-semibold">{t("plans.enterprise")}</p>
        <a href={whatsappUrl} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-5 py-2.5 text-sm font-bold text-emerald-600"><MessageCircle className="h-4 w-4" />{t("plans.contact")}</a>
      </div>
    </>
  );
}
