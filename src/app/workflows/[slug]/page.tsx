import { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import {
  Layers,
  Clock,
  Eye,
  CheckCircle2,
  ChevronRight,
  Zap,
  Sparkles,
  ArrowLeft,
  ShieldCheck,
  Cpu,
} from "lucide-react";
import { prisma } from "@/lib/prisma";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { WorkflowViewer } from "@/components/workflows/WorkflowViewer";
import { WorkflowDetailActions } from "@/components/workflows/WorkflowDetailActions";
import { WorkflowCard } from "@/components/workflows/WorkflowCard";

interface WorkflowDetailPageProps {
  params: {
    slug: string;
  };
}

export async function generateMetadata({
  params,
}: WorkflowDetailPageProps): Promise<Metadata> {
  const workflow = await prisma.workflow.findUnique({
    where: { slug: params.slug },
    include: { category: true },
  });

  if (!workflow) {
    return { title: "Workflow Not Found — AutoFlows Hub" };
  }

  return {
    title: `${workflow.title} — Automation Workflow | AutoFlows Hub`,
    description: workflow.summary,
    openGraph: {
      title: workflow.title,
      description: workflow.summary,
    },
  };
}

export default async function WorkflowDetailPage({
  params,
}: WorkflowDetailPageProps) {
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

  // Increment views count asynchronously in background
  await prisma.workflow
    .update({
      where: { id: workflow.id },
      data: { views: { increment: 1 } },
    })
    .catch(() => {});

  // Fetch related workflows in the same category
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
    take: 3,
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
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-12">
      {/* Breadcrumb navigation */}
      <nav className="flex items-center gap-1.5 text-xs text-muted-foreground flex-wrap">
        <Link href="/" className="hover:text-foreground">
          Home
        </Link>
        <ChevronRight className="h-3.5 w-3.5 opacity-50" />
        <Link href="/workflows" className="hover:text-foreground">
          Workflows
        </Link>
        {workflow.category && (
          <>
            <ChevronRight className="h-3.5 w-3.5 opacity-50" />
            <Link
              href={`/workflows?category=${workflow.category.slug}`}
              className="hover:text-foreground"
            >
              {workflow.category.name}
            </Link>
          </>
        )}
        <ChevronRight className="h-3.5 w-3.5 opacity-50" />
        <span className="text-foreground font-medium truncate max-w-xs">
          {workflow.title}
        </span>
      </nav>

      {/* 1. HEADER SECTION */}
      <div className="rounded-3xl border border-border bg-card p-6 sm:p-10 shadow-sm relative overflow-hidden">
        <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-8">
          <div className="space-y-4 max-w-3xl">
            {/* Meta Tags */}
            <div className="flex items-center gap-2 flex-wrap">
              {workflow.category && (
                <Badge variant="outline" className="bg-muted/50 text-xs">
                  {workflow.category.name}
                </Badge>
              )}
              <Badge variant="success" className="text-xs">
                {workflow.difficulty} Level
              </Badge>
              <span className="text-xs text-muted-foreground flex items-center gap-1">
                <Clock className="h-3.5 w-3.5" />
                {workflow.estimatedTime}
              </span>
              <span className="text-xs text-muted-foreground flex items-center gap-1">
                <Eye className="h-3.5 w-3.5" />
                {workflow.views + 1} views
              </span>
            </div>

            {/* Title */}
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-tight text-foreground leading-tight">
              {workflow.title}
            </h1>

            {/* Summary */}
            <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
              {workflow.summary}
            </p>

            {/* Platforms & Engines */}
            {workflow.platforms.length > 0 && (
              <div className="flex items-center gap-2 flex-wrap pt-2">
                <span className="text-xs font-semibold text-muted-foreground">
                  Platforms:
                </span>
                {workflow.platforms.map(({ platform }) => (
                  <Badge
                    key={platform.id}
                    variant="secondary"
                    className="text-xs font-medium"
                  >
                    {platform.name}
                  </Badge>
                ))}
              </div>
            )}
          </div>

          {/* Pricing & CTA Column */}
          <div className="lg:w-80 flex flex-col gap-4 rounded-2xl border border-border/80 bg-background/60 p-6 shadow-sm">
            <div>
              <span className="text-xs text-muted-foreground font-semibold uppercase tracking-wider block mb-1">
                Pricing / License
              </span>
              <div className="text-2xl font-bold text-foreground flex items-center gap-2">
                <span>{workflow.price || "Free Template"}</span>
              </div>
              <p className="text-[11px] text-muted-foreground mt-1">
                Includes ready JSON template, node schema, and setup guide.
              </p>
            </div>

            <div className="pt-2 border-t border-border">
              <WorkflowDetailActions workflow={workflow} />
            </div>
          </div>
        </div>
      </div>

      {/* 2. MAIN GRID (Left: Flow Viewer & Steps; Right: Specs & Requirements) */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column (2 Cols wide) */}
        <div className="lg:col-span-2 space-y-10">
          {/* Visual Step-by-Step Flow Viewer */}
          <section className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-xl sm:text-2xl font-bold text-foreground flex items-center gap-2">
                <Zap className="h-5 w-5 text-amber-500" />
                Workflow Pipeline Viewer
              </h2>
              <Badge variant="outline" className="text-xs">
                {workflow.steps.length} Steps
              </Badge>
            </div>
            <p className="text-xs text-muted-foreground">
              Sequential execution diagram showing how data moves across
              triggers, actions, and services.
            </p>

            <div className="pt-4">
              <WorkflowViewer
                steps={workflow.steps}
                workflowTitle={workflow.title}
              />
            </div>
          </section>

          {/* Overview & Description Markdown */}
          <section className="rounded-2xl border border-border bg-card p-6 sm:p-8 space-y-4">
            <h2 className="text-lg font-bold text-foreground flex items-center gap-2">
              <Sparkles className="h-5 w-5 text-primary" />
              Detailed Specifications & Use Cases
            </h2>
            <div className="prose dark:prose-invert max-w-none text-sm text-muted-foreground whitespace-pre-line leading-relaxed">
              {workflow.description}
            </div>
          </section>
        </div>

        {/* Right Column: Requirements, Triggers & Value */}
        <div className="space-y-6">
          {/* Triggers & Outcomes */}
          <div className="rounded-2xl border border-border bg-card p-6 space-y-4">
            <h3 className="text-sm font-bold uppercase tracking-wider text-foreground flex items-center gap-2">
              <Cpu className="h-4 w-4 text-emerald-500" />
              Trigger & Outcome
            </h3>

            {workflow.triggersDescription && (
              <div className="space-y-1 text-xs">
                <strong className="text-foreground block">
                  When Triggered:
                </strong>
                <p className="text-muted-foreground leading-relaxed">
                  {workflow.triggersDescription}
                </p>
              </div>
            )}

            {workflow.outcomesDescription && (
              <div className="space-y-1 text-xs pt-2 border-t border-border">
                <strong className="text-foreground block">Result:</strong>
                <p className="text-muted-foreground leading-relaxed">
                  {workflow.outcomesDescription}
                </p>
              </div>
            )}
          </div>

          {/* Pre-requisites & Requirements */}
          {requirementsList.length > 0 && (
            <div className="rounded-2xl border border-border bg-card p-6 space-y-4">
              <h3 className="text-sm font-bold uppercase tracking-wider text-foreground flex items-center gap-2">
                <ShieldCheck className="h-4 w-4 text-primary" />
                Required Accounts / Tools
              </h3>
              <ul className="space-y-2.5">
                {requirementsList.map((req, idx) => (
                  <li
                    key={idx}
                    className="flex items-start gap-2 text-xs text-muted-foreground"
                  >
                    <CheckCircle2 className="h-4 w-4 text-emerald-500 shrink-0 mt-0.5" />
                    <span>{req}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Fast Track Support Card */}
          <div className="rounded-2xl border border-emerald-500/20 bg-emerald-500/5 p-6 space-y-3">
            <h3 className="text-sm font-bold text-foreground flex items-center gap-2">
              <Sparkles className="h-4 w-4 text-emerald-500" />
              Need Installation Assistance?
            </h3>
            <p className="text-xs text-muted-foreground leading-relaxed">
              Don&apos;t have time to connect nodes and write webhooks? Our
              automation team can set this up on your server within 24 hours.
            </p>
            <div className="pt-2">
              <WorkflowDetailActions workflow={workflow} />
            </div>
          </div>
        </div>
      </div>

      {/* 3. RELATED WORKFLOWS */}
      {relatedWorkflows.length > 0 && (
        <section className="pt-8 border-t border-border space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-xl sm:text-2xl font-bold text-foreground">
              Related Automations You Might Like
            </h2>
            <Link
              href="/workflows"
              className="text-xs font-semibold text-primary hover:underline"
            >
              View all
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {relatedWorkflows.map((rel) => (
              <WorkflowCard key={rel.id} workflow={rel} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
