import Link from "next/link";
import { 
  Layers, 
  Clock, 
  Star, 
  Heart, 
  Zap, 
  ArrowRight,
  ShieldCheck
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

interface WorkflowCardProps {
  workflow: {
    id: string;
    title: string;
    slug: string;
    summary: string;
    difficulty: string;
    estimatedTime: string;
    stepsCount: number;
    views: number;
    featured?: boolean;
    price?: string | null;
    category?: {
      name: string;
      slug: string;
    } | null;
    platforms?: {
      platform: {
        id: string;
        name: string;
        slug: string;
        color?: string | null;
      };
    }[];
    steps?: {
      id: string;
      name: string;
      type: string;
      appName?: string | null;
    }[];
  };
  rank?: number;
}

export function WorkflowCard({ workflow }: WorkflowCardProps) {
  const stepCount = workflow.stepsCount || workflow.steps?.length || 4;

  return (
    <div className="group relative flex flex-col justify-between rounded-[8px] bg-white border border-[#e6e6e6] p-3.5 etsy-card-hover">
      {/* 1. Photo / Visual Plate */}
      <div className="relative aspect-[16/10] w-full rounded-[8px] bg-gradient-to-br from-[#fdf6e8] to-[#f6f6f6] border border-[#d6d6d6]/60 p-4 flex flex-col justify-between overflow-hidden mb-3">
        {/* Top Badges & Heart Chip */}
        <div className="flex items-start justify-between w-full z-10">
          <div className="flex items-center gap-1.5 flex-wrap">
            {workflow.featured ? (
              <span className="inline-flex items-center px-2 py-0.5 rounded-[4px] text-[11px] font-semibold bg-[#f5e8c8] text-[#a66523]">
                Bestseller
              </span>
            ) : (
              <span className="inline-flex items-center px-2 py-0.5 rounded-[4px] text-[11px] font-medium bg-white/90 text-[#595959] border border-[#d6d6d6]">
                {workflow.difficulty}
              </span>
            )}
          </div>

          {/* Etsy Circular Heart Chip */}
          <button
            type="button"
            aria-label="Add to favorites"
            className="h-8 w-8 rounded-full bg-white text-[#222222] hover:text-[#f1641e] shadow-sm flex items-center justify-center border border-[#e6e6e6] transition-colors"
          >
            <Heart className="h-4 w-4" />
          </button>
        </div>

        {/* Center Automation Illustration */}
        <div className="my-auto flex items-center justify-center gap-2 text-[#222222]">
          <div className="h-10 w-10 rounded-full bg-white shadow-sm flex items-center justify-center text-[#f1641e] border border-[#e6e6e6]">
            <Zap className="h-5 w-5 fill-current" />
          </div>
          <div className="h-0.5 w-6 bg-[#d6d6d6]" />
          <div className="h-9 w-9 rounded-full bg-white shadow-sm flex items-center justify-center text-[#222222] border border-[#e6e6e6] text-xs font-semibold">
            {stepCount} nodes
          </div>
        </div>

        {/* Bottom Platform Pills on Image */}
        <div className="flex items-center gap-1 overflow-hidden z-10">
          {workflow.platforms?.slice(0, 2).map(({ platform }) => (
            <span
              key={platform.id}
              className="text-[10px] font-medium bg-white/90 text-[#222222] px-2 py-0.5 rounded-[4px] border border-[#d6d6d6]"
            >
              {platform.name}
            </span>
          ))}
        </div>
      </div>

      {/* 2. Metadata Block */}
      <div className="space-y-1.5 flex-1 flex flex-col justify-between">
        <div>
          {/* Category */}
          {workflow.category && (
            <span className="text-[11px] text-[#595959] font-medium block truncate">
              {workflow.category.name}
            </span>
          )}

          {/* Title */}
          <Link href={`/workflows/${workflow.slug}`} className="block group-hover:text-[#f1641e] transition-colors">
            <h3 className="text-sm font-medium text-[#222222] line-clamp-2 leading-snug">
              {workflow.title}
            </h3>
          </Link>
        </div>

        {/* Reviews & Time */}
        <div className="flex items-center gap-1 text-xs text-[#222222] pt-1">
          <div className="flex text-[#f1641e]">
            {"★★★★★".split("").map((s, i) => (
              <span key={i} className="text-xs">{s}</span>
            ))}
          </div>
          <span className="text-[11px] text-[#595959]">
            ({(workflow.views % 40) + 12})
          </span>
          <span className="text-[#d6d6d6] mx-1">•</span>
          <span className="text-[11px] text-[#595959]">{workflow.estimatedTime}</span>
        </div>

        {/* Price & Action Row */}
        <div className="flex items-center justify-between pt-2 mt-auto border-t border-[#f6f6f6]">
          <div>
            <span className="text-sm font-semibold text-[#222222]">
              {workflow.price || "Free Template"}
            </span>
            <span className="block text-[10px] text-[#258635] font-medium">
              ✓ Instant Blueprint
            </span>
          </div>

          <Link href={`/workflows/${workflow.slug}`}>
            <Button
              variant="default"
              size="sm"
              className="h-8 px-3 rounded-full text-xs font-semibold bg-[#f1641e] hover:bg-[#d44e0d] text-white"
            >
              <span>Explore</span>
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
