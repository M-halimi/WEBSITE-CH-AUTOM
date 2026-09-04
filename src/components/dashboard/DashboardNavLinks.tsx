"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Layers,
  PlusCircle,
  CreditCard,
  User,
  Zap,
  HelpCircle,
  MessageSquare,
  Sparkles,
  ChevronDown
} from "lucide-react";

export function DashboardNavLinks() {
  const pathname = usePathname();

  return (
    <div className="space-y-5 text-xs">
      {/* 1. MAIN NAVIGATION */}
      <div className="space-y-1">
        <div className="flex items-center justify-between px-3 py-1 text-[10px] font-bold tracking-wider text-muted-foreground/80 dark:text-[#71717a] uppercase">
          <span>PORTAL</span>
          <ChevronDown className="h-3 w-3 opacity-60" />
        </div>

        <div className="relative pl-2.5 space-y-1 before:absolute before:left-3.5 before:top-2 before:bottom-2 before:w-[1px] before:bg-border dark:before:bg-[#22222a]">
          {/* Dashboard Overview */}
          <Link
            href="/dashboard"
            className={`flex items-center gap-2.5 px-3 py-2 rounded-xl font-medium transition-all ${
              pathname === "/dashboard"
                ? "bg-[#ffd233]/20 text-amber-900 dark:text-[#ffd233] border-l-2 border-[#ffd233] font-bold shadow-xs"
                : "text-muted-foreground hover:text-foreground dark:text-[#a1a1aa] dark:hover:text-white hover:bg-muted dark:hover:bg-[#18181d]"
            }`}
          >
            <LayoutDashboard className={`h-4 w-4 ${pathname === "/dashboard" ? "text-amber-600 dark:text-[#ffd233]" : "text-muted-foreground dark:text-[#71717a]"}`} />
            <span>Dashboard</span>
          </Link>

          {/* All Workflows */}
          <Link
            href="/dashboard/workflows"
            className={`flex items-center gap-2.5 px-3 py-2 rounded-xl font-medium transition-all ${
              pathname === "/dashboard/workflows"
                ? "bg-[#ffd233]/20 text-amber-900 dark:text-[#ffd233] border-l-2 border-[#ffd233] font-bold shadow-xs"
                : "text-muted-foreground hover:text-foreground dark:text-[#a1a1aa] dark:hover:text-white hover:bg-muted dark:hover:bg-[#18181d]"
            }`}
          >
            <Layers className={`h-4 w-4 ${pathname === "/dashboard/workflows" ? "text-amber-600 dark:text-[#ffd233]" : "text-muted-foreground dark:text-[#71717a]"}`} />
            <span>My Workflows</span>
          </Link>

          {/* Ready-Made Blueprints Marketplace */}
          <Link
            href="/dashboard/blueprints"
            className={`flex items-center gap-2.5 px-3 py-2 rounded-xl font-medium transition-all ${
              pathname === "/dashboard/blueprints"
                ? "bg-[#ffd233]/20 text-amber-900 dark:text-[#ffd233] border-l-2 border-[#ffd233] font-bold shadow-xs"
                : "text-muted-foreground hover:text-foreground dark:text-[#a1a1aa] dark:hover:text-white hover:bg-muted dark:hover:bg-[#18181d]"
            }`}
          >
            <Sparkles className={`h-4 w-4 ${pathname === "/dashboard/blueprints" ? "text-amber-600 dark:text-[#ffd233]" : "text-muted-foreground dark:text-[#71717a]"}`} />
            <div className="flex items-center justify-between w-full">
              <span>Ready Blueprints</span>
              <span className="px-1.5 py-0.2 rounded-full text-[9px] font-bold bg-[#ffd233] text-black">
                1-Click
              </span>
            </div>
          </Link>

          {/* Request New Workflow Wizard */}
          <Link
            href="/dashboard/workflows/new"
            className={`flex items-center gap-2.5 px-3 py-2 rounded-xl font-medium transition-all ${
              pathname === "/dashboard/workflows/new"
                ? "bg-[#ffd233]/20 text-amber-900 dark:text-[#ffd233] border-l-2 border-[#ffd233] font-bold shadow-xs"
                : "text-muted-foreground hover:text-foreground dark:text-[#a1a1aa] dark:hover:text-white hover:bg-muted dark:hover:bg-[#18181d]"
            }`}
          >
            <PlusCircle className={`h-4 w-4 ${pathname === "/dashboard/workflows/new" ? "text-amber-600 dark:text-[#ffd233]" : "text-muted-foreground dark:text-[#71717a]"}`} />
            <span>+ Request Custom</span>
          </Link>
        </div>
      </div>

      {/* 2. ACCOUNT & BILLING */}
      <div className="space-y-1">
        <div className="flex items-center justify-between px-3 py-1 text-[10px] font-bold tracking-wider text-muted-foreground/80 dark:text-[#71717a] uppercase">
          <span>MANAGEMENT</span>
          <ChevronDown className="h-3 w-3 opacity-60" />
        </div>

        <div className="relative pl-2.5 space-y-1 before:absolute before:left-3.5 before:top-2 before:bottom-2 before:w-[1px] before:bg-border dark:before:bg-[#22222a]">
          {/* Subscription */}
          <Link
            href="/dashboard/subscription"
            className={`flex items-center gap-2.5 px-3 py-2 rounded-xl font-medium transition-all ${
              pathname === "/dashboard/subscription"
                ? "bg-[#ffd233]/20 text-amber-900 dark:text-[#ffd233] border-l-2 border-[#ffd233] font-bold shadow-xs"
                : "text-muted-foreground hover:text-foreground dark:text-[#a1a1aa] dark:hover:text-white hover:bg-muted dark:hover:bg-[#18181d]"
            }`}
          >
            <CreditCard className={`h-4 w-4 ${pathname === "/dashboard/subscription" ? "text-amber-600 dark:text-[#ffd233]" : "text-muted-foreground dark:text-[#71717a]"}`} />
            <span>Subscription & Plans</span>
          </Link>

          {/* Profile */}
          <Link
            href="/dashboard/profile"
            className={`flex items-center gap-2.5 px-3 py-2 rounded-xl font-medium transition-all ${
              pathname === "/dashboard/profile"
                ? "bg-[#ffd233]/20 text-amber-900 dark:text-[#ffd233] border-l-2 border-[#ffd233] font-bold shadow-xs"
                : "text-muted-foreground hover:text-foreground dark:text-[#a1a1aa] dark:hover:text-white hover:bg-muted dark:hover:bg-[#18181d]"
            }`}
          >
            <User className={`h-4 w-4 ${pathname === "/dashboard/profile" ? "text-amber-600 dark:text-[#ffd233]" : "text-muted-foreground dark:text-[#71717a]"}`} />
            <span>Company Profile</span>
          </Link>
        </div>
      </div>

      {/* 3. SUPPORT & HELP */}
      <div className="space-y-1">
        <div className="flex items-center justify-between px-3 py-1 text-[10px] font-bold tracking-wider text-muted-foreground/80 dark:text-[#71717a] uppercase">
          <span>SUPPORT</span>
          <ChevronDown className="h-3 w-3 opacity-60" />
        </div>

        <div className="relative pl-2.5 space-y-1 before:absolute before:left-3.5 before:top-2 before:bottom-2 before:w-[1px] before:bg-border dark:before:bg-[#22222a]">
          <Link
            href="/workflows"
            target="_blank"
            className="flex items-center gap-2.5 px-3 py-2 rounded-xl text-muted-foreground hover:text-foreground dark:text-[#a1a1aa] dark:hover:text-white hover:bg-muted dark:hover:bg-[#18181d] transition-all font-medium"
          >
            <Sparkles className="h-4 w-4 text-muted-foreground dark:text-[#71717a]" />
            <span>Explore Blueprints</span>
          </Link>

          <a
            href="/contact"
            className="flex items-center gap-2.5 px-3 py-2 rounded-xl text-muted-foreground hover:text-foreground dark:text-[#a1a1aa] dark:hover:text-white hover:bg-muted dark:hover:bg-[#18181d] transition-all font-medium"
          >
            <MessageSquare className="h-4 w-4 text-emerald-500" />
            <span>WhatsApp Engineer</span>
          </a>
        </div>
      </div>
    </div>
  );
}
