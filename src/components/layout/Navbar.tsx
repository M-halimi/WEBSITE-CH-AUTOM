"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { 
  Search, 
  Menu, 
  X, 
  MessageSquare, 
  Zap, 
  Heart,
  Sparkles,
  ShieldCheck,
  ChevronRight
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { generateWhatsAppLink } from "@/lib/whatsapp";

const categoryNav = [
  { name: "All Workflows", href: "/workflows" },
  { name: "WhatsApp & Messaging", href: "/workflows?category=whatsapp-messaging" },
  { name: "AI Smart Agents", href: "/workflows?category=ai-smart-agents" },
  { name: "E-Commerce & Orders", href: "/workflows?category=ecommerce-orders" },
  { name: "CRM & Leads", href: "/workflows?category=crm-lead-generation" },
  { name: "Finance & Invoicing", href: "/workflows?category=finance-invoicing" },
  { name: "Custom Request", href: "/request" },
];

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

  return (
    <header className="sticky top-0 z-50 w-full bg-white border-b border-[#d6d6d6]">
      {/* Top Main Navigation */}
      <div className="max-w-[1340px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-18 py-3 items-center justify-between gap-4">
          {/* Etsy-Style Serif Wordmark */}
          <div className="flex items-center gap-6 shrink-0">
            <Link href="/" className="flex items-center gap-2 group">
              <span className="etsy-wordmark text-3xl sm:text-4xl text-[#f1641e] font-serif tracking-tight select-none">
                AutoFlows
              </span>
            </Link>
          </div>

          {/* Central Etsy Search Bar */}
          <div className="hidden md:flex flex-1 max-w-2xl mx-4">
            <form onSubmit={handleSearchSubmit} className="relative w-full flex items-center">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search for anything (WhatsApp AI, Shopify, CRM, Invoicing...)"
                className="w-full h-11 pl-4 pr-12 rounded-[8px] border border-[#222222] bg-white text-sm text-[#222222] placeholder:text-[#595959] focus:outline-none focus:ring-1 focus:ring-[#222222]"
              />
              <button
                type="submit"
                aria-label="Search"
                className="absolute right-1 top-1/2 -translate-y-1/2 h-9 w-9 rounded-[6px] bg-[#f1641e] hover:bg-[#d44e0d] flex items-center justify-center text-white transition-colors"
              >
                <Search className="h-4 w-4 stroke-[2.5]" />
              </button>
            </form>
          </div>

          {/* Right Actions */}
          <div className="flex items-center gap-3 shrink-0">
            <Link href="/request" className="hidden lg:inline-flex text-xs font-semibold text-[#222222] hover:text-[#f1641e] px-2 py-1.5 rounded-full hover:bg-[#f6f6f6] transition-colors">
              Custom Workflow
            </Link>

            <Link href="/login" className="hidden sm:inline-flex">
              <Button
                variant="ghost"
                size="sm"
                className="text-xs font-semibold text-[#222222] hover:text-[#f1641e] rounded-full px-3"
              >
                Sign in
              </Button>
            </Link>

            <a
              href={waLink}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex"
            >
              <Button
                variant="default"
                size="sm"
                className="gap-2 rounded-full text-xs font-semibold px-4 h-9 shadow-sm"
              >
                <MessageSquare className="h-3.5 w-3.5" />
                <span>WhatsApp Contact</span>
              </Button>
            </a>

            {/* Mobile menu button */}
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden text-[#222222] rounded-full"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </div>
      </div>

      {/* Sub Category Strip */}
      <div className="border-t border-[#e6e6e6] bg-white overflow-x-auto scrollbar-none hidden sm:block">
        <div className="max-w-[1340px] mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="flex items-center space-x-6 py-2 text-xs font-medium text-[#222222] whitespace-nowrap">
            {categoryNav.map((cat) => (
              <Link
                key={cat.href}
                href={cat.href}
                className="hover:text-[#f1641e] py-1 border-b-2 border-transparent hover:border-[#f1641e] transition-colors"
              >
                {cat.name}
              </Link>
            ))}
          </nav>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-[#d6d6d6] bg-white px-4 pt-3 pb-6 space-y-4 shadow-lg animate-in slide-in-from-top-2 duration-150">
          <form onSubmit={handleSearchSubmit} className="relative w-full">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search workflows..."
              className="w-full h-11 pl-4 pr-12 rounded-[8px] border border-[#222222] bg-white text-sm text-[#222222]"
            />
            <button
              type="submit"
              aria-label="Submit search"
              className="absolute right-1 top-1/2 -translate-y-1/2 h-9 w-9 rounded-[6px] bg-[#f1641e] flex items-center justify-center text-white"
            >
              <Search className="h-4 w-4" />
            </button>
          </form>

          <nav className="flex flex-col space-y-1 pt-2">
            {categoryNav.map((cat) => (
              <Link
                key={cat.href}
                href={cat.href}
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center justify-between px-3 py-2 text-sm text-[#222222] hover:bg-[#f6f6f6] rounded-[8px]"
              >
                <span>{cat.name}</span>
                <ChevronRight className="h-4 w-4 text-[#757575]" />
              </Link>
            ))}
            <Link
              href="/login"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center justify-between px-3 py-2 text-sm text-[#595959] hover:bg-[#f6f6f6] rounded-[8px]"
            >
              <span>Admin Portal</span>
              <ShieldCheck className="h-4 w-4" />
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}
