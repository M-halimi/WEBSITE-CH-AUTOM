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
<<<<<<< HEAD
  Layers, 
=======
  Layers,
>>>>>>> 7ee9ca6f04322930ec29228c493ddb72ee250ce5
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
<<<<<<< HEAD
          label: "Trigger Event",
          badgeVariant: "default" as const,
          nodeBg: "bg-[#ffd233] text-black shadow-xs",
=======
          label: "Trigger",
          badgeVariant: "orange" as const,
          nodeBg: "bg-[#f1641e] text-white",
>>>>>>> 7ee9ca6f04322930ec29228c493ddb72ee250ce5
          icon: Zap,
        };
      case "ACTION":
        return {
<<<<<<< HEAD
          label: "Action Node",
          badgeVariant: "outline" as const,
          nodeBg: "bg-card text-foreground border border-border shadow-xs",
=======
          label: "Action",
          badgeVariant: "default" as const,
          nodeBg: "bg-white text-[#222222] border border-[#d6d6d6]",
>>>>>>> 7ee9ca6f04322930ec29228c493ddb72ee250ce5
          icon: Zap,
        };
      case "CONDITION":
        return {
<<<<<<< HEAD
          label: "Branch / Filter",
          badgeVariant: "secondary" as const,
          nodeBg: "bg-amber-100 dark:bg-amber-950/50 text-amber-800 dark:text-amber-300",
=======
          label: "Condition / Router",
          badgeVariant: "cream" as const,
          nodeBg: "bg-[#fdf6e8] text-[#a66523] border border-[#f5e8c8]",
>>>>>>> 7ee9ca6f04322930ec29228c493ddb72ee250ce5
          icon: GitBranch,
        };
      case "TRANSFORM":
        return {
          label: "Data Transform",
<<<<<<< HEAD
          badgeVariant: "outline" as const,
          nodeBg: "bg-muted text-foreground",
=======
          badgeVariant: "default" as const,
          nodeBg: "bg-white text-[#222222] border border-[#d6d6d6]",
>>>>>>> 7ee9ca6f04322930ec29228c493ddb72ee250ce5
          icon: Shuffle,
        };
      case "NOTIFICATION":
        return {
          label: "Alert / Notification",
<<<<<<< HEAD
          badgeVariant: "default" as const,
          nodeBg: "bg-[#ffd233] text-black",
=======
          badgeVariant: "orange" as const,
          nodeBg: "bg-[#f1641e] text-white",
>>>>>>> 7ee9ca6f04322930ec29228c493ddb72ee250ce5
          icon: Bell,
        };
      default:
        return {
          label: type,
<<<<<<< HEAD
          badgeVariant: "outline" as const,
          nodeBg: "bg-card text-foreground border border-border",
=======
          badgeVariant: "default" as const,
          nodeBg: "bg-white text-[#222222] border border-[#d6d6d6]",
>>>>>>> 7ee9ca6f04322930ec29228c493ddb72ee250ce5
          icon: Layers,
        };
    }
  };

  if (sortedSteps.length === 0) {
    return (
<<<<<<< HEAD
      <div className="rounded-3xl border border-border p-8 text-center bg-card">
        <p className="text-xs text-muted-foreground">No visual steps defined for this workflow yet.</p>
=======
      <div className="rounded-[8px] border border-[#d6d6d6] p-8 text-center bg-[#f6f6f6]">
        <p className="text-sm text-[#595959]">No visual steps defined for this workflow yet.</p>
>>>>>>> 7ee9ca6f04322930ec29228c493ddb72ee250ce5
      </div>
    );
  }

  return (
    <div className="w-full">
<<<<<<< HEAD
      <div className="relative pl-6 sm:pl-10 space-y-6 before:absolute before:left-3 sm:before:left-5 before:top-4 before:bottom-4 before:w-0.5 before:bg-border">
=======
      <div className="relative pl-6 sm:pl-10 space-y-5 before:absolute before:left-3 sm:before:left-5 before:top-4 before:bottom-4 before:w-0.5 before:bg-[#d6d6d6]">
>>>>>>> 7ee9ca6f04322930ec29228c493ddb72ee250ce5
        {sortedSteps.map((step, idx) => {
          const meta = getStepTypeMeta(step.type);
          const IconComponent = meta.icon;
          const isLast = idx === sortedSteps.length - 1;

          return (
            <div key={step.id || idx} className="relative group">
              {/* Timeline Indicator Circle */}
              <div
<<<<<<< HEAD
                className={`absolute -left-6 sm:-left-10 top-4 h-6 w-6 sm:h-8 sm:w-8 rounded-full ${meta.nodeBg} flex items-center justify-center font-bold text-xs shadow-xs`}
=======
                className={`absolute -left-6 sm:-left-10 top-3 h-6 w-6 sm:h-8 sm:w-8 rounded-full ${meta.nodeBg} flex items-center justify-center font-bold text-xs shadow-sm`}
>>>>>>> 7ee9ca6f04322930ec29228c493ddb72ee250ce5
              >
                <IconComponent className="h-3 w-3 sm:h-4 sm:w-4" />
              </div>

<<<<<<< HEAD
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
=======
              {/* Step Card Content on Clean White */}
              <div className="rounded-[8px] border border-[#d6d6d6] bg-white p-5 sm:p-6 transition-all hover:border-[#222222] shadow-sm">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 mb-2.5 border-b border-[#f6f6f6]">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="text-xs font-semibold uppercase tracking-wider text-[#595959]">
                      Step {step.order}
                    </span>
                    <Badge variant={meta.badgeVariant} className="text-[11px] font-semibold">
                      {meta.label}
                    </Badge>
                    {step.appName && (
                      <span className="inline-flex items-center px-2 py-0.5 rounded-[4px] text-[11px] font-medium bg-[#f6f6f6] text-[#222222] border border-[#e6e6e6]">
>>>>>>> 7ee9ca6f04322930ec29228c493ddb72ee250ce5
                        {step.appName}
                      </span>
                    )}
                  </div>
                </div>

<<<<<<< HEAD
                <h4 className="text-base sm:text-lg font-bold text-foreground">
=======
                <h4 className="text-base font-semibold text-[#222222] mb-1">
>>>>>>> 7ee9ca6f04322930ec29228c493ddb72ee250ce5
                  {step.name}
                </h4>

                {step.description && (
<<<<<<< HEAD
                  <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
=======
                  <p className="text-xs sm:text-sm text-[#595959] leading-relaxed">
>>>>>>> 7ee9ca6f04322930ec29228c493ddb72ee250ce5
                    {step.description}
                  </p>
                )}
              </div>

<<<<<<< HEAD
              {!isLast && (
                <div className="flex justify-center -mb-2 mt-1 sm:hidden opacity-40">
                  <ArrowDown className="h-4 w-4 text-muted-foreground" />
=======
              {/* Down arrow on mobile */}
              {!isLast && (
                <div className="flex justify-center -mb-2 mt-1 sm:hidden opacity-30">
                  <ArrowDown className="h-4 w-4 text-[#595959]" />
>>>>>>> 7ee9ca6f04322930ec29228c493ddb72ee250ce5
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
