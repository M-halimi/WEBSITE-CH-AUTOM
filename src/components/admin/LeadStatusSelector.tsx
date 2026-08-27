"use client";

import * as React from "react";
import { MessageSquare, Trash2, Loader2, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { updateLeadStatus, deleteLeadRequest } from "@/actions/leadActions";

interface LeadStatusSelectorProps {
  leadId: string;
  currentStatus: string;
  clientName: string;
  whatsapp?: string | null;
  workflowTitle?: string | null;
}

export function LeadStatusSelector({
  leadId,
  currentStatus,
  clientName,
  whatsapp,
  workflowTitle,
}: LeadStatusSelectorProps) {
  const [status, setStatus] = React.useState(currentStatus);
  const [pending, setPending] = React.useState(false);

  const handleStatusChange = async (newStatus: string) => {
    setPending(true);
    setStatus(newStatus);
    await updateLeadStatus(leadId, newStatus);
    setPending(false);
  };

  const handleDelete = async () => {
    if (confirm(`Delete request from ${clientName}?`)) {
      setPending(true);
      await deleteLeadRequest(leadId);
      setPending(false);
    }
  };

  let waDirectUrl = "";
  if (whatsapp) {
    const cleanPhone = whatsapp.replace(/[^0-9]/g, "");
    const text = encodeURIComponent(
      `Salam ${clientName}, this is regarding your automation request for ${workflowTitle || "Custom Workflow"}. How can we assist you?`,
    );
    waDirectUrl = `https://wa.me/${cleanPhone}?text=${text}`;
  }

  return (
    <div className="flex items-center gap-2">
      <select
        value={status}
        disabled={pending}
        onChange={(e) => handleStatusChange(e.target.value)}
        aria-label={`Status for ${clientName}`}
        className="h-8 rounded-lg border border-input bg-background px-2 text-xs font-medium focus:outline-none focus:ring-1 focus:ring-primary"
      >
        <option value="NEW">🟡 NEW</option>
        <option value="CONTACTED">🔵 CONTACTED</option>
        <option value="IN_PROGRESS">🟣 IN_PROGRESS</option>
        <option value="COMPLETED">🟢 COMPLETED</option>
        <option value="CANCELLED">⚪ CANCELLED</option>
      </select>

      {waDirectUrl && (
        <a href={waDirectUrl} target="_blank" rel="noopener noreferrer">
          <Button
            variant="whatsapp"
            size="icon"
            className="h-8 w-8"
            title="Message on WhatsApp"
          >
            <MessageSquare className="h-3.5 w-3.5" />
          </Button>
        </a>
      )}

      <Button
        variant="ghost"
        size="icon"
        disabled={pending}
        onClick={handleDelete}
        className="h-8 w-8 text-destructive hover:bg-destructive/10"
        title="Delete lead"
      >
        <Trash2 className="h-3.5 w-3.5" />
      </Button>
    </div>
  );
}
