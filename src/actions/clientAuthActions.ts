"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import bcrypt from "bcryptjs";
import crypto from "crypto";
import { prisma } from "@/lib/prisma";
import { getAllPlans } from "@/lib/ensurePlans";
import { createSessionToken, readSessionToken, secureCookieOptions } from "@/lib/session";
import { getPrimarySubscription, normalizeSubscriptionState } from "@/lib/subscriptions";
import { CLIENT_COOKIE_NAME, type ClientSessionUser } from "@/types/clientAuth";
import { adminLogin } from "@/actions/authActions";

function setClientSessionCookie(userId: string) {
  cookies().set(CLIENT_COOKIE_NAME, createSessionToken(`client:${userId}`), {
    ...secureCookieOptions,
    maxAge: 60 * 60 * 24 * 30,
  });
}

export async function clientRegister(formData: FormData) {
  const name = String(formData.get("name") || "").trim();
  const company = String(formData.get("company") || "").trim();
  const email = String(formData.get("email") || "").toLowerCase().trim();
  const phone = String(formData.get("phone") || "").trim();
  const password = String(formData.get("password") || "");
  const planSlug = String(formData.get("planSlug") || "").trim();
  if (!name || !email || !password) return { success: false, errorKey: "auth.error.required" as const };
  if (password.length < 8) return { success: false, errorKey: "auth.error.passwordLength" as const };

  try {
    if (await prisma.user.findUnique({ where: { email }, select: { id: true } })) {
      return { success: false, errorKey: "auth.error.accountExists" as const };
    }
    const user = await prisma.user.create({
      data: {
        email,
        name,
        passwordHash: await bcrypt.hash(password, 12),
        role: "CLIENT",
        company: company || name,
        phone: phone || null,
        country: "Morocco",
        clientProfile: {
          create: {
            businessName: company || name,
            customerContactMethods: phone ? "WhatsApp" : null,
            onboardingCompleted: true,
          },
        },
      },
    });

    if (planSlug) {
      const plans = await getAllPlans();
      const selectedPlan = plans.find((plan) => plan.slug === planSlug && plan.active);
      if (selectedPlan?.id) {
        const end = new Date();
        end.setMonth(end.getMonth() + 1);
        await prisma.subscription.create({
          data: {
            userId: user.id,
            planId: selectedPlan.id,
            status: "PENDING",
            billingPeriod: selectedPlan.billingPeriod || "MONTHLY",
            currentPeriodEnd: end,
            provider: "MANUAL",
          },
        });
      }
    }
    setClientSessionCookie(user.id);
    return { success: true, destination: planSlug ? "/subscription" : "/plans" };
  } catch (error) {
    console.error("Client registration error:", error);
    return { success: false, errorKey: "auth.error.generic" as const };
  }
}

export async function clientLogin(formData: FormData) {
  const email = String(formData.get("email") || "").toLowerCase().trim();
  const password = String(formData.get("password") || "");
  if (!email || !password) return { success: false, errorKey: "auth.error.required" as const };
  try {
    const user = await prisma.user.findUnique({
      where: { email },
      select: { id: true, passwordHash: true, role: true },
    });
    if (!user || !(await bcrypt.compare(password, user.passwordHash))) {
      return { success: false, errorKey: "auth.error.invalidCredentials" as const };
    }
    if (user.role === "ADMIN") {
      const result = await adminLogin(formData);
      return result.success
        ? { success: true, role: "ADMIN", destination: "/admin" }
        : { success: false, errorKey: result.errorKey };
    }
    setClientSessionCookie(user.id);
    const state = normalizeSubscriptionState(await getPrimarySubscription(user.id));
    return { success: true, role: "CLIENT", destination: state === "NONE" ? "/plans" : "/subscription" };
  } catch (error) {
    console.error("Client login error:", error);
    return { success: false, errorKey: "auth.error.generic" as const };
  }
}

export async function clientLogout() {
  cookies().set(CLIENT_COOKIE_NAME, "", { ...secureCookieOptions, maxAge: 0 });
  redirect("/login");
}

export async function getClientSession(): Promise<ClientSessionUser | null> {
  const subject = readSessionToken(cookies().get(CLIENT_COOKIE_NAME)?.value);
  if (!subject?.startsWith("client:")) return null;
  const userId = subject.slice("client:".length);
  try {
    const user = await prisma.user.findUnique({ where: { id: userId }, include: { clientProfile: true } });
    if (!user || user.role !== "CLIENT") return null;
    const subscription = await getPrimarySubscription(user.id);
    return {
      id: user.id,
      email: user.email,
      name: user.name,
      role: user.role,
      phone: user.phone,
      company: user.company || user.name,
      country: user.country,
      businessType: user.businessType,
      clientProfile: user.clientProfile,
      subscription,
      subscriptionState: normalizeSubscriptionState(subscription),
    };
  } catch (error) {
    console.error("Error fetching client session:", error);
    return null;
  }
}

export async function requireClientSession() {
  const session = await getClientSession();
  if (!session) throw new Error("Unauthorized.");
  return session;
}

export async function clientForgotPassword(email: string) {
  if (!email || !email.includes("@")) return { success: false, error: "Please provide a valid email address." };
  try {
    const user = await prisma.user.findUnique({ where: { email: email.toLowerCase().trim() } });
    if (!user) return { success: true, message: "If an account exists, reset instructions have been generated." };
    const resetToken = crypto.randomBytes(32).toString("hex");
    await prisma.user.update({ where: { id: user.id }, data: { resetToken, resetTokenExpiry: new Date(Date.now() + 60 * 60 * 1000) } });
    return { success: true, message: "Password reset instructions generated successfully.", resetToken: process.env.NODE_ENV === "production" ? undefined : resetToken };
  } catch {
    return { success: false, error: "Failed to process request." };
  }
}

export async function clientResetPassword(token: string, newPassword: string) {
  if (!token || newPassword.length < 8) return { success: false, error: "Password must be at least 8 characters." };
  try {
    const user = await prisma.user.findFirst({ where: { resetToken: token, resetTokenExpiry: { gt: new Date() } }, select: { id: true } });
    if (!user) return { success: false, error: "Invalid or expired password reset link." };
    await prisma.user.update({
      where: { id: user.id },
      data: { passwordHash: await bcrypt.hash(newPassword, 12), resetToken: null, resetTokenExpiry: null },
    });
    return { success: true, message: "Password updated successfully. You can now log in." };
  } catch {
    return { success: false, error: "Failed to reset password." };
  }
}

export async function updateClientProfile(formData: FormData) {
  const session = await getClientSession();
  if (!session) return { success: false, error: "Unauthorized." };
  const name = String(formData.get("name") || "").trim();
  const company = String(formData.get("company") || "").trim();
  const phone = String(formData.get("phone") || "").trim();
  try {
    await prisma.user.update({
      where: { id: session.id },
      data: {
        name,
        company: company || null,
        phone: phone || null,
        clientProfile: {
          upsert: {
            create: { businessName: company || name },
            update: { businessName: company || name },
          },
        },
      },
    });
    return { success: true, message: "Profile updated successfully." };
  } catch {
    return { success: false, error: "Failed to update profile." };
  }
}
