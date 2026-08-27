import { Metadata } from "next";
import { Sparkles, MessageSquare, ShieldCheck, Zap, Clock, ShoppingBag } from "lucide-react";
import { Button } from "@/components/ui/button";
import { generateWhatsAppLink } from "@/lib/whatsapp";
import { RequestForm } from "@/components/workflows/RequestForm";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Request Custom Automation — AutoFlows Hub",
  description: "Get a bespoke commerce automation workflow engineered for your business in 48 hours.",
};

export default function CustomRequestPage() {
  const waLink = generateWhatsAppLink({});

  return (
    <div className="bg-background text-foreground min-h-screen transition-colors duration-300">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-10 py-10 md:py-14">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Left Col: Benefits */}
          <div className="lg:col-span-5 space-y-6">
            <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full text-xs font-bold bg-[#ffd233] text-black shadow-xs">
              <Sparkles className="h-3.5 w-3.5" />
              Bespoke Enterprise Engineering
            </span>

            <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-foreground leading-tight">
              Have a Specific Automation Workflow in Mind?
            </h1>

            <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
              Tell us about your business process, the apps you use, and what manual bottleneck you want to eliminate. We design, test, and hand over fully turnkey automation systems.
            </p>

            <div className="space-y-3 pt-2">
              <div className="flex items-start gap-3.5 p-5 rounded-3xl bg-card border border-border modern-saas-card shadow-xs">
                <div className="h-10 w-10 rounded-2xl bg-amber-100 dark:bg-amber-950/50 text-amber-800 dark:text-[#ffd233] flex items-center justify-center shrink-0 border border-amber-300">
                  <Clock className="h-5 w-5" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-foreground">Rapid 48-Hour Delivery</h4>
                  <p className="text-xs text-muted-foreground mt-1">Most custom workflows are designed, tested, and handed over in 2–3 business days.</p>
                </div>
              </div>

              <div className="flex items-start gap-3.5 p-5 rounded-3xl bg-card border border-border modern-saas-card shadow-xs">
                <div className="h-10 w-10 rounded-2xl bg-amber-100 dark:bg-amber-950/50 text-amber-800 dark:text-[#ffd233] flex items-center justify-center shrink-0 border border-amber-300">
                  <ShieldCheck className="h-5 w-5" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-foreground">100% Code Ownership & Zero Lock-in</h4>
                  <p className="text-xs text-muted-foreground mt-1">You own the n8n blueprints, scripts, and API credentials completely.</p>
                </div>
              </div>

              <div className="flex items-start gap-3.5 p-5 rounded-3xl bg-card border border-border modern-saas-card shadow-xs">
                <div className="h-10 w-10 rounded-2xl bg-amber-100 dark:bg-amber-950/50 text-amber-800 dark:text-[#ffd233] flex items-center justify-center shrink-0 border border-amber-300">
                  <Zap className="h-5 w-5 fill-current" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-foreground">Free 30-Day Reliability Support</h4>
                  <p className="text-xs text-muted-foreground mt-1">We monitor node executions and refine parameters for 99.9% uptime.</p>
                </div>
              </div>
            </div>

            <div className="p-6 rounded-3xl border border-border bg-card shadow-xs">
              <p className="text-xs font-bold text-foreground mb-2.5">Prefer chatting directly?</p>
              <a href={waLink} target="_blank" rel="noopener noreferrer" className="block">
                <Button variant="default" className="w-full justify-center gap-2 text-xs font-bold rounded-full bg-[#ffd233] hover:bg-[#f5c71a] text-black shadow-xs h-11">
                  <MessageSquare className="h-4 w-4" />
                  Chat with Lead Automation Engineer
                </Button>
              </a>
            </div>
          </div>

          {/* Right Col: Request Form */}
          <div className="lg:col-span-7">
            <div className="rounded-3xl border border-border bg-card p-6 sm:p-10 shadow-sm">
              <h2 className="text-xl sm:text-2xl font-bold text-foreground mb-1">Project Brief</h2>
              <p className="text-xs text-muted-foreground mb-6">
                Please provide your contact info and workflow details below.
              </p>
              <RequestForm />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
