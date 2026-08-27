import {
  Users,
  Mail,
  Phone,
  Calendar,
  MessageSquare,
  Building2,
} from "lucide-react";
import { prisma } from "@/lib/prisma";
import { Badge } from "@/components/ui/badge";
import { LeadStatusSelector } from "@/components/admin/LeadStatusSelector";
import { formatDate } from "@/lib/utils";

export const revalidate = 0; // Dynamic fetch

export default async function AdminRequestsPage() {
  const leads = await prisma.leadRequest.findMany({
    include: {
      workflow: true,
    },
    orderBy: { createdAt: "desc" },
  });

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-foreground flex items-center gap-2">
            <Users className="h-6 w-6 text-amber-500" />
            Lead Requests & Inquiries CRM
          </h1>
          <p className="text-xs sm:text-sm text-muted-foreground mt-0.5">
            Total {leads.length} incoming leads. Update statuses and reach out
            via WhatsApp with 1 click.
          </p>
        </div>
      </div>

      {leads.length > 0 ? (
        <div className="space-y-4">
          {leads.map((lead) => (
            <div
              key={lead.id}
              className="rounded-2xl border border-border bg-card p-5 sm:p-6 shadow-sm hover:shadow-md transition-all space-y-4"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-border/60">
                <div>
                  <div className="flex items-center gap-2 flex-wrap">
                    <h3 className="text-base font-bold text-foreground">
                      {lead.name}
                    </h3>
                    {lead.company && (
                      <span className="inline-flex items-center gap-1 text-xs text-muted-foreground bg-muted px-2 py-0.5 rounded">
                        <Building2 className="h-3 w-3" />
                        {lead.company}
                      </span>
                    )}
                  </div>
                  <div className="flex items-center gap-3 text-xs text-muted-foreground mt-1 flex-wrap">
                    <span className="flex items-center gap-1">
                      <Mail className="h-3 w-3" /> {lead.email}
                    </span>
                    {lead.whatsapp && (
                      <span className="flex items-center gap-1 text-emerald-600 dark:text-emerald-400 font-medium">
                        <Phone className="h-3 w-3" /> {lead.whatsapp}
                      </span>
                    )}
                    <span className="flex items-center gap-1">
                      <Calendar className="h-3 w-3" />{" "}
                      {formatDate(lead.createdAt)}
                    </span>
                  </div>
                </div>

                <LeadStatusSelector
                  leadId={lead.id}
                  currentStatus={lead.status}
                  clientName={lead.name}
                  whatsapp={lead.whatsapp}
                  workflowTitle={lead.workflow?.title}
                />
              </div>

              <div className="space-y-1.5 text-xs">
                <div className="flex items-center gap-1.5">
                  <span className="font-semibold text-foreground">
                    Requested:
                  </span>
                  {lead.workflow ? (
                    <Badge variant="outline" className="text-xs bg-muted/40">
                      {lead.workflow.title}
                    </Badge>
                  ) : (
                    <Badge
                      variant="glow"
                      className="text-xs bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20"
                    >
                      Custom Bespoke Workflow
                    </Badge>
                  )}
                </div>

                {lead.message && (
                  <div className="p-3 rounded-xl bg-muted/40 border border-border/40 text-muted-foreground text-xs leading-relaxed mt-2">
                    <strong className="text-foreground block mb-1">
                      Message / Requirements:
                    </strong>
                    {lead.message}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="rounded-3xl border border-dashed border-border bg-card/40 p-12 text-center max-w-md mx-auto space-y-3">
          <div className="mx-auto h-12 w-12 rounded-full bg-muted flex items-center justify-center text-muted-foreground">
            <Users className="h-6 w-6" />
          </div>
          <h3 className="text-base font-bold text-foreground">
            No requests received yet
          </h3>
          <p className="text-xs text-muted-foreground">
            When visitors submit a lead form on workflow detail pages or the
            custom request page, their details will appear here.
          </p>
        </div>
      )}
    </div>
  );
}
