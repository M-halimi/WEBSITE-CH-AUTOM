"use client";

import * as React from "react";
import Link from "next/link";
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
  Sparkles,
  Phone
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { sendWorkflowMessage } from "@/actions/clientWorkflowActions";
import { formatDate } from "@/lib/utils";

interface WorkflowProjectDetailProps {
  request: any;
  currentUserId: string;
  isTeamUser?: boolean;
}

export function WorkflowProjectDetail({
  request,
  currentUserId,
  isTeamUser = false,
}: WorkflowProjectDetailProps) {
  const [activeTab, setActiveTab] = React.useState<"OVERVIEW" | "STEPS" | "TOOLS" | "FILES" | "CHAT" | "ACTIVITY">("OVERVIEW");
  const [messages, setMessages] = React.useState<any[]>(request.messages || []);
  const [newMessage, setNewMessage] = React.useState("");
  const [sending, setSending] = React.useState(false);

  const currentSteps = (request.steps || []).filter((s: any) => s.phase === "CURRENT");
  const desiredSteps = (request.steps || []).filter((s: any) => s.phase === "DESIRED");

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMessage.trim() || sending) return;

    setSending(true);
    const res = await sendWorkflowMessage(request.id, newMessage, false);
    setSending(false);

    if (res.success && res.message) {
      setMessages((prev) => [...prev, res.message]);
      setNewMessage("");
    }
  };

  let badgeColor = "bg-amber-500/10 text-amber-700 dark:text-amber-400 border-amber-500/30";
  if (request.status === "COMPLETED") badgeColor = "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/30";
  if (request.status === "IN_PROGRESS" || request.status === "TESTING") badgeColor = "bg-sky-500/10 text-sky-600 dark:text-sky-400 border-sky-500/30";
  if (request.status === "DRAFT") badgeColor = "bg-zinc-500/10 text-zinc-600 dark:text-zinc-400 border-zinc-500/30";

  return (
    <div className="space-y-6 max-w-6xl mx-auto">
      {/* Back Navigation Bar */}
      <div className="flex items-center justify-between">
        <Link
          href={isTeamUser ? "/admin/client-requests" : "/dashboard/workflows"}
          className="inline-flex items-center gap-2 text-xs font-bold text-muted-foreground hover:text-foreground transition-colors"
        >
          <ArrowLeft className="h-4 w-4" />
          <span>Back to {isTeamUser ? "Client Requests" : "My Workflows"}</span>
        </Link>

        <div className="flex items-center gap-2">
          <span className="text-[10px] font-mono text-muted-foreground">
            Project ID: {request.id}
          </span>
          <span className={`px-2.5 py-0.5 rounded-full text-xs font-bold border ${badgeColor}`}>
            {request.status.replace("_", " ")}
          </span>
        </div>
      </div>

      {/* Main Project Header Card */}
      <div className="rounded-3xl border border-border dark:border-[#22222a] bg-card dark:bg-[#141418] p-6 sm:p-8 space-y-6 shadow-xs">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="space-y-2 max-w-3xl">
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-[#ffd233] text-black">
                {request.businessName || "Automation Blueprint"}
              </span>
              <span className="text-xs text-muted-foreground">
                Submitted {formatDate(request.createdAt)}
              </span>
            </div>

            <h1 className="text-2xl sm:text-3xl font-black text-foreground dark:text-white tracking-tight">
              {request.title}
            </h1>

            <p className="text-xs sm:text-sm text-muted-foreground dark:text-[#8e8e93] leading-relaxed">
              {request.problemDescription || request.desiredAutomationDesc || "Custom engineered workflow specification."}
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-muted/40 dark:bg-[#1a1a22] border border-border dark:border-[#26262e] space-y-3 shrink-0 min-w-[240px]">
            <div className="flex items-center justify-between text-xs">
              <span className="text-muted-foreground font-semibold">Assigned Architect:</span>
              <span className="font-bold text-foreground dark:text-white">
                {request.assignedToName || "Engineering Team"}
              </span>
            </div>
            <div className="flex items-center justify-between text-xs">
              <span className="text-muted-foreground font-semibold">Turnkey SLA:</span>
              <span className="font-bold text-amber-700 dark:text-[#ffd233]">
                {request.estimatedDeliveryTime || request.expectedDeadline || "48 Hours"}
              </span>
            </div>
            <div className="space-y-1.5 pt-1 border-t border-border dark:border-[#26262e]">
              <div className="flex justify-between text-xs font-bold">
                <span className="text-foreground dark:text-white">Progress:</span>
                <span className="text-amber-700 dark:text-[#ffd233]">{request.progress}%</span>
              </div>
              <div className="h-2 w-full rounded-full bg-muted dark:bg-[#262632] overflow-hidden">
                <div
                  style={{ width: `${request.progress}%` }}
                  className="h-full bg-[#ffd233] rounded-full transition-all duration-500"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Tab Switcher */}
        <div className="flex items-center gap-1.5 overflow-x-auto pt-2 border-t border-border dark:border-[#22222a] no-scrollbar">
          {[
            { id: "OVERVIEW", label: "Overview", icon: Layers },
            { id: "STEPS", label: `Workflow Steps (${request.steps?.length || 0})`, icon: GitCommit },
            { id: "TOOLS", label: `Integrations (${request.integrations?.length || 0})`, icon: Cpu },
            { id: "FILES", label: `Files (${request.files?.length || 0})`, icon: UploadCloud },
            { id: "CHAT", label: `Messages (${messages.length})`, icon: MessageSquare },
            { id: "ACTIVITY", label: `Activity (${request.activities?.length || 0})`, icon: Clock },
          ].map((tab) => {
            const Icon = tab.icon;
            const active = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveTab(tab.id as any)}
                className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all shrink-0 ${
                  active
                    ? "bg-[#ffd233] text-black shadow-xs"
                    : "text-muted-foreground hover:text-foreground hover:bg-muted dark:hover:bg-[#1a1a22]"
                }`}
              >
                <Icon className="h-3.5 w-3.5" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* TAB 1: OVERVIEW */}
      {activeTab === "OVERVIEW" && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          <div className="lg:col-span-8 space-y-6">
            <div className="rounded-2xl border border-border dark:border-[#22222a] bg-card dark:bg-[#141418] p-6 space-y-4 shadow-xs">
              <h3 className="text-sm font-bold text-foreground dark:text-white flex items-center gap-2">
                <FileText className="h-4 w-4 text-amber-600 dark:text-[#ffd233]" />
                Business Problem & Objectives
              </h3>
              <p className="text-xs text-muted-foreground dark:text-[#8e8e93] leading-relaxed whitespace-pre-wrap">
                {request.problemDescription || "No detailed problem description."}
              </p>
            </div>

            <div className="rounded-2xl border border-border dark:border-[#22222a] bg-card dark:bg-[#141418] p-6 space-y-4 shadow-xs">
              <h3 className="text-sm font-bold text-foreground dark:text-white flex items-center gap-2">
                <Zap className="h-4 w-4 text-amber-600 dark:text-[#ffd233]" />
                Desired Automation Specification
              </h3>
              <p className="text-xs text-muted-foreground dark:text-[#8e8e93] leading-relaxed whitespace-pre-wrap">
                {request.desiredAutomationDesc || request.expectedResult || "Zero manual intervention automated pipeline."}
              </p>
            </div>
          </div>

          <div className="lg:col-span-4 space-y-6">
            <div className="rounded-2xl border border-border dark:border-[#22222a] bg-card dark:bg-[#141418] p-5 space-y-4 shadow-xs">
              <h3 className="text-xs font-bold text-foreground dark:text-white">
                Project Parameters
              </h3>
              <div className="space-y-3 text-xs">
                <div>
                  <span className="text-muted-foreground text-[11px] block">Company Name:</span>
                  <span className="font-bold text-foreground dark:text-white">{request.businessName || "Not specified"}</span>
                </div>
                <div>
                  <span className="text-muted-foreground text-[11px] block">Business Model:</span>
                  <span className="font-bold text-foreground dark:text-white">{request.businessType || "E-commerce"}</span>
                </div>
                <div>
                  <span className="text-muted-foreground text-[11px] block">Frequency:</span>
                  <span className="font-bold text-foreground dark:text-white">{request.frequency || "Daily"}</span>
                </div>
                <div>
                  <span className="text-muted-foreground text-[11px] block">Estimated Manual Time:</span>
                  <span className="font-bold text-foreground dark:text-white">{request.estimatedTime || "2 hours"}</span>
                </div>
                <div>
                  <span className="text-muted-foreground text-[11px] block">Priority:</span>
                  <span className="font-bold text-amber-700 dark:text-[#ffd233]">{request.priority || "HIGH"}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: STEPS (CURRENT VS DESIRED) */}
      {activeTab === "STEPS" && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Current Manual Steps */}
          <div className="rounded-2xl border border-border dark:border-[#22222a] bg-card dark:bg-[#141418] p-6 space-y-4 shadow-xs">
            <div className="flex items-center justify-between pb-2 border-b border-border dark:border-[#22222a]">
              <h3 className="text-sm font-bold text-foreground dark:text-white">
                Original Manual Process ({currentSteps.length} Steps)
              </h3>
              <span className="text-[10px] text-muted-foreground uppercase font-mono">Before</span>
            </div>

            <div className="space-y-3">
              {currentSteps.map((step: any) => (
                <div key={step.id} className="p-3.5 rounded-xl bg-muted/40 dark:bg-[#18181f] border border-border dark:border-[#26262e] space-y-1 text-xs">
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-[10px] font-bold text-amber-700 dark:text-[#ffd233]">
                      Step {step.order}
                    </span>
                    <span className="text-[10px] text-muted-foreground">
                      {step.tool || "Manual"}
                    </span>
                  </div>
                  <h4 className="font-bold text-foreground dark:text-white">{step.title}</h4>
                  {step.responsiblePerson && (
                    <p className="text-[11px] text-muted-foreground">Assigned: {step.responsiblePerson}</p>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Desired Automated Pipeline */}
          <div className="rounded-2xl border border-emerald-500/30 bg-card dark:bg-[#141418] p-6 space-y-4 shadow-xs">
            <div className="flex items-center justify-between pb-2 border-b border-border dark:border-[#22222a]">
              <h3 className="text-sm font-bold text-foreground dark:text-white">
                Engineered Automated Flow ({desiredSteps.length} Steps)
              </h3>
              <span className="text-[10px] text-emerald-500 uppercase font-mono font-bold">Automated</span>
            </div>

            <div className="space-y-3">
              {desiredSteps.map((step: any) => (
                <div key={step.id} className="p-3.5 rounded-xl bg-emerald-500/5 dark:bg-[#101915] border border-emerald-500/20 space-y-1 text-xs">
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-[10px] font-bold text-emerald-600 dark:text-emerald-400">
                      Action {step.order}
                    </span>
                    <span className="text-[10px] text-muted-foreground">
                      {step.tool || "Engine"}
                    </span>
                  </div>
                  <h4 className="font-bold text-foreground dark:text-white">{step.title}</h4>
                  {step.expectedResult && (
                    <p className="text-[11px] text-emerald-600 dark:text-emerald-400 font-medium">
                      Outcome: {step.expectedResult}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* TAB 3: INTEGRATIONS */}
      {activeTab === "TOOLS" && (
        <div className="rounded-2xl border border-border dark:border-[#22222a] bg-card dark:bg-[#141418] p-6 space-y-4 shadow-xs">
          <h3 className="text-sm font-bold text-foreground dark:text-white flex items-center gap-2">
            <Cpu className="h-4 w-4 text-amber-600 dark:text-[#ffd233]" />
            Connected Tools & APIs ({request.integrations?.length || 0})
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
            {request.integrations?.map((tool: any) => (
              <div key={tool.id} className="p-4 rounded-xl bg-muted/40 dark:bg-[#18181f] border border-border dark:border-[#26262e] space-y-2 text-xs">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-foreground dark:text-white text-sm">{tool.toolName}</span>
                  <span className="px-2 py-0.5 rounded-md text-[10px] font-bold bg-emerald-500/10 text-emerald-500 border border-emerald-500/20">
                    Connected
                  </span>
                </div>
                <p className="text-[11px] text-muted-foreground leading-relaxed">
                  {tool.purpose || "Used for automated data synchronization."}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 4: FILES */}
      {activeTab === "FILES" && (
        <div className="rounded-2xl border border-border dark:border-[#22222a] bg-card dark:bg-[#141418] p-6 space-y-4 shadow-xs">
          <h3 className="text-sm font-bold text-foreground dark:text-white flex items-center gap-2">
            <UploadCloud className="h-4 w-4 text-amber-600 dark:text-[#ffd233]" />
            Attached Documents & Screenshots ({request.files?.length || 0})
          </h3>

          {request.files?.length === 0 ? (
            <p className="text-xs text-muted-foreground">No files uploaded for this request.</p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {request.files?.map((file: any) => (
                <div key={file.id} className="p-4 rounded-xl bg-muted/40 dark:bg-[#18181f] border border-border dark:border-[#26262e] flex items-center justify-between gap-3 text-xs">
                  <div className="flex items-center gap-3 truncate">
                    {file.fileType?.includes("image") ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img src={file.fileUrl} alt={file.fileName} className="h-10 w-10 rounded-lg object-cover shrink-0" />
                    ) : (
                      <FileSpreadsheet className="h-8 w-8 text-emerald-500 shrink-0" />
                    )}
                    <div className="truncate">
                      <div className="font-bold text-foreground dark:text-white truncate">{file.fileName}</div>
                      <div className="text-[10px] text-muted-foreground">{(file.fileSize / 1024).toFixed(1)} KB</div>
                    </div>
                  </div>
                  <a
                    href={file.fileUrl}
                    download={file.fileName}
                    target="_blank"
                    rel="noreferrer"
                    className="p-2 rounded-lg bg-card dark:bg-[#22222c] hover:bg-muted text-foreground"
                    title="Download"
                  >
                    <Download className="h-4 w-4" />
                  </a>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* TAB 5: 2-WAY MESSAGES (CLIENT ↔ TEAM CHAT) */}
      {activeTab === "CHAT" && (
        <div className="rounded-2xl border border-border dark:border-[#22222a] bg-card dark:bg-[#141418] p-6 space-y-6 shadow-xs">
          <div className="flex items-center justify-between pb-3 border-b border-border dark:border-[#22222a]">
            <div>
              <h3 className="text-sm font-bold text-foreground dark:text-white flex items-center gap-2">
                <MessageSquare className="h-4 w-4 text-amber-600 dark:text-[#ffd233]" />
                Direct Communication Thread
              </h3>
              <p className="text-xs text-muted-foreground mt-0.5">
                Communicate directly with your assigned automation architect.
              </p>
            </div>
          </div>

          {/* Messages Feed */}
          <div className="space-y-4 max-h-[450px] overflow-y-auto pr-2">
            {messages.length === 0 ? (
              <div className="text-center py-8 text-xs text-muted-foreground">
                No messages yet. Send a question below to start chatting with the engineering team.
              </div>
            ) : (
              messages.map((msg: any) => {
                const isMe = msg.senderId === currentUserId;
                return (
                  <div
                    key={msg.id}
                    className={`flex flex-col ${isMe ? "items-end" : "items-start"}`}
                  >
                    <div className="flex items-center gap-1.5 mb-1 text-[10px] text-muted-foreground">
                      <span className="font-bold text-foreground dark:text-white">{msg.senderName}</span>
                      <span>•</span>
                      <span>{formatDate(msg.createdAt)}</span>
                    </div>
                    <div
                      className={`p-3.5 rounded-2xl text-xs max-w-lg leading-relaxed shadow-xs ${
                        isMe
                          ? "bg-[#ffd233] text-black font-medium rounded-tr-none"
                          : "bg-muted dark:bg-[#1e1e26] text-foreground dark:text-white border border-border dark:border-[#2a2a34] rounded-tl-none"
                      }`}
                    >
                      {msg.message}
                    </div>
                  </div>
                );
              })
            )}
          </div>

          {/* Send Input Box */}
          <form onSubmit={handleSendMessage} className="flex items-center gap-2 pt-3 border-t border-border dark:border-[#22222a]">
            <Input
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              placeholder="Type your question or clarification here..."
              className="h-10 text-xs bg-background dark:bg-[#1a1a22] border-border dark:border-[#26262e] text-foreground dark:text-white focus:border-[#ffd233]"
            />
            <Button
              type="submit"
              disabled={sending || !newMessage.trim()}
              className="h-10 px-5 rounded-xl bg-[#ffd233] hover:bg-[#f5c71a] text-black font-bold text-xs gap-1.5 shadow-xs shrink-0"
            >
              {sending ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
              <span>Send</span>
            </Button>
          </form>
        </div>
      )}

      {/* TAB 6: ACTIVITY TIMELINE */}
      {activeTab === "ACTIVITY" && (
        <div className="rounded-2xl border border-border dark:border-[#22222a] bg-card dark:bg-[#141418] p-6 space-y-4 shadow-xs">
          <h3 className="text-sm font-bold text-foreground dark:text-white flex items-center gap-2">
            <Clock className="h-4 w-4 text-amber-600 dark:text-[#ffd233]" />
            Audit & Milestone Timeline ({request.activities?.length || 0})
          </h3>

          <div className="relative pl-6 space-y-4 before:absolute before:left-2.5 before:top-2 before:bottom-2 before:w-[2px] before:bg-border dark:before:bg-[#262632]">
            {request.activities?.map((act: any) => (
              <div key={act.id} className="relative space-y-1 text-xs">
                <div className="absolute -left-[27px] top-1 h-3.5 w-3.5 rounded-full bg-[#ffd233] border-2 border-background" />
                <div className="flex items-center justify-between">
                  <span className="font-bold text-foreground dark:text-white">{act.actorName}</span>
                  <span className="text-[10px] text-muted-foreground">{formatDate(act.createdAt)}</span>
                </div>
                <p className="text-muted-foreground dark:text-[#8e8e93] leading-relaxed">
                  {act.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

