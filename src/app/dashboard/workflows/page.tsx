import Link from "next/link";
import {
  Layers,
  PlusCircle,
  Search,
  Zap,
  Clock,
  CheckCircle2,
  AlertCircle,
  ArrowRight,
  ArrowUpRight,
  Sparkles,
  Bot,
  Filter,
  FileText
} from "lucide-react";
import { getClientSession } from "@/actions/clientAuthActions";
import { getClientWorkflowRequests } from "@/actions/clientWorkflowActions";
import { formatDate } from "@/lib/utils";

export const dynamic = "force-dynamic";

export default async function ClientWorkflowsListPage() {
  const session = await getClientSession();
  if (!session) return null;

  const requests = await getClientWorkflowRequests();

  return (
    <div className="space-y-6">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl sm:text-2xl font-black text-foreground dark:text-white tracking-tight flex items-center gap-2">
            <Layers className="h-5 w-5 text-amber-600 dark:text-[#ffd233]" />
            Your Automation Blueprints & Requests
          </h1>
          <p className="text-xs text-muted-foreground dark:text-[#71717a] mt-0.5">
            Total <strong className="text-foreground dark:text-white">{requests.length}</strong> workflow requests submitted. Track progress, messages, and deployment updates.
          </p>
        </div>

        <div className="flex items-center gap-2.5 flex-wrap">
          <Link
            href="/dashboard/blueprints"
            className="h-10 px-4 rounded-xl bg-card dark:bg-[#1a1a22] hover:bg-muted border border-border dark:border-[#2a2a34] text-foreground dark:text-white font-bold text-xs inline-flex items-center gap-1.5 shadow-xs transition-all shrink-0"
          >
            <Sparkles className="h-4 w-4 text-amber-600 dark:text-[#ffd233]" />
            <span>⚡ Ready-Made Blueprints</span>
          </Link>

          <Link
            href="/dashboard/workflows/new"
            className="h-10 px-5 rounded-xl bg-[#ffd233] hover:bg-[#f5c71a] text-black font-extrabold text-xs inline-flex items-center gap-1.5 shadow-md shadow-[#ffd233]/20 transition-all shrink-0 active:scale-95"
          >
            <PlusCircle className="h-4 w-4" />
            <span>+ Request Custom</span>
          </Link>
        </div>
      </div>

      {/* Requests Grid */}
      {requests.length === 0 ? (
        <div className="rounded-3xl border border-dashed border-border dark:border-[#26262e] bg-card dark:bg-[#141418] p-12 text-center max-w-lg mx-auto space-y-4">
          <div className="mx-auto h-14 w-14 rounded-2xl bg-muted dark:bg-[#1e1e26] border border-border dark:border-[#2a2a34] text-amber-600 dark:text-[#ffd233] flex items-center justify-center">
            <Layers className="h-7 w-7" />
          </div>
          <div className="space-y-1">
            <h3 className="text-base font-bold text-foreground dark:text-white">
              No workflow requests found
            </h3>
            <p className="text-xs text-muted-foreground dark:text-[#71717a] leading-relaxed">
              You haven&apos;t requested any automations yet. Use our conversational 8-step wizard to tell us what you do manually.
            </p>
          </div>
          <Link
            href="/dashboard/workflows/new"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[#ffd233] hover:bg-[#f5c71a] text-black font-extrabold text-xs shadow-md shadow-[#ffd233]/20 transition-all"
          >
            <PlusCircle className="h-4 w-4" />
            <span>Create Your First Request</span>
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {requests.map((req: any) => {
            let badgeClass = "bg-amber-500/10 text-amber-700 dark:text-amber-400 border-amber-500/20";
            if (req.status === "COMPLETED") badgeClass = "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20";
            if (req.status === "IN_PROGRESS" || req.status === "TESTING") badgeClass = "bg-sky-500/10 text-sky-600 dark:text-sky-400 border-sky-500/20";
            if (req.status === "DRAFT") badgeClass = "bg-zinc-500/10 text-zinc-600 dark:text-zinc-400 border-zinc-500/20";

            return (
              <div
                key={req.id}
                className="rounded-2xl border border-border dark:border-[#22222a] bg-card dark:bg-[#141418] p-5 sm:p-6 shadow-xs hover:border-[#ffd233]/50 transition-all flex flex-col justify-between space-y-4 group"
              >
                <div className="space-y-3">
                  <div className="flex items-start justify-between gap-2">
                    <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold border ${badgeClass}`}>
                      {req.status.replace("_", " ")}
                    </span>
                    <span className="text-[10px] text-muted-foreground dark:text-[#71717a] font-mono">
                      ID: {req.id.slice(0, 8)}
                    </span>
                  </div>

                  <div>
                    <h3 className="text-base font-bold text-foreground dark:text-white group-hover:text-amber-600 dark:group-hover:text-[#ffd233] transition-colors line-clamp-1">
                      {req.title}
                    </h3>
                    <p className="text-xs text-muted-foreground dark:text-[#8e8e93] line-clamp-2 mt-1 leading-relaxed">
                      {req.problemDescription || req.desiredAutomationDesc || "Automation workflow project specification."}
                    </p>
                  </div>
                </div>

                <div className="space-y-3 pt-3 border-t border-border dark:border-[#22222a]">
                  {/* Progress Info */}
                  <div className="space-y-1.5">
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-[11px] text-muted-foreground dark:text-[#71717a] font-medium">
                        Development Progress
                      </span>
                      <span className="font-bold text-foreground dark:text-white">
                        {req.progress}%
                      </span>
                    </div>
                    <div className="h-2 w-full rounded-full bg-muted dark:bg-[#262632] overflow-hidden">
                      <div
                        style={{ width: `${req.progress}%` }}
                        className="h-full bg-[#ffd233] rounded-full transition-all duration-500"
                      />
                    </div>
                  </div>

                  {/* Metadata Chips & Action */}
                  <div className="flex items-center justify-between gap-2 pt-1 text-xs">
                    <div className="flex items-center gap-3 text-[11px] text-muted-foreground dark:text-[#71717a]">
                      <span>{req.steps?.length || 0} Steps</span>
                      <span>•</span>
                      <span>{req.integrations?.length || 0} Tools</span>
                      <span>•</span>
                      <span>{formatDate(req.createdAt)}</span>
                    </div>

                    <Link
                      href={`/dashboard/workflows/${req.id}`}
                      className="px-3.5 py-1.5 rounded-xl bg-muted dark:bg-[#1e1e26] hover:bg-[#ffd233] hover:text-black text-foreground dark:text-white font-bold text-xs inline-flex items-center gap-1.5 transition-all shadow-xs border border-border dark:border-transparent"
                    >
                      <span>Open Project</span>
                      <ArrowRight className="h-3.5 w-3.5" />
                    </Link>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

