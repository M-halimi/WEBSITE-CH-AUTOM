import { updateUserRole } from "@/actions/adminSubscriptionActions";
import { prisma } from "@/lib/prisma";
import { getTranslator } from "@/i18n/server";

export const dynamic = "force-dynamic";

export default async function AdminUsersPage() {
  const { locale, t } = getTranslator();
  const users = await prisma.user.findMany({ include: { _count: { select: { subscriptions: true } } }, orderBy: { createdAt: "desc" } });
  return <div className="space-y-6"><header><h1 className="text-2xl font-black">{t("admin.users")}</h1><p className="mt-1 text-sm text-muted-foreground">{t("admin.manageUsers")}</p></header><div className="overflow-x-auto rounded-2xl border border-border bg-card"><table className="w-full text-start text-xs"><thead className="border-b border-border bg-muted/50"><tr><th className="p-4">{t("admin.users")}</th><th className="p-4">{t("admin.company")}</th><th className="p-4">{t("admin.subscriptions")}</th><th className="p-4">{t("admin.created")}</th><th className="p-4">{t("admin.role")}</th></tr></thead><tbody className="divide-y divide-border">{users.map((user) => <tr key={user.id}><td className="p-4"><strong className="block">{user.name || "—"}</strong><span className="text-muted-foreground">{user.email}</span></td><td className="p-4">{user.company || "—"}</td><td className="p-4">{user._count.subscriptions}</td><td className="p-4">{user.createdAt.toLocaleDateString(locale === "ar" ? "ar-MA" : "en-GB")}</td><td className="p-4"><form action={updateUserRole} className="flex gap-2"><input type="hidden" name="id" value={user.id} /><select name="role" defaultValue={user.role} className="h-9 rounded-lg border border-border bg-background px-2"><option>CLIENT</option><option>ADMIN</option></select><button className="rounded-lg bg-[#ffd233] px-3 font-bold text-black">{t("admin.save")}</button></form></td></tr>)}</tbody></table></div></div>;
}
