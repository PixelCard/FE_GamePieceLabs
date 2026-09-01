import { NextRequest, NextResponse } from "next/server";
import { SESSION_COOKIE_NAME } from "@/features/auth/server/auth-config";
import { getTokenSession } from "@/features/auth/server/auth-session-store";

export async function GET(request: NextRequest) {
  const sessionId = request.cookies.get(SESSION_COOKIE_NAME)?.value;
  if (!sessionId) {
    return NextResponse.json({ authenticated: false });
  }

  const session = getTokenSession(sessionId);
  if (!session) {
    return NextResponse.json({ authenticated: false });
  }

  return NextResponse.json({
    authenticated: true,
    displayName: session.displayName ?? null,
    email: session.email ?? null,
    role: session.role ?? [],
    hasRefreshToken: Boolean(session.refreshToken),
    expiresAt: session.expiresAt ?? null,
  });
}
