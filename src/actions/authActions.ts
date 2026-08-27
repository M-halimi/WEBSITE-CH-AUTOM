"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import bcrypt from "bcryptjs";
import { prisma } from "@/lib/prisma";

const ADMIN_COOKIE_NAME = "autoflows_admin_session";

export async function adminLogin(formData: FormData) {
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  if (!email || !password) {
    return { success: false, error: "Please enter both email and password." };
  }

  try {
    const user = await prisma.user.findUnique({
      where: { email: email.toLowerCase().trim() },
    });

    if (!user || user.role !== "ADMIN") {
      return { success: false, error: "Invalid credentials or unauthorized account." };
    }

    const isValid = await bcrypt.compare(password, user.passwordHash);
    if (!isValid) {
      return { success: false, error: "Invalid email or password." };
    }

    // Set secure auth cookie
    cookies().set(ADMIN_COOKIE_NAME, "admin_authenticated", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 60 * 60 * 24 * 7, // 7 days
      path: "/",
    });

    return { success: true };
  } catch (error) {
    console.error("Login error:", error);
    return { success: false, error: "Authentication failed. Please try again." };
  }
}

export async function adminLogout() {
  cookies().set(ADMIN_COOKIE_NAME, "", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: 0,
    path: "/",
  });
  redirect("/login");
}

export async function verifyAdminSession(): Promise<boolean> {
  const sessionCookie = cookies().get(ADMIN_COOKIE_NAME);
  return Boolean(sessionCookie && sessionCookie.value === "admin_authenticated");
}
