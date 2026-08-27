"use client";

import * as React from "react";
import { MessageSquare, Sparkles, Share2, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { LeadFormModal } from "./LeadFormModal";
import { generateWhatsAppLink } from "@/lib/whatsapp";

interface WorkflowDetailActionsProps {
  workflow: {
    id: string;
    title: string;
    slug: string;
  };
}

export function WorkflowDetailActions({
  workflow,
}: WorkflowDetailActionsProps) {
  const [modalOpen, setModalOpen] = React.useState(false);
  const [copied, setCopied] = React.useState(false);

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

  return (
    <>
      <div className="flex flex-wrap items-center gap-3">
        <Button
          size="lg"
          onClick={() => setModalOpen(true)}
          className="rounded-xl font-bold bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 shadow-lg shadow-emerald-500/25 text-sm gap-2"
        >
          <Sparkles className="h-4 w-4" />
          Get This Automation
        </Button>

        <a href={waLink} target="_blank" rel="noopener noreferrer">
          <Button
            variant="whatsapp"
            size="lg"
            className="rounded-xl font-semibold text-sm gap-2"
          >
            <MessageSquare className="h-4 w-4" />
            Contact on WhatsApp
          </Button>
        </a>

        <Button
          variant="outline"
          size="lg"
          onClick={handleShare}
          className="rounded-xl text-xs gap-1.5"
          title="Share workflow link"
        >
          {copied ? (
            <Check className="h-4 w-4 text-emerald-500" />
          ) : (
            <Share2 className="h-4 w-4" />
          )}
          <span>{copied ? "Link Copied!" : "Share"}</span>
        </Button>
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
