import { NextRequest, NextResponse } from "next/server";

/** Keeps old resume links pointing at the current public resume. */
export function GET(request: NextRequest) {
  return NextResponse.redirect(new URL("/resume", request.url), 307);
}
