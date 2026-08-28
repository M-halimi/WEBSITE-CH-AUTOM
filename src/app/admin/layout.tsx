import { redirect } from "next/navigation";
import Link from "next/link";
import {
  LayoutDashboard,
  Layers,
  PlusCircle,
  UploadCloud,
  Users,
  LogOut,
  Globe,
  SlidersHorizontal,
  Settings,
  Zap,
  HelpCircle,
  Bell,
  Clock,
  Search,
  ChevronDown,
  Sparkles,
  ArrowUpRight,
  ShieldCheck,
  Cpu,
  Workflow as WorkflowIcon
} from "lucide-react";
import { verifyAdminSession, adminLogout } from "@/actions/authActions";
import { ThemeToggle } from "@/components/layout/ThemeToggle";
import { AdminNavLinks } from "@/components/admin/AdminNavLinks";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const isAuthenticated = await verifyAdminSession();

  if (!isAuthenticated) {
    redirect("/login");
  }

  return (
    <div className="min-h-screen bg-muted/20 dark:bg-[#0d0d10] text-foreground dark:text-[#e4e4e7] flex flex-col md:flex-row antialiased selection:bg-[#ffd233] selection:text-black transition-colors duration-300">
      {/* Mobile Header */}
      <header className="md:hidden sticky top-0 z-50 bg-card dark:bg-[#141418] border-b border-border dark:border-[#222228] p-4 space-y-3">
        <div className="flex items-center justify-between">
          <Link href="/admin" className="flex items-center gap-2.5">
            <div className="h-8 w-8 rounded-xl bg-[#ffd233] flex items-center justify-center text-black font-black text-sm shadow-md shadow-[#ffd233]/20">
              ✦
            </div>
            <div className="flex flex-col">
              <span className="font-extrabold text-sm tracking-tight text-foreground dark:text-white">
                AutoFlows
              </span>
              <span className="text-[9px] text-[#ffd233] font-bold tracking-wider uppercase">Admin Pro</span>
            </div>
          </Link>
          <div className="flex items-center gap-2">
            <ThemeToggle />
            <form action={adminLogout}>
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

        {/* Mobile Horizontal Navigation Pills */}
        <nav className="flex items-center gap-1.5 overflow-x-auto pb-1 text-xs no-scrollbar">
          <Link
            href="/admin"
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-card dark:bg-[#1d1d23] text-foreground dark:text-white font-semibold shrink-0 text-xs border border-border dark:border-[#2a2a32]"
          >
            <LayoutDashboard className="h-3.5 w-3.5 text-[#ffd233]" />
            <span>Dashboard</span>
          </Link>
          <Link
            href="/admin/workflows"
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-card dark:bg-[#1d1d23] text-muted-foreground dark:text-[#a1a1aa] font-semibold shrink-0 text-xs border border-border dark:border-[#2a2a32]"
          >
            <Layers className="h-3.5 w-3.5 text-[#ffd233]" />
            <span>Blueprints</span>
          </Link>
          <Link
            href="/admin/workflows/new"
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#ffd233] text-black font-bold shrink-0 text-xs shadow-xs"
          >
            <PlusCircle className="h-3.5 w-3.5" />
            <span>+ Create</span>
          </Link>
          <Link
            href="/admin/import"
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-card dark:bg-[#1d1d23] text-muted-foreground dark:text-[#a1a1aa] font-semibold shrink-0 text-xs border border-border dark:border-[#2a2a32]"
          >
            <UploadCloud className="h-3.5 w-3.5 text-[#ffd233]" />
            <span>Import</span>
          </Link>
          <Link
            href="/admin/requests"
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-card dark:bg-[#1d1d23] text-muted-foreground dark:text-[#a1a1aa] font-semibold shrink-0 text-xs border border-border dark:border-[#2a2a32]"
          >
            <Users className="h-3.5 w-3.5 text-[#ffd233]" />
            <span>Leads</span>
          </Link>
          <Link
            href="/admin/settings"
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-card dark:bg-[#1d1d23] text-muted-foreground dark:text-[#a1a1aa] font-semibold shrink-0 text-xs border border-border dark:border-[#2a2a32]"
          >
            <SlidersHorizontal className="h-3.5 w-3.5 text-[#ffd233]" />
            <span>Customizer</span>
          </Link>
        </nav>
      </header>

      {/* Desktop Ultra-Sleek Sidebar */}
      <aside className="hidden md:flex w-[250px] bg-card dark:bg-[#111115] border-r border-border dark:border-[#1e1e24] p-5 flex-col justify-between shrink-0 select-none transition-colors duration-300">
        <div className="space-y-6">
          {/* Top Brand & Workspace Toggle */}
          <div className="flex items-center justify-between gap-2 px-1">
            <Link href="/admin" className="flex items-center gap-2.5">
              <div className="h-9 w-9 rounded-xl bg-[#ffd233] flex items-center justify-center text-black font-black text-sm shadow-md shadow-[#ffd233]/25">
                ✦
              </div>
              <div className="flex flex-col">
                <span className="font-extrabold text-sm tracking-tight text-foreground dark:text-white">
                  AutoFlows
                </span>
                <span className="text-[9px] text-amber-600 dark:text-[#ffd233] font-bold tracking-wider uppercase">Admin Pro</span>
              </div>
            </Link>

            <Link
              href="/"
              target="_blank"
              title="Open Live Marketplace"
              className="p-1.5 rounded-lg text-muted-foreground hover:text-foreground dark:hover:text-white hover:bg-muted dark:hover:bg-[#1a1a20] transition-colors"
            >
              <ArrowUpRight className="h-4 w-4" />
            </Link>
          </div>

          {/* Navigation with Tree Groups */}
          <AdminNavLinks />
        </div>

        {/* Bottom Pro Card */}
        <div className="space-y-3 pt-4 border-t border-border dark:border-[#1e1e24]">
          <div className="rounded-2xl bg-muted/40 dark:bg-[#17171d] border border-border dark:border-[#ffd233]/20 p-3.5 relative overflow-hidden shadow-sm">
            <div className="flex items-center justify-between mb-2">
              <div className="h-7 w-7 rounded-lg bg-[#ffd233]/20 border border-[#ffd233]/40 flex items-center justify-center text-amber-600 dark:text-[#ffd233]">
                <Zap className="h-4 w-4 fill-current" />
              </div>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-[#ffd233]/20 text-amber-700 dark:text-[#ffd233]">
                v2.4 Pro
              </span>
            </div>
            <h5 className="text-xs font-bold text-foreground dark:text-white mb-0.5">Enterprise Cloud</h5>
            <p className="text-[11px] text-muted-foreground dark:text-[#8e8e93] leading-tight mb-3">
              All automation nodes & webhooks healthy.
            </p>
            <div className="flex items-center gap-2">
              <Link
                href="/admin/workflows/new"
                className="flex-1 h-7 rounded-lg bg-[#ffd233] text-black text-[11px] font-bold flex items-center justify-center shadow-xs hover:bg-[#f5c71a] transition-all"
              >
                + Blueprint
              </Link>
              <Link
                href="/admin/settings"
                className="h-7 px-2 rounded-lg bg-card dark:bg-[#1e1e24] hover:bg-muted dark:hover:bg-[#282830] text-muted-foreground dark:text-[#a1a1aa] hover:text-foreground dark:hover:text-white text-[11px] font-semibold flex items-center justify-center transition-colors border border-border dark:border-transparent"
              >
                Config
              </Link>
            </div>
          </div>

          {/* Sign Out Button */}
          <form action={adminLogout}>
            <button
              type="submit"
              className="flex items-center gap-2 w-full px-3 py-2 rounded-xl text-xs font-semibold text-muted-foreground dark:text-[#a1a1aa] hover:text-red-500 hover:bg-red-500/10 transition-colors"
            >
              <LogOut className="h-3.5 w-3.5 text-red-500" />
              <span>Sign Out</span>
            </button>
          </form>
        </div>
      </aside>

      {/* Main Admin Body Area */}
      <div className="flex-1 flex flex-col min-w-0 overflow-x-hidden">
        {/* Top Navbar */}
        <header className="hidden md:flex h-16 items-center justify-between px-8 border-b border-border dark:border-[#1e1e24] bg-card/80 dark:bg-[#111115]/80 backdrop-blur-md sticky top-0 z-40 transition-colors duration-300">
          <div className="flex items-center gap-4">
            <h2 className="text-sm font-bold text-foreground dark:text-white tracking-tight">Admin Overview</h2>
            <div className="h-4 w-[1px] bg-border dark:bg-[#2a2a32]" />
            <span className="text-xs text-muted-foreground dark:text-[#71717a]">Commerce Automation & Engine Control</span>
          </div>

          {/* Right Header Controls */}
          <div className="flex items-center gap-3.5">
            {/* Search Input */}
            <div className="relative w-64">
              <Search className="absolute left-3 top-2.5 h-3.5 w-3.5 text-muted-foreground dark:text-[#71717a]" />
              <input
                type="text"
                placeholder="Search anything..."
                className="w-full h-8 pl-8 pr-3 text-xs rounded-xl bg-muted/40 dark:bg-[#18181d] border border-border dark:border-[#26262e] text-foreground dark:text-white placeholder:text-muted-foreground dark:placeholder:text-[#71717a] focus:outline-none focus:border-[#ffd233] transition-colors"
              />
            </div>

            {/* Notifications Icon */}
            <button
              type="button"
              className="h-8 w-8 rounded-xl bg-card dark:bg-[#18181d] border border-border dark:border-[#26262e] text-muted-foreground dark:text-[#a1a1aa] hover:text-foreground dark:hover:text-white flex items-center justify-center transition-colors"
              title="System Alerts"
            >
              <Bell className="h-3.5 w-3.5" />
            </button>

            <ThemeToggle />

            {/* Admin User Profile Tag */}
            <div className="flex items-center gap-2.5 pl-2 border-l border-border dark:border-[#26262e]">
              <div className="h-8 w-8 rounded-xl bg-[#ffd233] text-black font-black flex items-center justify-center text-xs shadow-xs">
                AD
              </div>
              <div className="flex flex-col text-left">
                <span className="text-xs font-bold text-foreground dark:text-white leading-tight">Admin</span>
                <span className="text-[10px] text-emerald-600 dark:text-emerald-400 font-medium">● Online</span>
              </div>
            </div>
          </div>
        </header>

        {/* Dynamic Page Content */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-[1600px] w-full mx-auto">
          {children}
        </main>
      </div>
    </div>
  );
}
