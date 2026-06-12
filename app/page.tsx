import { getAllBlogPosts } from "@/lib/blog"
import { getAllWorkProjects } from "@/lib/work"
import { site } from "@/data/site"
import { PortfolioHome } from "@/components/portfolio-home"
import {
  organizationJsonLd,
  personJsonLd,
  webPageJsonLd,
  websiteJsonLd,
} from "@/lib/seo"

export default function Page() {
  const posts = getAllBlogPosts()
  const projects = getAllWorkProjects()
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      personJsonLd(),
      organizationJsonLd(),
      websiteJsonLd(),
      webPageJsonLd({
        path: "/",
        name: site.title,
        description: site.description,
        type: "ProfilePage",
      }),
    ],
  }

  return (
    <main id="main" className="snap-root">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <PortfolioHome posts={posts} projects={projects} />
    </main>
  )
}
