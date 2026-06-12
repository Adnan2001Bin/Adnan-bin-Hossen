import type { Metadata } from "next"
import Link from "next/link"

import { site } from "@/data/site"
import { getAllBlogPosts } from "@/lib/blog"
import { MotionFooter } from "@/components/motion-footer"
import { Reveal } from "@/components/reveal"
import { SiteIcon } from "@/components/site-icon"
import { ThemedImage } from "@/components/themed-image"
import { breadcrumbJsonLd, seoKeywords, webPageJsonLd } from "@/lib/seo"

export const metadata: Metadata = {
  title: "Blog",
  description:
    "Writing by Adnan Bin Hossen about full-stack web development, React, Node.js, and modern web technologies.",
  keywords: [...seoKeywords, "backend blog", "AI search writing", "RAG"],
  alternates: {
    canonical: "/blog",
  },
  openGraph: {
    title: `Blog | ${site.name}`,
    description:
      "Writing about backend systems, AI-native search, RAG, automation, and production workflow engineering.",
    url: "/blog",
    type: "website",
  },
}

export default function BlogPage() {
  const posts = getAllBlogPosts()
  const featuredPost = posts[0]
  const remainingPosts = posts.slice(1)

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      webPageJsonLd({
        path: "/blog",
        name: `${site.name} Blog`,
        description: String(metadata.description),
        type: "Blog",
      }),
      breadcrumbJsonLd([
        { name: "Home", path: "/" },
        { name: "Blog", path: "/blog" },
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
          <p className="eyebrow">Blog</p>
          <h1 className="section-title">
            Field notes for backend-heavy products
          </h1>
          <p className="editorial-lede">
            Essays on AI systems, search APIs, workflow products, and the
            engineering decisions that keep product-critical loops reliable.
          </p>
        </Reveal>
        <Reveal className="editorial-hero-art" delay={0.08} data-parallax="-3">
          <ThemedImage
            light="/images/new/blog-light.png"
            dark="/images/new/blog-dark.png"
            alt="Risograph illustration of books and reading notes."
            sizes="(min-width: 1024px) 30vw, 86vw"
            priority
            className="blended-illustration"
          />
        </Reveal>
      </section>

      <section className="site-frame editorial-index" aria-label="Blog posts">
        {featuredPost ? (
          <Reveal>
            <Link
              href={`/blog/${featuredPost.slug}`}
              className="editorial-feature-card"
            >
              <div className="editorial-feature-image" aria-hidden="true">
                <ThemedImage
                  light={featuredPost.image.light}
                  dark={featuredPost.image.dark}
                  alt=""
                  sizes="(min-width: 1024px) 18vw, 56vw"
                  className="blended-illustration"
                />
              </div>
              <div className="editorial-card-copy">
                <p className="editorial-card-meta">
                  {new Date(featuredPost.date).toLocaleDateString("en", {
                    month: "short",
                    day: "numeric",
                    year: "numeric",
                  })}{" "}
                  / {featuredPost.readingTime}
                </p>
                <h2>{featuredPost.title}</h2>
                <p>{featuredPost.excerpt}</p>
                <div className="editorial-tags">
                  {featuredPost.tags.map((tag) => (
                    <span key={tag}>{tag}</span>
                  ))}
                </div>
              </div>
              <SiteIcon name="arrowUpRight" size={24} />
            </Link>
          </Reveal>
        ) : null}

        <div className="editorial-card-list">
          {remainingPosts.map((post, index) => (
            <Reveal key={post.slug} delay={index * 0.04}>
              <Link href={`/blog/${post.slug}`} className="editorial-card">
                <span className="editorial-card-index">
                  {String(index + 2).padStart(2, "0")}
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
                    {post.tags.map((tag) => (
                      <span key={tag}>{tag}</span>
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
