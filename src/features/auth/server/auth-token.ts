process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";

import {
  AUTH_SERVER_URL,
  CLIENT_ID,
} from "@/features/auth/server/auth-config";
import {
  getTokenSession,
  setTokenSession,
  type TokenSession,
} from "@/features/auth/server/auth-session-store";

type JwtPayload = Record<string, unknown>;

type TokenResponse = {
  access_token?: string;
  refresh_token?: string;
  expires_in?: number | string;
  error?: string;
  error_description?: string;
};

type AccessTokenProfile = {
  displayName: string;
  email?: string;
  role: string[];
};

function decodeJwtPayload(accessToken: string): JwtPayload {
  const payloadBase64 = accessToken.split(".")[1];
  if (!payloadBase64) {
    throw new Error("Access token payload is missing.");
  }

  return JSON.parse(Buffer.from(payloadBase64, "base64url").toString("utf-8")) as JwtPayload;
}

function extractRoles(payload: JwtPayload): string[] {
  const roleClaim = payload.role ?? payload["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"];
  if (Array.isArray(roleClaim)) {
    return roleClaim.filter((value): value is string => typeof value === "string");
  }

  return typeof roleClaim === "string" ? [roleClaim] : [];
}

export function extractAccessTokenProfile(accessToken: string): AccessTokenProfile {
  const payload = decodeJwtPayload(accessToken);
  const email = typeof payload.email === "string" ? payload.email : undefined;
  const uniqueName =
    typeof payload.unique_name === "string" ? payload.unique_name : undefined;
  const preferredUsername =
    typeof payload.preferred_username === "string"
      ? payload.preferred_username
      : undefined;

  return {
    displayName: uniqueName ?? preferredUsername ?? email ?? "Unknown User",
    email,
    role: extractRoles(payload),
  };
}

export function buildTokenSession(params: {
  accessToken: string;
  refreshToken?: string;
  expiresInSeconds?: number;
}): TokenSession {
  const profile = extractAccessTokenProfile(params.accessToken);

  return {
    accessToken: params.accessToken,
    refreshToken: params.refreshToken,
    expiresAt: Date.now() + (params.expiresInSeconds ?? 300) * 1000,
    displayName: profile.displayName,
    email: profile.email,
    role: profile.role,
  };
}

async function requestRefreshToken(refreshToken: string): Promise<TokenResponse> {
  const body = new URLSearchParams({
    grant_type: "refresh_token",
    client_id: CLIENT_ID,
    refresh_token: refreshToken,
  });

  const tokenResponse = await fetch(`${AUTH_SERVER_URL}/connect/token`, {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: body.toString(),
    cache: "no-store",
  });

  const tokenResult = (await tokenResponse.json()) as TokenResponse;
  if (!tokenResponse.ok) {
    const message = tokenResult.error_description ?? tokenResult.error ?? "Refresh token exchange failed.";
    throw new Error(message);
  }

  return tokenResult;
}

export async function refreshSessionTokens(sessionId: string): Promise<TokenSession | null> {
  const existingSession = getTokenSession(sessionId);
  if (!existingSession?.refreshToken) {
    return null;
  }

  const tokenResult = await requestRefreshToken(existingSession.refreshToken);
  const accessToken = tokenResult.access_token;
  if (!accessToken) {
    throw new Error("Refresh response is missing access_token.");
  }

  const refreshedSession = buildTokenSession({
    accessToken,
    refreshToken: tokenResult.refresh_token ?? existingSession.refreshToken,
    expiresInSeconds: Number(tokenResult.expires_in ?? 300),
  });

  setTokenSession(sessionId, refreshedSession);
  return refreshedSession;
}
