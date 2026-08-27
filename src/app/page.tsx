import Link from "next/link";
import { 
  ArrowRight, 
  MessageSquare, 
  Zap, 
  Bot, 
  ShoppingCart, 
  Users, 
  Receipt, 
  ShieldCheck,
  Star,
  Sparkles,
  CheckCircle2,
  Heart
} from "lucide-react";
import { prisma } from "@/lib/prisma";
import { WorkflowCard } from "@/components/workflows/WorkflowCard";
import { Button } from "@/components/ui/button";
import { generateWhatsAppLink } from "@/lib/whatsapp";

export const dynamic = "force-dynamic";

export default async function HomePage() {
  // Fetch workflows
  const [featuredWorkflows, allWorkflows, categories] = await Promise.all([
    prisma.workflow.findMany({
      where: { status: "PUBLISHED", featured: true },
      include: {
        category: true,
        platforms: { include: { platform: true } },
        steps: true,
      },
      take: 4,
    }),
    prisma.workflow.findMany({
      where: { status: "PUBLISHED" },
      include: {
        category: true,
        platforms: { include: { platform: true } },
        steps: true,
      },
      orderBy: { createdAt: "desc" },
      take: 8,
    }),
    prisma.category.findMany({
      include: {
        _count: { select: { workflows: { where: { status: "PUBLISHED" } } } },
      },
      orderBy: { order: "asc" },
    }),
  ]);

  const waLink = generateWhatsAppLink({});

  return (
    <div className="bg-white text-[#222222] min-h-screen">
      {/* 1. HERO SECTION */}
      <section className="bg-gradient-to-b from-[#fdf6e8]/70 via-white to-white py-12 md:py-16 border-b border-[#e6e6e6]">
        <div className="max-w-[1340px] mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
          <h1 className="text-3xl sm:text-4xl md:text-[36px] md:leading-tight font-semibold tracking-tight text-[#222222] max-w-3xl mx-auto">
            Find verified automation blueprints for your business
          </h1>

          <p className="text-sm sm:text-base text-[#595959] max-w-2xl mx-auto">
            Save 100+ hours every month. Deploy production-ready WhatsApp, AI customer agents, Shopify, and CRM automations in minutes.
          </p>

          {/* Quick Category Chips */}
          <div className="flex flex-wrap items-center justify-center gap-2 pt-2 max-w-3xl mx-auto">
            {categories.map((cat) => (
              <Link key={cat.id} href={`/workflows?category=${cat.slug}`}>
                <span className="inline-flex items-center px-4 py-2 rounded-full text-xs font-medium bg-white hover:bg-[#f6f6f6] text-[#222222] border border-[#d6d6d6] shadow-sm transition-all">
                  {cat.name}
                  <span className="ml-1.5 text-[11px] text-[#757575]">({cat._count.workflows})</span>
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* 2. BESTSELLERS / FEATURED GRID */}
      <section className="py-12 max-w-[1340px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-xl sm:text-2xl font-semibold text-[#222222]">
              Popular & Bestselling Automations
            </h2>
            <p className="text-xs sm:text-sm text-[#595959]">
              Verified blueprints tested and loved by businesses.
            </p>
          </div>
          <Link
            href="/workflows"
            className="text-xs sm:text-sm font-semibold text-[#f1641e] hover:underline flex items-center gap-1"
          >
            Explore all <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {featuredWorkflows.map((workflow) => (
            <WorkflowCard key={workflow.id} workflow={workflow} />
          ))}
        </div>
      </section>

      {/* 3. WARM CREAM SELLER RIBBON (Custom Bespoke Request) */}
      <section className="max-w-[1340px] mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="rounded-[12px] bg-[#fdf6e8] border border-[#f5e8c8] p-6 sm:p-10 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-2 max-w-2xl">
            <span className="inline-flex items-center px-2.5 py-0.5 rounded-[4px] text-xs font-semibold bg-[#f5e8c8] text-[#a66523]">
              Bespoke Engineering
            </span>
            <h3 className="text-xl sm:text-2xl font-semibold text-[#a66523]">
              Need a custom workflow tailored specifically for your store or agency?
            </h3>
            <p className="text-xs sm:text-sm text-[#595959] leading-relaxed">
              Our engineering team builds custom n8n nodes, connects your private CRM or ERP, and delivers a turnkey system within 48–72 hours with 100% workflow code ownership.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-3 shrink-0">
            <Link href="/request">
              <Button
                variant="default"
                size="lg"
                className="rounded-full font-semibold text-sm px-6 bg-[#f1641e] hover:bg-[#d44e0d] text-white shadow-sm"
              >
                Request Custom Workflow
              </Button>
            </Link>
            <a href={waLink} target="_blank" rel="noopener noreferrer">
              <Button
                variant="secondary"
                size="lg"
                className="rounded-full font-medium text-sm px-6 bg-white hover:bg-[#f6f6f6] text-[#222222] border border-[#bdbdbd]"
              >
                <MessageSquare className="h-4 w-4 mr-1.5 text-[#f1641e]" />
                WhatsApp Chat
              </Button>
            </a>
          </div>
        </div>
      </section>

      {/* 4. ALL CATALOG GRID */}
      <section className="py-12 max-w-[1340px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-xl sm:text-2xl font-semibold text-[#222222]">
              Explore All Blueprints
            </h2>
            <p className="text-xs sm:text-sm text-[#595959]">
              Instant downloadable workflows for n8n, Make.com, WhatsApp Cloud API & OpenAI.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {allWorkflows.map((workflow) => (
            <WorkflowCard key={workflow.id} workflow={workflow} />
          ))}
        </div>
      </section>

      {/* 5. WHY BUSINESSES CHOOSE AUTOFLOWS */}
      <section className="py-14 bg-[#fdf6e8]/40 border-t border-[#e6e6e6]">
        <div className="max-w-[1340px] mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl font-semibold text-[#222222] mb-10">
            Why Businesses Choose AutoFlows Hub
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 text-left">
            <div className="bg-white p-6 rounded-[8px] border border-[#e6e6e6] space-y-2.5">
              <div className="h-10 w-10 rounded-full bg-[#fdf6e8] text-[#f1641e] flex items-center justify-center">
                <Zap className="h-5 w-5" />
              </div>
              <h4 className="font-semibold text-sm text-[#222222]">Sub-Second Speed</h4>
              <p className="text-xs text-[#595959] leading-relaxed">
                Connect official WhatsApp Cloud API to confirm orders and respond to leads in under 3 seconds.
              </p>
            </div>

            <div className="bg-white p-6 rounded-[8px] border border-[#e6e6e6] space-y-2.5">
              <div className="h-10 w-10 rounded-full bg-[#fdf6e8] text-[#f1641e] flex items-center justify-center">
                <ShieldCheck className="h-5 w-5" />
              </div>
              <h4 className="font-semibold text-sm text-[#222222]">100% Code Ownership</h4>
              <p className="text-xs text-[#595959] leading-relaxed">
                You own your workflows, scripts, and API tokens. No monthly lock-in SaaS subscription markups.
              </p>
            </div>

            <div className="bg-white p-6 rounded-[8px] border border-[#e6e6e6] space-y-2.5">
              <div className="h-10 w-10 rounded-full bg-[#fdf6e8] text-[#f1641e] flex items-center justify-center">
                <Bot className="h-5 w-5" />
              </div>
              <h4 className="font-semibold text-sm text-[#222222]">GPT-4o Smart Agents</h4>
              <p className="text-xs text-[#595959] leading-relaxed">
                Intelligent AI logic answers FAQs, collects customer data, and updates your CRM automatically.
              </p>
            </div>

            <div className="bg-white p-6 rounded-[8px] border border-[#e6e6e6] space-y-2.5">
              <div className="h-10 w-10 rounded-full bg-[#fdf6e8] text-[#f1641e] flex items-center justify-center">
                <Sparkles className="h-5 w-5" />
              </div>
              <h4 className="font-semibold text-sm text-[#222222]">Turnkey Deployment</h4>
              <p className="text-xs text-[#595959] leading-relaxed">
                Our team can handle full installation and testing directly on your servers within 48 hours.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
