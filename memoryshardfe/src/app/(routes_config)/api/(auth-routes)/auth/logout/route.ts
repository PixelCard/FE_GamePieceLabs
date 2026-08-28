import { NextRequest, NextResponse } from "next/server";
import { removeTokenSession } from "@/features/auth/server/auth-session-store";

const APP_URL = process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3000";

export async function POST(request: NextRequest) {
  const sessionId = request.cookies.get("wm_session_id")?.value;
  if (sessionId) {
    removeTokenSession(sessionId);
  }

  const response = NextResponse.json({ ok: true });
  response.cookies.delete("wm_session_id");
  return response;
}

export async function GET(request: NextRequest) {
  const sessionId = request.cookies.get("wm_session_id")?.value;
  if (sessionId) {
    removeTokenSession(sessionId);
  }
  const response = NextResponse.redirect(APP_URL);
  response.cookies.delete("wm_session_id");
  return response;
}
