import Link from "next/link";
import {
  Layers,
  Users,
  Eye,
  CheckCircle2,
  ArrowUpRight,
  PlusCircle,
  UploadCloud,
  Clock,
  Sparkles,
  MessageSquare,
} from "lucide-react";
import { prisma } from "@/lib/prisma";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { formatDate } from "@/lib/utils";

export const revalidate = 0; // Dynamic server fetch

export default async function AdminDashboardPage() {
  const [
    totalWorkflows,
    publishedWorkflows,
    totalLeads,
    newLeadsCount,
    recentLeads,
    viewsAggregate,
  ] = await Promise.all([
    prisma.workflow.count(),
    prisma.workflow.count({ where: { status: "PUBLISHED" } }),
    prisma.leadRequest.count(),
    prisma.leadRequest.count({ where: { status: "NEW" } }),
    prisma.leadRequest.findMany({
      include: { workflow: true },
      orderBy: { createdAt: "desc" },
      take: 5,
    }),
    prisma.workflow.aggregate({
      _sum: { views: true },
    }),
  ]);

  const totalViews = viewsAggregate._sum.views || 0;

  return (
    <div className="space-y-8">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-foreground">
            Admin Dashboard
          </h1>
          <p className="text-xs sm:text-sm text-muted-foreground mt-0.5">
            Monitor workflow metrics, incoming client briefs, and platform
            activity.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Link href="/admin/workflows/new">
            <Button size="sm" className="gap-1.5 text-xs font-semibold">
              <PlusCircle className="h-4 w-4" />
              Add Workflow
            </Button>
          </Link>
          <Link href="/admin/import">
            <Button
              variant="outline"
              size="sm"
              className="gap-1.5 text-xs font-semibold"
            >
              <UploadCloud className="h-4 w-4" />
              Import n8n
            </Button>
          </Link>
        </div>
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Metric 1 */}
        <div className="rounded-2xl border border-border bg-card p-5 shadow-sm">
          <div className="flex items-center justify-between text-muted-foreground mb-2">
            <span className="text-xs font-semibold uppercase tracking-wider">
              Total Workflows
            </span>
            <Layers className="h-4 w-4 text-primary" />
          </div>
          <div className="text-3xl font-extrabold text-foreground">
            {totalWorkflows}
          </div>
          <p className="text-[11px] text-muted-foreground mt-1">
            <strong className="text-emerald-500">{publishedWorkflows}</strong>{" "}
            published live
          </p>
        </div>

        {/* Metric 2 */}
        <div className="rounded-2xl border border-border bg-card p-5 shadow-sm">
          <div className="flex items-center justify-between text-muted-foreground mb-2">
            <span className="text-xs font-semibold uppercase tracking-wider">
              Total Leads
            </span>
            <Users className="h-4 w-4 text-amber-500" />
          </div>
          <div className="text-3xl font-extrabold text-foreground">
            {totalLeads}
          </div>
          <p className="text-[11px] text-muted-foreground mt-1">
            <strong className="text-amber-500">{newLeadsCount}</strong> new
            awaiting contact
          </p>
        </div>

        {/* Metric 3 */}
        <div className="rounded-2xl border border-border bg-card p-5 shadow-sm">
          <div className="flex items-center justify-between text-muted-foreground mb-2">
            <span className="text-xs font-semibold uppercase tracking-wider">
              Total Catalog Views
            </span>
            <Eye className="h-4 w-4 text-sky-500" />
          </div>
          <div className="text-3xl font-extrabold text-foreground">
            {totalViews}
          </div>
          <p className="text-[11px] text-muted-foreground mt-1">
            Workflow impressions
          </p>
        </div>

        {/* Metric 4 */}
        <div className="rounded-2xl border border-border bg-card p-5 shadow-sm">
          <div className="flex items-center justify-between text-muted-foreground mb-2">
            <span className="text-xs font-semibold uppercase tracking-wider">
              Conversion Rate
            </span>
            <Sparkles className="h-4 w-4 text-teal-500" />
          </div>
          <div className="text-3xl font-extrabold text-foreground">
            {totalViews > 0 ? ((totalLeads / totalViews) * 100).toFixed(1) : 0}%
          </div>
          <p className="text-[11px] text-muted-foreground mt-1">
            Visitors to lead inquiry
          </p>
        </div>
      </div>

      {/* Recent Leads Table */}
      <div className="rounded-2xl border border-border bg-card shadow-sm overflow-hidden">
        <div className="flex items-center justify-between p-5 border-b border-border">
          <div>
            <h2 className="text-base font-bold text-foreground">
              Recent Client Inquiries
            </h2>
            <p className="text-xs text-muted-foreground">
              Latest leads submitted via workflows & brief forms.
            </p>
          </div>
          <Link
            href="/admin/requests"
            className="text-xs font-semibold text-primary hover:underline flex items-center gap-1"
          >
            View All ({totalLeads}) <ArrowUpRight className="h-3.5 w-3.5" />
          </Link>
        </div>

        {recentLeads.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-muted/40 text-muted-foreground font-semibold uppercase tracking-wider border-b border-border">
                <tr>
                  <th className="py-3 px-4">Client Name</th>
                  <th className="py-3 px-4">Email / Phone</th>
                  <th className="py-3 px-4">Target Workflow</th>
                  <th className="py-3 px-4">Status</th>
                  <th className="py-3 px-4">Date</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {recentLeads.map((lead) => (
                  <tr
                    key={lead.id}
                    className="hover:bg-muted/30 transition-colors"
                  >
                    <td className="py-3.5 px-4 font-semibold text-foreground">
                      {lead.name}
                      {lead.company && (
                        <span className="block text-[11px] font-normal text-muted-foreground">
                          {lead.company}
                        </span>
                      )}
                    </td>
                    <td className="py-3.5 px-4 text-muted-foreground">
                      <div>{lead.email}</div>
                      {lead.whatsapp && (
                        <span className="text-[11px] text-emerald-600 dark:text-emerald-400 font-medium">
                          {lead.whatsapp}
                        </span>
                      )}
                    </td>
                    <td className="py-3.5 px-4 text-foreground">
                      {lead.workflow ? (
                        <span className="font-medium">
                          {lead.workflow.title}
                        </span>
                      ) : (
                        <span className="italic text-muted-foreground">
                          Custom Automation Brief
                        </span>
                      )}
                    </td>
                    <td className="py-3.5 px-4">
                      <Badge
                        variant={
                          lead.status === "NEW"
                            ? "warning"
                            : lead.status === "COMPLETED"
                              ? "success"
                              : "secondary"
                        }
                        className="text-[10px]"
                      >
                        {lead.status}
                      </Badge>
                    </td>
                    <td className="py-3.5 px-4 text-muted-foreground">
                      {formatDate(lead.createdAt)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="p-8 text-center text-muted-foreground text-xs">
            No incoming inquiries yet.
          </div>
        )}
      </div>
    </div>
  );
}
