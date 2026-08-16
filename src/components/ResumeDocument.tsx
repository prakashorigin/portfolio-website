import {
  resumeSectionLabels,
  type ResumeData,
  type ResumeSectionId,
} from "@/data/resume";

function PreviewSection({
  resume,
  section,
}: {
  resume: ResumeData;
  section: ResumeSectionId;
}) {
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
                    {[entry.startDate, entry.endDate].filter(Boolean).join(" – ")}
                  </span>
                </div>
                <div className="resume-entry-meta">
                  {[entry.company, entry.location].filter(Boolean).join(" | ")}
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
                  {[entry.institution, entry.location].filter(Boolean).join(" | ")}
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
              .map((entry) =>
                [entry.name, entry.proficiency].filter(Boolean).join(" (") +
                (entry.proficiency ? ")" : ""),
              )
              .join(" • ")}
          </p>
        </section>
      ) : null;
  }
}

export default function ResumeDocument({ resume }: { resume: ResumeData }) {
  const visibleSections = resume.sectionOrder.filter(
    (section) => !resume.hiddenSections.includes(section),
  );

  return (
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
          <PreviewSection key={section} resume={resume} section={section} />
        ))}
      </div>
    </article>
  );
}
