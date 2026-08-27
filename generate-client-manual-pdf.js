const PDFDocument = require("pdfkit");
const fs = require("fs");
const path = require("path");

const doc = new PDFDocument({
  size: "A4",
  margins: { top: 35, bottom: 35, left: 35, right: 35 },
});

const outputPath = path.join(__dirname, "Client_Training_and_User_Manual.pdf");
const stream = fs.createWriteStream(outputPath);
doc.pipe(stream);

// Helper styles
function drawHeader(title, subtitle) {
  doc.rect(35, 35, 525, 75).fill("#064e3b");

  doc
    .fillColor("#34d399")
    .fontSize(10)
    .font("Helvetica-Bold")
    .text("AUTOFLOWS HUB — CLIENT ONBOARDING & USER MANUAL", 50, 48);

  doc
    .fillColor("#ffffff")
    .fontSize(15)
    .font("Helvetica-Bold")
    .text(title, 50, 64);

  doc
    .fillColor("#cbd5e1")
    .fontSize(9.5)
    .font("Helvetica")
    .text(subtitle, 50, 88);

  doc.moveDown(2.5);
}

function drawSectionTitle(title, y) {
  doc
    .fillColor("#0f172a")
    .fontSize(12)
    .font("Helvetica-Bold")
    .text(title, 35, y);

  doc
    .strokeColor("#10b981")
    .lineWidth(2)
    .moveTo(35, y + 16)
    .lineTo(560, y + 16)
    .stroke();

  doc.moveDown(0.8);
}

function drawCard(
  x,
  y,
  w,
  h,
  title,
  content,
  bg = "#f8fafc",
  border = "#e2e8f0",
) {
  doc.rect(x, y, w, h).fillAndStroke(bg, border);

  doc
    .fillColor("#0f172a")
    .fontSize(10)
    .font("Helvetica-Bold")
    .text(title, x + 10, y + 8);

  doc
    .fillColor("#334155")
    .fontSize(8.5)
    .font("Helvetica")
    .text(content, x + 10, y + 23, { width: w - 20, lineGap: 2 });
}

// ================= PAGE 1 =================
drawHeader(
  "How to Operate Your Automation Marketplace (User Manual)",
  "Daily workflows: Login, Lead CRM management, Adding workflows & 1-click n8n import",
);

// 1. SYSTEM OVERVIEW
drawSectionTitle("1. What This Platform Does for Your Business", 125);

doc.rect(35, 148, 525, 45).fillAndStroke("#f0fdf4", "#86efac");

doc
  .fillColor("#065f46")
  .fontSize(9.5)
  .font("Helvetica-Bold")
  .text("Core Purpose:", 45, 155);

doc
  .fillColor("#047857")
  .fontSize(9)
  .font("Helvetica")
  .text(
    "AutoFlows Hub is your 24/7 digital agency storefront. Visitors explore proven business automations (WhatsApp, AI GPT-4o, E-Commerce, Invoicing), view step-by-step visual pipelines, and connect directly to your WhatsApp or submit contact briefs.",
    45,
    168,
    { width: 505, lineGap: 2 },
  );

// 2. STEP BY STEP DAILY WORKFLOWS
drawSectionTitle("2. Daily Operations & Step-by-Step Guide", 205);

drawCard(
  35,
  225,
  255,
  95,
  "Step 1: Admin Login (/login)",
  "Navigate to /login and enter your admin credentials.\nEmail: admin@workflows.com\nPassword: admin123456\nYou will access the central analytics dashboard.",
);

drawCard(
  305,
  225,
  255,
  95,
  "Step 2: Manage Leads CRM (/admin/requests)",
  "View incoming customer briefs. Click the green WhatsApp icon next to any lead to open a 1-click chat. Update status from NEW -> CONTACTED -> IN PROGRESS -> COMPLETED.",
);

drawCard(
  35,
  330,
  255,
  105,
  "Step 3: Create & Publish Workflows",
  "Go to /admin/workflows/new. Enter title, summary, category, platforms, and click '+ Add Step' to build visual triggers and actions. Set status to PUBLISHED to show it on your live catalog immediately.",
);

drawCard(
  305,
  330,
  255,
  105,
  "Step 4: 1-Click n8n / Make Import",
  "Go to /admin/import. Upload or paste any exported n8n JSON file. Click 'Parse & Preview Nodes'. The system creates a ready-to-edit draft workflow automatically without manual re-typing.",
);

// 3. SETTINGS & CONFIGURATION
drawSectionTitle("3. How to Update Your WhatsApp Number & Settings", 450);

doc.rect(35, 470, 525, 60).fillAndStroke("#f8fafc", "#cbd5e1");

doc
  .fillColor("#0f172a")
  .fontSize(9)
  .font("Helvetica-Bold")
  .text("WhatsApp Configuration (.env file):", 45, 478);
doc
  .fillColor("#334155")
  .fontSize(8.5)
  .font("Helvetica")
  .text(
    "To change where customer messages are sent, update NEXT_PUBLIC_WHATSAPP_NUMBER in your environment settings (e.g. +212600000000). Every 'Contact on WhatsApp' button across the site will immediately route to your new phone number.",
    45,
    493,
    { width: 505, lineGap: 2 },
  );

// 4. BUSINESS MODEL
drawSectionTitle("4. Monetization & Service Pricing Guide", 545);

