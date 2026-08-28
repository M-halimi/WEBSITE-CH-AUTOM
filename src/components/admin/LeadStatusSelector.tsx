"use client";

import * as React from "react";
import { MessageSquare, Trash2, Loader2 } from "lucide-react";
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
        className="h-8 rounded-xl border border-[#2a2a34] bg-[#1a1a22] px-2.5 text-xs font-bold text-white focus:outline-none focus:border-[#ff5a1f]"
      >
        <option value="NEW">🟡 NEW</option>
        <option value="CONTACTED">🔵 CONTACTED</option>
        <option value="IN_PROGRESS">🟣 IN_PROGRESS</option>
        <option value="COMPLETED">🟢 COMPLETED</option>
        <option value="CANCELLED">⚪ CANCELLED</option>
      </select>

      {waDirectUrl && (
        <a
          href={waDirectUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="h-8 px-3 rounded-xl bg-emerald-500/15 hover:bg-emerald-500/25 border border-emerald-500/30 text-emerald-400 font-bold text-xs inline-flex items-center gap-1.5 transition-colors shadow-xs"
          title="Open WhatsApp Chat"
        >
          <MessageSquare className="h-3.5 w-3.5" />
          <span>Chat</span>
        </a>
      )}

      <button
        type="button"
        disabled={pending}
        onClick={handleDelete}
        className="h-8 w-8 rounded-xl bg-[#1c1c24] hover:bg-red-500/15 text-[#a1a1aa] hover:text-red-400 border border-[#2a2a34] inline-flex items-center justify-center transition-colors"
        title="Delete lead"
      >
        <Trash2 className="h-3.5 w-3.5" />
      </button>
    </div>
  );
}
