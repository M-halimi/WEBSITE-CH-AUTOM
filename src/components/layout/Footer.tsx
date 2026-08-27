import Link from "next/link";
import { MessageSquare, ShieldCheck, Zap, ArrowRight, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { generateWhatsAppLink } from "@/lib/whatsapp";

export function Footer() {
  const waLink = generateWhatsAppLink({});

  return (
    <footer className="w-full transition-colors duration-300 overflow-hidden">
      {/* 1. Transactional Top Band */}
      <div className="bg-card text-foreground border-t border-border py-14 px-4 sm:px-6 lg:px-10">
        <div className="max-w-[1400px] mx-auto flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="space-y-3 max-w-xl text-center md:text-left">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-[#ffd233] text-black shadow-xs">
              <Zap className="h-3.5 w-3.5 fill-current" />
              Turnkey Enterprise Engineering
            </span>
            <h3 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-foreground">
              Start automating your commerce infrastructure today.
            </h3>
            <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
              Connect with our certified engineers to build custom n8n, Meta Ads & WhatsApp pipelines in 48 hours.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-3 shrink-0">
            <Link href="/request">
              <Button
                variant="default"
                size="lg"
                className="h-11 px-6 text-xs font-bold rounded-full bg-[#ffd233] hover:bg-[#f5c71a] text-black shadow-xs"
              >
                <span>Request Custom Blueprint</span>
                <ArrowRight className="h-4 w-4 ml-1.5" />
              </Button>
            </Link>
            <a href={waLink} target="_blank" rel="noopener noreferrer">
              <Button
                variant="outline"
                size="lg"
                className="h-11 px-6 text-xs font-bold rounded-full bg-background hover:bg-muted text-foreground border border-border"
              >
                <MessageSquare className="h-4 w-4 mr-1.5 text-amber-600 dark:text-[#ffd233]" />
                WhatsApp Direct
              </Button>
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
              <li><Link href="/admin" className="hover:text-foreground transition-colors">Admin Management</Link></li>
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
            <span className="text-foreground font-bold">AutoFlows Hub</span>
            <span>© 2026 AutoFlows Hub Inc. All rights reserved.</span>
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
