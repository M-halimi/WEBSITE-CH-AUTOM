"use client";

import * as React from "react";
import { MessageSquare, Sparkles, Share2, Check, Download, Zap } from "lucide-react";
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
      <div className="flex flex-col gap-3 w-full">
        {/* 1. Full-Width Primary Action Button */}
        <Button
          size="lg"
          onClick={() => setModalOpen(true)}
          className="w-full h-12 rounded-full font-bold bg-[#ffd233] hover:bg-[#f5c71a] text-black text-sm shadow-xs gap-2 transition-transform active:scale-98"
        >
          <Zap className="h-4 w-4 fill-current" />
          <span>Deploy This Blueprint</span>
        </Button>

        {/* 2. Secondary Actions Row (WhatsApp + Share) */}
        <div className="flex items-center gap-2.5 w-full">
          <a href={waLink} target="_blank" rel="noopener noreferrer" className="flex-1">
            <Button 
              variant="outline" 
              size="default" 
              className="w-full h-11 rounded-full font-bold text-xs gap-2 border-border bg-card text-foreground hover:bg-muted"
            >
              <MessageSquare className="h-4 w-4 text-amber-600 dark:text-[#ffd233]" />
              <span>WhatsApp Chat</span>
            </Button>
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
