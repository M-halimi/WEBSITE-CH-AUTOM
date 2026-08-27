"use client";

import * as React from "react";
import { useRouter, useSearchParams, usePathname } from "next/navigation";
import { Search, Filter, X, ArrowUpDown, SlidersHorizontal } from "lucide-react";
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
    const params = new URLSearchParams(searchParams.toString());
    if (value && value !== "ALL") {
      params.set(key, value);
    } else {
      params.delete(key);
    }
    // reset page to 1 on filter change
    params.delete("page");
    router.push(`${pathname}?${params.toString()}`);
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateParam("q", q.trim());
  };

  const clearAllFilters = () => {
    setQ("");
    router.push(pathname);
  };

  const hasActiveFilters = Boolean(
    selectedCategory ||
    selectedPlatform ||
    selectedDifficulty ||
    (selectedSort && selectedSort !== "newest") ||
    searchQuery
  );

  return (
    <div className="space-y-4 rounded-2xl border border-border bg-card p-5 sm:p-6 shadow-sm">
      {/* Top Search & Sort Row */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
        <form onSubmit={handleSearchSubmit} className="relative flex-1">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <input
            type="text"
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Search by title, description, node type..."
            className="w-full h-11 pl-10 pr-24 rounded-xl border border-input bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary transition-all placeholder:text-muted-foreground"
          />
          <Button
            type="submit"
            size="sm"
            className="absolute right-1.5 top-1/2 -translate-y-1/2 h-8 text-xs font-semibold px-3"
          >
            Search
          </Button>
        </form>

        {/* Sort selector */}
        <div className="flex items-center gap-2 min-w-[200px]">
          <ArrowUpDown className="h-4 w-4 text-muted-foreground hidden sm:inline" />
          <select
            value={selectedSort}
            onChange={(e) => updateParam("sort", e.target.value)}
            aria-label="Sort workflows"
            className="h-11 w-full rounded-xl border border-input bg-background px-3 text-xs font-medium focus:outline-none focus:ring-2 focus:ring-primary"
          >
            <option value="newest">✨ Sort: Newest First</option>
            <option value="popular">🔥 Sort: Most Popular</option>
            <option value="steps">⚡ Sort: Most Steps</option>
          </select>
        </div>
      </div>

      {/* Filter Badges & Dropdowns */}
      <div className="pt-2 border-t border-border/60 grid grid-cols-1 sm:grid-cols-3 gap-3">
        {/* Category Filter */}
        <div>
          <label className="text-[11px] font-bold uppercase tracking-wider text-muted-foreground block mb-1.5">
            Category
          </label>
          <select
            value={selectedCategory}
            onChange={(e) => updateParam("category", e.target.value)}
            aria-label="Filter by category"
            className="h-10 w-full rounded-lg border border-input bg-background px-3 text-xs focus:outline-none focus:ring-2 focus:ring-primary"
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
          <label className="text-[11px] font-bold uppercase tracking-wider text-muted-foreground block mb-1.5">
            Platform / Engine
          </label>
          <select
            value={selectedPlatform}
            onChange={(e) => updateParam("platform", e.target.value)}
            aria-label="Filter by platform"
            className="h-10 w-full rounded-lg border border-input bg-background px-3 text-xs focus:outline-none focus:ring-2 focus:ring-primary"
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
          <label className="text-[11px] font-bold uppercase tracking-wider text-muted-foreground block mb-1.5">
            Difficulty Level
          </label>
          <select
            value={selectedDifficulty}
            onChange={(e) => updateParam("difficulty", e.target.value)}
            aria-label="Filter by difficulty"
            className="h-10 w-full rounded-lg border border-input bg-background px-3 text-xs focus:outline-none focus:ring-2 focus:ring-primary"
          >
            <option value="">All Difficulties</option>
            <option value="BEGINNER">Beginner (Quick 15 min setup)</option>
            <option value="INTERMEDIATE">Intermediate (Standard API/Webhook)</option>
            <option value="ADVANCED">Advanced (Multi-agent / AI)</option>
          </select>
        </div>
      </div>

      {/* Active filters bar & Clear button */}
      {hasActiveFilters && (
        <div className="flex items-center justify-between pt-2 border-t border-border/40 text-xs text-muted-foreground">
          <span className="flex items-center gap-1.5">
            <SlidersHorizontal className="h-3.5 w-3.5 text-primary" />
            Filters active
          </span>
          <button
            onClick={clearAllFilters}
            className="text-xs text-destructive hover:underline font-medium flex items-center gap-1"
          >
            <X className="h-3.5 w-3.5" />
            Reset all filters
          </button>
        </div>
      )}
    </div>
  );
}

