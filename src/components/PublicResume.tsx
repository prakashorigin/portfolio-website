"use client";

import Link from "next/link";
import { useState } from "react";
import { HiArrowLeft, HiDownload, HiShare } from "react-icons/hi";
import ResumeDocument from "@/components/ResumeDocument";
import type { ResumeData } from "@/data/resume";

export default function PublicResume({ resume }: { resume: ResumeData }) {
  const [message, setMessage] = useState("");

  const shareResume = async () => {
    try {
      if (navigator.share) {
        await navigator.share({
          title: `${resume.personal.fullName || "Professional"} Resume`,
          text: resume.summary,
          url: window.location.href,
        });
        setMessage("Share options opened.");
      } else {
        await navigator.clipboard.writeText(window.location.href);
        setMessage("Resume link copied to your clipboard.");
      }
    } catch {
      // A visitor may close the share menu without making a selection.
    }
  };

  return (
    <main className="portfolio-shell min-h-screen pb-16 pt-24">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <div className="mb-8 flex flex-wrap items-center justify-between gap-4 print:hidden">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-sm text-purple-300 transition hover:text-purple-200"
          >
            <HiArrowLeft className="h-4 w-4" />Back to portfolio
          </Link>
          <div className="flex gap-3">
            <button
              type="button"
              onClick={shareResume}
              className="inline-flex items-center gap-2 rounded-xl glass px-4 py-3 text-sm font-medium hover:bg-white/10"
            >
              <HiShare className="h-5 w-5 text-purple-400" />Share
            </button>
            <button
              type="button"
              onClick={() => window.print()}
              className="keep-white inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-purple-600 to-cyan-500 px-4 py-3 text-sm font-semibold"
            >
              <HiDownload className="h-5 w-5" />Download PDF
            </button>
          </div>
        </div>

        {message && (
          <p className="mb-4 rounded-xl border border-cyan-500/30 bg-cyan-500/10 px-4 py-3 text-sm text-cyan-200 print:hidden">
            {message}
          </p>
        )}
        <ResumeDocument resume={resume} />
      </div>
    </main>
  );
}
