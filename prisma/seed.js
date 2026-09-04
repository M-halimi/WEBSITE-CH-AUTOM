const { PrismaClient } = require("@prisma/client");
const bcrypt = require("bcryptjs");

const prisma = new PrismaClient();

async function main() {
  console.log("🌱 Starting database seed...");

  // 1. Create Admin User
  const passwordHash = await bcrypt.hash("admin123456", 10);
  const admin = await prisma.user.upsert({
    where: { email: "admin@workflows.com" },
    update: {
      name: "Super Admin",
      passwordHash,
      role: "ADMIN",
    },
    create: {
      email: "admin@workflows.com",
      name: "Super Admin",
      passwordHash,
      role: "ADMIN",
    },
  });
  console.log(`✅ Admin created: ${admin.email}`);

  // Subscription plans are persisted up front; public plan reads never mutate data.
  const subscriptionPlans = [
    { name: "STARTER", slug: "starter", tagline: "Ideal for small businesses starting their automation journey.", price: 49, currency: "USD", billingPeriod: "MONTHLY", workflowLimit: 1, supportLevel: "Basic Consultation & Email", isPopular: false, features: ["1 Active Production Workflow", "WhatsApp & Shopify Automated Sync", "Standard Turnkey Setup (48h)"] },
    { name: "BUSINESS", slug: "business", tagline: "Best for growing businesses scaling sales, orders & customer support.", price: 149, currency: "USD", billingPeriod: "MONTHLY", workflowLimit: 5, supportLevel: "Priority WhatsApp & Engineer Support", isPopular: true, features: ["5 Active Production Workflows", "AI Customer Support Agent", "Priority 24-Hour Turnkey Delivery"] },
    { name: "PRO", slug: "pro", tagline: "For high-volume commerce teams needing enterprise automation power.", price: 399, currency: "USD", billingPeriod: "MONTHLY", workflowLimit: 999, supportLevel: "Dedicated Senior Automation Architect", isPopular: false, features: ["Unlimited Production Workflows", "Custom ERP and Database Integration", "Custom SLA"] },
  ];
  for (const plan of subscriptionPlans) {
    await prisma.plan.upsert({
      where: { slug: plan.slug },
      update: {},
      create: { ...plan, features: JSON.stringify(plan.features), active: true },
    });
  }

  // 2. Create Categories
  const categoriesData = [
    {
      name: "WhatsApp & Messaging",
      slug: "whatsapp-messaging",
      description:
        "Chatbots, automated notifications, customer service, and WhatsApp Cloud API pipelines.",
      icon: "MessageSquare",
      order: 1,
    },
    {
      name: "E-Commerce & Orders",
      slug: "ecommerce-orders",
      description:
        "Shopify, WooCommerce, COD verification, cart recovery, and fulfillment automations.",
      icon: "ShoppingCart",
      order: 2,
    },
    {
      name: "CRM & Lead Generation",
      slug: "crm-lead-generation",
      description:
        "Meta Lead Ads sync, Google Sheets pipelines, Notion CRM, and HubSpot auto-enrichment.",
      icon: "Users",
      order: 3,
    },
    {
      name: "AI & Smart Agents",
      slug: "ai-smart-agents",
      description:
        "OpenAI GPT-4o, Claude 3.5, document extraction, intelligent triage, and semantic search.",
      icon: "Bot",
      order: 4,
    },
    {
      name: "Finance & Invoicing",
      slug: "finance-invoicing",
      description:
        "Stripe, QuickBooks, automated PDF invoice generation, and expense tracking.",
      icon: "Receipt",
      order: 5,
    },
    {
      name: "Marketing & Social Media",
      slug: "marketing-social-media",
      description:
        "Automated content scheduling, YouTube repurposing, newsletter automation, and analytics alerts.",
      icon: "Share2",
      order: 6,
    },
  ];

  const categories = {};
  for (const cat of categoriesData) {
    const created = await prisma.category.upsert({
      where: { slug: cat.slug },
      update: cat,
      create: cat,
    });
    categories[cat.slug] = created;
  }
  console.log("✅ Categories seeded");

  // 3. Create Platforms
  const platformsData = [
    // Messaging & Chat
    { name: "WhatsApp Cloud API", slug: "whatsapp", icon: "MessageCircle", color: "emerald" },
    { name: "Telegram", slug: "telegram", icon: "Send", color: "sky" },
    { name: "Discord", slug: "discord", icon: "MessageSquare", color: "indigo" },
    { name: "Slack", slug: "slack", icon: "Hash", color: "purple" },
    { name: "Twilio SMS", slug: "twilio", icon: "Phone", color: "red" },
    { name: "Gmail", slug: "gmail", icon: "Mail", color: "red" },
    { name: "Microsoft Outlook", slug: "outlook", icon: "Mail", color: "blue" },
    { name: "Resend", slug: "resend", icon: "Mail", color: "zinc" },
    { name: "Mailchimp", slug: "mailchimp", icon: "Mail", color: "amber" },
    { name: "Klaviyo", slug: "klaviyo", icon: "Mail", color: "green" },

    // Automation & Workflow Engines
    { name: "n8n", slug: "n8n", icon: "Workflow", color: "orange" },
    { name: "Make.com", slug: "make", icon: "Zap", color: "purple" },
    { name: "Zapier", slug: "zapier", icon: "Zap", color: "orange" },
    { name: "Activepieces", slug: "activepieces", icon: "Zap", color: "pink" },
    { name: "Pipedream", slug: "pipedream", icon: "Zap", color: "green" },
    { name: "Microsoft Power Automate", slug: "power-automate", icon: "Workflow", color: "blue" },

    // AI & LLM Models
    { name: "OpenAI / GPT-4o", slug: "openai", icon: "Cpu", color: "teal" },
    { name: "Claude 3.5 (Anthropic)", slug: "claude", icon: "Cpu", color: "amber" },
    { name: "Google Gemini", slug: "gemini", icon: "Cpu", color: "blue" },
    { name: "DeepSeek AI", slug: "deepseek", icon: "Cpu", color: "sky" },
    { name: "Mistral AI", slug: "mistral", icon: "Cpu", color: "orange" },
    { name: "Perplexity AI", slug: "perplexity", icon: "Cpu", color: "teal" },
    { name: "Groq", slug: "groq", icon: "Cpu", color: "orange" },

    // E-Commerce & Payments
    { name: "Shopify", slug: "shopify", icon: "ShoppingBag", color: "lime" },
    { name: "WooCommerce", slug: "woocommerce", icon: "ShoppingBag", color: "purple" },
    { name: "YouCan", slug: "youcan", icon: "ShoppingBag", color: "blue" },
    { name: "Stripe", slug: "stripe", icon: "CreditCard", color: "indigo" },
    { name: "PayPal", slug: "paypal", icon: "CreditCard", color: "blue" },
    { name: "TikTok Shop", slug: "tiktok-shop", icon: "ShoppingBag", color: "pink" },

    // Databases & Workspace
    { name: "Google Sheets", slug: "google-sheets", icon: "Table", color: "green" },
    { name: "Notion", slug: "notion", icon: "FileText", color: "zinc" },
    { name: "Airtable", slug: "airtable", icon: "Grid", color: "yellow" },
    { name: "Supabase", slug: "supabase", icon: "Database", color: "emerald" },
    { name: "PostgreSQL", slug: "postgresql", icon: "Database", color: "blue" },
    { name: "MySQL", slug: "mysql", icon: "Database", color: "blue" },
    { name: "MongoDB", slug: "mongodb", icon: "Database", color: "green" },
    { name: "Google Drive", slug: "google-drive", icon: "Folder", color: "yellow" },

    // CRM & Advertising
    { name: "Meta Lead Ads", slug: "meta-ads", icon: "Target", color: "blue" },
    { name: "TikTok Ads", slug: "tiktok-ads", icon: "Target", color: "pink" },
    { name: "Google Ads", slug: "google-ads", icon: "Target", color: "yellow" },
    { name: "LinkedIn Ads", slug: "linkedin-ads", icon: "Target", color: "blue" },
    { name: "HubSpot", slug: "hubspot", icon: "Briefcase", color: "amber" },
    { name: "Salesforce", slug: "salesforce", icon: "Cloud", color: "blue" },
    { name: "Zoho CRM", slug: "zoho", icon: "Briefcase", color: "red" },

    // Developer & Webhooks
    { name: "GitHub", slug: "github", icon: "Code", color: "zinc" },
    { name: "Webhooks & REST API", slug: "webhooks", icon: "Radio", color: "amber" },
  ];

  const platforms = {};
  for (const plat of platformsData) {
    const created = await prisma.platform.upsert({
      where: { slug: plat.slug },
      update: plat,
      create: plat,
    });
    platforms[plat.slug] = created;
  }
  console.log("✅ Platforms seeded");

  // 4. Create Tags
  const tagsData = [
    "Lead Capture",
    "Instant Reply",
    "E-Commerce",
    "AI Agent",
    "PDF Generation",
    "Webhooks",
    "CRM Sync",
    "Cost Saver",
  ];
  const tags = {};
  for (const tagName of tagsData) {
    const slug = tagName.toLowerCase().replace(/\s+/g, "-");
    const created = await prisma.tag.upsert({
      where: { slug },
      update: { name: tagName },
      create: { name: tagName, slug },
    });
    tags[slug] = created;
  }
  console.log("✅ Tags seeded");

  // 5. Workflows
  const workflowsData = [
    {
      title: "WhatsApp AI Lead Qualifier & CRM Auto-Sync",
      slug: "whatsapp-ai-lead-qualifier",
      summary:
        "Automatically qualify incoming WhatsApp leads with AI (GPT-4o), extract customer requirements, and sync directly to Google Sheets & Notion CRM in real time.",
      description: `This high-converting automation transforms incoming WhatsApp messages into structured, qualified sales leads without human intervention.
      
### How it transforms your business:
- **Zero Response Delay**: Engages prospects in less than 3 seconds 24/7.
- **Intelligent Qualification**: Asks custom qualification questions (budget, timeline, service needs).
- **Auto-Sync to CRM**: Writes clean data to Google Sheets, Notion, or your custom CRM.
- **Team Dispatch**: Pings your sales rep via Telegram/WhatsApp when a high-value lead is identified.`,
      difficulty: "INTERMEDIATE",
      estimatedTime: "25 mins setup",
      stepsCount: 5,
      status: "PUBLISHED",
      views: 342,
      featured: true,
      price: "Free Template",
      imageUrl: "https://images.unsplash.com/photo-1611746872915-64382b5c76da?w=800&auto=format&fit=crop&q=80",
      categorySlug: "whatsapp-messaging",
      platformSlugs: ["whatsapp", "openai", "google-sheets", "n8n", "notion"],
      tagSlugs: ["lead-capture", "instant-reply", "ai-agent", "crm-sync"],
      triggersDescription:
        "Triggered whenever a customer sends a message or clicks a WhatsApp Click-to-Chat ad.",
      outcomesDescription:
        "Lead is scored, CRM is updated, and sales team receives an instant priority notification.",
      requirements: JSON.stringify([
        "WhatsApp Business Cloud API account",
        "OpenAI API Key (GPT-4o mini or GPT-4o)",
        "Google Sheets or Notion Workspace",
        "n8n or Make.com instance",
      ]),
      steps: [
        {
          order: 1,
          name: "Webhook Trigger",
          type: "TRIGGER",
          appName: "WhatsApp Cloud API",
          icon: "zap",
          description:
            "Listens for incoming messages, parses sender phone number, customer name, and text content.",
        },
        {
          order: 2,
          name: "AI Conversation & Intent Extraction",
          type: "ACTION",
          appName: "OpenAI GPT-4o",
          icon: "bot",
          description:
            "Analyzes message intent, extracts customer budget, urgency, and specific service requested.",
        },
        {
          order: 3,
          name: "Lead Qualification Router",
          type: "CONDITION",
          appName: "Router Node",
          icon: "git-branch",
          description:
            "Filters leads: High intent routes to sales fast-track; General queries receive instant FAQ response.",
        },
        {
          order: 4,
          name: "Sync to CRM & Spreadsheet",
          type: "ACTION",
          appName: "Google Sheets & Notion",
          icon: "database",
          description:
            "Creates a new row in Google Sheets and logs contact history in Notion pipeline.",
        },
        {
          order: 5,
          name: "Sales Alert Dispatch",
          type: "NOTIFICATION",
          appName: "Telegram & WhatsApp",
          icon: "bell",
          description:
            "Sends a direct WhatsApp / Telegram alert to the account executive with 1-click dial link.",
        },
      ],
    },
    {
      title: "Shopify Abandoned Cart Recovery via WhatsApp & Dynamic Discount",
      slug: "shopify-whatsapp-cart-recovery",
      summary:
        "Recover up to 28% of abandoned checkouts by sending high-converting WhatsApp recovery messages with auto-generated personalized discount codes.",
      description: `Traditional abandoned cart emails have low open rates (15-20%). WhatsApp delivers a 95%+ open rate and over 40% click-through rate.
      
### Key Capabilities:
- **Intelligent Timing**: Triggers exactly 45 minutes after checkout abandonment.
- **Dynamic Coupon**: Generates a single-use Shopify coupon code tied to the customer email.
- **Direct Checkout Link**: Pre-fills the cart with items and applied coupon for 1-tap purchase.
- **ROI Analytics**: Tracks recovered orders and revenue automatically.`,
      difficulty: "BEGINNER",
      estimatedTime: "15 mins setup",
      stepsCount: 4,
      status: "PUBLISHED",
      views: 521,
      featured: true,
      price: "1,500 MAD",
      imageUrl: "https://images.unsplash.com/photo-1556742049-0a67e55722c0?w=800&auto=format&fit=crop&q=80",
      categorySlug: "ecommerce-orders",
      platformSlugs: ["shopify", "whatsapp", "make"],
      tagSlugs: ["e-commerce", "instant-reply", "cost-saver"],
      triggersDescription:
        "Fires when a customer leaves checkout without completing purchase after 45 minutes.",
      outcomesDescription:
        "Automated recovery message sent, increasing e-commerce conversion rates by 20-30%.",
      requirements: JSON.stringify([
        "Shopify Store Admin API access",
        "WhatsApp Business Cloud API",
        "Make.com or n8n account",
      ]),
      steps: [
        {
          order: 1,
          name: "Checkout Abandoned Webhook",
          type: "TRIGGER",
          appName: "Shopify",
          icon: "shopping-cart",
          description:
            "Detects checkout abandonment event with customer phone, product list, and cart total.",
        },
        {
          order: 2,
          name: "Generate Unique 10% Voucher",
          type: "ACTION",
          appName: "Shopify Admin API",
          icon: "tag",
          description:
            "Creates an expiring single-use 10% discount code specifically for this customer.",
        },
        {
          order: 3,
          name: "Send WhatsApp Recovery Message",
          type: "ACTION",
          appName: "WhatsApp Cloud API",
          icon: "send",
          description:
            "Sends approved WhatsApp template with product image and pre-filled checkout link.",
        },
        {
          order: 4,
          name: "Conversion Verification & Logging",
          type: "TRANSFORM",
          appName: "Google Sheets",
          icon: "check-circle",
          description:
            "Monitors order status for 24h and records successful recoveries for attribution reporting.",
        },
      ],
    },
    {
      title: "AI Customer Support & Automated Ticket Escalation",
      slug: "ai-customer-support-ticket-escalator",
      summary:
        "AI-driven tier 1 customer support agent that answers FAQs using your Notion knowledge base and escalates complex inquiries to human agents in HubSpot.",
      description: `Provide instantaneous, accurate 24/7 support while freeing your human team from answering repetitive questions.
      
### Key Features:
- **Semantic Knowledge Search**: Searches your internal Notion docs to provide authoritative answers.
- **Sentiment & Urgency Analysis**: Flags angry customers or urgent technical issues immediately.
- **Smart Escalation**: Assigns human tickets to HubSpot with full conversation summary.`,
      difficulty: "ADVANCED",
      estimatedTime: "40 mins setup",
      stepsCount: 5,
      status: "PUBLISHED",
      views: 289,
      featured: true,
      price: "2,500 MAD",
      imageUrl: "https://images.unsplash.com/photo-1677442136019-21780efad99a?w=800&auto=format&fit=crop&q=80",
      categorySlug: "ai-smart-agents",
      platformSlugs: ["openai", "notion", "hubspot", "n8n"],
      tagSlugs: ["ai-agent", "crm-sync", "instant-reply"],
      triggersDescription:
        "Triggered on new incoming support request via email, web widget, or ticket form.",
      outcomesDescription:
        "80%+ of repetitive tickets answered instantly; complex issues neatly formatted and escalated.",
      requirements: JSON.stringify([
        "Notion Knowledge Base page",
        "OpenAI API Key (Embedding & GPT-4o)",
        "HubSpot Free/Starter CRM",
        "n8n Self-Hosted or Cloud",
      ]),
      steps: [
        {
          order: 1,
          name: "Support Request Ingestion",
          type: "TRIGGER",
          appName: "Webhook / Email",
          icon: "inbox",
          description:
            "Captures inbound support tickets, customer identity, and attachments.",
        },
        {
          order: 2,
          name: "Knowledge Base Vector Search",
          type: "TRANSFORM",
          appName: "Notion Knowledge Base",
          icon: "search",
          description:
            "Performs vector retrieval on company documentation to find relevant solution guides.",
        },
        {
          order: 3,
          name: "GPT-4o Answer Formulation",
          type: "ACTION",
          appName: "OpenAI GPT-4o",
          icon: "bot",
          description:
            "Generates a clear, polite answer with references and calculates a confidence score.",
        },
        {
          order: 4,
          name: "Confidence & Sentiment Gate",
          type: "CONDITION",
          appName: "Decision Router",
          icon: "git-branch",
          description:
            "If confidence > 85%, auto-replies to user. If lower or negative sentiment, proceeds to escalation.",
        },
        {
          order: 5,
          name: "HubSpot Ticket Creation",
          type: "ACTION",
          appName: "HubSpot CRM",
          icon: "life-buoy",
          description:
            "Creates high-priority ticket with AI summary and assigns to on-duty team member.",
        },
      ],
    },
    {
      title: "Stripe Payment to Automated PDF Invoice & WhatsApp Receipt",
      slug: "stripe-automated-invoice-whatsapp-receipt",
      summary:
        "Instantly create professional branded PDF invoices upon Stripe checkout success and deliver them to your customer via WhatsApp and Email.",
      description: `Eliminate manual invoicing forever. The moment a client pays via Stripe, this workflow generates a legal, tax-compliant PDF invoice and delivers it in seconds.
      
### What it does:
- **Real-time Stripe Webhook**: Captures charges, VAT/tax, currency, and line items.
- **Custom Branded PDF**: Generates high-resolution invoice with your logo, business registration, and payment status.
- **Multi-channel Delivery**: Sends PDF directly to customer WhatsApp and Email.
- **Accounting Archive**: Stores invoice file in Google Drive and updates bookkeeping log.`,
      difficulty: "BEGINNER",
      estimatedTime: "15 mins setup",
      stepsCount: 4,
      status: "PUBLISHED",
      views: 412,
      featured: false,
      price: "Free Template",
      imageUrl: "https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?w=800&auto=format&fit=crop&q=80",
      categorySlug: "finance-invoicing",
      platformSlugs: ["stripe", "whatsapp", "google-sheets", "make"],
      tagSlugs: ["pdf-generation", "e-commerce", "cost-saver"],
      triggersDescription:
        "Fires on Stripe `charge.succeeded` or `checkout.session.completed` event.",
      outcomesDescription:
        "Customer receives instant WhatsApp confirmation with branded PDF attachment.",
      requirements: JSON.stringify([
        "Stripe Account API keys",
        "HTML/PDF Generation service or template",
        "WhatsApp Business Cloud API",
        "Make.com / n8n",
      ]),
      steps: [
        {
          order: 1,
          name: "Stripe Payment Succeeded Event",
          type: "TRIGGER",
          appName: "Stripe Webhook",
          icon: "credit-card",
          description:
            "Catches successful payment event, parses billing address, phone, amount, and items.",
        },
        {
          order: 2,
          name: "HTML to PDF Invoice Generation",
          type: "TRANSFORM",
          appName: "PDF Generator",
          icon: "file-text",
          description:
            "Populates branded HTML invoice template and renders crisp downloadable PDF.",
        },
        {
          order: 3,
          name: "WhatsApp Media Message Delivery",
          type: "ACTION",
          appName: "WhatsApp Cloud API",
          icon: "send",
          description:
            "Uploads PDF invoice to WhatsApp media endpoint and sends direct receipt to payer.",
        },
        {
          order: 4,
          name: "Financial Bookkeeping Log",
          type: "ACTION",
          appName: "Google Sheets",
          icon: "table",
          description:
            "Appends transaction record with fee breakdown, tax collected, and drive backup URL.",
        },
      ],
    },
    {
      title: "Meta Lead Ads to Instant WhatsApp Dispatch & CRM Pipeline",
      slug: "meta-ads-to-instant-whatsapp-dispatch",
      summary:
        "Connect Facebook & Instagram Lead Ads to WhatsApp in under 30 seconds. Automatically assign leads to sales reps and send an instant catalog message.",
      description: `Lead response speed is the #1 factor in sales conversion. Contacting a lead within 5 minutes increases conversion rates by 391%.
      
### Workflow highlights:
- **Instant Meta Webhook**: Triggers the exact second a user submits a Facebook/Instagram form.
- **Round-Robin Assignment**: Distributes leads fairly among your active sales agents.
- **Instant Greeting**: Auto-sends an introductory WhatsApp message with brochure or calendar booking link.
- **CRM Sync**: Syncs lead data to Google Sheets & Notion.`,
      difficulty: "INTERMEDIATE",
      estimatedTime: "20 mins setup",
      stepsCount: 4,
      status: "PUBLISHED",
      views: 619,
      featured: true,
      price: "3,000 MAD",
      imageUrl: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&auto=format&fit=crop&q=80",
      categorySlug: "crm-lead-generation",
      platformSlugs: ["meta-ads", "whatsapp", "google-sheets", "n8n"],
      tagSlugs: ["lead-capture", "instant-reply", "crm-sync"],
      triggersDescription:
        "Triggered whenever a lead fills a Facebook or Instagram Instant Form.",
      outcomesDescription:
        "Lead contacted on WhatsApp in < 30 seconds, rep notified, and CRM updated.",
      requirements: JSON.stringify([
        "Meta Business Manager & Facebook Page Admin",
        "WhatsApp Business Cloud API",
        "Google Sheets or CRM",
        "n8n Webhook Endpoint",
      ]),
      steps: [
        {
          order: 1,
          name: "Meta Lead Ads Trigger",
          type: "TRIGGER",
          appName: "Meta Lead Ads",
          icon: "target",
          description:
            "Retrieves instant form submission payload including form fields and campaign attribution.",
        },
        {
          order: 2,
          name: "Data Normalization & CRM Log",
          type: "TRANSFORM",
          appName: "Google Sheets",
          icon: "database",
          description:
            "Cleans phone numbers into E.164 format and appends lead details to master CRM sheet.",
        },
        {
          order: 3,
          name: "Instant Customer Outreach",
          type: "ACTION",
          appName: "WhatsApp Cloud API",
          icon: "message-circle",
          description:
            "Dispatches personalized welcome message with PDF company profile or pricing guide.",
        },
        {
          order: 4,
          name: "Sales Rep Push Notification",
          type: "NOTIFICATION",
          appName: "Telegram / SMS",
          icon: "bell",
          description:
            "Alerts assigned sales agent with lead name, inquiry details, and direct call link.",
        },
      ],
    },
    {
      title:
        "YouTube Video to Multi-Platform Content Repurposer (LinkedIn + X)",
      slug: "youtube-to-linkedin-twitter-repurposer",
      summary:
        "Automatically extract audio transcripts from newly published YouTube videos, generate viral LinkedIn posts & Twitter threads using Claude/GPT-4o, and queue them in Notion.",
      description: `Turn 1 video into 10 pieces of high-performing social content in minutes.
      
### How it works:
- **YouTube RSS Monitoring**: Detects when a new video is published on your channel.
- **Audio Transcript Fetching**: Downloads YouTube captions or runs OpenAI Whisper.
- **AI Content Specialist**: Prompts GPT-4o with high-engagement formatting frameworks.
- **Draft Queue**: Saves formatted drafts in Notion for 1-click review and publishing.`,
      difficulty: "ADVANCED",
      estimatedTime: "30 mins setup",
      stepsCount: 4,
      status: "PUBLISHED",
      views: 198,
      featured: false,
      price: "1,800 MAD",
      imageUrl: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=800&auto=format&fit=crop&q=80",
      categorySlug: "marketing-social-media",
      platformSlugs: ["openai", "notion", "n8n"],
      tagSlugs: ["ai-agent", "cost-saver"],
      triggersDescription:
        "Fires automatically when a new video is uploaded to YouTube.",
      outcomesDescription:
        "Formatted LinkedIn posts and Twitter threads ready in Notion for review.",
      requirements: JSON.stringify([
        "YouTube Channel URL / RSS",
        "OpenAI API Key (GPT-4o)",
        "Notion Content Calendar Database",
        "n8n Workflow Engine",
      ]),
      steps: [
        {
          order: 1,
          name: "YouTube RSS Feed Trigger",
          type: "TRIGGER",
          appName: "YouTube RSS",
          icon: "video",
          description:
            "Monitors YouTube channel feed and fetches video ID, title, and description upon upload.",
        },
        {
          order: 2,
          name: "Transcript Extraction",
          type: "TRANSFORM",
          appName: "YouTube Transcript API",
          icon: "file-text",
          description:
            "Downloads full timestamped transcript text and cleans timestamps.",
        },
        {
          order: 3,
          name: "AI Viral Post Generation",
          type: "ACTION",
          appName: "OpenAI GPT-4o",
          icon: "sparkles",
          description:
            "Generates 2 LinkedIn thought-leadership posts and 1 engaging 5-tweet thread.",
        },
        {
          order: 4,
          name: "Notion Editorial Calendar Sync",
          type: "ACTION",
          appName: "Notion",
          icon: "calendar",
          description:
            "Creates calendar entries with copy, hashtags, and thumbnail links ready for approval.",
        },
      ],
    },
  ];

  for (const wf of workflowsData) {
    const { categorySlug, platformSlugs, tagSlugs, steps, ...wfData } = wf;

    // Delete existing if any for idempotency
    const existing = await prisma.workflow.findUnique({
      where: { slug: wfData.slug },
    });
    if (existing) {
      await prisma.workflow.delete({ where: { slug: wfData.slug } });
    }

    const createdWorkflow = await prisma.workflow.create({
      data: {
        ...wfData,
        category: {
          connect: { id: categories[categorySlug].id },
        },
        platforms: {
          create: platformSlugs.map((slug) => ({
            platform: { connect: { id: platforms[slug].id } },
          })),
        },
        tags: {
          create: tagSlugs.map((slug) => ({
            tag: { connect: { id: tags[slug].id } },
          })),
        },
        steps: {
          create: steps.map((s) => ({
            order: s.order,
            name: s.name,
            type: s.type,
            appName: s.appName,
            icon: s.icon,
            description: s.description,
          })),
        },
      },
    });

    console.log(`✅ Created workflow: ${createdWorkflow.title}`);
  }

  // 6. Seed a sample Lead Request
  const sampleWorkflow = await prisma.workflow.findFirst();
  if (sampleWorkflow) {
    await prisma.leadRequest.create({
      data: {
        name: "Yassine Mansouri",
        email: "yassine@growthagency.ma",
        whatsapp: "+212612345678",
        company: "Growth Media Maroc",
        message:
          "We need this WhatsApp AI Lead Qualifier set up for 3 client accounts with custom qualification questions.",
        status: "NEW",
        workflowId: sampleWorkflow.id,
      },
    });
    console.log("✅ Sample lead request created");
  }

  console.log("🎉 Seeding completed successfully!");
}

main()
  .catch((e) => {
    console.error("❌ Seeding failed:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
