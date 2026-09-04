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
  Cpu, 
  ShoppingBag 
} from "lucide-react";
import { prisma } from "@/lib/prisma";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { PlatformIcon } from "@/components/ui/platform-icon";
import { WorkflowViewer } from "@/components/workflows/WorkflowViewer";
import { WorkflowDetailActions } from "@/components/workflows/WorkflowDetailActions";
import { WorkflowCard } from "@/components/workflows/WorkflowCard";
import { getClientSession } from "@/actions/clientAuthActions";
import { getTranslator } from "@/i18n/server";

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
  const [workflow, session] = await Promise.all([prisma.workflow.findUnique({
    where: { slug: params.slug },
    include: {
      category: true,
      platforms: { include: { platform: true } },
      tags: { include: { tag: true } },
      steps: { orderBy: { order: "asc" } },
    },
  }), getClientSession()]);

  if (!workflow) {
    notFound();
  }

  const { t } = getTranslator();
  const subscriptionState = session?.subscriptionState || "NONE";
  const hasAccess = subscriptionState === "ACTIVE";

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
    <div className="bg-background text-foreground min-h-screen transition-colors duration-300">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-10 py-8 sm:py-12 space-y-10">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-xs text-muted-foreground flex-wrap">
          <Link href="/" className="hover:text-foreground transition-colors">{t("detail.home")}</Link>
          <ChevronRight className="rtl-flip h-3 w-3 opacity-60" />
          <Link href="/workflows" className="hover:text-foreground transition-colors">{t("detail.workflows")}</Link>
          {workflow.category && (
            <>
              <ChevronRight className="rtl-flip h-3 w-3 opacity-60" />
              <Link href={`/workflows?category=${workflow.category.slug}`} className="hover:text-amber-600 dark:hover:text-[#ffd233] transition-colors font-medium">
                {workflow.category.name}
              </Link>
            </>
          )}
          <ChevronRight className="rtl-flip h-3 w-3 opacity-60" />
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
                    {workflow.category.name}
                  </Badge>
                )}
                {workflow.featured && (
                  <Badge variant="outline" className="text-xs font-semibold">
                    {t("workflow.featured")}
                  </Badge>
                )}
                <span className="text-xs text-muted-foreground font-medium">
                  • {workflow.views} views • {workflow.estimatedTime} setup • {workflow.difficulty}
                </span>
              </div>

              <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-foreground leading-tight">
                {workflow.title}
              </h1>

              <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
                {workflow.summary}
              </p>

              {/* Compatible Platforms with Authentic Logos */}
              {workflow.platforms.length > 0 && (
                <div className="flex items-center gap-2 flex-wrap pt-2">
                  <span className="text-xs font-semibold text-muted-foreground">{t("detail.engines")}:</span>
                  {workflow.platforms.map(({ platform }) => (
                    <div
                      key={platform.id}
                      className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-card border border-border text-xs font-semibold text-foreground shadow-xs"
                    >
                      <PlatformIcon slug={platform.slug} name={platform.name} size="xs" />
                      <span>{platform.name}</span>
                    </div>
                  ))}
                </div>
              )}

              {/* Workflow Banner Image if set */}
              {workflow.imageUrl && (
                <div className="pt-4">
                  <div className="relative aspect-[16/8] w-full rounded-2xl border border-border overflow-hidden shadow-md">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={workflow.imageUrl}
                      alt={workflow.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
              )}
            </div>

            {/* Visual Step-by-Step Pipeline */}
            <section className="space-y-6">
              <div className="flex items-center justify-between">
                <h2 className="text-xl sm:text-2xl font-bold text-foreground flex items-center gap-2.5">
                  <Zap className="h-5 w-5 text-amber-500 fill-current" />
                  {t("detail.pipeline")}
                </h2>
                <span className="text-xs font-bold px-3 py-1 rounded-full bg-card border border-border text-foreground shadow-xs">
                  {t("detail.executedNodes", { count: workflow.steps.length })}
                </span>
              </div>

              <div className="pt-2">
                <WorkflowViewer steps={workflow.steps} workflowTitle={workflow.title} />
              </div>
            </section>

            {/* Detailed Description */}
            <section className="rounded-3xl border border-border bg-card p-6 sm:p-8 space-y-4 shadow-sm">
              <h2 className="text-lg font-bold text-foreground flex items-center gap-2">
                <Sparkles className="h-4 w-4 text-amber-500" />
                {t("detail.specifications")}
              </h2>
              <div className="prose max-w-none text-xs sm:text-sm text-muted-foreground whitespace-pre-line leading-relaxed">
                {workflow.description}
              </div>
            </section>
          </div>

          {/* Right Column (4 cols): Sticky Order Box */}
          <div className="lg:col-span-4 lg:sticky lg:top-24 space-y-6">
            <div className="rounded-3xl border border-border bg-card p-6 shadow-sm space-y-6">
              {/* SaaS subscription access — pricing is centralized on /plans */}
              <div>
                <div className="flex items-baseline justify-between">
                  <span className={`text-sm font-extrabold ${hasAccess ? "text-emerald-600 dark:text-emerald-400" : "text-amber-700 dark:text-[#ffd233]"}`}>
                    {hasAccess ? t("workflow.included") : subscriptionState === "EXPIRED" ? t("workflow.expired") : session ? t("workflow.required") : t("workflow.available")}
                  </span>
                  <span className="text-xs text-emerald-600 dark:text-emerald-400 font-bold flex items-center gap-1">
                    <CheckCircle2 className="h-4 w-4" /> {t("workflow.preview")}
                  </span>
                </div>
                <p className="text-xs text-muted-foreground mt-1.5">
                  {hasAccess ? t("workflow.accessActive") : t("workflow.accessInactive")}
                </p>
              </div>

              {/* Action Buttons */}
              <WorkflowDetailActions workflow={workflow} isAuthenticated={Boolean(session)} subscriptionState={subscriptionState} />

              {/* Guarantee Points */}
              <div className="pt-6 border-t border-border space-y-3 text-xs text-muted-foreground">
                <div className="flex items-start gap-2.5">
                  <ShieldCheck className="h-4 w-4 text-amber-600 dark:text-[#ffd233] shrink-0 mt-0.5" />
                  <span><strong>{t("workflow.accessTitle")}:</strong> {hasAccess ? t("workflow.accessActive") : t("workflow.accessInactive")}</span>
                </div>
                <div className="flex items-start gap-2.5">
                  <Clock className="h-4 w-4 text-amber-600 dark:text-[#ffd233] shrink-0 mt-0.5" />
                  <span><strong>{t("detail.installationTitle")}:</strong> {t("detail.installationText")}</span>
                </div>
              </div>
            </div>

            {/* Triggers & Outcomes */}
            <div className="rounded-3xl border border-border bg-card p-6 space-y-4 shadow-sm">
              <h3 className="text-xs font-bold uppercase tracking-wider text-foreground flex items-center gap-1.5">
                <Cpu className="h-4 w-4 text-amber-500" /> {t("detail.triggerOutput")}
              </h3>
              {workflow.triggersDescription && (
                <div className="text-xs text-muted-foreground">
                  <strong className="text-foreground block mb-1">{t("detail.whenTriggered")}:</strong>
                  {workflow.triggersDescription}
                </div>
              )}
              {workflow.outcomesDescription && (
                <div className="text-xs text-muted-foreground pt-3 border-t border-border">
                  <strong className="text-foreground block mb-1">{t("detail.expectedOutput")}:</strong>
                  {workflow.outcomesDescription}
                </div>
              )}
            </div>

            {/* Required Accounts */}
            {requirementsList.length > 0 && (
              <div className="rounded-3xl border border-border bg-card p-6 space-y-3 shadow-xs">
                <h3 className="text-xs font-bold uppercase tracking-wider text-foreground">
                  {t("detail.requirements")}
                </h3>
                <ul className="space-y-2 text-xs text-muted-foreground">
                  {requirementsList.map((req, idx) => (
                    <li key={idx} className="flex items-center gap-2">
                      <span className="h-1.5 w-1.5 rounded-full bg-[#ffd233]" />
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
          <section className="pt-12 border-t border-border space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold text-foreground">
                {t("detail.related")}
              </h2>
              <Link href="/workflows" className="text-xs font-bold text-amber-600 dark:text-[#ffd233] hover:underline">
                {t("detail.exploreAll")}
              </Link>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {relatedWorkflows.map((rel, idx) => (
                <WorkflowCard key={rel.id} workflow={rel} illustrationIndex={idx} isAuthenticated={Boolean(session)} subscriptionState={subscriptionState} />
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
}
