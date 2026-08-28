"use client";

import * as React from "react";
import {
  Activity,
  Copy,
  Check,
  Eye,
  EyeOff,
  RotateCw,
  Zap,
  ShieldCheck,
  Wifi,
  Sparkles
} from "lucide-react";

export function VirtualBusinessCard() {
  const [isFlipped, setIsFlipped] = React.useState(false);
  const [isLive, setIsLive] = React.useState(true);
  const [showFullNumber, setShowFullNumber] = React.useState(false);
  const [copied, setCopied] = React.useState(false);
  const [mousePos, setMousePos] = React.useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = React.useState(false);

  const cardNumber = "4832 9104 6541 9240";
  const maskedNumber = "•••• •••• •••• 9240";

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 20;
    const y = ((e.clientY - rect.top) / rect.height - 0.5) * -20;
    setMousePos({ x, y });
  };

  const handleCopyNumber = (e: React.MouseEvent) => {
    e.stopPropagation();
    navigator.clipboard.writeText("4832910465419240");
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="rounded-2xl bg-card dark:bg-[#141418] border border-border dark:border-[#22222a] p-4 sm:p-5 space-y-4 shadow-xs transition-colors duration-300">
      {/* Top Controls Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-1 bg-muted dark:bg-[#1b1b22] border border-border dark:border-[#26262e] rounded-xl p-0.5 text-xs shadow-xs">
          <button
            type="button"
            onClick={() => setIsLive(true)}
            className={`px-3 py-1 rounded-lg text-xs font-bold transition-all ${
              isLive
                ? "bg-card dark:bg-[#262630] text-emerald-600 dark:text-emerald-400 shadow-xs"
                : "text-muted-foreground dark:text-[#71717a] hover:text-foreground dark:hover:text-white"
            }`}
          >
            ● Live API
          </button>
          <button
            type="button"
            onClick={() => setIsLive(false)}
            className={`px-3 py-1 rounded-lg text-xs font-bold transition-all ${
              !isLive
                ? "bg-card dark:bg-[#262630] text-amber-600 dark:text-[#ffd233] shadow-xs"
                : "text-muted-foreground dark:text-[#71717a] hover:text-foreground dark:hover:text-white"
            }`}
          >
            Sandbox
          </button>
        </div>

        <button
          type="button"
          onClick={() => setIsFlipped(!isFlipped)}
          className="h-8 px-3 rounded-xl bg-[#ffd233] text-black text-xs font-bold inline-flex items-center gap-1.5 shadow-xs hover:bg-[#f5c71a] transition-all active:scale-95"
          title="Flip Card"
        >
          <RotateCw className={`h-3.5 w-3.5 transition-transform duration-500 ${isFlipped ? "rotate-180" : ""}`} />
          <span>{isFlipped ? "Show Front" : "Flip Card"}</span>
        </button>
      </div>

      {/* 3D Holographic Perspective Container */}
      <div
        className="perspective-1000 cursor-pointer"
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => {
          setIsHovered(false);
          setMousePos({ x: 0, y: 0 });
        }}
        onClick={() => setIsFlipped(!isFlipped)}
      >
        <div
          style={{
            transform: `perspective(1000px) rotateX(${isHovered ? mousePos.y : 0}deg) rotateY(${
              isHovered ? mousePos.x : 0
            }deg)`,
            transition: isHovered ? "transform 0.1s ease-out" : "transform 0.5s ease-out",
          }}
          className="relative aspect-[1.62/1] w-full rounded-2xl p-5 select-none transition-all duration-300 transform-style-3d shadow-2xl overflow-hidden group"
        >
          {/* Animated Holographic Multi-layer Background */}
          <div
            className={`absolute inset-0 transition-all duration-500 ${
              isLive
                ? "bg-gradient-to-br from-[#24242e] via-[#141419] to-[#0a0a0d]"
                : "bg-gradient-to-br from-[#1e2638] via-[#10141f] to-[#090b12]"
            }`}
          />

          {/* Shimmer Light Reflection Wave on Hover */}
          <div
            style={{
              transform: isHovered
                ? `translate(${mousePos.x * 15}px, ${mousePos.y * 15}px)`
                : "translate(0px, 0px)",
              transition: "transform 0.2s ease-out",
            }}
            className="absolute -inset-full bg-gradient-to-tr from-transparent via-white/[0.07] to-transparent pointer-events-none rotate-12"
          />

          {/* Holographic Glowing Orb */}
          <div
            className={`absolute -top-16 -right-16 w-44 h-44 rounded-full blur-3xl pointer-events-none transition-colors duration-500 ${
              isLive ? "bg-[#ffd233]/20" : "bg-cyan-500/20"
            }`}
          />
          <div className="absolute -bottom-16 -left-16 w-44 h-44 bg-[#ffd233]/10 rounded-full blur-3xl pointer-events-none" />

          {/* Border Metallic Outline */}
          <div className="absolute inset-0 rounded-2xl border border-white/15 group-hover:border-[#ffd233]/50 transition-colors pointer-events-none" />

          {/* FRONT OF THE CARD */}
          {!isFlipped ? (
            <div className="relative h-full flex flex-col justify-between text-white z-10">
              {/* Row 1: Brand & Contactless Wifi Logo */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="h-7 w-7 rounded-lg bg-[#ffd233] text-black font-black flex items-center justify-center text-xs shadow-md shadow-[#ffd233]/30">
                    ✦
                  </div>
                  <div className="flex flex-col">
                    <span className="font-extrabold text-xs tracking-tight text-white flex items-center gap-1">
                      AutoFlows <span className="text-[10px] text-[#ffd233] font-bold">PLATINUM</span>
                    </span>
                    <span className="text-[9px] text-zinc-400 tracking-wider font-mono uppercase">
                      Corporate Business
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <Wifi className="h-4 w-4 text-zinc-300 rotate-90" />
                  <span className="text-[9px] font-mono font-bold text-zinc-400 px-2 py-0.5 rounded bg-white/5 border border-white/10">
                    {isLive ? "LIVE" : "TEST"}
                  </span>
                </div>
              </div>

              {/* Row 2: Gold EMV Chip & Contactless Sensor */}
              <div className="flex items-center justify-between py-1">
                {/* Detailed Realistic Gold Chip */}
                <div className="h-8 w-11 rounded-md bg-gradient-to-tr from-amber-300 via-amber-400 to-yellow-200 border border-amber-600/70 shadow-md relative overflow-hidden flex items-center justify-center">
                  <div className="absolute inset-0 grid grid-cols-3 grid-rows-2 gap-[2px] p-[2px] opacity-70">
                    <div className="border-r border-b border-amber-900/50" />
                    <div className="border-r border-b border-amber-900/50" />
                    <div className="border-b border-amber-900/50" />
                    <div className="border-r border-amber-900/50" />
                    <div className="border-r border-amber-900/50" />
                    <div className="" />
                  </div>
                  <div className="w-3 h-2 rounded-xs border border-amber-900/60 bg-amber-300/80 z-10" />
                </div>

                {/* Card Number Copy Button */}
                <button
                  type="button"
                  onClick={handleCopyNumber}
                  className="px-2.5 py-1 rounded-lg bg-white/10 hover:bg-white/20 border border-white/15 text-[10px] font-bold text-zinc-200 inline-flex items-center gap-1.5 transition-all shadow-xs backdrop-blur-xs"
                  title="Copy Card Number"
                >
                  {copied ? (
                    <>
                      <Check className="h-3 w-3 text-emerald-400" />
                      <span className="text-emerald-400">Copied!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="h-3 w-3 text-[#ffd233]" />
                      <span>Copy ID</span>
                    </>
                  )}
                </button>
              </div>

              {/* Row 3: Card Number with reveal toggle */}
              <div className="space-y-1">
                <div className="flex items-center justify-between">
                  <div className="font-mono text-sm sm:text-base font-extrabold tracking-[0.2em] text-white/95 drop-shadow-md">
                    {showFullNumber ? cardNumber : maskedNumber}
                  </div>
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      setShowFullNumber(!showFullNumber);
                    }}
                    className="p-1 text-zinc-400 hover:text-white transition-colors"
                    title={showFullNumber ? "Hide full digits" : "Reveal full digits"}
                  >
                    {showFullNumber ? <EyeOff className="h-3.5 w-3.5" /> : <Eye className="h-3.5 w-3.5" />}
                  </button>
                </div>
              </div>

              {/* Row 4: Cardholder Name & Expiry & Visa Platinum Logo */}
              <div className="flex items-end justify-between pt-1 border-t border-white/10">
                <div>
                  <div className="text-[8px] text-zinc-400 uppercase tracking-widest font-bold">
                    CARDHOLDER NAME
                  </div>
                  <div className="text-xs sm:text-sm font-black text-white tracking-wider uppercase drop-shadow-sm">
                    MOHAMMED HALIMI
                  </div>
                </div>

                <div className="text-center">
                  <div className="text-[8px] text-zinc-400 uppercase tracking-widest font-bold">
                    EXPIRES
                  </div>
                  <div className="text-xs font-mono font-extrabold text-zinc-200">
                    09/29
                  </div>
                </div>

                {/* VISA Platinum Holographic Branding */}
                <div className="text-right">
                  <div className="text-base sm:text-lg font-black italic tracking-tighter text-white drop-shadow-lg leading-none">
                    VISA
                  </div>
                  <div className="text-[8px] font-bold tracking-widest text-[#ffd233] uppercase">
                    PLATINUM
                  </div>
                </div>
              </div>
            </div>
          ) : (
            /* BACK OF THE CARD */
            <div className="relative h-full flex flex-col justify-between text-white z-10">
              {/* Magnetic Black Stripe */}
              <div className="-mx-5 -mt-2 h-9 bg-black/95 border-y border-zinc-800 shadow-inner flex items-center justify-end px-4">
                <span className="text-[8px] font-mono text-zinc-500 tracking-widest">
                  AUTOFLOWS COMMERCIAL ENCRYPTED
                </span>
              </div>

              {/* Signature Panel & CVV */}
              <div className="space-y-1 pt-1">
                <div className="flex items-center justify-between text-[8px] text-zinc-400 font-bold px-1">
                  <span>AUTHORIZED SIGNATURE</span>
                  <span>SECURITY CVV</span>
                </div>

                <div className="flex items-center gap-2">
                  <div className="flex-1 h-7 rounded bg-zinc-200 text-zinc-900 font-cursive italic text-xs font-bold px-3 flex items-center border border-zinc-400 shadow-inner">
                    Mohammed Halimi
                  </div>
                  <div className="w-12 h-7 rounded bg-zinc-100 text-zinc-900 font-mono font-black text-xs px-2 flex items-center justify-center border border-zinc-300">
                    842
                  </div>
                </div>
              </div>

              {/* Corporate Notice */}
              <div className="text-[8px] text-zinc-400 leading-tight pt-1">
                This corporate virtual card is issued by AutoFlows Hub Inc. for certified workflow execution, cloud API quotas, and enterprise automation infrastructure.
              </div>

              {/* Bottom Hologram Emblem */}
              <div className="flex items-center justify-between pt-1 border-t border-white/10">
                <div className="flex items-center gap-1.5 text-[9px] text-[#ffd233] font-bold">
                  <ShieldCheck className="h-3.5 w-3.5" />
                  <span>256-Bit Encrypted Vault</span>
                </div>
                <div className="text-[9px] font-mono text-zinc-400">
                  ID: AF-849201-MH
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Credit Line & Active Limit Status */}
      <div className="p-3 rounded-xl bg-muted/50 dark:bg-[#1b1b22] border border-border dark:border-[#26262e] flex items-center justify-between gap-2 text-xs">
        <div className="flex items-center gap-2">
          <div className="h-7 w-7 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-emerald-600 dark:text-emerald-400 flex items-center justify-center">
            <Zap className="h-3.5 w-3.5" />
          </div>
          <div>
            <span className="font-bold text-foreground dark:text-white block leading-tight">
              $25,000.00 Limit
            </span>
            <span className="text-[10px] text-muted-foreground dark:text-[#71717a]">
              Available Corporate Balance
            </span>
          </div>
        </div>

        <span className="px-2 py-0.5 rounded-full text-[10px] font-extrabold bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 border border-emerald-500/30">
          ● Active Card
        </span>
      </div>
    </div>
  );
}

