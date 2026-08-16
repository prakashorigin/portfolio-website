import { createHmac, timingSafeEqual } from "node:crypto";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export const resumeSessionCookie = "resume_admin_session";
const sessionDurationSeconds = 60 * 60 * 12;

function getPassword() {
  return process.env.RESUME_ADMIN_PASSWORD;
}

function getSecret() {
  return process.env.RESUME_ADMIN_SECRET;
}

export function hasResumeAdminConfiguration() {
  return Boolean(getPassword() && getSecret());
}

function sign(value: string) {
  return createHmac("sha256", getSecret() ?? "").update(value).digest("base64url");
}

function safeEqual(left: string, right: string) {
  const leftBuffer = Buffer.from(left);
  const rightBuffer = Buffer.from(right);
  return (
    leftBuffer.length === rightBuffer.length &&
    timingSafeEqual(leftBuffer, rightBuffer)
  );
}

export function isCorrectResumePassword(password: string) {
  const expectedPassword = getPassword();
  return Boolean(expectedPassword && safeEqual(password, expectedPassword));
}

export function createResumeSession() {
  const expiresAt = Math.floor(Date.now() / 1000) + sessionDurationSeconds;
  const payload = String(expiresAt);
  return `${payload}.${sign(payload)}`;
}

export function isValidResumeSession(token: string | undefined) {
  if (!token || !getSecret()) return false;
  const [expiresAt, signature] = token.split(".");
  if (!expiresAt || !signature || Number(expiresAt) <= Date.now() / 1000) {
    return false;
  }
  return safeEqual(signature, sign(expiresAt));
}

export async function isResumeAdmin() {
  const cookieStore = await cookies();
  return isValidResumeSession(cookieStore.get(resumeSessionCookie)?.value);
}

export async function requireResumeAdmin() {
  if (!(await isResumeAdmin())) redirect("/resume/login");
}

export const resumeSessionMaxAge = sessionDurationSeconds;
