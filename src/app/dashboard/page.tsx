import Link from "next/link";
import {
  Layers,
  PlusCircle,
  Zap,
  Clock,
  CheckCircle2,
  AlertCircle,
  ArrowRight,
  TrendingUp,
  CreditCard,
  MessageSquare,
  Sparkles,
  ArrowUpRight,
  Bot,
  Activity,
  FileText
} from "lucide-react";
import { getClientSession } from "@/actions/clientAuthActions";
import { getClientWorkflowRequests } from "@/actions/clientWorkflowActions";
import { checkWorkflowLimit } from "@/actions/subscriptionActions";
import { formatDate } from "@/lib/utils";

export const dynamic = "force-dynamic";

export default async function ClientDashboardPage() {
  const session = await getClientSession();
  if (!session) return null;

  const [requests, quota] = await Promise.all([
    getClientWorkflowRequests(),
    checkWorkflowLimit(session.id),
  ]);

  const pendingCount = requests.filter((r: any) => r.status === "PENDING_REVIEW" || r.status === "REVIEWING").length;
  const inProgressCount = requests.filter((r: any) => r.status === "APPROVED" || r.status === "IN_PROGRESS" || r.status === "TESTING").length;
  const completedCount = requests.filter((r: any) => r.status === "COMPLETED").length;

  return (
    <div className="space-y-6">
      {/* 1. Welcome & Primary Request CTA Banner */}
      <div className="rounded-3xl bg-gradient-to-r from-card via-muted/40 to-card dark:from-[#141419] dark:via-[#191922] dark:to-[#141419] border border-border dark:border-[#22222a] p-6 sm:p-8 relative overflow-hidden shadow-xs">
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#ffd233]/10 rounded-full blur-3xl pointer-events-none" />

        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 relative z-10">
          <div className="space-y-2 max-w-2xl">
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-[#ffd233] text-black shadow-xs">
                ✦ Turnkey Automation Workspace
              </span>
              <span className="text-xs text-muted-foreground dark:text-[#8e8e93]">
                {session.company || session.name}
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black text-foreground dark:text-white tracking-tight">
              Ready to automate your next manual process?
            </h1>
            <p className="text-xs sm:text-sm text-muted-foreground dark:text-[#8e8e93] leading-relaxed">
              Tell us what is slow, repetitive, or causing mistakes in your business. Our certified automation architects transform your explanation into a production-ready system in 48 hours.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 shrink-0 flex-wrap">
            <Link
              href="/dashboard/blueprints"
              className="h-12 px-6 rounded-2xl bg-[#ffd233] hover:bg-[#f5c71a] text-black font-extrabold text-xs inline-flex items-center justify-center gap-2 shadow-md shadow-[#ffd233]/20 transition-all active:scale-95"
            >
              <Zap className="h-4 w-4 fill-current" />
              <span>⚡ Choose Ready Workflow</span>
            </Link>
            <Link
              href="/dashboard/workflows/new"
              className="h-12 px-5 rounded-2xl bg-card dark:bg-[#1b1b22] hover:bg-muted dark:hover:bg-[#252530] border border-border dark:border-[#26262e] text-foreground dark:text-white font-bold text-xs inline-flex items-center justify-center gap-2 transition-all"
            >
              <PlusCircle className="h-4 w-4" />
              <span>+ Custom Request</span>
            </Link>
          </div>
        </div>
      </div>

      {/* 2. Top 4 Metric KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Card 1: Subscription Tier */}
        <div className="rounded-2xl bg-card dark:bg-[#141418] border border-border dark:border-[#22222a] p-4 sm:p-5 relative overflow-hidden shadow-xs">
          <div className="flex items-center justify-between text-xs text-muted-foreground dark:text-[#8e8e93] mb-1">
            <span className="font-semibold">Current Subscription</span>
            <span className="inline-flex items-center text-[10px] font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-full border border-emerald-500/20">
              ● Active
            </span>
          </div>
          <div className="text-2xl font-black text-foreground dark:text-white tracking-tight mt-2">
            {quota.planName}
          </div>
          <p className="text-[11px] text-muted-foreground dark:text-[#71717a] mt-1">
            {quota.isUnlimited ? "Unlimited workflows" : `${quota.limit} workflow allowance`}
          </p>
        </div>

        {/* Card 2: In Progress */}
        <div className="rounded-2xl bg-card dark:bg-[#141418] border border-border dark:border-[#22222a] p-4 sm:p-5 relative overflow-hidden shadow-xs">
          <div className="flex items-center justify-between text-xs text-muted-foreground dark:text-[#8e8e93] mb-1">
            <span className="font-semibold">In Development</span>
            <span className="inline-flex items-center text-[10px] font-bold text-amber-700 dark:text-[#ffd233] bg-[#ffd233]/20 px-2 py-0.5 rounded-full">
              Building
            </span>
          </div>
          <div className="text-2xl font-black text-foreground dark:text-white tracking-tight mt-2">
            {inProgressCount}
          </div>
          <p className="text-[11px] text-muted-foreground dark:text-[#71717a] mt-1">
            Active automation pipelines
          </p>
        </div>

        {/* Card 3: Completed Automations */}
        <div className="rounded-2xl bg-card dark:bg-[#141418] border border-border dark:border-[#22222a] p-4 sm:p-5 relative overflow-hidden shadow-xs">
          <div className="flex items-center justify-between text-xs text-muted-foreground dark:text-[#8e8e93] mb-1">
            <span className="font-semibold">Completed Systems</span>
            <span className="inline-flex items-center text-[10px] font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-full">
              Live
            </span>
          </div>
          <div className="text-2xl font-black text-foreground dark:text-white tracking-tight mt-2">
            {completedCount}
          </div>
          <p className="text-[11px] text-muted-foreground dark:text-[#71717a] mt-1">
            Deployed & running seamlessly
          </p>
        </div>

        {/* Card 4: Remaining Workflow Credits */}
        <div className="rounded-2xl bg-card dark:bg-[#141418] border border-border dark:border-[#22222a] p-4 sm:p-5 relative overflow-hidden shadow-xs">
          <div className="flex items-center justify-between text-xs text-muted-foreground dark:text-[#8e8e93] mb-1">
            <span className="font-semibold">Remaining Credits</span>
            <span className="inline-flex items-center text-[10px] font-bold text-indigo-600 dark:text-indigo-400 bg-indigo-500/10 px-2 py-0.5 rounded-full">
              Quota
            </span>
          </div>
          <div className="text-2xl font-black text-foreground dark:text-white tracking-tight mt-2">
            {quota.isUnlimited ? "∞" : quota.remaining}
          </div>
          <p className="text-[11px] text-muted-foreground dark:text-[#71717a] mt-1">
            {quota.isUnlimited ? "Unlimited requests allowed" : `${quota.used} of ${quota.limit} used`}
          </p>
        </div>
      </div>

      {/* 3. Main Grid (Active Workflows List + Support Sidebar) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        
        {/* Left Column (8 of 12) - Workflows List */}
        <div className="lg:col-span-8 space-y-6">
          <div className="rounded-2xl bg-card dark:bg-[#141418] border border-border dark:border-[#22222a] p-5 sm:p-6 space-y-4 shadow-xs">
            <div className="flex items-center justify-between gap-3 pb-3 border-b border-border dark:border-[#22222a]">
              <div>
                <h3 className="text-sm font-bold text-foreground dark:text-white flex items-center gap-2">
                  <Layers className="h-4 w-4 text-amber-600 dark:text-[#ffd233]" />
                  Your Workflow Projects ({requests.length})
                </h3>
                <p className="text-xs text-muted-foreground dark:text-[#71717a] mt-0.5">
                  Track the real-time engineering progress, test links, and team notes.
                </p>
              </div>

              <Link
                href="/dashboard/workflows"
                className="text-xs text-amber-700 dark:text-[#ffd233] hover:underline font-bold inline-flex items-center gap-1"
              >
                <span>View All</span>
                <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </div>

            {requests.length === 0 ? (
              /* Empty State */
              <div className="p-8 text-center space-y-3 rounded-xl border border-dashed border-border dark:border-[#26262e] bg-muted/20 dark:bg-[#101014]">
                <div className="h-12 w-12 rounded-xl bg-muted dark:bg-[#1b1b22] border border-border dark:border-[#2a2a34] text-amber-600 dark:text-[#ffd233] flex items-center justify-center mx-auto">
                  <Sparkles className="h-6 w-6" />
                </div>
                <h4 className="text-sm font-bold text-foreground dark:text-white">
                  No workflow requests submitted yet
                </h4>
                <p className="text-xs text-muted-foreground dark:text-[#71717a] max-w-sm mx-auto">
                  Start by submitting your first manual process. Our guided conversational wizard takes only 3 minutes to complete.
                </p>
                <Link
                  href="/dashboard/workflows/new"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#ffd233] hover:bg-[#f5c71a] text-black font-bold text-xs shadow-xs transition-all"
                >
                  <PlusCircle className="h-4 w-4" />
                  <span>Start First Request</span>
                </Link>
              </div>
            ) : (
              /* Workflow Cards */
              <div className="space-y-3">
                {requests.slice(0, 4).map((req: any) => {
                  let badgeColor = "bg-amber-500/10 text-amber-700 dark:text-amber-400 border-amber-500/20";
                  if (req.status === "COMPLETED") badgeColor = "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20";
                  if (req.status === "IN_PROGRESS" || req.status === "TESTING") badgeColor = "bg-sky-500/10 text-sky-600 dark:text-sky-400 border-sky-500/20";
                  if (req.status === "DRAFT") badgeColor = "bg-zinc-500/10 text-zinc-600 dark:text-zinc-400 border-zinc-500/20";

                  return (
                    <Link
                      key={req.id}
                      href={`/dashboard/workflows/${req.id}`}
                      className="block p-4 rounded-xl border border-border dark:border-[#26262e] bg-muted/30 dark:bg-[#18181f] hover:border-[#ffd233]/50 transition-all space-y-3 group shadow-xs"
                    >
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                        <div className="space-y-1">
                          <div className="flex items-center gap-2">
                            <h4 className="text-sm font-bold text-foreground dark:text-white group-hover:text-amber-600 dark:group-hover:text-[#ffd233] transition-colors">
                              {req.title}
                            </h4>
                            <span className={`px-2 py-0.5 rounded-md text-[10px] font-bold border ${badgeColor}`}>
                              {req.status.replace("_", " ")}
                            </span>
                          </div>
                          <p className="text-xs text-muted-foreground dark:text-[#71717a] line-clamp-1">
                            {req.problemDescription || req.desiredAutomationDesc || "Automation workflow project"}
                          </p>
                        </div>

                        <div className="text-right shrink-0">
                          <span className="text-[11px] font-bold text-foreground dark:text-white">
                            {req.progress}%
                          </span>
                          <span className="text-[10px] text-muted-foreground dark:text-[#71717a] block">
                            {formatDate(req.createdAt)}
                          </span>
                        </div>
                      </div>

                      {/* Progress Bar */}
                      <div className="h-1.5 w-full rounded-full bg-muted dark:bg-[#262632] overflow-hidden">
                        <div
                          style={{ width: `${req.progress}%` }}
                          className="h-full bg-[#ffd233] rounded-full transition-all duration-500"
                        />
                      </div>
                    </Link>
                  );
                })}
              </div>
            )}
          </div>
        </div>

        {/* Right Column (4 of 12) - Plan & Quick Help */}
        <div className="lg:col-span-4 space-y-6">
          {/* Plan Summary Card */}
          <div className="rounded-2xl bg-card dark:bg-[#141418] border border-border dark:border-[#22222a] p-5 space-y-4 shadow-xs">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-foreground dark:text-white">Active Subscription</span>
              <Link
                href="/dashboard/subscription"
                className="text-[11px] text-amber-700 dark:text-[#ffd233] hover:underline font-semibold"
              >
                Change Plan
              </Link>
            </div>

            <div className="p-4 rounded-xl bg-muted/40 dark:bg-[#18181f] border border-border dark:border-[#26262e] space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm font-extrabold text-foreground dark:text-white">{quota.planName} Plan</span>
                <span className="text-xs font-bold text-amber-700 dark:text-[#ffd233]">
                  {quota.isUnlimited ? "Unlimited" : `${quota.remaining} Left`}
                </span>
              </div>
              <p className="text-[11px] text-muted-foreground dark:text-[#8e8e93] leading-relaxed">
                Includes turnkey execution, webhook setups, AI customer agents, and code exports.
              </p>
            </div>

            <Link
              href="/dashboard/subscription"
              className="w-full h-9 rounded-xl bg-[#ffd233] hover:bg-[#f5c71a] text-black font-bold text-xs flex items-center justify-center gap-1.5 shadow-xs transition-all"
            >
              <Zap className="h-3.5 w-3.5" />
              <span>Upgrade Plan & Quota</span>
            </Link>
          </div>

          {/* Direct Support Card */}
          <div className="rounded-2xl bg-card dark:bg-[#141418] border border-border dark:border-[#22222a] p-5 space-y-3 shadow-xs">
            <h4 className="text-xs font-bold text-foreground dark:text-white flex items-center gap-1.5">
              <MessageSquare className="h-4 w-4 text-emerald-500" />
              Direct Engineer Consultation
            </h4>
            <p className="text-xs text-muted-foreground dark:text-[#71717a] leading-relaxed">
              Have questions about an API or custom workflow? Our certified engineers are available on WhatsApp for instant guidance.
            </p>
            <a
              href="https://wa.me/212600000000?text=Salam%20AutoFlows%20Team%2C%20I%20need%20assistance%20with%20my%20workflow%20request"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full h-9 rounded-xl bg-emerald-500/15 hover:bg-emerald-500/25 border border-emerald-500/30 text-emerald-600 dark:text-emerald-400 font-bold text-xs flex items-center justify-center gap-1.5 transition-colors shadow-xs"
            >
              <MessageSquare className="h-3.5 w-3.5" />
              <span>Chat on WhatsApp</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

