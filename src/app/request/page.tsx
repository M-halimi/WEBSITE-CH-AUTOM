import { Metadata } from "next";
import { Sparkles, MessageSquare, ShieldCheck, Zap, Clock, ShoppingBag } from "lucide-react";
import { Button } from "@/components/ui/button";
import { generateWhatsAppLink } from "@/lib/whatsapp";
import { RequestForm } from "@/components/workflows/RequestForm";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Request Custom Automation — AutoFlows Hub",
<<<<<<< HEAD
  description: "Get a bespoke commerce automation workflow engineered for your business in 48 hours.",
=======
  description: "Get a bespoke automation workflow engineered for your business in 48 hours.",
>>>>>>> 7ee9ca6f04322930ec29228c493ddb72ee250ce5
};

export default function CustomRequestPage() {
  const waLink = generateWhatsAppLink({});

  return (
<<<<<<< HEAD
    <div className="bg-background text-foreground min-h-screen transition-colors duration-300">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-10 py-10 md:py-14">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Left Col: Benefits */}
          <div className="lg:col-span-5 space-y-6">
            <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full text-xs font-bold bg-[#ffd233] text-black shadow-xs">
=======
    <div className="bg-white text-[#222222] min-h-screen">
      <div className="max-w-[1340px] mx-auto px-4 sm:px-6 lg:px-8 py-10 md:py-14">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          {/* Left Col: Benefits */}
          <div className="lg:col-span-5 space-y-6">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-[4px] text-xs font-semibold bg-[#fdf6e8] text-[#a66523]">
>>>>>>> 7ee9ca6f04322930ec29228c493ddb72ee250ce5
              <Sparkles className="h-3.5 w-3.5" />
              Bespoke Enterprise Engineering
            </span>

<<<<<<< HEAD
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
=======
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-semibold tracking-tight text-[#222222] leading-tight">
              Have a Specific Automation Workflow in Mind?
            </h1>

            <p className="text-xs sm:text-sm text-[#595959] leading-relaxed">
              Tell us about your business process, the apps you currently use, and what manual bottleneck you want to eliminate. We design, test, and hand over fully turnkey automation systems.
            </p>

            <div className="space-y-3 pt-2">
              <div className="flex items-start gap-3 p-4 rounded-[8px] bg-[#fdf6e8]/40 border border-[#f5e8c8]">
                <div className="h-9 w-9 rounded-full bg-[#fdf6e8] text-[#a66523] flex items-center justify-center shrink-0">
                  <Clock className="h-4 w-4" />
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-[#222222]">Rapid 48-Hour Delivery</h4>
                  <p className="text-xs text-[#595959] mt-0.5">Most custom workflows are designed, tested, and handed over in 2–3 business days.</p>
                </div>
              </div>

              <div className="flex items-start gap-3 p-4 rounded-[8px] bg-[#fdf6e8]/40 border border-[#f5e8c8]">
                <div className="h-9 w-9 rounded-full bg-[#fdf6e8] text-[#a66523] flex items-center justify-center shrink-0">
                  <ShieldCheck className="h-4 w-4" />
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-[#222222]">100% Code Ownership & Zero Lock-in</h4>
                  <p className="text-xs text-[#595959] mt-0.5">You own the n8n blueprints, scripts, and API credentials completely.</p>
                </div>
              </div>

              <div className="flex items-start gap-3 p-4 rounded-[8px] bg-[#fdf6e8]/40 border border-[#f5e8c8]">
                <div className="h-9 w-9 rounded-full bg-[#fdf6e8] text-[#a66523] flex items-center justify-center shrink-0">
                  <Zap className="h-4 w-4" />
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-[#222222]">Free 30-Day Reliability Support</h4>
                  <p className="text-xs text-[#595959] mt-0.5">We monitor node executions and refine parameters for 99.9% uptime.</p>
>>>>>>> 7ee9ca6f04322930ec29228c493ddb72ee250ce5
                </div>
              </div>
            </div>

<<<<<<< HEAD
            <div className="p-6 rounded-3xl border border-border bg-card shadow-xs">
              <p className="text-xs font-bold text-foreground mb-2.5">Prefer chatting directly?</p>
              <a href={waLink} target="_blank" rel="noopener noreferrer" className="block">
                <Button variant="default" className="w-full justify-center gap-2 text-xs font-bold rounded-full bg-[#ffd233] hover:bg-[#f5c71a] text-black shadow-xs h-11">
                  <MessageSquare className="h-4 w-4" />
=======
            <div className="p-5 rounded-[8px] border border-[#d6d6d6] bg-[#f6f6f6]">
              <p className="text-xs font-semibold text-[#222222] mb-2">Prefer chatting directly?</p>
              <a href={waLink} target="_blank" rel="noopener noreferrer" className="block">
                <Button variant="secondary" className="w-full justify-center gap-2 text-xs rounded-full bg-white hover:bg-[#fdf6e8] text-[#222222] border border-[#bdbdbd]">
                  <MessageSquare className="h-4 w-4 text-[#f1641e]" />
>>>>>>> 7ee9ca6f04322930ec29228c493ddb72ee250ce5
                  Chat with Lead Automation Engineer
                </Button>
              </a>
            </div>
          </div>

          {/* Right Col: Request Form */}
          <div className="lg:col-span-7">
<<<<<<< HEAD
            <div className="rounded-3xl border border-border bg-card p-6 sm:p-10 shadow-sm">
              <h2 className="text-xl sm:text-2xl font-bold text-foreground mb-1">Project Brief</h2>
              <p className="text-xs text-muted-foreground mb-6">
=======
            <div className="rounded-[8px] border border-[#d6d6d6] bg-white p-6 sm:p-8 shadow-sm">
              <h2 className="text-lg sm:text-xl font-semibold text-[#222222] mb-1">Project Brief</h2>
              <p className="text-xs text-[#595959] mb-6">
>>>>>>> 7ee9ca6f04322930ec29228c493ddb72ee250ce5
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
