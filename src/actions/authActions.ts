"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import bcrypt from "bcryptjs";
import { prisma } from "@/lib/prisma";
import { createSessionToken, readSessionToken, secureCookieOptions } from "@/lib/session";

const ADMIN_COOKIE_NAME = "autoflows_admin_session";
const DEFAULT_ADMIN_EMAIL = "admin@workflows.com";

function setAdminSessionCookie(subject: string) {
  cookies().set(ADMIN_COOKIE_NAME, createSessionToken(`admin:${subject}`), {
    ...secureCookieOptions,
    maxAge: 60 * 60 * 24 * 7, // 7 days
  });
}

export async function adminLogin(formData: FormData) {
  const email = (formData.get("email") as string)?.toLowerCase().trim();
  const password = formData.get("password") as string;

  if (!email || !password) {
    return { success: false, errorKey: "auth.error.required" as const };
  }

  try {
    // ADMIN_PASSWORD is the source of truth for the configured admin account.
    // This also keeps admin access available when an old database contains a
    // stale password hash from an earlier seed.
    const configuredEmail = (process.env.ADMIN_EMAIL || DEFAULT_ADMIN_EMAIL)
      .toLowerCase()
      .trim();
    const configuredPassword = process.env.ADMIN_PASSWORD;

    if (
      configuredPassword &&
      email === configuredEmail &&
      password === configuredPassword
    ) {
      setAdminSessionCookie("configured");
      return { success: true };
    }

    const user = await prisma.user.findUnique({
      where: { email },
      // Keep authentication compatible while additive profile migrations are
      // being deployed; selecting the entire row would require every new
      // optional profile column to exist before anyone could sign in.
      select: {
        id: true,
        passwordHash: true,
        role: true,
      },
    });

    if (!user || user.role !== "ADMIN") {
      return { success: false, errorKey: "auth.error.invalidCredentials" as const };
    }

    const isValid = await bcrypt.compare(password, user.passwordHash);
    if (!isValid) {
      return { success: false, errorKey: "auth.error.invalidCredentials" as const };
    }

    setAdminSessionCookie(user.id);

    return { success: true };
  } catch (error) {
    console.error("Login error:", error);
    return { success: false, errorKey: "auth.error.generic" as const };
  }
}

export async function adminLogout() {
  cookies().set(ADMIN_COOKIE_NAME, "", {
    ...secureCookieOptions,
    maxAge: 0,
  });
  redirect("/login");
}

export async function verifyAdminSession(): Promise<boolean> {
  const subject = readSessionToken(cookies().get(ADMIN_COOKIE_NAME)?.value);
  if (!subject?.startsWith("admin:")) return false;
  const id = subject.slice("admin:".length);
  if (id === "configured") return Boolean(process.env.ADMIN_PASSWORD);
  const user = await prisma.user.findUnique({ where: { id }, select: { role: true } });
  return user?.role === "ADMIN";
}

export async function requireAdminSession() {
  if (!(await verifyAdminSession())) throw new Error("Unauthorized.");
}
