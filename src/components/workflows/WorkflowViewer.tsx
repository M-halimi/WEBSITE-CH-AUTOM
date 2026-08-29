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
  CheckCircle2,
  Sparkles,
  Cpu,
  Clock,
  ArrowRight,
  ShieldCheck
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
  summary?: string;
}

export function WorkflowViewer({ steps, workflowTitle, summary }: WorkflowViewerProps) {
  const [viewMode, setViewMode] = React.useState<"SIMPLE" | "ADVANCED">("SIMPLE");
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
    <div className="w-full space-y-6">
      {/* Explanation Mode Toggle */}
      <div className="flex items-center justify-between p-2 rounded-2xl bg-muted/40 dark:bg-[#141418] border border-border dark:border-[#22222a] flex-wrap gap-2">
        <div className="flex items-center gap-1.5 p-1 rounded-xl bg-background dark:bg-[#1c1c24] border border-border dark:border-[#2a2a34]">
          <button
            type="button"
            onClick={() => setViewMode("SIMPLE")}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 ${
              viewMode === "SIMPLE"
                ? "bg-[#ffd233] text-black shadow-xs"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            <Sparkles className="h-3.5 w-3.5" />
            <span>💡 Simple View (للتجار - شرح مبسط)</span>
          </button>

          <button
            type="button"
            onClick={() => setViewMode("ADVANCED")}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 ${
              viewMode === "ADVANCED"
                ? "bg-[#ffd233] text-black shadow-xs"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            <Cpu className="h-3.5 w-3.5" />
            <span>⚙️ Advanced Node Specs (للمهندسين)</span>
          </button>
        </div>

        <span className="text-[11px] text-muted-foreground hidden sm:block">
          {viewMode === "SIMPLE" ? "Zero technical jargon • Plain language flow" : `${sortedSteps.length} Connected Nodes`}
        </span>
      </div>

      {/* 1. SIMPLE VIEW (FOR NON-TECHNICAL CLIENTS) */}
      {viewMode === "SIMPLE" ? (
        <div className="space-y-4">
          {/* 3-Step Simple Graphic */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-5 rounded-3xl bg-card dark:bg-[#141418] border border-border dark:border-[#22222a] space-y-2 shadow-xs relative">
              <span className="text-[10px] font-black uppercase tracking-wider text-amber-600 dark:text-[#ffd233] bg-amber-500/10 px-2.5 py-0.5 rounded-full border border-amber-500/20">
                1. When this happens
              </span>
              <h4 className="text-sm font-bold text-foreground dark:text-white">
                {sortedSteps[0]?.name || "Customer Trigger"}
              </h4>
              <p className="text-xs text-muted-foreground dark:text-[#8e8e93] leading-relaxed">
                {sortedSteps[0]?.description || "New inquiry, order placed, or lead submitted."}
              </p>
            </div>

            <div className="p-5 rounded-3xl bg-card dark:bg-[#141418] border border-border dark:border-[#22222a] space-y-2 shadow-xs relative">
              <span className="text-[10px] font-black uppercase tracking-wider text-sky-600 dark:text-sky-400 bg-sky-500/10 px-2.5 py-0.5 rounded-full border border-sky-500/20">
                2. System Automatically Does
              </span>
              <h4 className="text-sm font-bold text-foreground dark:text-white">
                {sortedSteps[1]?.name || "AI Extraction & Processing"}
              </h4>
              <p className="text-xs text-muted-foreground dark:text-[#8e8e93] leading-relaxed">
                {sortedSteps[1]?.description || "Parses customer data, checks inventory, and formats response."}
              </p>
            </div>

            <div className="p-5 rounded-3xl bg-card dark:bg-[#141418] border border-emerald-500/30 bg-emerald-500/5 dark:bg-[#101814] space-y-2 shadow-xs relative">
              <span className="text-[10px] font-black uppercase tracking-wider text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 px-2.5 py-0.5 rounded-full border border-emerald-500/20">
                3. Final Instant Result
              </span>
              <h4 className="text-sm font-bold text-foreground dark:text-white">
                {sortedSteps[sortedSteps.length - 1]?.name || "Instant Confirmation & Sync"}
              </h4>
              <p className="text-xs text-muted-foreground dark:text-[#8e8e93] leading-relaxed">
                {sortedSteps[sortedSteps.length - 1]?.description || "WhatsApp message sent and Google Sheets / CRM updated."}
              </p>
            </div>
          </div>

          {/* Simple Value Box */}
          <div className="p-5 rounded-3xl bg-muted/30 dark:bg-[#16161e] border border-border dark:border-[#26262e] grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div className="flex items-start gap-3">
              <Clock className="h-5 w-5 text-amber-600 dark:text-[#ffd233] shrink-0 mt-0.5" />
              <div>
                <strong className="text-foreground dark:text-white block font-bold">Saves 2–4 Hours Daily:</strong>
                <span className="text-muted-foreground">Eliminates manual copy-pasting, customer verification calls, and Excel typing.</span>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <ShieldCheck className="h-5 w-5 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
              <div>
                <strong className="text-foreground dark:text-white block font-bold">Zero Human Mistake:</strong>
                <span className="text-muted-foreground">Addresses, invoice numbers, and phone numbers are verified 100% automatically.</span>
              </div>
            </div>
          </div>
        </div>
      ) : (
        /* 2. ADVANCED VIEW (INTERACTIVE TIMELINE NODES) */
        <div className="relative pl-6 sm:pl-10 space-y-6 before:absolute before:left-3 sm:before:left-5 before:top-4 before:bottom-4 before:w-0.5 before:bg-border dark:before:bg-[#22222a]">
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
                <div className="rounded-3xl border border-border dark:border-[#22222a] bg-card dark:bg-[#141418] p-5 sm:p-6 transition-all hover:border-[#ffd233]/40 shadow-sm space-y-3 modern-saas-card">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-2 border-b border-border dark:border-[#22222a]">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                        Step {step.order}
                      </span>
                      <Badge variant={meta.badgeVariant} className="text-[11px]">
                        {meta.label}
                      </Badge>
                      {step.appName && (
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-muted dark:bg-[#1e1e26] border border-border dark:border-[#26262e] text-foreground dark:text-white">
                          {step.appName}
                        </span>
                      )}
                    </div>
                  </div>

                  <h4 className="text-base sm:text-lg font-bold text-foreground dark:text-white">
                    {step.name}
                  </h4>

                  {step.description && (
                    <p className="text-xs sm:text-sm text-muted-foreground dark:text-[#8e8e93] leading-relaxed">
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
      )}
    </div>
  );
}
