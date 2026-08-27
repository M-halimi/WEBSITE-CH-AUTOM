import { redirect } from "next/navigation";
import Link from "next/link";
import {
  LayoutDashboard,
  Layers,
  PlusCircle,
  UploadCloud,
  Users,
  LogOut,
  Globe,
  ShieldCheck,
  Zap,
} from "lucide-react";
import { verifyAdminSession, adminLogout } from "@/actions/authActions";
import { Button } from "@/components/ui/button";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const isAuthenticated = await verifyAdminSession();

  if (!isAuthenticated) {
    redirect("/login");
  }

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-background">
      {/* Sidebar */}
      <aside className="w-full md:w-64 border-r border-border bg-card/60 p-4 sm:p-6 flex flex-col justify-between shrink-0">
        <div className="space-y-6">
          <div className="flex items-center gap-2.5 px-2">
            <div className="h-8 w-8 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center text-white shadow-sm">
              <ShieldCheck className="h-4 w-4" />
            </div>
            <div>
              <span className="font-bold text-sm tracking-tight block text-foreground">
                Admin Control
              </span>
              <span className="text-[10px] text-muted-foreground">
                AutoFlows Hub v1.0
              </span>
            </div>
          </div>

          <nav className="space-y-1 text-sm">
            <Link
              href="/admin"
              className="flex items-center gap-2.5 px-3 py-2 rounded-xl text-muted-foreground hover:text-foreground hover:bg-accent transition-colors font-medium text-xs"
            >
              <LayoutDashboard className="h-4 w-4 text-emerald-500" />
              <span>Overview</span>
            </Link>

            <Link
              href="/admin/workflows"
              className="flex items-center gap-2.5 px-3 py-2 rounded-xl text-muted-foreground hover:text-foreground hover:bg-accent transition-colors font-medium text-xs"
            >
              <Layers className="h-4 w-4 text-primary" />
              <span>All Workflows</span>
            </Link>

            <Link
              href="/admin/workflows/new"
              className="flex items-center gap-2.5 px-3 py-2 rounded-xl text-muted-foreground hover:text-foreground hover:bg-accent transition-colors font-medium text-xs"
            >
              <PlusCircle className="h-4 w-4 text-teal-500" />
              <span>Create Workflow</span>
            </Link>

            <Link
              href="/admin/import"
              className="flex items-center gap-2.5 px-3 py-2 rounded-xl text-muted-foreground hover:text-foreground hover:bg-accent transition-colors font-medium text-xs"
            >
              <UploadCloud className="h-4 w-4 text-purple-500" />
              <span>Import n8n JSON</span>
            </Link>

            <Link
              href="/admin/requests"
              className="flex items-center gap-2.5 px-3 py-2 rounded-xl text-muted-foreground hover:text-foreground hover:bg-accent transition-colors font-medium text-xs"
            >
              <Users className="h-4 w-4 text-amber-500" />
              <span>Lead Requests</span>
            </Link>
          </nav>
        </div>

        <div className="pt-6 border-t border-border/60 space-y-2">
          <Link href="/" target="_blank">
            <Button
              variant="ghost"
              size="sm"
              className="w-full justify-start text-xs text-muted-foreground hover:text-foreground gap-2"
            >
              <Globe className="h-4 w-4" />
              <span>Live Website</span>
            </Button>
          </Link>

          <form action={adminLogout}>
            <Button
              type="submit"
              variant="ghost"
              size="sm"
              className="w-full justify-start text-xs text-destructive hover:bg-destructive/10 hover:text-destructive gap-2"
            >
              <LogOut className="h-4 w-4" />
              <span>Sign Out</span>
            </Button>
          </form>
        </div>
      </aside>

      {/* Main Admin Content */}
      <main className="flex-1 p-4 sm:p-8 lg:p-10 max-w-7xl w-full">
        {children}
      </main>
    </div>
  );
}
