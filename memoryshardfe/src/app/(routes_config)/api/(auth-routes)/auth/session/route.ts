import { NextRequest, NextResponse } from "next/server";
import { getTokenSession } from "@/features/auth/server/auth-session-store";

export async function GET(request: NextRequest) {
  const sessionId = request.cookies.get("wm_session_id")?.value;
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
    hasRefreshToken: Boolean(session.refreshToken),
    expiresAt: session.expiresAt ?? null,
  });
}
