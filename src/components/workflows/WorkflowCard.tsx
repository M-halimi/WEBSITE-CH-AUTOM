"use client";

import * as React from "react";
import Link from "next/link";
import { 
  Zap, 
  Bot, 
  CheckCircle2, 
  MoreHorizontal, 
  ArrowRight,
  Sparkles,
  Layers,
  Check,
  Clock,
  Tag as TagIcon
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { PlatformIcon } from "@/components/ui/platform-icon";
import { isValidImageUrl } from "@/lib/utils";

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
    imageUrl?: string | null;
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

export function WorkflowCard({ workflow, illustrationIndex = 0 }: WorkflowCardProps) {
  const [copied, setCopied] = React.useState(false);
  const [imgError, setImgError] = React.useState(false);
  const stepCount = workflow.stepsCount || workflow.steps?.length || 4;

  // Determine illustration fallback style across 4 distinct visual representations
  const styleType = (workflow.title.length + illustrationIndex) % 4;

  const handleShare = (e: React.MouseEvent) => {
    e.preventDefault();
    if (typeof window !== "undefined") {
      navigator.clipboard.writeText(`${window.location.origin}/workflows/${workflow.slug}`);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  // Difficulty badge colors
  const getDifficultyBadge = (difficulty: string) => {
    const diff = (difficulty || "BEGINNER").toUpperCase();
    if (diff === "ADVANCED") {
      return {
        label: "Advanced",
        class: "bg-purple-500/15 text-purple-600 dark:text-purple-400 border-purple-500/30",
      };
    }
    if (diff === "INTERMEDIATE") {
      return {
        label: "Intermediate",
        class: "bg-amber-500/15 text-amber-600 dark:text-amber-400 border-amber-500/30",
      };
    }
    return {
      label: "Beginner",
      class: "bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 border-emerald-500/30",
    };
  };

  const difficultyInfo = getDifficultyBadge(workflow.difficulty);
  const displayPrice = workflow.price || "Free Template";
  const isFree = displayPrice.toLowerCase().includes("free");

  return (
    <div className="group relative flex flex-col justify-between rounded-3xl bg-card border border-border p-5 modern-saas-card shadow-sm hover:shadow-xl transition-all duration-300">
      
      {/* 1. TOP MEDIA CONTAINER: Workflow Photo Image or Dynamic Flow Illustration */}
      <div className="relative aspect-[16/10] w-full rounded-2xl bg-gradient-to-b from-[#fefce8] via-[#fef9c3]/50 to-[#fef08a]/30 dark:from-[#1e232d] dark:via-[#191d24] dark:to-[#14171d] border border-border/60 overflow-hidden mb-4 select-none modern-saas-plate">
        
        {/* If custom image is uploaded / specified, is a valid URL, and has not errored */}
        {isValidImageUrl(workflow.imageUrl) && !imgError ? (
          <div className="relative w-full h-full">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={workflow.imageUrl!}
              alt={workflow.title}
              onError={() => setImgError(true)}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
            {/* Gradient bottom shadow for readability */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20 pointer-events-none" />
          </div>
        ) : (
          /* High-Fidelity Animated Flow Illustration Fallbacks */
          <div className="w-full h-full flex items-center justify-center p-4">
            {/* Visual 1: Concentric Radar Waves & Orbiting Avatars */}
            {styleType === 0 && (
              <div className="relative flex items-center justify-center w-full h-full">
                <div className="absolute w-48 h-48 rounded-full border border-amber-300/40 dark:border-amber-400/20 animate-radar" />
                <div className="absolute w-36 h-36 rounded-full border border-amber-400/50 dark:border-amber-400/30 bg-amber-200/20 dark:bg-amber-400/5" />
                <div className="absolute w-24 h-24 rounded-full border border-amber-400/60 dark:border-amber-400/40 bg-amber-300/30 dark:bg-amber-400/10" />

                <div className="absolute top-1.5 h-7 w-7 rounded-full bg-[#ffd233] text-black font-bold text-[10px] flex items-center justify-center shadow-xs z-10 border border-white dark:border-zinc-800">
                  👤
                </div>
                <div className="absolute left-3 top-10 h-6 w-6 rounded-full bg-white dark:bg-card border border-amber-400/50 text-emerald-600 dark:text-emerald-400 flex items-center justify-center text-[10px] font-bold shadow-xs">
                  ✓
                </div>
                <div className="absolute right-3 top-10 h-6 w-6 rounded-full bg-white dark:bg-card border border-amber-400/50 text-amber-600 dark:text-amber-400 flex items-center justify-center text-[10px] shadow-xs">
                  👤
                </div>

                <div className="relative z-20 h-11 w-11 rounded-2xl bg-[#ffd233] text-black flex items-center justify-center shadow-md border-2 border-white dark:border-zinc-800 animate-node-signal">
                  <Zap className="h-5 w-5 fill-current" />
                </div>
              </div>
            )}

            {/* Visual 2: Smart Task Routing / Switchboard */}
            {styleType === 1 && (
              <div className="relative flex items-center justify-center w-full h-full">
                <div className="absolute left-3 top-3 h-8 w-8 rounded-xl bg-white dark:bg-card border border-amber-300 text-black dark:text-[#ffd233] flex items-center justify-center font-bold text-xs shadow-xs z-10">
                  ⚡
                </div>
                <div className="absolute right-3 bottom-3 h-8 w-8 rounded-xl bg-white dark:bg-card border border-amber-300 text-emerald-600 flex items-center justify-center font-bold text-xs shadow-xs z-10">
                  💬
                </div>
                <div className="absolute left-9 top-7 w-14 h-0.5 bg-gradient-to-r from-amber-400 via-[#ffd233] to-amber-300 animate-cable" />
                <div className="absolute right-9 bottom-7 w-14 h-0.5 bg-gradient-to-r from-amber-300 via-[#ffd233] to-amber-400 animate-cable" />

                <div className="relative z-20 w-36 h-20 rounded-2xl bg-white/90 dark:bg-[#20252e] border-2 border-amber-300/80 p-2.5 flex flex-col justify-between shadow-sm">
                  <div className="flex items-center justify-between">
                    <div className="h-3.5 w-3.5 rounded-full bg-[#ffd233] animate-pulse" />
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
                <div className="absolute top-2 w-48 h-10 rounded-xl bg-white/70 dark:bg-card/70 border border-amber-200 shadow-xs flex items-center px-3 gap-2 opacity-60 scale-90">
                  <div className="h-5 w-5 rounded-full bg-[#ffd233] flex items-center justify-center text-[10px]">👤</div>
                  <div className="h-2 w-24 bg-amber-200/60 rounded-full" />
                </div>
                <div className="absolute bottom-2 w-54 h-11 rounded-xl bg-white dark:bg-card border-2 border-amber-300 shadow-md flex items-center px-4 gap-3 z-20">
                  <div className="h-6 w-6 rounded-full bg-[#ffd233] flex items-center justify-center text-xs font-bold text-black">
                    👤
                  </div>
                  <div className="space-y-1 flex-1">
                    <div className="h-2 w-28 bg-amber-400/80 rounded-full" />
                    <div className="h-1.5 w-16 bg-amber-200/80 rounded-full" />
                  </div>
                  <div className="h-2.5 w-2.5 rounded-full bg-emerald-500 animate-ping" />
                </div>
              </div>
            )}

            {/* Visual 4: Automation Flow Matrix */}
            {styleType === 3 && (
              <div className="relative flex items-center justify-center w-full h-full">
                <div className="flex items-center gap-2 z-10">
                  <div className="h-9 w-9 rounded-xl bg-[#ffd233] text-black flex items-center justify-center font-bold text-xs shadow-md border-2 border-white dark:border-zinc-800 animate-node-signal">
                    <Zap className="h-4 w-4 fill-current" />
                  </div>
                  <div className="w-6 h-0.5 bg-amber-400/80" />
                  <div className="h-9 w-9 rounded-xl bg-white dark:bg-card text-foreground border-2 border-amber-300 flex items-center justify-center font-bold text-xs shadow-md">
                    <Bot className="h-4 w-4 text-amber-500" />
                  </div>
                  <div className="w-6 h-0.5 bg-amber-400/80" />
                  <div className="h-9 w-9 rounded-xl bg-emerald-500 text-white flex items-center justify-center font-bold text-xs shadow-md border-2 border-white dark:border-zinc-800">
                    <CheckCircle2 className="h-4 w-4" />
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Floating Difficulty Badge (Advance / Intermediate / Beginner) */}
        <div className="absolute top-3 left-3 z-20 flex items-center gap-1.5">
          <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold border shadow-xs backdrop-blur-md ${difficultyInfo.class}`}>
            {difficultyInfo.label}
          </span>
          {workflow.featured && (
            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold bg-[#ffd233] text-black border border-amber-300 shadow-xs">
              <Sparkles className="h-2.5 w-2.5" />
              Featured
            </span>
          )}
        </div>

        {/* Floating Steps Pill */}
        <div className="absolute bottom-3 right-3 z-20">
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-black/70 text-white border border-white/20 shadow-xs backdrop-blur-md">
            <Layers className="h-2.5 w-2.5 text-[#ffd233]" />
            {stepCount} steps
          </span>
        </div>
      </div>

      {/* 2. TEXT CONTENT & TITLE */}
      <div className="space-y-2.5 flex-1">
        {/* Category & Time */}
        <div className="flex items-center justify-between gap-2">
          <span className="inline-flex items-center gap-1 text-[11px] font-bold text-amber-600 dark:text-[#ffd233]">
            <Sparkles className="h-3 w-3" />
            {workflow.category?.name || "Automation"}
          </span>

          <span className="inline-flex items-center gap-1 text-[11px] text-muted-foreground font-medium">
            <Clock className="h-3 w-3" />
            {workflow.estimatedTime || "15 mins"}
          </span>
        </div>

        {/* Workflow Title */}
        <Link 
          href={`/workflows/${workflow.slug}`} 
          className="block group-hover:text-amber-600 dark:group-hover:text-[#ffd233] transition-colors"
        >
          <h3 className="text-base font-bold text-foreground leading-snug tracking-tight line-clamp-2">
            {workflow.title}
          </h3>
        </Link>

        {/* Summary Description */}
        <p className="text-xs text-muted-foreground line-clamp-2 leading-relaxed">
          {workflow.summary}
        </p>
      </div>

      {/* 3. PRICE ROW */}
      <div className="pt-3 pb-1 flex items-center justify-between border-t border-border/50 mt-3">
        <div className="flex items-center gap-1.5">
          <TagIcon className="h-3.5 w-3.5 text-muted-foreground" />
          <span className="text-[11px] text-muted-foreground font-medium">Price:</span>
          <span className={`text-xs font-extrabold px-2 py-0.5 rounded-md ${
            isFree 
              ? "bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 border border-emerald-500/30" 
              : "bg-amber-500/15 text-amber-700 dark:text-[#ffd233] border border-amber-500/30"
          }`}>
            {displayPrice}
          </span>
        </div>

        <span className="text-[10px] text-muted-foreground">
          {workflow.views > 0 ? `${workflow.views} views` : "Ready to use"}
        </span>
      </div>

      {/* 4. FOOTER: REAL ENGINE / INTEGRATION ICONS & ACTION BUTTONS */}
      <div className="flex items-center justify-between pt-3 border-t border-border/70">
        
        {/* Dynamic Genuine Platform / Engine Icons (Real, not fake!) */}
        <div className="flex items-center gap-1.5 flex-wrap">
          {workflow.platforms && workflow.platforms.length > 0 ? (
            workflow.platforms.slice(0, 4).map((p) => (
              <PlatformIcon
                key={p.platform.id}
                slug={p.platform.slug}
                name={p.platform.name}
                size="sm"
                className="shadow-2xs"
              />
            ))
          ) : (
            <>
              <PlatformIcon slug="whatsapp" name="WhatsApp" size="sm" />
              <PlatformIcon slug="n8n" name="n8n" size="sm" />
              <PlatformIcon slug="openai" name="OpenAI" size="sm" />
            </>
          )}

          {workflow.platforms && workflow.platforms.length > 4 && (
            <span className="h-7 px-1.5 rounded-lg bg-muted/60 text-muted-foreground text-[10px] font-bold flex items-center justify-center border border-border" title={`${workflow.platforms.length - 4} more platforms`}>
              +{workflow.platforms.length - 4}
            </span>
          )}
        </div>

        {/* Action Button: Explore Blueprint & Share */}
        <div className="flex items-center gap-1.5">
          <Link
            href={`/workflows/${workflow.slug}`}
            className="h-8 px-3.5 rounded-full inline-flex items-center justify-center text-xs font-bold bg-[#ffd233] hover:bg-[#f5c71a] text-black shadow-xs gap-1 transition-transform active:scale-95"
          >
            <span>Explore</span>
            <ArrowRight className="h-3.5 w-3.5" />
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
        </div>
      </div>
    </div>
  );
}
