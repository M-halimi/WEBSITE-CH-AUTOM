"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  Building2,
  AlertTriangle,
  GitCommit,
  Zap,
  Cpu,
  UploadCloud,
  CheckCircle2,
  Check,
  ChevronRight,
  ChevronLeft,
  Plus,
  Trash2,
  ArrowUp,
  ArrowDown,
  Sparkles,
  Save,
  Loader2,
  FileText,
  HelpCircle,
  Clock,
  Coins,
  ShieldCheck,
  Lock,
  X,
  FileSpreadsheet,
  FileIcon,
  MessageSquare,
  PartyPopper
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { PlatformIcon } from "@/components/ui/platform-icon";
import {
  submitWorkflowRequest,
  saveWorkflowRequestDraft,
  generateAIWorkflowSuggestions,
} from "@/actions/clientWorkflowActions";
import {
  WorkflowStepInput,
  WorkflowIntegrationInput,
  WorkflowFileInput,
  WorkflowRequestFormData,
} from "@/types/clientWorkflow";
import confetti from "canvas-confetti";

interface WorkflowWizardProps {
  userId: string;
  userName: string;
  userCompany?: string | null;
  quota: {
    allowed: boolean;
    limit: number;
    used: number;
    remaining: number;
    planName: string;
    isUnlimited: boolean;
    requiresPlan?: boolean;
  };
  platforms: { id: string; name: string; slug: string }[];
}

const POPULAR_TOOLS = [
  "WhatsApp Business",
  "Shopify",
  "Google Sheets",
  "Gmail",
  "OpenAI / GPT-4o",
  "Stripe",
  "Meta Lead Ads",
  "WooCommerce",
  "YouCan",
  "HubSpot",
  "Notion",
  "Twilio SMS",
  "Google Drive",
  "Telegram",
  "Slack",
  "Excel",
];

