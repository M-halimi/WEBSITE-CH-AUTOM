import { prisma } from "@/lib/prisma";

export const DEFAULT_PLATFORMS = [
  // Messaging & Chat
  { name: "WhatsApp Cloud API", slug: "whatsapp", color: "emerald" },
  { name: "Telegram", slug: "telegram", color: "sky" },
  { name: "Discord", slug: "discord", color: "indigo" },
  { name: "Slack", slug: "slack", color: "purple" },
  { name: "Twilio SMS", slug: "twilio", color: "red" },
  { name: "Gmail", slug: "gmail", color: "red" },
  { name: "Microsoft Outlook", slug: "outlook", color: "blue" },
  { name: "Resend", slug: "resend", color: "zinc" },
  { name: "Mailchimp", slug: "mailchimp", color: "amber" },
  { name: "Klaviyo", slug: "klaviyo", color: "green" },

  // Automation & Workflow Engines
  { name: "n8n", slug: "n8n", color: "orange" },
  { name: "Make.com", slug: "make", color: "purple" },
  { name: "Zapier", slug: "zapier", color: "orange" },
  { name: "Activepieces", slug: "activepieces", color: "pink" },
  { name: "Pipedream", slug: "pipedream", color: "green" },
  { name: "Power Automate", slug: "power-automate", color: "blue" },

  // AI & LLM Models
  { name: "OpenAI / GPT-4o", slug: "openai", color: "teal" },
  { name: "Claude 3.5 (Anthropic)", slug: "claude", color: "amber" },
  { name: "Google Gemini", slug: "gemini", color: "blue" },
  { name: "DeepSeek AI", slug: "deepseek", color: "sky" },
  { name: "Mistral AI", slug: "mistral", color: "orange" },
  { name: "Perplexity AI", slug: "perplexity", color: "teal" },
  { name: "Groq", slug: "groq", color: "orange" },

  // E-Commerce & Payments
  { name: "Shopify", slug: "shopify", color: "lime" },
  { name: "WooCommerce", slug: "woocommerce", color: "purple" },
  { name: "YouCan", slug: "youcan", color: "blue" },
  { name: "Stripe", slug: "stripe", color: "indigo" },
  { name: "PayPal", slug: "paypal", color: "blue" },
  { name: "TikTok Shop", slug: "tiktok-shop", color: "pink" },

  // Databases & Workspace
  { name: "Google Sheets", slug: "google-sheets", color: "green" },
  { name: "Notion", slug: "notion", color: "zinc" },
  { name: "Airtable", slug: "airtable", color: "yellow" },
  { name: "Supabase", slug: "supabase", color: "emerald" },
  { name: "PostgreSQL", slug: "postgresql", color: "blue" },
  { name: "MySQL", slug: "mysql", color: "blue" },
  { name: "MongoDB", slug: "mongodb", color: "green" },
  { name: "Google Drive", slug: "google-drive", color: "yellow" },

  // CRM & Advertising
  { name: "Meta Lead Ads", slug: "meta-ads", color: "blue" },
  { name: "TikTok Ads", slug: "tiktok-ads", color: "pink" },
  { name: "Google Ads", slug: "google-ads", color: "yellow" },
  { name: "LinkedIn Ads", slug: "linkedin-ads", color: "blue" },
  { name: "HubSpot", slug: "hubspot", color: "amber" },
  { name: "Salesforce", slug: "salesforce", color: "blue" },
  { name: "Zoho CRM", slug: "zoho", color: "red" },

  // Developer & Webhooks
  { name: "GitHub", slug: "github", color: "zinc" },
  { name: "Webhooks & REST API", slug: "webhooks", color: "amber" },
];

export async function getAllPlatforms() {
  try {
    let platforms = await prisma.platform.findMany({
      orderBy: { name: "asc" },
    });

    // If database has less platforms than our master default list, upsert missing ones
    if (platforms.length < DEFAULT_PLATFORMS.length) {
      for (const p of DEFAULT_PLATFORMS) {
        await prisma.platform.upsert({
          where: { slug: p.slug },
          update: { name: p.name, color: p.color },
          create: { name: p.name, slug: p.slug, color: p.color },
        });
      }
      platforms = await prisma.platform.findMany({
        orderBy: { name: "asc" },
      });
    }

    return platforms;
  } catch (err) {
    console.error("Error fetching/ensuring platforms:", err);
    return prisma.platform.findMany({ orderBy: { name: "asc" } });
  }
}

