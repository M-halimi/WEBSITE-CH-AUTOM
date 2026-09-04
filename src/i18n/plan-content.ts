import type { Locale } from "@/i18n/config";
import type { PlanData } from "@/lib/ensurePlans";

const localized = {
  en: {
    starter: { name: "Basic", tagline: "For small businesses beginning their automation journey.", features: ["1 active workflow request", "WhatsApp and commerce integration", "Standard setup support", "Ongoing monitoring", "Email consultation"] },
    business: { name: "Professional", tagline: "For growing businesses scaling sales and customer support.", features: ["5 active workflow requests", "AI customer support integration", "WhatsApp Cloud API and lead ads", "Priority setup support", "Monthly workflow review", "Dedicated engineer support"] },
    pro: { name: "Enterprise", tagline: "For high-volume teams needing custom automation capacity.", features: ["Unlimited workflow requests", "Multi-agent AI integrations", "Custom ERP and database integration", "Priority support queue", "Full code ownership", "Custom service-level agreement"] },
  },
  ar: {
    starter: { name: "الأساسية", tagline: "للشركات الصغيرة التي تبدأ رحلة الأتمتة.", features: ["طلب سير عمل نشط واحد", "تكامل واتساب والتجارة", "دعم إعداد قياسي", "مراقبة مستمرة", "استشارة عبر البريد"] },
    business: { name: "الاحترافية", tagline: "للشركات النامية التي توسع المبيعات ودعم العملاء.", features: ["5 طلبات سير عمل نشطة", "تكامل دعم العملاء بالذكاء الاصطناعي", "واجهة واتساب السحابية وإعلانات العملاء المحتملين", "دعم إعداد بأولوية", "مراجعة شهرية لسير العمل", "دعم مهندس مخصص"] },
    pro: { name: "المؤسسات", tagline: "للفرق ذات الحجم الكبير التي تحتاج قدرة أتمتة مخصصة.", features: ["طلبات سير عمل غير محدودة", "تكاملات ذكاء اصطناعي متعددة الوكلاء", "تكامل مخصص مع ERP وقواعد البيانات", "قائمة دعم ذات أولوية", "ملكية كاملة للكود", "اتفاقية مستوى خدمة مخصصة"] },
  },
} as const;

export function localizePlan(plan: PlanData, locale: Locale) {
  // English plan copy is admin-managed in the database. Arabic keeps the
  // curated translation for the built-in plan slugs.
  if (locale === "en") return plan;
  const content = localized[locale][plan.slug as keyof (typeof localized)[Locale]];
  return content ? { ...plan, ...content, features: [...content.features] } : plan;
}
