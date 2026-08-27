import Link from "next/link";
import { 
  ArrowRight, 
  MessageSquare, 
  Zap, 
  Bot, 
  ShoppingCart, 
  Users, 
  Receipt, 
  Share2, 
  Layers,
  Sparkles,
  ShieldCheck,
  Clock,
  CheckCircle2,
  ChevronRight
} from "lucide-react";
import { prisma } from "@/lib/prisma";
import { WorkflowCard } from "@/components/workflows/WorkflowCard";
import { Button } from "@/components/ui/button";
import { FaqAccordion } from "@/components/home/FaqAccordion";
import { generateWhatsAppLink } from "@/lib/whatsapp";

export const dynamic = "force-dynamic";

export default async function HomePage() {
  // Fetch top workflows
  const workflows = await prisma.workflow.findMany({
    where: { status: "PUBLISHED" },
    include: {
      category: true,
      platforms: { include: { platform: true } },
      steps: true,
    },
    orderBy: [{ featured: "desc" }, { views: "desc" }],
    take: 6,
  });

  // Fetch categories
  const categories = await prisma.category.findMany({
    include: {
      _count: { select: { workflows: { where: { status: "PUBLISHED" } } } },
    },
    orderBy: { order: "asc" },
  });

  const waLink = generateWhatsAppLink({});

  return (
    <div className="flex flex-col bg-black text-white selection:bg-[#e50914] selection:text-white">
      {/* 1. HERO SECTION */}
      <section className="relative pt-20 pb-24 md:pt-28 md:pb-32 px-4 sm:px-8 lg:px-14 max-w-[1440px] mx-auto w-full text-center border-b-8 border-[#232323]">
        <div className="max-w-4xl mx-auto space-y-6">
          <h1 className="text-4xl sm:text-5xl md:text-[56px] md:leading-[70px] font-black tracking-tight text-white uppercase">
            Unlimited Automations, Workflows, and More
          </h1>

          <p className="text-lg sm:text-2xl font-medium text-white">
            Save 100+ hours every month. Scale your business without hiring.
          </p>

          <p className="text-sm sm:text-base font-normal text-[#808080]">
            Ready to automate? Search any workflow or get a custom blueprint today.
          </p>

          {/* Email / Search Capture Field with Red CTA Button */}
          <div className="max-w-2xl mx-auto pt-2">
            <form
              action="/workflows"
              method="GET"
              className="flex flex-col sm:flex-row items-stretch gap-2.5"
            >
              <input
                type="text"
                name="q"
                placeholder="What do you want to automate? (e.g. WhatsApp, Shopify, AI CRM...)"
                className="flex-1 h-14 rounded-[8px] border border-[#414141] bg-[#2d2d2d] px-5 text-sm sm:text-base text-white placeholder:text-[#808080] focus:outline-none focus:border-white transition-colors"
              />
              <Button
                type="submit"
                variant="cta"
                className="h-14 px-8 font-medium text-lg sm:text-xl rounded-[8px] bg-[#e50914] hover:bg-[#c11119] text-white flex items-center justify-center gap-2 shrink-0"
              >
                <span>Get Started</span>
                <ChevronRight className="h-6 w-6 stroke-[3]" />
              </Button>
            </form>
          </div>

          {/* Pre-built Engines Badges */}
          <div className="pt-8 flex flex-wrap items-center justify-center gap-3 text-xs text-[#808080]">
            <span className="px-3 py-1.5 rounded-[4px] bg-[#161616] border border-[#414141] text-white font-medium">⚡ n8n</span>
            <span className="px-3 py-1.5 rounded-[4px] bg-[#161616] border border-[#414141] text-white font-medium">💬 WhatsApp Cloud API</span>
            <span className="px-3 py-1.5 rounded-[4px] bg-[#161616] border border-[#414141] text-white font-medium">🤖 OpenAI GPT-4o</span>
            <span className="px-3 py-1.5 rounded-[4px] bg-[#161616] border border-[#414141] text-white font-medium">🛍️ Shopify</span>
            <span className="px-3 py-1.5 rounded-[4px] bg-[#161616] border border-[#414141] text-white font-medium">📊 Google Sheets</span>
          </div>
        </div>
      </section>

      {/* 2. SIGNATURE TRENDING POSTER RAIL WITH GRADIENT WASH & OUTLINE NUMERALS */}
      <section className="py-16 md:py-20 px-4 sm:px-8 lg:px-14 max-w-[1440px] mx-auto w-full border-b-8 border-[#232323]">
        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-2xl sm:text-3xl font-medium tracking-tight text-white">
            Trending Automations
          </h2>
          <Link
            href="/workflows"
            className="text-sm font-medium text-[#e50914] hover:underline flex items-center gap-1"
          >
            See all workflows <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        {/* Gradient Wash Container */}
        <div className="rounded-[8px] netflix-gradient-rail p-6 sm:p-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {workflows.slice(0, 6).map((workflow, idx) => (
              <div key={workflow.id} className="relative flex items-stretch">
                {/* Giant Outline-Stroked Rank Numeral (1, 2, 3, 4...) */}
                <div className="absolute -left-3 sm:-left-4 -bottom-4 z-10 select-none pointer-events-none stroke-numeral text-7xl sm:text-8xl md:text-9xl opacity-90">
                  {idx + 1}
                </div>

                {/* Workflow Poster Card */}
                <div className="w-full pl-8 sm:pl-10 relative z-20">
                  <WorkflowCard workflow={workflow} rank={idx + 1} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. MORE REASONS TO JOIN / 4 REASONS TO AUTOMATE */}
      <section className="py-16 md:py-20 px-4 sm:px-8 lg:px-14 max-w-[1440px] mx-auto w-full border-b-8 border-[#232323]">
        <h2 className="text-2xl sm:text-3xl font-medium tracking-tight text-white mb-6">
          More Reasons to Automate
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {/* Card 1 */}
          <div className="rounded-[8px] bg-[#232323] p-6 pb-16 relative flex flex-col justify-between hover:bg-[#2d2d2d] transition-colors">
            <div>
              <h3 className="text-xl font-medium text-white mb-3">
                Instant WhatsApp Speed
              </h3>
              <p className="text-sm text-[#808080] leading-relaxed">
                Connect official WhatsApp Cloud API to respond to leads and verify orders in under 3 seconds 24/7.
              </p>
            </div>
            <div className="pt-8 flex justify-end">
              <div className="h-12 w-12 rounded-[8px] bg-[#161616] flex items-center justify-center text-[#e50914]">
                <MessageSquare className="h-6 w-6" />
              </div>
            </div>
          </div>

          {/* Card 2 */}
          <div className="rounded-[8px] bg-[#232323] p-6 pb-16 relative flex flex-col justify-between hover:bg-[#2d2d2d] transition-colors">
            <div>
              <h3 className="text-xl font-medium text-white mb-3">
                AI Customer Agents
              </h3>
              <p className="text-sm text-[#808080] leading-relaxed">
                Empower your business with GPT-4o agents that answer FAQs, extract requirements, and qualify prospects.
              </p>
            </div>
            <div className="pt-8 flex justify-end">
              <div className="h-12 w-12 rounded-[8px] bg-[#161616] flex items-center justify-center text-[#e50914]">
                <Bot className="h-6 w-6" />
              </div>
            </div>
          </div>

          {/* Card 3 */}
          <div className="rounded-[8px] bg-[#232323] p-6 pb-16 relative flex flex-col justify-between hover:bg-[#2d2d2d] transition-colors">
            <div>
              <h3 className="text-xl font-medium text-white mb-3">
                Direct CRM & Invoicing
              </h3>
              <p className="text-sm text-[#808080] leading-relaxed">
                Automatically sync Meta Ads to Google Sheets, Notion, or HubSpot, and dispatch branded PDF invoices.
              </p>
            </div>
            <div className="pt-8 flex justify-end">
              <div className="h-12 w-12 rounded-[8px] bg-[#161616] flex items-center justify-center text-[#e50914]">
                <Receipt className="h-6 w-6" />
              </div>
            </div>
          </div>

          {/* Card 4 */}
          <div className="rounded-[8px] bg-[#232323] p-6 pb-16 relative flex flex-col justify-between hover:bg-[#2d2d2d] transition-colors">
            <div>
              <h3 className="text-xl font-medium text-white mb-3">
                Zero Lock-In Ownership
              </h3>
              <p className="text-sm text-[#808080] leading-relaxed">
                You own 100% of the n8n blueprints and credentials. No recurring platform lock-in fees.
              </p>
            </div>
            <div className="pt-8 flex justify-end">
              <div className="h-12 w-12 rounded-[8px] bg-[#161616] flex items-center justify-center text-[#e50914]">
                <ShieldCheck className="h-6 w-6" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. FREQUENTLY ASKED QUESTIONS (ACCORDION) */}
      <section className="py-16 md:py-20 px-4 sm:px-8 lg:px-14 max-w-[1440px] mx-auto w-full border-b-8 border-[#232323]">
        <h2 className="text-2xl sm:text-4xl font-black text-center tracking-tight text-white mb-10">
          Frequently Asked Questions
        </h2>

        <FaqAccordion />

        {/* Bottom Call to Action */}
        <div className="mt-12 text-center max-w-2xl mx-auto space-y-4">
          <p className="text-sm sm:text-base text-white">
            Ready to scale? Enter your automation requirement or contact us directly on WhatsApp:
          </p>

          <form
            action="/workflows"
            method="GET"
            className="flex flex-col sm:flex-row items-stretch gap-2.5 pt-2"
          >
            <input
              type="text"
              name="q"
              placeholder="Search automations or templates..."
              className="flex-1 h-14 rounded-[8px] border border-[#414141] bg-[#2d2d2d] px-5 text-sm sm:text-base text-white placeholder:text-[#808080] focus:outline-none focus:border-white transition-colors"
            />
            <Button
              type="submit"
              variant="cta"
              className="h-14 px-8 font-medium text-lg sm:text-xl rounded-[8px] bg-[#e50914] hover:bg-[#c11119] text-white flex items-center justify-center gap-2 shrink-0"
            >
              <span>Get Started</span>
              <ChevronRight className="h-6 w-6 stroke-[3]" />
            </Button>
          </form>
        </div>
      </section>
    </div>
  );
}
