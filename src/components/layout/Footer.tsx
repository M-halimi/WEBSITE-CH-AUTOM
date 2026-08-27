import Link from "next/link";
import {
  Zap,
  MessageSquare,
  Heart,
  ShieldCheck,
  Mail,
  ArrowUpRight,
} from "lucide-react";
import { generateWhatsAppLink } from "@/lib/whatsapp";

export function Footer() {
  const waLink = generateWhatsAppLink({});

  return (
    <footer className="border-t border-border bg-card/50 text-foreground transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 lg:gap-12">
          {/* Col 1: Brand */}
          <div className="space-y-4 md:col-span-1">
            <Link href="/" className="flex items-center gap-2.5">
              <div className="h-8 w-8 rounded-xl bg-gradient-to-br from-emerald-400 to-teal-600 flex items-center justify-center text-white shadow-sm">
                <Zap className="h-4 w-4 fill-current" />
              </div>
              <span className="font-bold text-lg tracking-tight">
                AutoFlows Hub
              </span>
            </Link>
            <p className="text-xs text-muted-foreground leading-relaxed">
              Curated marketplace of battle-tested automation workflows for
              businesses, agencies, and e-commerce brands. Save 100+ hours every
              month.
            </p>
            <div className="flex items-center gap-2 pt-2">
              <a
                href={waLink}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-xs text-emerald-600 dark:text-emerald-400 hover:underline font-medium"
              >
                <MessageSquare className="h-3.5 w-3.5" />
                Direct WhatsApp Support
              </a>
            </div>
          </div>

          {/* Col 2: Categories */}
          <div className="space-y-3">
            <h3 className="text-xs font-bold uppercase tracking-wider text-foreground">
              Top Categories
            </h3>
            <ul className="space-y-2 text-xs text-muted-foreground">
              <li>
                <Link
                  href="/workflows?category=whatsapp-messaging"
                  className="hover:text-primary transition-colors flex items-center gap-1"
                >
                  WhatsApp Automations{" "}
                  <ArrowUpRight className="h-3 w-3 opacity-60" />
                </Link>
              </li>
              <li>
                <Link
                  href="/workflows?category=ecommerce-orders"
                  className="hover:text-primary transition-colors flex items-center gap-1"
                >
                  E-Commerce & Shopify{" "}
                  <ArrowUpRight className="h-3 w-3 opacity-60" />
                </Link>
              </li>
              <li>
                <Link
                  href="/workflows?category=ai-smart-agents"
                  className="hover:text-primary transition-colors flex items-center gap-1"
                >
                  AI Agents & GPT-4o{" "}
                  <ArrowUpRight className="h-3 w-3 opacity-60" />
                </Link>
              </li>
              <li>
                <Link
                  href="/workflows?category=crm-lead-generation"
                  className="hover:text-primary transition-colors flex items-center gap-1"
                >
                  Lead Gen & CRM Sync{" "}
                  <ArrowUpRight className="h-3 w-3 opacity-60" />
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 3: Platforms */}
          <div className="space-y-3">
            <h3 className="text-xs font-bold uppercase tracking-wider text-foreground">
              Supported Engines
            </h3>
            <ul className="space-y-2 text-xs text-muted-foreground">
              <li>
                <Link
                  href="/workflows?platform=n8n"
                  className="hover:text-primary transition-colors"
                >
                  n8n Workflows & Nodes
                </Link>
              </li>
              <li>
                <Link
                  href="/workflows?platform=make"
                  className="hover:text-primary transition-colors"
                >
                  Make.com (Integromat)
                </Link>
              </li>
              <li>
                <Link
                  href="/workflows?platform=whatsapp"
                  className="hover:text-primary transition-colors"
                >
                  WhatsApp Cloud API
                </Link>
              </li>
              <li>
                <Link
                  href="/workflows?platform=openai"
                  className="hover:text-primary transition-colors"
                >
                  OpenAI & Claude LLM Connectors
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 4: Quick Links & Contact */}
          <div className="space-y-3">
            <h3 className="text-xs font-bold uppercase tracking-wider text-foreground">
              Services
            </h3>
            <ul className="space-y-2 text-xs text-muted-foreground">
              <li>
                <Link
                  href="/request"
                  className="hover:text-primary transition-colors"
                >
                  Request Custom Automation
                </Link>
              </li>
              <li>
                <Link
                  href="/admin"
                  className="hover:text-primary transition-colors flex items-center gap-1"
                >
                  <ShieldCheck className="h-3 w-3" />
                  Admin Portal
                </Link>
              </li>
              <li className="pt-2 text-muted-foreground flex items-center gap-1.5">
                <Mail className="h-3.5 w-3.5" />
                <span>contact@workflows.com</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-border flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-muted-foreground">
          <p>
            © {new Date().getFullYear()} AutoFlows Hub. All rights reserved.
          </p>
          <p className="flex items-center gap-1">
            Built with{" "}
            <Heart className="h-3 w-3 text-red-500 fill-current inline" /> for
            modern businesses.
          </p>
        </div>
      </div>
    </footer>
  );
}
