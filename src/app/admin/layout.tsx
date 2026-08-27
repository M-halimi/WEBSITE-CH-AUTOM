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
<<<<<<< HEAD
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
=======
    <div className="min-h-screen flex flex-col md:flex-row bg-[#f6f6f6] text-[#222222]">
      {/* Sidebar */}
      <aside className="w-full md:w-64 border-r border-[#d6d6d6] bg-white p-4 sm:p-6 flex flex-col justify-between shrink-0">
        <div className="space-y-6">
          <div className="flex items-center gap-2.5 px-2">
            <Link href="/" className="group">
              <span className="etsy-wordmark text-2xl text-[#f1641e] font-serif">
                AutoFlows
              </span>
              <span className="block text-[10px] text-[#595959] font-sans font-medium">
                Admin Control Portal
              </span>
            </Link>
>>>>>>> 7ee9ca6f04322930ec29228c493ddb72ee250ce5
          </div>

          <nav className="space-y-1 text-sm">
            <Link
              href="/admin"
<<<<<<< HEAD
              className="flex items-center gap-2.5 px-4 py-2.5 rounded-full text-muted-foreground hover:text-foreground hover:bg-muted transition-colors font-semibold text-xs"
            >
              <LayoutDashboard className="h-4 w-4 text-amber-600 dark:text-[#ffd233]" />
=======
              className="flex items-center gap-2.5 px-3 py-2 rounded-full text-[#595959] hover:text-[#222222] hover:bg-[#f6f6f6] transition-colors font-medium text-xs"
            >
              <LayoutDashboard className="h-4 w-4 text-[#f1641e]" />
>>>>>>> 7ee9ca6f04322930ec29228c493ddb72ee250ce5
              <span>Overview</span>
            </Link>

            <Link
              href="/admin/workflows"
<<<<<<< HEAD
              className="flex items-center gap-2.5 px-4 py-2.5 rounded-full text-muted-foreground hover:text-foreground hover:bg-muted transition-colors font-semibold text-xs"
            >
              <Layers className="h-4 w-4 text-amber-600 dark:text-[#ffd233]" />
              <span>All Blueprints</span>
=======
              className="flex items-center gap-2.5 px-3 py-2 rounded-full text-[#595959] hover:text-[#222222] hover:bg-[#f6f6f6] transition-colors font-medium text-xs"
            >
              <Layers className="h-4 w-4 text-[#f1641e]" />
              <span>All Workflows</span>
>>>>>>> 7ee9ca6f04322930ec29228c493ddb72ee250ce5
            </Link>

            <Link
              href="/admin/workflows/new"
<<<<<<< HEAD
              className="flex items-center gap-2.5 px-4 py-2.5 rounded-full text-muted-foreground hover:text-foreground hover:bg-muted transition-colors font-semibold text-xs"
            >
              <PlusCircle className="h-4 w-4 text-amber-600 dark:text-[#ffd233]" />
              <span>Create Blueprint</span>
=======
              className="flex items-center gap-2.5 px-3 py-2 rounded-full text-[#595959] hover:text-[#222222] hover:bg-[#f6f6f6] transition-colors font-medium text-xs"
            >
              <PlusCircle className="h-4 w-4 text-[#a66523]" />
              <span>Create Workflow</span>
>>>>>>> 7ee9ca6f04322930ec29228c493ddb72ee250ce5
            </Link>

            <Link
              href="/admin/import"
<<<<<<< HEAD
              className="flex items-center gap-2.5 px-4 py-2.5 rounded-full text-muted-foreground hover:text-foreground hover:bg-muted transition-colors font-semibold text-xs"
            >
              <UploadCloud className="h-4 w-4 text-amber-600 dark:text-[#ffd233]" />
=======
              className="flex items-center gap-2.5 px-3 py-2 rounded-full text-[#595959] hover:text-[#222222] hover:bg-[#f6f6f6] transition-colors font-medium text-xs"
            >
              <UploadCloud className="h-4 w-4 text-[#258ddb]" />
>>>>>>> 7ee9ca6f04322930ec29228c493ddb72ee250ce5
              <span>Import n8n JSON</span>
            </Link>

            <Link
              href="/admin/requests"
<<<<<<< HEAD
              className="flex items-center gap-2.5 px-4 py-2.5 rounded-full text-muted-foreground hover:text-foreground hover:bg-muted transition-colors font-semibold text-xs"
            >
              <Users className="h-4 w-4 text-amber-600 dark:text-[#ffd233]" />
              <span>Lead Inquiries</span>
=======
              className="flex items-center gap-2.5 px-3 py-2 rounded-full text-[#595959] hover:text-[#222222] hover:bg-[#f6f6f6] transition-colors font-medium text-xs"
            >
              <Users className="h-4 w-4 text-[#258635]" />
              <span>Lead Requests</span>
>>>>>>> 7ee9ca6f04322930ec29228c493ddb72ee250ce5
            </Link>
          </nav>
        </div>

<<<<<<< HEAD
        <div className="pt-6 border-t border-border space-y-2">
=======
        <div className="pt-6 border-t border-[#e6e6e6] space-y-2">
>>>>>>> 7ee9ca6f04322930ec29228c493ddb72ee250ce5
          <Link href="/" target="_blank">
            <Button
              variant="ghost"
              size="sm"
<<<<<<< HEAD
              className="w-full justify-start text-xs text-muted-foreground hover:text-foreground gap-2 rounded-full font-semibold"
=======
              className="w-full justify-start text-xs text-[#595959] hover:text-[#222222] gap-2 rounded-full"
>>>>>>> 7ee9ca6f04322930ec29228c493ddb72ee250ce5
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
<<<<<<< HEAD
              className="w-full justify-start text-xs text-red-500 hover:bg-red-500/10 hover:text-red-600 gap-2 rounded-full font-semibold"
=======
              className="w-full justify-start text-xs text-[#b3261e] hover:bg-[#ffebee] hover:text-[#b3261e] gap-2 rounded-full"
>>>>>>> 7ee9ca6f04322930ec29228c493ddb72ee250ce5
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