doc.rect(35, 565, 525, 18).fill("#f1f5f9");
doc.fillColor("#0f172a").fontSize(8).font("Helvetica-Bold");
doc.text("Service Type", 45, 570);
doc.text("What is Delivered", 160, 570);
doc.text("Suggested Pricing", 430, 570);

const pricingItems = [
  {
    name: "Workflow Setup & Deploy",
    desc: "Setting up template on client n8n/WhatsApp Cloud account",
    price: "1,500 - 5,000 MAD",
  },
  {
    name: "Monthly Maintenance Retainer",
    desc: "Monitoring uptime, token refreshes, bug fixes",
    price: "500 - 1,500 MAD/mo",
  },
  {
    name: "Custom Tailored Build",
    desc: "Building custom complex multi-agent system",
    price: "5,000 - 25,000+ MAD",
  },
];

let pY = 586;
pricingItems.forEach((item) => {
  doc.rect(35, pY, 525, 20).fillAndStroke("#ffffff", "#f1f5f9");
  doc
    .fillColor("#1e293b")
    .fontSize(8)
    .font("Helvetica-Bold")
    .text(item.name, 45, pY + 5);
  doc
    .fillColor("#64748b")
    .fontSize(7.5)
    .font("Helvetica")
    .text(item.desc, 160, pY + 5, { width: 260 });
  doc
    .fillColor("#059669")
    .fontSize(8)
    .font("Helvetica-Bold")
    .text(item.price, 430, pY + 5);
  pY += 21;
});

// ================= PAGE 2 =================
doc.addPage();

drawHeader(
  "Client Presentation Script & Discovery Meeting Playbook",
  "Exact words, talking points & demo sequence to close deals on Google Meet or in-person",
);

// 5. WORD FOR WORD PITCH SCRIPT
drawSectionTitle("5. Word-for-Word Discovery Call Script", 125);

doc.rect(35, 145, 525, 125).fillAndStroke("#f8fafc", "#cbd5e1");

doc
  .fillColor("#1e293b")
  .fontSize(8.5)
  .font("Helvetica-Oblique")
  .text(
    `"Salam / Hello! This platform is designed to turn your business processes into automated revenue streams.

When prospects visit your site, they see ready solutions (WhatsApp auto-responders, cart recovery, AI support) with step-by-step visual flows that give instant credibility. They can reach out in one tap on WhatsApp or submit a form.

From your admin dashboard, you receive leads in real time, launch direct WhatsApp chats with one click, and can upload any n8n workflow file to add new services in seconds. Everything is automated to save you time and maximize conversion."`,
    45,
    155,
    { width: 505, lineGap: 3 },
  );

// 6. 5-MINUTE DEMO CHECKLIST
drawSectionTitle("6. 5-Minute Live Demo Checklist for Your Client", 285);

const checklist = [
  {
    title: "1. Homepage Tour",
    desc: "Show the modern hero banner, search bar, and department categories (WhatsApp, E-Commerce, CRM, AI, Finance).",
  },
  {
    title: "2. Workflow Catalog (/workflows)",
    desc: "Show live filters by Category, Difficulty, and Platform. Show that URL parameters update automatically.",
  },
  {
    title: "3. Flow Viewer & WhatsApp CTA",
    desc: "Open 'WhatsApp AI Lead Qualifier'. Scroll through the vertical timeline viewer and click 'Contact on WhatsApp' to show the pre-filled message.",
  },
  {
    title: "4. Submit a Test Lead",
    desc: "Click 'Get This Automation', fill the form, and trigger the confetti celebration.",
  },
  {
    title: "5. Admin Dashboard & Leads CRM",
    desc: "Login to /admin/requests, show the test lead, update status, and show 1-click WhatsApp message button.",
  },
  {
    title: "6. n8n Import Center (/admin/import)",
    desc: "Paste sample n8n JSON and click 'Parse & Preview' to demonstrate instant draft creation.",
  },
];

let checkY = 310;
checklist.forEach((c) => {
  doc.rect(40, checkY + 3, 5, 5).fill("#10b981");
  doc
    .fillColor("#0f172a")
    .fontSize(8.5)
    .font("Helvetica-Bold")
    .text(c.title, 52, checkY);
  doc
    .fillColor("#64748b")
    .fontSize(8)
    .font("Helvetica")
    .text(c.desc, 52, checkY + 11, { width: 500 });
  checkY += 32;
});

// 7. QUICK ACCESS & CREDENTIALS
drawSectionTitle("7. Portal Access & Quick Links", 515);

doc.rect(35, 540, 525, 75).fillAndStroke("#f1f5f9", "#e2e8f0");

doc.fillColor("#0f172a").fontSize(8.5).font("Helvetica-Bold");
doc.text("Local Website URL:", 45, 550);
doc.text("Workflow Catalog:", 45, 565);
doc.text("Admin Login Portal:", 45, 580);
doc.text("Default Login:", 45, 595);

doc.fillColor("#334155").fontSize(8.5).font("Helvetica");
doc.text("http://localhost:3000", 160, 550);
doc.text("http://localhost:3000/workflows", 160, 565);
doc.text("http://localhost:3000/login", 160, 580);
doc.text("admin@workflows.com / admin123456", 160, 595);

doc.end();

stream.on("finish", () => {
  console.log(
    "✅ Client training manual generated successfully at:",
    outputPath,
  );
});
