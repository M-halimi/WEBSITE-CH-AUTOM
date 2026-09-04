import crypto from "crypto";

function sessionSecret() {
  const secret = process.env.SESSION_SECRET || process.env.ADMIN_SECRET || process.env.ADMIN_PASSWORD;
  if (!secret && process.env.NODE_ENV === "production") {
    throw new Error("SESSION_SECRET must be configured in production.");
  }
  return secret || "autoflows-local-development-secret";
}

function signature(payload: string) {
  return crypto.createHmac("sha256", sessionSecret()).update(payload).digest("base64url");
}

export function createSessionToken(subject: string) {
  const payload = Buffer.from(subject, "utf8").toString("base64url");
  return `${payload}.${signature(payload)}`;
}

export function readSessionToken(token: string | undefined) {
  if (!token) return null;
  const [payload, providedSignature] = token.split(".");
  if (!payload || !providedSignature) return null;
  const expectedSignature = signature(payload);
  const provided = Buffer.from(providedSignature);
  const expected = Buffer.from(expectedSignature);
  if (provided.length !== expected.length || !crypto.timingSafeEqual(provided, expected)) return null;
  try {
    return Buffer.from(payload, "base64url").toString("utf8");
  } catch {
    return null;
  }
}

export const secureCookieOptions = {
  httpOnly: true,
  secure: process.env.NODE_ENV === "production",
  sameSite: "lax" as const,
  path: "/",
};
