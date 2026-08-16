export const resumeSectionIds = [
  "personal",
  "summary",
  "experience",
  "education",
  "skills",
  "otherSkills",
  "projects",
  "certifications",
  "languages",
] as const;

export type ResumeSectionId = (typeof resumeSectionIds)[number];

export const resumeSectionLabels: Record<ResumeSectionId, string> = {
  personal: "Personal Information",
  summary: "Professional Summary",
  experience: "Work Experience",
  education: "Education",
  skills: "Technical Skills",
  otherSkills: "Other Skills",
  projects: "Projects",
  certifications: "Certifications",
  languages: "Languages",
};

export interface ResumeEntry {
  id: string;
}

export interface Experience extends ResumeEntry {
  role: string;
  company: string;
  location: string;
  startDate: string;
  endDate: string;
  highlights: string;
}

export interface Education extends ResumeEntry {
  degree: string;
  institution: string;
  location: string;
  graduationDate: string;
  details: string;
}

export interface Project extends ResumeEntry {
  name: string;
  link: string;
  description: string;
  technologies: string;
}

export interface Certification extends ResumeEntry {
  name: string;
  issuer: string;
  date: string;
}

export interface Language extends ResumeEntry {
  name: string;
  proficiency: string;
}

export interface ResumeData {
  personal: {
    fullName: string;
    title: string;
    email: string;
    phone: string;
    location: string;
    website: string;
    github: string;
    linkedin: string;
  };
  summary: string;
  experience: Experience[];
  education: Education[];
  skills: string[];
  otherSkills: string[];
  projects: Project[];
  certifications: Certification[];
  languages: Language[];
  sectionOrder: ResumeSectionId[];
  hiddenSections: ResumeSectionId[];
  updatedAt: string | null;
}

const createId = (prefix: string) => `${prefix}-${Date.now()}`;

