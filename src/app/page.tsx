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

export const dynamic = "force-dynamic";

export default async function HomePage() {
  const [workflows, categories] = await Promise.all([
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
  ]);

  const waLink = generateWhatsAppLink({});

  return (
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
          </div>
        </div>

        {/* 3-COLUMN WORKFLOW CARDS GRID (Exact Reference Image Cards) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pt-2">
          {workflows.map((workflow, idx) => (
            <WorkflowCard 
              key={workflow.id} 
              workflow={workflow} 
              illustrationIndex={idx}
            />
          ))}
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
