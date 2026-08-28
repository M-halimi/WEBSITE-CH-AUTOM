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
      setErrorMessage(res.error || "Failed to create workflow draft.");
    }
  };

  const sampleN8nJson = JSON.stringify(
    {
      name: "WhatsApp Order Confirmation & Google Sheet Logger",
      nodes: [
        {
          parameters: { httpMethod: "POST", path: "webhook-order" },
          name: "Webhook Order Trigger",
          type: "n8n-nodes-base.webhook",
        },
        {
          parameters: {
            operation: "append",
            sheetId: "1BxiMVs0XRA5nFMdKvBdBZjgmUUqptlbs74OgvE2upms",
          },
          name: "Append to Google Sheets",
          type: "n8n-nodes-base.googleSheets",
        },
        {
          parameters: {
            resource: "messages",
            operation: "sendTemplate",
            templateName: "order_confirmation_v1",
          },
          name: "Send WhatsApp Template",
          type: "n8n-nodes-base.whatsapp",
        },
        {
          parameters: {
            conditions: {
              string: [{ value1: "={{ $json.total }}", value2: "100" }],
            },
          },
          name: "Check VIP Threshold",
          type: "n8n-nodes-base.if",
        },
      ],
    },
    null,
    2,
  );

  return (
    <div className="space-y-6 max-w-4xl">
      <div>
        <h1 className="text-xl sm:text-2xl font-black text-foreground dark:text-white tracking-tight flex items-center gap-2">
          <UploadCloud className="h-5 w-5 text-amber-600 dark:text-[#ffd233]" />
          n8n & Make JSON Importer
        </h1>
        <p className="text-xs text-muted-foreground dark:text-[#71717a] mt-0.5">
          Upload or paste any exported n8n workflow JSON. Nodes and sequential execution are automatically detected.
        </p>
      </div>

      {errorMessage && (
        <div className="p-4 rounded-xl bg-destructive/10 border border-destructive/30 text-destructive text-xs font-semibold flex items-center gap-2">
          <AlertCircle className="h-4 w-4 shrink-0" />
          <span>{errorMessage}</span>
        </div>
      )}

      {/* Upload Zone */}
      <div className="rounded-2xl border border-dashed border-border dark:border-[#26262e] bg-card dark:bg-[#141418] p-8 text-center space-y-4 transition-colors duration-300">
        <div className="mx-auto h-12 w-12 rounded-xl bg-muted dark:bg-[#1e1e26] border border-border dark:border-[#2a2a34] text-amber-600 dark:text-[#ffd233] flex items-center justify-center">
          <FileJson className="h-6 w-6" />
        </div>
        <div>
          <h3 className="text-sm font-bold text-foreground dark:text-white">
            Upload n8n / Make JSON Export
          </h3>
          <p className="text-xs text-muted-foreground dark:text-[#71717a] mt-1">
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
          <label
            htmlFor="jsonFileInput"
            className="cursor-pointer inline-flex items-center justify-center h-9 px-5 rounded-xl border border-border dark:border-[#2a2a34] bg-muted dark:bg-[#18181e] hover:bg-muted/80 dark:hover:bg-[#202028] text-foreground dark:text-white text-xs font-bold shadow-xs transition-all"
          >
            <span>Choose JSON File</span>
          </label>
        </div>
      </div>

      {/* Manual Paste Box */}
      <div className="rounded-2xl border border-border dark:border-[#22222a] bg-card dark:bg-[#141418] p-6 space-y-4 shadow-xs transition-colors duration-300">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-bold text-foreground dark:text-white">
            Or Paste JSON Data Directly
          </h3>
          <button
            type="button"
            onClick={() => {
              setJsonText(sampleN8nJson);
              handleParse(sampleN8nJson);
            }}
            className="text-xs text-amber-600 dark:text-[#ffd233] hover:underline font-semibold"
          >
            Insert Sample n8n JSON
          </button>
        </div>

        <Textarea
          rows={7}
          value={jsonText}
          onChange={(e) => setJsonText(e.target.value)}
          placeholder='{"name": "My n8n Workflow", "nodes": [...]}'
          className="font-mono text-xs leading-relaxed bg-background dark:bg-[#101014] border-border dark:border-[#22222a] text-foreground dark:text-white focus:border-[#ffd233]"
        />

        <Button
          type="button"
          onClick={() => handleParse()}
          disabled={parsing || !jsonText.trim()}
          className="gap-2 text-xs font-bold rounded-xl bg-muted dark:bg-[#1b1b22] hover:bg-muted/80 dark:hover:bg-[#252530] text-foreground dark:text-white border border-border dark:border-[#26262e] shadow-xs"
        >
          {parsing ? (
            <Loader2 className="h-4 w-4 animate-spin text-amber-600 dark:text-[#ffd233]" />
          ) : (
            <Sparkles className="h-4 w-4 text-amber-600 dark:text-[#ffd233]" />
          )}
          Parse & Preview Nodes
        </Button>
      </div>

      {/* Preview Section */}
      {previewData && (
        <div className="rounded-2xl border border-emerald-500/30 bg-card dark:bg-[#141418] p-6 sm:p-8 space-y-6 animate-in fade-in slide-in-from-bottom-3 duration-300">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-border dark:border-[#22222a]">
            <div>
              <div className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-600 dark:text-emerald-400 mb-1">
                <CheckCircle2 className="h-4 w-4" /> Parsed Successfully
              </div>
              <h3 className="text-xl font-bold text-foreground dark:text-white">
                {previewData.title}
              </h3>
              <p className="text-xs text-muted-foreground dark:text-[#71717a] mt-0.5">
                Detected <strong className="text-foreground dark:text-white">{previewData.nodesCount} nodes</strong> in sequence.
              </p>
            </div>

            <Button
              onClick={handleImportAsDraft}
              disabled={importing}
              className="bg-[#ffd233] hover:bg-[#f5c71a] text-black font-bold gap-2 text-xs h-10 px-6 rounded-xl shadow-md shadow-[#ffd233]/20"
            >
              {importing ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  Creating Draft...
                </>
              ) : (
                <>
                  <span>Create Workflow Draft</span>
                  <ArrowRight className="h-4 w-4" />
                </>
              )}
            </Button>
          </div>

          {/* Node Cards Preview */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-muted-foreground dark:text-[#71717a] uppercase tracking-wider">
              Detected Pipeline Steps ({previewData.steps?.length})
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {previewData.steps?.map((step: any, idx: number) => (
                <div
                  key={idx}
                  className="rounded-xl border border-border dark:border-[#22222a] bg-muted/40 dark:bg-[#1a1a22] p-3.5 space-y-1.5 text-xs"
                >
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-[10px] text-amber-800 dark:text-[#ffd233] font-bold">
                      Step {step.order}
                    </span>
                    <Badge variant="outline" className="text-[10px] border-border dark:border-[#2a2a36] text-muted-foreground dark:text-[#a1a1aa]">
                      {step.type}
                    </Badge>
                  </div>
                  <h5 className="font-bold text-foreground dark:text-white truncate">{step.name}</h5>
                  <p className="text-[11px] text-muted-foreground dark:text-[#71717a] truncate">
                    {step.appName}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
