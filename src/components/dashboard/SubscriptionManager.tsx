"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import {
  Zap,
  Check,
  CreditCard,
  Sparkles,
  ShieldCheck,
  Loader2,
  CheckCircle2,
  Clock,
  ArrowRight,
  TrendingUp
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { subscribeToPlan, cancelClientSubscription } from "@/actions/subscriptionActions";
import { PlanData } from "@/lib/ensurePlans";

interface SubscriptionManagerProps {
  plans: PlanData[];
  currentSubscription: any;
  userId: string;
  workflowUsage: {
    used: number;
    limit: number;
    remaining: number;
    isUnlimited: boolean;
  };
}

export function SubscriptionManager({
  plans,
  currentSubscription,
  userId,
  workflowUsage,
}: SubscriptionManagerProps) {
  const router = useRouter();
  const [billingPeriod, setBillingPeriod] = React.useState<"MONTHLY" | "YEARLY">("MONTHLY");
  const [pendingPlanSlug, setPendingPlanSlug] = React.useState<string | null>(null);
  const [successMessage, setSuccessMessage] = React.useState<string | null>(null);
  const [errorMessage, setErrorMessage] = React.useState<string | null>(null);

  const activePlanSlug = currentSubscription?.plan?.slug || "starter";

  const handleSelectPlan = async (planSlug: string) => {
    setPendingPlanSlug(planSlug);
    setSuccessMessage(null);
    setErrorMessage(null);

    const res = await subscribeToPlan(planSlug, billingPeriod);
    setPendingPlanSlug(null);

    if (res.success) {
      setSuccessMessage(`You have successfully switched to the ${res.planName} plan!`);
      router.refresh();
      setTimeout(() => setSuccessMessage(null), 5000);
    } else {
      setErrorMessage("The plan request could not be submitted.");
    }
  };

  return (
    <div className="space-y-8 max-w-6xl mx-auto">
      {/* Top Banner / Current Status */}
      <div className="rounded-3xl border border-border dark:border-[#22222a] bg-card dark:bg-[#141418] p-6 sm:p-8 space-y-6 shadow-xs">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <span className="px-3 py-1 rounded-full text-xs font-bold bg-[#ffd233] text-black">
                ● Active Membership
              </span>
              <span className="text-xs text-muted-foreground">
                Renews automatically
              </span>
            </div>

            <h1 className="text-2xl sm:text-3xl font-black text-foreground dark:text-white tracking-tight">
              Subscription & Production Quota
            </h1>

            <p className="text-xs sm:text-sm text-muted-foreground dark:text-[#8e8e93] leading-relaxed max-w-2xl">
              Each plan includes certified turnkey engineering, custom node configuration, AI agent integrations, and 24/7 workflow maintenance.
            </p>
          </div>

          {/* Current Quota Widget */}
          <div className="p-5 rounded-2xl bg-muted/40 dark:bg-[#1b1b22] border border-border dark:border-[#26262e] space-y-3 min-w-[260px] shadow-xs">
            <div className="flex items-center justify-between text-xs font-semibold">
              <span className="text-muted-foreground">Active Plan:</span>
              <span className="font-bold text-foreground dark:text-white uppercase">{currentSubscription?.plan?.name || "STARTER"}</span>
            </div>

            <div className="space-y-1.5 pt-1 border-t border-border dark:border-[#26262e]">
              <div className="flex justify-between text-xs font-bold">
                <span className="text-foreground dark:text-white">Workflow Quota Used:</span>
                <span className="text-amber-700 dark:text-[#ffd233]">
                  {workflowUsage.isUnlimited ? "Unlimited" : `${workflowUsage.used} of ${workflowUsage.limit}`}
                </span>
              </div>
              {!workflowUsage.isUnlimited && (
                <div className="h-2 w-full rounded-full bg-muted dark:bg-[#262632] overflow-hidden">
                  <div
                    style={{ width: `${Math.min(100, (workflowUsage.used / Math.max(1, workflowUsage.limit)) * 100)}%` }}
                    className="h-full bg-[#ffd233] rounded-full transition-all duration-500"
                  />
                </div>
              )}
            </div>

            <div className="text-[11px] text-muted-foreground">
              {workflowUsage.isUnlimited
                ? "✨ Unlimited concurrent production workflows active."
                : `${workflowUsage.remaining} remaining workflow credit(s) this billing cycle.`}
            </div>
          </div>
        </div>

        {/* Success / Error Banners */}
        {successMessage && (
          <div className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-600 dark:text-emerald-400 text-xs font-bold flex items-center gap-2">
            <CheckCircle2 className="h-4 w-4" />
            <span>{successMessage}</span>
          </div>
        )}

        {errorMessage && (
          <div className="p-4 rounded-xl bg-destructive/10 border border-destructive/30 text-destructive text-xs font-bold">
            {errorMessage}
          </div>
        )}
      </div>

      {/* Monthly / Yearly Billing Toggle */}
      <div className="flex flex-col items-center justify-center space-y-3 pt-2">
        <div className="inline-flex items-center gap-2 p-1.5 rounded-2xl bg-card dark:bg-[#141418] border border-border dark:border-[#22222a] shadow-xs">
          <button
            type="button"
            onClick={() => setBillingPeriod("MONTHLY")}
            className={`px-5 py-2 rounded-xl text-xs font-bold transition-all ${
              billingPeriod === "MONTHLY"
                ? "bg-[#ffd233] text-black shadow-xs"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            Monthly Billing
          </button>
          <button
            type="button"
            onClick={() => setBillingPeriod("YEARLY")}
            className={`px-5 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
              billingPeriod === "YEARLY"
                ? "bg-[#ffd233] text-black shadow-xs"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            <span>Yearly Billing</span>
            <span className="px-2 py-0.5 rounded-full text-[10px] font-black bg-emerald-500 text-white shadow-xs">
              SAVE 20%
            </span>
          </button>
        </div>
      </div>

      {/* 3 Pricing Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-stretch">
        {plans.map((plan) => {
          const isCurrent = activePlanSlug === plan.slug;
          const isPro = plan.slug === "pro";
          const isBusiness = plan.slug === "business";

          let priceDisplay = plan.price;
          if (billingPeriod === "YEARLY") {
            priceDisplay = Math.round(plan.price * 0.8);
          }

          return (
            <div
              key={plan.slug}
              className={`rounded-3xl p-6 sm:p-7 flex flex-col justify-between space-y-6 transition-all duration-300 relative ${
                plan.isPopular
                  ? "bg-card dark:bg-[#141418] border-2 border-[#ffd233] shadow-xl shadow-[#ffd233]/10"
                  : "bg-card dark:bg-[#141418] border border-border dark:border-[#22222a] shadow-xs hover:border-[#ffd233]/50"
              }`}
            >
              {plan.isPopular && (
                <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-[#ffd233] text-black text-[10px] font-black tracking-wider uppercase shadow-md">
                  ★ MOST POPULAR CHOICE
                </div>
              )}

              <div className="space-y-4">
                <div className="space-y-1">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-black text-foreground dark:text-white uppercase tracking-wider">
                      {plan.name}
                    </h3>
                    <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-muted text-muted-foreground border border-border">
                      {plan.workflowLimit >= 900 ? "Unlimited Workflows" : `${plan.workflowLimit} Workflows`}
                    </span>
                  </div>
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    {plan.tagline}
                  </p>
                </div>

                {/* Price Display */}
                <div className="pt-2">
                  <div className="flex items-baseline gap-1">
                    <span className="text-3xl sm:text-4xl font-black text-foreground dark:text-white">
                      ${priceDisplay}
                    </span>
                    <span className="text-xs text-muted-foreground font-semibold">
                      / month {billingPeriod === "YEARLY" ? "(billed annually)" : ""}
                    </span>
                  </div>
                </div>

                {/* Features List */}
                <div className="space-y-2.5 pt-3 border-t border-border dark:border-[#22222a]">
                  <span className="text-[11px] font-bold text-muted-foreground uppercase tracking-wider block">
                    What&apos;s Included:
                  </span>
                  <ul className="space-y-2 text-xs">
                    {plan.features.map((feat, idx) => (
                      <li key={idx} className="flex items-start gap-2 text-muted-foreground dark:text-[#d4d4d8]">
                        <Check className="h-4 w-4 text-emerald-500 shrink-0 mt-0.5" />
                        <span className="leading-tight">{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Action CTA Button */}
              <div className="pt-4 border-t border-border dark:border-[#22222a]">
                <Button
                  type="button"
                  disabled={pendingPlanSlug === plan.slug || isCurrent}
                  onClick={() => handleSelectPlan(plan.slug)}
                  className={`w-full h-11 rounded-2xl font-extrabold text-xs transition-all shadow-xs ${
                    isCurrent
                      ? "bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 border border-emerald-500/40 cursor-default"
                      : plan.isPopular
                      ? "bg-[#ffd233] hover:bg-[#f5c71a] text-black shadow-md shadow-[#ffd233]/25"
                      : "bg-muted dark:bg-[#1e1e26] hover:bg-muted/80 text-foreground dark:text-white border border-border"
                  }`}
                >
                  {pendingPlanSlug === plan.slug ? (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin" />
                      Activating Plan...
                    </>
                  ) : isCurrent ? (
                    <>
                      <CheckCircle2 className="h-4 w-4" />
                      Current Active Plan
                    </>
                  ) : (
                    <span>Choose {plan.name} Plan</span>
                  )}
                </Button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Security Guarantee Band */}
      <div className="p-6 rounded-3xl bg-muted/20 dark:bg-[#111115] border border-border dark:border-[#22222a] flex flex-col sm:flex-row items-center justify-between gap-4 text-xs">
        <div className="flex items-center gap-3 text-center sm:text-left">
          <div className="h-10 w-10 rounded-xl bg-[#ffd233]/20 text-amber-700 dark:text-[#ffd233] flex items-center justify-center shrink-0">
            <ShieldCheck className="h-5 w-5" />
          </div>
          <div>
            <h4 className="font-bold text-foreground dark:text-white">100% Code Ownership & Private Exports</h4>
            <p className="text-muted-foreground dark:text-[#8e8e93] text-[11px]">All n8n JSON nodes and Make blueprints are yours to export, run, and self-host at any time.</p>
          </div>
        </div>

        <div className="text-center sm:text-right shrink-0">
          <span className="font-bold text-foreground dark:text-white block">Need Enterprise Architecture?</span>
          <a
            href="/contact"
            className="text-amber-700 dark:text-[#ffd233] font-bold hover:underline text-[11px]"
          >
            Talk to Solutions Engineer →
          </a>
        </div>
      </div>
    </div>
  );
}
