"use client";

import * as React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Layers,
  ArrowLeft,
  CheckCircle2,
  Clock,
  MessageSquare,
  FileText,
  GitCommit,
  Zap,
  Cpu,
  UploadCloud,
  Send,
  Loader2,
  User,
  ShieldCheck,
  FileSpreadsheet,
  Download,
  AlertCircle,
  Phone,
  Save,
  Lock,
  Sparkles
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  updateClientWorkflowStatus,
  updateClientWorkflowEstimates
} from "@/actions/adminClientRequestActions";
import { sendWorkflowMessage } from "@/actions/clientWorkflowActions";
import { formatDate } from "@/lib/utils";
import { generateWhatsAppLink } from "@/lib/whatsapp";

interface AdminClientRequestControlProps {
  request: any;
}

export function AdminClientRequestControl({ request }: AdminClientRequestControlProps) {
  const router = useRouter();
  const [status, setStatus] = React.useState(request.status);
  const [progress, setProgress] = React.useState(request.progress || 10);
  const [assignedToName, setAssignedToName] = React.useState(request.assignedToName || "Mohammed Halimi");
  const [complexity, setComplexity] = React.useState(request.estimatedComplexity || "Medium");
  const [price, setPrice] = React.useState(request.estimatedPrice || "Included in Plan");
  const [deliveryTime, setDeliveryTime] = React.useState(request.estimatedDeliveryTime || "48 Hours");
  const [internalNotes, setInternalNotes] = React.useState(request.internalNotes || "");
  
  const [savingStatus, setSavingStatus] = React.useState(false);
  const [savingEstimates, setSavingEstimates] = React.useState(false);
  const [statusSuccess, setStatusSuccess] = React.useState<string | null>(null);

  // Messaging State
  const [messages, setMessages] = React.useState<any[]>(request.messages || []);
  const [newMessage, setNewMessage] = React.useState("");
  const [isInternalNote, setIsInternalNote] = React.useState(false);
  const [sendingMsg, setSendingMsg] = React.useState(false);

  const currentSteps = (request.steps || []).filter((s: any) => s.phase === "CURRENT");
  const desiredSteps = (request.steps || []).filter((s: any) => s.phase === "DESIRED");

  const handleUpdateStatus = async () => {
    setSavingStatus(true);
    setStatusSuccess(null);
    const res = await updateClientWorkflowStatus(request.id, status, Number(progress));
    setSavingStatus(false);

    if (res.success) {
      setStatusSuccess("Status & progress updated successfully!");
      router.refresh();
      setTimeout(() => setStatusSuccess(null), 4000);
    }
  };

  const handleUpdateEstimates = async () => {
    setSavingEstimates(true);
    setStatusSuccess(null);
    const res = await updateClientWorkflowEstimates(
      request.id,
      assignedToName,
      complexity,
      price,
      deliveryTime,
      internalNotes
    );
    setSavingEstimates(false);

    if (res.success) {
      setStatusSuccess("Estimates and assignment saved successfully!");
      router.refresh();
      setTimeout(() => setStatusSuccess(null), 4000);
    }
  };

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMessage.trim() || sendingMsg) return;

    setSendingMsg(true);
    const res = await sendWorkflowMessage(request.id, newMessage, isInternalNote);
    setSendingMsg(false);

    if (res.success && res.message) {
      setMessages((prev) => [...prev, res.message]);
      setNewMessage("");
    }
  };

  const clientPhone = request.user?.phone || "";
  const waDirectLink = clientPhone
    ? `https://wa.me/${clientPhone.replace(/[^0-9]/g, "")}?text=${encodeURIComponent(
        `Salam ${request.user?.name || ""}, this is AutoFlows Team regarding your workflow request "${request.title}".`
      )}`
    : null;

  return (
    <div className="space-y-6 max-w-6xl mx-auto">
      {/* Top Header */}
      <div className="flex items-center justify-between">
        <Link
          href="/admin/client-requests"
          className="inline-flex items-center gap-2 text-xs font-bold text-muted-foreground hover:text-foreground transition-colors"
        >
          <ArrowLeft className="h-4 w-4" />
          <span>Back to All Client Requests</span>
        </Link>

        <div className="flex items-center gap-2">
          {waDirectLink && (
            <a
              href={waDirectLink}
              target="_blank"
              rel="noopener noreferrer"
              className="h-8 px-3.5 rounded-xl bg-emerald-500 hover:bg-emerald-600 text-white font-bold text-xs inline-flex items-center gap-1.5 shadow-xs transition-all"
            >
              <Phone className="h-3.5 w-3.5" />
              <span>WhatsApp Client</span>
            </a>
          )}
        </div>
      </div>

      {statusSuccess && (
        <div className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-600 dark:text-emerald-400 text-xs font-bold flex items-center gap-2">
          <CheckCircle2 className="h-4 w-4" />
          <span>{statusSuccess}</span>
        </div>
      )}

      {/* Main Grid: Control Panel (4 of 12) + Details & Chat (8 of 12) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        
        {/* Left Column: Admin Control Console (4 of 12) */}
        <div className="lg:col-span-4 space-y-6">
          {/* Status & Progress Card */}
          <div className="rounded-2xl border border-border dark:border-[#22222a] bg-card dark:bg-[#141418] p-5 space-y-4 shadow-xs">
            <h3 className="text-sm font-bold text-foreground dark:text-white flex items-center gap-2">
              <Zap className="h-4 w-4 text-amber-600 dark:text-[#ffd233]" />
              Project Phase & Lifecycle
            </h3>

            <div className="space-y-3">
              <div>
                <label className="text-xs font-semibold text-muted-foreground block mb-1">
                  Status
                </label>
                <select
                  value={status}
                  onChange={(e) => setStatus(e.target.value)}
                  aria-label="Request Status"
                  className="h-10 w-full rounded-xl border border-border dark:border-[#26262e] bg-background dark:bg-[#1a1a22] px-3 text-xs font-bold text-foreground dark:text-white focus:outline-none focus:border-[#ffd233]"
                >
                  <option value="PENDING_REVIEW">PENDING REVIEW</option>
                  <option value="REVIEWING">UNDER ENGINEERING REVIEW</option>
                  <option value="NEEDS_INFORMATION">NEEDS CLIENT INFORMATION</option>
                  <option value="APPROVED">APPROVED & QUEUED</option>
                  <option value="IN_PROGRESS">IN PROGRESS (BUILDING)</option>
                  <option value="TESTING">QA TESTING & VALIDATION</option>
                  <option value="COMPLETED">COMPLETED & DEPLOYED</option>
                  <option value="REJECTED">REJECTED</option>
                  <option value="CANCELLED">CANCELLED</option>
                </select>
              </div>

              <div>
                <div className="flex justify-between text-xs font-semibold mb-1">
                  <span className="text-muted-foreground">Progress Percentage:</span>
                  <span className="font-bold text-amber-700 dark:text-[#ffd233]">{progress}%</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="100"
                  step="5"
                  value={progress}
                  onChange={(e) => setProgress(Number(e.target.value))}
                  aria-label="Progress percentage"
                  className="w-full accent-[#ffd233]"
                />
              </div>

              <Button
                type="button"
                disabled={savingStatus}
                onClick={handleUpdateStatus}
                className="w-full h-9 rounded-xl bg-[#ffd233] hover:bg-[#f5c71a] text-black font-bold text-xs gap-1.5 shadow-xs"
              >
                {savingStatus ? <Loader2 className="h-3.5 w-3.5 animate-spin" /> : <Save className="h-3.5 w-3.5" />}
                <span>Update Status & Progress</span>
              </Button>
            </div>
          </div>

          {/* Assignments & Turnkey Estimates */}
          <div className="rounded-2xl border border-border dark:border-[#22222a] bg-card dark:bg-[#141418] p-5 space-y-4 shadow-xs">
            <h3 className="text-sm font-bold text-foreground dark:text-white flex items-center gap-2">
              <User className="h-4 w-4 text-amber-600 dark:text-[#ffd233]" />
              Assignment & Estimates
            </h3>

            <div className="space-y-3 text-xs">
              <div>
                <label className="text-xs font-semibold text-muted-foreground block mb-1">
                  Assigned Architect / Developer
                </label>
                <Input
                  value={assignedToName}
                  onChange={(e) => setAssignedToName(e.target.value)}
                  placeholder="e.g. Mohammed Halimi"
                  className="h-9 text-xs bg-background dark:bg-[#1a1a22] border-border dark:border-[#26262e] text-foreground dark:text-white"
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="text-xs font-semibold text-muted-foreground block mb-1">
                    Complexity
                  </label>
                  <Input
                    value={complexity}
                    onChange={(e) => setComplexity(e.target.value)}
                    placeholder="Medium"
                    className="h-9 text-xs bg-background dark:bg-[#1a1a22] border-border dark:border-[#26262e] text-foreground dark:text-white"
                  />
                </div>

                <div>
                  <label className="text-xs font-semibold text-muted-foreground block mb-1">
                    Delivery Time
                  </label>
                  <Input
                    value={deliveryTime}
                    onChange={(e) => setDeliveryTime(e.target.value)}
                    placeholder="48 Hours"
                    className="h-9 text-xs bg-background dark:bg-[#1a1a22] border-border dark:border-[#26262e] text-foreground dark:text-white"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs font-semibold text-muted-foreground block mb-1">
                  Private Internal Notes (Team Only)
                </label>
                <Textarea
                  rows={2}
                  value={internalNotes}
                  onChange={(e) => setInternalNotes(e.target.value)}
                  placeholder="Notes for the team, webhook keys, etc."
                  className="text-xs bg-background dark:bg-[#1a1a22] border-border dark:border-[#26262e] text-foreground dark:text-white"
                />
              </div>

              <Button
                type="button"
                disabled={savingEstimates}
                onClick={handleUpdateEstimates}
                className="w-full h-9 rounded-xl bg-muted dark:bg-[#1e1e26] hover:bg-muted/80 text-foreground dark:text-white font-bold text-xs border border-border"
              >
                {savingEstimates ? <Loader2 className="h-3.5 w-3.5 animate-spin" /> : <Save className="h-3.5 w-3.5 text-amber-600 dark:text-[#ffd233]" />}
                <span>Save Estimates & Notes</span>
              </Button>
            </div>
          </div>

          {/* Client Profile Card */}
          <div className="rounded-2xl border border-border dark:border-[#22222a] bg-card dark:bg-[#141418] p-5 space-y-3 text-xs shadow-xs">
            <h4 className="font-bold text-foreground dark:text-white">Client Information</h4>
            <div className="space-y-1.5 text-muted-foreground">
              <div><strong className="text-foreground dark:text-white">Name:</strong> {request.user?.name || "N/A"}</div>
              <div><strong className="text-foreground dark:text-white">Email:</strong> {request.user?.email}</div>
              <div><strong className="text-foreground dark:text-white">Company:</strong> {request.businessName || request.user?.company}</div>
              <div><strong className="text-foreground dark:text-white">WhatsApp:</strong> {request.user?.phone || "N/A"}</div>
              <div><strong className="text-foreground dark:text-white">Plan:</strong> {request.subscription?.plan?.name || "Starter"}</div>
            </div>
          </div>
        </div>

        {/* Right Column: Specification Details & 2-Way Chat (8 of 12) */}
        <div className="lg:col-span-8 space-y-6">
          {/* Submission Overview */}
          <div className="rounded-2xl border border-border dark:border-[#22222a] bg-card dark:bg-[#141418] p-6 space-y-4 shadow-xs">
            <div className="flex items-center justify-between pb-3 border-b border-border dark:border-[#22222a]">
              <div>
                <h2 className="text-xl font-black text-foreground dark:text-white">
                  {request.title}
                </h2>
                <span className="text-xs text-muted-foreground">
                  Submitted on {formatDate(request.createdAt)}
                </span>
              </div>
            </div>

            <div className="space-y-3 text-xs">
              <div>
                <span className="font-bold text-foreground dark:text-white block mb-1 uppercase tracking-wider text-[11px]">
                  Problem & Manual Bottlenecks:
                </span>
                <p className="text-muted-foreground dark:text-[#a1a1aa] leading-relaxed bg-muted/30 dark:bg-[#18181f] p-3.5 rounded-xl border border-border dark:border-[#26262e]">
                  {request.problemDescription || "No problem description."}
                </p>
              </div>

              <div>
                <span className="font-bold text-foreground dark:text-white block mb-1 uppercase tracking-wider text-[11px]">
                  Desired Automation Outcome:
                </span>
                <p className="text-muted-foreground dark:text-[#a1a1aa] leading-relaxed bg-muted/30 dark:bg-[#18181f] p-3.5 rounded-xl border border-border dark:border-[#26262e]">
                  {request.desiredAutomationDesc || request.expectedResult || "No desired outcome."}
                </p>
              </div>
            </div>
          </div>

          {/* Current vs Desired Process Steps */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="rounded-2xl border border-border dark:border-[#22222a] bg-card dark:bg-[#141418] p-5 space-y-3 shadow-xs">
              <h4 className="text-xs font-bold text-foreground dark:text-white uppercase tracking-wider">
                Current Manual Steps ({currentSteps.length})
              </h4>
              <div className="space-y-2">
                {currentSteps.map((step: any) => (
                  <div key={step.id} className="p-3 rounded-xl bg-muted/40 dark:bg-[#18181f] border border-border dark:border-[#26262e] text-xs space-y-0.5">
                    <div className="flex justify-between font-mono text-[10px] text-amber-700 dark:text-[#ffd233] font-bold">
                      <span>STEP {step.order}</span>
                      <span>{step.tool}</span>
                    </div>
                    <div className="font-bold text-foreground dark:text-white">{step.title}</div>
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-2xl border border-emerald-500/20 bg-card dark:bg-[#141418] p-5 space-y-3 shadow-xs">
              <h4 className="text-xs font-bold text-emerald-600 dark:text-emerald-400 uppercase tracking-wider">
                Desired Automated Pipeline ({desiredSteps.length})
              </h4>
              <div className="space-y-2">
                {desiredSteps.map((step: any) => (
                  <div key={step.id} className="p-3 rounded-xl bg-emerald-500/5 dark:bg-[#101814] border border-emerald-500/20 text-xs space-y-0.5">
                    <div className="flex justify-between font-mono text-[10px] text-emerald-600 dark:text-emerald-400 font-bold">
                      <span>ACTION {step.order}</span>
                      <span>{step.tool}</span>
                    </div>
                    <div className="font-bold text-foreground dark:text-white">{step.title}</div>
                    {step.expectedResult && (
                      <div className="text-[10px] text-emerald-600 dark:text-emerald-400">{step.expectedResult}</div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Files & Attachments */}
          {request.files?.length > 0 && (
            <div className="rounded-2xl border border-border dark:border-[#22222a] bg-card dark:bg-[#141418] p-5 space-y-3 shadow-xs">
              <h4 className="text-xs font-bold text-foreground dark:text-white uppercase tracking-wider">
                Uploaded Sample Files ({request.files.length})
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {request.files.map((file: any) => (
                  <div key={file.id} className="p-3 rounded-xl bg-muted/40 dark:bg-[#18181f] border border-border dark:border-[#26262e] flex items-center justify-between gap-3 text-xs">
                    <div className="truncate">
                      <div className="font-bold text-foreground dark:text-white truncate">{file.fileName}</div>
                      <div className="text-[10px] text-muted-foreground">{(file.fileSize / 1024).toFixed(1)} KB</div>
                    </div>
                    <a
                      href={file.fileUrl}
                      download={file.fileName}
                      target="_blank"
                      rel="noreferrer"
                      className="p-1.5 rounded-lg bg-card dark:bg-[#22222c] hover:bg-muted text-foreground"
                    >
                      <Download className="h-4 w-4" />
                    </a>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* 2-Way Message Thread (Admin to Client / Internal Notes) */}
          <div className="rounded-2xl border border-border dark:border-[#22222a] bg-card dark:bg-[#141418] p-6 space-y-4 shadow-xs">
            <h3 className="text-sm font-bold text-foreground dark:text-white flex items-center gap-2">
              <MessageSquare className="h-4 w-4 text-amber-600 dark:text-[#ffd233]" />
              Direct Message Thread (Client ↔ Team)
            </h3>

            <div className="space-y-3 max-h-[350px] overflow-y-auto pr-2">
              {messages.map((msg: any) => {
                const isTeam = msg.senderRole === "TEAM";
                return (
                  <div key={msg.id} className={`flex flex-col ${isTeam ? "items-end" : "items-start"}`}>
                    <div className="flex items-center gap-1.5 mb-1 text-[10px] text-muted-foreground">
                      <span className="font-bold text-foreground dark:text-white">{msg.senderName}</span>
                      {msg.isInternal && (
                        <span className="px-1.5 py-0.2 rounded bg-amber-500/20 text-amber-700 dark:text-[#ffd233] text-[9px] font-bold">
                          INTERNAL NOTE
                        </span>
                      )}
                      <span>•</span>
                      <span>{formatDate(msg.createdAt)}</span>
                    </div>
                    <div
                      className={`p-3.5 rounded-2xl text-xs max-w-lg leading-relaxed shadow-xs ${
                        msg.isInternal
                          ? "bg-amber-500/15 border border-amber-500/30 text-amber-900 dark:text-amber-200"
                          : isTeam
                          ? "bg-[#ffd233] text-black font-medium"
                          : "bg-muted dark:bg-[#1e1e26] text-foreground dark:text-white border border-border dark:border-[#2a2a34]"
                      }`}
                    >
                      {msg.message}
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Post Message Form */}
            <form onSubmit={handleSendMessage} className="space-y-2 pt-3 border-t border-border dark:border-[#22222a]">
              <div className="flex items-center gap-2 text-xs">
                <label className="flex items-center gap-1.5 cursor-pointer font-bold text-muted-foreground hover:text-foreground">
                  <input
                    type="checkbox"
                    checked={isInternalNote}
                    onChange={(e) => setIsInternalNote(e.target.checked)}
                    className="accent-[#ffd233]"
                  />
                  <span>Private Team Note (Not visible to client)</span>
                </label>
              </div>

              <div className="flex items-center gap-2">
                <Input
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  placeholder={isInternalNote ? "Write internal developer note..." : "Reply to client directly..."}
                  className="h-10 text-xs bg-background dark:bg-[#1a1a22] border-border dark:border-[#26262e] text-foreground dark:text-white focus:border-[#ffd233]"
                />
                <Button
                  type="submit"
                  disabled={sendingMsg || !newMessage.trim()}
                  className="h-10 px-5 rounded-xl bg-[#ffd233] hover:bg-[#f5c71a] text-black font-bold text-xs gap-1.5 shrink-0"
                >
                  {sendingMsg ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
                  <span>{isInternalNote ? "Add Note" : "Send Reply"}</span>
                </Button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

