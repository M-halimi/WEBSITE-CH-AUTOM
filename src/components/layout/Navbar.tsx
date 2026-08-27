"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  Zap,
  Search,
  Menu,
  X,
  MessageSquare,
  Sparkles,
  Layers,
  ShieldCheck,
  ArrowRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "./ThemeToggle";
import { generateWhatsAppLink } from "@/lib/whatsapp";

export function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);
  const [searchQuery, setSearchQuery] = React.useState("");
  const pathname = usePathname();
  const router = useRouter();

  const isCurrent = (path: string) => {
    if (path === "/") return pathname === "/";
    return pathname.startsWith(path);
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/workflows?q=${encodeURIComponent(searchQuery.trim())}`);
      setSearchQuery("");
      setMobileMenuOpen(false);
    }
  };

  const waLink = generateWhatsAppLink({});

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/80 backdrop-blur-xl supports-[backdrop-filter]:bg-background/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between gap-4">
          {/* Brand Logo */}
          <div className="flex items-center gap-8">
            <Link href="/" className="flex items-center gap-2.5 group">
              <div className="h-9 w-9 rounded-xl bg-gradient-to-br from-emerald-400 to-teal-600 flex items-center justify-center text-white shadow-md shadow-emerald-500/25 group-hover:scale-105 transition-transform">
                <Zap className="h-5 w-5 fill-current" />
              </div>
              <div className="flex flex-col">
                <span className="font-bold text-lg tracking-tight flex items-center gap-1.5">
                  AutoFlows
                  <span className="text-[10px] uppercase font-extrabold tracking-wider px-1.5 py-0.5 rounded bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
                    Hub
                  </span>
                </span>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center gap-1">
              <Link
                href="/workflows"
                className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                  isCurrent("/workflows")
                    ? "text-primary bg-primary/10 font-semibold"
                    : "text-muted-foreground hover:text-foreground hover:bg-accent"
                }`}
              >
                <span className="flex items-center gap-1.5">
                  <Layers className="h-4 w-4" />
                  Workflows
                </span>
              </Link>
              <Link
                href="/request"
                className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                  isCurrent("/request")
                    ? "text-primary bg-primary/10 font-semibold"
                    : "text-muted-foreground hover:text-foreground hover:bg-accent"
                }`}
              >
                <span className="flex items-center gap-1.5">
                  <Sparkles className="h-4 w-4 text-emerald-500" />
                  Custom Build
                </span>
              </Link>
            </nav>
          </div>

          {/* Search bar & Actions */}
          <div className="hidden lg:flex items-center flex-1 max-w-xs mx-4">
            <form onSubmit={handleSearchSubmit} className="relative w-full">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search n8n, WhatsApp, AI flows..."
                className="w-full h-9 pl-9 pr-3 text-xs rounded-full border border-border bg-muted/40 focus:bg-background focus:outline-none focus:ring-2 focus:ring-primary/40 transition-all placeholder:text-muted-foreground/70"
              />
            </form>
          </div>

          {/* Right Actions */}
          <div className="flex items-center gap-2 sm:gap-3">
            <ThemeToggle />

            <Link href="/admin" className="hidden sm:inline-flex">
              <Button
                variant="ghost"
                size="sm"
                className="text-xs text-muted-foreground hover:text-foreground"
              >
                <ShieldCheck className="h-4 w-4 mr-1 text-zinc-400" />
                Admin
              </Button>
            </Link>

            <a
              href={waLink}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:inline-flex"
            >
              <Button
                variant="whatsapp"
                size="sm"
                className="gap-1.5 font-medium shadow-sm"
              >
                <MessageSquare className="h-4 w-4" />
                <span>Contact WhatsApp</span>
              </Button>
            </a>

            {/* Mobile menu trigger */}
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? (
                <X className="h-5 w-5" />
              ) : (
                <Menu className="h-5 w-5" />
              )}
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-b border-border bg-background px-4 pt-2 pb-6 space-y-4 animate-in slide-in-from-top-4 duration-200">
          <form onSubmit={handleSearchSubmit} className="relative w-full pt-2">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search workflows, tools, templates..."
              className="w-full h-10 pl-9 pr-3 text-sm rounded-lg border border-border bg-muted/40 focus:bg-background focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </form>

          <nav className="flex flex-col space-y-1">
            <Link
              href="/workflows"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center justify-between px-3 py-2.5 rounded-lg text-sm font-medium hover:bg-accent"
            >
              <span className="flex items-center gap-2">
                <Layers className="h-4 w-4 text-primary" />
                Browse All Workflows
              </span>
              <ArrowRight className="h-4 w-4 text-muted-foreground" />
            </Link>
            <Link
              href="/request"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center justify-between px-3 py-2.5 rounded-lg text-sm font-medium hover:bg-accent"
            >
              <span className="flex items-center gap-2">
                <Sparkles className="h-4 w-4 text-emerald-500" />
                Request Custom Workflow
              </span>
              <ArrowRight className="h-4 w-4 text-muted-foreground" />
            </Link>
            <Link
              href="/admin"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center justify-between px-3 py-2.5 rounded-lg text-sm font-medium hover:bg-accent text-muted-foreground"
            >
              <span className="flex items-center gap-2">
                <ShieldCheck className="h-4 w-4" />
                Admin Dashboard
              </span>
              <ArrowRight className="h-4 w-4 text-muted-foreground" />
            </Link>
          </nav>

          <div className="pt-2">
            <a
              href={waLink}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full block"
            >
              <Button
                variant="whatsapp"
                className="w-full justify-center gap-2"
              >
                <MessageSquare className="h-4 w-4" />
                Chat on WhatsApp
              </Button>
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
