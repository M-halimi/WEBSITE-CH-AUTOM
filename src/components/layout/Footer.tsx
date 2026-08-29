"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { MessageSquare, ShieldCheck, Zap, ArrowRight } from "lucide-react";
import { generateWhatsAppLink } from "@/lib/whatsapp";
import { DEFAULT_SETTINGS, SiteSettingsData } from "@/lib/settings-config";

interface FooterProps {
  initialSettings?: SiteSettingsData;
}

export function Footer({ initialSettings = DEFAULT_SETTINGS }: FooterProps) {
  const pathname = usePathname();
  const settings = initialSettings;
  const waLink = generateWhatsAppLink({ whatsappNumber: settings.whatsappNumber });

  // 100% Hide public website footer on all admin/dashboard pages and auth routes
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
    <footer className="w-full transition-colors duration-300 overflow-hidden">
      {/* 1. Transactional Top Band (Editable from Admin Settings) */}
      <div className="bg-card text-foreground border-t border-border py-14 px-4 sm:px-6 lg:px-10">
        <div className="max-w-[1400px] mx-auto flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="space-y-3 max-w-xl text-center md:text-left">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-[#ffd233] text-black shadow-xs">
              <Zap className="h-3.5 w-3.5 fill-current" />
              {settings.ctaBadge}
            </span>
            <h3 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-foreground">
              {settings.ctaTitle}
            </h3>
            <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
              {settings.ctaDescription}
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-3 shrink-0">
            <Link
              href="/request"
              className="h-11 px-6 text-xs font-bold rounded-full bg-[#ffd233] hover:bg-[#f5c71a] text-black shadow-xs inline-flex items-center justify-center transition-all"
            >
              <span>{settings.ctaButtonText}</span>
              <ArrowRight className="h-4 w-4 ml-1.5" />
            </Link>
            <a
              href={waLink}
              target="_blank"
              rel="noopener noreferrer"
              className="h-11 px-6 text-xs font-bold rounded-full bg-background hover:bg-muted text-foreground border border-border inline-flex items-center justify-center transition-all shadow-xs"
            >
              <MessageSquare className="h-4 w-4 mr-1.5 text-amber-600 dark:text-[#ffd233]" />
              <span>{settings.ctaSecondaryText}</span>
            </a>
          </div>
        </div>
      </div>

      {/* 2. Structured Link Columns Footer */}
      <div className="bg-background text-muted-foreground border-t border-border py-14 px-4 sm:px-6 lg:px-10 text-xs">
        <div className="max-w-[1400px] mx-auto grid grid-cols-2 md:grid-cols-4 gap-8">
          <div className="space-y-3">
            <h4 className="text-foreground text-sm font-bold">Automation Blueprints</h4>
            <ul className="space-y-2">
              <li><Link href="/workflows" className="hover:text-foreground transition-colors">Catalog Overview</Link></li>
              <li><Link href="/workflows?category=whatsapp-messaging" className="hover:text-foreground transition-colors">WhatsApp Cloud API</Link></li>
              <li><Link href="/workflows?category=ai-smart-agents" className="hover:text-foreground transition-colors">GPT-4o Customer Agents</Link></li>
              <li><Link href="/workflows?category=ecommerce-orders" className="hover:text-foreground transition-colors">Shopify & E-Commerce</Link></li>
              <li><Link href="/workflows?category=crm-lead-generation" className="hover:text-foreground transition-colors">CRM & Lead Sync</Link></li>
            </ul>
          </div>

          <div className="space-y-3">
            <h4 className="text-foreground text-sm font-bold">Integrations & Engines</h4>
            <ul className="space-y-2">
              <li><Link href="/workflows?platform=n8n" className="hover:text-foreground transition-colors">n8n Blueprints</Link></li>
              <li><Link href="/workflows?platform=make" className="hover:text-foreground transition-colors">Make.com Scenarios</Link></li>
              <li><Link href="/workflows?platform=openai" className="hover:text-foreground transition-colors">OpenAI Function Nodes</Link></li>
              <li><Link href="/workflows?platform=stripe" className="hover:text-foreground transition-colors">Stripe PDF Invoicing</Link></li>
              <li><Link href="/workflows?platform=google-sheets" className="hover:text-foreground transition-colors">Google Sheets Auto-Sync</Link></li>
            </ul>
          </div>

          <div className="space-y-3">
            <h4 className="text-foreground text-sm font-bold">Custom Services</h4>
            <ul className="space-y-2">
              <li><Link href="/request" className="hover:text-foreground transition-colors">Bespoke Workflow Design</Link></li>
              <li><Link href="/request" className="hover:text-foreground transition-colors">48-Hour Turnkey Setup</Link></li>
              <li><a href={waLink} target="_blank" rel="noopener noreferrer" className="hover:text-foreground transition-colors">Engineer Consultation</a></li>
              <li><Link href="/admin/settings" className="hover:text-foreground transition-colors">Site Settings</Link></li>
            </ul>
          </div>

          <div className="space-y-3">
            <h4 className="text-foreground text-sm font-bold">Enterprise Security</h4>
            <ul className="space-y-2">
              <li className="flex items-center gap-1.5 text-foreground font-semibold">
                <ShieldCheck className="h-4 w-4 text-amber-600 dark:text-[#ffd233]" /> 100% Code Ownership
              </li>
              <li>Zero recurring platform fees</li>
              <li>Encrypted cloud webhooks</li>
              <li>Guaranteed 99.9% uptime</li>
            </ul>
          </div>
        </div>

        <div className="max-w-[1400px] mx-auto mt-10 pt-6 border-t border-border flex flex-col sm:flex-row items-center justify-between gap-4 text-muted-foreground">
          <div className="flex items-center gap-2">
            <div className="h-6 w-6 rounded-full bg-[#ffd233] text-black flex items-center justify-center font-bold text-xs">
              ✦
            </div>
            <span className="text-foreground font-bold">{settings.siteName}</span>
            <span>{settings.footerCopyright}</span>
          </div>

          <div className="flex items-center gap-6">
            <Link href="/workflows" className="hover:underline">All Workflows</Link>
            <Link href="/request" className="hover:underline">Custom Requests</Link>
            <a href={waLink} target="_blank" rel="noopener noreferrer" className="hover:underline">WhatsApp Support</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
