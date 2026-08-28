"use client";

import * as React from "react";
import { useRouter, useSearchParams, usePathname } from "next/navigation";
import { Search, X, ArrowUpDown, SlidersHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";

interface WorkflowFiltersProps {
  categories: { id: string; name: string; slug: string }[];
  platforms: { id: string; name: string; slug: string }[];
  selectedCategory?: string;
  selectedPlatform?: string;
  selectedDifficulty?: string;
  selectedSort?: string;
  searchQuery?: string;
}

export function WorkflowFilters({
  categories,
  platforms,
  selectedCategory = "",
  selectedPlatform = "",
  selectedDifficulty = "",
  selectedSort = "newest",
  searchQuery = "",
}: WorkflowFiltersProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const [q, setQ] = React.useState(searchQuery);

  const updateParam = (key: string, value: string) => {
    const params = new URLSearchParams(searchParams ? searchParams.toString() : "");
    if (value && value !== "ALL") {
      params.set(key, value);
    } else {
      params.delete(key);
    }
    params.delete("page");
    router.push(`${pathname || "/workflows"}?${params.toString()}`);
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateParam("q", q.trim());
  };

  const clearAllFilters = () => {
    setQ("");
    router.push(pathname || "/workflows");
  };

  const hasActiveFilters = Boolean(
    selectedCategory ||
    selectedPlatform ||
    selectedDifficulty ||
    (selectedSort && selectedSort !== "newest") ||
    searchQuery
  );

  return (
    <div className="space-y-4 rounded-3xl border border-border bg-card p-6 shadow-sm">
      {/* Search & Sort Row */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
        <form onSubmit={handleSearchSubmit} className="relative flex-1">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <input
            type="text"
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Search blueprints by title, integration, or outcome..."
            className="w-full h-11 pl-10 pr-24 rounded-full border border-border bg-background text-xs sm:text-sm text-foreground focus:outline-none focus:border-[#ffd233] transition-colors placeholder:text-muted-foreground"
          />
          <Button
            type="submit"
            size="sm"
            className="absolute right-1.5 top-1/2 -translate-y-1/2 h-8 text-xs font-bold px-4 rounded-full bg-[#ffd233] text-black hover:bg-[#f5c71a]"
          >
            Search
          </Button>
        </form>

        {/* Sort selector */}
        <div className="flex items-center gap-2 min-w-[190px]">
          <ArrowUpDown className="h-4 w-4 text-muted-foreground hidden sm:inline" />
          <select
            value={selectedSort}
            onChange={(e) => updateParam("sort", e.target.value)}
            aria-label="Sort workflows"
            className="h-11 w-full rounded-full border border-border bg-background px-4 text-xs font-medium text-foreground focus:outline-none focus:border-[#ffd233]"
          >
            <option value="newest">Sort: Newest First</option>
            <option value="popular">Sort: Most Popular</option>
            <option value="steps">Sort: Node Count</option>
          </select>
        </div>
      </div>

      {/* Filter Dropdowns */}
      <div className="pt-3 border-t border-border grid grid-cols-1 sm:grid-cols-3 gap-3">
        {/* Category Filter */}
        <div>
          <label className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground block mb-1.5">
            Category
          </label>
          <select
            value={selectedCategory}
            onChange={(e) => updateParam("category", e.target.value)}
            aria-label="Filter by category"
            className="h-10 w-full rounded-full border border-border bg-background px-3 text-xs text-foreground focus:outline-none focus:border-[#ffd233]"
          >
            <option value="">All Categories</option>
            {categories.map((c) => (
              <option key={c.id} value={c.slug}>
                {c.name}
              </option>
            ))}
          </select>
        </div>

        {/* Platform Filter */}
        <div>
          <label className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground block mb-1.5">
            Platform / Engine
          </label>
          <select
            value={selectedPlatform}
            onChange={(e) => updateParam("platform", e.target.value)}
            aria-label="Filter by platform"
            className="h-10 w-full rounded-full border border-border bg-background px-3 text-xs text-foreground focus:outline-none focus:border-[#ffd233]"
          >
            <option value="">All Platforms</option>
            {platforms.map((p) => (
              <option key={p.id} value={p.slug}>
                {p.name}
              </option>
            ))}
          </select>
        </div>

        {/* Difficulty Filter */}
        <div>
          <label className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground block mb-1.5">
            Complexity Tier
          </label>
          <select
            value={selectedDifficulty}
            onChange={(e) => updateParam("difficulty", e.target.value)}
            aria-label="Filter by difficulty"
            className="h-10 w-full rounded-full border border-border bg-background px-3 text-xs text-foreground focus:outline-none focus:border-[#ffd233]"
          >
            <option value="">All Difficulties</option>
            <option value="BEGINNER">Beginner (Quick Setup)</option>
            <option value="INTERMEDIATE">Intermediate (Webhooks)</option>
            <option value="ADVANCED">Advanced (Multi-Node AI)</option>
          </select>
        </div>
      </div>

      {/* Active filters bar & Clear button */}
      {hasActiveFilters && (
        <div className="flex items-center justify-between pt-2 border-t border-border text-xs text-muted-foreground">
          <span className="flex items-center gap-1.5">
            <SlidersHorizontal className="h-3.5 w-3.5 text-amber-600 dark:text-[#ffd233]" />
            Filters active
          </span>
          <button
            onClick={clearAllFilters}
            className="text-xs text-amber-600 dark:text-[#ffd233] hover:underline font-semibold flex items-center gap-1"
          >
            <X className="h-3.5 w-3.5" />
            Reset all filters
          </button>
        </div>
      )}
    </div>
  );
}
