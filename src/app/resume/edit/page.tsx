import ResumeBuilder from "@/components/ResumeBuilder";
import { requireResumeAdmin } from "@/lib/resume-auth";
import { getStoredResume } from "@/lib/resume-store";

export const dynamic = "force-dynamic";
export const metadata = {
  title: "Edit Resume | Prakash Sharma",
  robots: { index: false, follow: false },
};

export default async function ResumeEditPage() {
  await requireResumeAdmin();
  return <ResumeBuilder initialResume={await getStoredResume()} />;
}
