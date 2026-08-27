"use client";

import * as React from "react";
import Link from "next/link";
import { 
<<<<<<< HEAD
  Zap, 
  Bot, 
  MessageSquare, 
  CheckCircle2, 
  MoreHorizontal, 
  ArrowRight,
  Sparkles,
  Layers,
  Share2,
  Check,
  Cpu,
  Activity
=======
  Layers, 
  Clock, 
  Star, 
  Heart, 
  Zap, 
  ArrowRight,
  ShieldCheck
>>>>>>> 7ee9ca6f04322930ec29228c493ddb72ee250ce5
} from "lucide-react";
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
  illustrationIndex?: number;
}

<<<<<<< HEAD
export function WorkflowCard({ workflow, illustrationIndex = 0 }: WorkflowCardProps) {
  const [copied, setCopied] = React.useState(false);
  const stepCount = workflow.stepsCount || workflow.steps?.length || 4;

  // Determine illustration style across 4 distinct visual representations
  const styleType = (workflow.title.length + illustrationIndex) % 4;

  const handleShare = (e: React.MouseEvent) => {
    e.preventDefault();
    if (typeof window !== "undefined") {
      navigator.clipboard.writeText(`${window.location.origin}/workflows/${workflow.slug}`);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="group relative flex flex-col justify-between rounded-3xl bg-card border border-border p-6 modern-saas-card shadow-sm hover:shadow-xl transition-all duration-300">
      
      {/* 1. Top Illustration Plate (Exact Reference Image & Advanced Animations) */}
      <div className="relative aspect-[16/10] w-full rounded-2xl bg-gradient-to-b from-[#fefce8] via-[#fef9c3]/50 to-[#fef08a]/30 dark:from-[#1e232d] dark:via-[#191d24] dark:to-[#14171d] border border-border/60 p-4 flex items-center justify-center overflow-hidden mb-5 select-none modern-saas-plate">
        
        {/* Visual 1: Concentric Radar Waves & Orbiting Avatars */}
        {styleType === 0 && (
          <div className="relative flex items-center justify-center w-full h-full">
            {/* Concentric rings */}
            <div className="absolute w-48 h-48 rounded-full border border-amber-300/40 dark:border-amber-400/20 animate-radar" />
            <div className="absolute w-36 h-36 rounded-full border border-amber-400/50 dark:border-amber-400/30 bg-amber-200/20 dark:bg-amber-400/5" />
            <div className="absolute w-24 h-24 rounded-full border border-amber-400/60 dark:border-amber-400/40 bg-amber-300/30 dark:bg-amber-400/10" />

            {/* Orbiting Avatar Nodes */}
            <div className="absolute top-1.5 h-7 w-7 rounded-full bg-[#ffd233] text-black font-bold text-[10px] flex items-center justify-center shadow-xs z-10 border border-white dark:border-zinc-800">
              👤
            </div>
            <div className="absolute left-3 top-10 h-6 w-6 rounded-full bg-white dark:bg-card border border-amber-400/50 text-emerald-600 dark:text-emerald-400 flex items-center justify-center text-[10px] font-bold shadow-xs">
              ✓
            </div>
            <div className="absolute right-3 top-10 h-6 w-6 rounded-full bg-white dark:bg-card border border-amber-400/50 text-amber-600 dark:text-amber-400 flex items-center justify-center text-[10px] shadow-xs">
              👤
            </div>
            <div className="absolute left-7 bottom-3 h-6 w-6 rounded-full bg-white dark:bg-card border border-amber-400/50 text-emerald-600 flex items-center justify-center text-[10px] font-bold shadow-xs">
              ✓
            </div>
            <div className="absolute right-7 bottom-3 h-6 w-6 rounded-full bg-white dark:bg-card border border-amber-400/50 text-amber-600 flex items-center justify-center text-[10px] shadow-xs">
              👤
            </div>

            {/* Center Trigger Hub with Glowing Signal Pulse */}
            <div className="relative z-20 h-11 w-11 rounded-2xl bg-[#ffd233] text-black flex items-center justify-center shadow-md border-2 border-white dark:border-zinc-800 animate-node-signal">
              <Zap className="h-5 w-5 fill-current" />
            </div>
          </div>
        )}

        {/* Visual 2: Smart Task Routing / Switchboard */}
        {styleType === 1 && (
          <div className="relative flex items-center justify-center w-full h-full">
            {/* Top Left Connected App */}
            <div className="absolute left-3 top-3 h-8 w-8 rounded-xl bg-white dark:bg-card border border-amber-300 text-black dark:text-[#ffd233] flex items-center justify-center font-bold text-xs shadow-xs z-10">
              ⚡
            </div>

            {/* Bottom Right Connected App */}
            <div className="absolute right-3 bottom-3 h-8 w-8 rounded-xl bg-white dark:bg-card border border-amber-300 text-emerald-600 flex items-center justify-center font-bold text-xs shadow-xs z-10">
              💬
            </div>

            {/* Shimmering Pulsing Connector Cables */}
            <div className="absolute left-9 top-7 w-14 h-0.5 bg-gradient-to-r from-amber-400 via-[#ffd233] to-amber-300 animate-cable" />
            <div className="absolute right-9 bottom-7 w-14 h-0.5 bg-gradient-to-r from-amber-300 via-[#ffd233] to-amber-400 animate-cable" />

            {/* Center Switchboard Hub */}
            <div className="relative z-20 w-38 h-22 rounded-2xl bg-white/90 dark:bg-[#20252e] border-2 border-amber-300/80 p-2.5 flex flex-col justify-between shadow-sm">
              <div className="flex items-center justify-between">
                <div className="h-4 w-4 rounded-full bg-[#ffd233] animate-pulse" />
                <div className="flex gap-1">
                  <div className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-ping" />
                  <div className="h-1.5 w-1.5 rounded-full bg-amber-400" />
                </div>
              </div>
              <div className="grid grid-cols-6 gap-1 py-1">
                {Array.from({ length: 12 }).map((_, i) => (
                  <div key={i} className="h-1 w-full bg-amber-300/60 dark:bg-amber-400/30 rounded-full" />
                ))}
              </div>
              <div className="text-[9px] font-extrabold text-amber-900 dark:text-[#ffd233] text-right uppercase tracking-wider">
                {stepCount} nodes active
              </div>
            </div>
          </div>
        )}

        {/* Visual 3: Layered 3D Floating Glass Cards */}
        {styleType === 2 && (
          <div className="relative flex items-center justify-center w-full h-full animate-float-gentle">
            {/* Background Top Card */}
            <div className="absolute -top-1 w-48 h-10 rounded-xl bg-white/70 dark:bg-card/70 border border-amber-200 shadow-xs flex items-center px-3 gap-2 opacity-60 scale-90">
              <div className="h-5 w-5 rounded-full bg-[#ffd233] flex items-center justify-center text-[10px]">👤</div>
              <div className="h-2 w-24 bg-amber-200/60 rounded-full" />
            </div>

            {/* Middle Card */}
            <div className="absolute top-3.5 w-52 h-11 rounded-xl bg-white/90 dark:bg-card/90 border border-amber-300 shadow-sm flex items-center px-3.5 gap-2.5 z-10 scale-95">
              <div className="h-6 w-6 rounded-full bg-[#ffd233] flex items-center justify-center text-xs">👤</div>
              <div className="space-y-1 flex-1">
                <div className="h-2 w-28 bg-amber-300/70 rounded-full" />
                <div className="h-1.5 w-16 bg-amber-200/50 rounded-full" />
              </div>
              <div className="text-[10px] text-emerald-600 font-bold">✓</div>
            </div>

            {/* Foreground Bottom Card with Live Ping */}
            <div className="absolute bottom-1 w-56 h-12 rounded-xl bg-white dark:bg-card border-2 border-amber-300 shadow-md flex items-center px-4 gap-3 z-20">
              <div className="h-7 w-7 rounded-full bg-[#ffd233] flex items-center justify-center text-xs font-bold text-black">
                👤
              </div>
              <div className="space-y-1 flex-1">
                <div className="h-2 w-32 bg-amber-400/80 rounded-full" />
                <div className="h-1.5 w-20 bg-amber-200/80 rounded-full" />
              </div>
              <div className="h-3 w-3 rounded-full bg-emerald-500 animate-ping" />
            </div>
          </div>
        )}

        {/* Visual 4: Automation Flow Matrix */}
        {styleType === 3 && (
          <div className="relative flex items-center justify-center w-full h-full">
            <div className="flex items-center gap-2 z-10">
              {/* Trigger Node */}
              <div className="h-10 w-10 rounded-2xl bg-[#ffd233] text-black flex items-center justify-center font-bold text-xs shadow-md border-2 border-white dark:border-zinc-800 animate-node-signal">
                <Zap className="h-5 w-5 fill-current" />
              </div>
              {/* Connector Arrow */}
              <div className="w-8 h-0.5 bg-amber-400/80 relative">
                <div className="absolute right-0 -top-1 w-2 h-2 border-t-2 border-r-2 border-amber-500 rotate-45" />
              </div>
              {/* AI Processing Node */}
              <div className="h-10 w-10 rounded-2xl bg-white dark:bg-card text-foreground border-2 border-amber-300 flex items-center justify-center font-bold text-xs shadow-md">
                <Bot className="h-5 w-5 text-amber-500" />
              </div>
              {/* Connector Arrow */}
              <div className="w-8 h-0.5 bg-amber-400/80 relative">
                <div className="absolute right-0 -top-1 w-2 h-2 border-t-2 border-r-2 border-amber-500 rotate-45" />
              </div>
              {/* Output Result Node */}
              <div className="h-10 w-10 rounded-2xl bg-emerald-500 text-white flex items-center justify-center font-bold text-xs shadow-md border-2 border-white dark:border-zinc-800">
                <CheckCircle2 className="h-5 w-5" />
              </div>
            </div>
=======
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
>>>>>>> 7ee9ca6f04322930ec29228c493ddb72ee250ce5
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

<<<<<<< HEAD
      {/* 2. Text Content */}
      <div className="space-y-2 flex-1">
        <div className="flex items-center gap-2">
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-amber-100 dark:bg-amber-950/50 text-amber-900 dark:text-[#ffd233] border border-amber-300">
            <Sparkles className="h-2.5 w-2.5" />
            {workflow.category?.name || "Automation"}
          </span>
          <span className="text-[11px] text-muted-foreground font-medium">
            • {workflow.estimatedTime || "20 mins"}
          </span>
        </div>

        <Link href={`/workflows/${workflow.slug}`} className="block group-hover:text-amber-600 dark:group-hover:text-[#ffd233] transition-colors">
          <h3 className="text-lg font-bold text-foreground leading-snug tracking-tight">
            {workflow.title}
          </h3>
        </Link>

        <p className="text-xs text-muted-foreground line-clamp-2 leading-relaxed">
          {workflow.summary}
        </p>
      </div>

      {/* 3. Footer with Integration Icons & Action Pill */}
      <div className="flex items-center justify-between pt-5 mt-4 border-t border-border/70">
        {/* Connected Integration Icons */}
        <div className="flex items-center gap-1.5">
          <div className="h-7 w-7 rounded-lg bg-red-50 dark:bg-red-950/40 border border-red-200/80 flex items-center justify-center text-xs font-bold text-red-600" title="Gmail / Email">
            M
          </div>
          <div className="h-7 w-7 rounded-lg bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200/80 flex items-center justify-center text-xs font-bold text-emerald-600" title="WhatsApp / Sheets">
            田
          </div>
          <div className="h-7 w-7 rounded-lg bg-blue-50 dark:bg-blue-950/40 border border-blue-200/80 flex items-center justify-center text-xs font-bold text-blue-600" title="Trello / Notion">
            N
          </div>
        </div>

        {/* Action Button: Explore / More Menu */}
        <div className="flex items-center gap-2">
=======
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

>>>>>>> 7ee9ca6f04322930ec29228c493ddb72ee250ce5
          <Link href={`/workflows/${workflow.slug}`}>
            <Button
              variant="default"
              size="sm"
<<<<<<< HEAD
              className="h-8 px-4 rounded-full text-xs font-bold bg-[#ffd233] hover:bg-[#f5c71a] text-black shadow-xs gap-1 transition-transform active:scale-95"
            >
              <span>Explore</span>
              <ArrowRight className="h-3.5 w-3.5" />
            </Button>
          </Link>

          <button
            type="button"
            onClick={handleShare}
            aria-label="Share workflow link"
            className="h-8 w-8 rounded-full border border-border bg-background hover:bg-muted text-muted-foreground hover:text-foreground flex items-center justify-center transition-colors"
            title="Share blueprint link"
          >
            {copied ? <Check className="h-3.5 w-3.5 text-emerald-600" /> : <MoreHorizontal className="h-4 w-4" />}
          </button>
=======
              className="h-8 px-3 rounded-full text-xs font-semibold bg-[#f1641e] hover:bg-[#d44e0d] text-white"
            >
              <span>Explore</span>
            </Button>
          </Link>
>>>>>>> 7ee9ca6f04322930ec29228c493ddb72ee250ce5
        </div>
      </div>
    </div>
  );
}
