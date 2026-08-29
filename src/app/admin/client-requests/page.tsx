import Link from "next/link";
import {
  Layers,
  Search,
  Filter,
  CheckCircle2,
  Clock,
  AlertTriangle,
  User,
  ArrowRight,
  Sparkles,
  Phone,
  MessageSquare,
  Building2
} from "lucide-react";
import { getAllAdminClientRequests } from "@/actions/adminClientRequestActions";
import { formatDate } from "@/lib/utils";

export const dynamic = "force-dynamic";

export default async function AdminClientRequestsPage({
  searchParams,
}: {
  searchParams?: { status?: string; q?: string };
}) {
  const statusFilter = searchParams?.status || "ALL";
  const searchQuery = searchParams?.q || "";

  const requests = await getAllAdminClientRequests(statusFilter, searchQuery);

  const statuses = [
    { id: "ALL", label: "All Requests" },
    { id: "PENDING_REVIEW", label: "Pending Review" },
    { id: "IN_PROGRESS", label: "In Progress" },
    { id: "TESTING", label: "Testing" },
    { id: "COMPLETED", label: "Completed" },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl sm:text-2xl font-black text-foreground dark:text-white tracking-tight flex items-center gap-2">
            <Layers className="h-5 w-5 text-amber-600 dark:text-[#ffd233]" />
            Client Workflow Requests CRM
          </h1>
          <p className="text-xs text-muted-foreground dark:text-[#71717a] mt-0.5">
            Review client submissions, assign automation developers, update project statuses, and message clients.
          </p>
        </div>

        <div className="flex items-center gap-2 text-xs font-bold">
          <span className="px-3 py-1.5 rounded-xl bg-card dark:bg-[#18181f] border border-border dark:border-[#26262e] text-foreground dark:text-white">
            Total Requests: <strong className="text-amber-700 dark:text-[#ffd233]">{requests.length}</strong>
          </span>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 text-xs no-scrollbar">
        {statuses.map((s) => {
          const active = statusFilter === s.id;
          return (
            <Link
              key={s.id}
              href={`/admin/client-requests?status=${s.id}${searchQuery ? `&q=${encodeURIComponent(searchQuery)}` : ""}`}
              className={`px-3.5 py-1.5 rounded-xl font-bold transition-all shrink-0 border ${
                active
                  ? "bg-[#ffd233] text-black border-[#ffd233] shadow-xs"
                  : "bg-card dark:bg-[#141418] text-muted-foreground border-border dark:border-[#22222a] hover:text-foreground"
              }`}
            >
              {s.label}
            </Link>
          );
        })}
      </div>

      {/* Requests Table / Cards */}
      {requests.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-border dark:border-[#26262e] bg-card dark:bg-[#141418] p-12 text-center max-w-md mx-auto space-y-3">
          <Layers className="h-8 w-8 mx-auto text-muted-foreground" />
          <h3 className="text-sm font-bold text-foreground dark:text-white">
            No client requests found
          </h3>
          <p className="text-xs text-muted-foreground">
            No client has submitted a workflow matching your filter criteria.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-3.5">
          {requests.map((req: any) => {
            let badgeClass = "bg-amber-500/10 text-amber-700 dark:text-amber-400 border-amber-500/30";
            if (req.status === "COMPLETED") badgeClass = "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/30";
            if (req.status === "IN_PROGRESS" || req.status === "TESTING") badgeClass = "bg-sky-500/10 text-sky-600 dark:text-sky-400 border-sky-500/30";

            return (
              <div
                key={req.id}
                className="p-5 rounded-2xl border border-border dark:border-[#22222a] bg-card dark:bg-[#141418] hover:border-[#ffd233]/40 transition-all flex flex-col md:flex-row md:items-center justify-between gap-4 shadow-xs"
              >
                <div className="space-y-2 flex-1">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold border ${badgeClass}`}>
                      {req.status.replace("_", " ")}
                    </span>
                    <span className="font-bold text-foreground dark:text-white text-sm">
                      {req.title}
                    </span>
                    <span className="text-[10px] text-muted-foreground font-mono">
                      (ID: {req.id.slice(0, 8)})
                    </span>
                  </div>

                  <p className="text-xs text-muted-foreground dark:text-[#8e8e93] line-clamp-1">
                    {req.problemDescription || req.desiredAutomationDesc || "No description provided."}
                  </p>

                  <div className="flex items-center gap-4 text-[11px] text-muted-foreground flex-wrap pt-1">
                    <span className="flex items-center gap-1 font-semibold text-foreground dark:text-white">
                      <User className="h-3 w-3 text-amber-600 dark:text-[#ffd233]" />
                      {req.user?.name || "Client"} ({req.businessName || "Company"})
                    </span>
                    <span>•</span>
                    <span>{req.steps?.length || 0} Steps</span>
                    <span>•</span>
                    <span>{req.integrations?.length || 0} Integrations</span>
                    <span>•</span>
                    <span className="font-bold text-amber-700 dark:text-[#ffd233]">
                      Plan: {req.subscription?.plan?.name || "Starter"}
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-3 shrink-0 self-end md:self-center">
                  <div className="text-right hidden sm:block">
                    <span className="text-xs font-bold text-foreground dark:text-white block">
                      {req.progress}% Done
                    </span>
                    <span className="text-[10px] text-muted-foreground">
                      {formatDate(req.createdAt)}
                    </span>
                  </div>

                  <Link
                    href={`/admin/client-requests/${req.id}`}
                    className="h-9 px-4 rounded-xl bg-[#ffd233] hover:bg-[#f5c71a] text-black font-extrabold text-xs inline-flex items-center gap-1.5 shadow-xs transition-all"
                  >
                    <span>Manage Request</span>
                    <ArrowRight className="h-3.5 w-3.5" />
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

