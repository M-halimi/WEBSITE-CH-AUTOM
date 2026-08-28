"use server";

import { revalidatePath } from "next/cache";
import { updateSiteSettings, SiteSettingsData } from "@/lib/settings";

export async function saveSiteSettings(formData: FormData) {
  try {
    const payload: Partial<SiteSettingsData> = {
      siteName: formData.get("siteName") as string,
      siteDescription: formData.get("siteDescription") as string,
      whatsappNumber: formData.get("whatsappNumber") as string,
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

