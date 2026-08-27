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
          </div>

          <nav className="space-y-1 text-sm">
            <Link
              href="/admin"
              className="flex items-center gap-2.5 px-3 py-2 rounded-full text-[#595959] hover:text-[#222222] hover:bg-[#f6f6f6] transition-colors font-medium text-xs"
            >
              <LayoutDashboard className="h-4 w-4 text-[#f1641e]" />
              <span>Overview</span>
            </Link>

            <Link
              href="/admin/workflows"
              className="flex items-center gap-2.5 px-3 py-2 rounded-full text-[#595959] hover:text-[#222222] hover:bg-[#f6f6f6] transition-colors font-medium text-xs"
            >
              <Layers className="h-4 w-4 text-[#f1641e]" />
              <span>All Workflows</span>
            </Link>

            <Link
              href="/admin/workflows/new"
              className="flex items-center gap-2.5 px-3 py-2 rounded-full text-[#595959] hover:text-[#222222] hover:bg-[#f6f6f6] transition-colors font-medium text-xs"
            >
              <PlusCircle className="h-4 w-4 text-[#a66523]" />
              <span>Create Workflow</span>
            </Link>

            <Link
              href="/admin/import"
              className="flex items-center gap-2.5 px-3 py-2 rounded-full text-[#595959] hover:text-[#222222] hover:bg-[#f6f6f6] transition-colors font-medium text-xs"
            >
              <UploadCloud className="h-4 w-4 text-[#258ddb]" />
              <span>Import n8n JSON</span>
            </Link>

            <Link
              href="/admin/requests"
              className="flex items-center gap-2.5 px-3 py-2 rounded-full text-[#595959] hover:text-[#222222] hover:bg-[#f6f6f6] transition-colors font-medium text-xs"
            >
              <Users className="h-4 w-4 text-[#258635]" />
              <span>Lead Requests</span>
            </Link>
          </nav>
        </div>

        <div className="pt-6 border-t border-[#e6e6e6] space-y-2">
          <Link href="/" target="_blank">
            <Button
              variant="ghost"
              size="sm"
              className="w-full justify-start text-xs text-[#595959] hover:text-[#222222] gap-2 rounded-full"
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
              className="w-full justify-start text-xs text-[#b3261e] hover:bg-[#ffebee] hover:text-[#b3261e] gap-2 rounded-full"
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
