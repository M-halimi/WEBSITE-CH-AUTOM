"use client";

import * as React from "react";
import { ChevronDown, TrendingUp } from "lucide-react";

interface ActivityChartProps {
  initialTotal?: string;
}

export function ActivityChart({ initialTotal = "$19,270.56" }: ActivityChartProps) {
  const [activeTab, setActiveTab] = React.useState<"runs" | "leads" | "views">("runs");
  const [timeRange, setTimeRange] = React.useState<"weekly" | "monthly">("weekly");

  const dataMap = {
    runs: {
      total: "$19,270.56",
      subtext: "1,420 node executions this week",
      bars: [
        { label: "Mon", height: "45%", value: "480 runs", active: false },
        { label: "Tue", height: "65%", value: "720 runs", active: false },
        { label: "Wed", height: "35%", value: "390 runs", active: false },
        { label: "Thu", height: "75%", value: "850 runs", active: false },
        { label: "Fri", height: "55%", value: "620 runs", active: false },
        { label: "Sat", height: "92%", value: "$16,251 (1,420 runs)", active: true },
        { label: "Sun", height: "68%", value: "790 runs", active: false },
        { label: "Mon", height: "58%", value: "640 runs", active: false },
        { label: "Tue", height: "42%", value: "460 runs", active: false },
        { label: "Wed", height: "70%", value: "810 runs", active: false },
      ],
    },
    leads: {
      total: "42 Inquiries",
      subtext: "8 new client requests this week",
      bars: [
        { label: "Mon", height: "30%", value: "3 leads", active: false },
        { label: "Tue", height: "50%", value: "5 leads", active: false },
        { label: "Wed", height: "25%", value: "2 leads", active: false },
        { label: "Thu", height: "80%", value: "9 leads", active: false },
        { label: "Fri", height: "40%", value: "4 leads", active: false },
        { label: "Sat", height: "95%", value: "12 VIP Leads", active: true },
        { label: "Sun", height: "60%", value: "6 leads", active: false },
        { label: "Mon", height: "45%", value: "4 leads", active: false },
        { label: "Tue", height: "35%", value: "3 leads", active: false },
        { label: "Wed", height: "65%", value: "7 leads", active: false },
      ],
    },
    views: {
      total: "3,840 Views",
      subtext: "+28% catalog engagement",
      bars: [
        { label: "Mon", height: "50%", value: "340 views", active: false },
        { label: "Tue", height: "70%", value: "490 views", active: false },
        { label: "Wed", height: "45%", value: "290 views", active: false },
        { label: "Thu", height: "60%", value: "410 views", active: false },
        { label: "Fri", height: "75%", value: "520 views", active: false },
        { label: "Sat", height: "96%", value: "890 views", active: true },
        { label: "Sun", height: "80%", value: "610 views", active: false },
        { label: "Mon", height: "55%", value: "380 views", active: false },
        { label: "Tue", height: "40%", value: "260 views", active: false },
        { label: "Wed", height: "68%", value: "480 views", active: false },
      ],
    },
  };

  const current = dataMap[activeTab];

  return (
    <div className="rounded-2xl bg-card dark:bg-[#141418] border border-border dark:border-[#22222a] p-5 sm:p-6 space-y-6 shadow-xs transition-colors duration-300">
      {/* Header & Controls */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <span className="text-xs text-muted-foreground dark:text-[#8e8e93] font-semibold block">Workflow Activity Flow</span>
          <div className="text-2xl sm:text-3xl font-black text-foreground dark:text-white tracking-tight mt-0.5 flex items-center gap-2">
            <span>{current.total}</span>
            <span className="inline-flex items-center text-[10px] font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-full border border-emerald-500/20">
              <TrendingUp className="h-3 w-3 mr-1" /> +18.4%
            </span>
          </div>
          <span className="text-[11px] text-muted-foreground dark:text-[#71717a]">{current.subtext}</span>
        </div>

        <div className="flex items-center gap-2 flex-wrap">
          {/* Tab Switcher */}
          <div className="flex items-center bg-muted dark:bg-[#1b1b22] border border-border dark:border-[#26262e] rounded-xl p-0.5 text-xs">
            <button
              type="button"
              onClick={() => setActiveTab("runs")}
              className={`px-3 py-1 rounded-lg font-bold transition-all ${
                activeTab === "runs"
                  ? "bg-[#ffd233] text-black shadow-xs"
                  : "text-muted-foreground dark:text-[#8e8e93] hover:text-foreground dark:hover:text-white"
              }`}
            >
              Runs
            </button>
            <button
              type="button"
              onClick={() => setActiveTab("leads")}
              className={`px-3 py-1 rounded-lg font-bold transition-all ${
                activeTab === "leads"
                  ? "bg-[#ffd233] text-black shadow-xs"
                  : "text-muted-foreground dark:text-[#8e8e93] hover:text-foreground dark:hover:text-white"
              }`}
            >
              Leads
            </button>
            <button
              type="button"
              onClick={() => setActiveTab("views")}
              className={`px-3 py-1 rounded-lg font-bold transition-all ${
                activeTab === "views"
                  ? "bg-[#ffd233] text-black shadow-xs"
                  : "text-muted-foreground dark:text-[#8e8e93] hover:text-foreground dark:hover:text-white"
              }`}
            >
              Views
            </button>
          </div>

          {/* Time Range Selector */}
          <button
            type="button"
            onClick={() => setTimeRange(timeRange === "weekly" ? "monthly" : "weekly")}
            className="h-8 px-3 rounded-xl bg-card dark:bg-[#1b1b22] border border-border dark:border-[#26262e] text-xs font-semibold text-muted-foreground dark:text-[#8e8e93] inline-flex items-center gap-1.5 hover:text-foreground dark:hover:text-white transition-colors shadow-xs"
          >
            <span className="capitalize">{timeRange}</span>
            <ChevronDown className="h-3.5 w-3.5" />
          </button>
        </div>
      </div>

      {/* Visual Bar Chart Grid */}
      <div className="relative pt-8 pb-2">
        <div className="h-48 w-full flex items-end justify-between gap-2 sm:gap-3 px-2">
          {current.bars.map((bar, idx) => (
            <div
              key={idx}
              className="flex-1 h-full flex flex-col justify-end items-center gap-2.5 group relative"
            >
              {/* Tooltip Badge on Active Peak Bar */}
              {bar.active ? (
                <div className="absolute -top-7 px-2.5 py-1 rounded-lg bg-card dark:bg-[#202028] border border-[#ffd233] text-amber-700 dark:text-[#ffd233] text-[10px] font-black shadow-lg shadow-[#ffd233]/25 z-10 whitespace-nowrap animate-bounce">
                  {bar.value}
                </div>
              ) : (
                <div className="opacity-0 group-hover:opacity-100 transition-opacity absolute -top-6 px-2 py-0.5 rounded-md bg-card dark:bg-[#22222c] border border-border dark:border-[#32323e] text-foreground dark:text-white text-[9px] font-bold z-10 whitespace-nowrap pointer-events-none shadow-md">
                  {bar.value}
                </div>
              )}

              {/* The Rendered Bar Column */}
              <div
                style={{ height: bar.height }}
                className={`w-full max-w-[32px] rounded-t-xl transition-all duration-500 ease-out ${
                  bar.active
                    ? "bg-[#ffd233] shadow-lg shadow-[#ffd233]/35"
                    : "bg-muted dark:bg-[#262632] hover:bg-muted-foreground/30 dark:hover:bg-[#343444]"
                }`}
              />

              {/* Day Label */}
              <span
                className={`text-[11px] font-semibold transition-colors ${
                  bar.active
                    ? "text-amber-700 dark:text-[#ffd233] font-bold"
                    : "text-muted-foreground dark:text-[#71717a] group-hover:text-foreground dark:group-hover:text-white"
                }`}
              >
                {bar.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
