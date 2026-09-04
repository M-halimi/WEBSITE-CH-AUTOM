"use client";

import * as React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Check, CheckCircle2, Loader2, MessageSquare, Share2, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { generateWhatsAppLink } from "@/lib/whatsapp";
import { activateBlueprintForClient } from "@/actions/clientBlueprintActions";
import { useI18n } from "@/components/i18n/I18nProvider";
import type { SubscriptionState } from "@/lib/subscriptions";

interface WorkflowDetailActionsProps {
  workflow: { id: string; title: string; slug: string };
  isAuthenticated: boolean;
  subscriptionState: SubscriptionState;
}

export function WorkflowDetailActions({ workflow, isAuthenticated, subscriptionState }: WorkflowDetailActionsProps) {
  const router = useRouter();
  const { t } = useI18n();
  const [copied, setCopied] = React.useState(false);
  const [activating, setActivating] = React.useState(false);
  const [activationSuccess, setActivationSuccess] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);

  const hasAccess = subscriptionState === "ACTIVE";
  const isExpired = subscriptionState === "EXPIRED";
  const planLabel = isExpired
    ? t("workflow.renew")
    : isAuthenticated
      ? t("workflow.viewPlans")
      : t("workflow.subscribeAccess");
  const planHref = "/plans";

  const waLink = generateWhatsAppLink({ workflowTitle: workflow.title, workflowSlug: workflow.slug });

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDirectDeploy = async () => {
    setActivating(true);
    setError(null);
    const result = await activateBlueprintForClient(workflow.id);
    setActivating(false);

    if (result.success && result.projectId) {
      setActivationSuccess(true);
      setTimeout(() => router.push(`/dashboard/workflows/${result.projectId}`), 700);
      return;
    }

    if (("authRequired" in result && result.authRequired) || ("subscriptionRequired" in result && result.subscriptionRequired)) {
      router.push("/plans");
      return;
    }
    setError(result.error || t("workflow.activationFailed"));
  };

  return (
    <div className="flex w-full flex-col gap-3">
      {hasAccess ? (
        <Button
          size="lg"
          disabled={activating || activationSuccess}
          onClick={handleDirectDeploy}
          className="h-12 w-full gap-2 rounded-full bg-[#ffd233] text-sm font-black text-black shadow-md shadow-[#ffd233]/20 hover:bg-[#f5c71a]"
        >
          {activating ? <Loader2 className="h-4 w-4 animate-spin" /> : activationSuccess ? <CheckCircle2 className="h-4 w-4 text-emerald-800" /> : <Zap className="h-4 w-4 fill-current" />}
          <span>{activating ? t("workflow.activating") : activationSuccess ? t("workflow.activated") : t("workflow.activate")}</span>
        </Button>
      ) : (
        <Link
          href={planHref}
          className="inline-flex h-12 w-full items-center justify-center gap-2 rounded-full bg-[#ffd233] px-5 text-sm font-black text-black shadow-md shadow-[#ffd233]/20 hover:bg-[#f5c71a]"
        >
          <Zap className="h-4 w-4 fill-current" />
          {planLabel}
        </Link>
      )}

      {error && <p className="rounded-xl bg-red-500/10 p-3 text-xs font-semibold text-red-600">{error}</p>}

      <div className="flex w-full items-center gap-2.5">
        <a
          href={waLink}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex h-11 flex-1 items-center justify-center gap-2 rounded-full border border-border bg-card text-xs font-bold text-foreground shadow-xs transition-all hover:bg-muted"
        >
          <MessageSquare className="h-4 w-4 text-amber-600 dark:text-[#ffd233]" />
          <span>{t("workflow.whatsapp")}</span>
        </a>

        <Button
          variant="outline"
          size="icon"
          onClick={handleShare}
          className="h-11 w-11 shrink-0 rounded-full border-border bg-card text-foreground hover:bg-muted"
          title={t("workflow.shareTitle")}
          aria-label={t("workflow.share")}
        >
          {copied ? <Check className="h-4 w-4 text-emerald-600" /> : <Share2 className="h-4 w-4" />}
        </Button>
      </div>
    </div>
  );
}
