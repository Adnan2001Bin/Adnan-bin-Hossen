import { getAllBlogPosts } from "@/lib/blog"
import { profile } from "@/data/profile"
import { site } from "@/data/site"

export const dynamic = "force-static"

function escapeXml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;")
}

export function GET() {
  const posts = getAllBlogPosts()
  const updated =
    posts[0]?.updatedAt ?? posts[0]?.date ?? new Date().toISOString()

  const feed = `<?xml version="1.0" encoding="UTF-8"?>
<feed xmlns="http://www.w3.org/2005/Atom">
  <id>${escapeXml(site.url)}/blog</id>
  <title>${escapeXml(site.name)} Blog</title>
  <subtitle>${escapeXml(site.description)}</subtitle>
  <updated>${new Date(updated).toISOString()}</updated>
  <link href="${escapeXml(site.url)}/blog" />
  <link href="${escapeXml(site.url)}/feed.xml" rel="self" type="application/atom+xml" />
  <author>
    <name>${escapeXml(profile.name)}</name>
    <email>${escapeXml(profile.email)}</email>
  </author>
  ${posts
    .map((post) => {
      const url = `${site.url}/blog/${post.slug}`
      const updatedAt = new Date(post.updatedAt ?? post.date).toISOString()

      return `<entry>
    <id>${escapeXml(url)}</id>
    <title>${escapeXml(post.title)}</title>
    <summary>${escapeXml(post.excerpt)}</summary>
    <published>${new Date(post.date).toISOString()}</published>
    <updated>${updatedAt}</updated>
    <link href="${escapeXml(url)}" />
    ${post.tags.map((tag) => `<category term="${escapeXml(tag)}" />`).join("\n    ")}
  </entry>`
    })
    .join("\n  ")}
</feed>`

  return new Response(feed, {
    headers: {
      "Content-Type": "application/atom+xml; charset=utf-8",
      "Cache-Control": "public, max-age=0, s-maxage=3600",
    },
  })
}
