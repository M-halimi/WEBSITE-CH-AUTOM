import { updatePlan } from "@/actions/adminSubscriptionActions";
import { prisma } from "@/lib/prisma";
import { getTranslator } from "@/i18n/server";

export const dynamic = "force-dynamic";

export default async function AdminPlansPage() {
  const { t } = getTranslator();
  const plans = await prisma.plan.findMany({ orderBy: { price: "asc" } });

  return (
    <div className="space-y-6">
      <header>
        <h1 className="text-2xl font-black">{t("admin.plans")}</h1>
        <p className="mt-1 text-sm text-muted-foreground">{t("admin.managePlans")}</p>
      </header>
      <div className="grid gap-5 xl:grid-cols-2">
        {plans.map((plan) => {
          let features: string[] = [];
          try { features = JSON.parse(plan.features); } catch { features = [plan.features]; }
          return (
            <form key={plan.id} action={updatePlan} className="space-y-4 rounded-2xl border border-border bg-card p-5">
              <input type="hidden" name="id" value={plan.id} />
              <div className="grid gap-4 sm:grid-cols-2">
                <Field label={t("admin.planName")} name="name" defaultValue={plan.name} required />
                <Field label={t("admin.planDescription")} name="tagline" defaultValue={plan.tagline || ""} required />
                <Field label={t("admin.price")} name="price" type="number" defaultValue={plan.price} min="0" step="0.01" required />
                <label className="block text-xs font-bold">{t("admin.currency")}<select name="currency" defaultValue={plan.currency} className="mt-2 h-10 w-full rounded-lg border border-border bg-background px-3"><option>USD</option><option>MAD</option><option>EUR</option></select></label>
                <label className="block text-xs font-bold">{t("admin.billingPeriod")}<select name="billingPeriod" defaultValue={plan.billingPeriod} className="mt-2 h-10 w-full rounded-lg border border-border bg-background px-3"><option value="MONTHLY">{t("common.month")}</option><option value="YEARLY">{t("common.year")}</option></select></label>
                <Field label={t("admin.workflowLimit")} name="workflowLimit" type="number" defaultValue={plan.workflowLimit} min="0" required />
                <Field label={t("admin.supportLevel")} name="supportLevel" defaultValue={plan.supportLevel} />
              </div>
              <label className="block text-xs font-bold">{t("admin.planFeatures")}<textarea name="features" required rows={6} defaultValue={features.join("\n")} className="mt-2 w-full rounded-lg border border-border bg-background p-3 text-sm" /></label>
              <div className="flex flex-wrap gap-5">
                <label className="flex items-center gap-2 text-xs font-bold"><input name="active" type="checkbox" defaultChecked={plan.active} />{t("admin.active")}</label>
                <label className="flex items-center gap-2 text-xs font-bold"><input name="isPopular" type="checkbox" defaultChecked={plan.isPopular} />{t("admin.popular")}</label>
              </div>
              <button className="h-10 w-full rounded-lg bg-[#ffd233] font-bold text-black">{t("admin.save")}</button>
            </form>
          );
        })}
      </div>
    </div>
  );
}

function Field({ label, name, defaultValue, type = "text", min, step, required }: { label: string; name: string; defaultValue: string | number; type?: string; min?: string; step?: string; required?: boolean }) {
  return <label className="block text-xs font-bold">{label}<input name={name} type={type} min={min} step={step} required={required} defaultValue={defaultValue} className="mt-2 h-10 w-full rounded-lg border border-border bg-background px-3" /></label>;
}
