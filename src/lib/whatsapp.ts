import type { Locale } from "@/i18n/config";

function configuredNumber(number?: string) {
  return (number || process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "").replace(/[^0-9]/g, "");
}

function link(number: string | undefined, message: string) {
  return `https://wa.me/${configuredNumber(number)}?text=${encodeURIComponent(message)}`;
}

export function generateWhatsAppLink({
  phoneNumber,
  workflowTitle,
  workflowSlug,
  locale = "en",
}: {
  phoneNumber?: string;
  workflowTitle?: string;
  workflowSlug?: string;
  locale?: Locale;
}) {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";
  const message = workflowTitle
    ? locale === "ar"
      ? `مرحباً، أود معرفة المزيد عن سير العمل: ${workflowTitle}${workflowSlug ? `\n${siteUrl}/workflows/${workflowSlug}` : ""}`
      : `Hello, I would like to know more about this workflow: ${workflowTitle}${workflowSlug ? `\n${siteUrl}/workflows/${workflowSlug}` : ""}`
    : locale === "ar"
      ? "مرحباً، أحتاج إلى مساعدة في خدمات الأتمتة والاشتراك."
      : "Hello, I need help with automation services and my subscription.";
  return link(phoneNumber, message);
}

export function generateSubscriptionWhatsAppLink({
  phoneNumber,
  locale,
  userName,
  planName,
  status,
}: {
  phoneNumber?: string;
  locale: Locale;
  userName?: string | null;
  planName?: string | null;
  status?: string | null;
}) {
  const values = [
    userName ? `${locale === "ar" ? "الاسم" : "Name"}: ${userName}` : null,
    planName ? `${locale === "ar" ? "الباقة" : "Plan"}: ${planName}` : null,
    status ? `${locale === "ar" ? "الحالة" : "Status"}: ${status}` : null,
  ].filter(Boolean);
  const intro = locale === "ar"
    ? "مرحباً، أنا عميل وأحتاج إلى مساعدة في اشتراكي."
    : "Hello, I am a customer and I need help with my subscription.";
  return link(phoneNumber, [intro, ...values].join("\n"));
}

export function generateLeadWhatsAppLink({
  phoneNumber,
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
}) {
  const lines = [
    "New automation request via AutoFlows Hub",
    `Name: ${name}`,
    `Email: ${email}`,
    whatsapp ? `Phone: ${whatsapp}` : null,
    company ? `Company: ${company}` : null,
    workflowTitle ? `Workflow: ${workflowTitle}` : "Request: Custom automation",
    message ? `Notes: ${message}` : null,
  ].filter(Boolean) as string[];
  return link(phoneNumber, lines.join("\n"));
}
