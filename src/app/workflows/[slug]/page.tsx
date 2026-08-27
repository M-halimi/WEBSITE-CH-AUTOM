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
  ShieldCheck,
  Cpu
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
    <div className="bg-black text-white min-h-screen">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-8 lg:px-14 py-8 sm:py-12 space-y-10">
        {/* Breadcrumb navigation */}
        <nav className="flex items-center gap-1.5 text-xs text-[#808080] flex-wrap">
          <Link href="/" className="hover:text-white">Home</Link>
          <ChevronRight className="h-3.5 w-3.5 opacity-50" />
          <Link href="/workflows" className="hover:text-white">Workflows</Link>
          {workflow.category && (
            <>
              <ChevronRight className="h-3.5 w-3.5 opacity-50" />
              <Link href={`/workflows?category=${workflow.category.slug}`} className="hover:text-white">
                {workflow.category.name}
              </Link>
            </>
          )}
          <ChevronRight className="h-3.5 w-3.5 opacity-50" />
          <span className="text-white font-medium truncate max-w-xs">{workflow.title}</span>
        </nav>

        {/* 1. HEADER SECTION ON #232323 */}
        <div className="rounded-[8px] border border-[#414141] bg-[#232323] p-6 sm:p-10">
          <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-8">
            <div className="space-y-4 max-w-3xl">
              {/* Meta Tags */}
              <div className="flex items-center gap-2 flex-wrap">
                {workflow.category && (
                  <span className="px-2.5 py-1 rounded-[4px] bg-[#161616] text-xs font-medium text-white border border-[#414141]">
                    {workflow.category.name}
                  </span>
                )}
                <span className="px-2.5 py-1 rounded-[4px] bg-[#e50914] text-xs font-bold text-white uppercase">
                  {workflow.difficulty}
                </span>
                <span className="text-xs text-[#808080] flex items-center gap-1">
                  <Clock className="h-3.5 w-3.5" />
                  {workflow.estimatedTime}
                </span>
                <span className="text-xs text-[#808080] flex items-center gap-1">
                  <Eye className="h-3.5 w-3.5" />
                  {workflow.views} views
                </span>
              </div>

              {/* Title in Weight 900 / 500 */}
              <h1 className="text-2xl sm:text-4xl md:text-5xl font-black tracking-tight text-white leading-tight">
                {workflow.title}
              </h1>

              {/* Summary */}
              <p className="text-sm sm:text-base text-[#cbd5e1] leading-relaxed">
                {workflow.summary}
              </p>

              {/* Platforms */}
              {workflow.platforms.length > 0 && (
                <div className="flex items-center gap-2 flex-wrap pt-2">
                  <span className="text-xs font-medium text-[#808080]">Compatible with:</span>
                  {workflow.platforms.map(({ platform }) => (
                    <span key={platform.id} className="px-2 py-0.5 rounded-[4px] bg-[#161616] border border-[#414141] text-xs text-white">
                      {platform.name}
                    </span>
                  ))}
                </div>
              )}
            </div>

            {/* Pricing & CTA Card */}
            <div className="lg:w-80 flex flex-col gap-4 rounded-[8px] border border-[#414141] bg-[#161616] p-6">
              <div>
                <span className="text-xs text-[#808080] font-medium uppercase tracking-wider block mb-1">
                  Blueprint Pricing
                </span>
                <div className="text-2xl font-bold text-white flex items-center gap-2">
                  <span>{workflow.price || "Free Template"}</span>
                </div>
                <p className="text-[11px] text-[#808080] mt-1">
                  Includes full n8n JSON nodes and deployment guide.
                </p>
              </div>

              <div className="pt-2 border-t border-[#414141]">
                <WorkflowDetailActions workflow={workflow} />
              </div>
            </div>
          </div>
        </div>

        {/* 2. MAIN GRID */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column (Flow Viewer & Details) */}
          <div className="lg:col-span-2 space-y-10">
            {/* Visual Step-by-Step Flow Viewer */}
            <section className="space-y-4">
              <div className="flex items-center justify-between">
                <h2 className="text-xl sm:text-2xl font-medium text-white flex items-center gap-2">
                  <Zap className="h-5 w-5 text-[#e50914]" />
                  Workflow Execution Pipeline
                </h2>
                <span className="text-xs px-2.5 py-1 rounded-[4px] bg-[#232323] border border-[#414141] text-white">
                  {workflow.steps.length} Steps
                </span>
              </div>

              <div className="pt-2">
                <WorkflowViewer steps={workflow.steps} workflowTitle={workflow.title} />
              </div>
            </section>

            {/* Description / Markdown */}
            <section className="rounded-[8px] border border-[#414141] bg-[#232323] p-6 sm:p-8 space-y-4">
              <h2 className="text-lg font-medium text-white flex items-center gap-2">
                <Sparkles className="h-5 w-5 text-[#e50914]" />
                Detailed Specifications & Benefits
              </h2>
              <div className="prose dark:prose-invert max-w-none text-sm text-[#cbd5e1] whitespace-pre-line leading-relaxed">
                {workflow.description}
              </div>
            </section>
          </div>

          {/* Right Column: Requirements & Outcome */}
          <div className="space-y-6">
            {/* Triggers & Outcomes */}
            <div className="rounded-[8px] border border-[#414141] bg-[#232323] p-6 space-y-4">
              <h3 className="text-sm font-medium uppercase tracking-wider text-white flex items-center gap-2">
                <Cpu className="h-4 w-4 text-[#e50914]" />
                Trigger & Outcome
              </h3>

              {workflow.triggersDescription && (
                <div className="space-y-1 text-xs">
                  <strong className="text-white block">When Triggered:</strong>
                  <p className="text-[#808080] leading-relaxed">{workflow.triggersDescription}</p>
                </div>
              )}

              {workflow.outcomesDescription && (
                <div className="space-y-1 text-xs pt-2 border-t border-[#414141]">
                  <strong className="text-white block">Expected Result:</strong>
                  <p className="text-[#808080] leading-relaxed">{workflow.outcomesDescription}</p>
                </div>
              )}
            </div>

            {/* Pre-requisites */}
            {requirementsList.length > 0 && (
              <div className="rounded-[8px] border border-[#414141] bg-[#232323] p-6 space-y-4">
                <h3 className="text-sm font-medium uppercase tracking-wider text-white flex items-center gap-2">
                  <ShieldCheck className="h-4 w-4 text-[#e50914]" />
                  Required Accounts / APIs
                </h3>
                <ul className="space-y-2.5">
                  {requirementsList.map((req, idx) => (
                    <li key={idx} className="flex items-start gap-2 text-xs text-[#808080]">
                      <CheckCircle2 className="h-4 w-4 text-[#e50914] shrink-0 mt-0.5" />
                      <span className="text-white">{req}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Assistance Box */}
            <div className="rounded-[8px] border border-[#414141] bg-[#161616] p-6 space-y-3">
              <h3 className="text-sm font-medium text-white flex items-center gap-2">
                <Sparkles className="h-4 w-4 text-[#e50914]" />
                Need Turnkey Installation?
              </h3>
              <p className="text-xs text-[#808080] leading-relaxed">
                Our engineers can install, test, and connect this entire automation workflow to your accounts in 24 hours.
              </p>
              <div className="pt-2">
                <WorkflowDetailActions workflow={workflow} />
              </div>
            </div>
          </div>
        </div>

        {/* 3. RELATED WORKFLOWS */}
        {relatedWorkflows.length > 0 && (
          <section className="pt-8 border-t border-[#232323] space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-xl sm:text-2xl font-medium text-white">
                Related Automations
              </h2>
              <Link href="/workflows" className="text-xs font-medium text-[#e50914] hover:underline">
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
    </div>
  );
}
