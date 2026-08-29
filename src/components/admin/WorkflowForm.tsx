"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import {
  Plus,
  Trash2,
  Save,
  ArrowLeft,
  Loader2,
  Layers,
  Zap,
  Sparkles,
  Image as ImageIcon,
  Tag as TagIcon,
  DollarSign,
  Link as LinkIcon,
  Coins,
  Check,
  Search,
  Cpu,
  X
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { PlatformIcon } from "@/components/ui/platform-icon";
import {
  createWorkflow,
  updateWorkflow,
  createPlatform,
} from "@/actions/workflowActions";
import { StepInput, WorkflowFormData } from "@/types/workflow";
import { slugify, isValidImageUrl } from "@/lib/utils";

interface WorkflowFormProps {
  initialData?: {
    id?: string;
    title: string;
    slug?: string;
    summary: string;
    description: string;
    difficulty: string;
    estimatedTime: string;
    status: string;
    featured: boolean;
    price?: string | null;
    imageUrl?: string | null;
    categoryId?: string | null;
    triggersDescription?: string | null;
    outcomesDescription?: string | null;
    platforms?: { platformId: string }[];
    steps?: StepInput[];
  };
  categories: { id: string; name: string }[];
  platforms: { id: string; name: string; slug?: string }[];
}

const IMAGE_PRESETS = [
  {
    name: "WhatsApp AI Bot",
    url: "https://images.unsplash.com/photo-1611746872915-64382b5c76da?w=800&auto=format&fit=crop&q=80",
  },
  {
    name: "E-Commerce / Shopify",
    url: "https://images.unsplash.com/photo-1556742049-0a67e55722c0?w=800&auto=format&fit=crop&q=80",
  },
  {
    name: "AI Smart Agent",
    url: "https://images.unsplash.com/photo-1677442136019-21780efad99a?w=800&auto=format&fit=crop&q=80",
  },
  {
    name: "Finance & Stripe Invoice",
    url: "https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?w=800&auto=format&fit=crop&q=80",
  },
  {
    name: "CRM & Meta Lead Ads",
    url: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&auto=format&fit=crop&q=80",
  },
  {
    name: "Content Machine & Social",
    url: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=800&auto=format&fit=crop&q=80",
  },
];

