import Link from "next/link";
import { 
  Play, 
  Sparkles, 
  Plus, 
  MessageSquare, 
  Search, 
  Zap, 
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
} from "lucide-react";
import { prisma } from "@/lib/prisma";
import { WorkflowCard } from "@/components/workflows/WorkflowCard";
import { Button } from "@/components/ui/button";
import { generateWhatsAppLink } from "@/lib/whatsapp";
import { getSiteSettings } from "@/lib/settings";

export const dynamic = "force-dynamic";

export default async function HomePage() {
  const [workflows, categories, settings] = await Promise.all([
    prisma.workflow.findMany({
      where: { status: "PUBLISHED" },
      include: {
        category: true,
        platforms: { include: { platform: true } },
        steps: true,
      },
      orderBy: { createdAt: "desc" },
      take: 9,
    }),
    prisma.category.findMany({
      include: {
        _count: { select: { workflows: { where: { status: "PUBLISHED" } } } },
      },
      orderBy: { order: "asc" },
    }),
    getSiteSettings(),
  ]);

  const waLink = generateWhatsAppLink({ whatsappNumber: settings.whatsappNumber });

  return (
    <div className="min-h-screen bg-background text-foreground transition-colors duration-300">
      <div className="max-w-[1500px] mx-auto px-4 sm:px-6 lg:px-10 py-8 space-y-10">
        
        {/* TOP HERO & AI HELPER ROW (Dynamic from Admin Settings) */}
        <div className="flex flex-col lg:flex-row items-start justify-between gap-8 pt-4 pb-2">
          {/* Left Title & Copy */}
          <div className="space-y-4 max-w-2xl">
            <div className="flex items-center gap-1.5 text-xs text-muted-foreground font-medium">
              <span>Workflow</span>
              <ChevronRight className="h-3 w-3" />
              <span className="text-foreground font-semibold">{settings.heroBadge}</span>
            </div>

            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-foreground leading-[1.1]">
              {settings.heroTitle}
            </h1>

            <p className="text-sm sm:text-base text-muted-foreground font-normal leading-relaxed">
              {settings.heroSubtitle}
            </p>

            {/* Action Buttons */}
            <div className="flex items-center gap-3 pt-2 flex-wrap">
              <Link
                href="/pricing"
                className="h-11 px-6 rounded-full inline-flex items-center justify-center bg-[#ffd233] text-black font-extrabold text-xs gap-2 shadow-sm hover:bg-[#f5c71a] transition-all"
              >
                <Zap className="h-3.5 w-3.5 fill-current" />
                <span>View Subscription Plans</span>
              </Link>

              <Link
                href="/dashboard/workflows/new"
                className="h-11 px-6 rounded-full inline-flex items-center justify-center bg-black text-white dark:bg-white dark:text-black font-semibold text-xs gap-2 shadow-sm hover:opacity-90 transition-all"
              >
                <Sparkles className="h-3.5 w-3.5" />
                <span>+ Request Workflow</span>
              </Link>

              <Link href="/workflows" className="text-xs font-semibold text-foreground hover:underline px-2 py-2">
                Explore Catalog
              </Link>
            </div>
          </div>

          {/* Right Floating AI Helper Box */}
          <div className="w-full lg:w-80 rounded-3xl bg-card border border-border p-6 space-y-3 shadow-md modern-saas-card shrink-0">
            <div className="flex items-center gap-2 text-xs font-bold text-foreground">
              <Sparkles className="h-4 w-4 text-[#ffd233]" />
              <span>Save time with {settings.siteName} AI</span>
            </div>
            <p className="text-xs text-muted-foreground leading-relaxed">
              AutoFlows AI automates node execution, error handling, and customer CRM sync.
            </p>
            <a
              href={waLink}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full h-9 rounded-full inline-flex items-center justify-center bg-black text-white dark:bg-[#ffd233] dark:text-black font-bold text-xs shadow-xs hover:opacity-90 transition-all"
            >
              Let&apos;s Chat on WhatsApp
            </a>
          </div>
        </div>

        {/* WORKSPACE TABS & FILTER BAR */}
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

            <Link
              href="/request"
              className="h-10 px-5 rounded-full inline-flex items-center justify-center text-xs font-bold bg-[#ffd233] hover:bg-[#f5c71a] text-black shadow-xs gap-1.5 transition-all"
            >
              <span>Create a Workflow</span>
              <Plus className="h-4 w-4" />
            </Link>
          </div>
        </div>

        {/* 3-COLUMN WORKFLOW CARDS GRID */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pt-2">
          {workflows.map((workflow, idx) => (
            <WorkflowCard 
              key={workflow.id} 
              workflow={workflow} 
              illustrationIndex={idx}
            />
          ))}
        </div>

        {/* BOTTOM ENTERPRISE ASSURANCE (Dynamic from Admin Settings) */}
        <div className="rounded-3xl bg-card border border-border p-8 sm:p-10 flex flex-col md:flex-row items-center justify-between gap-6 shadow-sm">
          <div className="space-y-2">
            <h3 className="text-xl font-bold text-foreground">{settings.ctaTitle}</h3>
            <p className="text-xs text-muted-foreground max-w-xl">
              {settings.ctaDescription}
            </p>
          </div>

          <div className="flex items-center gap-3">
            <Link
              href="/request"
              className="h-11 px-6 rounded-full inline-flex items-center justify-center text-xs font-bold border border-border bg-card hover:bg-muted text-foreground transition-all"
            >
              {settings.ctaButtonText}
            </Link>
            <a
              href={waLink}
              target="_blank"
              rel="noopener noreferrer"
              className="h-11 px-6 rounded-full inline-flex items-center justify-center bg-[#ffd233] text-black font-bold text-xs shadow-xs hover:bg-[#f5c71a] transition-all"
            >
              {settings.ctaSecondaryText}
            </a>
          </div>
        </div>

      </div>
    </div>
  );
}
