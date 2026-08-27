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
  Star,
  Cpu,
  Heart
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
                {workflow.category.name}
              </Link>
            </>
          )}
          <ChevronRight className="h-3 w-3 opacity-60" />
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
                    {workflow.category.name}
                  </span>
                )}
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
                {workflow.summary}
              </p>

              {/* Compatible Platforms */}
              {workflow.platforms.length > 0 && (
                <div className="flex items-center gap-1.5 flex-wrap pt-1">
                  <span className="text-xs font-semibold text-[#222222]">Platforms:</span>
                  {workflow.platforms.map(({ platform }) => (
                    <span
                      key={platform.id}
                      className="px-2.5 py-1 rounded-full bg-[#f6f6f6] border border-[#d6d6d6] text-xs font-medium text-[#222222]"
                    >
                      {platform.name}
                    </span>
                  ))}
                </div>
              )}
            </div>

            {/* Visual Step-by-Step Pipeline */}
            <section className="space-y-4">
              <div className="flex items-center justify-between">
                <h2 className="text-lg sm:text-xl font-semibold text-[#222222] flex items-center gap-2">
                  <Zap className="h-5 w-5 text-[#f1641e]" />
                  Step-by-Step Visual Pipeline
                </h2>
                <span className="text-xs font-semibold px-3 py-1 rounded-full bg-[#f6f6f6] border border-[#d6d6d6] text-[#222222]">
                  {workflow.steps.length} Executed Nodes
                </span>
              </div>

              <div className="pt-2">
                <WorkflowViewer steps={workflow.steps} workflowTitle={workflow.title} />
              </div>
            </section>

            {/* Detailed Description */}
            <section className="rounded-[8px] border border-[#d6d6d6] bg-white p-6 sm:p-8 space-y-3 shadow-sm">
              <h2 className="text-base sm:text-lg font-semibold text-[#222222] flex items-center gap-2">
                <Sparkles className="h-4 w-4 text-[#f1641e]" />
                Item Details & Automation Logic
              </h2>
              <div className="prose max-w-none text-xs sm:text-sm text-[#3f3f3f] whitespace-pre-line leading-relaxed">
                {workflow.description}
              </div>
            </section>
          </div>

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
                </p>
              </div>

              {/* Action Buttons */}
              <WorkflowDetailActions workflow={workflow} />

              {/* Guarantee Points */}
              <div className="pt-4 border-t border-[#e6e6e6] space-y-2.5 text-xs text-[#595959]">
                <div className="flex items-start gap-2">
                  <ShieldCheck className="h-4 w-4 text-[#258635] shrink-0 mt-0.5" />
                  <span><strong>100% Code Ownership:</strong> Import once, run forever on your own server.</span>
                </div>
                <div className="flex items-start gap-2">
                  <Clock className="h-4 w-4 text-[#f1641e] shrink-0 mt-0.5" />
                  <span><strong>Turnkey Option:</strong> Request our team to install and configure everything for you.</span>
                </div>
              </div>
            </div>

            {/* Triggers & Outcome Box */}
            <div className="rounded-[8px] border border-[#d6d6d6] bg-[#fdf6e8]/40 p-5 space-y-3">
              <h3 className="text-xs font-semibold uppercase tracking-wider text-[#a66523] flex items-center gap-1.5">
                <Cpu className="h-4 w-4" /> Trigger & Outcome
              </h3>
              {workflow.triggersDescription && (
                <div className="text-xs text-[#595959]">
                  <strong className="text-[#222222] block mb-0.5">When Triggered:</strong>
                  {workflow.triggersDescription}
                </div>
              )}
              {workflow.outcomesDescription && (
                <div className="text-xs text-[#595959] pt-2 border-t border-[#f5e8c8]">
                  <strong className="text-[#222222] block mb-0.5">Expected Output:</strong>
                  {workflow.outcomesDescription}
                </div>
              )}
            </div>

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
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
}
