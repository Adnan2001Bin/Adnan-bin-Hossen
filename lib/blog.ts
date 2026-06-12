import fs from "node:fs"
import path from "node:path"
import matter from "gray-matter"
import readingTime from "reading-time"

import type { BlogMeta } from "@/lib/types"

const BLOG_DIR = path.join(process.cwd(), "content", "blog")

export type BlogPost = BlogMeta & {
  content: string
}

type FrontMatter = Omit<BlogMeta, "slug" | "readingTime">

type BlogReadOptions = {
  includeDrafts?: boolean
}

function assertFrontMatter(data: Record<string, unknown>, slug: string): FrontMatter {
  const required = ["title", "date", "excerpt", "tags", "image"] as const

  for (const key of required) {
    if (!data[key]) {
      throw new Error(`Missing "${key}" front matter in blog post "${slug}"`)
    }
  }

  return data as FrontMatter
}

export function getBlogSlugs() {
  return fs
    .readdirSync(BLOG_DIR)
    .filter((file) => file.endsWith(".mdx"))
    .map((file) => file.replace(/\.mdx$/, ""))
}

export function getTagSlug(tag: string) {
  return tag
    .toLowerCase()
    .replace(/&/g, "and")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "")
}

export function getBlogPost(
  slug: string,
  options: BlogReadOptions = {},
): BlogPost | null {
  const filePath = path.join(BLOG_DIR, `${slug}.mdx`)

  if (!fs.existsSync(filePath)) {
    return null
  }

  const source = fs.readFileSync(filePath, "utf8")
  const { content, data } = matter(source)
  const meta = assertFrontMatter(data, slug)

  const post = {
    slug,
    ...meta,
    status: meta.status ?? "published",
    content,
    readingTime: readingTime(content).text,
  }

  if (!options.includeDrafts && post.status !== "published") {
    return null
  }

  return post
}

export function getAllBlogPosts(options: BlogReadOptions = {}): BlogPost[] {
  return getBlogSlugs()
    .map((slug) => getBlogPost(slug, options))
    .filter((post): post is BlogPost => Boolean(post))
    .sort((a, b) => Number(new Date(b.date)) - Number(new Date(a.date)))
}

export function getAllBlogTags() {
  const tags = new Map<string, { label: string; slug: string; count: number }>()

  for (const post of getAllBlogPosts()) {
    for (const tag of post.tags) {
      const slug = getTagSlug(tag)
      const current = tags.get(slug)

      tags.set(slug, {
        label: current?.label ?? tag,
        slug,
        count: (current?.count ?? 0) + 1,
      })
    }
  }

  return Array.from(tags.values()).sort((a, b) => a.label.localeCompare(b.label))
}

export function getBlogPostsByTag(tagSlug: string) {
  return getAllBlogPosts().filter((post) =>
    post.tags.some((tag) => getTagSlug(tag) === tagSlug),
  )
}
