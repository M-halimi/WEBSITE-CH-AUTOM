import Link from "next/link";
import { PlusCircle, UploadCloud, Layers, Eye, Sparkles } from "lucide-react";
import { prisma } from "@/lib/prisma";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { WorkflowTableActions } from "@/components/admin/WorkflowTableActions";
import { formatDate } from "@/lib/utils";

export const revalidate = 0; // Fresh admin query

export default async function AdminWorkflowsPage() {
  const workflows = await prisma.workflow.findMany({
    include: {
      category: true,
      platforms: { include: { platform: true } },
      steps: true,
      _count: { select: { requests: true } },
    },
    orderBy: { createdAt: "desc" },
  });

  return (
    <div className="space-y-6">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-foreground">
            Manage Workflows
          </h1>
          <p className="text-xs sm:text-sm text-muted-foreground mt-0.5">
            Total {workflows.length} workflows in catalog.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Link href="/admin/workflows/new">
            <Button size="sm" className="gap-1.5 text-xs font-semibold">
              <PlusCircle className="h-4 w-4" />
              Create New Workflow
            </Button>
          </Link>
          <Link href="/admin/import">
            <Button
              variant="outline"
              size="sm"
              className="gap-1.5 text-xs font-semibold"
            >
              <UploadCloud className="h-4 w-4" />
              Import JSON
            </Button>
          </Link>
        </div>
      </div>

      {/* Workflows Table */}
      <div className="rounded-2xl border border-border bg-card shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-muted/40 text-muted-foreground font-semibold uppercase tracking-wider border-b border-border">
              <tr>
                <th className="py-3 px-4">Workflow Name</th>
                <th className="py-3 px-4">Category</th>
                <th className="py-3 px-4">Difficulty</th>
                <th className="py-3 px-4">Steps</th>
                <th className="py-3 px-4">Views / Leads</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {workflows.map((wf) => (
                <tr key={wf.id} className="hover:bg-muted/30 transition-colors">
                  <td className="py-3.5 px-4">
                    <div className="font-semibold text-foreground">
                      {wf.title}
                    </div>
                    <div className="text-[11px] text-muted-foreground font-mono truncate max-w-xs">
                      /{wf.slug}
                    </div>
                  </td>
                  <td className="py-3.5 px-4 text-muted-foreground">
                    {wf.category ? wf.category.name : "—"}
                  </td>
                  <td className="py-3.5 px-4">
                    <Badge variant="outline" className="text-[10px]">
                      {wf.difficulty}
                    </Badge>
                  </td>
                  <td className="py-3.5 px-4 text-muted-foreground font-medium">
                    {wf.steps.length || wf.stepsCount} steps
                  </td>
                  <td className="py-3.5 px-4 text-muted-foreground">
                    <span>{wf.views} views</span>
                    <span className="block text-[11px] text-primary font-semibold">
                      {wf._count.requests} leads
                    </span>
                  </td>
                  <td className="py-3.5 px-4">
                    <Badge
                      variant={
                        wf.status === "PUBLISHED" ? "success" : "secondary"
                      }
                      className="text-[10px]"
                    >
                      {wf.status}
                    </Badge>
                  </td>
                  <td className="py-3.5 px-4 text-right">
                    <WorkflowTableActions
                      workflowId={wf.id}
                      slug={wf.slug}
                      status={wf.status}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
