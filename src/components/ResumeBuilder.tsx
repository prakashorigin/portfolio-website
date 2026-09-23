"use client";

import Link from "next/link";
import { useState } from "react";
import { motion } from "framer-motion";
import {
  HiArrowLeft,
  HiChevronDown,
  HiChevronUp,
  HiCheckCircle,
  HiDownload,
  HiEye,
  HiPlus,
  HiSave,
  HiShare,
  HiTrash,
} from "react-icons/hi";
import {
  resumeSectionLabels,
  type Certification,
  type Education,
  type Experience,
  type Language,
  type Project,
  type ResumeData,
  type ResumeSectionId,
} from "@/data/resume";

const inputClass =
  "w-full rounded-lg border border-white/10 bg-white/5 px-3 py-2.5 text-sm text-white outline-none transition focus:border-purple-500/70 focus:ring-2 focus:ring-purple-500/20";
const labelClass = "mb-1.5 block text-xs font-medium text-gray-400";

type EntryKey =
  | "experience"
  | "education"
  | "projects"
  | "certifications"
  | "languages";
type SkillListKey = "skills" | "otherSkills";
type EditableEntry =
  | Experience
  | Education
  | Project
  | Certification
  | Language;

function makeEntry(type: EntryKey): EditableEntry {
  const id = `${type}-${Date.now()}`;

  switch (type) {
    case "experience":
      return {
        id,
        role: "",
        company: "",
        location: "",
        startDate: "",
        endDate: "",
        highlights: "",
      };
    case "education":
      return {
        id,
        degree: "",
        institution: "",
        location: "",
        graduationDate: "",
        details: "",
      };
    case "projects":
      return { id, name: "", link: "", description: "", technologies: "" };
    case "certifications":
      return { id, name: "", issuer: "", date: "" };
    case "languages":
      return { id, name: "", proficiency: "" };
  }
}

function Field({
  label,
  value,
  onChange,
  placeholder = "",
  multiline = false,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  multiline?: boolean;
}) {
  return (
    <label>
      <span className={labelClass}>{label}</span>
      {multiline ? (
        <textarea
          value={value}
          onChange={(event) => onChange(event.target.value)}
          placeholder={placeholder}
          rows={4}
          className={`${inputClass} resize-y`}
        />
      ) : (
        <input
          value={value}
          onChange={(event) => onChange(event.target.value)}
          placeholder={placeholder}
          className={inputClass}
        />
      )}
    </label>
  );
}

function SectionShell({
  title,
  onMoveUp,
  onMoveDown,
  onHide,
  children,
}: {
  title: string;
  onMoveUp: () => void;
  onMoveDown: () => void;
  onHide: () => void;
  children: React.ReactNode;
}) {
  return (
    <section className="glass rounded-2xl p-5 sm:p-6">
      <div className="mb-5 flex flex-wrap items-center justify-between gap-3 border-b border-white/10 pb-4">
        <h2 className="text-lg font-semibold">{title}</h2>
        <div className="flex items-center gap-1">
          <button
            type="button"
            onClick={onMoveUp}
            className="rounded-lg p-2 text-gray-400 transition hover:bg-white/10 hover:text-purple-400"
            aria-label={`Move ${title} up`}
            title="Move section up"
          >
            <HiChevronUp className="h-4 w-4" />
          </button>
          <button
            type="button"
            onClick={onMoveDown}
            className="rounded-lg p-2 text-gray-400 transition hover:bg-white/10 hover:text-purple-400"
            aria-label={`Move ${title} down`}
            title="Move section down"
          >
            <HiChevronDown className="h-4 w-4" />
          </button>
          <button
            type="button"
            onClick={onHide}
            className="rounded-lg p-2 text-gray-400 transition hover:bg-red-500/10 hover:text-red-400"
            aria-label={`Hide ${title}`}
            title="Hide section"
          >
            <HiTrash className="h-4 w-4" />
          </button>
        </div>
      </div>
      {children}
    </section>
  );
}