export function createDefaultResume(): ResumeData {
  return {
    personal: {
      fullName: "Prakash Sharma",
      title: "MERN Stack Developer",
      email: "prakash019sharma@gmail.com",
      phone: "9761665753",
      location: "New Baneshwor, KTM",
      website: "https://prakash-portfolio-psi.vercel.app/",
      github: "https://github.com/prakashorigin",
      linkedin: "https://www.linkedin.com/in/prakash-sharma-8ba4233a3/",
    },
    summary:
      "Motivated MERN Stack Developer with strong knowledge of React.js, Node.js, Express.js, and MongoDB. Skilled in building responsive frontend interfaces, RESTful APIs, and full-stack web applications. Passionate about writing clean, scalable code and continuously learning new technologies to develop efficient, user-friendly applications.",
    experience: [
      {
        id: createId("experience"),
        role: "Full Stack Developer",
        company: "Nepcod",
        location: "Kathmandu, Nepal",
        startDate: "2025",
        endDate: "Present",
        highlights:
          "Build responsive web applications with React, Next.js, and Node.js.\nDeliver clean, maintainable interfaces and reliable APIs.",
      },
      {
        id: createId("experience"),
        role: "Freelancer – Data Entry Specialist",
        company: "Mansovison Technology",
        location: "Anamnagar, Kathmandu",
        startDate: "2024",
        endDate: "2025",
        highlights:
          "Conducted online research to collect accurate, location-specific information.\nEntered and maintained data in Excel spreadsheets with high accuracy.\nOrganized datasets for clarity, accessibility, and future reference.\nSupported team operations to improve efficiency and data reliability.",
      },
    ],
    education: [
      {
        id: createId("education"),
        degree: "BSc in CSIT",
        institution: "Patan Multiple Campus (TU)",
        location: "Patan, Lalitpur",
        graduationDate: "Running (7th Semester)",
        details: "",
      },
      {
        id: createId("education"),
        degree: "Plus Two Science",
        institution: "Galaxy Secondary School",
        location: "Dhangadhi, Kailali",
        graduationDate: "September 2022",
        details: "",
      },
      {
        id: createId("education"),
        degree: "School Leaving Certificate (SLC)",
        institution: "Shree Pushpanjali English Boarding High School",
        location: "Attariya, Kailali",
        graduationDate: "August 2020",
        details: "",
      },
    ],
    skills: [
      "Frontend: HTML5, CSS3, JavaScript, React.js, Redux/Context API, Tailwind CSS, TypeScript, Responsive Design, React Router, Hooks, Axios",
      "Backend: Node.js, Express.js, MongoDB, PostgreSQL, REST APIs, JWT Authentication",
      "Tools & Technologies: Git, GitHub, Visual Studio Code, Vercel",
      "Documentation & Design: Microsoft Word, Excel, PowerPoint, Google Docs, Confluence, Canva",
      "Other: Data Structures & Algorithms, Problem Solving, Agile Methodology",
    ],
    otherSkills: [
      "Good interpersonal, coordination, and communication skills",
      "Detail-oriented, with a focus on accurate, high-quality documentation",
      "Excellent time-management and organizational abilities",
      "Quick to adapt to new environments and work effectively in teams",
    ],
    projects: [],
    certifications: [],
    languages: [
      { id: createId("language"), name: "English", proficiency: "Professional" },
      { id: createId("language"), name: "Nepali", proficiency: "Native" },
    ],
    sectionOrder: [
      "personal",
      "summary",
      "education",
      "skills",
      "otherSkills",
      "experience",
      "languages",
      "projects",
      "certifications",
    ],
    hiddenSections: [],
    updatedAt: null,
  };
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function stringValue(value: unknown, fallback = ""): string {
  return typeof value === "string" ? value : fallback;
}

function entryList<T extends ResumeEntry>(
  value: unknown,
  createEntry: (entry: Record<string, unknown>, index: number) => T,
): T[] {
  return Array.isArray(value)
    ? value.filter(isRecord).map(createEntry)
    : [];
}

/**
 * Merges saved content with the current schema so an update cannot erase
 * unrelated resume sections when fields are added in a future release.
 */
export function normalizeResume(value: unknown): ResumeData {
  const defaults = createDefaultResume();
  if (!isRecord(value)) return defaults;

  const personal = isRecord(value.personal) ? value.personal : {};
  const savedSectionOrder = Array.isArray(value.sectionOrder)
    ? value.sectionOrder
    : [];
  const sectionOrder = savedSectionOrder.length
    ? [
        ...savedSectionOrder.filter((section): section is ResumeSectionId =>
          resumeSectionIds.includes(section as ResumeSectionId),
        ),
        ...resumeSectionIds.filter(
          (section) => !savedSectionOrder.includes(section),
        ),
      ]
    : defaults.sectionOrder;

  return {
    personal: {
      fullName: stringValue(personal.fullName, defaults.personal.fullName),
      title: stringValue(personal.title, defaults.personal.title),
      email: stringValue(personal.email, defaults.personal.email),
      phone: stringValue(personal.phone, defaults.personal.phone),
      location: stringValue(personal.location, defaults.personal.location),
      website: stringValue(personal.website),
      github: stringValue(personal.github),
      linkedin: stringValue(personal.linkedin),
    },
    summary: stringValue(value.summary, defaults.summary),
    experience: entryList(value.experience, (entry, index) => ({
      id: stringValue(entry.id, `experience-${index}`),
      role: stringValue(entry.role),
      company: stringValue(entry.company),
      location: stringValue(entry.location),
      startDate: stringValue(entry.startDate),
      endDate: stringValue(entry.endDate),
      highlights: stringValue(entry.highlights),
    })),
    education: entryList(value.education, (entry, index) => ({
      id: stringValue(entry.id, `education-${index}`),
      degree: stringValue(entry.degree),
      institution: stringValue(entry.institution),
      location: stringValue(entry.location),
      graduationDate: stringValue(entry.graduationDate),
      details: stringValue(entry.details),
    })),
    skills: Array.isArray(value.skills)
      ? value.skills.filter((skill): skill is string => typeof skill === "string")
      : defaults.skills,
    otherSkills: Array.isArray(value.otherSkills)
      ? value.otherSkills.filter(
          (skill): skill is string => typeof skill === "string",
        )
      : defaults.otherSkills,
    projects: entryList(value.projects, (entry, index) => ({
      id: stringValue(entry.id, `project-${index}`),
      name: stringValue(entry.name),
      link: stringValue(entry.link),
      description: stringValue(entry.description),
      technologies: stringValue(entry.technologies),
    })),
    certifications: entryList(value.certifications, (entry, index) => ({
      id: stringValue(entry.id, `certification-${index}`),
      name: stringValue(entry.name),
      issuer: stringValue(entry.issuer),
      date: stringValue(entry.date),
    })),
    languages: entryList(value.languages, (entry, index) => ({
      id: stringValue(entry.id, `language-${index}`),
      name: stringValue(entry.name),
      proficiency: stringValue(entry.proficiency),
    })),
    sectionOrder,
    hiddenSections: Array.isArray(value.hiddenSections)
      ? value.hiddenSections.filter((section): section is ResumeSectionId =>
          resumeSectionIds.includes(section as ResumeSectionId),
        )
      : [],
    updatedAt: stringValue(value.updatedAt) || null,
  };
}
