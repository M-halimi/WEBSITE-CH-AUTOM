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
  Layers, 
  ShieldCheck,
  ArrowRight
} from "lucide-react";
import { Button } from "@/components/ui/button";
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
    <header className="sticky top-0 z-50 w-full bg-black border-b border-[#232323]">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-8 lg:px-14">
        <div className="flex h-20 items-center justify-between gap-4">
          {/* Brand Logo */}
          <div className="flex items-center gap-8">
            <Link href="/" className="flex items-center gap-2.5 group">
              <div className="h-9 w-9 rounded-[8px] bg-[#e50914] flex items-center justify-center text-white font-black text-xl shadow-none">
                <Zap className="h-5 w-5 fill-current" />
              </div>
              <span className="font-black text-2xl tracking-tighter text-[#e50914] uppercase">
                AUTOFLOWS
              </span>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center gap-2">
              <Link
                href="/workflows"
                className={`px-3 py-1.5 rounded-[8px] text-sm transition-colors ${
                  isCurrent("/workflows")
                    ? "text-white font-bold bg-[#232323]"
                    : "text-[#808080] hover:text-white"
                }`}
              >
                Workflows
              </Link>
              <Link
                href="/request"
                className={`px-3 py-1.5 rounded-[8px] text-sm transition-colors ${
                  isCurrent("/request")
                    ? "text-white font-bold bg-[#232323]"
                    : "text-[#808080] hover:text-white"
                }`}
              >
                Custom Request
              </Link>
            </nav>
          </div>

          {/* Search bar */}
          <div className="hidden lg:flex items-center flex-1 max-w-sm mx-6">
            <form onSubmit={handleSearchSubmit} className="relative w-full">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-[#808080]" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search workflows, n8n, WhatsApp..."
                className="w-full h-10 pl-10 pr-4 text-xs rounded-[8px] border border-[#414141] bg-[#2d2d2d] text-white focus:outline-none focus:border-white transition-colors placeholder:text-[#808080]"
              />
            </form>
          </div>

          {/* Right Actions */}
          <div className="flex items-center gap-3">
            <Link href="/login" className="hidden sm:inline-flex">
              <Button
                variant="signin"
                className="h-8 px-4 text-xs font-semibold"
              >
                Admin Sign In
              </Button>
            </Link>

            <a
              href={waLink}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:inline-flex"
            >
              <Button
                variant="default"
                size="sm"
                className="gap-2 font-medium"
              >
                <MessageSquare className="h-4 w-4" />
                <span>WhatsApp</span>
              </Button>
            </a>

            {/* Mobile menu trigger */}
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden text-white"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-b border-[#232323] bg-black px-4 pt-2 pb-6 space-y-4 animate-in slide-in-from-top-2 duration-150">
          <form onSubmit={handleSearchSubmit} className="relative w-full pt-2">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-[#808080]" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search workflows..."
              className="w-full h-11 pl-10 pr-3 text-sm rounded-[8px] border border-[#414141] bg-[#2d2d2d] text-white focus:outline-none focus:border-white"
            />
          </form>

          <nav className="flex flex-col space-y-1">
            <Link
              href="/workflows"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center justify-between px-3 py-2.5 rounded-[8px] text-sm text-white hover:bg-[#232323]"
            >
              <span className="flex items-center gap-2">
                <Layers className="h-4 w-4 text-[#e50914]" />
                Browse All Workflows
              </span>
              <ArrowRight className="h-4 w-4 text-[#808080]" />
            </Link>
            <Link
              href="/request"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center justify-between px-3 py-2.5 rounded-[8px] text-sm text-white hover:bg-[#232323]"
            >
              <span className="flex items-center gap-2">
                <Zap className="h-4 w-4 text-[#e50914]" />
                Request Custom Workflow
              </span>
              <ArrowRight className="h-4 w-4 text-[#808080]" />
            </Link>
            <Link
              href="/login"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center justify-between px-3 py-2.5 rounded-[8px] text-sm text-[#808080] hover:bg-[#232323]"
            >
              <span className="flex items-center gap-2">
                <ShieldCheck className="h-4 w-4" />
                Admin Portal
              </span>
              <ArrowRight className="h-4 w-4 text-[#808080]" />
            </Link>
          </nav>

          <div className="pt-2">
            <a
              href={waLink}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full block"
            >
              <Button variant="default" className="w-full justify-center gap-2 font-semibold">
                <MessageSquare className="h-4 w-4" />
                Direct WhatsApp Contact
              </Button>
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
