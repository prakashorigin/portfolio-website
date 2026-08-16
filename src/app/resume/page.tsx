import PublicResume from "@/components/PublicResume";
import { getStoredResume } from "@/lib/resume-store";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Resume | Prakash Sharma",
  description: "View and download Prakash Sharma's professional resume.",
};

export default async function ResumePage() {
  return <PublicResume resume={await getStoredResume()} />;
}
