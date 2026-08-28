import { prisma } from "@/lib/prisma";
import { SiteSettingsData, DEFAULT_SETTINGS } from "@/lib/settings-config";

export * from "@/lib/settings-config";

let cachedSettings: SiteSettingsData = { ...DEFAULT_SETTINGS };

export async function getSiteSettings(): Promise<SiteSettingsData> {
  try {
    if ((prisma as any).siteSetting) {
      const settingRecord = await (prisma as any).siteSetting.findUnique({
        where: { id: "default" },
      });

      if (settingRecord) {
        cachedSettings = {
          ...DEFAULT_SETTINGS,
          ...settingRecord,
        };
      }
    }
  } catch (err) {
    // Graceful fallback
  }

  return cachedSettings;
}

export async function updateSiteSettings(data: Partial<SiteSettingsData>): Promise<SiteSettingsData> {
  cachedSettings = {
    ...cachedSettings,
    ...data,
  };

  try {
    if ((prisma as any).siteSetting) {
      await (prisma as any).siteSetting.upsert({
        where: { id: "default" },
        update: cachedSettings,
        create: { id: "default", ...cachedSettings },
      });
    }
  } catch (err) {
    console.error("Could not persist siteSetting in DB, updated in-memory:", err);
  }

  return cachedSettings;
}
