import type { Metadata } from "next"
import Link from "next/link"

import { experience } from "@/data/experience"
import { profile } from "@/data/profile"
import { resume } from "@/data/resume"
import { site } from "@/data/site"
import { skillGroups } from "@/data/skills"
import { MotionFooter } from "@/components/motion-footer"
import { Reveal } from "@/components/reveal"
import { SiteIcon } from "@/components/site-icon"
import { breadcrumbJsonLd, personJsonLd, seoKeywords, webPageJsonLd } from "@/lib/seo"

export const metadata: Metadata = {
  title: "Resume",
  description: `${profile.name}'s resume: full-stack web development experience, skills, and education for web and mobile application work.`,
  keywords: [...seoKeywords, "resume", "CV", "portfolio"],
  alternates: {
    canonical: "/resume",
  },
  openGraph: {
    title: `Resume | ${site.name}`,
    description: `${profile.name}'s resume for full-stack web development work.`,
    url: "/resume",
    type: "profile",
  },
}

export default function ResumePage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      webPageJsonLd({
        path: "/resume",
        name: `${profile.name} Resume`,
        description: String(metadata.description),
        type: "ProfilePage",
      }),
      breadcrumbJsonLd([
        { name: "Home", path: "/" },
        { name: "Resume", path: "/resume" },
      ]),
      personJsonLd(),
    ],
  }

  return (
    <main id="main" className="editorial-page">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <section className="site-frame editorial-hero">
        <Reveal className="editorial-hero-copy">
          <p className="eyebrow">Resume</p>
          <h1 className="section-title">{profile.name}</h1>
          <p className="editorial-lede">{resume.headline}</p>
          <p className="editorial-lede">{resume.summary}</p>
          <p className="resume-contact">
            {profile.location} ·{" "}
            <a className="text-link" href={`mailto:${profile.email}`}>
              {profile.email}
            </a>
          </p>
          <div className="hero-actions">
            <a
              className="primary-link"
              href={resume.pdfPath}
              target="_blank"
              rel="noreferrer"
            >
              Download CV <SiteIcon name="arrowUpRight" size={17} />
            </a>
            <Link className="secondary-link" href="/#contact">
              Contact <SiteIcon name="arrowRight" size={17} />
            </Link>
          </div>
        </Reveal>
      </section>

      <section className="site-frame resume-section" aria-labelledby="resume-experience">
        <Reveal>
          <h2 id="resume-experience" className="resume-section-title">
            Experience
          </h2>
        </Reveal>
        <div className="resume-entry-list">
          {experience.map((item) => (
            <Reveal key={`${item.organization}-${item.role}-${item.start}`}>
              <article className="resume-entry">
                <div className="resume-entry-head">
                  <div>
                    <h3>{item.role}</h3>
                    <p className="resume-entry-org">
                      {item.url ? (
                        <a href={item.url} target="_blank" rel="noreferrer">
                          {item.organization}
                        </a>
                      ) : (
                        item.organization
                      )}
                      <span className="resume-entry-location">
                        {" "}
                        · {item.location}
                      </span>
                    </p>
                  </div>
                  <p className="resume-entry-period">
                    {item.start} – {item.end}
                  </p>
                </div>
                <ul className="resume-highlights">
                  {item.highlights.map((highlight) => (
                    <li key={highlight}>{highlight}</li>
                  ))}
                </ul>
              </article>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="site-frame resume-section" aria-labelledby="resume-skills">
        <Reveal>
          <h2 id="resume-skills" className="resume-section-title">
            Skills
          </h2>
        </Reveal>
        <div className="resume-skill-grid">
          {skillGroups.map((group) => (
            <Reveal key={group.category}>
              <article className="resume-skill-group">
                <h3>{group.category}</h3>
                <ul className="resume-skill-tags">
                  {group.skills.map((skill) => (
                    <li key={skill}>{skill}</li>
                  ))}
                </ul>
              </article>
            </Reveal>
          ))}
        </div>
      </section>

      {resume.education && resume.education.length > 0 ? (
        <section
          className="site-frame resume-section"
          aria-labelledby="resume-education"
        >
          <Reveal>
            <h2 id="resume-education" className="resume-section-title">
              Education
            </h2>
          </Reveal>
          <div className="resume-entry-list">
            {resume.education.map((entry) => (
              <Reveal key={entry.institution}>
                <article className="resume-entry">
                  <div className="resume-entry-head">
                    <div>
                      <h3>{entry.credential}</h3>
                      <p className="resume-entry-org">
                        {entry.url ? (
                          <a href={entry.url} target="_blank" rel="noreferrer">
                            {entry.institution}
                          </a>
                        ) : (
                          entry.institution
                        )}
                        <span className="resume-entry-location">
                          {" "}
                          · {entry.location}
                        </span>
                      </p>
                    </div>
                    <p className="resume-entry-period">
                      {entry.start} – {entry.end}
                    </p>
                  </div>
                  <ul className="resume-highlights">
                    {entry.highlights.map((highlight) => (
                      <li key={highlight}>{highlight}</li>
                    ))}
                  </ul>
                </article>
              </Reveal>
            ))}
          </div>
        </section>
      ) : null}

      {resume.languages && resume.languages.length > 0 ? (
        <section
          className="site-frame resume-section"
          aria-labelledby="resume-languages"
        >
          <Reveal>
            <h2 id="resume-languages" className="resume-section-title">
              Languages
            </h2>
          </Reveal>
          <Reveal>
            <ul className="resume-language-list">
              {resume.languages.map((language) => (
                <li key={language.name}>
                  <strong>{language.name}</strong>
                  <span>{language.proficiency}</span>
                </li>
              ))}
            </ul>
          </Reveal>
        </section>
      ) : null}

      <MotionFooter />
    </main>
  )
}
