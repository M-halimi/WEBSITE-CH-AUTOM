import Link from "next/link";
import {
  Zap,
  Layers,
  Clock,
  ArrowRight,
  Eye,
  CheckCircle2,
  Flame,
  MessageSquare,
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
}

export function WorkflowCard({ workflow }: WorkflowCardProps) {
  const getDifficultyBadge = (difficulty: string) => {
    switch (difficulty.toUpperCase()) {
      case "BEGINNER":
        return <Badge variant="success">Beginner</Badge>;
      case "INTERMEDIATE":
        return <Badge variant="warning">Intermediate</Badge>;
      case "ADVANCED":
        return <Badge variant="destructive">Advanced</Badge>;
      default:
        return <Badge variant="secondary">{difficulty}</Badge>;
    }
  };

  return (
    <div className="group relative flex flex-col justify-between rounded-2xl border border-border bg-card p-6 shadow-sm hover:shadow-xl hover:border-primary/40 hover:-translate-y-1 transition-all duration-300">
      <div>
        {/* Top Badges */}
        <div className="flex items-center justify-between gap-2 mb-4">
          <div className="flex items-center gap-1.5 flex-wrap">
            {workflow.featured && (
              <Badge
                variant="glow"
                className="bg-amber-500/15 text-amber-600 dark:text-amber-400 border border-amber-500/30 gap-1 font-semibold"
              >
                <Flame className="h-3 w-3 fill-current" /> Featured
              </Badge>
            )}
            {workflow.category && (
              <Badge variant="outline" className="text-xs bg-muted/40">
                {workflow.category.name}
              </Badge>
            )}
          </div>
          <div>{getDifficultyBadge(workflow.difficulty)}</div>
        </div>

        {/* Title */}
        <Link
          href={`/workflows/${workflow.slug}`}
          className="block group-hover:text-primary transition-colors"
        >
          <h3 className="text-lg font-bold tracking-tight text-foreground leading-snug line-clamp-2 mb-2">
            {workflow.title}
          </h3>
        </Link>

        {/* Summary */}
        <p className="text-xs text-muted-foreground line-clamp-3 leading-relaxed mb-5">
          {workflow.summary}
        </p>

        {/* Platforms */}
        {workflow.platforms && workflow.platforms.length > 0 && (
          <div className="flex items-center gap-1.5 flex-wrap mb-5">
            {workflow.platforms.map(({ platform }) => (
              <span
                key={platform.id}
                className="inline-flex items-center px-2 py-0.5 rounded-md text-[11px] font-medium bg-muted text-muted-foreground border border-border/60"
              >
                {platform.name}
              </span>
            ))}
          </div>
        )}
      </div>

      {/* Footer info & CTA */}
      <div className="pt-4 border-t border-border/60 mt-auto">
        <div className="flex items-center justify-between text-xs text-muted-foreground mb-4">
          <span className="flex items-center gap-1">
            <Layers className="h-3.5 w-3.5 text-primary" />
            <strong className="text-foreground">
              {workflow.stepsCount || workflow.steps?.length || 0}
            </strong>{" "}
            Steps
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

        <div className="flex items-center gap-2">
          <Link href={`/workflows/${workflow.slug}`} className="flex-1">
            <Button
              variant="default"
              size="sm"
              className="w-full justify-between group-hover:bg-primary/90 text-xs"
            >
              <span>View Workflow</span>
              <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
