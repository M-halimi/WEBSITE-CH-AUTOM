import {
  Users,
  Mail,
  Phone,
  Calendar,
  MessageSquare,
  Building2,
  Sparkles
} from "lucide-react";
import { prisma } from "@/lib/prisma";
import { LeadStatusSelector } from "@/components/admin/LeadStatusSelector";
import { formatDate } from "@/lib/utils";

export const dynamic = "force-dynamic";

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
          <h1 className="text-xl sm:text-2xl font-black text-foreground dark:text-white tracking-tight flex items-center gap-2">
            <Users className="h-5 w-5 text-amber-600 dark:text-[#ffd233]" />
            Client Inquiries & CRM Leads
          </h1>
          <p className="text-xs text-muted-foreground dark:text-[#71717a] mt-0.5">
            Total <strong className="text-foreground dark:text-white">{leads.length}</strong> incoming leads. Track status, review requirements, and trigger WhatsApp follow-ups.
          </p>
        </div>
      </div>

      {leads.length > 0 ? (
        <div className="space-y-3.5">
          {leads.map((lead) => (
            <div
              key={lead.id}
              className="rounded-2xl border border-border dark:border-[#22222a] bg-card dark:bg-[#141418] p-5 sm:p-6 shadow-xs hover:border-[#ffd233]/40 transition-all space-y-4"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-border dark:border-[#22222a]">
                <div>
                  <div className="flex items-center gap-2 flex-wrap">
                    <h3 className="text-sm font-bold text-foreground dark:text-white">
                      {lead.name}
                    </h3>
                    {lead.company && (
                      <span className="inline-flex items-center gap-1 text-[11px] text-muted-foreground dark:text-[#a1a1aa] bg-muted dark:bg-[#1d1d26] border border-border dark:border-[#2a2a36] px-2.5 py-0.5 rounded-full font-medium">
                        <Building2 className="h-3 w-3 text-amber-600 dark:text-[#ffd233]" />
                        {lead.company}
                      </span>
                    )}
                  </div>
                  <div className="flex items-center gap-3 text-xs text-muted-foreground dark:text-[#71717a] mt-1.5 flex-wrap">
                    <span className="flex items-center gap-1 text-foreground dark:text-[#a1a1aa]">
                      <Mail className="h-3 w-3 text-muted-foreground dark:text-[#71717a]" /> {lead.email}
                    </span>
                    {lead.whatsapp && (
                      <span className="flex items-center gap-1 text-emerald-600 dark:text-emerald-400 font-semibold">
                        <Phone className="h-3 w-3 text-emerald-600 dark:text-emerald-400" /> {lead.whatsapp}
                      </span>
                    )}
                    <span className="flex items-center gap-1">
                      <Calendar className="h-3 w-3 text-muted-foreground dark:text-[#71717a]" />{" "}
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

              <div className="space-y-2 text-xs">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="font-bold text-muted-foreground dark:text-[#71717a]">
                    Target Blueprint:
                  </span>
                  {lead.workflow ? (
                    <span className="px-2.5 py-1 rounded-lg bg-muted dark:bg-[#1a1a22] border border-border dark:border-[#2a2a36] text-foreground dark:text-white text-xs font-semibold">
                      {lead.workflow.title}
                    </span>
                  ) : (
                    <span className="px-2.5 py-1 rounded-lg bg-[#ffd233]/20 dark:bg-[#ffd233]/10 border border-[#ffd233]/40 text-amber-800 dark:text-[#ffd233] text-xs font-bold">
                      Custom Bespoke Workflow
                    </span>
                  )}
                </div>

                {lead.message && (
                  <div className="p-3.5 rounded-xl bg-muted/50 dark:bg-[#1b1b22] border border-border dark:border-[#26262e] text-foreground dark:text-[#d4d4d8] text-xs leading-relaxed mt-2">
                    <strong className="text-foreground dark:text-white block mb-1">
                      Message & Requirements:
                    </strong>
                    {lead.message}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="rounded-2xl border border-dashed border-border dark:border-[#26262e] bg-card dark:bg-[#141418]/60 p-12 text-center max-w-md mx-auto space-y-3">
          <div className="mx-auto h-12 w-12 rounded-xl bg-muted dark:bg-[#1e1e26] border border-border dark:border-[#2a2a34] flex items-center justify-center text-amber-600 dark:text-[#ffd233]">
            <Users className="h-6 w-6" />
          </div>
          <h3 className="text-sm font-bold text-foreground dark:text-white">
            No inquiries received yet
          </h3>
          <p className="text-xs text-muted-foreground dark:text-[#71717a]">
            When visitors submit a lead form on workflow detail pages or the custom request page, their details will appear here.
          </p>
        </div>
      )}
    </div>
  );
}
