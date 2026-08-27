import { Metadata } from "next";
import { Sparkles, MessageSquare, ShieldCheck, Zap, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { generateWhatsAppLink } from "@/lib/whatsapp";
import { RequestForm } from "@/components/workflows/RequestForm";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Request Custom Automation — AutoFlows Hub",
  description: "Get a custom tailored automation workflow built for your business in 48 hours.",
};

export default function CustomRequestPage() {
  const waLink = generateWhatsAppLink({});

  return (
    <div className="bg-black text-white min-h-screen">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-8 lg:px-14 py-12 md:py-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Left Col: Explainer & Benefits */}
          <div className="lg:col-span-5 space-y-6">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-[4px] text-xs font-bold bg-[#e50914] text-white">
              <Sparkles className="h-3.5 w-3.5" />
              Bespoke Engineering
            </span>

            <h1 className="text-3xl sm:text-5xl font-black tracking-tight text-white leading-tight uppercase">
              Have a Specific Automation Idea?
            </h1>

            <p className="text-sm sm:text-base text-[#808080] leading-relaxed">
              Tell us about your business process, the apps you currently use, and what bottleneck you want to eliminate. We design, test, and hand over fully turnkey automation systems.
            </p>

            <div className="space-y-4 pt-2">
              <div className="flex items-start gap-3 p-4 rounded-[8px] bg-[#232323] border border-[#414141]">
                <div className="h-10 w-10 rounded-[8px] bg-[#161616] text-[#e50914] flex items-center justify-center shrink-0">
                  <Clock className="h-5 w-5" />
                </div>
                <div>
                  <h4 className="text-sm font-medium text-white">Rapid 48-Hour Delivery</h4>
                  <p className="text-xs text-[#808080] mt-0.5">Most workflows are designed, tested, and handed over in 2-3 business days.</p>
                </div>
              </div>

              <div className="flex items-start gap-3 p-4 rounded-[8px] bg-[#232323] border border-[#414141]">
                <div className="h-10 w-10 rounded-[8px] bg-[#161616] text-[#e50914] flex items-center justify-center shrink-0">
                  <ShieldCheck className="h-5 w-5" />
                </div>
                <div>
                  <h4 className="text-sm font-medium text-white">100% Ownership & Zero Lock-in</h4>
                  <p className="text-xs text-[#808080] mt-0.5">You own the n8n blueprints, scripts, and API credentials completely.</p>
                </div>
              </div>

              <div className="flex items-start gap-3 p-4 rounded-[8px] bg-[#232323] border border-[#414141]">
                <div className="h-10 w-10 rounded-[8px] bg-[#161616] text-[#e50914] flex items-center justify-center shrink-0">
                  <Zap className="h-5 w-5" />
                </div>
                <div>
                  <h4 className="text-sm font-medium text-white">Free 30-Day Support</h4>
                  <p className="text-xs text-[#808080] mt-0.5">We monitor node executions and refine parameters for 99.9% reliability.</p>
                </div>
              </div>
            </div>

            <div className="pt-2 p-5 rounded-[8px] border border-[#414141] bg-[#161616]">
              <p className="text-xs font-medium text-white mb-2">Prefer chatting directly?</p>
              <a href={waLink} target="_blank" rel="noopener noreferrer" className="block">
                <Button variant="secondary" className="w-full justify-center gap-2 text-xs bg-[#232323] hover:bg-[#2d2d2d] text-white">
                  <MessageSquare className="h-4 w-4 text-[#e50914]" />
                  Chat with Lead Automation Engineer
                </Button>
              </a>
            </div>
          </div>

          {/* Right Col: Interactive Request Form */}
          <div className="lg:col-span-7">
            <div className="rounded-[8px] border border-[#414141] bg-[#232323] p-6 sm:p-10">
              <h2 className="text-xl sm:text-2xl font-medium text-white mb-1">Project Brief</h2>
              <p className="text-xs text-[#808080] mb-6">
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
