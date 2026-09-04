import Link from "next/link";
import { ArrowRight, CheckCircle2, MessageCircle, Sparkles } from "lucide-react";
import { getTranslator } from "@/i18n/server";
import { getSiteSettings } from "@/lib/settings";
import { generateWhatsAppLink } from "@/lib/whatsapp";
import { prisma } from "@/lib/prisma";
import { WorkflowCard } from "@/components/workflows/WorkflowCard";
import { getClientSession } from "@/actions/clientAuthActions";

export const dynamic = "force-dynamic";

export default async function HomePage() {
  const { locale, t } = getTranslator();
  const [settings, workflows, session] = await Promise.all([
    getSiteSettings(),
    prisma.workflow.findMany({
      where: { status: "PUBLISHED" },
      include: { category: true, platforms: { include: { platform: true } }, steps: true },
      orderBy: [{ featured: "desc" }, { createdAt: "desc" }],
      take: 6,
    }),
    getClientSession(),
  ]);
  const whatsappUrl = generateWhatsAppLink({ phoneNumber: settings.whatsappNumber, locale });
  const steps = [["home.step1Title", "home.step1Text"], ["home.step2Title", "home.step2Text"], ["home.step3Title", "home.step3Text"]] as const;
  return (
    <div>
      <section className="relative overflow-hidden px-4 py-20 sm:px-6 sm:py-28">
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top,rgba(255,210,51,.22),transparent_45%)]" />
        <div className="mx-auto max-w-4xl text-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-amber-500/30 bg-amber-500/10 px-4 py-2 text-xs font-black text-amber-700 dark:text-amber-300"><Sparkles className="h-4 w-4" />{t("home.eyebrow")}</span>
          <h1 className="mx-auto mt-7 max-w-4xl text-4xl font-black leading-tight tracking-tight sm:text-6xl">{t("home.title")}</h1>
          <p className="mx-auto mt-6 max-w-2xl text-base leading-7 text-muted-foreground sm:text-lg">{t("home.subtitle")}</p>
          <div className="mt-9 flex flex-col justify-center gap-3 sm:flex-row">
            <Link href="/workflows" className="inline-flex h-12 items-center justify-center gap-2 rounded-full bg-[#ffd233] px-7 text-sm font-black text-black hover:bg-[#f5c71a]">{t("home.browseWorkflows")}<ArrowRight className="rtl-flip h-4 w-4" /></Link>
            <Link href="/plans" className="inline-flex h-12 items-center justify-center rounded-full border border-border bg-card px-7 text-sm font-bold">{t("home.viewPlans")}</Link>
            <a href={whatsappUrl} target="_blank" rel="noreferrer" className="inline-flex h-12 items-center justify-center gap-2 rounded-full border border-border bg-card px-7 text-sm font-bold"><MessageCircle className="h-4 w-4 text-emerald-500" />{t("home.contact")}</a>
          </div>
        </div>
      </section>
      <section className="px-4 py-16 sm:px-6 sm:py-20">
        <div className="mx-auto max-w-6xl">
          <div className="mb-8 flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
            <div className="max-w-2xl">
              <p className="text-xs font-black uppercase tracking-wider text-amber-700 dark:text-amber-300">{t("home.workflowsEyebrow")}</p>
              <h2 className="mt-2 text-3xl font-black tracking-tight sm:text-4xl">{t("home.workflowsTitle")}</h2>
              <p className="mt-3 text-sm leading-6 text-muted-foreground">{t("home.workflowsSubtitle")}</p>
            </div>
            <Link href="/workflows" className="inline-flex items-center gap-2 text-sm font-black text-amber-700 dark:text-amber-300">{t("home.viewAllWorkflows")}<ArrowRight className="rtl-flip h-4 w-4" /></Link>
          </div>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {workflows.map((workflow, index) => (
              <WorkflowCard
                key={workflow.id}
                workflow={workflow}
                illustrationIndex={index}
                isAuthenticated={Boolean(session)}
                subscriptionState={session?.subscriptionState || "NONE"}
              />
            ))}
          </div>
        </div>
      </section>
      <section className="border-y border-border bg-card px-4 py-14 sm:px-6">
        <div className="mx-auto grid max-w-6xl gap-5 md:grid-cols-3">
          {steps.map(([title, text]) => <article key={title} className="rounded-2xl border border-border bg-background p-6"><CheckCircle2 className="h-6 w-6 text-emerald-500" /><h2 className="mt-4 text-lg font-black">{t(title)}</h2><p className="mt-2 text-sm leading-6 text-muted-foreground">{t(text)}</p></article>)}
        </div>
      </section>
    </div>
  );
}
