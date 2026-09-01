process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";

import { NextRequest, NextResponse } from "next/server";

import {
  ACCESS_TOKEN_COOKIE_NAME,
  createAccessTokenCookieOptions,
  SESSION_COOKIE_NAME,
} from "@/features/auth/server/auth-config";
import { getTokenSession } from "@/features/auth/server/auth-session-store";
import { refreshSessionTokens } from "@/features/auth/server/auth-token";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL ?? "https://localhost:44329";
const CART_REMOTE_BASE_URL = `${API_BASE_URL}/api/app/carts-application-services`;

type AccessTokenResolution =
  | { accessToken: string; source: "cookie"; shouldPersistCookie: false }
  | { accessToken: string; source: "session"; shouldPersistCookie: true }
  | { accessToken: null; source: "missing"; shouldPersistCookie: false };

function getAccessToken(request: NextRequest): AccessTokenResolution {
  const accessToken = request.cookies.get(ACCESS_TOKEN_COOKIE_NAME)?.value;
  if (accessToken) {
    return {
      accessToken,
      source: "cookie",
      shouldPersistCookie: false,
    };
  }

  const sessionId = request.cookies.get(SESSION_COOKIE_NAME)?.value;
  if (!sessionId) {
    return {
      accessToken: null,
      source: "missing",
      shouldPersistCookie: false,
    };
  }

  const session = getTokenSession(sessionId);
  if (!session?.accessToken) {
    return {
      accessToken: null,
      source: "missing",
      shouldPersistCookie: false,
    };
  }

  return {
    accessToken: session.accessToken,
    source: "session",
    shouldPersistCookie: true,
  };
}

async function fetchCartBackend(
  accessToken: string,
  targetPath: string,
  init: RequestInit
) {
  return fetch(`${CART_REMOTE_BASE_URL}${targetPath}`, {
    ...init,
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${accessToken}`,
      ...(init.headers ?? {}),
    },
    cache: "no-store",
  });
}

async function buildProxyResponse(response: Response) {
  const responseText = await response.text();
  const contentType =
    response.headers.get("content-type") ?? "application/json; charset=utf-8";

  return new NextResponse(responseText || null, {
    status: response.status,
    headers: {
      "Content-Type": contentType,
    },
  });
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
  const tokenResolution = getAccessToken(request);
  if (!tokenResolution.accessToken) {
    return buildUnauthorizedResponse();
  }

  let response = await fetchCartBackend(
    tokenResolution.accessToken,
    targetPath,
    init
  );

  if (response.status === 401) {
    const sessionId = request.cookies.get(SESSION_COOKIE_NAME)?.value;
    if (!sessionId) {
      return buildUnauthorizedResponse();
    }

    try {
      const refreshedSession = await refreshSessionTokens(sessionId);
      if (!refreshedSession?.accessToken) {
        return buildUnauthorizedResponse();
      }

      response = await fetchCartBackend(
        refreshedSession.accessToken,
        targetPath,
        init
      );

      const retryResponse = await buildProxyResponse(response);
      retryResponse.cookies.set(
        ACCESS_TOKEN_COOKIE_NAME,
        refreshedSession.accessToken,
        createAccessTokenCookieOptions(
          Math.max(
            60,
            Math.floor(((refreshedSession.expiresAt ?? Date.now()) - Date.now()) / 1000)
          )
        )
      );
      return retryResponse;
    } catch (error) {
      console.error("Failed to refresh cart access token:", error);
      return buildUnauthorizedResponse();
    }
  }

  const proxyResponse = await buildProxyResponse(response);
  if (tokenResolution.shouldPersistCookie) {
    proxyResponse.cookies.set(
      ACCESS_TOKEN_COOKIE_NAME,
      tokenResolution.accessToken,
      createAccessTokenCookieOptions()
    );
  }

  return proxyResponse;
}
