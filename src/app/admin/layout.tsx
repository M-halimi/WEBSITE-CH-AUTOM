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
  ShoppingBag
} from "lucide-react";
import { verifyAdminSession, adminLogout } from "@/actions/authActions";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/layout/ThemeToggle";

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
    <div className="min-h-screen flex flex-col md:flex-row bg-background text-foreground transition-colors duration-300">
      {/* Sidebar */}
      <aside className="w-full md:w-64 border-r border-border bg-card p-6 flex flex-col justify-between shrink-0">
        <div className="space-y-8">
          <div className="flex items-center justify-between gap-2 px-1">
            <Link href="/" className="flex items-center gap-2">
              <div className="h-8 w-8 rounded-full bg-[#ffd233] flex items-center justify-center text-black font-bold text-xs shadow-xs">
                ✦
              </div>
              <div className="flex flex-col">
                <span className="font-extrabold text-base tracking-tight text-foreground">
                  AutoFlows
                </span>
                <span className="text-[10px] text-muted-foreground font-semibold">Admin Portal</span>
              </div>
            </Link>
            <ThemeToggle />
          </div>

          <nav className="space-y-1 text-sm">
            <Link
              href="/admin"
              className="flex items-center gap-2.5 px-4 py-2.5 rounded-full text-muted-foreground hover:text-foreground hover:bg-muted transition-colors font-semibold text-xs"
            >
              <LayoutDashboard className="h-4 w-4 text-amber-600 dark:text-[#ffd233]" />
              <span>Overview</span>
            </Link>

            <Link
              href="/admin/workflows"
              className="flex items-center gap-2.5 px-4 py-2.5 rounded-full text-muted-foreground hover:text-foreground hover:bg-muted transition-colors font-semibold text-xs"
            >
              <Layers className="h-4 w-4 text-amber-600 dark:text-[#ffd233]" />
              <span>All Blueprints</span>
            </Link>

            <Link
              href="/admin/workflows/new"
              className="flex items-center gap-2.5 px-4 py-2.5 rounded-full text-muted-foreground hover:text-foreground hover:bg-muted transition-colors font-semibold text-xs"
            >
              <PlusCircle className="h-4 w-4 text-amber-600 dark:text-[#ffd233]" />
              <span>Create Blueprint</span>
            </Link>

            <Link
              href="/admin/import"
              className="flex items-center gap-2.5 px-4 py-2.5 rounded-full text-muted-foreground hover:text-foreground hover:bg-muted transition-colors font-semibold text-xs"
            >
              <UploadCloud className="h-4 w-4 text-amber-600 dark:text-[#ffd233]" />
              <span>Import n8n JSON</span>
            </Link>

            <Link
              href="/admin/requests"
              className="flex items-center gap-2.5 px-4 py-2.5 rounded-full text-muted-foreground hover:text-foreground hover:bg-muted transition-colors font-semibold text-xs"
            >
              <Users className="h-4 w-4 text-amber-600 dark:text-[#ffd233]" />
              <span>Lead Inquiries</span>
            </Link>
          </nav>
        </div>

        <div className="pt-6 border-t border-border space-y-2">
          <Link href="/" target="_blank">
            <Button
              variant="ghost"
              size="sm"
              className="w-full justify-start text-xs text-muted-foreground hover:text-foreground gap-2 rounded-full font-semibold"
            >
              <Globe className="h-4 w-4" />
              <span>Live Marketplace</span>
            </Button>
          </Link>

          <form action={adminLogout}>
            <Button
              type="submit"
              variant="ghost"
              size="sm"
              className="w-full justify-start text-xs text-red-500 hover:bg-red-500/10 hover:text-red-600 gap-2 rounded-full font-semibold"
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
