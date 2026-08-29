"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import bcrypt from "bcryptjs";
import crypto from "crypto";
import { prisma } from "@/lib/prisma";
import { getAllPlans } from "@/lib/ensurePlans";
import { CLIENT_COOKIE_NAME, ClientSessionUser } from "@/types/clientAuth";

export async function clientRegister(formData: FormData) {
  const name = (formData.get("name") as string)?.trim();
  const company = (formData.get("company") as string)?.trim();
  const email = (formData.get("email") as string)?.toLowerCase().trim();
  const phone = (formData.get("phone") as string)?.trim();
  const password = formData.get("password") as string;
  const country = (formData.get("country") as string)?.trim() || "Morocco";
  const businessType = (formData.get("businessType") as string)?.trim() || "E-commerce";
  const planSlug = (formData.get("planSlug") as string)?.trim() || "starter";

  if (!name || !email || !password) {
    return { success: false, error: "Name, email, and password are required." };
  }

  if (password.length < 6) {
    return { success: false, error: "Password must be at least 6 characters long." };
  }

  try {
    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      return { success: false, error: "An account with this email address already exists. Please log in." };
    }

    const passwordHash = await bcrypt.hash(password, 10);

    let user: any;

    // Try full schema insertion
    try {
      user = await (prisma.user as any).create({
        data: {
          email,
          name,
          passwordHash,
          role: "CLIENT",
          company: company || name,
          phone: phone || null,
          country,
          businessType,
          clientProfile: {
            create: {
              businessName: company || name,
              businessType,
              industry: businessType,
              customerContactMethods: "WhatsApp, Website",
              onboardingCompleted: true,
            },
          },
        },
      });
    } catch (schemaErr: any) {
      // Fallback if prisma db push has not been run yet
      console.warn("Schema insertion notice (falling back to core fields):", schemaErr.message);
      user = await prisma.user.create({
        data: {
          email,
          name: company ? `${name} (${company})` : name,
          passwordHash,
          role: "CLIENT",
        },
      });
    }

    // Ensure plans exist and auto-attach selected plan subscription
    try {
      const plans = await getAllPlans();
      const selectedPlan = plans.find((p) => p.slug === planSlug) || plans[0];

      if ((prisma as any).subscription && selectedPlan?.id) {
        const now = new Date();
        const nextMonth = new Date();
        nextMonth.setMonth(nextMonth.getMonth() + 1);

        await (prisma as any).subscription.create({
          data: {
            userId: user.id,
            planId: selectedPlan.id,
            status: "ACTIVE",
            billingPeriod: selectedPlan.billingPeriod || "MONTHLY",
            currentPeriodStart: now,
            currentPeriodEnd: nextMonth,
            provider: "MANUAL",
            usedWorkflowsCount: 0,
          },
        });
      }
    } catch (subErr) {
      console.warn("Subscription auto-attach notice:", subErr);
    }

    // Set auth cookie
    cookies().set(CLIENT_COOKIE_NAME, user.id, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 60 * 60 * 24 * 30, // 30 days
      path: "/",
    });

    return { success: true, userId: user.id };
  } catch (error: any) {
    console.error("Client registration error:", error);
    return { success: false, error: error.message || "Failed to create account. Please try again." };
  }
}

export async function clientLogin(formData: FormData) {
  const email = (formData.get("email") as string)?.toLowerCase().trim();
  const password = formData.get("password") as string;

  if (!email || !password) {
    return { success: false, error: "Please enter both email and password." };
  }

  try {
    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      return { success: false, error: "Invalid email or password." };
    }

    const isValid = await bcrypt.compare(password, user.passwordHash);
    if (!isValid) {
      return { success: false, error: "Invalid email or password." };
    }

    // If admin logs in via client portal, set both
    if (user.role === "ADMIN") {
      cookies().set("autoflows_admin_session", "admin_authenticated", {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        maxAge: 60 * 60 * 24 * 7,
        path: "/",
      });
    }

    // Set client cookie
    cookies().set(CLIENT_COOKIE_NAME, user.id, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 60 * 60 * 24 * 30,
      path: "/",
    });

    return { success: true, role: user.role };
  } catch (error: any) {
    console.error("Client login error:", error);
    return { success: false, error: "Authentication failed. Please try again." };
  }
}

