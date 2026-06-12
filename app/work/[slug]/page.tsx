import type { Metadata } from "next"
import Link from "next/link"
import { notFound } from "next/navigation"
import { MDXRemote } from "next-mdx-remote/rsc"

import { site } from "@/data/site"
import { getAllWorkProjects, getWorkProject } from "@/lib/work"
import { MotionFooter } from "@/components/motion-footer"
import { SiteIcon } from "@/components/site-icon"
import { ThemedImage } from "@/components/themed-image"
import {
  absoluteUrl,
  breadcrumbJsonLd,
  seoKeywords,
  webPageJsonLd,
} from "@/lib/seo"

export function generateStaticParams() {
  return getAllWorkProjects().map((project) => ({ slug: project.slug }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const project = getWorkProject(slug)

  if (!project) {
    return {}
  }

  return {
    title: project.seoTitle ?? project.name,
    description: project.seoDescription ?? project.summary,
    keywords: [...seoKeywords, ...project.stack, project.category],
    alternates: {
      canonical: `/work/${project.slug}`,
    },
    openGraph: {
      title: `${project.seoTitle ?? project.name} | ${site.name}`,
      description: project.seoDescription ?? project.summary,
      url: `/work/${project.slug}`,
      type: "article",
    },
  }
}

export default async function WorkPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const project = getWorkProject(slug)

  if (!project) {
    notFound()
  }

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      webPageJsonLd({
        path: `/work/${project.slug}`,
        name: project.name,
        description: project.summary,
      }),
      breadcrumbJsonLd([
        { name: "Home", path: "/" },
        { name: "Work", path: "/work" },
        { name: project.name, path: `/work/${project.slug}` },
      ]),
      {
        "@type": "CreativeWork",
        "@id": `${site.url}/work/${project.slug}#work`,
        name: project.name,
        description: project.summary,
        url: project.url ?? `${site.url}/work/${project.slug}`,
        creator: {
          "@id": `${site.url}/#person`,
        },
        image: absoluteUrl(project.image.light),
        keywords: project.stack.join(", "),
        mainEntityOfPage: {
          "@id": `${site.url}/work/${project.slug}#webpage`,
        },
      },
    ],
  }

  return (
    <main id="main" className="editorial-page">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <article className="article-layout">
        <header className="article-hero">
          <div className="article-hero-copy">
            <Link className="secondary-link article-back-link" href="/work">
              <SiteIcon name="arrowRight" size={17} /> Back to work
            </Link>
            <p className="eyebrow">
              {project.category} / {project.year}
            </p>
            <h1 className="section-title">{project.name}</h1>
            <p className="editorial-lede">{project.summary}</p>
          </div>
          <figure className="article-hero-image">
            <ThemedImage
              light={project.image.light}
              dark={project.image.dark}
              alt={project.image.alt}
              sizes="(min-width: 768px) 50rem, 92vw"
              priority
              className="blended-illustration"
            />
          </figure>
          <aside className="article-meta-panel">
            <div className="article-meta-item">
              <span>Category</span>
              <strong>{project.category}</strong>
            </div>
            <div className="article-meta-item">
              <span>Period</span>
              <strong>{project.year}</strong>
            </div>
            <div className="article-meta-item">
              <span>Reading time</span>
              <strong>{project.readingTime}</strong>
            </div>
            <div className="article-meta-item article-meta-item-wide">
              <span>Stack</span>
              <div className="editorial-tags">
                {project.stack.map((tool) => (
                  <em key={tool}>{tool}</em>
                ))}
              </div>
            </div>
            {project.url ? (
              <div className="article-meta-item">
                <span>Link</span>
                <a
                  className="primary-link"
                  href={project.url}
                  target="_blank"
                  rel="noreferrer"
                >
                  Visit project <SiteIcon name="arrowUpRight" size={17} />
                </a>
              </div>
            ) : null}
          </aside>
        </header>
        {project.metrics && project.metrics.length > 0 ? (
          <dl className="work-metrics" aria-label="Project highlights">
            {project.metrics.map((metric) => (
              <div className="work-metric" key={metric.label}>
                <dt className="sr-only">{metric.label}</dt>
                <dd>
                  <strong>{metric.value}</strong>
                  <span>{metric.label}</span>
                </dd>
              </div>
            ))}
          </dl>
        ) : null}
        <div className="article-body">
          <MDXRemote source={project.content} />
        </div>
      </article>
      <MotionFooter />
    </main>
  )
}
