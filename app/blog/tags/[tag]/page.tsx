import type { Metadata } from "next"
import Link from "next/link"
import { notFound } from "next/navigation"

import { site } from "@/data/site"
import { getAllBlogTags, getBlogPostsByTag } from "@/lib/blog"
import { MotionFooter } from "@/components/motion-footer"
import { Reveal } from "@/components/reveal"
import { SiteIcon } from "@/components/site-icon"
import { breadcrumbJsonLd, seoKeywords, webPageJsonLd } from "@/lib/seo"

export function generateStaticParams() {
  return getAllBlogTags().map((tag) => ({ tag: tag.slug }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ tag: string }>
}): Promise<Metadata> {
  const { tag } = await params
  const tagMeta = getAllBlogTags().find((item) => item.slug === tag)

  if (!tagMeta) {
    return {}
  }

  return {
    title: `${tagMeta.label} Articles`,
    description: `Writing by ${site.name} tagged ${tagMeta.label}.`,
    keywords: [...seoKeywords, tagMeta.label],
    alternates: {
      canonical: `/blog/tags/${tagMeta.slug}`,
    },
    openGraph: {
      title: `${tagMeta.label} Articles | ${site.name}`,
      description: `Writing by ${site.name} tagged ${tagMeta.label}.`,
      url: `/blog/tags/${tagMeta.slug}`,
      type: "website",
    },
  }
}

export default async function BlogTagPage({
  params,
}: {
  params: Promise<{ tag: string }>
}) {
  const { tag } = await params
  const tagMeta = getAllBlogTags().find((item) => item.slug === tag)
  const posts = getBlogPostsByTag(tag)

  if (!tagMeta || posts.length === 0) {
    notFound()
  }

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      webPageJsonLd({
        path: `/blog/tags/${tagMeta.slug}`,
        name: `${tagMeta.label} Articles`,
        description: `Writing by ${site.name} tagged ${tagMeta.label}.`,
        type: "CollectionPage",
      }),
      breadcrumbJsonLd([
        { name: "Home", path: "/" },
        { name: "Blog", path: "/blog" },
        { name: tagMeta.label, path: `/blog/tags/${tagMeta.slug}` },
      ]),
      ...posts.map((post) => ({
        "@type": "BlogPosting",
        headline: post.title,
        url: `${site.url}/blog/${post.slug}`,
        datePublished: post.date,
        dateModified: post.updatedAt ?? post.date,
        description: post.excerpt,
        author: {
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
      <section className="site-frame editorial-hero editorial-hero-blog">
        <Reveal className="editorial-hero-copy">
          <Link className="secondary-link article-back-link" href="/blog">
            <SiteIcon name="arrowRight" size={17} /> Back to blog
          </Link>
          <p className="eyebrow">Blog tag</p>
          <h1 className="section-title">{tagMeta.label}</h1>
          <p className="editorial-lede">
            {posts.length} article{posts.length === 1 ? "" : "s"} about{" "}
            {tagMeta.label.toLowerCase()}.
          </p>
        </Reveal>
      </section>

      <section className="site-frame editorial-index" aria-label="Tagged posts">
        <div className="editorial-card-list">
          {posts.map((post, index) => (
            <Reveal key={post.slug} delay={index * 0.04}>
              <Link href={`/blog/${post.slug}`} className="editorial-card">
                <span className="editorial-card-index">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <div className="editorial-card-copy">
                  <p className="editorial-card-meta">
                    {new Date(post.date).toLocaleDateString("en", {
                      month: "short",
                      day: "numeric",
                      year: "numeric",
                    })}{" "}
                    / {post.readingTime}
                  </p>
                  <h2>{post.title}</h2>
                  <p>{post.excerpt}</p>
                  <div className="editorial-tags">
                    {post.tags.map((postTag) => (
                      <span key={postTag}>{postTag}</span>
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