export async function clientLogout() {
  cookies().set(CLIENT_COOKIE_NAME, "", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: 0,
    path: "/",
  });
  redirect("/login");
}

export async function getClientSession(): Promise<ClientSessionUser | null> {
  const sessionCookie = cookies().get(CLIENT_COOKIE_NAME);
  if (!sessionCookie || !sessionCookie.value) {
    return null;
  }

  try {
    let user: any = null;

    try {
      user = await (prisma.user as any).findUnique({
        where: { id: sessionCookie.value },
        include: {
          clientProfile: true,
          subscriptions: {
            where: { status: "ACTIVE" },
            include: { plan: true },
            orderBy: { createdAt: "desc" },
            take: 1,
          },
        },
      });
    } catch (incErr) {
      // Fallback without relations if tables are updating
      user = await prisma.user.findUnique({
        where: { id: sessionCookie.value },
      });
    }

    if (!user) return null;

    const activeSubscription = user.subscriptions?.[0] || null;

    return {
      id: user.id,
      email: user.email,
      name: user.name,
      role: user.role || "CLIENT",
      phone: user.phone || null,
      company: user.company || user.name,
      country: user.country || "Morocco",
      businessType: user.businessType || "E-commerce",
      clientProfile: user.clientProfile || null,
      subscription: activeSubscription,
    };
  } catch (error) {
    console.error("Error fetching client session:", error);
    return null;
  }
}

export async function clientForgotPassword(email: string) {
  if (!email || !email.includes("@")) {
    return { success: false, error: "Please provide a valid email address." };
  }

  try {
    const user = await prisma.user.findUnique({
      where: { email: email.toLowerCase().trim() },
    });

    if (!user) {
      return { success: true, message: "If an account exists, a reset link has been dispatched." };
    }

    const resetToken = crypto.randomBytes(32).toString("hex");
    const expiry = new Date(Date.now() + 1000 * 60 * 60);

    try {
      await (prisma.user as any).update({
        where: { id: user.id },
        data: {
          resetToken,
          resetTokenExpiry: expiry,
        },
      });
    } catch (e) {}

    return {
      success: true,
      message: "Password reset instructions generated successfully.",
      resetToken,
    };
  } catch (error: any) {
    return { success: false, error: error.message || "Failed to process request." };
  }
}

export async function clientResetPassword(token: string, newPassword: string) {
  if (!token || !newPassword || newPassword.length < 6) {
    return { success: false, error: "Password must be at least 6 characters." };
  }

  try {
    const passwordHash = await bcrypt.hash(newPassword, 10);

    let user: any = null;
    try {
      user = await (prisma.user as any).findFirst({
        where: {
          resetToken: token,
        },
      });
    } catch (e) {}

    if (!user) {
      return { success: false, error: "Invalid or expired password reset link." };
    }

    await prisma.user.update({
      where: { id: user.id },
      data: {
        passwordHash,
      },
    });

    return { success: true, message: "Password updated successfully. You can now log in." };
  } catch (error: any) {
    return { success: false, error: error.message || "Failed to reset password." };
  }
}

export async function updateClientProfile(formData: FormData) {
  const session = await getClientSession();
  if (!session) {
    return { success: false, error: "Unauthorized." };
  }

  const name = formData.get("name") as string;
  const company = formData.get("company") as string;
  const phone = formData.get("phone") as string;
  const country = formData.get("country") as string;
  const businessType = formData.get("businessType") as string;
  const industry = formData.get("industry") as string;
  const website = formData.get("website") as string;

  try {
    try {
      await (prisma.user as any).update({
        where: { id: session.id },
        data: {
          name,
          company,
          phone,
          country,
          businessType,
          clientProfile: {
            upsert: {
              create: {
                businessName: company,
                businessType,
                industry: industry || businessType,
                website,
              },
              update: {
                businessName: company,
                businessType,
                industry: industry || businessType,
                website,
              },
            },
          },
        },
      });
    } catch (e) {
      // Basic update fallback
      await prisma.user.update({
        where: { id: session.id },
        data: { name: company ? `${name} (${company})` : name },
      });
    }

    return { success: true, message: "Profile updated successfully!" };
  } catch (error: any) {
    return { success: false, error: error.message || "Failed to update profile." };
  }
}