function EntryToolbar({
  title,
  onMoveUp,
  onMoveDown,
  onDelete,
}: {
  title: string;
  onMoveUp: () => void;
  onMoveDown: () => void;
  onDelete: () => void;
}) {
  return (
    <div className="mb-4 flex items-center justify-between gap-3">
      <span className="text-sm font-medium text-purple-300">{title}</span>
      <div className="flex gap-1">
        <button
          type="button"
          onClick={onMoveUp}
          className="rounded-md p-1.5 text-gray-400 hover:bg-white/10 hover:text-purple-400"
          aria-label={`Move ${title} up`}
        >
          <HiChevronUp className="h-4 w-4" />
        </button>
        <button
          type="button"
          onClick={onMoveDown}
          className="rounded-md p-1.5 text-gray-400 hover:bg-white/10 hover:text-purple-400"
          aria-label={`Move ${title} down`}
        >
          <HiChevronDown className="h-4 w-4" />
        </button>
        <button
          type="button"
          onClick={onDelete}
          className="rounded-md p-1.5 text-gray-400 hover:bg-red-500/10 hover:text-red-400"
          aria-label={`Delete ${title}`}
        >
          <HiTrash className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}

export default function Resume({
  initialResume,
}: {
  initialResume: ResumeData;
}) {
  const [resume, setResume] = useState<ResumeData>(initialResume);
  const [skillDraft, setSkillDraft] = useState("");
  const [notice, setNotice] = useState<string | null>(null);

  const showNotice = (message: string) => {
    setNotice(message);
    window.setTimeout(() => setNotice(null), 4000);
  };

  const updatePersonal = (
    field: keyof ResumeData["personal"],
    value: string,
  ) => {
    setResume((current) => ({
      ...current,
      personal: { ...current.personal, [field]: value },
    }));
  };

  const updateEntry = (
    type: EntryKey,
    id: string,
    updates: Record<string, string>,
  ) => {
    setResume((current) => {
      const entries = (current[type] as EditableEntry[]).map((entry) =>
        entry.id === id ? { ...entry, ...updates } : entry,
      );
      return { ...current, [type]: entries } as ResumeData;
    });
  };

  const addEntry = (type: EntryKey) => {
    setResume(
      (current) =>
        ({
          ...current,
          [type]: [...(current[type] as EditableEntry[]), makeEntry(type)],
        }) as ResumeData,
    );
  };

  const removeEntry = (type: EntryKey, id: string) => {
    setResume(
      (current) =>
        ({
          ...current,
          [type]: (current[type] as EditableEntry[]).filter(
            (entry) => entry.id !== id,
          ),
        }) as ResumeData,
    );
  };

  const moveEntry = (type: EntryKey, index: number, direction: -1 | 1) => {
    setResume((current) => {
      const entries = [...(current[type] as EditableEntry[])];
      const nextIndex = index + direction;
      if (nextIndex < 0 || nextIndex >= entries.length) return current;
      [entries[index], entries[nextIndex]] = [
        entries[nextIndex],
        entries[index],
      ];
      return { ...current, [type]: entries } as ResumeData;
    });
  };

  const moveSection = (section: ResumeSectionId, direction: -1 | 1) => {
    setResume((current) => {
      const index = current.sectionOrder.indexOf(section);
      const nextIndex = index + direction;
      if (
        index < 0 ||
        nextIndex < 0 ||
        nextIndex >= current.sectionOrder.length
      ) {
        return current;
      }
      const sectionOrder = [...current.sectionOrder];
      [sectionOrder[index], sectionOrder[nextIndex]] = [
        sectionOrder[nextIndex],
        sectionOrder[index],
      ];
      return { ...current, sectionOrder };
    });
  };

  const hideSection = (section: ResumeSectionId) => {
    setResume((current) => ({
      ...current,
      hiddenSections: current.hiddenSections.includes(section)
        ? current.hiddenSections
        : [...current.hiddenSections, section],
    }));
  };

  const restoreSection = (section: ResumeSectionId) => {
    setResume((current) => ({
      ...current,
      hiddenSections: current.hiddenSections.filter((item) => item !== section),
    }));
  };

  const updateSkill = (list: SkillListKey, index: number, value: string) => {
    setResume((current) => ({
      ...current,
      [list]: current[list].map((skill, skillIndex) =>
        skillIndex === index ? value : skill,
      ),
    }));
  };

  const moveSkill = (list: SkillListKey, index: number, direction: -1 | 1) => {
    setResume((current) => {
      const skills = [...current[list]];
      const nextIndex = index + direction;
      if (nextIndex < 0 || nextIndex >= skills.length) return current;
      [skills[index], skills[nextIndex]] = [skills[nextIndex], skills[index]];
      return { ...current, [list]: skills };
    });
  };

  const addSkill = (list: SkillListKey) => {
    if (!skillDraft.trim()) return;
    setResume((current) => ({
      ...current,
      [list]: [...current[list], skillDraft.trim()],
    }));
    setSkillDraft("");
  };

  const removeSkill = (list: SkillListKey, index: number) => {
    setResume((current) => ({
      ...current,
      [list]: current[list].filter((_, skillIndex) => skillIndex !== index),
    }));
  };

  const saveResume = async () => {
    try {
      const response = await fetch("/api/resume/data", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ resume }),
      });
      const result = (await response.json()) as {
        error?: string;
        resume?: ResumeData;
      };

      if (!response.ok || !result.resume) {
        showNotice(result.error ?? "Unable to save the resume.");
        return;
      }

      setResume(result.resume);
      showNotice(
        "Resume updated successfully. The public resume now has your changes.",
      );
    } catch {
      showNotice("Unable to save the resume. Please try again.");
    }
  };

  const openPreview = () => {
    document
      .getElementById("resume-preview")
      ?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const shareResume = async () => {
    const shareData = {
      title: `${resume.personal.fullName || "My"} Resume`,
      text: resume.summary,
      url: window.location.href,
    };

    try {
      if (navigator.share) {
        await navigator.share(shareData);
        showNotice("Resume share options opened.");
      } else {
        await navigator.clipboard.writeText(window.location.href);
        showNotice("Resume page link copied to your clipboard.");
      }
    } catch {
      // Closing a native share sheet is not an error that needs a user message.
    }
  };

  const visibleSections = resume.sectionOrder.filter(
    (section) => !resume.hiddenSections.includes(section),
  );

  const sectionControls = (section: ResumeSectionId) => ({
    onMoveUp: () => moveSection(section, -1),
    onMoveDown: () => moveSection(section, 1),
    onHide: () => hideSection(section),
  });

  const renderEditorSection = (section: ResumeSectionId) => {
    switch (section) {
      case "personal":
        return (
          <div className="grid gap-4 sm:grid-cols-2">
            <Field
              label="Full name"
              value={resume.personal.fullName}
              onChange={(value) => updatePersonal("fullName", value)}
            />
            <Field
              label="Professional title"
              value={resume.personal.title}
              onChange={(value) => updatePersonal("title", value)}
            />
            <Field
              label="Email"
              value={resume.personal.email}
              onChange={(value) => updatePersonal("email", value)}
            />
            <Field
              label="Phone"
              value={resume.personal.phone}
              onChange={(value) => updatePersonal("phone", value)}
            />
            <Field
              label="Location"
              value={resume.personal.location}
              onChange={(value) => updatePersonal("location", value)}
            />
            <Field
              label="Website / portfolio"
              value={resume.personal.website}
              onChange={(value) => updatePersonal("website", value)}
              placeholder="https://example.com"
            />
            <Field
              label="GitHub"
              value={resume.personal.github}
              onChange={(value) => updatePersonal("github", value)}
              placeholder="https://github.com/your-name"
            />
            <Field
              label="LinkedIn"
              value={resume.personal.linkedin}
              onChange={(value) => updatePersonal("linkedin", value)}
              placeholder="linkedin.com/in/your-name"
            />
          </div>
        );
      case "summary":
        return (
          <Field
            label="Write a concise, role-focused summary"
            value={resume.summary}
            onChange={(value) =>
              setResume((current) => ({ ...current, summary: value }))
            }
            multiline
          />
        );
      case "experience":
        return (
          <div className="space-y-4">
            {resume.experience.map((entry, index) => (
              <div
                key={entry.id}
                className="rounded-xl border border-white/10 bg-black/10 p-4"
              >
                <EntryToolbar
                  title={`Experience ${index + 1}`}
                  onMoveUp={() => moveEntry("experience", index, -1)}
                  onMoveDown={() => moveEntry("experience", index, 1)}
                  onDelete={() => removeEntry("experience", entry.id)}
                />
                <div className="grid gap-4 sm:grid-cols-2">
                  <Field
                    label="Job title"
                    value={entry.role}
                    onChange={(value) =>
                      updateEntry("experience", entry.id, { role: value })
                    }
                  />
                  <Field
                    label="Company"
                    value={entry.company}
                    onChange={(value) =>
                      updateEntry("experience", entry.id, { company: value })
                    }
                  />
                  <Field
                    label="Location"
                    value={entry.location}
                    onChange={(value) =>
                      updateEntry("experience", entry.id, { location: value })
                    }
                  />
                  <div className="grid grid-cols-2 gap-3">
                    <Field
                      label="Start"
                      value={entry.startDate}
                      onChange={(value) =>
                        updateEntry("experience", entry.id, {
                          startDate: value,
                        })
                      }
                    />
                    <Field
                      label="End"
                      value={entry.endDate}
                      onChange={(value) =>
                        updateEntry("experience", entry.id, { endDate: value })
                      }
                    />
                  </div>
                  <div className="sm:col-span-2">
                    <Field
                      label="Highlights (one achievement per line)"
                      value={entry.highlights}
                      onChange={(value) =>
                        updateEntry("experience", entry.id, {
                          highlights: value,
                        })
                      }
                      multiline
                    />
                  </div>
                </div>
              </div>
            ))}
            <button
              type="button"
              onClick={() => addEntry("experience")}
              className="inline-flex items-center gap-2 rounded-lg border border-dashed border-purple-500/50 px-3 py-2 text-sm text-purple-300 transition hover:bg-purple-500/10"
            >
              <HiPlus className="h-4 w-4" />
              Add work experience
            </button>
          </div>
        );
      case "education":
        return (
          <div className="space-y-4">
            {resume.education.map((entry, index) => (
              <div
                key={entry.id}
                className="rounded-xl border border-white/10 bg-black/10 p-4"
              >
                <EntryToolbar
                  title={`Education ${index + 1}`}
                  onMoveUp={() => moveEntry("education", index, -1)}
                  onMoveDown={() => moveEntry("education", index, 1)}
                  onDelete={() => removeEntry("education", entry.id)}
                />
                <div className="grid gap-4 sm:grid-cols-2">
                  <Field
                    label="Degree / qualification"
                    value={entry.degree}
                    onChange={(value) =>
                      updateEntry("education", entry.id, { degree: value })
                    }
                  />
                  <Field
                    label="Institution"
                    value={entry.institution}
                    onChange={(value) =>
                      updateEntry("education", entry.id, { institution: value })
                    }
                  />
                  <Field
                    label="Location"
                    value={entry.location}
                    onChange={(value) =>
                      updateEntry("education", entry.id, { location: value })
                    }
                  />
                  <Field
                    label="Graduation date"
                    value={entry.graduationDate}
                    onChange={(value) =>
                      updateEntry("education", entry.id, {
                        graduationDate: value,
                      })
                    }
                  />
                  <div className="sm:col-span-2">
                    <Field
                      label="Details"
                      value={entry.details}
                      onChange={(value) =>
                        updateEntry("education", entry.id, { details: value })
                      }
                      multiline
                    />
                  </div>
                </div>
              </div>
            ))}
            <button
              type="button"
              onClick={() => addEntry("education")}
              className="inline-flex items-center gap-2 rounded-lg border border-dashed border-purple-500/50 px-3 py-2 text-sm text-purple-300 transition hover:bg-purple-500/10"
            >
              <HiPlus className="h-4 w-4" />
              Add education
            </button>
          </div>
        );
      case "skills":
        return (
          <div>
            <div className="mb-4 flex gap-2">
              <input
                value={skillDraft}
                onChange={(event) => setSkillDraft(event.target.value)}
                onKeyDown={(event) => {
                  if (event.key === "Enter") {
                    event.preventDefault();
                    addSkill("skills");
                  }
                }}
                placeholder="Add a technical skill"
                className={inputClass}
              />
              <button
                type="button"
                onClick={() => addSkill("skills")}
                className="keep-white inline-flex items-center gap-1 rounded-lg bg-purple-600 px-3 text-sm font-medium"
              >
                <HiPlus className="h-4 w-4" />
                Add
              </button>
            </div>
            <div className="space-y-2">
              {resume.skills.map((skill, index) => (
                <div
                  key={`${skill}-${index}`}
                  className="flex items-center gap-2 rounded-lg border border-white/10 bg-black/10 p-2"
                >
                  <input
                    value={skill}
                    onChange={(event) =>
                      updateSkill("skills", index, event.target.value)
                    }
                    className={`${inputClass} py-2`}
                  />
                  <button
                    type="button"
                    onClick={() => moveSkill("skills", index, -1)}
                    className="p-2 text-gray-400 hover:text-purple-400"
                    aria-label={`Move ${skill} up`}
                  >
                    <HiChevronUp />
                  </button>
                  <button
                    type="button"
                    onClick={() => moveSkill("skills", index, 1)}
                    className="p-2 text-gray-400 hover:text-purple-400"
                    aria-label={`Move ${skill} down`}
                  >
                    <HiChevronDown />
                  </button>
                  <button
                    type="button"
                    onClick={() => removeSkill("skills", index)}
                    className="p-2 text-gray-400 hover:text-red-400"
                    aria-label={`Delete ${skill}`}
                  >
                    <HiTrash />
                  </button>
                </div>
              ))}
            </div>
          </div>
        );
      case "otherSkills":
        return (
          <div>
            <div className="mb-4 flex gap-2">
              <input
                value={skillDraft}
                onChange={(event) => setSkillDraft(event.target.value)}
                onKeyDown={(event) => {
                  if (event.key === "Enter") {
                    event.preventDefault();
                    addSkill("otherSkills");
                  }
                }}
                placeholder="Add another skill"
                className={inputClass}
              />
              <button
                type="button"
                onClick={() => addSkill("otherSkills")}
                className="keep-white inline-flex items-center gap-1 rounded-lg bg-purple-600 px-3 text-sm font-medium"
              >
                <HiPlus className="h-4 w-4" />
                Add
              </button>
            </div>
            <div className="space-y-2">
              {resume.otherSkills.map((skill, index) => (
                <div
                  key={`${skill}-${index}`}
                  className="flex items-center gap-2 rounded-lg border border-white/10 bg-black/10 p-2"
                >
                  <input
                    value={skill}
                    onChange={(event) =>
                      updateSkill("otherSkills", index, event.target.value)
                    }
                    className={`${inputClass} py-2`}
                  />
                  <button
                    type="button"
                    onClick={() => moveSkill("otherSkills", index, -1)}
                    className="p-2 text-gray-400 hover:text-purple-400"
                    aria-label={`Move ${skill} up`}
                  >
                    <HiChevronUp />
                  </button>
                  <button
                    type="button"
                    onClick={() => moveSkill("otherSkills", index, 1)}
                    className="p-2 text-gray-400 hover:text-purple-400"
                    aria-label={`Move ${skill} down`}
                  >
                    <HiChevronDown />
                  </button>
                  <button
                    type="button"
                    onClick={() => removeSkill("otherSkills", index)}
                    className="p-2 text-gray-400 hover:text-red-400"
                    aria-label={`Delete ${skill}`}
                  >
                    <HiTrash />
                  </button>
                </div>
              ))}
            </div>
          </div>
        );
      case "projects":
        return (
          <div className="space-y-4">
            {resume.projects.map((entry, index) => (
              <div
                key={entry.id}
                className="rounded-xl border border-white/10 bg-black/10 p-4"
              >
                <EntryToolbar
                  title={`Project ${index + 1}`}
                  onMoveUp={() => moveEntry("projects", index, -1)}
                  onMoveDown={() => moveEntry("projects", index, 1)}
                  onDelete={() => removeEntry("projects", entry.id)}
                />
                <div className="grid gap-4 sm:grid-cols-2">
                  <Field
                    label="Project name"
                    value={entry.name}
                    onChange={(value) =>
                      updateEntry("projects", entry.id, { name: value })
                    }
                  />
                  <Field
                    label="Project URL"
                    value={entry.link}
                    onChange={(value) =>
                      updateEntry("projects", entry.id, { link: value })
                    }
                    placeholder="https://..."
                  />
                  <div className="sm:col-span-2">
                    <Field
                      label="Description"
                      value={entry.description}
                      onChange={(value) =>
                        updateEntry("projects", entry.id, {
                          description: value,
                        })
                      }
                      multiline
                    />
                  </div>
                  <div className="sm:col-span-2">
                    <Field
                      label="Technologies (comma separated)"
                      value={entry.technologies}
                      onChange={(value) =>
                        updateEntry("projects", entry.id, {
                          technologies: value,
                        })
                      }
                    />
                  </div>
                </div>
              </div>
            ))}
            <button
              type="button"
              onClick={() => addEntry("projects")}
              className="inline-flex items-center gap-2 rounded-lg border border-dashed border-purple-500/50 px-3 py-2 text-sm text-purple-300 transition hover:bg-purple-500/10"
            >
              <HiPlus className="h-4 w-4" />
              Add project
            </button>
          </div>
        );
      case "certifications":
        return (
          <div className="space-y-4">
            {resume.certifications.map((entry, index) => (
              <div
                key={entry.id}
                className="rounded-xl border border-white/10 bg-black/10 p-4"
              >
                <EntryToolbar
                  title={`Certification ${index + 1}`}
                  onMoveUp={() => moveEntry("certifications", index, -1)}
                  onMoveDown={() => moveEntry("certifications", index, 1)}
                  onDelete={() => removeEntry("certifications", entry.id)}
                />
                <div className="grid gap-4 sm:grid-cols-3">
                  <Field
                    label="Certification"
                    value={entry.name}
                    onChange={(value) =>
                      updateEntry("certifications", entry.id, { name: value })
                    }
                  />
                  <Field
                    label="Issuer"
                    value={entry.issuer}
                    onChange={(value) =>
                      updateEntry("certifications", entry.id, { issuer: value })
                    }
                  />
                  <Field
                    label="Date"
                    value={entry.date}
                    onChange={(value) =>
                      updateEntry("certifications", entry.id, { date: value })
                    }
                  />
                </div>
              </div>
            ))}
            <button
              type="button"
              onClick={() => addEntry("certifications")}
              className="inline-flex items-center gap-2 rounded-lg border border-dashed border-purple-500/50 px-3 py-2 text-sm text-purple-300 transition hover:bg-purple-500/10"
            >
              <HiPlus className="h-4 w-4" />
              Add certification
            </button>
          </div>
        );
      case "languages":
        return (
          <div className="space-y-4">
            {resume.languages.map((entry, index) => (
              <div
                key={entry.id}
                className="rounded-xl border border-white/10 bg-black/10 p-4"
              >
                <EntryToolbar
                  title={`Language ${index + 1}`}
                  onMoveUp={() => moveEntry("languages", index, -1)}
                  onMoveDown={() => moveEntry("languages", index, 1)}
                  onDelete={() => removeEntry("languages", entry.id)}
                />
                <div className="grid gap-4 sm:grid-cols-2">
                  <Field
                    label="Language"
                    value={entry.name}
                    onChange={(value) =>
                      updateEntry("languages", entry.id, { name: value })
                    }
                  />
                  <Field
                    label="Proficiency"
                    value={entry.proficiency}
                    onChange={(value) =>
                      updateEntry("languages", entry.id, { proficiency: value })
                    }
                    placeholder="Native, Fluent, Professional..."
                  />
                </div>
              </div>
            ))}
            <button
              type="button"
              onClick={() => addEntry("languages")}
              className="inline-flex items-center gap-2 rounded-lg border border-dashed border-purple-500/50 px-3 py-2 text-sm text-purple-300 transition hover:bg-purple-500/10"
            >
              <HiPlus className="h-4 w-4" />
              Add language
            </button>
          </div>
        );
    }
  };

  const renderPreviewSection = (section: ResumeSectionId) => {
    if (section === "personal") return null;
    const heading = (
      <h2 className="resume-section-heading">{resumeSectionLabels[section]}</h2>
    );

    switch (section) {
      case "summary":
        return resume.summary ? (
          <section>
            {heading}
            <p>{resume.summary}</p>
          </section>
        ) : null;
      case "experience":
        return resume.experience.length ? (
          <section>
            {heading}
            <div className="space-y-4">
              {resume.experience.map((entry) => (
                <div key={entry.id}>
                  <div className="resume-entry-title">
                    <strong>{entry.role || "Role"}</strong>
                    <span>
                      {[entry.startDate, entry.endDate]
                        .filter(Boolean)
                        .join(" – ")}
                    </span>
                  </div>
                  <div className="resume-entry-meta">
                    <span>
                      {[entry.company, entry.location]
                        .filter(Boolean)
                        .join(" | ")}
                    </span>
                  </div>
                  {entry.highlights && (
                    <ul>
                      {entry.highlights
                        .split("\n")
                        .filter(Boolean)
                        .map((item, index) => (
                          <li key={index}>{item}</li>
                        ))}
                    </ul>
                  )}
                </div>
              ))}
            </div>
          </section>
        ) : null;
      case "education":
        return resume.education.length ? (
          <section>
            {heading}
            <div className="space-y-3">
              {resume.education.map((entry) => (
                <div key={entry.id}>
                  <div className="resume-entry-title">
                    <strong>{entry.degree || "Degree"}</strong>
                    <span>{entry.graduationDate}</span>
                  </div>
                  <div className="resume-entry-meta">
                    {[entry.institution, entry.location]
                      .filter(Boolean)
                      .join(" | ")}
                  </div>
                  {entry.details && <p>{entry.details}</p>}
                </div>
              ))}
            </div>
          </section>
        ) : null;
      case "skills":
        return resume.skills.filter(Boolean).length ? (
          <section>
            {heading}
            <ul>
              {resume.skills.filter(Boolean).map((skill) => (
                <li key={skill}>{skill}</li>
              ))}
            </ul>
          </section>
        ) : null;
      case "otherSkills":
        return resume.otherSkills.filter(Boolean).length ? (
          <section>
            {heading}
            <ul>
              {resume.otherSkills.filter(Boolean).map((skill) => (
                <li key={skill}>{skill}</li>
              ))}
            </ul>
          </section>
        ) : null;
      case "projects":
        return resume.projects.length ? (
          <section>
            {heading}
            <div className="space-y-3">
              {resume.projects.map((entry) => (
                <div key={entry.id}>
                  <div className="resume-entry-title">
                    <strong>{entry.name || "Project"}</strong>
                    {entry.link && (
                      <span>{entry.link.replace(/^https?:\/\//, "")}</span>
                    )}
                  </div>
                  {entry.description && <p>{entry.description}</p>}
                  {entry.technologies && (
                    <p className="resume-entry-meta">
                      Technologies: {entry.technologies}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </section>
        ) : null;
      case "certifications":
        return resume.certifications.length ? (
          <section>
            {heading}
            <ul>
              {resume.certifications.map((entry) => (
                <li key={entry.id}>
                  <strong>{entry.name || "Certification"}</strong>
                  {[entry.issuer, entry.date].filter(Boolean).length
                    ? ` — ${[entry.issuer, entry.date].filter(Boolean).join(", ")}`
                    : ""}
                </li>
              ))}
            </ul>
          </section>
        ) : null;
      case "languages":
        return resume.languages.length ? (
          <section>
            {heading}
            <p>
              {resume.languages
                .map(
                  (entry) =>
                    [entry.name, entry.proficiency].filter(Boolean).join(" (") +
                    (entry.proficiency ? ")" : ""),
                )
                .join(" • ")}
            </p>
          </section>
        ) : null;
    }
  };

  return (
    <main className="portfolio-shell min-h-screen pb-16 pt-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Link
          href="/"
          className="mb-8 inline-flex items-center gap-2 text-sm text-purple-300 transition hover:text-purple-200"
        >
          <HiArrowLeft className="h-4 w-4" />
          Back to portfolio
        </Link>

        <div className="mb-10 flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
          <div>
            <p className="mb-2 text-sm font-medium uppercase tracking-[0.2em] text-cyan-400">
              Resume workspace
            </p>
            <h1 className="text-4xl font-bold sm:text-5xl">
              Create and <span className="gradient-text">update your CV</span>
            </h1>
            <p className="mt-3 max-w-2xl text-gray-400">
              Edit your existing information, reorganize sections, preview the
              result, then save or download a clean ATS-friendly resume.
            </p>
          </div>
          <div className="flex flex-wrap gap-3 print:hidden">
            <button
              type="button"
              onClick={openPreview}
              className="inline-flex items-center gap-2 rounded-xl glass px-4 py-3 text-sm font-medium transition hover:bg-white/10"
            >
              <HiEye className="h-5 w-5 text-cyan-400" />
              Preview
            </button>
            <button
              type="button"
              onClick={shareResume}
              className="inline-flex items-center gap-2 rounded-xl glass px-4 py-3 text-sm font-medium transition hover:bg-white/10"
            >
              <HiShare className="h-5 w-5 text-purple-400" />
              Share
            </button>
            <button
              type="button"
              onClick={saveResume}
              className="keep-white inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-purple-600 to-cyan-500 px-4 py-3 text-sm font-semibold shadow-lg shadow-purple-500/20"
            >
              <HiSave className="h-5 w-5" />
              Save / Update Resume
            </button>
          </div>
        </div>

        {notice && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-6 flex items-center gap-2 rounded-xl border border-green-500/30 bg-green-500/10 px-4 py-3 text-sm text-green-300"
          >
            <HiCheckCircle className="h-5 w-5 shrink-0" />
            {notice}
          </motion.div>
        )}

        <div className="grid gap-8 xl:grid-cols-[minmax(0,1.08fr)_minmax(420px,0.92fr)]">
          <div className="space-y-5 print:hidden">
            <div className="rounded-xl border border-purple-500/25 bg-purple-500/5 px-4 py-3 text-sm text-gray-300">
              Your resume is kept intact while you edit: hiding a section only
              removes it from the preview, not from your saved information.
            </div>
            {visibleSections.map((section) => (
              <SectionShell
                key={section}
                title={resumeSectionLabels[section]}
                {...sectionControls(section)}
              >
                {renderEditorSection(section)}
              </SectionShell>
            ))}
            {resume.hiddenSections.length > 0 && (
              <section className="glass rounded-2xl p-5">
                <h2 className="mb-3 text-lg font-semibold">
                  Add a hidden section back
                </h2>
                <div className="flex flex-wrap gap-2">
                  {resume.hiddenSections.map((section) => (
                    <button
                      key={section}
                      type="button"
                      onClick={() => restoreSection(section)}
                      className="inline-flex items-center gap-1 rounded-lg border border-dashed border-cyan-400/50 px-3 py-2 text-sm text-cyan-300 hover:bg-cyan-500/10"
                    >
                      <HiPlus className="h-4 w-4" />
                      {resumeSectionLabels[section]}
                    </button>
                  ))}
                </div>
              </section>
            )}
          </div>

          <aside className="xl:sticky xl:top-6 xl:self-start">
            <div className="mb-3 flex items-center justify-between print:hidden">
              <h2 className="text-xl font-semibold">Live preview</h2>
              <button
                type="button"
                onClick={() => window.print()}
                className="keep-white inline-flex items-center gap-2 rounded-lg bg-slate-700 px-3 py-2 text-sm font-medium hover:bg-slate-600"
              >
                <HiDownload className="h-4 w-4" />
                Download PDF
              </button>
            </div>
            <article id="resume-preview" className="resume-document">
              {visibleSections.includes("personal") && (
                <header className="resume-header">
                  <h1>{resume.personal.fullName || "Your Name"}</h1>
                  {resume.personal.title && (
                    <p className="resume-role">{resume.personal.title}</p>
                  )}
                  <p className="resume-contact">
                    {[
                      resume.personal.email,
                      resume.personal.phone,
                      resume.personal.location,
                      resume.personal.website,
                      resume.personal.github,
                      resume.personal.linkedin,
                    ]
                      .filter(Boolean)
                      .join("  |  ")}
                  </p>
                </header>
              )}
              <div className="resume-body">
                {visibleSections.map((section) => (
                  <div key={section}>{renderPreviewSection(section)}</div>
                ))}
              </div>
            </article>
            <p className="mt-3 text-center text-xs text-gray-500 print:hidden">
              Use “Download PDF” to open your browser’s print dialog and save
              this ATS-friendly version as a PDF.
            </p>
          </aside>
        </div>
      </div>
    </main>
  );
}
