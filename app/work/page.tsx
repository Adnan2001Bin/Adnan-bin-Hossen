import type { Metadata } from "next"
import Link from "next/link"

import { site } from "@/data/site"
import { getAllWorkProjects } from "@/lib/work"
import { MotionFooter } from "@/components/motion-footer"
import { Reveal } from "@/components/reveal"
import { SiteIcon } from "@/components/site-icon"
import { ThemedImage } from "@/components/themed-image"
import { breadcrumbJsonLd, seoKeywords, webPageJsonLd } from "@/lib/seo"

export const metadata: Metadata = {
  title: "Work",
  description:
    "Selected full-stack web development projects by Adnan Bin Hossen, including school management, e-commerce, and productivity applications.",
  keywords: [...seoKeywords, "AI portfolio", "backend case studies"],
  alternates: {
    canonical: "/work",
  },
  openGraph: {
    title: `Work | ${site.name}`,
    description:
      "Selected full-stack web development projects by Adnan Bin Hossen.",
    url: "/work",
    type: "website",
  },
}

export default function WorkIndexPage() {
  const projects = getAllWorkProjects()

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      webPageJsonLd({
        path: "/work",
        name: `${site.name} Work`,
        description: String(metadata.description),
        type: "CollectionPage",
      }),
      breadcrumbJsonLd([
        { name: "Home", path: "/" },
        { name: "Work", path: "/work" },
      ]),
      ...projects.map((project) => ({
        "@type": "CreativeWork",
        name: project.name,
        url: `${site.url}/work/${project.slug}`,
        description: project.summary,
        keywords: project.stack.join(", "),
        creator: {
          "@id": `${site.url}/#person`,
        },
      })),
    ],
  }

  return (
    <main id="main" className="editorial-page">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <section className="site-frame editorial-hero editorial-hero-work">
        <Reveal className="editorial-hero-copy">
          <p className="eyebrow">Work</p>
          <h1 className="section-title">
            Projects that ship end to end
          </h1>
          <p className="editorial-lede">
            Selected full-stack web development work, from school management
            systems to e-commerce platforms and productivity dashboards.
          </p>
        </Reveal>
        <Reveal className="editorial-hero-art" delay={0.08} data-parallax="-3">
          <ThemedImage
            light="/images/new/desk-light.png"
            dark="/images/new/desk-dark.png"
            alt="Risograph illustration of Adnan Bin Hossen working at a laptop."
            sizes="(min-width: 1024px) 30vw, 86vw"
            priority
            className="blended-illustration"
          />
        </Reveal>
      </section>

      <section
        className="site-frame editorial-index"
        aria-label="Selected work"
      >
        <div className="editorial-card-list">
          {projects.map((project, index) => (
            <Reveal key={project.slug} delay={index * 0.04}>
              <Link href={`/work/${project.slug}`} className="editorial-card">
                <span className="editorial-card-index">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <div className="editorial-card-copy">
                  <p className="editorial-card-meta">
                    {project.category} / {project.year}
                  </p>
                  <h2>{project.name}</h2>
                  <p>{project.summary}</p>
                  <div className="editorial-tags">
                    {project.stack.slice(0, 5).map((tool) => (
                      <span key={tool}>{tool}</span>
                    ))}
                  </div>
                </div>
                <SiteIcon name="arrowUpRight" size={24} />
              </Link>
            </Reveal>
          ))}
        </div>
      </section>
      <MotionFooter />
    </main>
  )
}
