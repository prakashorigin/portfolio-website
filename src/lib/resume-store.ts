import { get, put } from "@vercel/blob";
import {
  createDefaultResume,
  normalizeResume,
  type ResumeData,
} from "@/data/resume";

const resumePathname = "portfolio/resume.json";

export function isResumeStorageConfigured() {
  return Boolean(process.env.BLOB_READ_WRITE_TOKEN || process.env.BLOB_STORE_ID);
}

export async function getStoredResume(): Promise<ResumeData> {
  if (!isResumeStorageConfigured()) return createDefaultResume();

  try {
    const result = await get(resumePathname, {
      access: "private",
      useCache: false,
    });
    if (!result?.stream) return createDefaultResume();

    return normalizeResume(await new Response(result.stream).json());
  } catch {
    return createDefaultResume();
  }
}

export async function saveStoredResume(resume: ResumeData) {
  if (!isResumeStorageConfigured()) {
    throw new Error(
      "Resume storage is not configured. Add a Vercel Blob store to this project.",
    );
  }

  const normalizedResume = normalizeResume({
    ...resume,
    updatedAt: new Date().toISOString(),
  });

  await put(resumePathname, JSON.stringify(normalizedResume), {
    access: "private",
    addRandomSuffix: false,
    allowOverwrite: true,
    contentType: "application/json",
  });

  return normalizedResume;
}