export function WorkflowForm({
  initialData,
  categories,
  platforms: initialPlatforms,
}: WorkflowFormProps) {
  const router = useRouter();
  const [mounted, setMounted] = React.useState(false);
  const [pending, setPending] = React.useState(false);
  const [errorMessage, setErrorMessage] = React.useState<string | null>(null);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  const [title, setTitle] = React.useState(initialData?.title || "");
  const [slug, setSlug] = React.useState(initialData?.slug || "");
  const [summary, setSummary] = React.useState(initialData?.summary || "");
  const [description, setDescription] = React.useState(
    initialData?.description || "",
  );
  const [difficulty, setDifficulty] = React.useState(
    initialData?.difficulty || "BEGINNER",
  );
  const [estimatedTime, setEstimatedTime] = React.useState(
    initialData?.estimatedTime || "15 mins",
  );
  const [status, setStatus] = React.useState(initialData?.status || "DRAFT");
  const [featured, setFeatured] = React.useState(
    initialData?.featured || false,
  );
  
  // Price & Currency states
  const [price, setPrice] = React.useState(
    initialData?.price || "Free Template",
  );
  const [activeCurrency, setActiveCurrency] = React.useState<"USD" | "MAD" | "EUR" | "FREE" | "CUSTOM">(() => {
    const p = (initialData?.price || "Free Template").toLowerCase();
    if (p.includes("$") || p.includes("usd")) return "USD";
    if (p.includes("mad") || p.includes("dh")) return "MAD";
    if (p.includes("€") || p.includes("eur")) return "EUR";
    if (p.includes("free")) return "FREE";
    return "CUSTOM";
  });

  const [imageUrl, setImageUrl] = React.useState(
    initialData?.imageUrl || "",
  );
  const [categoryId, setCategoryId] = React.useState(
    initialData?.categoryId || "",
  );
  const [triggersDesc, setTriggersDesc] = React.useState(
    initialData?.triggersDescription || "",
  );
  const [outcomesDesc, setOutcomesDesc] = React.useState(
    initialData?.outcomesDescription || "",
  );

  // Platform List & Dynamic Engine Search & Creation
  const [platformList, setPlatformList] = React.useState(initialPlatforms || []);
  const [platformSearch, setPlatformSearch] = React.useState("");
  const [customEngineName, setCustomEngineName] = React.useState("");
  const [creatingPlatform, setCreatingPlatform] = React.useState(false);
  const [selectedPlatforms, setSelectedPlatforms] = React.useState<string[]>(
    initialData?.platforms?.map((p) => p.platformId) || [],
  );

  const [steps, setSteps] = React.useState<StepInput[]>(
    initialData?.steps && initialData.steps.length > 0
      ? initialData.steps
      : [
          {
            order: 1,
            name: "Webhook Trigger",
            type: "TRIGGER",
            appName: "Webhook",
            description: "Receives incoming event payload.",
          },
        ],
  );

  const handleTitleChange = (val: string) => {
    setTitle(val);
    if (!initialData?.id) {
      setSlug(slugify(val));
    }
  };

  const handleCurrencySwitch = (curr: "USD" | "MAD" | "EUR" | "FREE" | "CUSTOM") => {
    setActiveCurrency(curr);
    if (curr === "FREE") {
      setPrice("Free Template");
    } else if (curr === "USD") {
      setPrice("$49");
    } else if (curr === "MAD") {
      setPrice("1,500 MAD");
    } else if (curr === "EUR") {
      setPrice("49 €");
    }
  };

  const handleAddStep = () => {
    setSteps([
      ...steps,
      {
        order: steps.length + 1,
        name: `Step ${steps.length + 1}`,
        type: "ACTION",
        appName: "App Integration",
        description: "",
      },
    ]);
  };

  const handleRemoveStep = (index: number) => {
    const updated = steps.filter((_, idx) => idx !== index);
    const reordered = updated.map((s, idx) => ({ ...s, order: idx + 1 }));
    setSteps(reordered);
  };

  const handleStepFieldChange = (
    index: number,
    field: keyof StepInput,
    value: any,
  ) => {
    const updated = [...steps];
    updated[index] = { ...updated[index], [field]: value };
    setSteps(updated);
  };

  const togglePlatform = (pId: string) => {
    if (selectedPlatforms.includes(pId)) {
      setSelectedPlatforms(selectedPlatforms.filter((id) => id !== pId));
    } else {
      setSelectedPlatforms([...selectedPlatforms, pId]);
    }
  };

  const handleCreateCustomEngine = async (nameToAdd?: string) => {
    const name = (nameToAdd || customEngineName || platformSearch).trim();
    if (!name) return;

    setCreatingPlatform(true);
    const res = await createPlatform(name);
    setCreatingPlatform(false);

    if (res.success && res.platform) {
      if (!platformList.some((p) => p.id === res.platform.id)) {
        setPlatformList((prev) => [...prev, res.platform]);
      }
      if (!selectedPlatforms.includes(res.platform.id)) {
        setSelectedPlatforms((prev) => [...prev, res.platform.id]);
      }
      setCustomEngineName("");
      setPlatformSearch("");
    }
  };

  const filteredPlatforms = platformList.filter((p) =>
    p.name.toLowerCase().includes(platformSearch.toLowerCase())
  );

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setPending(true);
    setErrorMessage(null);

    const payload: WorkflowFormData = {
      title,
      slug,
      summary,
      description,
      difficulty,
      estimatedTime,
      status,
      featured,
      price,
      imageUrl: imageUrl.trim() || null,
      categoryId: categoryId || undefined,
      triggersDescription: triggersDesc,
      outcomesDescription: outcomesDesc,
      platformIds: selectedPlatforms,
      steps,
    };

    let res;
    if (initialData?.id) {
      res = await updateWorkflow(initialData.id, payload);
    } else {
      res = await createWorkflow(payload);
    }

    setPending(false);

    if (res.success) {
      router.push("/admin/workflows");
      router.refresh();
    } else {
      setErrorMessage(res.error || "Failed to save workflow.");
    }
  };

  if (!mounted) {
    return (
      <div className="p-8 text-center text-xs text-muted-foreground flex items-center justify-center gap-2">
        <Loader2 className="h-4 w-4 animate-spin text-[#ffd233]" />
        <span>Loading workflow editor...</span>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6 max-w-5xl w-full" suppressHydrationWarning>
      {errorMessage && (
        <div className="p-4 rounded-xl bg-destructive/10 border border-destructive/30 text-destructive text-xs font-semibold">
          {errorMessage}
        </div>
      )}

      {/* 1. General Information Card */}
      <div className="rounded-2xl border border-border dark:border-[#22222a] bg-card dark:bg-[#141418] p-5 sm:p-7 space-y-4 shadow-xs transition-colors duration-300">
        <h3 className="text-sm font-bold text-foreground dark:text-white flex items-center gap-2">
          <Layers className="h-4 w-4 text-amber-600 dark:text-[#ffd233]" />
          General Information
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="text-xs font-semibold text-muted-foreground dark:text-[#8e8e93] block mb-1">
              Workflow Title *
            </label>
            <Input
              required
              value={title}
              onChange={(e) => handleTitleChange(e.target.value)}
              placeholder="e.g. WhatsApp AI Lead Qualifier & CRM Sync"
              className="h-10 text-xs bg-background dark:bg-[#1a1a22] border-border dark:border-[#26262e] text-foreground dark:text-white focus:border-[#ffd233]"
            />
          </div>
          <div>
            <label className="text-xs font-semibold text-muted-foreground dark:text-[#8e8e93] block mb-1">
              URL Slug *
            </label>
            <Input
              required
              value={slug}
              onChange={(e) => setSlug(slugify(e.target.value))}
              placeholder="whatsapp-ai-lead-qualifier"
              className="h-10 text-xs font-mono bg-background dark:bg-[#1a1a22] border-border dark:border-[#26262e] text-foreground dark:text-white focus:border-[#ffd233]"
            />
          </div>
        </div>

        <div>
          <label className="text-xs font-semibold text-muted-foreground dark:text-[#8e8e93] block mb-1">
            Short Summary (1-2 sentences for catalog card) *
          </label>
          <Textarea
            required
            rows={2}
            value={summary}
            onChange={(e) => setSummary(e.target.value)}
            placeholder="Brief overview explaining what this workflow accomplishes..."
            className="text-xs leading-relaxed bg-background dark:bg-[#1a1a22] border-border dark:border-[#26262e] text-foreground dark:text-white focus:border-[#ffd233]"
          />
        </div>

        <div>
          <label className="text-xs font-semibold text-muted-foreground dark:text-[#8e8e93] block mb-1">
            Detailed Description & Instructions (Markdown supported) *
          </label>
          <Textarea
            required
            rows={5}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Full technical explanation, value props, prerequisites, etc."
            className="text-xs font-mono leading-relaxed bg-background dark:bg-[#1a1a22] border-border dark:border-[#26262e] text-foreground dark:text-white focus:border-[#ffd233]"
          />
        </div>

        {/* Currency & Price Setting Section */}
        <div className="rounded-xl border border-border dark:border-[#26262e] bg-muted/40 dark:bg-[#1a1a22] p-4 space-y-3">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <label className="text-xs font-bold text-foreground dark:text-white flex items-center gap-1.5">
              <Coins className="h-4 w-4 text-amber-600 dark:text-[#ffd233]" />
              Currency & Price Setting *
            </label>
            
            {/* Currency Tabs */}
            <div className="flex items-center gap-1 bg-card dark:bg-[#121216] border border-border dark:border-[#26262e] p-1 rounded-xl w-fit shadow-xs">
              <button
                type="button"
                onClick={() => handleCurrencySwitch("USD")}
                className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-all ${
                  activeCurrency === "USD"
                    ? "bg-[#ffd233] text-black shadow-xs"
                    : "text-muted-foreground dark:text-[#71717a] hover:text-foreground dark:hover:text-white"
                }`}
              >
                $ USD
              </button>
              <button
                type="button"
                onClick={() => handleCurrencySwitch("MAD")}
                className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-all ${
                  activeCurrency === "MAD"
                    ? "bg-[#ffd233] text-black shadow-xs"
                    : "text-muted-foreground dark:text-[#71717a] hover:text-foreground dark:hover:text-white"
                }`}
              >
                MAD (DH)
              </button>
              <button
                type="button"
                onClick={() => handleCurrencySwitch("EUR")}
                className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-all ${
                  activeCurrency === "EUR"
                    ? "bg-[#ffd233] text-black shadow-xs"
                    : "text-muted-foreground dark:text-[#71717a] hover:text-foreground dark:hover:text-white"
                }`}
              >
                € EUR
              </button>
              <button
                type="button"
                onClick={() => handleCurrencySwitch("FREE")}
                className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-all ${
                  activeCurrency === "FREE"
                    ? "bg-emerald-500 text-white shadow-xs"
                    : "text-muted-foreground dark:text-[#71717a] hover:text-foreground dark:hover:text-white"
                }`}
              >
                Free
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 items-center">
            <div>
              <Input
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                placeholder="e.g. $49 or 1,500 MAD or Free Template"
                className="h-10 text-xs font-bold bg-background dark:bg-[#141418] border-border dark:border-[#2a2a34] text-foreground dark:text-white focus:border-[#ffd233]"
              />
            </div>

            {/* Quick Price Suggestions */}
            <div className="flex items-center gap-1.5 flex-wrap">
              <span className="text-[11px] text-muted-foreground dark:text-[#71717a] font-medium">Suggestions:</span>
              {activeCurrency === "USD" && ["$29", "$49", "$99", "$149", "$299"].map((s) => (
                <button
                  key={s}
                  type="button"
                  onClick={() => setPrice(s)}
                  className={`text-[11px] px-2 py-0.5 rounded-lg border transition-all ${
                    price === s ? "bg-[#ffd233] text-black font-bold border-[#ffd233] shadow-xs" : "bg-card dark:bg-[#141418] border-border dark:border-[#2a2a34] text-muted-foreground dark:text-[#8e8e93] hover:text-foreground dark:hover:text-white"
                  }`}
                >
                  {s}
                </button>
              ))}

              {activeCurrency === "MAD" && ["500 MAD", "1,500 MAD", "2,500 MAD", "5,000 MAD"].map((s) => (
                <button
                  key={s}
                  type="button"
                  onClick={() => setPrice(s)}
                  className={`text-[11px] px-2 py-0.5 rounded-lg border transition-all ${
                    price === s ? "bg-[#ffd233] text-black font-bold border-[#ffd233] shadow-xs" : "bg-card dark:bg-[#141418] border-border dark:border-[#2a2a34] text-muted-foreground dark:text-[#8e8e93] hover:text-foreground dark:hover:text-white"
                  }`}
                >
                  {s}
                </button>
              ))}

              {activeCurrency === "EUR" && ["29 €", "49 €", "89 €", "149 €"].map((s) => (
                <button
                  key={s}
                  type="button"
                  onClick={() => setPrice(s)}
                  className={`text-[11px] px-2 py-0.5 rounded-lg border transition-all ${
                    price === s ? "bg-[#ffd233] text-black font-bold border-[#ffd233] shadow-xs" : "bg-card dark:bg-[#141418] border-border dark:border-[#2a2a34] text-muted-foreground dark:text-[#8e8e93] hover:text-foreground dark:hover:text-white"
                  }`}
                >
                  {s}
                </button>
              ))}

              {activeCurrency === "FREE" && ["Free Template", "Free Included", "Open Source"].map((s) => (
                <button
                  key={s}
                  type="button"
                  onClick={() => setPrice(s)}
                  className={`text-[11px] px-2 py-0.5 rounded-lg border transition-all ${
                    price === s ? "bg-emerald-500 text-white font-bold border-emerald-600 shadow-xs" : "bg-card dark:bg-[#141418] border-border dark:border-[#2a2a34] text-muted-foreground dark:text-[#8e8e93] hover:text-foreground dark:hover:text-white"
                  }`}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Category, Difficulty & Setup Time Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-1">
          <div>
            <label className="text-xs font-semibold text-muted-foreground dark:text-[#8e8e93] block mb-1">
              Category
            </label>
            <select
              value={categoryId}
              onChange={(e) => setCategoryId(e.target.value)}
              aria-label="Workflow Category"
              className="h-10 w-full rounded-xl border border-border dark:border-[#26262e] bg-background dark:bg-[#1a1a22] px-3 text-xs text-foreground dark:text-white focus:outline-none focus:border-[#ffd233]"
            >
              <option value="">Select Category</option>
              {categories.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="text-xs font-semibold text-muted-foreground dark:text-[#8e8e93] block mb-1">
              Difficulty Tier
            </label>
            <select
              value={difficulty}
              onChange={(e) => setDifficulty(e.target.value)}
              aria-label="Difficulty level"
              className="h-10 w-full rounded-xl border border-border dark:border-[#26262e] bg-background dark:bg-[#1a1a22] px-3 text-xs text-foreground dark:text-white focus:outline-none focus:border-[#ffd233]"
            >
              <option value="BEGINNER">BEGINNER (Easy setup)</option>
              <option value="INTERMEDIATE">INTERMEDIATE (Standard flow)</option>
              <option value="ADVANCED">ADVANCED (Multi-agent / Complex)</option>
            </select>
          </div>

          <div>
            <label className="text-xs font-semibold text-muted-foreground dark:text-[#8e8e93] block mb-1">
              Publishing Status
            </label>
            <select
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              aria-label="Workflow status"
              className="h-10 w-full rounded-xl border border-border dark:border-[#26262e] bg-background dark:bg-[#1a1a22] px-3 text-xs text-foreground dark:text-white focus:outline-none focus:border-[#ffd233] font-bold"
            >
              <option value="DRAFT">DRAFT (Hidden)</option>
              <option value="PUBLISHED">PUBLISHED (Live on Marketplace)</option>
              <option value="ARCHIVED">ARCHIVED</option>
            </select>
          </div>
        </div>

        {/* Featured checkbox */}
        <div className="pt-2 flex items-center gap-2">
          <input
            type="checkbox"
            id="featuredCheck"
            checked={featured}
            onChange={(e) => setFeatured(e.target.checked)}
            className="h-4 w-4 rounded border-border dark:border-[#26262e] bg-background dark:bg-[#1a1a22] text-[#ffd233] focus:ring-[#ffd233]"
          />
          <label
            htmlFor="featuredCheck"
            className="text-xs font-semibold text-foreground dark:text-[#d4d4d8] cursor-pointer"
          >
            Mark as Featured (Pinned badge & shown in top sections)
          </label>
        </div>
      </div>

      {/* 2. Photo / Image for Workflow Card */}
      <div className="rounded-2xl border border-border dark:border-[#22222a] bg-card dark:bg-[#141418] p-5 sm:p-7 space-y-4 shadow-xs transition-colors duration-300">
        <div>
          <h3 className="text-sm font-bold text-foreground dark:text-white flex items-center gap-2">
            <ImageIcon className="h-4 w-4 text-amber-600 dark:text-[#ffd233]" />
            Workflow Thumbnail Photo
          </h3>
          <p className="text-xs text-muted-foreground dark:text-[#71717a] mt-0.5">
            Add a photo URL or choose a preset to showcase on the marketplace card.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start">
          <div className="md:col-span-8 space-y-4">
            <div>
              <label className="text-xs font-semibold text-muted-foreground dark:text-[#8e8e93] block mb-1">
                Image URL (Direct link to PNG / JPG / WebP)
              </label>
              <div className="relative">
                <LinkIcon className="absolute left-3.5 top-3 h-4 w-4 text-muted-foreground dark:text-[#71717a]" />
                <Input
                  value={imageUrl}
                  onChange={(e) => setImageUrl(e.target.value)}
                  placeholder="https://images.unsplash.com/... or https://yoursite.com/photo.png"
                  className="pl-10 h-10 text-xs bg-background dark:bg-[#1a1a22] border-border dark:border-[#26262e] text-foreground dark:text-white focus:border-[#ffd233]"
                />
              </div>
            </div>

            {/* Quick Preset Selector */}
            <div className="space-y-2">
              <span className="text-[11px] font-semibold text-muted-foreground dark:text-[#8e8e93] block">
                Or pick a curated banner preset:
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5">
                {IMAGE_PRESETS.map((preset) => (
                  <button
                    key={preset.name}
                    type="button"
                    onClick={() => setImageUrl(preset.url)}
                    className={`flex items-center gap-2.5 p-2 rounded-xl border text-left text-xs transition-all ${
                      imageUrl === preset.url
                        ? "border-[#ffd233] bg-[#ffd233]/15 text-foreground dark:text-white font-bold shadow-xs"
                        : "border-border dark:border-[#26262e] bg-card dark:bg-[#1a1a22] hover:bg-muted dark:hover:bg-[#22222c] text-muted-foreground dark:text-[#8e8e93]"
                    }`}
                  >
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={preset.url}
                      alt={preset.name}
                      className="h-8 w-8 rounded-lg object-cover shrink-0"
                    />
                    <span className="truncate text-[11px]">{preset.name}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Live Preview Box */}
          <div className="md:col-span-4 space-y-2">
            <span className="text-[11px] font-semibold text-muted-foreground dark:text-[#8e8e93] block">
              Live Card Image Preview:
            </span>
            <div className="relative aspect-[16/10] w-full rounded-xl border border-border dark:border-[#26262e] bg-muted/40 dark:bg-[#1a1a22] overflow-hidden flex items-center justify-center shadow-xs">
              {isValidImageUrl(imageUrl) ? (
                <>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={imageUrl.trim()}
                    alt="Workflow preview"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-2 left-2 px-2 py-0.5 rounded-md text-[9px] font-bold bg-black/80 text-white backdrop-blur-xs">
                    {difficulty}
                  </div>
                </>
              ) : (
                <div className="text-center p-4 space-y-1.5 text-muted-foreground dark:text-[#71717a]">
                  <ImageIcon className="h-6 w-6 mx-auto opacity-40" />
                  <p className="text-[10px] leading-tight">
                    {imageUrl ? "Enter a valid link (https://...)" : "No image (fallback blueprint SVG will be shown)"}
                  </p>
                </div>
              )}
            </div>
            {imageUrl && (
              <button
                type="button"
                onClick={() => setImageUrl("")}
                className="text-[11px] text-red-500 hover:underline block text-right w-full font-medium"
              >
                Clear Photo
              </button>
            )}
          </div>
        </div>
      </div>

      {/* 3. Supported Platforms & Dynamic Engine Search / Adder */}
      <div className="rounded-2xl border border-border dark:border-[#22222a] bg-card dark:bg-[#141418] p-5 sm:p-7 space-y-4 shadow-xs transition-colors duration-300">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <h3 className="text-sm font-bold text-foreground dark:text-white flex items-center gap-2">
              <Cpu className="h-4 w-4 text-amber-600 dark:text-[#ffd233]" />
              Connected Engines & Platforms ({selectedPlatforms.length} Selected)
            </h3>
            <p className="text-xs text-muted-foreground dark:text-[#71717a] mt-0.5">
              Select or search all connected tools. Real brand vector logos will be rendered on the card.
            </p>
          </div>

          {/* Search Bar */}
          <div className="relative w-full sm:w-64">
            <Search className="absolute left-3 top-2.5 h-3.5 w-3.5 text-muted-foreground dark:text-[#71717a]" />
            <input
              type="text"
              value={platformSearch}
              onChange={(e) => setPlatformSearch(e.target.value)}
              placeholder="Search engines (e.g. Claude, YouCan)..."
              className="w-full h-8 pl-8 pr-3 text-xs rounded-xl border border-border dark:border-[#26262e] bg-background dark:bg-[#1a1a22] text-foreground dark:text-white focus:outline-none focus:border-[#ffd233]"
            />
            {platformSearch && (
              <button
                type="button"
                onClick={() => setPlatformSearch("")}
                className="absolute right-2.5 top-2 text-muted-foreground hover:text-foreground dark:text-[#71717a] dark:hover:text-white"
              >
                <X className="h-3.5 w-3.5" />
              </button>
            )}
          </div>
        </div>

        {/* Selected Platform Badges */}
        {selectedPlatforms.length > 0 && (
          <div className="flex items-center gap-1.5 flex-wrap p-3 rounded-xl bg-muted/40 dark:bg-[#1a1a22] border border-border dark:border-[#26262e]">
            <span className="text-[11px] font-bold text-muted-foreground dark:text-[#71717a] mr-1">Active:</span>
            {selectedPlatforms.map((pId) => {
              const p = platformList.find((item) => item.id === pId);
              if (!p) return null;
              return (
                <span
                  key={p.id}
                  className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-[#ffd233] text-black font-bold text-[11px] shadow-2xs"
                >
                  <PlatformIcon slug={p.slug || p.name} name={p.name} size="xs" withBadge={false} />
                  <span>{p.name}</span>
                  <button
                    type="button"
                    onClick={() => togglePlatform(p.id)}
                    className="hover:bg-black/20 rounded-full p-0.5 ml-0.5"
                    title="Remove"
                  >
                    <X className="h-3 w-3" />
                  </button>
                </span>
              );
            })}
          </div>
        )}

        {/* Platform Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-2 pt-1 max-h-80 overflow-y-auto pr-1">
          {filteredPlatforms.map((p) => {
            const isSelected = selectedPlatforms.includes(p.id);
            return (
              <button
                type="button"
                key={p.id}
                onClick={() => togglePlatform(p.id)}
                className={`flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-semibold border text-left transition-all ${
                  isSelected
                    ? "bg-[#ffd233] text-black font-bold border-[#ffd233] shadow-xs"
                    : "bg-card dark:bg-[#1a1a22] text-foreground dark:text-[#d4d4d8] border-border dark:border-[#26262e] hover:bg-muted dark:hover:bg-[#22222c]"
                }`}
              >
                <PlatformIcon slug={p.slug || p.name} name={p.name} size="xs" withBadge={false} />
                <span className="truncate flex-1 text-[11px]">{p.name}</span>
                {isSelected && <Check className="h-3.5 w-3.5 shrink-0 text-black font-bold" />}
              </button>
            );
          })}
        </div>

        {/* Dynamic "Add New Engine" Box */}
        <div className="pt-3 border-t border-border dark:border-[#22222a] flex flex-col sm:flex-row items-stretch sm:items-center gap-2">
          <div className="flex-1 flex items-center gap-2">
            <Input
              value={customEngineName}
              onChange={(e) => setCustomEngineName(e.target.value)}
              placeholder="Add any other engine (e.g. DeepSeek-V3, Klaviyo, YouCan Pay)..."
              className="h-9 text-xs bg-background dark:bg-[#1a1a22] border-border dark:border-[#26262e] text-foreground dark:text-white focus:border-[#ffd233]"
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault();
                  handleCreateCustomEngine();
                }
              }}
            />
            <Button
              type="button"
              size="sm"
              disabled={creatingPlatform || !customEngineName.trim()}
              onClick={() => handleCreateCustomEngine()}
              className="h-9 px-4 text-xs font-bold rounded-xl bg-card dark:bg-[#262630] hover:bg-muted dark:hover:bg-[#32323e] text-foreground dark:text-white border border-border dark:border-[#383844] shrink-0 gap-1.5 shadow-xs"
            >
              {creatingPlatform ? (
                <Loader2 className="h-3.5 w-3.5 animate-spin" />
              ) : (
                <Plus className="h-3.5 w-3.5" />
              )}
              <span>+ Add Engine</span>
            </Button>
          </div>

          {platformSearch && filteredPlatforms.length === 0 && (
            <button
              type="button"
              onClick={() => handleCreateCustomEngine(platformSearch)}
              className="text-xs text-amber-600 dark:text-[#ffd233] hover:underline font-bold text-left"
            >
              + Create & select &ldquo;{platformSearch}&rdquo;
            </button>
          )}
        </div>
      </div>

      {/* 4. Steps Pipeline Builder */}
      <div className="rounded-2xl border border-border dark:border-[#22222a] bg-card dark:bg-[#141418] p-5 sm:p-7 space-y-4 shadow-xs transition-colors duration-300">
        <div className="flex items-center justify-between flex-wrap gap-2">
          <div>
            <h3 className="text-sm font-bold text-foreground dark:text-white flex items-center gap-2">
              <Zap className="h-4 w-4 text-amber-600 dark:text-[#ffd233]" />
              Workflow Pipeline Steps ({steps.length})
            </h3>
            <p className="text-xs text-muted-foreground dark:text-[#71717a]">
              Define the visual sequence of triggers, actions, and conditions.
            </p>
          </div>

          <button
            type="button"
            onClick={handleAddStep}
            className="h-8 px-3 rounded-xl bg-card dark:bg-[#1a1a22] hover:bg-muted dark:hover:bg-[#252530] border border-border dark:border-[#26262e] text-xs font-bold text-foreground dark:text-white inline-flex items-center gap-1.5 transition-colors shadow-xs"
          >
            <Plus className="h-3.5 w-3.5" />
            <span>Add Step</span>
          </button>
        </div>

        <div className="space-y-3 pt-2">
          {steps.map((step, idx) => (
            <div
              key={idx}
              className="p-4 rounded-xl border border-border dark:border-[#26262e] bg-muted/40 dark:bg-[#101014] space-y-3 relative group"
            >
              <div className="flex items-center justify-between gap-2">
                <div className="flex items-center gap-2">
                  <span className="font-mono text-[10px] font-bold px-2 py-0.5 rounded-md bg-[#ffd233]/20 text-amber-900 dark:text-[#ffd233] border border-[#ffd233]/30">
                    Step {step.order}
                  </span>
                  <span className="text-xs font-bold text-foreground dark:text-white">
                    Node Configuration
                  </span>
                </div>

                {steps.length > 1 && (
                  <button
                    type="button"
                    onClick={() => handleRemoveStep(idx)}
                    className="text-red-500 hover:bg-red-500/10 p-1 rounded-lg transition-colors"
                    title="Remove step"
                  >
                    <Trash2 className="h-3.5 w-3.5" />
                  </button>
                )}
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="text-[11px] font-semibold text-muted-foreground dark:text-[#8e8e93] block mb-1">
                    Step Name
                  </label>
                  <Input
                    required
                    value={step.name}
                    onChange={(e) =>
                      handleStepFieldChange(idx, "name", e.target.value)
                    }
                    placeholder="e.g. WhatsApp Inbound Trigger"
                    className="h-9 text-xs bg-background dark:bg-[#1a1a22] border-border dark:border-[#26262e] text-foreground dark:text-white focus:border-[#ffd233]"
                  />
                </div>

                <div>
                  <label className="text-[11px] font-semibold text-muted-foreground dark:text-[#8e8e93] block mb-1">
                    Step Type
                  </label>
                  <select
                    value={step.type}
                    onChange={(e) =>
                      handleStepFieldChange(idx, "type", e.target.value)
                    }
                    aria-label={`Step ${idx + 1} type`}
                    className="h-9 w-full rounded-xl border border-border dark:border-[#26262e] bg-background dark:bg-[#1a1a22] px-3 text-xs text-foreground dark:text-white focus:outline-none focus:border-[#ffd233]"
                  >
                    <option value="TRIGGER">TRIGGER</option>
                    <option value="ACTION">ACTION</option>
                    <option value="CONDITION">CONDITION</option>
                    <option value="TRANSFORM">TRANSFORM</option>
                    <option value="NOTIFICATION">NOTIFICATION</option>
                  </select>
                </div>

                <div>
                  <label className="text-[11px] font-semibold text-muted-foreground dark:text-[#8e8e93] block mb-1">
                    App / Service Name
                  </label>
                  <Input
                    value={step.appName || ""}
                    onChange={(e) =>
                      handleStepFieldChange(idx, "appName", e.target.value)
                    }
                    placeholder="e.g. OpenAI GPT-4o"
                    className="h-9 text-xs bg-background dark:bg-[#1a1a22] border-border dark:border-[#26262e] text-foreground dark:text-white focus:border-[#ffd233]"
                  />
                </div>
              </div>

              <div>
                <label className="text-[11px] font-semibold text-muted-foreground dark:text-[#8e8e93] block mb-1">
                  Step Description / Notes
                </label>
                <Input
                  value={step.description || ""}
                  onChange={(e) =>
                    handleStepFieldChange(idx, "description", e.target.value)
                  }
                  placeholder="What happens in this step..."
                  className="h-9 text-xs bg-background dark:bg-[#1a1a22] border-border dark:border-[#26262e] text-foreground dark:text-white focus:border-[#ffd233]"
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 5. Trigger & Outcome Descriptions */}
      <div className="rounded-2xl border border-border dark:border-[#22222a] bg-card dark:bg-[#141418] p-5 sm:p-7 space-y-4 shadow-xs transition-colors duration-300">
        <h3 className="text-sm font-bold text-foreground dark:text-white">
          Triggers & Expected Outcomes
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="text-xs font-semibold text-muted-foreground dark:text-[#8e8e93] block mb-1">
              When Triggered
            </label>
            <Textarea
              rows={2}
              value={triggersDesc}
              onChange={(e) => setTriggersDesc(e.target.value)}
              placeholder="e.g. Triggered whenever a customer sends a message on WhatsApp..."
              className="text-xs bg-background dark:bg-[#1a1a22] border-border dark:border-[#26262e] text-foreground dark:text-white focus:border-[#ffd233]"
            />
          </div>
          <div>
            <label className="text-xs font-semibold text-muted-foreground dark:text-[#8e8e93] block mb-1">
              Outcome / Result
            </label>
            <Textarea
              rows={2}
              value={outcomesDesc}
              onChange={(e) => setOutcomesDesc(e.target.value)}
              placeholder="e.g. Instant response sent, lead stored in CRM sheet, rep notified."
              className="text-xs bg-background dark:bg-[#1a1a22] border-border dark:border-[#26262e] text-foreground dark:text-white focus:border-[#ffd233]"
            />
          </div>
        </div>
      </div>

      {/* Submit Button Bar */}
      <div className="flex items-center justify-between pt-4 border-t border-border dark:border-[#22222a]">
        <button
          type="button"
          onClick={() => router.back()}
          className="h-10 px-5 rounded-xl border border-border dark:border-[#26262e] bg-card dark:bg-[#1a1a22] hover:bg-muted dark:hover:bg-[#22222a] text-xs font-semibold text-muted-foreground dark:text-[#a1a1aa] hover:text-foreground dark:hover:text-white inline-flex items-center gap-1.5 transition-colors shadow-xs"
        >
          <ArrowLeft className="h-3.5 w-3.5" />
          Cancel
        </button>

        <Button
          type="submit"
          disabled={pending}
          className="font-bold bg-[#ffd233] text-black hover:bg-[#f5c71a] gap-2 text-xs h-11 px-8 rounded-xl shadow-md shadow-[#ffd233]/20"
        >
          {pending ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" />
              Saving Workflow...
            </>
          ) : (
            <>
              <Save className="h-4 w-4" />
              {initialData?.id ? "Update Workflow" : "Create Workflow"}
            </>
          )}
        </Button>
      </div>
    </form>
  );
}
