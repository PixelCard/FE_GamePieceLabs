type TokenSession = {
  accessToken: string;
  refreshToken?: string;
  expiresAt?: number;
  displayName?: string;
  email?: string;
  role?: string[] | string;
};

const sessions = new Map<string, TokenSession>();

export function setTokenSession(sessionId: string, payload: TokenSession): void {
  sessions.set(sessionId, payload);
}

export function getTokenSession(sessionId: string): TokenSession | undefined {
  return sessions.get(sessionId);
}

export function removeTokenSession(sessionId: string): void {
  sessions.delete(sessionId);
}
