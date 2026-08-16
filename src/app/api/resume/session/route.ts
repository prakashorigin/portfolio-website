import { NextRequest, NextResponse } from "next/server";
import {
  createResumeSession,
  hasResumeAdminConfiguration,
  isCorrectResumePassword,
  isResumeAdmin,
  resumeSessionCookie,
  resumeSessionMaxAge,
} from "@/lib/resume-auth";

const cookieOptions = {
  httpOnly: true,
  maxAge: resumeSessionMaxAge,
  path: "/",
  sameSite: "lax" as const,
  secure: process.env.NODE_ENV === "production",
};

export async function GET() {
  return NextResponse.json({ authenticated: await isResumeAdmin() });
}

export async function POST(request: NextRequest) {
  if (!hasResumeAdminConfiguration()) {
    return NextResponse.json(
      {
        error:
          "Resume admin access is not configured. Add RESUME_ADMIN_PASSWORD and RESUME_ADMIN_SECRET.",
      },
      { status: 503 },
    );
  }

  const body = (await request.json()) as { password?: unknown };
  if (typeof body.password !== "string" || !isCorrectResumePassword(body.password)) {
    return NextResponse.json({ error: "Incorrect password." }, { status: 401 });
  }

  const response = NextResponse.json({ authenticated: true });
  response.cookies.set(resumeSessionCookie, createResumeSession(), cookieOptions);
  return response;
}

export async function DELETE() {
  const response = NextResponse.json({ authenticated: false });
  response.cookies.set(resumeSessionCookie, "", { ...cookieOptions, maxAge: 0 });
  return response;
}
