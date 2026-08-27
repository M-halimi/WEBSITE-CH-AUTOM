"use client";

import * as React from "react";
import { 
  Zap, 
  Bot, 
  GitBranch, 
  Database, 
  Bell, 
  Shuffle, 
  CheckCircle2, 
  ArrowDown,
  Sparkles,
  Layers,
  Settings2
} from "lucide-react";
import { Badge } from "@/components/ui/badge";

export interface StepItem {
  id?: string;
  order: number;
  name: string;
  type: string; // TRIGGER, ACTION, CONDITION, TRANSFORM, NOTIFICATION
  description?: string | null;
  appName?: string | null;
  icon?: string | null;
}

interface WorkflowViewerProps {
  steps: StepItem[];
  workflowTitle?: string;
}

export function WorkflowViewer({ steps, workflowTitle }: WorkflowViewerProps) {
  const sortedSteps = [...steps].sort((a, b) => a.order - b.order);

  const getStepTypeMeta = (type: string) => {
    switch (type.toUpperCase()) {
      case "TRIGGER":
        return {
          label: "Trigger",
          variant: "warning" as const,
          color: "border-amber-500/40 bg-amber-500/10 text-amber-500",
          nodeBg: "bg-amber-500",
          nodeRing: "ring-amber-500/20",
          icon: Zap,
        };
      case "ACTION":
        return {
          label: "Action",
          variant: "success" as const,
          color: "border-emerald-500/40 bg-emerald-500/10 text-emerald-500",
          nodeBg: "bg-emerald-500",
          nodeRing: "ring-emerald-500/20",
          icon: Sparkles,
        };
      case "CONDITION":
        return {
          label: "Condition / Router",
          variant: "purple" as const,
          color: "border-purple-500/40 bg-purple-500/10 text-purple-500",
          nodeBg: "bg-purple-500",
          nodeRing: "ring-purple-500/20",
          icon: GitBranch,
        };
      case "TRANSFORM":
        return {
          label: "Transform",
          variant: "info" as const,
          color: "border-sky-500/40 bg-sky-500/10 text-sky-500",
          nodeBg: "bg-sky-500",
          nodeRing: "ring-sky-500/20",
          icon: Shuffle,
        };
      case "NOTIFICATION":
        return {
          label: "Notification",
          variant: "secondary" as const,
          color: "border-pink-500/40 bg-pink-500/10 text-pink-500",
          nodeBg: "bg-pink-500",
          nodeRing: "ring-pink-500/20",
          icon: Bell,
        };
      default:
        return {
          label: type,
          variant: "secondary" as const,
          color: "border-zinc-500/40 bg-zinc-500/10 text-zinc-400",
          nodeBg: "bg-zinc-500",
          nodeRing: "ring-zinc-500/20",
          icon: Layers,
        };
    }
  };

  if (sortedSteps.length === 0) {
    return (
      <div className="rounded-2xl border border-dashed border-border p-8 text-center bg-muted/20">
        <p className="text-sm text-muted-foreground">No visual steps defined for this workflow yet.</p>
      </div>
    );
  }

  return (
    <div className="w-full">
      <div className="relative pl-6 sm:pl-10 space-y-6 sm:space-y-8 before:absolute before:left-3 sm:before:left-5 before:top-4 before:bottom-4 before:w-0.5 before:bg-gradient-to-b before:from-amber-500 before:via-emerald-500 before:to-pink-500">
        {sortedSteps.map((step, idx) => {
          const meta = getStepTypeMeta(step.type);
          const IconComponent = meta.icon;
          const isLast = idx === sortedSteps.length - 1;

          return (
            <div key={step.id || idx} className="relative group">
              {/* Step circle on the timeline */}
              <div
                className={`absolute -left-6 sm:-left-10 top-3 h-6 w-6 sm:h-8 sm:w-8 rounded-full ${meta.nodeBg} text-white flex items-center justify-center font-bold text-xs shadow-md ring-4 ${meta.nodeRing} group-hover:scale-110 transition-transform`}
              >
                <IconComponent className="h-3 w-3 sm:h-4 sm:w-4" />
              </div>

              {/* Step Card Content */}
              <div className="rounded-2xl border border-border bg-card p-5 sm:p-6 shadow-sm hover:shadow-md hover:border-primary/40 transition-all duration-200">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 mb-3 border-b border-border/50">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                      Step {step.order}
                    </span>
                    <Badge variant={meta.variant} className="text-[11px] font-semibold uppercase tracking-wider">
                      {meta.label}
                    </Badge>
                    {step.appName && (
                      <span className="inline-flex items-center px-2 py-0.5 rounded text-[11px] font-medium bg-muted text-foreground border border-border">
                        {step.appName}
                      </span>
                    )}
                  </div>
                </div>

                <h4 className="text-base sm:text-lg font-bold text-foreground mb-1.5 flex items-center gap-2">
                  {step.name}
                </h4>

                {step.description && (
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {step.description}
                  </p>
                )}
              </div>

              {/* Down connector arrow on mobile */}
              {!isLast && (
                <div className="flex justify-center -mb-2 mt-1 sm:hidden opacity-40">
                  <ArrowDown className="h-4 w-4 text-muted-foreground" />
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