export function WorkflowWizard({
  userId,
  userName,
  userCompany,
  quota,
  platforms,
}: WorkflowWizardProps) {
  const router = useRouter();
  const [currentStep, setCurrentStep] = React.useState(1);
  const [pending, setPending] = React.useState(false);
  const [savingDraft, setSavingDraft] = React.useState(false);
  const [errorMessage, setErrorMessage] = React.useState<string | null>(null);
  const [submittedId, setSubmittedId] = React.useState<string | null>(null);
  const [lastSavedTime, setLastSavedTime] = React.useState<string | null>(null);

  // AI Assistance State
  const [aiGenerating, setAiGenerating] = React.useState(false);
  const [aiSuggestions, setAiSuggestions] = React.useState<any>(null);

  // Form Fields State
  const [businessName, setBusinessName] = React.useState(userCompany || userName || "");
  const [businessType, setBusinessType] = React.useState("E-commerce / Retail");
  const [industry, setIndustry] = React.useState("");
  const [businessDescription, setBusinessDescription] = React.useState("");
  const [targetCustomers, setTargetCustomers] = React.useState("");
  const [customerChannels, setCustomerChannels] = React.useState<string[]>(["WhatsApp", "Website"]);
  
  // Step 2: Problem
  const [title, setTitle] = React.useState("");
  const [problemDescription, setProblemDescription] = React.useState("");
  const [frequency, setFrequency] = React.useState("Daily");
  const [estimatedTime, setEstimatedTime] = React.useState("1-2 hours daily");
  const [costOfFailure, setCostOfFailure] = React.useState("");
  const [priority, setPriority] = React.useState<"LOW" | "MEDIUM" | "HIGH" | "CRITICAL">("HIGH");

  // Step 3: Current Process Steps
  const [currentSteps, setCurrentSteps] = React.useState<WorkflowStepInput[]>([
    { order: 1, phase: "CURRENT", title: "Customer sends inquiry or order", tool: "WhatsApp / Chat", responsiblePerson: "Customer" },
    { order: 2, phase: "CURRENT", title: "Manually review details and verify inventory", tool: "Store Admin", responsiblePerson: "Me / Support Rep" },
    { order: 3, phase: "CURRENT", title: "Copy customer info into spreadsheet / CRM", tool: "Google Sheets / Excel", responsiblePerson: "Manual Entry" },
    { order: 4, phase: "CURRENT", title: "Send manual order confirmation and invoice", tool: "WhatsApp / Email", responsiblePerson: "Support Rep" },
  ]);

  // Step 4: Desired Automation
  const [desiredAutomationDesc, setDesiredAutomationDesc] = React.useState("");
  const [desiredSteps, setDesiredSteps] = React.useState<WorkflowStepInput[]>([
    { order: 1, phase: "DESIRED", title: "Instant trigger on incoming message / order", tool: "WhatsApp Cloud API / Webhook", expectedResult: "System captures message payload immediately" },
    { order: 2, phase: "DESIRED", title: "AI extracts customer info, product & address", tool: "OpenAI GPT-4o Agent", expectedResult: "Clean structured data parsed automatically" },
    { order: 3, phase: "DESIRED", title: "Record order in Google Sheets & CRM", tool: "Google Sheets / DB", expectedResult: "Database synced with zero manual copy-pasting" },
    { order: 4, phase: "DESIRED", title: "Send automated WhatsApp confirmation & PDF invoice", tool: "WhatsApp Cloud API", expectedResult: "Customer receives instant branded confirmation message" },
  ]);

  // Step 5: Tools & Integrations
  const [selectedTools, setSelectedTools] = React.useState<WorkflowIntegrationInput[]>([
    { toolName: "WhatsApp Business", toolCategory: "Messaging", purpose: "Receiving customer messages and orders", hasApi: true },
    { toolName: "Google Sheets", toolCategory: "Spreadsheet", purpose: "Logging orders and tracking customer status", hasApi: true },
  ]);

  // Step 6: Files & Examples
  const [files, setFiles] = React.useState<WorkflowFileInput[]>([]);

  // Step 7: Expected Result & Criteria
  const [expectedResult, setExpectedResult] = React.useState("");
  const [successCriteria, setSuccessCriteria] = React.useState("");
  const [expectedDeadline, setExpectedDeadline] = React.useState("Within 48 hours");
  const [budgetRange, setBudgetRange] = React.useState("Standard Subscription Included");
  const [additionalNotes, setAdditionalNotes] = React.useState("");

  // Autosave to LocalStorage on change
  React.useEffect(() => {
    try {
      const draft = localStorage.getItem(`autoflows_draft_${userId}`);
      if (draft) {
        const parsed = JSON.parse(draft);
        if (parsed.businessName) setBusinessName(parsed.businessName);
        if (parsed.businessType) setBusinessType(parsed.businessType);
        if (parsed.businessDescription) setBusinessDescription(parsed.businessDescription);
        if (parsed.title) setTitle(parsed.title);
        if (parsed.problemDescription) setProblemDescription(parsed.problemDescription);
        if (parsed.currentSteps?.length) setCurrentSteps(parsed.currentSteps);
        if (parsed.desiredSteps?.length) setDesiredSteps(parsed.desiredSteps);
        if (parsed.selectedTools?.length) setSelectedTools(parsed.selectedTools);
        if (parsed.expectedResult) setExpectedResult(parsed.expectedResult);
      }
    } catch (e) {}
  }, [userId]);

  const saveLocalDraft = () => {
    try {
      const draftData = {
        businessName,
        businessType,
        businessDescription,
        title,
        problemDescription,
        currentSteps,
        desiredSteps,
        selectedTools,
        expectedResult,
        updatedAt: new Date().toISOString(),
      };
      localStorage.setItem(`autoflows_draft_${userId}`, JSON.stringify(draftData));
      setLastSavedTime(new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }));
    } catch (e) {}
  };

  // Step 3 Actions: Add, Remove, Move
  const handleAddCurrentStep = () => {
    setCurrentSteps([
      ...currentSteps,
      {
        order: currentSteps.length + 1,
        phase: "CURRENT",
        title: `Step ${currentSteps.length + 1}`,
        tool: "Tool / App",
        responsiblePerson: "Team Member",
      },
    ]);
  };

  const handleRemoveCurrentStep = (idx: number) => {
    const updated = currentSteps.filter((_, i) => i !== idx).map((s, i) => ({ ...s, order: i + 1 }));
    setCurrentSteps(updated);
  };

  const handleMoveCurrentStep = (idx: number, dir: "UP" | "DOWN") => {
    if ((dir === "UP" && idx === 0) || (dir === "DOWN" && idx === currentSteps.length - 1)) return;
    const targetIdx = dir === "UP" ? idx - 1 : idx + 1;
    const copy = [...currentSteps];
    const temp = copy[idx];
    copy[idx] = copy[targetIdx];
    copy[targetIdx] = temp;
    setCurrentSteps(copy.map((s, i) => ({ ...s, order: i + 1 })));
  };

  // Step 4 Actions: Add, Remove, Move Desired Steps
  const handleAddDesiredStep = () => {
    setDesiredSteps([
      ...desiredSteps,
      {
        order: desiredSteps.length + 1,
        phase: "DESIRED",
        title: `Automated Action ${desiredSteps.length + 1}`,
        tool: "Engine / Service",
        expectedResult: "Automated trigger / sync",
      },
    ]);
  };

  const handleRemoveDesiredStep = (idx: number) => {
    const updated = desiredSteps.filter((_, i) => i !== idx).map((s, i) => ({ ...s, order: i + 1 }));
    setDesiredSteps(updated);
  };

  // Step 5 Actions: Toggle Tools
  const toggleTool = (toolName: string) => {
    const existing = selectedTools.find((t) => t.toolName === toolName);
    if (existing) {
      setSelectedTools(selectedTools.filter((t) => t.toolName !== toolName));
    } else {
      setSelectedTools([
        ...selectedTools,
        {
          toolName,
          toolCategory: "General",
          purpose: `Used for ${businessName || "business operations"}`,
          hasApi: true,
        },
      ]);
    }
  };

  // Step 6: File Upload Simulation (Base64)
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const uploaded = e.target.files;
    if (!uploaded || uploaded.length === 0) return;

    Array.from(uploaded).forEach((file) => {
      const reader = new FileReader();
      reader.onload = (event) => {
        setFiles((prev) => [
          ...prev,
          {
            fileName: file.name,
            fileUrl: (event.target?.result as string) || "",
            fileType: file.type || "application/octet-stream",
            fileSize: file.size,
          },
        ]);
      };
      reader.readAsDataURL(file);
    });
  };

  const handleRemoveFile = (idx: number) => {
    setFiles(files.filter((_, i) => i !== idx));
  };

  // Trigger Smart AI Assistance
  const handleGenerateAISuggestions = async () => {
    setAiGenerating(true);
    const res = await generateAIWorkflowSuggestions(
      problemDescription || businessDescription || "We receive customer inquiries on WhatsApp and manually log them in Google Sheets.",
      businessType
    );
    setAiGenerating(false);

    if (res.success && res.suggestions) {
      setAiSuggestions(res.suggestions);
    }
  };

  const handleAcceptAISuggestions = () => {
    if (!aiSuggestions) return;
    if (aiSuggestions.currentSteps?.length) {
      setCurrentSteps(aiSuggestions.currentSteps.map((s: any, idx: number) => ({ ...s, order: idx + 1, phase: "CURRENT" })));
    }
    if (aiSuggestions.desiredSteps?.length) {
      setDesiredSteps(aiSuggestions.desiredSteps.map((s: any, idx: number) => ({ ...s, order: idx + 1, phase: "DESIRED" })));
    }
    if (aiSuggestions.suggestedTools?.length) {
      const newTools = aiSuggestions.suggestedTools.map((tName: string) => ({
        toolName: tName,
        purpose: "Auto-suggested integration tool",
        hasApi: true,
      }));
      setSelectedTools(newTools);
    }
    setAiSuggestions(null);
  };

  // Final Submission
  const handleSubmitRequest = async () => {
    setPending(true);
    setErrorMessage(null);

    const payload: WorkflowRequestFormData = {
      title: title || `${businessName} Automation System`,
      businessName,
      businessType,
      industry: industry || businessType,
      businessDescription,
      targetCustomers,
      customerChannels: customerChannels.join(", "),
      problemDescription,
      frequency,
      estimatedTime,
      costOfFailure,
      priority,
      desiredAutomationDesc,
      expectedResult: expectedResult || "Complete automated zero-friction system.",
      successCriteria,
      expectedDeadline,
      budgetRange,
      additionalNotes,
      currentSteps,
      desiredSteps,
      integrations: selectedTools,
      files,
    };

    const res = await submitWorkflowRequest(payload);
    setPending(false);

    if (res.success && res.requestId) {
      setSubmittedId(res.requestId);
      localStorage.removeItem(`autoflows_draft_${userId}`);
      confetti({ particleCount: 100, spread: 70, origin: { y: 0.6 } });
    } else {
      setErrorMessage(res.error || "Failed to submit request.");
    }
  };

  // Quota Guard Check
  if (!quota.allowed && !submittedId) {
    return (
      <div className="rounded-3xl border border-border dark:border-[#22222a] bg-card dark:bg-[#141418] p-8 sm:p-12 text-center max-w-xl mx-auto space-y-5 shadow-lg">
        <div className="h-16 w-16 rounded-2xl bg-amber-500/10 border border-amber-500/20 text-amber-600 dark:text-[#ffd233] flex items-center justify-center mx-auto">
          <Zap className="h-8 w-8" />
        </div>
        <div className="space-y-2">
          <h2 className="text-xl font-black text-foreground dark:text-white">
            Workflow Request Limit Reached
          </h2>
          <p className="text-xs sm:text-sm text-muted-foreground dark:text-[#8e8e93] leading-relaxed">
            You are currently on the <strong className="text-foreground dark:text-white">{quota.planName}</strong> plan ({quota.limit} workflow quota). You have utilized all available workflow credits.
          </p>
        </div>
        <div className="p-4 rounded-xl bg-muted/40 dark:bg-[#1b1b22] border border-border dark:border-[#26262e] text-xs text-left space-y-1.5">
          <div className="flex justify-between font-bold">
            <span className="text-foreground dark:text-white">Active Plan Quota:</span>
            <span className="text-amber-700 dark:text-[#ffd233]">{quota.used} / {quota.limit} Workflows Used</span>
          </div>
          <p className="text-[11px] text-muted-foreground dark:text-[#71717a]">
            Upgrade to the Business or Pro plan for up to 5 or unlimited concurrent production workflows.
          </p>
        </div>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
          <Link
            href="/dashboard/subscription"
            className="w-full sm:w-auto h-11 px-6 rounded-xl bg-[#ffd233] hover:bg-[#f5c71a] text-black font-extrabold text-xs inline-flex items-center justify-center gap-2 shadow-xs transition-all"
          >
            <Zap className="h-4 w-4" />
            <span>Upgrade Subscription Plan</span>
          </Link>
          <Link
            href="/dashboard/workflows"
            className="w-full sm:w-auto h-11 px-6 rounded-xl bg-muted dark:bg-[#1b1b22] hover:bg-muted/80 text-foreground dark:text-white font-semibold text-xs inline-flex items-center justify-center transition-colors"
          >
            <span>View Active Workflows</span>
          </Link>
        </div>
      </div>
    );
  }

  // Success State
  if (submittedId) {
    return (
      <div className="rounded-3xl border border-emerald-500/30 bg-card dark:bg-[#141418] p-8 sm:p-12 text-center max-w-xl mx-auto space-y-6 animate-in fade-in zoom-in-95 duration-300 shadow-xl">
        <div className="h-16 w-16 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-600 dark:text-emerald-400 flex items-center justify-center mx-auto">
          <PartyPopper className="h-8 w-8" />
        </div>

        <div className="space-y-2">
          <span className="px-3 py-1 rounded-full text-xs font-bold bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 border border-emerald-500/30">
            Request #{submittedId.slice(0, 8)} Submitted
          </span>
          <h2 className="text-2xl font-black text-foreground dark:text-white tracking-tight">
            Your Workflow Request is in Review!
          </h2>
          <p className="text-xs sm:text-sm text-muted-foreground dark:text-[#8e8e93] leading-relaxed">
            Our automation engineering team has received your process breakdown. We will structure your n8n/Make nodes and notify you within 24–48 hours.
          </p>
        </div>

        <div className="p-4 rounded-2xl bg-muted/40 dark:bg-[#18181f] border border-border dark:border-[#26262e] text-xs text-left space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-muted-foreground dark:text-[#71717a]">Status:</span>
            <span className="font-bold text-amber-700 dark:text-amber-400">PENDING_REVIEW</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-muted-foreground dark:text-[#71717a]">Workflow:</span>
            <span className="font-bold text-foreground dark:text-white">{title || businessName}</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-muted-foreground dark:text-[#71717a]">Turnkey Timeline:</span>
            <span className="font-bold text-foreground dark:text-white">{expectedDeadline}</span>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
          <Link
            href={`/dashboard/workflows/${submittedId}`}
            className="w-full sm:w-auto h-11 px-6 rounded-xl bg-[#ffd233] hover:bg-[#f5c71a] text-black font-extrabold text-xs inline-flex items-center justify-center gap-2 shadow-xs transition-all"
          >
            <span>Open Project Hub</span>
            <ChevronRight className="h-4 w-4" />
          </Link>
          <Link
            href="/dashboard"
            className="w-full sm:w-auto h-11 px-6 rounded-xl bg-muted dark:bg-[#1b1b22] hover:bg-muted/80 text-foreground dark:text-white font-semibold text-xs inline-flex items-center justify-center transition-colors"
          >
            <span>Back to Dashboard</span>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      {/* Top Stepper Header */}
      <div className="rounded-2xl border border-border dark:border-[#22222a] bg-card dark:bg-[#141418] p-4 sm:p-6 space-y-4 shadow-xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded-md bg-[#ffd233]/20 text-amber-800 dark:text-[#ffd233] border border-[#ffd233]/30">
                STEP {currentStep} OF 8
              </span>
              {lastSavedTime && (
                <span className="text-[10px] text-muted-foreground dark:text-[#71717a]">
                  ● Autosaved at {lastSavedTime}
                </span>
              )}
            </div>
            <h2 className="text-lg font-black text-foreground dark:text-white tracking-tight mt-1">
              {currentStep === 1 && "1. Tell Us About Your Business"}
              {currentStep === 2 && "2. What Problem Do You Want to Solve?"}
              {currentStep === 3 && "3. How Do You Do This Today? (Current Steps)"}
              {currentStep === 4 && "4. What Should Happen Automatically?"}
              {currentStep === 5 && "5. What Tools Do You Currently Use?"}
              {currentStep === 6 && "6. Attach Screenshots & Examples"}
              {currentStep === 7 && "7. Expected Results & Success Criteria"}
              {currentStep === 8 && "8. Review & Submit Workflow Request"}
            </h2>
          </div>

          {/* Save Draft Action */}
          <button
            type="button"
            onClick={saveLocalDraft}
            className="h-8 px-3 rounded-xl bg-muted dark:bg-[#1b1b22] hover:bg-muted/80 border border-border dark:border-[#26262e] text-xs font-semibold text-foreground dark:text-[#d4d4d8] inline-flex items-center gap-1.5 transition-colors self-start sm:self-auto shadow-xs"
          >
            <Save className="h-3.5 w-3.5 text-amber-600 dark:text-[#ffd233]" />
            <span>Save Draft</span>
          </button>
        </div>

        {/* Stepper Progress Bar */}
        <div className="space-y-1.5 pt-1">
          <div className="grid grid-cols-8 gap-1.5">
            {[1, 2, 3, 4, 5, 6, 7, 8].map((s) => (
              <button
                key={s}
                type="button"
                onClick={() => setCurrentStep(s)}
                className={`h-2 rounded-full transition-all duration-300 ${
                  s === currentStep
                    ? "bg-[#ffd233] shadow-xs"
                    : s < currentStep
                    ? "bg-emerald-500"
                    : "bg-muted dark:bg-[#262632]"
                }`}
                title={`Jump to Step ${s}`}
              />
            ))}
          </div>

          <div className="hidden sm:flex items-center justify-between text-[10px] text-muted-foreground dark:text-[#71717a] font-medium pt-0.5">
            <span>1. Business</span>
            <span>2. Problem</span>
            <span>3. Current Flow</span>
            <span>4. Desired Flow</span>
            <span>5. Tools</span>
            <span>6. Files</span>
            <span>7. Goals</span>
            <span>8. Review</span>
          </div>
        </div>
      </div>

      {errorMessage && (
        <div className="p-4 rounded-xl bg-destructive/10 border border-destructive/30 text-destructive text-xs font-bold">
          {errorMessage}
        </div>
      )}

      {/* STEP 1 — ABOUT YOUR BUSINESS */}
      {currentStep === 1 && (
        <div className="rounded-2xl border border-border dark:border-[#22222a] bg-card dark:bg-[#141418] p-5 sm:p-7 space-y-5 shadow-xs animate-in fade-in duration-200">
          <div className="space-y-1 pb-3 border-b border-border dark:border-[#22222a]">
            <h3 className="text-base font-bold text-foreground dark:text-white flex items-center gap-2">
              <Building2 className="h-4 w-4 text-amber-600 dark:text-[#ffd233]" />
              Tell Us About Your Business
            </h3>
            <p className="text-xs text-muted-foreground dark:text-[#8e8e93]">
              Don&apos;t worry about technical details. Explain your business in your own words.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-semibold text-foreground dark:text-[#d4d4d8] block mb-1">
                Business / Brand Name *
              </label>
              <Input
                required
                value={businessName}
                onChange={(e) => {
                  setBusinessName(e.target.value);
                  saveLocalDraft();
                }}
                placeholder="e.g. Marrakech Artisanal Leather or FlowStore"
                className="h-10 text-xs bg-background dark:bg-[#1a1a22] border-border dark:border-[#26262e] text-foreground dark:text-white focus:border-[#ffd233]"
              />
            </div>

            <div>
              <label className="text-xs font-semibold text-foreground dark:text-[#d4d4d8] block mb-1">
                Business Model / Industry *
              </label>
              <select
                value={businessType}
                onChange={(e) => {
                  setBusinessType(e.target.value);
                  saveLocalDraft();
                }}
                aria-label="Business Type"
                className="h-10 w-full rounded-xl border border-border dark:border-[#26262e] bg-background dark:bg-[#1a1a22] px-3 text-xs text-foreground dark:text-white focus:outline-none focus:border-[#ffd233]"
              >
                <option value="E-commerce / Shopify Store">E-commerce / Shopify / WooCommerce Store</option>
                <option value="COD / Moroccan E-Commerce">COD / Local E-Commerce (YouCan, etc.)</option>
                <option value="Digital Agency / Marketing">Digital Agency / Marketing & Media Buying</option>
                <option value="B2B Services & Consulting">B2B Services & Professional Consulting</option>
                <option value="Real Estate / Clinic / Local Business">Real Estate / Clinic / Local Business</option>
                <option value="SaaS & Software Platform">SaaS & Software Platform</option>
                <option value="Other">Other Business Model</option>
              </select>
            </div>
          </div>

          <div>
            <label className="text-xs font-semibold text-foreground dark:text-[#d4d4d8] block mb-1">
              What does your business do? (In plain words) *
            </label>
            <Textarea
              rows={3}
              value={businessDescription}
              onChange={(e) => {
                setBusinessDescription(e.target.value);
                saveLocalDraft();
              }}
              placeholder="Explain what products or services you offer, how customers find you, and how your team normally works with them."
              className="text-xs leading-relaxed bg-background dark:bg-[#1a1a22] border-border dark:border-[#26262e] text-foreground dark:text-white focus:border-[#ffd233]"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-semibold text-foreground dark:text-[#d4d4d8] block mb-1">
                Who are your typical customers?
              </label>
              <Input
                value={targetCustomers}
                onChange={(e) => setTargetCustomers(e.target.value)}
                placeholder="e.g. Individual shoppers in Morocco & GCC or B2B business owners"
                className="h-10 text-xs bg-background dark:bg-[#1a1a22] border-border dark:border-[#26262e] text-foreground dark:text-white focus:border-[#ffd233]"
              />
            </div>

            <div>
              <label className="text-xs font-semibold text-foreground dark:text-[#d4d4d8] block mb-1">
                How do customers contact you? (Select all that apply)
              </label>
              <div className="flex items-center gap-1.5 flex-wrap pt-1">
                {["WhatsApp", "Instagram", "Website", "Facebook", "Phone", "Email"].map((ch) => {
                  const active = customerChannels.includes(ch);
                  return (
                    <button
                      key={ch}
                      type="button"
                      onClick={() => {
                        if (active) setCustomerChannels(customerChannels.filter((c) => c !== ch));
                        else setCustomerChannels([...customerChannels, ch]);
                      }}
                      className={`px-3 py-1 rounded-xl text-xs font-bold border transition-all ${
                        active
                          ? "bg-[#ffd233] text-black border-[#ffd233] shadow-xs"
                          : "bg-muted dark:bg-[#1a1a22] text-muted-foreground border-border dark:border-[#26262e] hover:text-foreground"
                      }`}
                    >
                      {ch}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* STEP 2 — YOUR CURRENT PROBLEM */}
      {currentStep === 2 && (
        <div className="rounded-2xl border border-border dark:border-[#22222a] bg-card dark:bg-[#141418] p-5 sm:p-7 space-y-5 shadow-xs animate-in fade-in duration-200">
          <div className="space-y-1 pb-3 border-b border-border dark:border-[#22222a]">
            <h3 className="text-base font-bold text-foreground dark:text-white flex items-center gap-2">
              <AlertTriangle className="h-4 w-4 text-amber-500" />
              What Problem Do You Want to Solve?
            </h3>
            <p className="text-xs text-muted-foreground dark:text-[#8e8e93]">
              What is currently difficult, slow, repetitive, or causing mistakes in your day-to-day operations?
            </p>
          </div>

          <div>
            <label className="text-xs font-semibold text-foreground dark:text-[#d4d4d8] block mb-1">
              Workflow Title / Project Name *
            </label>
            <Input
              required
              value={title}
              onChange={(e) => {
                setTitle(e.target.value);
                saveLocalDraft();
              }}
              placeholder="e.g. WhatsApp Inbound Order Qualifier & CRM Sync"
              className="h-10 text-xs bg-background dark:bg-[#1a1a22] border-border dark:border-[#26262e] text-foreground dark:text-white focus:border-[#ffd233]"
            />
          </div>

          <div>
            <label className="text-xs font-semibold text-foreground dark:text-[#d4d4d8] block mb-1">
              Describe the manual pain point in detail *
            </label>
            <Textarea
              rows={4}
              value={problemDescription}
              onChange={(e) => {
                setProblemDescription(e.target.value);
                saveLocalDraft();
              }}
              placeholder="e.g. Every time we receive a message or order on WhatsApp, we have to manually copy the customer name, phone, and items into an Excel sheet, create an invoice, and send a confirmation. It takes hours every evening and leads to lost orders."
              className="text-xs leading-relaxed bg-background dark:bg-[#1a1a22] border-border dark:border-[#26262e] text-foreground dark:text-white focus:border-[#ffd233]"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="text-xs font-semibold text-foreground dark:text-[#d4d4d8] block mb-1">
                How often does this happen?
              </label>
              <select
                value={frequency}
                onChange={(e) => setFrequency(e.target.value)}
                aria-label="Frequency"
                className="h-10 w-full rounded-xl border border-border dark:border-[#26262e] bg-background dark:bg-[#1a1a22] px-3 text-xs text-foreground dark:text-white focus:outline-none focus:border-[#ffd233]"
              >
                <option value="Multiple times an hour">Multiple times an hour</option>
                <option value="Daily">Daily</option>
                <option value="Several times a week">Several times a week</option>
                <option value="Weekly">Weekly batch</option>
              </select>
            </div>

            <div>
              <label className="text-xs font-semibold text-foreground dark:text-[#d4d4d8] block mb-1">
                Approximate time spent
              </label>
              <Input
                value={estimatedTime}
                onChange={(e) => setEstimatedTime(e.target.value)}
                placeholder="e.g. 2 hours daily or 15 hrs/week"
                className="h-10 text-xs bg-background dark:bg-[#1a1a22] border-border dark:border-[#26262e] text-foreground dark:text-white focus:border-[#ffd233]"
              />
            </div>

            <div>
              <label className="text-xs font-semibold text-foreground dark:text-[#d4d4d8] block mb-1">
                Business Priority
              </label>
              <select
                value={priority}
                onChange={(e) => setPriority(e.target.value as any)}
                aria-label="Priority"
                className="h-10 w-full rounded-xl border border-border dark:border-[#26262e] bg-background dark:bg-[#1a1a22] px-3 text-xs font-bold text-foreground dark:text-white focus:outline-none focus:border-[#ffd233]"
              >
                <option value="LOW">LOW — Minor convenience</option>
                <option value="MEDIUM">MEDIUM — Helpful optimization</option>
                <option value="HIGH">HIGH — High daily friction</option>
                <option value="CRITICAL">CRITICAL — Blocking revenue & growth</option>
              </select>
            </div>
          </div>

          <div>
            <label className="text-xs font-semibold text-foreground dark:text-[#d4d4d8] block mb-1">
              What happens if this process is delayed or done incorrectly?
            </label>
            <Input
              value={costOfFailure}
              onChange={(e) => setCostOfFailure(e.target.value)}
              placeholder="e.g. Customers get frustrated and cancel orders, inventory becomes inaccurate"
              className="h-10 text-xs bg-background dark:bg-[#1a1a22] border-border dark:border-[#26262e] text-foreground dark:text-white focus:border-[#ffd233]"
            />
          </div>
        </div>
      )}

      {/* STEP 3 — EXPLAIN YOUR CURRENT WORKFLOW (VISUAL BUILDER) */}
      {currentStep === 3 && (
        <div className="rounded-2xl border border-border dark:border-[#22222a] bg-card dark:bg-[#141418] p-5 sm:p-7 space-y-5 shadow-xs animate-in fade-in duration-200">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-border dark:border-[#22222a]">
            <div>
              <h3 className="text-base font-bold text-foreground dark:text-white flex items-center gap-2">
                <GitCommit className="h-4 w-4 text-amber-600 dark:text-[#ffd233]" />
                How Do You Do This Today? (Current Manual Process)
              </h3>
              <p className="text-xs text-muted-foreground dark:text-[#8e8e93]">
                List the steps you take right now from start to finish.
              </p>
            </div>

            {/* Smart AI Assist Trigger */}
            <Button
              type="button"
              onClick={handleGenerateAISuggestions}
              disabled={aiGenerating}
              className="h-8 px-3.5 rounded-xl bg-muted dark:bg-[#1b1b22] hover:bg-muted/80 text-foreground dark:text-white text-xs font-bold border border-border dark:border-[#26262e] gap-1.5 shadow-xs"
            >
              {aiGenerating ? <Loader2 className="h-3.5 w-3.5 animate-spin" /> : <Sparkles className="h-3.5 w-3.5 text-amber-600 dark:text-[#ffd233]" />}
              <span>✨ AI Suggestion</span>
            </Button>
          </div>

          {/* AI Suggestion Box (Non-Intrusive) */}
          {aiSuggestions && (
            <div className="p-4 rounded-2xl bg-amber-500/10 border border-[#ffd233]/40 space-y-3 animate-in fade-in slide-in-from-top-2 duration-200">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-amber-800 dark:text-[#ffd233] flex items-center gap-1.5">
                  <Sparkles className="h-3.5 w-3.5" /> AI Recommended Flow Breakdown
                </span>
                <div className="flex items-center gap-1.5">
                  <button
                    type="button"
                    onClick={handleAcceptAISuggestions}
                    className="px-3 py-1 rounded-lg bg-[#ffd233] text-black font-bold text-xs shadow-xs hover:bg-[#f5c71a]"
                  >
                    Accept Suggestion
                  </button>
                  <button
                    type="button"
                    onClick={() => setAiSuggestions(null)}
                    className="px-2.5 py-1 rounded-lg bg-card dark:bg-[#1b1b22] text-xs font-semibold text-muted-foreground hover:text-foreground"
                  >
                    Ignore
                  </button>
                </div>
              </div>
              <p className="text-xs text-foreground dark:text-zinc-200 leading-relaxed">
                {aiSuggestions.summary} Click &ldquo;Accept Suggestion&rdquo; to populate both your current process and desired automation steps automatically.
              </p>
            </div>
          )}

          {/* Visual Step-by-Step Pipeline */}
          <div className="space-y-3">
            {currentSteps.map((step, idx) => (
              <div
                key={idx}
                className="p-4 rounded-xl border border-border dark:border-[#26262e] bg-muted/30 dark:bg-[#101014] space-y-3 relative group shadow-xs"
              >
                <div className="flex items-center justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-[10px] font-bold px-2 py-0.5 rounded-md bg-muted dark:bg-[#1b1b22] text-amber-800 dark:text-[#ffd233] border border-border dark:border-[#2a2a34]">
                      STEP {step.order}
                    </span>
                    <span className="text-xs font-bold text-foreground dark:text-white">
                      Current Action
                    </span>
                  </div>

                  <div className="flex items-center gap-1">
                    <button
                      type="button"
                      onClick={() => handleMoveCurrentStep(idx, "UP")}
                      disabled={idx === 0}
                      className="p-1 text-muted-foreground hover:text-foreground disabled:opacity-30"
                      title="Move Up"
                    >
                      <ArrowUp className="h-3.5 w-3.5" />
                    </button>
                    <button
                      type="button"
                      onClick={() => handleMoveCurrentStep(idx, "DOWN")}
                      disabled={idx === currentSteps.length - 1}
                      className="p-1 text-muted-foreground hover:text-foreground disabled:opacity-30"
                      title="Move Down"
                    >
                      <ArrowDown className="h-3.5 w-3.5" />
                    </button>
                    {currentSteps.length > 1 && (
                      <button
                        type="button"
                        onClick={() => handleRemoveCurrentStep(idx)}
                        className="p-1 text-red-500 hover:bg-red-500/10 rounded-lg ml-1"
                        title="Delete Step"
                      >
                        <Trash2 className="h-3.5 w-3.5" />
                      </button>
                    )}
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-12 gap-3">
                  <div className="sm:col-span-6">
                    <label className="text-[11px] font-semibold text-muted-foreground dark:text-[#8e8e93] block mb-1">
                      What happens in this step? *
                    </label>
                    <Input
                      value={step.title}
                      onChange={(e) => {
                        const copy = [...currentSteps];
                        copy[idx].title = e.target.value;
                        setCurrentSteps(copy);
                      }}
                      placeholder="e.g. Customer sends order on WhatsApp"
                      className="h-9 text-xs bg-background dark:bg-[#1a1a22] border-border dark:border-[#26262e] text-foreground dark:text-white focus:border-[#ffd233]"
                    />
                  </div>

                  <div className="sm:col-span-3">
                    <label className="text-[11px] font-semibold text-muted-foreground dark:text-[#8e8e93] block mb-1">
                      Tool Used
                    </label>
                    <Input
                      value={step.tool || ""}
                      onChange={(e) => {
                        const copy = [...currentSteps];
                        copy[idx].tool = e.target.value;
                        setCurrentSteps(copy);
                      }}
                      placeholder="e.g. WhatsApp, Excel"
                      className="h-9 text-xs bg-background dark:bg-[#1a1a22] border-border dark:border-[#26262e] text-foreground dark:text-white focus:border-[#ffd233]"
                    />
                  </div>

                  <div className="sm:col-span-3">
                    <label className="text-[11px] font-semibold text-muted-foreground dark:text-[#8e8e93] block mb-1">
                      Who does it?
                    </label>
                    <Input
                      value={step.responsiblePerson || ""}
                      onChange={(e) => {
                        const copy = [...currentSteps];
                        copy[idx].responsiblePerson = e.target.value;
                        setCurrentSteps(copy);
                      }}
                      placeholder="e.g. Me / Support Rep"
                      className="h-9 text-xs bg-background dark:bg-[#1a1a22] border-border dark:border-[#26262e] text-foreground dark:text-white focus:border-[#ffd233]"
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>

          <Button
            type="button"
            onClick={handleAddCurrentStep}
            className="w-full h-10 rounded-xl bg-muted dark:bg-[#1b1b22] hover:bg-muted/80 text-foreground dark:text-white text-xs font-bold border border-dashed border-border dark:border-[#2e2e3a] gap-1.5"
          >
            <Plus className="h-4 w-4" />
            <span>+ Add Next Step</span>
          </Button>
        </div>
      )}

      {/* STEP 4 — WHAT DO YOU WANT TO HAPPEN AUTOMATICALLY? */}
      {currentStep === 4 && (
        <div className="rounded-2xl border border-border dark:border-[#22222a] bg-card dark:bg-[#141418] p-5 sm:p-7 space-y-5 shadow-xs animate-in fade-in duration-200">
          <div className="space-y-1 pb-3 border-b border-border dark:border-[#22222a]">
            <h3 className="text-base font-bold text-foreground dark:text-white flex items-center gap-2">
              <Zap className="h-4 w-4 text-amber-600 dark:text-[#ffd233]" />
              What Would You Like to Happen Automatically?
            </h3>
            <p className="text-xs text-muted-foreground dark:text-[#8e8e93]">
              If you could automate this entire flow, what should the system do for you without human intervention?
            </p>
          </div>

          <div>
            <label className="text-xs font-semibold text-foreground dark:text-[#d4d4d8] block mb-1">
              Desired Outcome Summary *
            </label>
            <Textarea
              rows={3}
              value={desiredAutomationDesc}
              onChange={(e) => {
                setDesiredAutomationDesc(e.target.value);
                saveLocalDraft();
              }}
              placeholder="e.g. When an order arrives on WhatsApp, I want the bot to confirm the order, save the customer into our database, create the shipping invoice, and notify our team in our group chat."
              className="text-xs leading-relaxed bg-background dark:bg-[#1a1a22] border-border dark:border-[#26262e] text-foreground dark:text-white focus:border-[#ffd233]"
            />
          </div>

          {/* Visual Desired Automated Steps */}
          <div className="space-y-3 pt-1">
            <h4 className="text-xs font-bold text-muted-foreground dark:text-[#8e8e93]">
              Desired Automated Sequence ({desiredSteps.length} Steps)
            </h4>

            {desiredSteps.map((step, idx) => (
              <div
                key={idx}
                className="p-4 rounded-xl border border-emerald-500/20 bg-muted/30 dark:bg-[#101014] space-y-3 relative shadow-xs"
              >
                <div className="flex items-center justify-between gap-2">
                  <span className="font-mono text-[10px] font-bold px-2 py-0.5 rounded-md bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 border border-emerald-500/30">
                    AUTOMATED STEP {step.order}
                  </span>

                  {desiredSteps.length > 1 && (
                    <button
                      type="button"
                      onClick={() => handleRemoveDesiredStep(idx)}
                      className="p-1 text-red-500 hover:bg-red-500/10 rounded-lg"
                      title="Remove Step"
                    >
                      <Trash2 className="h-3.5 w-3.5" />
                    </button>
                  )}
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-12 gap-3">
                  <div className="sm:col-span-5">
                    <label className="text-[11px] font-semibold text-muted-foreground dark:text-[#8e8e93] block mb-1">
                      Automated Action *
                    </label>
                    <Input
                      value={step.title}
                      onChange={(e) => {
                        const copy = [...desiredSteps];
                        copy[idx].title = e.target.value;
                        setDesiredSteps(copy);
                      }}
                      placeholder="e.g. System parses order data with AI"
                      className="h-9 text-xs bg-background dark:bg-[#1a1a22] border-border dark:border-[#26262e] text-foreground dark:text-white focus:border-[#ffd233]"
                    />
                  </div>

                  <div className="sm:col-span-3">
                    <label className="text-[11px] font-semibold text-muted-foreground dark:text-[#8e8e93] block mb-1">
                      App / Platform
                    </label>
                    <Input
                      value={step.tool || ""}
                      onChange={(e) => {
                        const copy = [...desiredSteps];
                        copy[idx].tool = e.target.value;
                        setDesiredSteps(copy);
                      }}
                      placeholder="e.g. OpenAI GPT-4o"
                      className="h-9 text-xs bg-background dark:bg-[#1a1a22] border-border dark:border-[#26262e] text-foreground dark:text-white focus:border-[#ffd233]"
                    />
                  </div>

                  <div className="sm:col-span-4">
                    <label className="text-[11px] font-semibold text-muted-foreground dark:text-[#8e8e93] block mb-1">
                      Expected Output
                    </label>
                    <Input
                      value={step.expectedResult || ""}
                      onChange={(e) => {
                        const copy = [...desiredSteps];
                        copy[idx].expectedResult = e.target.value;
                        setDesiredSteps(copy);
                      }}
                      placeholder="e.g. Clean JSON order object"
                      className="h-9 text-xs bg-background dark:bg-[#1a1a22] border-border dark:border-[#26262e] text-foreground dark:text-white focus:border-[#ffd233]"
                    />
                  </div>
                </div>
              </div>
            ))}

            <Button
              type="button"
              onClick={handleAddDesiredStep}
              className="w-full h-10 rounded-xl bg-muted dark:bg-[#1b1b22] hover:bg-muted/80 text-foreground dark:text-white text-xs font-bold border border-dashed border-border dark:border-[#2e2e3a] gap-1.5"
            >
              <Plus className="h-4 w-4" />
              <span>+ Add Automated Step</span>
            </Button>
          </div>
        </div>
      )}

      {/* STEP 5 — TOOLS & INTEGRATIONS */}
      {currentStep === 5 && (
        <div className="rounded-2xl border border-border dark:border-[#22222a] bg-card dark:bg-[#141418] p-5 sm:p-7 space-y-5 shadow-xs animate-in fade-in duration-200">
          <div className="space-y-1 pb-3 border-b border-border dark:border-[#22222a]">
            <h3 className="text-base font-bold text-foreground dark:text-white flex items-center gap-2">
              <Cpu className="h-4 w-4 text-amber-600 dark:text-[#ffd233]" />
              What Tools & Apps Do You Currently Use?
            </h3>
            <p className="text-xs text-muted-foreground dark:text-[#8e8e93]">
              Select all apps involved in this workflow. Our architects will connect them seamlessly.
            </p>
          </div>

          {/* Security Notice */}
          <div className="p-3.5 rounded-xl bg-muted/40 dark:bg-[#16161f] border border-border dark:border-[#26262e] text-xs flex items-center gap-2.5 text-muted-foreground dark:text-[#8e8e93]">
            <ShieldCheck className="h-4 w-4 text-emerald-500 shrink-0" />
            <span>
              <strong className="text-foreground dark:text-white">Security Guarantee:</strong> Never enter your passwords or private credentials in this form. Connection tokens are shared securely during deployment.
            </span>
          </div>

          {/* Popular Tools Grid */}
          <div className="space-y-2">
            <span className="text-xs font-semibold text-foreground dark:text-[#d4d4d8] block">
              Select Involved Platforms ({selectedTools.length} Selected):
            </span>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
              {POPULAR_TOOLS.map((tName) => {
                const isSelected = selectedTools.some((t) => t.toolName === tName);
                return (
                  <button
                    key={tName}
                    type="button"
                    onClick={() => toggleTool(tName)}
                    className={`flex items-center gap-2.5 p-2.5 rounded-xl text-xs font-bold border transition-all text-left ${
                      isSelected
                        ? "bg-[#ffd233] text-black border-[#ffd233] shadow-xs"
                        : "bg-muted/40 dark:bg-[#1a1a22] text-foreground dark:text-[#d4d4d8] border-border dark:border-[#26262e] hover:bg-muted dark:hover:bg-[#22222c]"
                    }`}
                  >
                    <PlatformIcon slug={tName.toLowerCase().replace(/[^a-z0-9]/g, "")} name={tName} size="xs" withBadge={false} />
                    <span className="truncate flex-1 text-[11px]">{tName}</span>
                    {isSelected && <Check className="h-3.5 w-3.5 shrink-0" />}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Selected Tool Details Notes */}
          {selectedTools.length > 0 && (
            <div className="space-y-3 pt-2">
              <h4 className="text-xs font-bold text-foreground dark:text-white">
                How do you use each tool? (Optional Notes)
              </h4>

              {selectedTools.map((tool, idx) => (
                <div key={idx} className="p-3.5 rounded-xl bg-muted/30 dark:bg-[#101014] border border-border dark:border-[#26262e] space-y-2 text-xs">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-foreground dark:text-white">{tool.toolName}</span>
                    <button
                      type="button"
                      onClick={() => toggleTool(tool.toolName)}
                      className="text-[11px] text-red-500 hover:underline"
                    >
                      Remove
                    </button>
                  </div>
                  <Input
                    value={tool.purpose || ""}
                    onChange={(e) => {
                      const copy = [...selectedTools];
                      copy[idx].purpose = e.target.value;
                      setSelectedTools(copy);
                    }}
                    placeholder={`What do you currently use ${tool.toolName} for?`}
                    className="h-8 text-xs bg-background dark:bg-[#1a1a22] border-border dark:border-[#26262e] text-foreground dark:text-white focus:border-[#ffd233]"
                  />
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* STEP 6 — FILES & EXAMPLES */}
      {currentStep === 6 && (
        <div className="rounded-2xl border border-border dark:border-[#22222a] bg-card dark:bg-[#141418] p-5 sm:p-7 space-y-5 shadow-xs animate-in fade-in duration-200">
          <div className="space-y-1 pb-3 border-b border-border dark:border-[#22222a]">
            <h3 className="text-base font-bold text-foreground dark:text-white flex items-center gap-2">
              <UploadCloud className="h-4 w-4 text-amber-600 dark:text-[#ffd233]" />
              Attach Screenshots, Excel Sheets & Process Examples
            </h3>
            <p className="text-xs text-muted-foreground dark:text-[#8e8e93]">
              Upload screenshots of your current spreadsheets, sample customer chats, or process diagrams to give our team 100% clarity.
            </p>
          </div>

          {/* Upload Dropzone */}
          <div className="rounded-2xl border border-dashed border-border dark:border-[#2e2e3a] bg-muted/20 dark:bg-[#101014] p-8 text-center space-y-3">
            <div className="h-12 w-12 rounded-xl bg-muted dark:bg-[#1a1a22] border border-border dark:border-[#26262e] text-amber-600 dark:text-[#ffd233] flex items-center justify-center mx-auto">
              <UploadCloud className="h-6 w-6" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-foreground dark:text-white">
                Drag and drop your sample files here
              </h4>
              <p className="text-[11px] text-muted-foreground dark:text-[#71717a] mt-0.5">
                PNG, JPG, PDF, XLSX, CSV, JSON (up to 10MB each)
              </p>
            </div>

            <div>
              <input
                type="file"
                id="fileUploaderInput"
                multiple
                accept="image/*,.pdf,.xlsx,.csv,.json"
                onChange={handleFileUpload}
                className="hidden"
              />
              <label
                htmlFor="fileUploaderInput"
                className="cursor-pointer inline-flex items-center justify-center h-9 px-5 rounded-xl bg-card dark:bg-[#1b1b22] hover:bg-muted border border-border dark:border-[#2a2a34] text-foreground dark:text-white text-xs font-bold shadow-xs transition-all"
              >
                <span>Browse Files</span>
              </label>
            </div>
          </div>

          {/* File List Preview */}
          {files.length > 0 && (
            <div className="space-y-2">
              <span className="text-xs font-semibold text-foreground dark:text-[#d4d4d8] block">
                Attached Files ({files.length}):
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {files.map((file, idx) => (
                  <div
                    key={idx}
                    className="p-3 rounded-xl bg-muted/40 dark:bg-[#1a1a22] border border-border dark:border-[#26262e] flex items-center justify-between gap-3 text-xs"
                  >
                    <div className="flex items-center gap-2.5 truncate">
                      {file.fileType.includes("image") ? (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img src={file.fileUrl} alt={file.fileName} className="h-8 w-8 rounded-lg object-cover shrink-0" />
                      ) : (
                        <FileSpreadsheet className="h-6 w-6 text-emerald-500 shrink-0" />
                      )}
                      <div className="truncate">
                        <div className="font-bold text-foreground dark:text-white truncate">{file.fileName}</div>
                        <div className="text-[10px] text-muted-foreground dark:text-[#71717a]">
                          {(file.fileSize / 1024).toFixed(1)} KB
                        </div>
                      </div>
                    </div>

                    <button
                      type="button"
                      onClick={() => handleRemoveFile(idx)}
                      className="text-red-500 hover:bg-red-500/10 p-1 rounded-lg transition-colors shrink-0"
                      title="Remove"
                    >
                      <X className="h-4 w-4" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {/* STEP 7 — EXPECTED RESULT & SUCCESS CRITERIA */}
      {currentStep === 7 && (
        <div className="rounded-2xl border border-border dark:border-[#22222a] bg-card dark:bg-[#141418] p-5 sm:p-7 space-y-5 shadow-xs animate-in fade-in duration-200">
          <div className="space-y-1 pb-3 border-b border-border dark:border-[#22222a]">
            <h3 className="text-base font-bold text-foreground dark:text-white flex items-center gap-2">
              <CheckCircle2 className="h-4 w-4 text-emerald-500" />
              Expected Results & Success Criteria
            </h3>
            <p className="text-xs text-muted-foreground dark:text-[#8e8e93]">
              What will make you say: &ldquo;Yes! This automation works 100% perfectly for my business&rdquo;?
            </p>
          </div>

          <div>
            <label className="text-xs font-semibold text-foreground dark:text-[#d4d4d8] block mb-1">
              Final Expected Result *
            </label>
            <Textarea
              rows={3}
              value={expectedResult}
              onChange={(e) => setExpectedResult(e.target.value)}
              placeholder="e.g. Zero manual order entries, all orders logged with PDF invoices sent immediately to customers on WhatsApp without delays."
              className="text-xs leading-relaxed bg-background dark:bg-[#1a1a22] border-border dark:border-[#26262e] text-foreground dark:text-white focus:border-[#ffd233]"
            />
          </div>

          <div>
            <label className="text-xs font-semibold text-foreground dark:text-[#d4d4d8] block mb-1">
              What are your key success metrics?
            </label>
            <Input
              value={successCriteria}
              onChange={(e) => setSuccessCriteria(e.target.value)}
              placeholder="e.g. Save 10 hours a week, reduce customer response time to under 10 seconds"
              className="h-10 text-xs bg-background dark:bg-[#1a1a22] border-border dark:border-[#26262e] text-foreground dark:text-white focus:border-[#ffd233]"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-semibold text-foreground dark:text-[#d4d4d8] block mb-1">
                Preferred Turnkey Deadline
              </label>
              <select
                value={expectedDeadline}
                onChange={(e) => setExpectedDeadline(e.target.value)}
                aria-label="Expected Deadline"
                className="h-10 w-full rounded-xl border border-border dark:border-[#26262e] bg-background dark:bg-[#1a1a22] px-3 text-xs text-foreground dark:text-white focus:outline-none focus:border-[#ffd233]"
              >
                <option value="Within 24-48 hours (Standard Turnkey)">Within 24-48 hours (Standard Turnkey)</option>
                <option value="Within 3 to 5 days">Within 3 to 5 days</option>
                <option value="Flexible / As soon as ready">Flexible / As soon as ready</option>
              </select>
            </div>

            <div>
              <label className="text-xs font-semibold text-foreground dark:text-[#d4d4d8] block mb-1">
                Additional Notes / Questions for our Engineers
              </label>
              <Input
                value={additionalNotes}
                onChange={(e) => setAdditionalNotes(e.target.value)}
                placeholder="Any special requirement or custom API..."
                className="h-10 text-xs bg-background dark:bg-[#1a1a22] border-border dark:border-[#26262e] text-foreground dark:text-white focus:border-[#ffd233]"
              />
            </div>
          </div>
        </div>
      )}

      {/* STEP 8 — REVIEW & SUBMIT */}
      {currentStep === 8 && (
        <div className="rounded-2xl border border-border dark:border-[#22222a] bg-card dark:bg-[#141418] p-5 sm:p-7 space-y-6 shadow-xs animate-in fade-in duration-200">
          <div className="space-y-1 pb-3 border-b border-border dark:border-[#22222a]">
            <h3 className="text-base font-bold text-foreground dark:text-white flex items-center gap-2">
              <CheckCircle2 className="h-4 w-4 text-emerald-500" />
              Review Your Workflow Request
            </h3>
            <p className="text-xs text-muted-foreground dark:text-[#8e8e93]">
              Please verify your process summary below before submitting for engineering deployment.
            </p>
          </div>

          <div className="space-y-4 text-xs">
            {/* Section 1: Business */}
            <div className="p-4 rounded-xl bg-muted/40 dark:bg-[#1a1a22] border border-border dark:border-[#26262e] space-y-2">
              <div className="flex items-center justify-between">
                <span className="font-bold text-foreground dark:text-white uppercase tracking-wider text-[11px]">
                  1. Business & Context
                </span>
                <button type="button" onClick={() => setCurrentStep(1)} className="text-amber-700 dark:text-[#ffd233] font-bold hover:underline">
                  Edit
                </button>
              </div>
              <div className="text-foreground dark:text-white font-semibold">{businessName} ({businessType})</div>
              <p className="text-muted-foreground dark:text-[#8e8e93] leading-relaxed">{businessDescription || "No detailed description provided."}</p>
            </div>

            {/* Section 2: Problem */}
            <div className="p-4 rounded-xl bg-muted/40 dark:bg-[#1a1a22] border border-border dark:border-[#26262e] space-y-2">
              <div className="flex items-center justify-between">
                <span className="font-bold text-foreground dark:text-white uppercase tracking-wider text-[11px]">
                  2. Current Problem & Pain Point
                </span>
                <button type="button" onClick={() => setCurrentStep(2)} className="text-amber-700 dark:text-[#ffd233] font-bold hover:underline">
                  Edit
                </button>
              </div>
              <div className="font-bold text-foreground dark:text-white">{title || "Custom Workflow"}</div>
              <p className="text-muted-foreground dark:text-[#8e8e93] leading-relaxed">{problemDescription || "Manual daily workflow."}</p>
              <div className="flex items-center gap-3 text-[11px] text-muted-foreground">
                <span>Frequency: {frequency}</span>
                <span>•</span>
                <span>Time: {estimatedTime}</span>
                <span>•</span>
                <span className="text-amber-700 dark:text-[#ffd233] font-bold">Priority: {priority}</span>
              </div>
            </div>

            {/* Section 3 & 4: Current vs Desired Process */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="p-4 rounded-xl bg-muted/40 dark:bg-[#1a1a22] border border-border dark:border-[#26262e] space-y-2">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-foreground dark:text-white text-[11px]">
                    Current Manual Steps ({currentSteps.length})
                  </span>
                  <button type="button" onClick={() => setCurrentStep(3)} className="text-amber-700 dark:text-[#ffd233] font-bold hover:underline">
                    Edit
                  </button>
                </div>
                <ul className="space-y-1.5 list-decimal list-inside text-muted-foreground dark:text-[#8e8e93]">
                  {currentSteps.map((s, i) => (
                    <li key={i} className="truncate"><span className="text-foreground dark:text-white font-medium">{s.title}</span> ({s.tool})</li>
                  ))}
                </ul>
              </div>

              <div className="p-4 rounded-xl bg-muted/40 dark:bg-[#1a1a22] border border-border dark:border-[#26262e] space-y-2">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-foreground dark:text-white text-[11px]">
                    Desired Automation ({desiredSteps.length})
                  </span>
                  <button type="button" onClick={() => setCurrentStep(4)} className="text-amber-700 dark:text-[#ffd233] font-bold hover:underline">
                    Edit
                  </button>
                </div>
                <ul className="space-y-1.5 list-decimal list-inside text-muted-foreground dark:text-[#8e8e93]">
                  {desiredSteps.map((s, i) => (
                    <li key={i} className="truncate"><span className="text-emerald-600 dark:text-emerald-400 font-medium">{s.title}</span></li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Section 5 & 6: Tools & Files */}
            <div className="p-4 rounded-xl bg-muted/40 dark:bg-[#1a1a22] border border-border dark:border-[#26262e] space-y-2">
              <div className="flex items-center justify-between">
                <span className="font-bold text-foreground dark:text-white text-[11px]">
                  Tools & Attached Files
                </span>
                <button type="button" onClick={() => setCurrentStep(5)} className="text-amber-700 dark:text-[#ffd233] font-bold hover:underline">
                  Edit
                </button>
              </div>
              <div className="flex items-center gap-1.5 flex-wrap">
                {selectedTools.map((t) => (
                  <span key={t.toolName} className="px-2.5 py-1 rounded-lg bg-card dark:bg-[#141418] border border-border dark:border-[#26262e] font-bold text-foreground dark:text-white text-[11px]">
                    {t.toolName}
                  </span>
                ))}
              </div>
              {files.length > 0 && (
                <div className="text-[11px] text-muted-foreground pt-1">
                  {files.length} sample file(s) attached for team reference.
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Bottom Navigation Buttons */}
      <div className="flex items-center justify-between pt-2">
        {currentStep > 1 ? (
          <Button
            type="button"
            variant="outline"
            onClick={() => setCurrentStep(currentStep - 1)}
            className="rounded-xl h-11 px-5 text-xs font-bold gap-1.5"
          >
            <ChevronLeft className="h-4 w-4" />
            <span>Back</span>
          </Button>
        ) : (
          <Link
            href="/dashboard"
            className="h-11 px-5 rounded-xl border border-border dark:border-[#26262e] bg-card dark:bg-[#1a1a22] hover:bg-muted text-foreground font-semibold text-xs inline-flex items-center gap-1.5"
          >
            Cancel
          </Link>
        )}

        {currentStep < 8 ? (
          <Button
            type="button"
            onClick={() => {
              saveLocalDraft();
              setCurrentStep(currentStep + 1);
            }}
            className="bg-[#ffd233] hover:bg-[#f5c71a] text-black font-extrabold rounded-xl h-11 px-7 text-xs gap-1.5 shadow-md shadow-[#ffd233]/20"
          >
            <span>Continue to Step {currentStep + 1}</span>
            <ChevronRight className="h-4 w-4" />
          </Button>
        ) : (
          <Button
            type="button"
            disabled={pending}
            onClick={handleSubmitRequest}
            className="bg-[#ffd233] hover:bg-[#f5c71a] text-black font-black rounded-xl h-12 px-8 text-xs gap-2 shadow-lg shadow-[#ffd233]/30 active:scale-95"
          >
            {pending ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
                Submitting Request...
              </>
            ) : (
              <>
                <CheckCircle2 className="h-4 w-4" />
                <span>Submit Workflow Request</span>
              </>
            )}
          </Button>
        )}
      </div>
    </div>
  );
}

