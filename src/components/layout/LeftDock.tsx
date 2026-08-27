"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { 
  Home, 
  Layers, 
  Sparkles, 
  MessageSquare, 
  Zap
} from "lucide-react";
import { generateWhatsAppLink } from "@/lib/whatsapp";

export function LeftDock() {
  const pathname = usePathname();

  // Hide the floating dock on admin routes since admin layout has its own full sidebar
  if (pathname?.startsWith("/admin")) {
    return null;
  }

  const waLink = generateWhatsAppLink({});

  return (
    <aside className="hidden xl:flex fixed left-6 top-24 bottom-10 z-40 flex-col justify-between py-6 px-3 rounded-3xl bg-card border border-border shadow-lg">
      {/* Top Navigation Icons */}
      <div className="flex flex-col items-center gap-4">
        {/* Home */}
        <Link
          href="/"
          className={`h-10 w-10 rounded-2xl flex items-center justify-center transition-all ${
            pathname === "/"
              ? "bg-[#ffd233] text-black shadow-xs font-bold"
              : "text-muted-foreground hover:text-foreground hover:bg-muted"
          }`}
          title="Home"
        >
          <Home className="h-4 w-4" />
        </Link>

        {/* Workflows Catalog */}
        <Link
          href="/workflows"
          className={`h-10 w-10 rounded-2xl flex items-center justify-center transition-all ${
            pathname?.startsWith("/workflows")
              ? "bg-[#ffd233] text-black shadow-xs font-bold"
              : "text-muted-foreground hover:text-foreground hover:bg-muted"
          }`}
          title="Blueprints Catalog"
        >
          <Layers className="h-4 w-4" />
        </Link>

        {/* Custom Engineering Request */}
        <Link
          href="/request"
          className={`h-10 w-10 rounded-2xl flex items-center justify-center transition-all ${
            pathname === "/request"
              ? "bg-[#ffd233] text-black shadow-xs font-bold"
              : "text-muted-foreground hover:text-foreground hover:bg-muted"
          }`}
          title="Custom Automation Request"
        >
          <Sparkles className="h-4 w-4" />
        </Link>
      </div>

      {/* Bottom WhatsApp Contact */}
      <div className="flex flex-col items-center gap-3 pt-4 border-t border-border">
        <a
          href={waLink}
          target="_blank"
          rel="noopener noreferrer"
          className="h-10 w-10 rounded-2xl bg-amber-100 dark:bg-amber-950/50 border border-amber-300 flex items-center justify-center text-black dark:text-[#ffd233] hover:scale-105 transition-all shadow-xs"
          title="Direct WhatsApp Support"
        >
          <MessageSquare className="h-4 w-4 fill-current" />
        </a>
      </div>
    </aside>
  );
}
