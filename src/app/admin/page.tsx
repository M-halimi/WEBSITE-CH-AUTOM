import Link from "next/link";
import {
  Layers,
  Users,
  Eye,
  CheckCircle2,
  ArrowUpRight,
  PlusCircle,
  UploadCloud,
  Clock,
  Sparkles,
  MessageSquare,
  Search,
  Download,
  Settings,
  Plus,
  Zap,
  CreditCard,
  TrendingUp,
  Activity,
  ArrowDownLeft,
  ChevronDown,
  ShieldCheck,
  Cpu,
  Bot
} from "lucide-react";
import { prisma } from "@/lib/prisma";
import { formatDate } from "@/lib/utils";
import { PlatformIcon } from "@/components/ui/platform-icon";
import { ActivityChart } from "@/components/admin/ActivityChart";
import { VirtualBusinessCard } from "@/components/admin/VirtualBusinessCard";

export const dynamic = "force-dynamic";

export default async function AdminDashboardPage() {
  const [
    totalWorkflows,
    publishedWorkflows,
    totalLeads,
    newLeadsCount,
    recentWorkflows,
    recentLeads,
    viewsAggregate,
  ] = await Promise.all([
    prisma.workflow.count(),
    prisma.workflow.count({ where: { status: "PUBLISHED" } }),
    prisma.leadRequest.count(),
    prisma.leadRequest.count({ where: { status: "NEW" } }),
    prisma.workflow.findMany({
      include: {
        category: true,
        platforms: { include: { platform: true } },
      },
      orderBy: { createdAt: "desc" },
      take: 5,
    }),
    prisma.leadRequest.findMany({
      include: { workflow: true },
      orderBy: { createdAt: "desc" },
      take: 5,
    }),
    prisma.workflow.aggregate({
      _sum: { views: true },
    }),
  ]);

  const totalViews = viewsAggregate._sum.views || 0;

  return (
    <div className="space-y-6">
      {/* Top Action Header Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl sm:text-2xl font-black text-foreground dark:text-white tracking-tight">
            Dashboard
          </h1>
          <p className="text-xs text-muted-foreground dark:text-[#71717a] mt-0.5">
            Monitor real-time workflow executions, active pipelines, and client inquiries.
          </p>
        </div>

        <div className="flex items-center gap-2.5 flex-wrap">
          <Link
            href="/admin/workflows"
            className="h-8 px-3.5 rounded-xl bg-card dark:bg-[#18181d] hover:bg-muted dark:hover:bg-[#22222a] border border-border dark:border-[#26262e] text-xs font-semibold text-foreground dark:text-[#d4d4d8] inline-flex items-center gap-1.5 transition-colors shadow-xs"
          >
            <Settings className="h-3.5 w-3.5 text-muted-foreground dark:text-[#71717a]" />
            <span>Manage Blueprints</span>
          </Link>

          <button
            type="button"
            className="h-8 px-3.5 rounded-xl bg-card dark:bg-[#18181d] hover:bg-muted dark:hover:bg-[#22222a] border border-border dark:border-[#26262e] text-xs font-semibold text-foreground dark:text-[#d4d4d8] inline-flex items-center gap-1.5 transition-colors shadow-xs"
          >
            <Download className="h-3.5 w-3.5 text-muted-foreground dark:text-[#71717a]" />
            <span>Export</span>
          </button>

          <Link
            href="/admin/workflows/new"
            className="h-8 px-4 rounded-xl bg-[#ffd233] hover:bg-[#f5c71a] text-black text-xs font-bold inline-flex items-center gap-1.5 shadow-md shadow-[#ffd233]/20 transition-all"
          >
            <Plus className="h-4 w-4" />
            <span>+ New Blueprint</span>
          </Link>
        </div>
      </div>

      {/* Main 2-Column Grid (Center Main View + Right Panel) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        
        {/* Left & Center Main Column (8 of 12) */}
        <div className="lg:col-span-8 space-y-6">
          
          {/* Top 3 KPI Metric Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {/* Card 1: Revenue / Executions */}
            <div className="rounded-2xl bg-card dark:bg-[#141418] border border-border dark:border-[#22222a] p-4 sm:p-5 relative overflow-hidden shadow-xs">
              <div className="flex items-center justify-between text-xs text-muted-foreground dark:text-[#8e8e93] mb-1">
                <span className="font-semibold">Total Revenue / Runs</span>
                <span className="inline-flex items-center text-[10px] font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 px-1.5 py-0.5 rounded-md border border-emerald-500/20">
                  +14%
                </span>
              </div>
              <div className="text-2xl sm:text-3xl font-black text-foreground dark:text-white tracking-tight mt-2">
                $19,270.56
              </div>
              <p className="text-[11px] text-muted-foreground dark:text-[#71717a] mt-1">
                {totalViews * 12 + 140} total node executions
              </p>
            </div>

            {/* Card 2: Total Blueprints */}
            <div className="rounded-2xl bg-card dark:bg-[#141418] border border-border dark:border-[#22222a] p-4 sm:p-5 relative overflow-hidden shadow-xs">
              <div className="flex items-center justify-between text-xs text-muted-foreground dark:text-[#8e8e93] mb-1">
                <span className="font-semibold">Active Blueprints</span>
                <span className="inline-flex items-center text-[10px] font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 px-1.5 py-0.5 rounded-md border border-emerald-500/20">
                  +8%
                </span>
              </div>
              <div className="text-2xl sm:text-3xl font-black text-foreground dark:text-white tracking-tight mt-2">
                {totalWorkflows}
              </div>
              <p className="text-[11px] text-muted-foreground dark:text-[#71717a] mt-1">
                <strong className="text-emerald-600 dark:text-emerald-400 font-semibold">{publishedWorkflows}</strong> live on marketplace
              </p>
            </div>

            {/* Card 3: Client Leads & Inquiries */}
            <div className="rounded-2xl bg-card dark:bg-[#141418] border border-border dark:border-[#22222a] p-4 sm:p-5 relative overflow-hidden shadow-xs">
              <div className="flex items-center justify-between text-xs text-muted-foreground dark:text-[#8e8e93] mb-1">
                <span className="font-semibold">Client Leads</span>
                <span className="inline-flex items-center text-[10px] font-bold text-amber-700 dark:text-[#ffd233] bg-[#ffd233]/20 dark:bg-[#ffd233]/10 px-1.5 py-0.5 rounded-md border border-[#ffd233]/30">
                  +24%
                </span>
              </div>
              <div className="text-2xl sm:text-3xl font-black text-foreground dark:text-white tracking-tight mt-2">
                {totalLeads}
              </div>
              <p className="text-[11px] text-muted-foreground dark:text-[#71717a] mt-1">
                <strong className="text-amber-600 dark:text-[#ffd233] font-semibold">{newLeadsCount} new</strong> briefs to review
              </p>
            </div>
          </div>

          {/* Activity / Execution Flow Bar Chart Section */}
          <ActivityChart />

          {/* Recent Activity / Blueprints Data Table */}
          <div className="rounded-2xl bg-card dark:bg-[#141418] border border-border dark:border-[#22222a] p-5 space-y-4 shadow-xs">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-border dark:border-[#22222a]">
              <div className="relative w-full sm:w-60">
                <Search className="absolute left-3 top-2.5 h-3.5 w-3.5 text-muted-foreground dark:text-[#71717a]" />
                <input
                  type="text"
                  placeholder="Search Blueprints..."
                  className="w-full h-8 pl-8 pr-3 text-xs rounded-xl bg-background dark:bg-[#1b1b22] border border-border dark:border-[#26262e] text-foreground dark:text-white placeholder:text-muted-foreground dark:placeholder:text-[#71717a] focus:outline-none focus:border-[#ffd233]"
                />
              </div>

              <div className="flex items-center gap-2">
                <Link
                  href="/admin/workflows"
                  className="h-8 px-3 rounded-xl bg-muted/60 dark:bg-[#1b1b22] border border-border dark:border-[#26262e] text-xs font-semibold text-foreground dark:text-[#a1a1aa] hover:text-primary dark:hover:text-white inline-flex items-center gap-1.5 shadow-xs"
                >
                  <span>View All ({totalWorkflows})</span>
                  <ArrowUpRight className="h-3.5 w-3.5 text-[#ffd233]" />
                </Link>
              </div>
            </div>

            {/* Table Rows */}
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="text-muted-foreground dark:text-[#63636e] font-semibold border-b border-border dark:border-[#1e1e24] pb-2">
                    <th className="py-2.5 px-3">Blueprint</th>
                    <th className="py-2.5 px-3">Category</th>
                    <th className="py-2.5 px-3">Price</th>
                    <th className="py-2.5 px-3">Status</th>
                    <th className="py-2.5 px-3 text-right">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border dark:divide-[#1b1b22]">
                  {recentWorkflows.map((w) => (
                    <tr key={w.id} className="hover:bg-muted/40 dark:hover:bg-[#18181d] transition-colors group">
                      <td className="py-3 px-3">
                        <div className="flex items-center gap-2.5">
                          <div className="h-8 w-8 rounded-xl bg-muted dark:bg-[#1c1c24] border border-border dark:border-[#2a2a34] flex items-center justify-center shrink-0">
                            {w.platforms?.[0]?.platform ? (
                              <PlatformIcon slug={w.platforms[0].platform.slug} name={w.platforms[0].platform.name} size="xs" withBadge={false} />
                            ) : (
                              <Zap className="h-3.5 w-3.5 text-amber-600 dark:text-[#ffd233]" />
                            )}
                          </div>
                          <div>
                            <div className="font-bold text-foreground dark:text-white group-hover:text-amber-600 dark:group-hover:text-[#ffd233] transition-colors line-clamp-1">
                              {w.title}
                            </div>
                            <div className="text-[10px] text-muted-foreground dark:text-[#71717a] font-mono">
                              ID: {w.id.slice(0, 8)}
                            </div>
                          </div>
                        </div>
                      </td>

                      <td className="py-3 px-3 text-muted-foreground dark:text-[#a1a1aa]">
                        {w.category?.name || "General"}
                      </td>

                      <td className="py-3 px-3 font-bold text-foreground dark:text-white">
                        {w.price || "Free"}
                      </td>

                      <td className="py-3 px-3">
                        <span
                          className={`inline-flex items-center px-2 py-0.5 rounded-md text-[10px] font-bold border ${
                            w.status === "PUBLISHED"
                              ? "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20"
                              : "bg-amber-500/10 text-amber-700 dark:text-amber-400 border-amber-500/20"
                          }`}
                        >
                          {w.status === "PUBLISHED" ? "Live" : "Draft"}
                        </span>
                      </td>

                      <td className="py-3 px-3 text-right">
                        <Link
                          href={`/admin/workflows/${w.id}/edit`}
                          className="px-2.5 py-1 rounded-lg bg-muted hover:bg-muted/80 dark:bg-[#202028] dark:hover:bg-[#2a2a36] text-[11px] font-semibold text-foreground dark:text-[#d4d4d8] inline-flex items-center gap-1 transition-colors border border-border dark:border-transparent"
                        >
                          Edit
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Right Sidebar Panel (4 of 12) - Sleek Virtual Card & Quota Status */}
        {/* Right Sidebar Panel (4 of 12) - Interactive Virtual Business Card & Quotas */}
        <div className="lg:col-span-4 space-y-6">
          
          {/* Top Search / Filter Widget */}
          <div className="rounded-2xl bg-card dark:bg-[#141418] border border-border dark:border-[#22222a] p-4 space-y-3 shadow-xs">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-1 bg-muted dark:bg-[#1b1b22] border border-border dark:border-[#26262e] rounded-xl p-0.5 text-xs">
                <button type="button" className="px-2.5 py-1 rounded-lg bg-card dark:bg-[#262630] text-emerald-600 dark:text-emerald-400 font-bold shadow-xs">
                  ● Live API
                </button>
                <button type="button" className="px-2.5 py-1 rounded-lg text-muted-foreground dark:text-[#71717a]">
                  Sandbox
                </button>
              </div>
          {/* Interactive 3D Business Card */}
          <VirtualBusinessCard />

              <Link
                href="/admin/workflows/new"
                className="h-7 px-3 rounded-lg bg-[#ffd233] text-black text-[11px] font-bold flex items-center gap-1 shadow-xs hover:bg-[#f5c71a] transition-all"
              >
                + Add Card
              </Link>
            </div>

            {/* Virtual Black Metal Card (Exact Reference Design) */}
            <div className="relative aspect-[1.6/1] w-full rounded-2xl bg-gradient-to-br from-[#2a2a34] via-[#1a1a20] to-[#0f0f13] border border-[#383844] p-5 flex flex-col justify-between text-white shadow-xl overflow-hidden group">
              {/* Background Glass Orb Glow */}
              <div className="absolute -top-12 -right-12 w-32 h-32 bg-[#ffd233]/15 rounded-full blur-2xl pointer-events-none" />

              {/* Top Row: Contactless + Card Number */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1 text-[#8e8e93]">
                  <Activity className="h-4 w-4 text-[#ffd233]" />
                  <span className="text-[10px] font-mono tracking-widest text-zinc-300">CLOUD APIS</span>
                </div>
                <div className="text-right font-mono text-xs text-zinc-300 tracking-widest">
                  •••• 6541 <span className="text-[9px] text-[#71717a]">12/28</span>
                </div>
              </div>

              {/* Middle EMV Chip */}
              <div className="h-7 w-9 rounded-md bg-gradient-to-tr from-amber-300 to-amber-500 border border-amber-600/50 shadow-inner flex items-center justify-center opacity-90">
                <div className="w-5 h-3 border-y border-amber-800/40" />
              </div>

              {/* Bottom Cardholder & Brand */}
              <div className="flex items-end justify-between">
                <div>
                  <div className="text-[9px] text-zinc-400 uppercase tracking-wider font-semibold">
                    Card Holder Name
                  </div>
                  <div className="text-xs font-bold text-white tracking-wide">
                    Super Admin AutoFlows
                  </div>
                </div>

                <div className="text-sm font-black italic tracking-tighter text-white/90">
                  VISA
                </div>
              </div>
            </div>
          </div>

          {/* Quick Action Buttons Row */}
          <div className="rounded-2xl bg-card dark:bg-[#141418] border border-border dark:border-[#22222a] p-4 space-y-3 shadow-xs">
            <span className="text-xs font-bold text-foreground dark:text-white block">Quick Action</span>
            <div className="grid grid-cols-4 gap-2">
              <Link
                href="/admin/workflows/new"
                className="p-2.5 rounded-xl bg-muted/60 dark:bg-[#1b1b22] hover:bg-muted dark:hover:bg-[#252530] border border-border dark:border-[#26262e] flex flex-col items-center justify-center gap-1 text-center transition-colors group shadow-xs"
              >
                <Plus className="h-3.5 w-3.5 text-amber-600 dark:text-[#ffd233] group-hover:scale-110 transition-transform" />
                <span className="text-[10px] font-semibold text-foreground dark:text-[#a1a1aa]">Create</span>
              </Link>
              
              <Link
                href="/admin/import"
                className="p-2.5 rounded-xl bg-muted/60 dark:bg-[#1b1b22] hover:bg-muted dark:hover:bg-[#252530] border border-border dark:border-[#26262e] flex flex-col items-center justify-center gap-1 text-center transition-colors group shadow-xs"
              >
                <UploadCloud className="h-3.5 w-3.5 text-amber-600 dark:text-[#ffd233] group-hover:scale-110 transition-transform" />
                <span className="text-[10px] font-semibold text-foreground dark:text-[#a1a1aa]">Import</span>
              </Link>

              <Link
                href="/admin/requests"
                className="p-2.5 rounded-xl bg-muted/60 dark:bg-[#1b1b22] hover:bg-muted dark:hover:bg-[#252530] border border-border dark:border-[#26262e] flex flex-col items-center justify-center gap-1 text-center transition-colors group shadow-xs"
              >
                <Users className="h-3.5 w-3.5 text-amber-600 dark:text-[#ffd233] group-hover:scale-110 transition-transform" />
                <span className="text-[10px] font-semibold text-foreground dark:text-[#a1a1aa]">Leads</span>
              </Link>

              <Link
                href="/admin/settings"
                className="p-2.5 rounded-xl bg-muted/60 dark:bg-[#1b1b22] hover:bg-muted dark:hover:bg-[#252530] border border-border dark:border-[#26262e] flex flex-col items-center justify-center gap-1 text-center transition-colors group shadow-xs"
              >
                <Settings className="h-3.5 w-3.5 text-amber-600 dark:text-[#ffd233] group-hover:scale-110 transition-transform" />
                <span className="text-[10px] font-semibold text-foreground dark:text-[#a1a1aa]">Config</span>
              </Link>
            </div>
          </div>

          {/* Daily Quota & Resource Usage Breakdown */}
          <div className="rounded-2xl bg-card dark:bg-[#141418] border border-border dark:border-[#22222a] p-4 space-y-4 shadow-xs">
            <div>
              <div className="flex items-center justify-between text-xs mb-1">
                <span className="font-semibold text-muted-foreground dark:text-[#8e8e93]">Daily Execution Limit</span>
                <span className="font-bold text-foreground dark:text-white">$1,200 / $2,000</span>
              </div>
              <div className="h-2 w-full rounded-full bg-muted dark:bg-[#202028] overflow-hidden">
                <div className="h-full w-[60%] rounded-full bg-[#ffd233]" />
              </div>
            </div>

            {/* Breakdown Bars */}
            <div className="space-y-2 pt-1">
              <span className="text-[11px] font-bold text-muted-foreground dark:text-[#8e8e93] block">Smart Platform Allocation</span>
              <div className="flex items-center gap-1.5 h-2 rounded-full overflow-hidden">
                <div className="h-full w-[35%] bg-[#ffd233] rounded-xs" title="OpenAI GPT-4o 35%" />
                <div className="h-full w-[27%] bg-[#10b981] rounded-xs" title="WhatsApp API 27%" />
                <div className="h-full w-[18%] bg-[#0284c7] rounded-xs" title="Meta Ads 18%" />
                <div className="h-full w-[20%] bg-[#71717a] dark:bg-[#52525b] rounded-xs" title="Other 20%" />
              </div>

              <div className="grid grid-cols-2 gap-2 text-[10px] pt-1 text-muted-foreground dark:text-[#8e8e93]">
                <div className="flex items-center gap-1.5">
                  <div className="h-2 w-2 rounded-full bg-[#ffd233]" />
                  <span>OpenAI GPT-4o (35%)</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <div className="h-2 w-2 rounded-full bg-[#10b981]" />
                  <span>WhatsApp Cloud (27%)</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <div className="h-2 w-2 rounded-full bg-[#0284c7]" />
                  <span>Meta Lead Ads (18%)</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <div className="h-2 w-2 rounded-full bg-[#71717a] dark:bg-[#52525b]" />
                  <span>Cloud DB (20%)</span>
                </div>
              </div>
            </div>
          </div>

          {/* Recent Inquiries Mini List */}
          <div className="rounded-2xl bg-card dark:bg-[#141418] border border-border dark:border-[#22222a] p-4 space-y-3 shadow-xs">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-foreground dark:text-white">Recent Client Briefs</span>
              <Link href="/admin/requests" className="text-[11px] text-amber-600 dark:text-[#ffd233] hover:underline font-semibold">
                View All
              </Link>
            </div>

            <div className="space-y-2">
              {recentLeads.length === 0 ? (
                <p className="text-xs text-muted-foreground dark:text-[#71717a] py-2">No incoming leads yet.</p>
              ) : (
                recentLeads.slice(0, 3).map((lead) => (
                  <div
                    key={lead.id}
                    className="p-2.5 rounded-xl bg-muted/60 dark:bg-[#1b1b22] border border-border dark:border-[#26262e] flex items-center justify-between gap-2 shadow-xs"
                  >
                    <div className="flex items-center gap-2">
                      <div className="h-7 w-7 rounded-lg bg-[#ffd233]/20 text-amber-800 dark:text-[#ffd233] flex items-center justify-center text-xs font-bold">
                        {lead.name.charAt(0).toUpperCase()}
                      </div>
                      <div>
                        <div className="text-xs font-bold text-foreground dark:text-white leading-tight">{lead.name}</div>
                        <div className="text-[10px] text-muted-foreground dark:text-[#71717a]">{formatDate(lead.createdAt)}</div>
                      </div>
                    </div>

                    <span className="px-2 py-0.5 rounded-md text-[10px] font-bold bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
                      {lead.status}
                    </span>
                  </div>
                ))
              )}
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
