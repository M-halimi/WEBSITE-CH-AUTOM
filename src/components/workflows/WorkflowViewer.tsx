"use client";

import * as React from "react";
import { 
  Zap, 
  Bot, 
  GitBranch, 
  Database, 
  Bell, 
  Shuffle, 
  ArrowDown,
  Layers, 
  CheckCircle2
} from "lucide-react";
import { Badge } from "@/components/ui/badge";

export interface StepItem {
  id?: string;
  order: number;
  name: string;
  type: string;
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
          label: "Trigger Event",
          badgeVariant: "default" as const,
          nodeBg: "bg-[#ffd233] text-black shadow-xs",
          icon: Zap,
        };
      case "ACTION":
        return {
          label: "Action Node",
          badgeVariant: "outline" as const,
          nodeBg: "bg-card text-foreground border border-border shadow-xs",
          icon: Zap,
        };
      case "CONDITION":
        return {
          label: "Branch / Filter",
          badgeVariant: "secondary" as const,
          nodeBg: "bg-amber-100 dark:bg-amber-950/50 text-amber-800 dark:text-amber-300",
          icon: GitBranch,
        };
      case "TRANSFORM":
        return {
          label: "Data Transform",
          badgeVariant: "outline" as const,
          nodeBg: "bg-muted text-foreground",
          icon: Shuffle,
        };
      case "NOTIFICATION":
        return {
          label: "Alert / Notification",
          badgeVariant: "default" as const,
          nodeBg: "bg-[#ffd233] text-black",
          icon: Bell,
        };
      default:
        return {
          label: type,
          badgeVariant: "outline" as const,
          nodeBg: "bg-card text-foreground border border-border",
          icon: Layers,
        };
    }
  };

  if (sortedSteps.length === 0) {
    return (
      <div className="rounded-3xl border border-border p-8 text-center bg-card">
        <p className="text-xs text-muted-foreground">No visual steps defined for this workflow yet.</p>
      </div>
    );
  }

  return (
    <div className="w-full">
      <div className="relative pl-6 sm:pl-10 space-y-6 before:absolute before:left-3 sm:before:left-5 before:top-4 before:bottom-4 before:w-0.5 before:bg-border">
        {sortedSteps.map((step, idx) => {
          const meta = getStepTypeMeta(step.type);
          const IconComponent = meta.icon;
          const isLast = idx === sortedSteps.length - 1;

          return (
            <div key={step.id || idx} className="relative group">
              {/* Timeline Indicator Circle */}
              <div
                className={`absolute -left-6 sm:-left-10 top-4 h-6 w-6 sm:h-8 sm:w-8 rounded-full ${meta.nodeBg} flex items-center justify-center font-bold text-xs shadow-xs`}
              >
                <IconComponent className="h-3 w-3 sm:h-4 sm:w-4" />
              </div>

              {/* Node Card */}
              <div className="rounded-3xl border border-border bg-card p-5 sm:p-6 transition-all hover:border-amber-300 shadow-sm space-y-3 modern-saas-card">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-2 border-b border-border">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                      Step {step.order}
                    </span>
                    <Badge variant={meta.badgeVariant} className="text-[11px]">
                      {meta.label}
                    </Badge>
                    {step.appName && (
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-muted border border-border text-foreground">
                        {step.appName}
                      </span>
                    )}
                  </div>
                </div>

                <h4 className="text-base sm:text-lg font-bold text-foreground">
                  {step.name}
                </h4>

                {step.description && (
                  <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                    {step.description}
                  </p>
                )}
              </div>

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
