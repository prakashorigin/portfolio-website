"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { HiArrowLeft, HiLockClosed } from "react-icons/hi";

export default function ResumeLogin() {
  const router = useRouter();
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsSubmitting(true);
    setError("");

    try {
      const response = await fetch("/api/resume/session", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });
      const result = (await response.json()) as { error?: string };

      if (!response.ok) {
        setError(result.error ?? "Unable to sign in.");
        return;
      }

      router.replace("/resume/edit");
      router.refresh();
    } catch {
      setError("Unable to sign in. Check your connection and try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className="portfolio-shell grid min-h-screen place-items-center px-4 py-12">
      <div className="w-full max-w-md">
        <Link href="/resume" className="mb-7 inline-flex items-center gap-2 text-sm text-purple-300 hover:text-purple-200">
          <HiArrowLeft className="h-4 w-4" />View public resume
        </Link>
        <section className="glass rounded-2xl p-7 sm:p-8">
          <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-xl bg-purple-500/15"><HiLockClosed className="h-6 w-6 text-purple-300" /></div>
          <h1 className="text-2xl font-bold">Resume editor login</h1>
          <p className="mt-2 text-sm leading-relaxed text-gray-400">This area is only for the portfolio owner. Visitors can view and download the public resume but cannot edit it.</p>
          <form onSubmit={handleSubmit} className="mt-6 space-y-4">
            <label className="block"><span className="mb-2 block text-sm text-gray-300">Admin password</span><input type="password" value={password} onChange={(event) => setPassword(event.target.value)} autoComplete="current-password" required className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white outline-none transition focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20" /></label>
            {error && <p className="text-sm text-red-400">{error}</p>}
            <button type="submit" disabled={isSubmitting} className="keep-white flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-purple-600 to-cyan-500 px-4 py-3 font-medium disabled:cursor-not-allowed disabled:opacity-70"><HiLockClosed className="h-4 w-4" />{isSubmitting ? "Signing in..." : "Open resume editor"}</button>
          </form>
        </section>
      </div>
    </main>
  );
}
