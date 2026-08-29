import { redirect } from "next/navigation";
import Link from "next/link";
import {
  LayoutDashboard,
  Layers,
  PlusCircle,
  CreditCard,
  User,
  LogOut,
  Sparkles,
  Zap,
  Bell,
  Search,
  ArrowUpRight,
  ShieldCheck,
  Plus
} from "lucide-react";
import { getClientSession, clientLogout } from "@/actions/clientAuthActions";
import { checkWorkflowLimit } from "@/actions/subscriptionActions";
import { ThemeToggle } from "@/components/layout/ThemeToggle";
import { DashboardNavLinks } from "@/components/dashboard/DashboardNavLinks";

export const dynamic = "force-dynamic";

export default async function ClientDashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getClientSession();

  if (!session) {
    redirect("/login?redirect=/dashboard");
  }

  const quota = await checkWorkflowLimit(session.id);

  return (
    <div className="min-h-screen bg-muted/20 dark:bg-[#0d0d10] text-foreground dark:text-[#e4e4e7] flex flex-col md:flex-row antialiased selection:bg-[#ffd233] selection:text-black transition-colors duration-300">
      {/* Mobile Header */}
      <header className="md:hidden sticky top-0 z-50 bg-card dark:bg-[#141418] border-b border-border dark:border-[#222228] p-4 space-y-3">
        <div className="flex items-center justify-between">
          <Link href="/dashboard" className="flex items-center gap-2.5">
            <div className="h-8 w-8 rounded-xl bg-[#ffd233] flex items-center justify-center text-black font-black text-sm shadow-md shadow-[#ffd233]/20">
              ✦
            </div>
            <div className="flex flex-col">
              <span className="font-extrabold text-sm tracking-tight text-foreground dark:text-white">
                AutoFlows
              </span>
              <span className="text-[9px] text-amber-700 dark:text-[#ffd233] font-bold tracking-wider uppercase">Client Hub</span>
            </div>
          </Link>
          <div className="flex items-center gap-2">
            <ThemeToggle />
            <form action={clientLogout}>
              <button
                type="submit"
                aria-label="Sign Out"
                className="p-1.5 text-xs text-red-500 hover:bg-red-500/10 rounded-xl"
                title="Sign out"
              >
                <LogOut className="h-4 w-4" />
              </button>
            </form>
          </div>
        </div>

        {/* Mobile Navigation Horizontal Bar */}
        <nav className="flex items-center gap-1.5 overflow-x-auto pb-1 text-xs no-scrollbar">
          <Link
            href="/dashboard"
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-card dark:bg-[#1d1d23] text-foreground dark:text-white font-semibold shrink-0 text-xs border border-border dark:border-[#2a2a32]"
          >
            <LayoutDashboard className="h-3.5 w-3.5 text-[#ffd233]" />
            <span>Dashboard</span>
          </Link>
          <Link
            href="/dashboard/workflows"
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-card dark:bg-[#1d1d23] text-muted-foreground dark:text-[#a1a1aa] font-semibold shrink-0 text-xs border border-border dark:border-[#2a2a32]"
          >
            <Layers className="h-3.5 w-3.5 text-[#ffd233]" />
            <span>Workflows</span>
          </Link>
          <Link
            href="/dashboard/blueprints"
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-card dark:bg-[#1d1d23] text-muted-foreground dark:text-[#a1a1aa] font-semibold shrink-0 text-xs border border-border dark:border-[#2a2a32]"
          >
            <Sparkles className="h-3.5 w-3.5 text-[#ffd233]" />
            <span>Blueprints</span>
          </Link>
          <Link
            href="/dashboard/workflows/new"
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#ffd233] text-black font-bold shrink-0 text-xs shadow-xs"
          >
            <PlusCircle className="h-3.5 w-3.5" />
            <span>+ Request</span>
          </Link>
          <Link
            href="/dashboard/subscription"
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-card dark:bg-[#1d1d23] text-muted-foreground dark:text-[#a1a1aa] font-semibold shrink-0 text-xs border border-border dark:border-[#2a2a32]"
          >
            <CreditCard className="h-3.5 w-3.5 text-[#ffd233]" />
            <span>Plan</span>
          </Link>
          <Link
            href="/dashboard/profile"
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-card dark:bg-[#1d1d23] text-muted-foreground dark:text-[#a1a1aa] font-semibold shrink-0 text-xs border border-border dark:border-[#2a2a32]"
          >
            <User className="h-3.5 w-3.5 text-[#ffd233]" />
            <span>Profile</span>
          </Link>
        </nav>
      </header>

      {/* Desktop Sidebar */}
      <aside className="hidden md:flex w-[260px] bg-card dark:bg-[#111115] border-r border-border dark:border-[#1e1e24] p-5 flex-col justify-between shrink-0 select-none transition-colors duration-300">
        <div className="space-y-6">
          {/* Top Brand Mark */}
          <div className="flex items-center justify-between gap-2 px-1">
            <Link href="/dashboard" className="flex items-center gap-2.5">
              <div className="h-9 w-9 rounded-xl bg-[#ffd233] flex items-center justify-center text-black font-black text-sm shadow-md shadow-[#ffd233]/25">
                ✦
              </div>
              <div className="flex flex-col">
                <span className="font-extrabold text-sm tracking-tight text-foreground dark:text-white">
                  AutoFlows
                </span>
                <span className="text-[9px] text-amber-700 dark:text-[#ffd233] font-bold tracking-wider uppercase">Client Workspace</span>
              </div>
            </Link>

            <Link
              href="/"
              target="_blank"
              title="Visit Marketplace"
              className="p-1.5 rounded-lg text-muted-foreground hover:text-foreground dark:hover:text-white hover:bg-muted dark:hover:bg-[#1a1a20] transition-colors"
            >
              <ArrowUpRight className="h-4 w-4" />
            </Link>
          </div>

          {/* Navigation Links */}
          <DashboardNavLinks />
        </div>

        {/* Bottom Subscription Quota Card */}
        <div className="space-y-3 pt-4 border-t border-border dark:border-[#1e1e24]">
          <div className="rounded-2xl bg-muted/40 dark:bg-[#17171d] border border-border dark:border-[#ffd233]/20 p-3.5 relative overflow-hidden shadow-sm">
            <div className="flex items-center justify-between mb-2">
              <div className="h-7 w-7 rounded-lg bg-[#ffd233]/20 border border-[#ffd233]/40 flex items-center justify-center text-amber-700 dark:text-[#ffd233]">
                <Zap className="h-4 w-4 fill-current" />
              </div>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-[#ffd233]/20 text-amber-800 dark:text-[#ffd233]">
                {quota.planName} Plan
              </span>
            </div>
            
            <div className="space-y-1 mb-3">
              <div className="flex items-center justify-between text-xs">
                <span className="font-bold text-foreground dark:text-white">Workflow Quota</span>
                <span className="text-[11px] font-semibold text-muted-foreground dark:text-[#8e8e93]">
                  {quota.isUnlimited ? "Unlimited" : `${quota.used} / ${quota.limit}`}
                </span>
              </div>
              {!quota.isUnlimited && (
                <div className="h-1.5 w-full rounded-full bg-muted dark:bg-[#262632] overflow-hidden">
                  <div
                    style={{ width: `${Math.min(100, (quota.used / Math.max(1, quota.limit)) * 100)}%` }}
                    className="h-full bg-[#ffd233] rounded-full transition-all duration-500"
                  />
                </div>
              )}
            </div>

            <div className="flex items-center gap-2">
              <Link
                href="/dashboard/workflows/new"
                className="flex-1 h-7 rounded-lg bg-[#ffd233] text-black text-[11px] font-bold flex items-center justify-center shadow-xs hover:bg-[#f5c71a] transition-all"
              >
                + Request
              </Link>
              <Link
                href="/dashboard/subscription"
                className="h-7 px-2.5 rounded-lg bg-card dark:bg-[#1e1e24] hover:bg-muted dark:hover:bg-[#282830] text-muted-foreground dark:text-[#a1a1aa] hover:text-foreground dark:hover:text-white text-[11px] font-semibold flex items-center justify-center transition-colors border border-border dark:border-transparent"
              >
                Plans
              </Link>
            </div>
          </div>

          {/* Sign Out Button */}
          <form action={clientLogout}>
            <button
              type="submit"
              className="flex items-center gap-2 w-full px-3 py-2 rounded-xl text-xs font-semibold text-muted-foreground dark:text-[#a1a1aa] hover:text-red-500 hover:bg-red-500/10 transition-colors"
            >
              <LogOut className="h-3.5 w-3.5 text-red-500" />
              <span>Log Out</span>
            </button>
          </form>
        </div>
      </aside>

      {/* Main Workspace Body */}
      <div className="flex-1 flex flex-col min-w-0 overflow-x-hidden">
        {/* Top Navbar */}
        <header className="hidden md:flex h-16 items-center justify-between px-8 border-b border-border dark:border-[#1e1e24] bg-card/80 dark:bg-[#111115]/80 backdrop-blur-md sticky top-0 z-40 transition-colors duration-300">
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2">
              <span className="text-xs font-semibold text-muted-foreground dark:text-[#71717a]">Company:</span>
              <span className="text-sm font-bold text-foreground dark:text-white">{session.company || session.name}</span>
            </div>
            <div className="h-4 w-[1px] bg-border dark:bg-[#2a2a32]" />
            <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-[#ffd233]/20 text-amber-800 dark:text-[#ffd233] border border-[#ffd233]/40">
              ⚡ {quota.planName} Plan ({quota.isUnlimited ? "Unlimited Workflows" : `${quota.remaining} Credits Left`})
            </span>
          </div>

          {/* Right Header Controls */}
          <div className="flex items-center gap-3.5">
            <Link
              href="/dashboard/workflows/new"
              className="h-8 px-3.5 rounded-xl bg-[#ffd233] hover:bg-[#f5c71a] text-black text-xs font-bold inline-flex items-center gap-1.5 shadow-xs transition-all"
            >
              <Plus className="h-3.5 w-3.5" />
              <span>+ Request Workflow</span>
            </Link>

            <ThemeToggle />

            {/* Client User Profile Pill */}
            <div className="flex items-center gap-2.5 pl-2 border-l border-border dark:border-[#26262e]">
              <div className="h-8 w-8 rounded-xl bg-muted dark:bg-[#1d1d24] border border-border dark:border-[#2a2a34] text-foreground dark:text-white font-bold flex items-center justify-center text-xs shadow-xs">
                {(session.name || "C").charAt(0).toUpperCase()}
              </div>
              <div className="flex flex-col text-left">
                <span className="text-xs font-bold text-foreground dark:text-white leading-tight truncate max-w-[130px]">
                  {session.name || "Client"}
                </span>
                <span className="text-[10px] text-muted-foreground dark:text-[#71717a] truncate max-w-[130px]">
                  {session.email}
                </span>
              </div>
            </div>
          </div>
        </header>

        {/* Page Children Container */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-[1500px] w-full mx-auto">
          {children}
        </main>
      </div>
    </div>
  );
}

