"use client";

import * as React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { MessageSquare, Sparkles, Share2, Check, Download, Zap, Loader2, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { LeadFormModal } from "./LeadFormModal";
import { generateWhatsAppLink } from "@/lib/whatsapp";
import { activateBlueprintForClient } from "@/actions/clientBlueprintActions";

interface WorkflowDetailActionsProps {
  workflow: {
    id: string;
    title: string;
    slug: string;
  };
}

export function WorkflowDetailActions({ workflow }: WorkflowDetailActionsProps) {
  const router = useRouter();
  const [modalOpen, setModalOpen] = React.useState(false);
  const [copied, setCopied] = React.useState(false);
  const [activating, setActivating] = React.useState(false);
  const [activationSuccess, setActivationSuccess] = React.useState<string | null>(null);

  const waLink = generateWhatsAppLink({
    workflowTitle: workflow.title,
    workflowSlug: workflow.slug,
  });

  const handleShare = () => {
    if (typeof window !== "undefined") {
      navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleDirectDeploy = async () => {
    setActivating(true);
    const res = await activateBlueprintForClient(workflow.id);
    setActivating(false);

    if (res.success && res.projectId) {
      setActivationSuccess("Activated in your workspace!");
      setTimeout(() => {
        router.push(`/dashboard/workflows/${res.projectId}`);
      }, 1000);
    } else {
      // If not logged in or quota exceeded, open lead/deploy modal or redirect to register
      setModalOpen(true);
    }
  };

  return (
    <>
      <div className="flex flex-col gap-3 w-full">
        {/* 1. Full-Width Primary Action Button */}
        <Button
          size="lg"
          disabled={activating}
          onClick={handleDirectDeploy}
          className="w-full h-12 rounded-full font-black bg-[#ffd233] hover:bg-[#f5c71a] text-black text-sm shadow-md shadow-[#ffd233]/20 gap-2 transition-transform active:scale-98"
        >
          {activating ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" />
              <span>Activating in Workspace...</span>
            </>
          ) : activationSuccess ? (
            <>
              <CheckCircle2 className="h-4 w-4 text-emerald-800" />
              <span>{activationSuccess}</span>
            </>
          ) : (
            <>
              <Zap className="h-4 w-4 fill-current" />
              <span>⚡ Activate to My Workspace</span>
            </>
          )}
        </Button>

        {/* 2. Secondary Actions Row (WhatsApp + Share) */}
        <div className="flex items-center gap-2.5 w-full">
          <a
            href={waLink}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 h-11 rounded-full font-bold text-xs gap-2 border border-border bg-card text-foreground hover:bg-muted inline-flex items-center justify-center transition-all shadow-xs"
          >
            <MessageSquare className="h-4 w-4 text-amber-600 dark:text-[#ffd233]" />
            <span>WhatsApp Engineer</span>
          </a>

          <Button
            variant="outline"
            size="icon"
            onClick={handleShare}
            className="h-11 w-11 rounded-full border-border bg-card text-foreground hover:bg-muted shrink-0"
            title="Share blueprint"
            aria-label="Share blueprint link"
          >
            {copied ? <Check className="h-4 w-4 text-emerald-600" /> : <Share2 className="h-4 w-4" />}
          </Button>
        </div>
      </div>

      <LeadFormModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        workflowId={workflow.id}
        workflowTitle={workflow.title}
        workflowSlug={workflow.slug}
      />
    </>
  );
}
