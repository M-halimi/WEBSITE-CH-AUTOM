// Simple in-memory rate limiter for lead submissions
const tracker = new Map<string, { count: number; expiresAt: number }>();

export function checkRateLimit(identifier: string, limit = 5, windowMs = 60 * 1000): { allowed: boolean; remaining: number } {
  const now = Date.now();
  const entry = tracker.get(identifier);

  if (!entry || now > entry.expiresAt) {
    tracker.set(identifier, { count: 1, expiresAt: now + windowMs });
    return { allowed: true, remaining: limit - 1 };
  }

  if (entry.count >= limit) {
    return { allowed: false, remaining: 0 };
  }

  entry.count += 1;
  return { allowed: true, remaining: limit - entry.count };
}

