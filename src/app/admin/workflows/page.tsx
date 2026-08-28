import Link from "next/link";
import { PlusCircle, UploadCloud, Layers, Eye, Sparkles, Plus, Search } from "lucide-react";
import { prisma } from "@/lib/prisma";
import { WorkflowTableActions } from "@/components/admin/WorkflowTableActions";
import { formatDate } from "@/lib/utils";
import { PlatformIcon } from "@/components/ui/platform-icon";

export const dynamic = "force-dynamic";

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
          <h1 className="text-xl sm:text-2xl font-black text-foreground dark:text-white tracking-tight">
            All Automation Blueprints
          </h1>
          <p className="text-xs text-muted-foreground dark:text-[#71717a] mt-0.5">
            Total <strong className="text-foreground dark:text-white">{workflows.length}</strong> automation templates configured in marketplace.
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <Link
            href="/admin/import"
            className="h-8 px-3.5 rounded-xl bg-card dark:bg-[#18181d] hover:bg-muted dark:hover:bg-[#22222a] border border-border dark:border-[#26262e] text-xs font-semibold text-foreground dark:text-[#d4d4d8] inline-flex items-center gap-1.5 transition-colors shadow-xs"
          >
            <UploadCloud className="h-3.5 w-3.5 text-muted-foreground dark:text-[#71717a]" />
            <span>Import n8n</span>
          </Link>
          <Link
            href="/admin/workflows/new"
            className="h-8 px-4 rounded-xl bg-[#ffd233] hover:bg-[#f5c71a] text-black text-xs font-bold inline-flex items-center gap-1.5 shadow-md shadow-[#ffd233]/20 transition-all"
          >
            <Plus className="h-4 w-4" />
            <span>+ Create Blueprint</span>
          </Link>
        </div>
      </div>

      {/* Workflows Table Card */}
      <div className="rounded-2xl border border-border dark:border-[#22222a] bg-card dark:bg-[#141418] shadow-xs overflow-hidden transition-colors duration-300">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-muted/50 dark:bg-[#18181e] text-muted-foreground dark:text-[#71717a] font-bold uppercase tracking-wider border-b border-border dark:border-[#22222a]">
              <tr>
                <th className="py-3 px-4">Blueprint</th>
                <th className="py-3 px-4">Engines</th>
                <th className="py-3 px-4">Category</th>
                <th className="py-3 px-4">Price</th>
                <th className="py-3 px-4">Level</th>
                <th className="py-3 px-4">Steps</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border dark:divide-[#1c1c24]">
              {workflows.map((wf) => (
                <tr key={wf.id} className="hover:bg-muted/40 dark:hover:bg-[#18181e] transition-colors group">
                  <td className="py-3.5 px-4">
                    <div className="flex items-center gap-3">
                      {wf.imageUrl ? (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img
                          src={wf.imageUrl}
                          alt={wf.title}
                          className="h-10 w-14 rounded-xl object-cover border border-border dark:border-[#2a2a34] shrink-0 shadow-2xs"
                        />
                      ) : (
                        <div className="h-10 w-14 rounded-xl bg-muted dark:bg-[#1e1e26] border border-border dark:border-[#2a2a34] flex items-center justify-center shrink-0 text-amber-600 dark:text-[#ffd233] text-xs font-bold">
                          Flow
                        </div>
                      )}
                      <div>
                        <div className="font-bold text-foreground dark:text-white group-hover:text-amber-600 dark:group-hover:text-[#ffd233] transition-colors">
                          {wf.title}
                        </div>
                        <div className="text-[11px] text-muted-foreground dark:text-[#71717a] font-mono truncate max-w-xs">
                          /{wf.slug}
                        </div>
                      </div>
                    </div>
                  </td>

                  {/* Connected Engines */}
                  <td className="py-3.5 px-4">
                    <div className="flex items-center gap-1 flex-wrap max-w-[120px]">
                      {wf.platforms?.map((p) => (
                        <PlatformIcon
                          key={p.platformId}
                          slug={p.platform.slug}
                          name={p.platform.name}
                          size="xs"
                          withBadge={false}
                        />
                      ))}
                    </div>
                  </td>

                  <td className="py-3.5 px-4 text-muted-foreground dark:text-[#a1a1aa]">
                    {wf.category ? wf.category.name : "—"}
                  </td>

                  <td className="py-3.5 px-4">
                    <span className="font-bold text-xs text-foreground dark:text-white">
                      {wf.price || "Free"}
                    </span>
                  </td>

                  <td className="py-3.5 px-4">
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-muted dark:bg-[#1f1f28] text-foreground dark:text-[#d4d4d8] border border-border dark:border-[#2a2a36]">
                      {wf.difficulty}
                    </span>
                  </td>

                  <td className="py-3.5 px-4 text-muted-foreground dark:text-[#a1a1aa] font-semibold">
                    {wf.stepsCount || wf.steps.length} nodes
                  </td>

                  <td className="py-3.5 px-4">
                    <span
                      className={`inline-flex items-center px-2 py-0.5 rounded-md text-[10px] font-bold border ${
                        wf.status === "PUBLISHED"
                          ? "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20"
                          : "bg-amber-500/10 text-amber-700 dark:text-amber-400 border-amber-500/20"
                      }`}
                    >
                      {wf.status === "PUBLISHED" ? "Live" : "Draft"}
                    </span>
                  </td>

                  <td className="py-3.5 px-4 text-right">
                    <WorkflowTableActions workflow={wf} />
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
