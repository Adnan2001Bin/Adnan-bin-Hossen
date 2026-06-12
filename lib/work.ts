import fs from "node:fs"
import path from "node:path"
import matter from "gray-matter"
import readingTime from "reading-time"

import type { WorkMeta } from "@/lib/types"

const WORK_DIR = path.join(process.cwd(), "content", "work")

const DEFAULT_WORK_IMAGE = {
  light: "/images/blended/code-light.avif",
  dark: "/images/blended/code.avif",
  alt: "Risograph illustration of connected code, browser, and API shapes.",
}

export type WorkProject = WorkMeta & {
  content: string
  readingTime: string
}

type FrontMatter = Omit<WorkMeta, "slug" | "image"> & {
  image?: WorkMeta["image"]
}

type WorkReadOptions = {
  includeDrafts?: boolean
}

function assertFrontMatter(
  data: Record<string, unknown>,
  slug: string
): FrontMatter {
  const required = ["name", "category", "year", "summary", "stack"] as const

  for (const key of required) {
    if (!data[key]) {
      throw new Error(`Missing "${key}" front matter in work project "${slug}"`)
    }
  }

  if (!Array.isArray(data.stack)) {
    throw new Error(
      `Front matter "stack" must be an array in work project "${slug}"`
    )
  }

  return data as FrontMatter
}

export function getWorkSlugs() {
  return fs
    .readdirSync(WORK_DIR)
    .filter((file) => file.endsWith(".mdx"))
    .map((file) => file.replace(/\.mdx$/, ""))
}

export function getWorkProject(
  slug: string,
  options: WorkReadOptions = {},
): WorkProject | null {
  const filePath = path.join(WORK_DIR, `${slug}.mdx`)

  if (!fs.existsSync(filePath)) {
    return null
  }

  const source = fs.readFileSync(filePath, "utf8")
  const { content, data } = matter(source)
  const meta = assertFrontMatter(data, slug)

  const project = {
    slug,
    ...meta,
    status: meta.status ?? "published",
    image: meta.image ?? DEFAULT_WORK_IMAGE,
    content,
    readingTime: readingTime(content).text,
  }

  if (!options.includeDrafts && project.status !== "published") {
    return null
  }

  return project
}

export function getAllWorkProjects(options: WorkReadOptions = {}): WorkProject[] {
  return getWorkSlugs()
    .map((slug) => getWorkProject(slug, options))
    .filter((project): project is WorkProject => Boolean(project))
    .sort((a, b) => {
      if (a.order && b.order) {
        return a.order - b.order
      }

      if (a.order) {
        return -1
      }

      if (b.order) {
        return 1
      }

      return Number(b.year.split("-")[0]) - Number(a.year.split("-")[0])
    })
}
