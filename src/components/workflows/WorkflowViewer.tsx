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
  Layers
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
          label: "Trigger",
          variant: "red" as const,
          nodeBg: "bg-[#e50914]",
          icon: Zap,
        };
      case "ACTION":
        return {
          label: "Action",
          variant: "default" as const,
          nodeBg: "bg-[#2d2d2d]",
          icon: Zap,
        };
      case "CONDITION":
        return {
          label: "Condition / Router",
          variant: "default" as const,
          nodeBg: "bg-[#2d2d2d]",
          icon: GitBranch,
        };
      case "TRANSFORM":
        return {
          label: "Transform",
          variant: "default" as const,
          nodeBg: "bg-[#2d2d2d]",
          icon: Shuffle,
        };
      case "NOTIFICATION":
        return {
          label: "Notification",
          variant: "default" as const,
          nodeBg: "bg-[#e50914]",
          icon: Bell,
        };
      default:
        return {
          label: type,
          variant: "default" as const,
          nodeBg: "bg-[#2d2d2d]",
          icon: Layers,
        };
    }
  };

  if (sortedSteps.length === 0) {
    return (
      <div className="rounded-[8px] border border-[#414141] p-8 text-center bg-[#161616]">
        <p className="text-sm text-[#808080]">No visual steps defined for this workflow yet.</p>
      </div>
    );
  }

  return (
    <div className="w-full">
      <div className="relative pl-6 sm:pl-10 space-y-6 before:absolute before:left-3 sm:before:left-5 before:top-4 before:bottom-4 before:w-0.5 before:bg-[#414141]">
        {sortedSteps.map((step, idx) => {
          const meta = getStepTypeMeta(step.type);
          const IconComponent = meta.icon;
          const isLast = idx === sortedSteps.length - 1;

          return (
            <div key={step.id || idx} className="relative group">
              {/* Step circle on the timeline */}
              <div
                className={`absolute -left-6 sm:-left-10 top-3 h-6 w-6 sm:h-8 sm:w-8 rounded-[8px] ${meta.nodeBg} text-white flex items-center justify-center font-bold text-xs shadow-none border border-[#414141]`}
              >
                <IconComponent className="h-3 w-3 sm:h-4 sm:w-4" />
              </div>

              {/* Step Card Content on #232323 */}
              <div className="rounded-[8px] border border-[#414141] bg-[#232323] p-5 sm:p-6 transition-colors hover:border-[#808080]">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 mb-3 border-b border-[#414141]/60">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="text-xs font-bold uppercase tracking-wider text-[#808080]">
                      Step {step.order}
                    </span>
                    <Badge variant={meta.variant} className="text-[11px] font-medium uppercase tracking-wider">
                      {meta.label}
                    </Badge>
                    {step.appName && (
                      <span className="inline-flex items-center px-2 py-0.5 rounded-[4px] text-[11px] font-normal bg-[#161616] text-white border border-[#414141]">
                        {step.appName}
                      </span>
                    )}
                  </div>
                </div>

                <h4 className="text-base sm:text-lg font-medium text-white mb-1.5 flex items-center gap-2">
                  {step.name}
                </h4>

                {step.description && (
                  <p className="text-sm text-[#808080] leading-relaxed">
                    {step.description}
                  </p>
                )}
              </div>

              {/* Down connector arrow on mobile */}
              {!isLast && (
                <div className="flex justify-center -mb-2 mt-1 sm:hidden opacity-40">
                  <ArrowDown className="h-4 w-4 text-[#808080]" />
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
