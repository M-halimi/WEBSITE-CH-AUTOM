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
  Bot,
  GitBranch,
  Shuffle,
  Bell,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import {
  createWorkflow,
  updateWorkflow,
  StepInput,
  WorkflowFormData,
} from "@/actions/workflowActions";
import { slugify } from "@/lib/utils";

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
    categoryId?: string | null;
    triggersDescription?: string | null;
    outcomesDescription?: string | null;
    platforms?: { platformId: string }[];
    steps?: StepInput[];
  };
  categories: { id: string; name: string }[];
  platforms: { id: string; name: string }[];
}

export function WorkflowForm({
  initialData,
  categories,
  platforms,
}: WorkflowFormProps) {
  const router = useRouter();
  const [pending, setPending] = React.useState(false);
  const [errorMessage, setErrorMessage] = React.useState<string | null>(null);

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
  const [price, setPrice] = React.useState(
    initialData?.price || "Free Template",
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
    // Re-index orders
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

  return (
    <form onSubmit={handleSubmit} className="space-y-8 max-w-5xl">
      {errorMessage && (
        <div className="p-4 rounded-xl bg-destructive/10 border border-destructive/30 text-destructive text-xs font-semibold">
          {errorMessage}
        </div>
      )}

      {/* 1. Basic Info Section */}
      <div className="rounded-2xl border border-border bg-card p-6 space-y-4">
        <h3 className="text-base font-bold text-foreground flex items-center gap-2">
          <Layers className="h-4 w-4 text-primary" />
          General Information
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="text-xs font-semibold text-foreground block mb-1">
              Workflow Title *
            </label>
            <Input
              required
              value={title}
              onChange={(e) => handleTitleChange(e.target.value)}
              placeholder="e.g. WhatsApp AI Lead Qualifier & CRM Sync"
              className="h-10 text-sm"
            />
          </div>
          <div>
            <label className="text-xs font-semibold text-foreground block mb-1">
              URL Slug *
            </label>
            <Input
              required
              value={slug}
              onChange={(e) => setSlug(slugify(e.target.value))}
              placeholder="whatsapp-ai-lead-qualifier"
              className="h-10 text-sm font-mono text-xs"
            />
          </div>
        </div>

        <div>
          <label className="text-xs font-semibold text-foreground block mb-1">
            Short Summary (1-2 sentences for catalog card) *
          </label>
          <Textarea
            required
            rows={2}
            value={summary}
            onChange={(e) => setSummary(e.target.value)}
            placeholder="Brief overview explaining what this workflow accomplishes..."
            className="text-xs leading-relaxed"
          />
        </div>

        <div>
          <label className="text-xs font-semibold text-foreground block mb-1">
            Detailed Description & Instructions (Markdown supported) *
          </label>
          <Textarea
            required
            rows={5}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Full technical explanation, value props, prerequisites, etc."
            className="text-xs font-mono leading-relaxed"
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 pt-2">
          <div>
            <label className="text-xs font-semibold text-foreground block mb-1">
              Category
            </label>
            <select
              value={categoryId}
              onChange={(e) => setCategoryId(e.target.value)}
              aria-label="Workflow Category"
              className="h-10 w-full rounded-lg border border-input bg-background px-3 text-xs focus:outline-none focus:ring-2 focus:ring-primary"
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
            <label className="text-xs font-semibold text-foreground block mb-1">
              Difficulty
            </label>
            <select
              value={difficulty}
              onChange={(e) => setDifficulty(e.target.value)}
              aria-label="Difficulty level"
              className="h-10 w-full rounded-lg border border-input bg-background px-3 text-xs focus:outline-none focus:ring-2 focus:ring-primary"
            >
              <option value="BEGINNER">BEGINNER</option>
              <option value="INTERMEDIATE">INTERMEDIATE</option>
              <option value="ADVANCED">ADVANCED</option>
            </select>
          </div>

          <div>
            <label className="text-xs font-semibold text-foreground block mb-1">
              Setup Time
            </label>
            <Input
              value={estimatedTime}
              onChange={(e) => setEstimatedTime(e.target.value)}
              placeholder="e.g. 20 mins"
              className="h-10 text-xs"
            />
          </div>

          <div>
            <label className="text-xs font-semibold text-foreground block mb-1">
              Status
            </label>
            <select
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              aria-label="Workflow status"
              className="h-10 w-full rounded-lg border border-input bg-background px-3 text-xs focus:outline-none focus:ring-2 focus:ring-primary"
            >
              <option value="DRAFT">DRAFT</option>
              <option value="PUBLISHED">PUBLISHED</option>
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
            className="h-4 w-4 rounded border-border text-primary focus:ring-primary"
          />
          <label
            htmlFor="featuredCheck"
            className="text-xs font-semibold text-foreground cursor-pointer"
          >
            Mark as Featured (Shown on Homepage Hero section)
          </label>
        </div>
      </div>

      {/* 2. Supported Platforms */}
      <div className="rounded-2xl border border-border bg-card p-6 space-y-4">
        <h3 className="text-base font-bold text-foreground">
          Integrations & Platforms
        </h3>
        <p className="text-xs text-muted-foreground">
          Select all technologies involved in this workflow:
        </p>
        <div className="flex flex-wrap gap-2">
          {platforms.map((p) => {
            const isSelected = selectedPlatforms.includes(p.id);
            return (
              <button
                type="button"
                key={p.id}
                onClick={() => togglePlatform(p.id)}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium border transition-colors ${
                  isSelected
                    ? "bg-primary text-primary-foreground border-primary"
                    : "bg-muted/40 text-muted-foreground border-border hover:bg-muted"
                }`}
              >
                {p.name}
              </button>
            );
          })}
        </div>
      </div>

      {/* 3. Steps Pipeline Builder */}
      <div className="rounded-2xl border border-border bg-card p-6 space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-base font-bold text-foreground flex items-center gap-2">
              <Zap className="h-4 w-4 text-amber-500" />
              Workflow Pipeline Steps ({steps.length})
            </h3>
            <p className="text-xs text-muted-foreground">
              Define the visual sequence of triggers, actions, and conditions.
            </p>
          </div>

          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={handleAddStep}
            className="gap-1 text-xs"
          >
            <Plus className="h-3.5 w-3.5" />
            Add Step
          </Button>
        </div>

        <div className="space-y-4 pt-2">
          {steps.map((step, idx) => (
            <div
              key={idx}
              className="p-4 rounded-xl border border-border/70 bg-background/60 space-y-3 relative group"
            >
              <div className="flex items-center justify-between gap-2">
                <div className="flex items-center gap-2">
                  <Badge variant="outline" className="text-xs font-mono">
                    Step {step.order}
                  </Badge>
                  <span className="text-xs font-bold text-foreground">
                    Node Config
                  </span>
                </div>

                {steps.length > 1 && (
                  <button
                    type="button"
                    onClick={() => handleRemoveStep(idx)}
                    className="text-destructive hover:bg-destructive/10 p-1.5 rounded-lg transition-colors"
                    title="Remove step"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                )}
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="text-[11px] font-semibold text-muted-foreground block mb-1">
                    Step Name
                  </label>
                  <Input
                    required
                    value={step.name}
                    onChange={(e) =>
                      handleStepFieldChange(idx, "name", e.target.value)
                    }
                    placeholder="e.g. WhatsApp Inbound Trigger"
                    className="h-9 text-xs"
                  />
                </div>

                <div>
                  <label className="text-[11px] font-semibold text-muted-foreground block mb-1">
                    Step Type
                  </label>
                  <select
                    value={step.type}
                    onChange={(e) =>
                      handleStepFieldChange(idx, "type", e.target.value)
                    }
                    aria-label={`Step ${idx + 1} type`}
                    className="h-9 w-full rounded-lg border border-input bg-background px-3 text-xs focus:outline-none focus:ring-2 focus:ring-primary"
                  >
                    <option value="TRIGGER">TRIGGER</option>
                    <option value="ACTION">ACTION</option>
                    <option value="CONDITION">CONDITION</option>
                    <option value="TRANSFORM">TRANSFORM</option>
                    <option value="NOTIFICATION">NOTIFICATION</option>
                  </select>
                </div>

                <div>
                  <label className="text-[11px] font-semibold text-muted-foreground block mb-1">
                    App / Service Name
                  </label>
                  <Input
                    value={step.appName || ""}
                    onChange={(e) =>
                      handleStepFieldChange(idx, "appName", e.target.value)
                    }
                    placeholder="e.g. OpenAI GPT-4o"
                    className="h-9 text-xs"
                  />
                </div>
              </div>

              <div>
                <label className="text-[11px] font-semibold text-muted-foreground block mb-1">
                  Step Description / Notes
                </label>
                <Input
                  value={step.description || ""}
                  onChange={(e) =>
                    handleStepFieldChange(idx, "description", e.target.value)
                  }
                  placeholder="What happens in this step..."
                  className="h-9 text-xs"
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 4. Trigger & Outcome Descriptions */}
      <div className="rounded-2xl border border-border bg-card p-6 space-y-4">
        <h3 className="text-base font-bold text-foreground">
          Triggers & Expected Outcomes
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="text-xs font-semibold text-foreground block mb-1">
              When Triggered
            </label>
            <Textarea
              rows={2}
              value={triggersDesc}
              onChange={(e) => setTriggersDesc(e.target.value)}
              placeholder="e.g. Triggered whenever a customer sends a message on WhatsApp..."
              className="text-xs"
            />
          </div>
          <div>
            <label className="text-xs font-semibold text-foreground block mb-1">
              Outcome / Result
            </label>
            <Textarea
              rows={2}
              value={outcomesDesc}
              onChange={(e) => setOutcomesDesc(e.target.value)}
              placeholder="e.g. Instant response sent, lead stored in CRM sheet, rep notified."
              className="text-xs"
            />
          </div>
        </div>
      </div>

      {/* Submit button bar */}
      <div className="flex items-center justify-between pt-4 border-t border-border">
        <Button
          type="button"
          variant="outline"
          onClick={() => router.back()}
          className="gap-1.5 text-xs"
        >
          <ArrowLeft className="h-3.5 w-3.5" />
          Cancel
        </Button>

        <Button
          type="submit"
          disabled={pending}
          className="font-bold bg-primary text-primary-foreground hover:bg-primary/90 gap-2 text-xs h-10 px-6"
        >
          {pending ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" />
              Saving...
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
