import { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { 
  Clock, 
  Eye, 
  CheckCircle2, 
  ChevronRight, 
  Zap, 
  Sparkles, 
<<<<<<< HEAD
  ShieldCheck, 
  Cpu, 
  ShoppingBag 
=======
  ShieldCheck,
  Star,
  Cpu,
  Heart
>>>>>>> 7ee9ca6f04322930ec29228c493ddb72ee250ce5
} from "lucide-react";
import { prisma } from "@/lib/prisma";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { WorkflowViewer } from "@/components/workflows/WorkflowViewer";
import { WorkflowDetailActions } from "@/components/workflows/WorkflowDetailActions";
import { WorkflowCard } from "@/components/workflows/WorkflowCard";

export const dynamic = "force-dynamic";

interface WorkflowDetailPageProps {
  params: {
    slug: string;
  };
}

export async function generateMetadata({ params }: WorkflowDetailPageProps): Promise<Metadata> {
  const workflow = await prisma.workflow.findUnique({
    where: { slug: params.slug },
    include: { category: true },
  });

  if (!workflow) {
    return { title: "Blueprint Not Found — AutoFlows Hub" };
  }

  return {
    title: `${workflow.title} — Automation Blueprint | AutoFlows Hub`,
    description: workflow.summary,
    openGraph: {
      title: workflow.title,
      description: workflow.summary,
    },
  };
}

export default async function WorkflowDetailPage({ params }: WorkflowDetailPageProps) {
  const workflow = await prisma.workflow.findUnique({
    where: { slug: params.slug },
    include: {
      category: true,
      platforms: { include: { platform: true } },
      tags: { include: { tag: true } },
      steps: { orderBy: { order: "asc" } },
    },
  });

  if (!workflow) {
    notFound();
  }

  // Fetch related workflows
  const relatedWorkflows = await prisma.workflow.findMany({
    where: {
      categoryId: workflow.categoryId,
      id: { not: workflow.id },
      status: "PUBLISHED",
    },
    include: {
      category: true,
      platforms: { include: { platform: true } },
      steps: true,
    },
    take: 4,
  });

  let requirementsList: string[] = [];
  if (workflow.requirements) {
    try {
      requirementsList = JSON.parse(workflow.requirements);
    } catch {
      requirementsList = [workflow.requirements];
    }
  }

  return (
<<<<<<< HEAD
    <div className="bg-background text-foreground min-h-screen transition-colors duration-300">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-10 py-8 sm:py-12 space-y-10">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-xs text-muted-foreground flex-wrap">
          <Link href="/" className="hover:text-foreground transition-colors">Home</Link>
          <ChevronRight className="h-3 w-3 opacity-60" />
          <Link href="/workflows" className="hover:text-foreground transition-colors">Blueprints</Link>
          {workflow.category && (
            <>
              <ChevronRight className="h-3 w-3 opacity-60" />
              <Link href={`/workflows?category=${workflow.category.slug}`} className="hover:text-amber-600 dark:hover:text-[#ffd233] transition-colors font-medium">
=======
    <div className="bg-white text-[#222222] min-h-screen">
      <div className="max-w-[1340px] mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-10 space-y-8">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-1.5 text-xs text-[#595959] flex-wrap">
          <Link href="/" className="hover:text-[#f1641e] hover:underline">Home</Link>
          <ChevronRight className="h-3 w-3 opacity-60" />
          <Link href="/workflows" className="hover:text-[#f1641e] hover:underline">Workflows</Link>
          {workflow.category && (
            <>
              <ChevronRight className="h-3 w-3 opacity-60" />
              <Link href={`/workflows?category=${workflow.category.slug}`} className="hover:text-[#f1641e] hover:underline">
>>>>>>> 7ee9ca6f04322930ec29228c493ddb72ee250ce5
                {workflow.category.name}
              </Link>
            </>
          )}
          <ChevronRight className="h-3 w-3 opacity-60" />
<<<<<<< HEAD
          <span className="text-foreground font-semibold truncate max-w-xs">{workflow.title}</span>
        </nav>

        {/* 2-Column Listing Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          {/* Left Column (8 cols): Details & Step Pipeline */}
          <div className="lg:col-span-8 space-y-10">
            {/* Header Meta */}
            <div className="space-y-4 pb-8 border-b border-border">
              <div className="flex items-center gap-2 flex-wrap">
                {workflow.category && (
                  <Badge variant="default" className="text-xs bg-[#ffd233] text-black font-bold">
=======
          <span className="text-[#222222] font-medium truncate max-w-xs">{workflow.title}</span>
        </nav>

        {/* Main Listing Layout: Left Details + Right Buy Box */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          {/* Left Column (8 cols): Title, Pipeline Viewer, Details */}
          <div className="lg:col-span-8 space-y-8">
            {/* Header Meta */}
            <div className="space-y-3 pb-6 border-b border-[#e6e6e6]">
              <div className="flex items-center gap-2 flex-wrap">
                {workflow.category && (
                  <span className="text-xs font-semibold text-[#f1641e] hover:underline">
>>>>>>> 7ee9ca6f04322930ec29228c493ddb72ee250ce5
                    {workflow.category.name}
                  </Badge>
                )}
<<<<<<< HEAD
                {workflow.featured && (
                  <Badge variant="outline" className="text-xs font-semibold">
                    Featured Blueprint
                  </Badge>
                )}
                <span className="text-xs text-muted-foreground font-medium">
                  • {workflow.views} views • {workflow.estimatedTime} setup
                </span>
              </div>

              <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-foreground leading-tight">
                {workflow.title}
              </h1>

              <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
=======
                <span className="text-[#d6d6d6]">•</span>
                <div className="flex text-[#f1641e]">
                  {"★★★★★".split("").map((s, i) => (
                    <span key={i} className="text-xs">{s}</span>
                  ))}
                </div>
                <span className="text-xs text-[#595959] font-medium">(5.0 Rating • {workflow.views} views)</span>
                {workflow.featured && (
                  <span className="px-2 py-0.5 rounded-[4px] bg-[#f5e8c8] text-[#a66523] text-[11px] font-semibold">
                    Bestseller
                  </span>
                )}
              </div>

              <h1 className="text-2xl sm:text-3xl md:text-4xl font-semibold tracking-tight text-[#222222]">
                {workflow.title}
              </h1>

              <p className="text-sm sm:text-base text-[#595959] leading-relaxed">
>>>>>>> 7ee9ca6f04322930ec29228c493ddb72ee250ce5
                {workflow.summary}
              </p>

              {/* Compatible Platforms */}
              {workflow.platforms.length > 0 && (
<<<<<<< HEAD
                <div className="flex items-center gap-2 flex-wrap pt-2">
                  <span className="text-xs font-semibold text-muted-foreground">Engines:</span>
                  {workflow.platforms.map(({ platform }) => (
                    <span
                      key={platform.id}
                      className="px-3 py-1 rounded-full bg-card border border-border text-xs font-semibold text-foreground shadow-xs"
=======
                <div className="flex items-center gap-1.5 flex-wrap pt-1">
                  <span className="text-xs font-semibold text-[#222222]">Platforms:</span>
                  {workflow.platforms.map(({ platform }) => (
                    <span
                      key={platform.id}
                      className="px-2.5 py-1 rounded-full bg-[#f6f6f6] border border-[#d6d6d6] text-xs font-medium text-[#222222]"
>>>>>>> 7ee9ca6f04322930ec29228c493ddb72ee250ce5
                    >
                      {platform.name}
                    </span>
                  ))}
                </div>
              )}
            </div>

            {/* Visual Step-by-Step Pipeline */}
<<<<<<< HEAD
            <section className="space-y-6">
              <div className="flex items-center justify-between">
                <h2 className="text-xl sm:text-2xl font-bold text-foreground flex items-center gap-2.5">
                  <Zap className="h-5 w-5 text-amber-500 fill-current" />
                  Visual Execution Pipeline
                </h2>
                <span className="text-xs font-bold px-3 py-1 rounded-full bg-card border border-border text-foreground shadow-xs">
=======
            <section className="space-y-4">
              <div className="flex items-center justify-between">
                <h2 className="text-lg sm:text-xl font-semibold text-[#222222] flex items-center gap-2">
                  <Zap className="h-5 w-5 text-[#f1641e]" />
                  Step-by-Step Visual Pipeline
                </h2>
                <span className="text-xs font-semibold px-3 py-1 rounded-full bg-[#f6f6f6] border border-[#d6d6d6] text-[#222222]">
>>>>>>> 7ee9ca6f04322930ec29228c493ddb72ee250ce5
                  {workflow.steps.length} Executed Nodes
                </span>
              </div>

              <div className="pt-2">
                <WorkflowViewer steps={workflow.steps} workflowTitle={workflow.title} />
              </div>
            </section>

            {/* Detailed Description */}
<<<<<<< HEAD
            <section className="rounded-3xl border border-border bg-card p-6 sm:p-8 space-y-4 shadow-sm">
              <h2 className="text-lg font-bold text-foreground flex items-center gap-2">
                <Sparkles className="h-4 w-4 text-amber-500" />
                Automation Specifications & Logic
              </h2>
              <div className="prose max-w-none text-xs sm:text-sm text-muted-foreground whitespace-pre-line leading-relaxed">
=======
            <section className="rounded-[8px] border border-[#d6d6d6] bg-white p-6 sm:p-8 space-y-3 shadow-sm">
              <h2 className="text-base sm:text-lg font-semibold text-[#222222] flex items-center gap-2">
                <Sparkles className="h-4 w-4 text-[#f1641e]" />
                Item Details & Automation Logic
              </h2>
              <div className="prose max-w-none text-xs sm:text-sm text-[#3f3f3f] whitespace-pre-line leading-relaxed">
>>>>>>> 7ee9ca6f04322930ec29228c493ddb72ee250ce5
                {workflow.description}
              </div>
            </section>
          </div>

<<<<<<< HEAD
          {/* Right Column (4 cols): Sticky Order Box */}
          <div className="lg:col-span-4 lg:sticky lg:top-24 space-y-6">
            <div className="rounded-3xl border border-border bg-card p-6 shadow-sm space-y-6">
              {/* Price & Delivery */}
              <div>
                <div className="flex items-baseline justify-between">
                  <span className="text-3xl font-extrabold text-foreground">
                    {workflow.price || "Free Blueprint"}
                  </span>
                  <span className="text-xs text-emerald-600 dark:text-emerald-400 font-bold flex items-center gap-1">
                    <CheckCircle2 className="h-4 w-4" /> Instant Turnkey
                  </span>
                </div>
                <p className="text-xs text-muted-foreground mt-1.5">
                  Complete n8n JSON blueprint with verified webhook nodes.
=======
          {/* Right Column (4 cols): Sticky Buy & Order Box */}
          <div className="lg:col-span-4 lg:sticky lg:top-24 space-y-5">
            <div className="rounded-[8px] border border-[#d6d6d6] bg-white p-6 shadow-sm space-y-5">
              {/* Price & Delivery Status */}
              <div>
                <div className="flex items-baseline justify-between">
                  <span className="text-2xl sm:text-3xl font-semibold text-[#222222]">
                    {workflow.price || "Free Template"}
                  </span>
                  <span className="text-xs text-[#258635] font-semibold flex items-center gap-1">
                    <CheckCircle2 className="h-3.5 w-3.5" /> Instant Download
                  </span>
                </div>
                <p className="text-xs text-[#595959] mt-1">
                  Ready-to-import n8n / Make JSON workflow blueprint file.
>>>>>>> 7ee9ca6f04322930ec29228c493ddb72ee250ce5
                </p>
              </div>

              {/* Action Buttons */}
              <WorkflowDetailActions workflow={workflow} />

              {/* Guarantee Points */}
<<<<<<< HEAD
              <div className="pt-6 border-t border-border space-y-3 text-xs text-muted-foreground">
                <div className="flex items-start gap-2.5">
                  <ShieldCheck className="h-4 w-4 text-amber-600 dark:text-[#ffd233] shrink-0 mt-0.5" />
                  <span><strong>100% Code Ownership:</strong> Self-host forever with no recurring subscription markups.</span>
                </div>
                <div className="flex items-start gap-2.5">
                  <Clock className="h-4 w-4 text-amber-600 dark:text-[#ffd233] shrink-0 mt-0.5" />
                  <span><strong>Turnkey Installation:</strong> Option to have our engineers set it up on your servers in 48 hours.</span>
=======
              <div className="pt-4 border-t border-[#e6e6e6] space-y-2.5 text-xs text-[#595959]">
                <div className="flex items-start gap-2">
                  <ShieldCheck className="h-4 w-4 text-[#258635] shrink-0 mt-0.5" />
                  <span><strong>100% Code Ownership:</strong> Import once, run forever on your own server.</span>
                </div>
                <div className="flex items-start gap-2">
                  <Clock className="h-4 w-4 text-[#f1641e] shrink-0 mt-0.5" />
                  <span><strong>Turnkey Option:</strong> Request our team to install and configure everything for you.</span>
>>>>>>> 7ee9ca6f04322930ec29228c493ddb72ee250ce5
                </div>
              </div>
            </div>

<<<<<<< HEAD
            {/* Triggers & Outcomes */}
            <div className="rounded-3xl border border-border bg-card p-6 space-y-4 shadow-sm">
              <h3 className="text-xs font-bold uppercase tracking-wider text-foreground flex items-center gap-1.5">
                <Cpu className="h-4 w-4 text-amber-500" /> Trigger & Expected Output
              </h3>
              {workflow.triggersDescription && (
                <div className="text-xs text-muted-foreground">
                  <strong className="text-foreground block mb-1">When Triggered:</strong>
=======
            {/* Triggers & Outcome Box */}
            <div className="rounded-[8px] border border-[#d6d6d6] bg-[#fdf6e8]/40 p-5 space-y-3">
              <h3 className="text-xs font-semibold uppercase tracking-wider text-[#a66523] flex items-center gap-1.5">
                <Cpu className="h-4 w-4" /> Trigger & Outcome
              </h3>
              {workflow.triggersDescription && (
                <div className="text-xs text-[#595959]">
                  <strong className="text-[#222222] block mb-0.5">When Triggered:</strong>
>>>>>>> 7ee9ca6f04322930ec29228c493ddb72ee250ce5
                  {workflow.triggersDescription}
                </div>
              )}
              {workflow.outcomesDescription && (
<<<<<<< HEAD
                <div className="text-xs text-muted-foreground pt-3 border-t border-border">
                  <strong className="text-foreground block mb-1">Expected Output:</strong>
=======
                <div className="text-xs text-[#595959] pt-2 border-t border-[#f5e8c8]">
                  <strong className="text-[#222222] block mb-0.5">Expected Output:</strong>
>>>>>>> 7ee9ca6f04322930ec29228c493ddb72ee250ce5
                  {workflow.outcomesDescription}
                </div>
              )}
            </div>

<<<<<<< HEAD
            {/* Required Accounts */}
            {requirementsList.length > 0 && (
              <div className="rounded-3xl border border-border bg-card p-6 space-y-3 shadow-xs">
                <h3 className="text-xs font-bold uppercase tracking-wider text-foreground">
                  Required Accounts & APIs
                </h3>
                <ul className="space-y-2 text-xs text-muted-foreground">
                  {requirementsList.map((req, idx) => (
                    <li key={idx} className="flex items-center gap-2">
                      <span className="h-1.5 w-1.5 rounded-full bg-[#ffd233]" />
=======
            {/* Required APIs */}
            {requirementsList.length > 0 && (
              <div className="rounded-[8px] border border-[#d6d6d6] bg-white p-5 space-y-3 shadow-sm">
                <h3 className="text-xs font-semibold uppercase tracking-wider text-[#222222]">
                  Required Accounts
                </h3>
                <ul className="space-y-1.5 text-xs text-[#595959]">
                  {requirementsList.map((req, idx) => (
                    <li key={idx} className="flex items-center gap-1.5">
                      <span className="h-1.5 w-1.5 rounded-full bg-[#f1641e]" />
>>>>>>> 7ee9ca6f04322930ec29228c493ddb72ee250ce5
                      <span>{req}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>

        {/* Related Workflows */}
        {relatedWorkflows.length > 0 && (
<<<<<<< HEAD
          <section className="pt-12 border-t border-border space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold text-foreground">
                Related Blueprints
              </h2>
              <Link href="/workflows" className="text-xs font-bold text-amber-600 dark:text-[#ffd233] hover:underline">
                Explore all
              </Link>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {relatedWorkflows.map((rel, idx) => (
                <WorkflowCard key={rel.id} workflow={rel} illustrationIndex={idx} />
=======
          <section className="pt-10 border-t border-[#e6e6e6] space-y-5">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold text-[#222222]">
                You May Also Like
              </h2>
              <Link href="/workflows" className="text-xs font-semibold text-[#f1641e] hover:underline">
                Explore all
              </Link>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {relatedWorkflows.map((rel) => (
                <WorkflowCard key={rel.id} workflow={rel} />
>>>>>>> 7ee9ca6f04322930ec29228c493ddb72ee250ce5
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
}
