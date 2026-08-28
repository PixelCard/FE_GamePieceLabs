import crypto from "node:crypto";

export function randomString(length = 64): string {
  return crypto.randomBytes(length).toString("base64url");
}

export function sha256Base64Url(input: string): string {
  return crypto.createHash("sha256").update(input).digest("base64url");
}
