import { Metadata } from "next";
import {
  Sparkles,
  CheckCircle2,
  MessageSquare,
  ShieldCheck,
  Zap,
  Clock,
} from "lucide-react";
import { LeadFormModal } from "@/components/workflows/LeadFormModal";
import { Button } from "@/components/ui/button";
import { generateWhatsAppLink } from "@/lib/whatsapp";
import { RequestForm } from "@/components/workflows/RequestForm";

export const metadata: Metadata = {
  title: "Request Custom Automation — AutoFlows Hub",
  description:
    "Get a custom tailored automation workflow built for your business in 48 hours.",
};

export default function CustomRequestPage() {
  const waLink = generateWhatsAppLink({});

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
        {/* Left Col: Explainer & Benefits */}
        <div className="lg:col-span-5 space-y-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
            <Sparkles className="h-3.5 w-3.5" />
            Bespoke Automation Engineering
          </div>

          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-foreground leading-tight">
            Have a Specific Workflow Idea? Let&apos;s Build It.
          </h1>

          <p className="text-sm text-muted-foreground leading-relaxed">
            Tell us about your business process, the apps you currently use, and
            what bottleneck you want to eliminate. We design, build, test, and
            hand over fully documented automation systems.
          </p>

          <div className="space-y-4 pt-2">
            <div className="flex items-start gap-3">
              <div className="h-8 w-8 rounded-lg bg-emerald-500/10 text-emerald-500 flex items-center justify-center shrink-0">
                <Clock className="h-4 w-4" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-foreground">
                  Rapid 48-Hour Delivery
                </h4>
                <p className="text-xs text-muted-foreground">
                  Most workflows are designed, tested, and handed over in 2-3
                  business days.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="h-8 w-8 rounded-lg bg-teal-500/10 text-teal-500 flex items-center justify-center shrink-0">
                <ShieldCheck className="h-4 w-4" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-foreground">
                  Complete Ownership & Zero Lock-in
                </h4>
                <p className="text-xs text-muted-foreground">
                  You own the n8n/Make workflows, scripts, and API credentials
                  100%.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="h-8 w-8 rounded-lg bg-amber-500/10 text-amber-500 flex items-center justify-center shrink-0">
                <Zap className="h-4 w-4" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-foreground">
                  Free 30-Day Maintenance & Support
                </h4>
                <p className="text-xs text-muted-foreground">
                  We monitor runs and tweak node configurations to guarantee
                  99.9% reliability.
                </p>
              </div>
            </div>
          </div>

          <div className="pt-4 p-5 rounded-2xl border border-border bg-card/60">
            <p className="text-xs font-semibold text-foreground mb-2">
              Prefer chatting directly?
            </p>
            <a
              href={waLink}
              target="_blank"
              rel="noopener noreferrer"
              className="block"
            >
              <Button
                variant="whatsapp"
                className="w-full justify-center gap-2 text-xs"
              >
                <MessageSquare className="h-4 w-4" />
                Chat with Lead Automation Engineer
              </Button>
            </a>
          </div>
        </div>

        {/* Right Col: Interactive Request Form */}
        <div className="lg:col-span-7">
          <div className="rounded-3xl border border-border bg-card p-6 sm:p-10 shadow-xl">
            <h2 className="text-xl font-bold text-foreground mb-2">
              Project Brief
            </h2>
            <p className="text-xs text-muted-foreground mb-6">
              Please provide your contact info and workflow details below.
            </p>
            <RequestForm />
          </div>
        </div>
      </div>
    </div>
  );
}
