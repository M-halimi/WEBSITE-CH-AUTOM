"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Layers,
  PlusCircle,
  UploadCloud,
  Users,
  SlidersHorizontal,
  Zap,
  HelpCircle,
  Cpu,
  ChevronDown
} from "lucide-react";

export function AdminNavLinks() {
  const pathname = usePathname();

  return (
    <div className="space-y-5 text-xs">
      {/* 1. MAIN GROUP */}
      <div className="space-y-1">
        <div className="flex items-center justify-between px-3 py-1 text-[10px] font-bold tracking-wider text-muted-foreground/80 dark:text-[#71717a] uppercase">
          <span>MAIN</span>
          <ChevronDown className="h-3 w-3 opacity-60" />
        </div>

        <div className="relative pl-2.5 space-y-1 before:absolute before:left-3.5 before:top-2 before:bottom-2 before:w-[1px] before:bg-border dark:before:bg-[#22222a]">
          {/* Dashboard */}
          <Link
            href="/admin"
            className={`flex items-center gap-2.5 px-3 py-2 rounded-xl font-medium transition-all ${
              pathname === "/admin"
                ? "bg-[#ffd233]/20 text-amber-900 dark:text-[#ffd233] border-l-2 border-[#ffd233] font-bold shadow-xs"
                : "text-muted-foreground hover:text-foreground dark:text-[#a1a1aa] dark:hover:text-white hover:bg-muted dark:hover:bg-[#18181d]"
            }`}
          >
            <LayoutDashboard className={`h-4 w-4 ${pathname === "/admin" ? "text-amber-600 dark:text-[#ffd233]" : "text-muted-foreground dark:text-[#71717a]"}`} />
            <span>Dashboard</span>
          </Link>

          {/* All Blueprints */}
          <Link
            href="/admin/workflows"
            className={`flex items-center gap-2.5 px-3 py-2 rounded-xl font-medium transition-all ${
              pathname === "/admin/workflows"
                ? "bg-[#ffd233]/20 text-amber-900 dark:text-[#ffd233] border-l-2 border-[#ffd233] font-bold shadow-xs"
                : "text-muted-foreground hover:text-foreground dark:text-[#a1a1aa] dark:hover:text-white hover:bg-muted dark:hover:bg-[#18181d]"
            }`}
          >
            <Layers className={`h-4 w-4 ${pathname === "/admin/workflows" ? "text-amber-600 dark:text-[#ffd233]" : "text-muted-foreground dark:text-[#71717a]"}`} />
            <span>Blueprints</span>
          </Link>

          {/* Create Workflow */}
          <Link
            href="/admin/workflows/new"
            className={`flex items-center gap-2.5 px-3 py-2 rounded-xl font-medium transition-all ${
              pathname === "/admin/workflows/new"
                ? "bg-[#ffd233]/20 text-amber-900 dark:text-[#ffd233] border-l-2 border-[#ffd233] font-bold shadow-xs"
                : "text-muted-foreground hover:text-foreground dark:text-[#a1a1aa] dark:hover:text-white hover:bg-muted dark:hover:bg-[#18181d]"
            }`}
          >
            <PlusCircle className={`h-4 w-4 ${pathname === "/admin/workflows/new" ? "text-amber-600 dark:text-[#ffd233]" : "text-muted-foreground dark:text-[#71717a]"}`} />
            <span>Create Blueprint</span>
          </Link>

          {/* Leads */}
          <Link
            href="/admin/requests"
            className={`flex items-center gap-2.5 px-3 py-2 rounded-xl font-medium transition-all ${
              pathname === "/admin/requests"
                ? "bg-[#ffd233]/20 text-amber-900 dark:text-[#ffd233] border-l-2 border-[#ffd233] font-bold shadow-xs"
                : "text-muted-foreground hover:text-foreground dark:text-[#a1a1aa] dark:hover:text-white hover:bg-muted dark:hover:bg-[#18181d]"
            }`}
          >
            <Users className={`h-4 w-4 ${pathname === "/admin/requests" ? "text-amber-600 dark:text-[#ffd233]" : "text-muted-foreground dark:text-[#71717a]"}`} />
            <span>Client Leads</span>
          </Link>

          {/* Import n8n */}
          <Link
            href="/admin/import"
            className={`flex items-center gap-2.5 px-3 py-2 rounded-xl font-medium transition-all ${
              pathname === "/admin/import"
                ? "bg-[#ffd233]/20 text-amber-900 dark:text-[#ffd233] border-l-2 border-[#ffd233] font-bold shadow-xs"
                : "text-muted-foreground hover:text-foreground dark:text-[#a1a1aa] dark:hover:text-white hover:bg-muted dark:hover:bg-[#18181d]"
            }`}
          >
            <UploadCloud className={`h-4 w-4 ${pathname === "/admin/import" ? "text-amber-600 dark:text-[#ffd233]" : "text-muted-foreground dark:text-[#71717a]"}`} />
            <span>Import n8n</span>
          </Link>
        </div>
      </div>

      {/* 2. FEATURES GROUP */}
      <div className="space-y-1">
        <div className="flex items-center justify-between px-3 py-1 text-[10px] font-bold tracking-wider text-muted-foreground/80 dark:text-[#71717a] uppercase">
          <span>FEATURES</span>
          <ChevronDown className="h-3 w-3 opacity-60" />
        </div>

        <div className="relative pl-2.5 space-y-1 before:absolute before:left-3.5 before:top-2 before:bottom-2 before:w-[1px] before:bg-border dark:before:bg-[#22222a]">
          <Link
            href="/admin/workflows"
            className="flex items-center gap-2.5 px-3 py-2 rounded-xl text-muted-foreground hover:text-foreground dark:text-[#a1a1aa] dark:hover:text-white hover:bg-muted dark:hover:bg-[#18181d] transition-all font-medium"
          >
            <Cpu className="h-4 w-4 text-muted-foreground dark:text-[#71717a]" />
            <span>Integrations (40+)</span>
          </Link>

          <Link
            href="/admin/workflows"
            className="flex items-center gap-2.5 px-3 py-2 rounded-xl text-muted-foreground hover:text-foreground dark:text-[#a1a1aa] dark:hover:text-white hover:bg-muted dark:hover:bg-[#18181d] transition-all font-medium"
          >
            <Zap className="h-4 w-4 text-muted-foreground dark:text-[#71717a]" />
            <span>Automation Flows</span>
          </Link>
        </div>
      </div>

      {/* 3. TOOLS GROUP */}
      <div className="space-y-1">
        <div className="flex items-center justify-between px-3 py-1 text-[10px] font-bold tracking-wider text-muted-foreground/80 dark:text-[#71717a] uppercase">
          <span>TOOLS</span>
          <ChevronDown className="h-3 w-3 opacity-60" />
        </div>

        <div className="relative pl-2.5 space-y-1 before:absolute before:left-3.5 before:top-2 before:bottom-2 before:w-[1px] before:bg-border dark:before:bg-[#22222a]">
          <Link
            href="/admin/settings"
            className={`flex items-center gap-2.5 px-3 py-2 rounded-xl font-medium transition-all ${
              pathname === "/admin/settings"
                ? "bg-[#ffd233]/20 text-amber-900 dark:text-[#ffd233] border-l-2 border-[#ffd233] font-bold shadow-xs"
                : "text-muted-foreground hover:text-foreground dark:text-[#a1a1aa] dark:hover:text-white hover:bg-muted dark:hover:bg-[#18181d]"
            }`}
          >
            <SlidersHorizontal className={`h-4 w-4 ${pathname === "/admin/settings" ? "text-amber-600 dark:text-[#ffd233]" : "text-muted-foreground dark:text-[#71717a]"}`} />
            <span>Site Customizer</span>
          </Link>

          <Link
            href="/admin"
            className="flex items-center gap-2.5 px-3 py-2 rounded-xl text-muted-foreground hover:text-foreground dark:text-[#a1a1aa] dark:hover:text-white hover:bg-muted dark:hover:bg-[#18181d] transition-all font-medium"
          >
            <HelpCircle className="h-4 w-4 text-muted-foreground dark:text-[#71717a]" />
            <span>Help Center</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
