import Link from "next/link";
import { 
  Play, 
  Sparkles, 
  Plus, 
  MessageSquare, 
  Search, 
  Zap, 
<<<<<<< HEAD
  ArrowRight, 
  Home, 
  Layers, 
  Rocket, 
  Bell, 
  Settings, 
  LogOut, 
  CheckCircle2,
  ChevronRight,
  Bot
=======
  Bot, 
  ShoppingCart, 
  Users, 
  Receipt, 
  ShieldCheck,
  Star,
  Sparkles,
  CheckCircle2,
  Heart
>>>>>>> 7ee9ca6f04322930ec29228c493ddb72ee250ce5
} from "lucide-react";
import { prisma } from "@/lib/prisma";
import { WorkflowCard } from "@/components/workflows/WorkflowCard";
import { Button } from "@/components/ui/button";
import { generateWhatsAppLink } from "@/lib/whatsapp";

export const dynamic = "force-dynamic";

export default async function HomePage() {
<<<<<<< HEAD
  const [workflows, categories] = await Promise.all([
=======
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
>>>>>>> 7ee9ca6f04322930ec29228c493ddb72ee250ce5
    prisma.workflow.findMany({
      where: { status: "PUBLISHED" },
      include: {
        category: true,
        platforms: { include: { platform: true } },
        steps: true,
      },
      orderBy: { createdAt: "desc" },
<<<<<<< HEAD
      take: 9,
=======
      take: 8,
>>>>>>> 7ee9ca6f04322930ec29228c493ddb72ee250ce5
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
<<<<<<< HEAD
    <div className="min-h-screen bg-background text-foreground transition-colors duration-300">
      <div className="max-w-[1500px] mx-auto px-4 sm:px-6 lg:px-10 py-8 space-y-10">
        
        {/* TOP HERO & AI HELPER ROW */}
        <div className="flex flex-col lg:flex-row items-start justify-between gap-8 pt-4 pb-2">
          {/* Left Title & Copy */}
          <div className="space-y-4 max-w-2xl">
            <div className="flex items-center gap-1.5 text-xs text-muted-foreground font-medium">
              <span>Workflow</span>
              <ChevronRight className="h-3 w-3" />
              <span className="text-foreground font-semibold">Support & Growth</span>
            </div>

            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-foreground leading-[1.1]">
              Automate Your <br />
              Support Workflows
            </h1>

            <p className="text-sm sm:text-base text-muted-foreground font-normal leading-relaxed">
              Streamline repetitive tasks and scale customer support with ease using smart, flexible, and fast workflows.
            </p>

            {/* Action Buttons */}
            <div className="flex items-center gap-4 pt-2">
              <a href={waLink} target="_blank" rel="noopener noreferrer">
                <Button
                  variant="default"
                  className="h-11 px-6 rounded-full bg-black text-white dark:bg-white dark:text-black font-semibold text-xs gap-2 shadow-sm hover:opacity-90"
                >
                  <Play className="h-3.5 w-3.5 fill-current" />
                  <span>Play Demo & Tour</span>
                </Button>
              </a>

              <Link href="/workflows" className="text-xs font-semibold text-foreground hover:underline px-3 py-2">
                Learn More
              </Link>
            </div>
          </div>

          {/* Right Floating AI Helper Box (Exact Reference Image Card) */}
          <div className="w-full lg:w-80 rounded-3xl bg-card border border-border p-6 space-y-3 shadow-md modern-saas-card shrink-0">
            <div className="flex items-center gap-2 text-xs font-bold text-foreground">
              <Sparkles className="h-4 w-4 text-[#ffd233]" />
              <span>Save time with AutoFlows AI</span>
            </div>
            <p className="text-xs text-muted-foreground leading-relaxed">
              AutoFlows AI automates node execution, error handling, and customer CRM sync.
            </p>
            <a href={waLink} target="_blank" rel="noopener noreferrer" className="block pt-1">
              <Button
                variant="default"
                size="sm"
                className="w-full h-9 rounded-full bg-black text-white dark:bg-[#ffd233] dark:text-black font-bold text-xs shadow-xs"
              >
                Let&apos;s Chat on WhatsApp
              </Button>
            </a>
          </div>
        </div>

        {/* WORKSPACE TABS & FILTER BAR (Exact Reference Image Controls) */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-6 pb-4 border-b border-border">
          {/* Left Tab */}
          <div className="flex items-center gap-2">
            <button className="px-5 py-2 rounded-full text-xs font-bold bg-card border border-border shadow-xs text-foreground">
              My Workspace
            </button>
            <Link href="/workflows" className="px-4 py-2 rounded-full text-xs font-semibold text-muted-foreground hover:text-foreground">
              Templates ({workflows.length})
            </Link>
          </div>

          {/* Right Filter Chips & Gold Action CTA */}
          <div className="flex items-center gap-3 flex-wrap">
            <div className="flex items-center rounded-full bg-muted/60 p-1 border border-border">
              <Link href="/workflows" className="px-4 py-1.5 rounded-full text-xs font-bold bg-card text-foreground shadow-xs">
                All
              </Link>
              <Link href="/workflows?status=published" className="px-3.5 py-1.5 rounded-full text-xs font-semibold text-muted-foreground hover:text-foreground">
                Published
              </Link>
              <Link href="/request" className="px-3.5 py-1.5 rounded-full text-xs font-semibold text-muted-foreground hover:text-foreground">
                Custom Brief
              </Link>
            </div>

            <Link href="/request">
              <Button
                variant="default"
                size="sm"
                className="h-10 px-5 rounded-full text-xs font-bold bg-[#ffd233] hover:bg-[#f5c71a] text-black shadow-xs gap-1.5"
              >
                <span>Create a Workflow</span>
                <Plus className="h-4 w-4" />
              </Button>
            </Link>
=======
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
>>>>>>> 7ee9ca6f04322930ec29228c493ddb72ee250ce5
          </div>
        </div>

<<<<<<< HEAD
        {/* 3-COLUMN WORKFLOW CARDS GRID (Exact Reference Image Cards) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pt-2">
          {workflows.map((workflow, idx) => (
            <WorkflowCard 
              key={workflow.id} 
              workflow={workflow} 
              illustrationIndex={idx}
            />
          ))}
=======
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
>>>>>>> 7ee9ca6f04322930ec29228c493ddb72ee250ce5
        </div>

        {/* BOTTOM ENTERPRISE ASSURANCE */}
        <div className="rounded-3xl bg-card border border-border p-8 sm:p-10 flex flex-col md:flex-row items-center justify-between gap-6 shadow-sm">
          <div className="space-y-2">
            <h3 className="text-xl font-bold text-foreground">Need a Tailored Multi-App Integration?</h3>
            <p className="text-xs text-muted-foreground max-w-xl">
              We connect Meta Lead Ads, WhatsApp Cloud API, OpenAI GPT-4o, Stripe, and Google Sheets into a unified automated pipeline with 48-hour turnkey installation.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <Link href="/request">
              <Button variant="outline" className="h-11 px-6 rounded-full text-xs font-bold border-border">
                Submit Brief
              </Button>
            </Link>
            <a href={waLink} target="_blank" rel="noopener noreferrer">
              <Button variant="default" className="h-11 px-6 rounded-full bg-[#ffd233] text-black font-bold text-xs shadow-xs">
                WhatsApp Engineer
              </Button>
            </a>
          </div>
        </div>

      </div>
    </div>
  );
}
