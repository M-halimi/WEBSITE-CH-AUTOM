"use server";

import { revalidatePath } from "next/cache";
import { updateSiteSettings, SiteSettingsData } from "@/lib/settings";
import { requireAdminSession } from "@/actions/authActions";

export async function saveSiteSettings(formData: FormData) {
  await requireAdminSession();
  try {
    const whatsappNumber = String(formData.get("whatsappNumber") || "").trim();
    if (!/^\+?[1-9]\d{7,14}$/.test(whatsappNumber)) {
      return { success: false, error: "Enter a valid WhatsApp number in international format." };
    }
    const payload: Partial<SiteSettingsData> = {
      siteName: formData.get("siteName") as string,
      siteDescription: formData.get("siteDescription") as string,
      whatsappNumber,
      defaultCurrency: formData.get("defaultCurrency") as string,
      heroBadge: formData.get("heroBadge") as string,
      heroTitle: formData.get("heroTitle") as string,
      heroSubtitle: formData.get("heroSubtitle") as string,
      ctaBadge: formData.get("ctaBadge") as string,
      ctaTitle: formData.get("ctaTitle") as string,
      ctaDescription: formData.get("ctaDescription") as string,
      ctaButtonText: formData.get("ctaButtonText") as string,
      ctaSecondaryText: formData.get("ctaSecondaryText") as string,
      footerCopyright: formData.get("footerCopyright") as string,
    };

    await updateSiteSettings(payload);

    revalidatePath("/");
    revalidatePath("/workflows");
    revalidatePath("/request");
    revalidatePath("/admin/settings");

    return { success: true, message: "Site settings updated successfully!" };
  } catch (error: any) {
    return { success: false, error: error.message || "Failed to update site settings." };
  }
}
