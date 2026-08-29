import { prisma } from "@/lib/prisma";

export interface PlanData {
  id?: string;
  name: string;
  slug: string;
  tagline: string;
  price: number;
  currency: string;
  billingPeriod: string;
  features: string[];
  workflowLimit: number;
  supportLevel: string;
  isPopular: boolean;
  active: boolean;
}

export const DEFAULT_PLANS: PlanData[] = [
  {
    name: "STARTER",
    slug: "starter",
    tagline: "Ideal for small businesses starting their automation journey.",
    price: 49,
    currency: "USD",
    billingPeriod: "MONTHLY",
    workflowLimit: 1,
    supportLevel: "Basic Consultation & Email",
    isPopular: false,
    active: true,
    features: [
      "1 Active Production Workflow",
      "WhatsApp & Shopify Automated Sync",
      "Google Sheets / CRM Data Logger",
      "Standard Turnkey Setup (48h)",
      "Continuous Monitoring & Bug Fixes",
      "Workflow Consultation",
    ],
  },
  {
    name: "BUSINESS",
    slug: "business",
    tagline: "Best for growing businesses scaling sales, orders & customer support.",
    price: 149,
    currency: "USD",
    billingPeriod: "MONTHLY",
    workflowLimit: 5,
    supportLevel: "Priority WhatsApp & Engineer Support",
    isPopular: true,
    active: true,
    features: [
      "5 Active Production Workflows",
      "AI Customer Support Agent (GPT-4o)",
      "WhatsApp Cloud API & Meta Lead Ads",
      "Multi-App Pipeline Sync (n8n & Make)",
      "Priority 24-Hour Turnkey Delivery",
      "Workflow Optimization & Monthly Audit",
      "Dedicated Automation Engineer",
    ],
  },
  {
    name: "PRO",
    slug: "pro",
    tagline: "For high-volume commerce & brands needing enterprise automation power.",
    price: 399,
    currency: "USD",
    billingPeriod: "MONTHLY",
    workflowLimit: 999, // Unlimited
    supportLevel: "Dedicated Senior Automation Architect",
    isPopular: false,
    active: true,
    features: [
      "Unlimited Production Workflows",
      "Multi-Agent AI Pipelines (Claude & OpenAI)",
      "Custom ERP, Database & Stripe Invoicing",
      "Instant Priority VIP Queue",
      "100% Full Code Ownership & JSON Exports",
      "Dedicated Senior Automation Architect",
      "Custom SLA & 99.9% Uptime Guarantee",
    ],
  },
];

export async function getAllPlans(): Promise<PlanData[]> {
  try {
    if ((prisma as any).plan) {
      let plans = await (prisma as any).plan.findMany({
        where: { active: true },
        orderBy: { price: "asc" },
      });

      if (!plans || plans.length < DEFAULT_PLANS.length) {
        for (const p of DEFAULT_PLANS) {
          await (prisma as any).plan.upsert({
            where: { slug: p.slug },
            update: {
              name: p.name,
              tagline: p.tagline,
              price: p.price,
              currency: p.currency,
              billingPeriod: p.billingPeriod,
              features: JSON.stringify(p.features),
              workflowLimit: p.workflowLimit,
              supportLevel: p.supportLevel,
              isPopular: p.isPopular,
              active: true,
            },
            create: {
              name: p.name,
              slug: p.slug,
              tagline: p.tagline,
              price: p.price,
              currency: p.currency,
              billingPeriod: p.billingPeriod,
              features: JSON.stringify(p.features),
              workflowLimit: p.workflowLimit,
              supportLevel: p.supportLevel,
              isPopular: p.isPopular,
              active: true,
            },
          });
        }

        plans = await (prisma as any).plan.findMany({
          where: { active: true },
          orderBy: { price: "asc" },
        });
      }

      if (plans && plans.length > 0) {
        return plans.map((p: any) => ({
          ...p,
          features: typeof p.features === "string" ? JSON.parse(p.features) : p.features,
        }));
      }
    }
  } catch (err) {
    console.error("Could not fetch plans from DB, using defaults:", err);
  }

  return DEFAULT_PLANS;
}

