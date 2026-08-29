import Link from "next/link";
import {
  Zap,
  Check,
  Sparkles,
  ShieldCheck,
  ArrowRight,
  HelpCircle,
  Clock,
  Layers,
  Bot
} from "lucide-react";
import { getAllPlans } from "@/lib/ensurePlans";

export const dynamic = "force-dynamic";

export default async function PublicPricingPage() {
  const plans = await getAllPlans();

  return (
    <div className="py-12 sm:py-16 px-4 sm:px-6 lg:px-10 max-w-[1400px] mx-auto space-y-16">
      {/* 1. Header Hero */}
      <div className="text-center space-y-4 max-w-3xl mx-auto">
        <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full text-xs font-bold bg-[#ffd233] text-black shadow-xs">
          <Zap className="h-3.5 w-3.5 fill-current" />
          Turnkey Engineering Plans
        </span>
        <h1 className="text-3xl sm:text-5xl font-black text-foreground tracking-tight">
          Simple, Transparent Automation Pricing
        </h1>
        <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
          No coding or complex logic required. Choose a plan, explain your business process in our conversational wizard, and our engineers deliver your production system in 48 hours.
        </p>
      </div>

      {/* 2. Pricing Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch">
        {plans.map((plan) => (
          <div
            key={plan.slug}
            className={`rounded-3xl p-7 sm:p-8 flex flex-col justify-between space-y-8 relative transition-all duration-300 ${
              plan.isPopular
                ? "bg-card border-2 border-[#ffd233] shadow-2xl shadow-[#ffd233]/15 scale-105 z-10"
                : "bg-card border border-border shadow-md hover:border-[#ffd233]/50"
            }`}
          >
            {plan.isPopular && (
              <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-[#ffd233] text-black text-[10px] font-black tracking-wider uppercase shadow-md">
                ★ MOST POPULAR PLAN
              </div>
            )}

            <div className="space-y-6">
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <h3 className="text-xl font-black text-foreground uppercase tracking-wide">
                    {plan.name}
                  </h3>
                  <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-muted text-muted-foreground border border-border">
                    {plan.workflowLimit >= 900 ? "Unlimited" : `${plan.workflowLimit} Workflows`}
                  </span>
                </div>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  {plan.tagline}
                </p>
              </div>

              <div>
                <div className="flex items-baseline gap-1">
                  <span className="text-4xl sm:text-5xl font-black text-foreground">
                    ${plan.price}
                  </span>
                  <span className="text-xs text-muted-foreground font-semibold">
                    / month
                  </span>
                </div>
              </div>

              <div className="space-y-3 pt-4 border-t border-border">
                <span className="text-[11px] font-bold text-muted-foreground uppercase tracking-wider block">
                  Included Features:
                </span>
                <ul className="space-y-2.5 text-xs">
                  {plan.features.map((feat, idx) => (
                    <li key={idx} className="flex items-start gap-2.5 text-foreground/90">
                      <Check className="h-4 w-4 text-emerald-500 shrink-0 mt-0.5" />
                      <span className="leading-tight">{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="pt-4 border-t border-border">
              <Link
                href={`/register?plan=${plan.slug}`}
                className={`w-full h-12 rounded-2xl font-black text-xs inline-flex items-center justify-center gap-2 transition-all shadow-xs ${
                  plan.isPopular
                    ? "bg-[#ffd233] hover:bg-[#f5c71a] text-black shadow-lg shadow-[#ffd233]/25"
                    : "bg-muted hover:bg-muted/80 text-foreground border border-border"
                }`}
              >
                <span>Choose {plan.name}</span>
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        ))}
      </div>

      {/* 3. Feature Comparison Table */}
      <div className="rounded-3xl border border-border bg-card p-6 sm:p-10 space-y-6 shadow-sm">
        <div className="space-y-1">
          <h3 className="text-xl font-black text-foreground">
            Compare Plan Capabilities
          </h3>
          <p className="text-xs text-muted-foreground">
            Complete breakdown of workflow execution, AI models, and support SLAs.
          </p>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left">
            <thead>
              <tr className="border-b border-border text-muted-foreground uppercase font-bold text-[10px]">
                <th className="py-3 px-4">Feature</th>
                <th className="py-3 px-4">Starter ($49)</th>
                <th className="py-3 px-4">Business ($149)</th>
                <th className="py-3 px-4">Pro ($399)</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              <tr>
                <td className="py-3.5 px-4 font-bold text-foreground">Active Workflows</td>
                <td className="py-3.5 px-4 text-muted-foreground">1 Workflow</td>
                <td className="py-3.5 px-4 text-amber-700 dark:text-[#ffd233] font-bold">5 Workflows</td>
                <td className="py-3.5 px-4 text-emerald-600 font-bold">Unlimited</td>
              </tr>
              <tr>
                <td className="py-3.5 px-4 font-bold text-foreground">Turnkey Delivery SLA</td>
                <td className="py-3.5 px-4 text-muted-foreground">48 Hours</td>
                <td className="py-3.5 px-4 font-bold text-foreground">24 Hours (Priority)</td>
                <td className="py-3.5 px-4 text-emerald-600 font-bold">Instant VIP Queue</td>
              </tr>
              <tr>
                <td className="py-3.5 px-4 font-bold text-foreground">AI Customer Support Agents</td>
                <td className="py-3.5 px-4 text-muted-foreground">Standard Templates</td>
                <td className="py-3.5 px-4 font-bold text-foreground">GPT-4o Custom Agent</td>
                <td className="py-3.5 px-4 text-emerald-600 font-bold">Multi-Agent Systems</td>
              </tr>
              <tr>
                <td className="py-3.5 px-4 font-bold text-foreground">Code Ownership & Exports</td>
                <td className="py-3.5 px-4 font-bold text-emerald-600">✓ Included</td>
                <td className="py-3.5 px-4 font-bold text-emerald-600">✓ Included</td>
                <td className="py-3.5 px-4 font-bold text-emerald-600">✓ Included</td>
              </tr>
              <tr>
                <td className="py-3.5 px-4 font-bold text-foreground">Dedicated Engineer Support</td>
                <td className="py-3.5 px-4 text-muted-foreground">Email Support</td>
                <td className="py-3.5 px-4 font-bold text-foreground">WhatsApp Direct</td>
                <td className="py-3.5 px-4 text-emerald-600 font-bold">Senior Architect 1-on-1</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* 4. FAQ Section */}
      <div className="rounded-3xl border border-border bg-card p-6 sm:p-10 space-y-6">
        <div className="text-center space-y-2 max-w-xl mx-auto">
          <h3 className="text-xl sm:text-2xl font-black text-foreground">
            Frequently Asked Questions
          </h3>
          <p className="text-xs text-muted-foreground">
            Everything you need to know about our subscription and request delivery model.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4 text-xs">
          <div className="p-5 rounded-2xl bg-muted/30 border border-border space-y-2">
            <h4 className="font-bold text-foreground text-sm flex items-center gap-2">
              <HelpCircle className="h-4 w-4 text-amber-600 dark:text-[#ffd233]" />
              Do I need technical or coding knowledge?
            </h4>
            <p className="text-muted-foreground leading-relaxed">
              No! Our 8-step conversational wizard guides you in plain words. You only explain what you currently do manually, and our team builds the entire technical backend.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-muted/30 border border-border space-y-2">
            <h4 className="font-bold text-foreground text-sm flex items-center gap-2">
              <ShieldCheck className="h-4 w-4 text-emerald-500" />
              Do I own the workflow blueprints?
            </h4>
            <p className="text-muted-foreground leading-relaxed">
              Yes, 100%. All n8n workflow JSON blueprints and Make.com exports belong to you. You can run them on your own servers or our managed cloud.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-muted/30 border border-border space-y-2">
            <h4 className="font-bold text-foreground text-sm flex items-center gap-2">
              <Clock className="h-4 w-4 text-indigo-500" />
              How fast are workflows delivered?
            </h4>
            <p className="text-muted-foreground leading-relaxed">
              Standard requests are engineered, verified, and ready for deployment within 24 to 48 hours. Priority Business and Pro requests receive expedited 12–24h turnaround.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-muted/30 border border-border space-y-2">
            <h4 className="font-bold text-foreground text-sm flex items-center gap-2">
              <Zap className="h-4 w-4 text-amber-600 dark:text-[#ffd233]" />
              Can I upgrade or cancel at any time?
            </h4>
            <p className="text-muted-foreground leading-relaxed">
              Yes, you can upgrade your plan or cancel your membership with 1 click directly inside your client dashboard at any time.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

