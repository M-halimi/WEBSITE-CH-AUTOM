import { Metadata } from "next";
import Link from "next/link";
import { Suspense } from "react";
import { Layers, Sparkles, AlertCircle, ArrowRight } from "lucide-react";
import { prisma } from "@/lib/prisma";
import { getAllPlatforms } from "@/lib/ensurePlatforms";
import { WorkflowCard } from "@/components/workflows/WorkflowCard";
import { WorkflowFilters } from "@/components/workflows/WorkflowFilters";
import { Button } from "@/components/ui/button";
import { getClientSession } from "@/actions/clientAuthActions";
import { getTranslator } from "@/i18n/server";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Automation Blueprints Catalog — AutoFlows Hub",
  description:
    "Browse and filter our comprehensive collection of commerce and business automation blueprints.",
};

interface WorkflowsPageProps {
  searchParams: {
    q?: string;
    category?: string;
    platform?: string;
    difficulty?: string;
    sort?: string;
    page?: string;
  };
}

export default async function WorkflowsCatalogPage({
  searchParams,
}: WorkflowsPageProps) {
  const session = await getClientSession();
  const { t } = getTranslator();
  const q = searchParams.q || "";
  const categorySlug = searchParams.category || "";
  const platformSlug = searchParams.platform || "";
  const difficulty = searchParams.difficulty || "";
  const sort = searchParams.sort || "newest";
  const page = parseInt(searchParams.page || "1", 10);
  const pageSize = 12;

  // Build Prisma Where Clause
  const where: any = {
    status: "PUBLISHED",
  };

  if (q) {
    where.OR = [
      { title: { contains: q } },
      { summary: { contains: q } },
      { description: { contains: q } },
    ];
  }

  if (categorySlug) {
    where.category = { slug: categorySlug };
  }

  if (platformSlug) {
    where.platforms = {
      some: {
        platform: { slug: platformSlug },
      },
    };
  }

  if (difficulty) {
    where.difficulty = difficulty.toUpperCase();
  }

  // Build Prisma OrderBy Clause
  let orderBy: any = [{ createdAt: "desc" }];
  if (sort === "popular") {
    orderBy = [{ views: "desc" }, { createdAt: "desc" }];
  } else if (sort === "steps") {
    orderBy = [{ stepsCount: "desc" }, { createdAt: "desc" }];
  }

  // Execute Queries
  const [workflows, totalCount, categories, platforms] = await Promise.all([
    prisma.workflow.findMany({
      where,
      include: {
        category: true,
        platforms: { include: { platform: true } },
        steps: true,
      },
      orderBy,
      skip: (page - 1) * pageSize,
      take: pageSize,
    }),
    prisma.workflow.count({ where }),
    prisma.category.findMany({ orderBy: { order: "asc" } }),
    getAllPlatforms(),
  ]);

  const totalPages = Math.ceil(totalCount / pageSize);

  return (
    <div className="bg-background text-foreground min-h-screen transition-colors duration-300">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-10 py-10 sm:py-14 space-y-10">
        {/* Page Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-8 border-b border-border">
          <div>
            <div className="text-xs font-bold text-amber-600 dark:text-[#ffd233] uppercase tracking-wider mb-2">
              {t("catalog.eyebrow")}
            </div>
            <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-foreground">
              {t("catalog.title")}
            </h1>
            <p className="text-xs sm:text-sm text-muted-foreground mt-2">
              {t("catalog.showing", { count: totalCount })}
            </p>
          </div>

          <Link
            href="/request"
            className="inline-flex items-center justify-center gap-2 h-9 px-4 text-xs font-bold rounded-full border border-border bg-card hover:bg-muted text-foreground transition-all shadow-xs"
          >
            <Sparkles className="h-3.5 w-3.5 text-[#ffd233]" />
            <span>{t("catalog.requestCustom")}</span>
          </Link>
        </div>

        {/* Filter Toolbar */}
        <Suspense fallback={<div className="h-32 rounded-3xl bg-muted animate-pulse" />}>
          <WorkflowFilters
            categories={categories}
            platforms={platforms}
            selectedCategory={categorySlug}
            selectedPlatform={platformSlug}
            selectedDifficulty={difficulty}
            selectedSort={sort}
            searchQuery={q}
          />
        </Suspense>

        {/* Workflows Grid or Empty State */}
        {workflows.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {workflows.map((workflow, idx) => (
              <WorkflowCard 
                key={workflow.id} 
                workflow={workflow} 
                illustrationIndex={idx}
                isAuthenticated={Boolean(session)}
                subscriptionState={session?.subscriptionState || "NONE"}
              />
            ))}
          </div>
        ) : (
          <div className="rounded-3xl border border-border bg-card p-16 text-center max-w-lg mx-auto space-y-4 shadow-sm">
            <div className="mx-auto h-12 w-12 rounded-full bg-muted flex items-center justify-center text-amber-600 dark:text-[#ffd233]">
              <AlertCircle className="h-6 w-6" />
            </div>
            <h3 className="text-lg font-bold text-foreground">
              {t("catalog.emptyTitle")}
            </h3>
            <p className="text-xs text-muted-foreground leading-relaxed">
              {t("catalog.emptyText")}
            </p>
            <div className="pt-2 flex justify-center gap-3">
              <Link
                href="/workflows"
                className="inline-flex items-center justify-center h-9 px-4 rounded-full bg-[#ffd233] text-black font-bold text-xs shadow-xs hover:bg-[#f5c71a] transition-all"
              >
                {t("catalog.resetFilters")}
              </Link>
              <Link
                href="/request"
                className="inline-flex items-center justify-center h-9 px-4 rounded-full border border-border bg-card text-foreground hover:bg-muted text-xs font-semibold shadow-xs transition-all"
              >
                {t("catalog.requestBuild")}
              </Link>
            </div>
          </div>
        )}

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex items-center justify-center gap-2 pt-8 border-t border-border">
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => {
              const params = new URLSearchParams();
              if (q) params.set("q", q);
              if (categorySlug) params.set("category", categorySlug);
              if (platformSlug) params.set("platform", platformSlug);
              if (difficulty) params.set("difficulty", difficulty);
              if (sort) params.set("sort", sort);
              params.set("page", p.toString());

              return (
                <Link
                  key={p}
                  href={`/workflows?${params.toString()}`}
                  className={`w-10 h-10 inline-flex items-center justify-center text-xs font-bold rounded-full transition-all ${
                    p === page
                      ? "bg-[#ffd233] text-black shadow-xs"
                      : "text-muted-foreground hover:bg-muted hover:text-foreground"
                  }`}
                >
                  {p}
                </Link>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
