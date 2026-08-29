"use client";

import * as React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Zap,
  CheckCircle2,
  Clock,
  Sparkles,
  ArrowRight,
  Search,
  Filter,
  Check,
  Loader2,
  AlertCircle,
  Cpu,
  Layers,
  ChevronRight,
  Lock,
  CreditCard,
  X,
  ShieldCheck,
  HelpCircle
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { PlatformIcon } from "@/components/ui/platform-icon";
import { activateBlueprintForClient } from "@/actions/clientBlueprintActions";
import confetti from "canvas-confetti";

interface ClientBlueprintCatalogProps {
  workflows: any[];
  quota: {
    allowed: boolean;
    limit: number;
    used: number;
    remaining: number;
    planName: string;
    isUnlimited: boolean;
  };
}

export function ClientBlueprintCatalog({
  workflows,
  quota,
}: ClientBlueprintCatalogProps) {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = React.useState("");
  const [selectedCategory, setSelectedCategory] = React.useState("ALL");
  const [activatingId, setActivatingId] = React.useState<string | null>(null);
  const [successInfo, setSuccessInfo] = React.useState<{ title: string; id: string; webhookUrl: string } | null>(null);
  const [errorMessage, setErrorMessage] = React.useState<string | null>(null);
  
  // Limit Upgrade Modal & Explanation Modal States
  const [upgradeModalOpen, setUpgradeModalOpen] = React.useState(false);
  const [explainingWorkflow, setExplainingWorkflow] = React.useState<any | null>(null);

  const categories = ["ALL", "WhatsApp", "E-Commerce", "Lead Generation", "AI Support", "CRM"];

  const filteredWorkflows = workflows.filter((wf) => {
    const matchesSearch =
      wf.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      wf.summary.toLowerCase().includes(searchQuery.toLowerCase());
    
    if (selectedCategory === "ALL") return matchesSearch;
    const catName = wf.category?.name || "";
    return matchesSearch && catName.toLowerCase().includes(selectedCategory.toLowerCase());
  });

  const handleActivate = async (workflow: any) => {
    if (!quota.allowed) {
      setUpgradeModalOpen(true);
      return;
    }

    setActivatingId(workflow.id);
    setErrorMessage(null);
    setSuccessInfo(null);

    const res = await activateBlueprintForClient(workflow.id);
    setActivatingId(null);

    if (res.success && res.projectId) {
      setSuccessInfo({
        title: workflow.title,
        id: res.projectId,
        webhookUrl: res.webhookUrl || "",
      });
      confetti({ particleCount: 80, spread: 60, origin: { y: 0.6 } });
    } else {
      if (res.limitReached) {
        setUpgradeModalOpen(true);
      }
      setErrorMessage(res.error || "Failed to activate workflow.");
    }
  };

  return (
    <div className="space-y-6">
      {/* Top Banner with Quota Status */}
      <div className="rounded-3xl border border-border dark:border-[#22222a] bg-card dark:bg-[#141418] p-6 sm:p-8 space-y-4 shadow-xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="space-y-1 max-w-2xl">
            <div className="flex items-center gap-2">
              <span className="px-3 py-1 rounded-full text-xs font-bold bg-[#ffd233] text-black shadow-xs">
                ⚡ 1-Click Production Blueprints
              </span>
              <span className="text-xs font-bold text-amber-700 dark:text-[#ffd233]">
                {quota.planName} Plan
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black text-foreground dark:text-white tracking-tight">
              Pre-Built Automation Marketplace
            </h1>
            <p className="text-xs sm:text-sm text-muted-foreground dark:text-[#8e8e93] leading-relaxed">
              Activate any tested, ready-made workflow in seconds. Connect your WhatsApp, Shopify, or Google Sheets with pre-configured node logic.
            </p>
          </div>

          {/* Quota Progress Tracker */}
          <div className={`p-4 rounded-2xl border text-xs space-y-2 shrink-0 min-w-[240px] ${
            !quota.allowed
              ? "bg-amber-500/10 border-amber-500/30 text-amber-900 dark:text-amber-300"
              : "bg-muted/40 dark:bg-[#1a1a22] border-border dark:border-[#26262e]"
          }`}>
            <div className="flex items-center justify-between font-bold">
              <span>Active Workflows:</span>
              <span className={!quota.allowed ? "text-red-500 font-extrabold" : "text-amber-700 dark:text-[#ffd233]"}>
                {quota.isUnlimited ? "Unlimited" : `${quota.used} / ${quota.limit}`}
              </span>
            </div>

            {/* Quota Bar */}
            {!quota.isUnlimited && (
              <div className="h-2 w-full bg-border dark:bg-[#26262e] rounded-full overflow-hidden">
                <div
                  className={`h-full transition-all ${
                    !quota.allowed ? "bg-red-500" : "bg-[#ffd233]"
                  }`}
                  style={{ width: `${Math.min(100, (quota.used / quota.limit) * 100)}%` }}
                />
              </div>
            )}

            <div className="flex items-center justify-between text-[11px] pt-1">
              <span>
                {quota.isUnlimited
                  ? "Unlimited deployments"
                  : !quota.allowed
                  ? "⚠️ Quota reached (0 left)"
                  : `${quota.remaining} remaining credit(s)`}
              </span>
              {!quota.allowed && (
                <Link
                  href="/dashboard/subscription"
                  className="font-bold text-amber-700 dark:text-[#ffd233] underline hover:opacity-80"
                >
                  Upgrade →
                </Link>
              )}
            </div>
          </div>
        </div>

        {/* Quota Warning Message if Limit Reached */}
        {!quota.allowed && (
          <div className="p-4 rounded-2xl bg-amber-500/15 border border-amber-500/30 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
            <div className="flex items-center gap-2 text-amber-800 dark:text-amber-300 font-medium">
              <AlertCircle className="h-4 w-4 shrink-0 text-amber-600 dark:text-[#ffd233]" />
              <span>
                لقد استهلكت جميع الأوتوميشن المتاحة في باقة <strong>{quota.planName}</strong> ({quota.used} من {quota.limit}). قم بالترقية لتفعيل المزيد!
              </span>
            </div>
            <Link
              href="/dashboard/subscription"
              className="h-8 px-4 rounded-xl bg-[#ffd233] hover:bg-[#f5c71a] text-black font-extrabold text-xs inline-flex items-center gap-1.5 shadow-xs shrink-0"
            >
              <CreditCard className="h-3.5 w-3.5" />
              <span>ترقية الباقة (Upgrade)</span>
            </Link>
          </div>
        )}

        {/* Success Banner upon activation */}
        {successInfo && (
          <div className="p-5 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 space-y-3 animate-in fade-in slide-in-from-top-2 duration-300">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-emerald-600 dark:text-emerald-400 font-bold text-sm">
                <CheckCircle2 className="h-5 w-5" />
                <span>Workflow Successfully Activated & Deployed!</span>
              </div>
              <Link
                href={`/dashboard/workflows/${successInfo.id}`}
                className="h-8 px-4 rounded-xl bg-[#ffd233] hover:bg-[#f5c71a] text-black font-extrabold text-xs inline-flex items-center gap-1 shadow-xs transition-all"
              >
                <span>Open in Workspace</span>
                <ChevronRight className="h-3.5 w-3.5" />
              </Link>
            </div>
            <p className="text-xs text-foreground dark:text-zinc-200">
              <strong>{successInfo.title}</strong> is now live in your workspace.
            </p>
          </div>
        )}

        {errorMessage && (
          <div className="p-4 rounded-xl bg-destructive/10 border border-destructive/30 text-destructive text-xs font-bold">
            {errorMessage}
          </div>
        )}
      </div>

      {/* Search & Category Filter Bar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
        <div className="relative w-full sm:w-72">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-muted-foreground" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search blueprints..."
            className="w-full h-10 pl-9 pr-3 text-xs rounded-xl border border-border dark:border-[#26262e] bg-card dark:bg-[#141418] text-foreground dark:text-white focus:outline-none focus:border-[#ffd233]"
          />
        </div>

        {/* Category Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto w-full sm:w-auto no-scrollbar pb-1 text-xs">
          {categories.map((cat) => {
            const active = selectedCategory === cat;
            return (
              <button
                key={cat}
                type="button"
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1.5 rounded-xl font-bold transition-all shrink-0 border ${
                  active
                    ? "bg-[#ffd233] text-black border-[#ffd233] shadow-xs"
                    : "bg-card dark:bg-[#141418] text-muted-foreground border-border dark:border-[#22222a] hover:text-foreground"
                }`}
              >
                {cat}
              </button>
            );
          })}
        </div>
      </div>

      {/* Blueprint Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredWorkflows.map((wf) => {
          const isActivating = activatingId === wf.id;

          return (
            <div
              key={wf.id}
              className="rounded-3xl border border-border dark:border-[#22222a] bg-card dark:bg-[#141418] p-6 flex flex-col justify-between space-y-6 shadow-xs hover:border-[#ffd233]/50 transition-all group"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <Badge variant="default" className="text-[10px] bg-[#ffd233] text-black font-bold">
                    {wf.category?.name || "Automation"}
                  </Badge>
                  <span className="text-[10px] text-muted-foreground font-medium flex items-center gap-1">
                    <Clock className="h-3 w-3" />
                    {wf.estimatedTime || "15 mins"}
                  </span>
                </div>

                <div className="space-y-1.5">
                  <h3 className="text-base font-bold text-foreground dark:text-white group-hover:text-amber-600 dark:group-hover:text-[#ffd233] transition-colors line-clamp-1">
                    {wf.title}
                  </h3>
                  <p className="text-xs text-muted-foreground dark:text-[#8e8e93] line-clamp-2 leading-relaxed">
                    {wf.summary}
                  </p>
                </div>

                {/* Platforms Chips */}
                {wf.platforms?.length > 0 && (
                  <div className="flex items-center gap-1.5 flex-wrap pt-1">
                    {wf.platforms.slice(0, 3).map(({ platform }: any) => (
                      <div
                        key={platform.id}
                        className="inline-flex items-center gap-1 px-2 py-0.5 rounded-lg bg-muted/60 dark:bg-[#1a1a22] border border-border dark:border-[#26262e] text-[10px] font-semibold text-foreground dark:text-[#d4d4d8]"
                      >
                        <PlatformIcon slug={platform.slug} name={platform.name} size="xs" withBadge={false} />
                        <span className="truncate max-w-[80px]">{platform.name}</span>
                      </div>
                    ))}
                    {wf.platforms.length > 3 && (
                      <span className="text-[10px] text-muted-foreground font-semibold">
                        +{wf.platforms.length - 3} more
                      </span>
                    )}
                  </div>
                )}
              </div>

              {/* Action Buttons */}
              <div className="space-y-2 pt-4 border-t border-border dark:border-[#22222a]">
                <Button
                  type="button"
                  disabled={isActivating}
                  onClick={() => handleActivate(wf)}
                  className={`w-full h-11 rounded-xl font-black text-xs gap-2 transition-all active:scale-98 ${
                    !quota.allowed
                      ? "bg-amber-500/20 hover:bg-amber-500/30 text-amber-800 dark:text-[#ffd233] border border-amber-500/30"
                      : "bg-[#ffd233] hover:bg-[#f5c71a] text-black shadow-md shadow-[#ffd233]/20"
                  }`}
                >
                  {isActivating ? (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin" />
                      Activating in Workspace...
                    </>
                  ) : !quota.allowed ? (
                    <>
                      <Lock className="h-4 w-4 text-amber-600 dark:text-[#ffd233]" />
                      <span>🔒 Limit Reached (Upgrade Plan)</span>
                    </>
                  ) : (
                    <>
                      <Zap className="h-4 w-4 fill-current" />
                      <span>Activate to My Account</span>
                    </>
                  )}
                </Button>

                {/* Explanation Button (Simple & Advanced) */}
                <button
                  type="button"
                  onClick={() => setExplainingWorkflow(wf)}
                  className="w-full h-8 rounded-xl bg-muted/40 dark:bg-[#1a1a22] hover:bg-muted text-foreground dark:text-[#a1a1aa] font-semibold text-[11px] flex items-center justify-center gap-1.5 transition-colors"
                >
                  <Sparkles className="h-3 w-3 text-amber-600 dark:text-[#ffd233]" />
                  <span>📖 Simple Explanation (شرح مبسط)</span>
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* 1. UPGRADE QUOTA MODAL */}
      {upgradeModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in duration-200">
          <div className="bg-card dark:bg-[#141418] border border-border dark:border-[#26262e] rounded-3xl p-6 sm:p-8 max-w-md w-full space-y-5 shadow-2xl relative">
            <button
              onClick={() => setUpgradeModalOpen(false)}
              className="absolute top-5 right-5 p-1.5 rounded-full hover:bg-muted text-muted-foreground"
            >
              <X className="h-4 w-4" />
            </button>

            <div className="h-14 w-14 rounded-2xl bg-amber-500/15 border border-amber-500/30 text-amber-700 dark:text-[#ffd233] flex items-center justify-center mx-auto">
              <Lock className="h-7 w-7" />
            </div>

            <div className="text-center space-y-2">
              <h3 className="text-lg font-black text-foreground dark:text-white">
                Workflow Quota Limit Reached!
              </h3>
              <p className="text-xs text-muted-foreground leading-relaxed">
                You have reached the maximum active workflow limit for your <strong>{quota.planName} Plan</strong> ({quota.used} of {quota.limit} active workflows).
              </p>
              <p className="text-xs text-amber-700 dark:text-[#ffd233] font-semibold">
                Upgrade to Business (5 workflows) or Pro (Unlimited) to activate this automation instantly.
              </p>
            </div>

            <div className="space-y-2 pt-2">
              <Link
                href="/dashboard/subscription"
                className="w-full h-11 rounded-xl bg-[#ffd233] hover:bg-[#f5c71a] text-black font-extrabold text-xs inline-flex items-center justify-center gap-2 shadow-md"
              >
                <CreditCard className="h-4 w-4" />
                <span>Upgrade Subscription Plan</span>
              </Link>
              <Button
                variant="ghost"
                onClick={() => setUpgradeModalOpen(false)}
                className="w-full text-xs text-muted-foreground hover:text-foreground"
              >
                Maybe Later
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* 2. SIMPLE & ADVANCED EXPLANATION MODAL */}
      {explainingWorkflow && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in duration-200">
          <div className="bg-card dark:bg-[#141418] border border-border dark:border-[#26262e] rounded-3xl p-6 sm:p-8 max-w-2xl w-full space-y-6 shadow-2xl relative max-h-[90vh] overflow-y-auto">
            <button
              onClick={() => setExplainingWorkflow(null)}
              className="absolute top-5 right-5 p-1.5 rounded-full hover:bg-muted text-muted-foreground"
            >
              <X className="h-4 w-4" />
            </button>

            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <Badge variant="default" className="text-[10px] bg-[#ffd233] text-black font-bold">
                  {explainingWorkflow.category?.name || "Blueprint"}
                </Badge>
                <span className="text-xs text-muted-foreground">{explainingWorkflow.estimatedTime || "15 mins setup"}</span>
              </div>
              <h3 className="text-xl font-black text-foreground dark:text-white">
                {explainingWorkflow.title}
              </h3>
            </div>

            {/* Simple Visual Flow in Plain Language */}
            <div className="space-y-3">
              <h4 className="text-xs font-bold uppercase tracking-wider text-amber-700 dark:text-[#ffd233] flex items-center gap-1.5">
                <Sparkles className="h-3.5 w-3.5" />
                💡 كيف يعمل هذا الورك فلو ببساطة (Plain Language)
              </h4>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
                <div className="p-3.5 rounded-2xl bg-muted/40 dark:bg-[#1a1a22] border border-border dark:border-[#26262e] space-y-1">
                  <strong className="text-amber-700 dark:text-[#ffd233] block text-[10px] uppercase font-bold">1. عندما يحدث هذا</strong>
                  <span className="text-foreground dark:text-white font-medium">الزبون يرسل طلباً أو يملأ استمارة</span>
                </div>
                <div className="p-3.5 rounded-2xl bg-muted/40 dark:bg-[#1a1a22] border border-border dark:border-[#26262e] space-y-1">
                  <strong className="text-sky-600 dark:text-sky-400 block text-[10px] uppercase font-bold">2. النظام يقوم تلقائياً</strong>
                  <span className="text-foreground dark:text-white font-medium">الذكاء الاصطناعي يستخرج العنوان والمنتج</span>
                </div>
                <div className="p-3.5 rounded-2xl bg-muted/40 dark:bg-[#1a1a22] border border-border dark:border-[#26262e] space-y-1">
                  <strong className="text-emerald-600 dark:text-emerald-400 block text-[10px] uppercase font-bold">3. النتيجة الفورية</strong>
                  <span className="text-foreground dark:text-white font-medium">إرسال تأكيد بالواتساب وحفظ الطلب فـ Excel</span>
                </div>
              </div>
            </div>

            {/* Detailed Description */}
            <div className="p-4 rounded-2xl bg-muted/20 dark:bg-[#181820] border border-border dark:border-[#26262e] text-xs text-muted-foreground leading-relaxed whitespace-pre-line">
              {explainingWorkflow.description || explainingWorkflow.summary}
            </div>

            {/* Business Value Box */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              <div className="flex items-start gap-2.5 p-3 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-800 dark:text-amber-300">
                <Clock className="h-4 w-4 shrink-0 mt-0.5" />
                <span>يوفر عليك 2 إلى 3 ساعات يومياً من النسخ واللصق اليدوي.</span>
              </div>
              <div className="flex items-start gap-2.5 p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-800 dark:text-emerald-300">
                <ShieldCheck className="h-4 w-4 shrink-0 mt-0.5" />
                <span>دقة 100% بدون أي أخطاء بشرية في أرقام الهواتف أو العناوين.</span>
              </div>
            </div>

            <div className="flex items-center justify-end gap-3 pt-2">
              <Button
                variant="outline"
                onClick={() => setExplainingWorkflow(null)}
                className="text-xs rounded-xl"
              >
                Close
              </Button>
              <Button
                disabled={activatingId === explainingWorkflow.id}
                onClick={() => {
                  const wf = explainingWorkflow;
                  setExplainingWorkflow(null);
                  handleActivate(wf);
                }}
                className="rounded-xl bg-[#ffd233] hover:bg-[#f5c71a] text-black font-extrabold text-xs gap-1.5 shadow-md"
              >
                <Zap className="h-3.5 w-3.5 fill-current" />
                <span>تفعيل هذا الورك فلو الآن</span>
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
