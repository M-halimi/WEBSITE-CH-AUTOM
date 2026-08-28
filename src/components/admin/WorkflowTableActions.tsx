"use client";

import * as React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Edit, Trash2, Globe, Loader2 } from "lucide-react";
import { togglePublishStatus, deleteWorkflow } from "@/actions/workflowActions";

interface WorkflowTableActionsProps {
  workflowId: string;
  slug: string;
  status: string;
}

export function WorkflowTableActions({
  workflowId,
  slug,
  status,
}: WorkflowTableActionsProps) {
  const router = useRouter();
  const [isPending, setIsPending] = React.useState(false);
  const [currentStatus, setCurrentStatus] = React.useState(status);

  const handleToggle = async () => {
    setIsPending(true);
    const res = await togglePublishStatus(workflowId, currentStatus);
    setIsPending(false);
    if (res.success && res.status) {
      setCurrentStatus(res.status);
      router.refresh();
    }
  };

  const handleDelete = async () => {
    if (
      confirm(
        "Are you sure you want to delete this workflow? This cannot be undone.",
      )
    ) {
      setIsPending(true);
      await deleteWorkflow(workflowId);
      setIsPending(false);
      router.refresh();
    }
  };

  return (
    <div className="flex items-center justify-end gap-1.5">
      <button
        type="button"
        disabled={isPending}
        onClick={handleToggle}
        className={`h-7 px-2.5 rounded-lg text-[11px] font-bold border transition-colors ${
          currentStatus === "PUBLISHED"
            ? "bg-[#1c1c24] text-[#a1a1aa] hover:text-white border-[#2a2a34]"
            : "bg-[#ff5a1f]/10 text-[#ff8c37] border-[#ff5a1f]/30 hover:bg-[#ff5a1f]/20"
        }`}
      >
        {isPending ? (
          <Loader2 className="h-3 w-3 animate-spin" />
        ) : currentStatus === "PUBLISHED" ? (
          "Unpublish"
        ) : (
          "Publish"
        )}
      </button>

      <Link
        href={`/admin/workflows/${workflowId}/edit`}
        className="h-7 w-7 rounded-lg inline-flex items-center justify-center bg-[#1c1c24] hover:bg-[#262632] text-[#a1a1aa] hover:text-white border border-[#2a2a34] transition-colors"
        title="Edit workflow"
      >
        <Edit className="h-3 w-3" />
      </Link>

      <Link
        href={`/workflows/${slug}`}
        target="_blank"
        className="h-7 w-7 rounded-lg inline-flex items-center justify-center bg-[#1c1c24] hover:bg-[#262632] text-[#a1a1aa] hover:text-white border border-[#2a2a34] transition-colors"
        title="View live"
      >
        <Globe className="h-3 w-3" />
      </Link>

      <button
        type="button"
        disabled={isPending}
        onClick={handleDelete}
        className="h-7 w-7 rounded-lg inline-flex items-center justify-center bg-[#1c1c24] hover:bg-red-500/15 text-[#a1a1aa] hover:text-red-400 border border-[#2a2a34] transition-colors"
        title="Delete workflow"
      >
        <Trash2 className="h-3 w-3" />
      </button>
    </div>
  );
}
