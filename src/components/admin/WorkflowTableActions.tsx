"use client";

import * as React from "react";
import Link from "next/link";
import { Edit, Trash2, Eye, Globe, Loader2, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
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
  const [isPending, setIsPending] = React.useState(false);
  const [currentStatus, setCurrentStatus] = React.useState(status);

  const handleToggle = async () => {
    setIsPending(true);
    const res = await togglePublishStatus(workflowId, currentStatus);
    setIsPending(false);
    if (res.success && res.status) {
      setCurrentStatus(res.status);
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
    }
  };

  return (
    <div className="flex items-center gap-1.5">
      <Button
        variant={currentStatus === "PUBLISHED" ? "outline" : "default"}
        size="sm"
        disabled={isPending}
        onClick={handleToggle}
        className="h-7 px-2 text-[11px]"
      >
        {isPending ? (
          <Loader2 className="h-3 w-3 animate-spin" />
        ) : currentStatus === "PUBLISHED" ? (
          "Unpublish"
        ) : (
          "Publish"
        )}
      </Button>

      <Link href={`/admin/workflows/${workflowId}/edit`}>
        <Button
          variant="ghost"
          size="icon"
          className="h-7 w-7"
          title="Edit workflow"
        >
          <Edit className="h-3.5 w-3.5" />
        </Button>
      </Link>

      <Link href={`/workflows/${slug}`} target="_blank">
        <Button
          variant="ghost"
          size="icon"
          className="h-7 w-7 text-muted-foreground"
          title="View live"
        >
          <Globe className="h-3.5 w-3.5" />
        </Button>
      </Link>

      <Button
        variant="ghost"
        size="icon"
        disabled={isPending}
        onClick={handleDelete}
        className="h-7 w-7 text-destructive hover:bg-destructive/10"
        title="Delete workflow"
      >
        <Trash2 className="h-3.5 w-3.5" />
      </Button>
    </div>
  );
}
