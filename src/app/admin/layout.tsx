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
    <div className="min-h-screen flex flex-col md:flex-row bg-black text-white">
      {/* Sidebar */}
      <aside className="w-full md:w-64 border-r border-[#232323] bg-[#161616] p-4 sm:p-6 flex flex-col justify-between shrink-0">
        <div className="space-y-6">
          <div className="flex items-center gap-2.5 px-2">
            <div className="h-8 w-8 rounded-[8px] bg-[#e50914] flex items-center justify-center text-white font-bold text-sm">
              <Zap className="h-4 w-4 fill-current" />
            </div>
            <div>
              <span className="font-bold text-sm tracking-tight block text-white uppercase">
                Admin Portal
              </span>
              <span className="text-[10px] text-[#808080]">
                AutoFlows Hub v1.0
              </span>
            </div>
          </div>

          <nav className="space-y-1 text-sm">
            <Link
              href="/admin"
              className="flex items-center gap-2.5 px-3 py-2.5 rounded-[8px] text-[#808080] hover:text-white hover:bg-[#232323] transition-colors font-medium text-xs"
            >
              <LayoutDashboard className="h-4 w-4 text-[#e50914]" />
              <span>Overview</span>
            </Link>

            <Link
              href="/admin/workflows"
              className="flex items-center gap-2.5 px-3 py-2.5 rounded-[8px] text-[#808080] hover:text-white hover:bg-[#232323] transition-colors font-medium text-xs"
            >
              <Layers className="h-4 w-4 text-[#e50914]" />
              <span>All Workflows</span>
            </Link>

            <Link
              href="/admin/workflows/new"
              className="flex items-center gap-2.5 px-3 py-2.5 rounded-[8px] text-[#808080] hover:text-white hover:bg-[#232323] transition-colors font-medium text-xs"
            >
              <PlusCircle className="h-4 w-4 text-[#e50914]" />
              <span>Create Workflow</span>
            </Link>

            <Link
              href="/admin/import"
              className="flex items-center gap-2.5 px-3 py-2.5 rounded-[8px] text-[#808080] hover:text-white hover:bg-[#232323] transition-colors font-medium text-xs"
            >
              <UploadCloud className="h-4 w-4 text-[#e50914]" />
              <span>Import n8n JSON</span>
            </Link>

            <Link
              href="/admin/requests"
              className="flex items-center gap-2.5 px-3 py-2.5 rounded-[8px] text-[#808080] hover:text-white hover:bg-[#232323] transition-colors font-medium text-xs"
            >
              <Users className="h-4 w-4 text-[#e50914]" />
              <span>Lead Requests</span>
            </Link>
          </nav>
        </div>

        <div className="pt-6 border-t border-[#232323] space-y-2">
          <Link href="/" target="_blank">
            <Button
              variant="ghost"
              size="sm"
              className="w-full justify-start text-xs text-[#808080] hover:text-white hover:bg-[#232323] gap-2 rounded-[8px]"
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
              className="w-full justify-start text-xs text-[#e50914] hover:bg-[#e50914]/10 hover:text-[#e50914] gap-2 rounded-[8px]"
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
