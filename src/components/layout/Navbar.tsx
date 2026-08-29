"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { 
  Search, 
  Zap, 
  MessageSquare, 
  Menu, 
  X, 
  Layers, 
  Sparkles, 
  ArrowRight,
  User,
  CreditCard
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/layout/ThemeToggle";
import { generateWhatsAppLink } from "@/lib/whatsapp";

export function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);
  const [searchQuery, setSearchQuery] = React.useState("");
  const pathname = usePathname();
  const router = useRouter();

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/workflows?q=${encodeURIComponent(searchQuery.trim())}`);
      setSearchQuery("");
      setMobileMenuOpen(false);
    }
  };

  const waLink = generateWhatsAppLink({});

  // Hide public navbar on portal dashboards & auth screens
  if (
    pathname?.startsWith("/admin") ||
    pathname?.startsWith("/dashboard") ||
    pathname?.startsWith("/login") ||
    pathname?.startsWith("/register") ||
    pathname?.startsWith("/forgot-password") ||
    pathname?.startsWith("/reset-password")
  ) {
    return null;
  }

  return (
    <header className="sticky top-0 z-50 w-full bg-background/95 backdrop-blur-md border-b border-border transition-colors duration-300">
      <div className="max-w-[1500px] mx-auto px-4 sm:px-6 lg:px-10">
        <div className="flex h-18 items-center justify-between gap-4 py-3">
          
          {/* Left Brand Mark */}
          <div className="flex items-center gap-6">
            <Link href="/" className="flex items-center gap-2.5 group">
              <div className="h-9 w-9 rounded-full bg-foreground text-background flex items-center justify-center font-bold transition-transform group-hover:scale-105 shadow-xs">
                <span className="text-lg">✦</span>
              </div>
              <span className="font-extrabold text-lg tracking-tight text-foreground">
                AutoFlows <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-[#ffd233] text-black">Hub</span>
              </span>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center gap-1.5 text-xs font-semibold">
              <Link
                href="/workflows"
                className={`px-4 py-2 rounded-full transition-colors ${
                  pathname?.startsWith("/workflows")
                    ? "bg-card border border-border text-foreground shadow-xs"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                Blueprints Catalog
              </Link>
              <Link
                href="/pricing"
                className={`px-4 py-2 rounded-full transition-colors ${
                  pathname === "/pricing"
                    ? "bg-card border border-border text-foreground shadow-xs"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                Subscription Plans
              </Link>
              <Link
                href="/request"
                className={`px-4 py-2 rounded-full transition-colors ${
                  pathname === "/request"
                    ? "bg-card border border-border text-foreground shadow-xs"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                Custom Request
              </Link>
            </nav>
          </div>

          {/* Right Action Bar */}
          <div className="flex items-center gap-2.5 sm:gap-3">
            {/* Search Input Bar */}
            <form onSubmit={handleSearchSubmit} className="hidden sm:flex items-center relative">
              <div className="relative flex items-center">
                <Search className="absolute left-3.5 h-3.5 w-3.5 text-muted-foreground" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search workflows..."
                  className="w-44 md:w-56 h-9 pl-9 pr-3 text-xs rounded-full border border-border bg-card text-foreground focus:outline-none focus:border-[#ffd233] transition-all"
                />
              </div>
            </form>

            <Link
              href="/dashboard"
              className="hidden sm:inline-flex items-center justify-center h-9 px-3.5 text-xs font-bold rounded-full gap-1.5 border border-border bg-card hover:bg-muted text-foreground transition-colors shadow-xs"
            >
              <User className="h-3.5 w-3.5 text-amber-600 dark:text-[#ffd233]" />
              <span>Client Portal</span>
            </Link>

            {/* Dark & Light Mode Switcher */}
            <ThemeToggle />

            {/* WhatsApp CTA */}
            <a
              href={waLink}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center h-9 px-4 text-xs font-bold rounded-full bg-[#ffd233] hover:bg-[#f5c71a] text-black gap-1.5 shadow-xs transition-all"
            >
              <MessageSquare className="h-3.5 w-3.5" />
              <span>WhatsApp</span>
            </a>

            {/* Mobile menu trigger */}
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden text-foreground rounded-full h-9 w-9"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle mobile menu"
            >
              {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-border bg-background px-4 pt-3 pb-6 space-y-3 animate-in slide-in-from-top-2 duration-150">
          <form onSubmit={handleSearchSubmit} className="relative w-full">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search workflows..."
              className="w-full h-10 pl-10 pr-4 text-xs rounded-full border border-border bg-card text-foreground focus:outline-none focus:border-[#ffd233]"
            />
          </form>

          <nav className="flex flex-col space-y-1 pt-1">
            <Link
              href="/workflows"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center justify-between px-4 py-2.5 rounded-full text-xs font-bold text-foreground hover:bg-muted"
            >
              <span className="flex items-center gap-2">
                <Layers className="h-4 w-4 text-amber-500" />
                Browse All Blueprints
              </span>
              <ArrowRight className="h-3.5 w-3.5 text-muted-foreground" />
            </Link>
            <Link
              href="/pricing"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center justify-between px-4 py-2.5 rounded-full text-xs font-bold text-foreground hover:bg-muted"
            >
              <span className="flex items-center gap-2">
                <CreditCard className="h-4 w-4 text-amber-500" />
                Subscription Plans
              </span>
              <ArrowRight className="h-3.5 w-3.5 text-muted-foreground" />
            </Link>
            <Link
              href="/dashboard"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center justify-between px-4 py-2.5 rounded-full text-xs font-bold text-foreground hover:bg-muted"
            >
              <span className="flex items-center gap-2">
                <User className="h-4 w-4 text-amber-500" />
                Client Dashboard
              </span>
              <ArrowRight className="h-3.5 w-3.5 text-muted-foreground" />
            </Link>
            <Link
              href="/request"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center justify-between px-4 py-2.5 rounded-full text-xs font-bold text-foreground hover:bg-muted"
            >
              <span className="flex items-center gap-2">
                <Sparkles className="h-4 w-4 text-amber-500" />
                Request Custom Engineering
              </span>
              <ArrowRight className="h-3.5 w-3.5 text-muted-foreground" />
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}
