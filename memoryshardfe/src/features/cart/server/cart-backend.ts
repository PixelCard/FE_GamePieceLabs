process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";

import { NextRequest, NextResponse } from "next/server";

import { getTokenSession } from "@/features/auth/server/auth-session-store";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL ?? "https://localhost:44329";
const CART_REMOTE_BASE_URL = `${API_BASE_URL}/api/app/carts-application-services`;

function getAccessToken(request: NextRequest): string | null {
  const sessionId = request.cookies.get("wm_session_id")?.value;
  if (!sessionId) {
    return null;
  }

  const session = getTokenSession(sessionId);
  return session?.accessToken ?? null;
}

function buildUnauthorizedResponse() {
  return NextResponse.json(
    {
      error: {
        message: "Ban can dang nhap de su dung gio hang.",
      },
    },
    { status: 401 },
  );
}

export async function proxyCartRequestAsync(
  request: NextRequest,
  targetPath: string,
  init: RequestInit,
) {
  const accessToken = getAccessToken(request);
  if (!accessToken) {
    return buildUnauthorizedResponse();
  }

  const response = await fetch(`${CART_REMOTE_BASE_URL}${targetPath}`, {
    ...init,
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${accessToken}`,
      ...(init.headers ?? {}),
    },
    cache: "no-store",
  });

  const responseText = await response.text();
  const contentType = response.headers.get("content-type") ?? "application/json; charset=utf-8";

  return new NextResponse(responseText || null, {
    status: response.status,
    headers: {
      "Content-Type": contentType,
    },
  });
}   
