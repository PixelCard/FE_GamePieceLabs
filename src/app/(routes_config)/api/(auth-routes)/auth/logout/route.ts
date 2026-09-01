import { NextRequest, NextResponse } from "next/server";
import { removeTokenSession } from "@/features/auth/server/auth-session-store";
import {
  ACCESS_TOKEN_COOKIE_NAME,
  APP_URL,
  SESSION_COOKIE_NAME,
} from "@/features/auth/server/auth-config";

export async function POST(request: NextRequest) {
  const sessionId = request.cookies.get(SESSION_COOKIE_NAME)?.value;
  if (sessionId) {
    removeTokenSession(sessionId);
  }

  const response = NextResponse.json({ ok: true });
  response.cookies.delete(SESSION_COOKIE_NAME);
  response.cookies.delete(ACCESS_TOKEN_COOKIE_NAME);
  return response;
}

export async function GET(request: NextRequest) {
  const sessionId = request.cookies.get(SESSION_COOKIE_NAME)?.value;
  if (sessionId) {
    removeTokenSession(sessionId);
  }
  const response = NextResponse.redirect(APP_URL);
  response.cookies.delete(SESSION_COOKIE_NAME);
  response.cookies.delete(ACCESS_TOKEN_COOKIE_NAME);
  return response;
}
