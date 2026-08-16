import { NextRequest, NextResponse } from "next/server";
import { isResumeAdmin } from "@/lib/resume-auth";
import { normalizeResume } from "@/data/resume";
import { getStoredResume, saveStoredResume } from "@/lib/resume-store";

export async function GET() {
  return NextResponse.json(
    { resume: await getStoredResume() },
    { headers: { "Cache-Control": "no-store" } },
  );
}

export async function PUT(request: NextRequest) {
  if (!(await isResumeAdmin())) {
    return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
  }

  const origin = request.headers.get("origin");
  const host = request.headers.get("host");
  if (origin && host && new URL(origin).host !== host) {
    return NextResponse.json({ error: "Invalid request origin." }, { status: 403 });
  }

  try {
    const body = (await request.json()) as { resume?: unknown };
    const resume = await saveStoredResume(normalizeResume(body.resume));
    return NextResponse.json(
      { resume },
      { headers: { "Cache-Control": "no-store" } },
    );
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Unable to save the resume.";
    return NextResponse.json({ error: message }, { status: 503 });
  }
}
