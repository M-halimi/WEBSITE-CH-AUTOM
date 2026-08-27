import Link from "next/link";
import {
  Zap,
  ArrowRight,
  Sparkles,
  MessageSquare,
  ShieldCheck,
  CheckCircle2,
  Clock,
  Bot,
  ShoppingCart,
  Users,
  Receipt,
  Share2,
  Layers,
  Flame,
  Search,
} from "lucide-react";
import { prisma } from "@/lib/prisma";
import { WorkflowCard } from "@/components/workflows/WorkflowCard";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { generateWhatsAppLink } from "@/lib/whatsapp";

// Category icon mapper helper
const getCategoryIcon = (iconName?: string | null) => {
  switch (iconName) {
    case "MessageSquare":
      return MessageSquare;
    case "ShoppingCart":
      return ShoppingCart;
    case "Users":
      return Users;
    case "Bot":
      return Bot;
    case "Receipt":
      return Receipt;
    case "Share2":
      return Share2;
    default:
      return Layers;
  }
};

export const revalidate = 60; // ISR cache revalidation

export default async function HomePage() {
  // Fetch featured workflows from Prisma
  const featuredWorkflows = await prisma.workflow.findMany({
    where: { status: "PUBLISHED" },
    include: {
      category: true,
      platforms: { include: { platform: true } },
      steps: true,
    },
    orderBy: [{ featured: "desc" }, { views: "desc" }],
    take: 6,
  });

  // Fetch categories with workflow counts
  const categories = await prisma.category.findMany({
    include: {
      _count: { select: { workflows: { where: { status: "PUBLISHED" } } } },
    },
    orderBy: { order: "asc" },
  });

  const waLink = generateWhatsAppLink({});

  return (
    <div className="flex flex-col gap-16 md:gap-24 pb-20 overflow-hidden">
      {/* 1. HERO SECTION */}
      <section className="relative pt-12 md:pt-20 lg:pt-28 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full text-center">
        {/* Background glow effects */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-emerald-500/10 dark:bg-emerald-500/15 blur-[120px] rounded-full pointer-events-none -z-10" />

        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20 mb-6 animate-in fade-in slide-in-from-bottom-2 duration-300">
          <Sparkles className="h-3.5 w-3.5 animate-pulse" />
          <span>The #1 Business Automation Marketplace</span>
        </div>

        <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight text-foreground max-w-4xl mx-auto leading-[1.1] mb-6">
          Automate Repetitive Work.{" "}
          <span className="bg-gradient-to-r from-emerald-500 via-teal-400 to-cyan-500 bg-clip-text text-transparent">
            Scale Without Limits.
          </span>
        </h1>

        <p className="text-base sm:text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-10 leading-relaxed">
          Discover, deploy, and customize battle-tested automation workflows for
          WhatsApp, E-Commerce, AI CRM, and Invoicing.
        </p>

        {/* Hero Search Bar */}
        <div className="max-w-2xl mx-auto mb-8">
          <form
            action="/workflows"
            method="GET"
            className="flex flex-col sm:flex-row items-center gap-2 p-2 rounded-2xl border border-border bg-card/80 backdrop-blur-md shadow-xl"
          >
            <div className="relative flex-1 w-full">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              <input
                type="text"
                name="q"
                placeholder="What do you want to automate? (e.g., WhatsApp lead qualifier, Shopify recovery...)"
                className="w-full h-12 pl-12 pr-4 rounded-xl bg-transparent text-sm focus:outline-none placeholder:text-muted-foreground"
              />
            </div>
            <Button
              type="submit"
              size="lg"
              className="w-full sm:w-auto h-12 px-6 rounded-xl font-semibold bg-primary text-primary-foreground hover:bg-primary/90 shadow-md shadow-primary/20 gap-2 text-sm"
            >
              <span>Find Flow</span>
              <ArrowRight className="h-4 w-4" />
            </Button>
          </form>
        </div>

        {/* Action Buttons & Badges */}
        <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4 mb-14">
          <Link href="/workflows">
            <Button
              variant="outline"
              size="lg"
              className="rounded-xl font-medium text-sm"
            >
              <Layers className="h-4 w-4 mr-2" />
              Explore 50+ Workflows
            </Button>
          </Link>
          <Link href="/request">
            <Button
              variant="default"
              size="lg"
              className="rounded-xl font-medium text-sm bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 shadow-md shadow-emerald-500/20"
            >
              <Sparkles className="h-4 w-4 mr-2" />
              Request Custom Build
            </Button>
          </Link>
          <a href={waLink} target="_blank" rel="noopener noreferrer">
            <Button
              variant="whatsapp"
              size="lg"
              className="rounded-xl font-medium text-sm"
            >
              <MessageSquare className="h-4 w-4 mr-2" />
              WhatsApp Direct
            </Button>
          </a>
        </div>

        {/* Integration Engines Logos */}
        <div className="pt-8 border-t border-border/50 max-w-4xl mx-auto">
          <p className="text-xs uppercase tracking-wider text-muted-foreground font-semibold mb-4">
            Pre-built & Compatible with your favorite tech stack
          </p>
          <div className="flex flex-wrap items-center justify-center gap-6 sm:gap-8 opacity-70 grayscale hover:grayscale-0 transition-all">
            <span className="text-xs font-bold px-3 py-1.5 rounded-lg border border-border bg-card">
              ⚡ n8n
            </span>
            <span className="text-xs font-bold px-3 py-1.5 rounded-lg border border-border bg-card">
              💬 WhatsApp Cloud
            </span>
            <span className="text-xs font-bold px-3 py-1.5 rounded-lg border border-border bg-card">
              🤖 OpenAI GPT-4o
            </span>
            <span className="text-xs font-bold px-3 py-1.5 rounded-lg border border-border bg-card">
              🛍️ Shopify
            </span>
            <span className="text-xs font-bold px-3 py-1.5 rounded-lg border border-border bg-card">
              📊 Google Sheets
            </span>
            <span className="text-xs font-bold px-3 py-1.5 rounded-lg border border-border bg-card">
              📄 Notion
            </span>
          </div>
        </div>
      </section>

      {/* 2. CATEGORIES GRID */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-primary uppercase tracking-wider mb-2">
              <Layers className="h-3.5 w-3.5" />
              Categories
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-foreground">
              Browse Workflows by Department
            </h2>
          </div>
          <Link
            href="/workflows"
            className="text-xs font-semibold text-primary hover:underline flex items-center gap-1"
          >
            View All Categories <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {categories.map((cat) => {
            const Icon = getCategoryIcon(cat.icon);
            return (
              <Link
                key={cat.id}
                href={`/workflows?category=${cat.slug}`}
                className="group relative rounded-2xl border border-border bg-card p-6 shadow-sm hover:shadow-lg hover:border-primary/40 hover:-translate-y-0.5 transition-all"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="h-12 w-12 rounded-xl bg-primary/10 text-primary flex items-center justify-center group-hover:scale-110 transition-transform">
                    <Icon className="h-6 w-6" />
                  </div>
                  <Badge variant="outline" className="text-xs bg-muted/40">
                    {cat._count.workflows} workflows
                  </Badge>
                </div>
                <h3 className="text-lg font-bold text-foreground group-hover:text-primary transition-colors mb-1.5">
                  {cat.name}
                </h3>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  {cat.description}
                </p>
              </Link>
            );
          })}
        </div>
      </section>

      {/* 3. FEATURED WORKFLOWS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-amber-500 uppercase tracking-wider mb-2">
              <Flame className="h-3.5 w-3.5 fill-current" />
              Handpicked Solutions
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-foreground">
              Featured Production-Ready Automations
            </h2>
          </div>
          <Link
            href="/workflows"
            className="text-xs font-semibold text-primary hover:underline flex items-center gap-1"
          >
            Explore All Workflows ({featuredWorkflows.length}+){" "}
            <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {featuredWorkflows.map((workflow) => (
            <WorkflowCard key={workflow.id} workflow={workflow} />
          ))}
        </div>
      </section>

      {/* 4. HOW IT WORKS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="rounded-3xl border border-border bg-gradient-to-b from-card to-card/50 p-8 sm:p-12 shadow-sm">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-foreground mb-3">
              How AutoFlows Hub Works
            </h2>
            <p className="text-sm text-muted-foreground">
              Go from manual tasks to a fully automated pipeline in three simple
              steps.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="relative p-6 rounded-2xl border border-border/60 bg-background/50 text-center">
              <div className="mx-auto h-12 w-12 rounded-xl bg-emerald-500/10 text-emerald-500 flex items-center justify-center font-bold text-lg mb-4">
                1
              </div>
              <h3 className="text-base font-bold text-foreground mb-2">
                Pick Your Workflow
              </h3>
              <p className="text-xs text-muted-foreground leading-relaxed">
                Choose from our library of verified n8n, Make, and WhatsApp
                templates designed for high conversion and speed.
              </p>
            </div>

            <div className="relative p-6 rounded-2xl border border-border/60 bg-background/50 text-center">
              <div className="mx-auto h-12 w-12 rounded-xl bg-teal-500/10 text-teal-500 flex items-center justify-center font-bold text-lg mb-4">
                2
              </div>
              <h3 className="text-base font-bold text-foreground mb-2">
                Customize & Connect
              </h3>
              <p className="text-xs text-muted-foreground leading-relaxed">
                Connect your API keys, CRM webhooks, and phone numbers. We
                assist you every step of the configuration.
              </p>
            </div>

            <div className="relative p-6 rounded-2xl border border-border/60 bg-background/50 text-center">
              <div className="mx-auto h-12 w-12 rounded-xl bg-cyan-500/10 text-cyan-500 flex items-center justify-center font-bold text-lg mb-4">
                3
              </div>
              <h3 className="text-base font-bold text-foreground mb-2">
                Deploy & Save Hours
              </h3>
              <p className="text-xs text-muted-foreground leading-relaxed">
                Turn on the trigger and watch leads get qualified, receipts
                sent, and data synced automatically 24/7.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 5. CTA CONVERSION BANNER */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-emerald-600 to-teal-700 text-white p-8 sm:p-12 md:p-16 shadow-2xl shadow-emerald-600/20">
          <div className="relative z-10 max-w-2xl">
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight mb-4">
              Need a Custom Workflow Tailored for Your Business?
            </h2>
            <p className="text-emerald-100 text-sm sm:text-base leading-relaxed mb-8">
              Whether you need complex AI triage, WhatsApp Cloud API webhooks,
              or custom ERP sync, our engineers will build it in 48 hours.
            </p>
            <div className="flex flex-wrap items-center gap-4">
              <Link href="/request">
                <Button
                  size="lg"
                  className="bg-white text-zinc-950 hover:bg-zinc-100 font-bold rounded-xl shadow-lg"
                >
                  Submit Custom Request
                </Button>
              </Link>
              <a href={waLink} target="_blank" rel="noopener noreferrer">
                <Button
                  variant="outline"
                  size="lg"
                  className="border-white/30 text-white hover:bg-white/10 rounded-xl"
                >
                  <MessageSquare className="h-4 w-4 mr-2" />
                  Discuss on WhatsApp
                </Button>
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
