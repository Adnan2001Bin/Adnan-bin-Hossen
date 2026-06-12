import type { Metadata } from "next"
import Link from "next/link"
import { notFound } from "next/navigation"
import { MDXRemote } from "next-mdx-remote/rsc"

import { profile } from "@/data/profile"
import { site } from "@/data/site"
import { getAllBlogPosts, getBlogPost } from "@/lib/blog"
import { MotionFooter } from "@/components/motion-footer"
import { SiteIcon } from "@/components/site-icon"
import {
  absoluteUrl,
  breadcrumbJsonLd,
  organizationJsonLd,
  seoKeywords,
  webPageJsonLd,
} from "@/lib/seo"

export function generateStaticParams() {
  return getAllBlogPosts().map((post) => ({ slug: post.slug }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const post = getBlogPost(slug)

  if (!post) {
    return {}
  }

  return {
    title: post.seoTitle ?? post.title,
    description: post.seoDescription ?? post.excerpt,
    keywords: [...seoKeywords, ...post.tags],
    alternates: {
      canonical: `/blog/${post.slug}`,
    },
    openGraph: {
      type: "article",
      title: post.seoTitle ?? post.title,
      description: post.seoDescription ?? post.excerpt,
      url: `/blog/${post.slug}`,
      publishedTime: post.date,
      modifiedTime: post.updatedAt ?? post.date,
      authors: [profile.name],
      tags: post.tags,
    },
    twitter: {
      card: "summary_large_image",
      title: post.seoTitle ?? post.title,
      description: post.seoDescription ?? post.excerpt,
    },
  }
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const post = getBlogPost(slug)

  if (!post) {
    notFound()
  }

  const wordCount = post.content.trim().split(/\s+/).filter(Boolean).length

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      organizationJsonLd(),
      webPageJsonLd({
        path: `/blog/${post.slug}`,
        name: post.title,
        description: post.excerpt,
      }),
      breadcrumbJsonLd([
        { name: "Home", path: "/" },
        { name: "Blog", path: "/blog" },
        { name: post.title, path: `/blog/${post.slug}` },
      ]),
      {
        "@type": "BlogPosting",
        "@id": `${site.url}/blog/${post.slug}#article`,
        headline: post.title,
        description: post.excerpt,
        image: absoluteUrl(post.image.light),
        datePublished: post.date,
        dateModified: post.updatedAt ?? post.date,
        keywords: post.tags.join(", "),
        articleSection: post.tags[0],
        wordCount,
        inLanguage: "en",
        author: {
          "@id": `${site.url}/#person`,
        },
        publisher: {
          "@id": `${site.url}/#brand`,
        },
        mainEntityOfPage: {
          "@id": `${site.url}/blog/${post.slug}#webpage`,
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
            <Link className="secondary-link article-back-link" href="/blog">
              <SiteIcon name="arrowRight" size={17} /> Back to blog
            </Link>
            <p className="eyebrow">{post.tags.join(" / ")}</p>
            <h1 className="section-title">{post.title}</h1>
            <p className="editorial-lede">{post.excerpt}</p>
          </div>
          <aside className="article-meta-panel">
            <div className="article-meta-item">
              <span>Published</span>
              <strong>
                {new Date(post.date).toLocaleDateString("en", {
                  month: "long",
                  day: "numeric",
                  year: "numeric",
                })}
              </strong>
            </div>
            <div className="article-meta-item">
              <span>Reading time</span>
              <strong>{post.readingTime}</strong>
            </div>
            <div className="article-meta-item">
              <span>Tags</span>
              <div className="editorial-tags">
                {post.tags.map((tag) => (
                  <em key={tag}>{tag}</em>
                ))}
              </div>
            </div>
          </aside>
        </header>
        <div className="article-body">
          <MDXRemote source={post.content} />
        </div>
      </article>
      <MotionFooter />
    </main>
  )
}
