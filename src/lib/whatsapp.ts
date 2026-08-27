export function generateWhatsAppLink({
  phoneNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "+212625945061",
  workflowTitle,
  workflowSlug,
}: {
  phoneNumber?: string;
  workflowTitle?: string;
  workflowSlug?: string;
}): string {
  const cleanPhone = phoneNumber.replace(/[^0-9]/g, "");
  
  let message = "Salam / Hello! 👋 I am interested in your automation services.";
  if (workflowTitle) {
    const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";
    message = `Salam / Hello! 👋\n\nI am interested in this automation workflow:\n👉 *${workflowTitle}*\n${workflowSlug ? `Link: ${siteUrl}/workflows/${workflowSlug}\n` : ""}\nCould you provide more details on pricing and implementation?`;
  }
  
  return `https://wa.me/${cleanPhone}?text=${encodeURIComponent(message)}`;
}

export function generateLeadWhatsAppLink({
  phoneNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "+212625945061",
  name,
  email,
  whatsapp,
  company,
  message,
  workflowTitle,
}: {
  phoneNumber?: string;
  name: string;
  email: string;
  whatsapp?: string;
  company?: string;
  message?: string;
  workflowTitle?: string;
}): string {
  const cleanPhone = phoneNumber.replace(/[^0-9]/g, "");

  const lines = [
    `🚀 *New Automation Request via AutoFlows Hub*`,
    `━━━━━━━━━━━━━━━━━━━`,
    `👤 *Name:* ${name}`,
    `📧 *Email:* ${email}`,
    whatsapp ? `📱 *Phone / WA:* ${whatsapp}` : null,
    company ? `🏢 *Company:* ${company}` : null,
    workflowTitle ? `⚡ *Target Workflow:* ${workflowTitle}` : `⚡ *Request:* Custom Bespoke Automation`,
    message ? `📝 *Requirements / Notes:*\n${message}` : null,
    `━━━━━━━━━━━━━━━━━━━`,
    `Sent from AutoFlows Hub Marketplace`,
  ].filter(Boolean);

  const formattedMessage = lines.join("\n");
  return `https://wa.me/${cleanPhone}?text=${encodeURIComponent(formattedMessage)}`;
}
