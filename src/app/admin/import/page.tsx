"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import {
  UploadCloud,
  FileCode,
  CheckCircle2,
  AlertCircle,
  Sparkles,
  ArrowRight,
  Loader2,
  FileJson,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { parseN8nJson, createWorkflow } from "@/actions/workflowActions";

export default function AdminImportPage() {
  const router = useRouter();
  const [jsonText, setJsonText] = React.useState("");
  const [parsing, setParsing] = React.useState(false);
  const [importing, setImporting] = React.useState(false);
  const [previewData, setPreviewData] = React.useState<any>(null);
  const [errorMessage, setErrorMessage] = React.useState<string | null>(null);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const content = event.target?.result as string;
      setJsonText(content);
      handleParse(content);
    };
    reader.readAsText(file);
  };

  const handleParse = async (contentToParse?: string) => {
    const target = contentToParse || jsonText;
    if (!target.trim()) {
      setErrorMessage("Please paste JSON or upload a file first.");
      return;
    }

    setParsing(true);
    setErrorMessage(null);

    const res = await parseN8nJson(target);
    setParsing(false);

    if (res.success && res.data) {
      setPreviewData(res.data);
    } else {
      setErrorMessage(res.error || "Failed to parse n8n workflow JSON.");
      setPreviewData(null);
    }
  };

  const handleImportAsDraft = async () => {
    if (!previewData) return;

    setImporting(true);
    const res = await createWorkflow({
      title: previewData.title,
      summary: `Automated ${previewData.title} containing ${previewData.nodesCount} nodes imported via n8n export blueprint.`,
      description: `### Overview\nThis workflow was automatically imported from an n8n JSON file.\n\n### Nodes Overview\nContains ${previewData.nodesCount} executed sequential and conditional nodes.`,
      difficulty: previewData.nodesCount > 6 ? "ADVANCED" : "INTERMEDIATE",
      estimatedTime: "20 mins setup",
      status: "DRAFT",
      featured: false,
      steps: previewData.steps,
    });

    setImporting(false);

    if (res.success && res.workflow) {
      router.push(`/admin/workflows/${res.workflow.id}/edit`);
    } else {
      setErrorMessage(res.error || "Failed to import workflow as draft.");
    }
  };

  const sampleN8nJson = JSON.stringify(
    {
      name: "Sample n8n Lead Dispatcher",
      nodes: [
        {
          name: "Webhook Inbound",
          type: "n8n-nodes-base.webhook",
          parameters: { path: "leads", httpMethod: "POST" },
        },
        {
          name: "Parse JSON & Normalize",
          type: "n8n-nodes-base.function",
          parameters: { functionCode: "return items;" },
        },
        {
          name: "Verify Phone & Intent",
          type: "n8n-nodes-base.if",
          parameters: {
            conditions: {
              string: [{ value1: "phone", operation: "isNotEmpty" }],
            },
          },
        },
        {
          name: "Send WhatsApp Confirmation",
          type: "n8n-nodes-base.httpRequest",
          parameters: {
            url: "https://graph.facebook.com/v18.0/messages",
            method: "POST",
          },
        },
        {
          name: "Append to Master Google Sheet",
          type: "n8n-nodes-base.googleSheets",
          parameters: { operation: "append", sheetId: "CRM_LEADS_2026" },
        },
      ],
    },
    null,
    2,
  );

  return (
    <div className="space-y-8 max-w-4xl">
      <div>
        <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-foreground flex items-center gap-2">
          <UploadCloud className="h-6 w-6 text-purple-500" />
          n8n & Make JSON Import Center
        </h1>
        <p className="text-xs sm:text-sm text-muted-foreground mt-1">
          Upload or paste any exported n8n workflow JSON. We automatically parse
          the nodes, triggers, actions, and create a Draft workflow for your
          review.
        </p>
      </div>

      {errorMessage && (
        <div className="p-4 rounded-xl bg-destructive/10 border border-destructive/30 text-destructive text-xs font-semibold flex items-center gap-2">
          <AlertCircle className="h-4 w-4 shrink-0" />
          <span>{errorMessage}</span>
        </div>
      )}

      {/* Upload Zone */}
      <div className="rounded-2xl border border-dashed border-border bg-card/60 p-8 text-center space-y-4">
        <div className="mx-auto h-12 w-12 rounded-full bg-purple-500/10 text-purple-500 flex items-center justify-center">
          <FileJson className="h-6 w-6" />
        </div>
        <div>
          <h3 className="text-sm font-bold text-foreground">
            Upload n8n / Make JSON Export
          </h3>
          <p className="text-xs text-muted-foreground mt-1">
            Drag and drop your .json file here or click to browse.
          </p>
        </div>

        <div>
          <input
            type="file"
            id="jsonFileInput"
            accept=".json,application/json"
            onChange={handleFileUpload}
            className="hidden"
          />
          <label htmlFor="jsonFileInput">
            <Button
              type="button"
              variant="outline"
              size="sm"
              className="cursor-pointer"
              asChild
            >
              <span>Choose JSON File</span>
            </Button>
          </label>
        </div>
      </div>

      {/* Manual Paste Box */}
      <div className="rounded-2xl border border-border bg-card p-6 space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-bold text-foreground">
            Or Paste JSON Data Directly
          </h3>
          <button
            type="button"
            onClick={() => {
              setJsonText(sampleN8nJson);
              handleParse(sampleN8nJson);
            }}
            className="text-xs text-primary hover:underline font-medium"
          >
            Insert Sample n8n JSON
          </button>
        </div>

        <Textarea
          rows={7}
          value={jsonText}
          onChange={(e) => setJsonText(e.target.value)}
          placeholder='{"name": "My n8n Workflow", "nodes": [...]}'
          className="font-mono text-xs leading-relaxed"
        />

        <Button
          type="button"
          onClick={() => handleParse()}
          disabled={parsing || !jsonText.trim()}
          className="gap-2 text-xs font-semibold"
        >
          {parsing ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : (
            <Sparkles className="h-4 w-4" />
          )}
          Parse & Preview Nodes
        </Button>
      </div>

      {/* Preview Section */}
      {previewData && (
        <div className="rounded-2xl border border-emerald-500/30 bg-emerald-500/5 p-6 sm:p-8 space-y-6 animate-in fade-in slide-in-from-bottom-3 duration-300">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-emerald-500/20">
            <div>
              <div className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-500 mb-1">
                <CheckCircle2 className="h-4 w-4" /> Parsed Successfully
              </div>
              <h3 className="text-xl font-bold text-foreground">
                {previewData.title}
              </h3>
              <p className="text-xs text-muted-foreground mt-0.5">
                Detected{" "}
                <strong className="text-foreground">
                  {previewData.nodesCount} nodes
                </strong>{" "}
                in sequence.
              </p>
            </div>

            <Button
              onClick={handleImportAsDraft}
              disabled={importing}
              className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold gap-2 text-xs"
            >
              {importing ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  Creating Draft...
                </>
              ) : (
                <>
                  <span>Import as Draft Workflow</span>
                  <ArrowRight className="h-4 w-4" />
                </>
              )}
            </Button>
          </div>

          {/* Detected Steps Preview */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
              Detected Pipeline Nodes:
            </h4>
            <div className="space-y-2">
              {previewData.steps.map((s: any, idx: number) => (
                <div
                  key={idx}
                  className="flex items-center justify-between p-3 rounded-xl border border-border bg-card text-xs"
                >
                  <div className="flex items-center gap-2.5">
                    <Badge variant="outline" className="text-[10px] font-mono">
                      #{s.order}
                    </Badge>
                    <span className="font-bold text-foreground">{s.name}</span>
                    <span className="text-muted-foreground text-[11px]">
                      ({s.appName})
                    </span>
                  </div>
                  <Badge variant="secondary" className="text-[10px]">
                    {s.type}
                  </Badge>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
