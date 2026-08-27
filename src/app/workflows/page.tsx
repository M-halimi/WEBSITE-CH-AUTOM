import { Metadata } from "next";
import Link from "next/link";
import { Suspense } from "react";
import { Layers, Sparkles, AlertCircle, ArrowRight } from "lucide-react";
import { prisma } from "@/lib/prisma";
import { WorkflowCard } from "@/components/workflows/WorkflowCard";
import { WorkflowFilters } from "@/components/workflows/WorkflowFilters";
import { Button } from "@/components/ui/button";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Workflow Catalog — AutoFlows Hub",
  description:
    "Browse and filter our comprehensive collection of business automation workflows.",
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
  const q = searchParams.q || "";
  const categorySlug = searchParams.category || "";
  const platformSlug = searchParams.platform || "";
  const difficulty = searchParams.difficulty || "";
  const sort = searchParams.sort || "newest";
  const page = parseInt(searchParams.page || "1", 10);
  const pageSize = 9;

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
    prisma.platform.findMany({ orderBy: { name: "asc" } }),
  ]);

  const totalPages = Math.ceil(totalCount / pageSize);

  return (
    <div className="bg-black text-white min-h-screen">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-8 lg:px-14 py-12 sm:py-16 space-y-8">
        {/* Page Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-6 border-b border-[#232323]">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-[#e50914] block mb-1">
              Catalog
            </span>
            <h1 className="text-3xl sm:text-5xl font-black tracking-tight text-white uppercase">
              Explore Automations
            </h1>
            <p className="text-sm text-[#808080] mt-1">
              Showing <strong className="text-white">{totalCount}</strong> verified workflow templates ready for deployment.
            </p>
          </div>

          <Link href="/request">
            <Button
              variant="outline"
              size="sm"
              className="gap-2 text-xs font-medium rounded-[8px]"
            >
              <span>Request Custom Workflow</span>
              <ArrowRight className="h-3.5 w-3.5" />
            </Button>
          </Link>
        </div>

        {/* Filter Toolbar with Suspense */}
        <Suspense fallback={<div className="h-32 rounded-[8px] bg-[#232323] animate-pulse" />}>
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
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {workflows.map((workflow) => (
              <WorkflowCard key={workflow.id} workflow={workflow} />
            ))}
          </div>
        ) : (
          <div className="rounded-[8px] border border-[#414141] bg-[#232323] p-12 text-center max-w-lg mx-auto space-y-4">
            <div className="mx-auto h-12 w-12 rounded-[8px] bg-[#161616] flex items-center justify-center text-[#808080]">
              <AlertCircle className="h-6 w-6" />
            </div>
            <h3 className="text-lg font-medium text-white">
              No workflows found
            </h3>
            <p className="text-xs text-[#808080] leading-relaxed">
              We couldn&apos;t find any automation matching your current filter criteria.
            </p>
            <div className="pt-2 flex justify-center gap-3">
              <Link href="/workflows">
                <Button variant="default" size="sm">
                  Reset All Filters
                </Button>
              </Link>
              <Link href="/request">
                <Button variant="outline" size="sm">
                  Request This Automation
                </Button>
              </Link>
            </div>
          </div>
        )}

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex items-center justify-center gap-2 pt-8 border-t border-[#232323]">
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => {
              const params = new URLSearchParams();
              if (q) params.set("q", q);
              if (categorySlug) params.set("category", categorySlug);
              if (platformSlug) params.set("platform", platformSlug);
              if (difficulty) params.set("difficulty", difficulty);
              if (sort) params.set("sort", sort);
              params.set("page", p.toString());

              return (
                <Link key={p} href={`/workflows?${params.toString()}`}>
                  <Button
                    variant={p === page ? "default" : "secondary"}
                    size="sm"
                    className="w-10 h-10 p-0 text-xs font-semibold rounded-[8px]"
                  >
                    {p}
                  </Button>
                </Link>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
