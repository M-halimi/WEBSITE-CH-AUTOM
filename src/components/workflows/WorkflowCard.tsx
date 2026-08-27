import Link from "next/link";
import { 
  Layers, 
  Clock, 
  ArrowRight, 
  Eye, 
  Flame,
  Zap
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

export function WorkflowCard({ workflow, rank }: WorkflowCardProps) {
  return (
    <div className="group relative flex flex-col justify-between rounded-[8px] border border-[#414141] bg-[#232323] p-6 transition-colors duration-200 hover:border-[#808080]">
      <div>
        {/* Top Badges */}
        <div className="flex items-center justify-between gap-2 mb-4">
          <div className="flex items-center gap-1.5 flex-wrap">
            {workflow.featured && (
              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-[4px] text-[11px] font-bold bg-[#e50914] text-white">
                <Flame className="h-3 w-3 fill-current" /> TOP
              </span>
            )}
            {workflow.category && (
              <span className="inline-flex items-center px-2 py-0.5 rounded-[4px] text-[11px] font-medium bg-[#161616] text-[#808080] border border-[#414141]">
                {workflow.category.name}
              </span>
            )}
          </div>
          <span className="text-[11px] uppercase tracking-wider text-[#808080] font-medium">
            {workflow.difficulty}
          </span>
        </div>

        {/* Title */}
        <Link href={`/workflows/${workflow.slug}`} className="block group-hover:text-[#e50914] transition-colors">
          <h3 className="text-lg font-medium tracking-tight text-white leading-snug line-clamp-2 mb-2">
            {workflow.title}
          </h3>
        </Link>

        {/* Summary */}
        <p className="text-xs text-[#808080] line-clamp-3 leading-relaxed mb-5">
          {workflow.summary}
        </p>

        {/* Platforms */}
        {workflow.platforms && workflow.platforms.length > 0 && (
          <div className="flex items-center gap-1.5 flex-wrap mb-5">
            {workflow.platforms.map(({ platform }) => (
              <span
                key={platform.id}
                className="inline-flex items-center px-2 py-0.5 rounded-[4px] text-[11px] font-normal bg-[#161616] text-white border border-[#414141]"
              >
                {platform.name}
              </span>
            ))}
          </div>
        )}
      </div>

      {/* Footer info & CTA */}
      <div className="pt-4 border-t border-[#414141] mt-auto">
        <div className="flex items-center justify-between text-xs text-[#808080] mb-4">
          <span className="flex items-center gap-1">
            <Layers className="h-3.5 w-3.5 text-[#e50914]" />
            <strong className="text-white">{workflow.stepsCount || workflow.steps?.length || 0}</strong> Steps
          </span>
          <span className="flex items-center gap-1">
            <Clock className="h-3.5 w-3.5" />
            {workflow.estimatedTime}
          </span>
          <span className="flex items-center gap-1">
            <Eye className="h-3.5 w-3.5" />
            {workflow.views} views
          </span>
        </div>

        <Link href={`/workflows/${workflow.slug}`} className="block w-full">
          <Button variant="default" size="sm" className="w-full justify-between font-medium text-xs rounded-[8px]">
            <span>Explore Workflow</span>
            <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
          </Button>
        </Link>
      </div>
    </div>
  );
}
