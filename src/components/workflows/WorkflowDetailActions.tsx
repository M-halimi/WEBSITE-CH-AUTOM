"use client";

import * as React from "react";
import { MessageSquare, Sparkles, Share2, Check, Download } from "lucide-react";
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

export function WorkflowDetailActions({ workflow }: WorkflowDetailActionsProps) {
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
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5 w-full">
        <Button
          size="lg"
          onClick={() => setModalOpen(true)}
          className="flex-1 rounded-full font-semibold bg-[#f1641e] hover:bg-[#d44e0d] text-white text-sm h-12 shadow-sm gap-2"
        >
          <Sparkles className="h-4 w-4" />
          Get This Automation
        </Button>

        <a href={waLink} target="_blank" rel="noopener noreferrer" className="flex-1">
          <Button variant="secondary" size="lg" className="w-full rounded-full font-semibold text-sm h-12 gap-2 bg-white hover:bg-[#f6f6f6] text-[#222222] border border-[#bdbdbd]">
            <MessageSquare className="h-4 w-4 text-[#f1641e]" />
            WhatsApp Inquiry
          </Button>
        </a>

        <Button
          variant="outline"
          size="icon"
          onClick={handleShare}
          className="h-12 w-12 rounded-full border-[#bdbdbd] hover:bg-[#f6f6f6] shrink-0 text-[#222222]"
          title="Share blueprint"
        >
          {copied ? <Check className="h-4 w-4 text-[#258635]" /> : <Share2 className="h-4 w-4" />}
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
