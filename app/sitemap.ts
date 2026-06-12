import type { MetadataRoute } from "next"

import { site } from "@/data/site"
import { getAllBlogPosts, getAllBlogTags } from "@/lib/blog"
import { getAllWorkProjects } from "@/lib/work"

const BASE_CONTENT_DATE = new Date("2026-02-18")

function newestDate(dates: Date[]) {
  return new Date(Math.max(...dates.map((date) => date.getTime())))
}

function dateFromWorkYear(year: string) {
  const years = year.match(/\d{4}/g)?.map(Number) ?? []
  const newestYear = Math.max(...years, BASE_CONTENT_DATE.getUTCFullYear())

  return new Date(`${newestYear}-01-01`)
}

export default function sitemap(): MetadataRoute.Sitemap {
  const posts = getAllBlogPosts()
  const tags = getAllBlogTags()
  const projects = getAllWorkProjects()
  const postDates = posts.map((post) => new Date(post.updatedAt ?? post.date))
  const projectDates = projects.map((project) => dateFromWorkYear(project.year))
  const latestBlogDate = newestDate([BASE_CONTENT_DATE, ...postDates])
  const latestWorkDate = newestDate([BASE_CONTENT_DATE, ...projectDates])
  const latestSiteDate = newestDate([latestBlogDate, latestWorkDate])

  return [
    {
      url: site.url,
      lastModified: latestSiteDate,
      changeFrequency: "monthly",
      priority: 1,
    },
    {
      url: `${site.url}/blog`,
      lastModified: latestBlogDate,
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${site.url}/work`,
      lastModified: latestWorkDate,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${site.url}/resume`,
      lastModified: latestSiteDate,
      changeFrequency: "monthly",
      priority: 0.65,
    },
    {
      url: `${site.url}/uses`,
      lastModified: latestSiteDate,
      changeFrequency: "monthly",
      priority: 0.55,
    },
    ...posts.map((post) => ({
      url: `${site.url}/blog/${post.slug}`,
      lastModified: new Date(post.updatedAt ?? post.date),
      changeFrequency: "monthly" as const,
      priority: 0.7,
    })),
    ...tags.map((tag) => ({
      url: `${site.url}/blog/tags/${tag.slug}`,
      lastModified: newestDate([
        BASE_CONTENT_DATE,
        ...posts
          .filter((post) => post.tags.includes(tag.label))
          .map((post) => new Date(post.updatedAt ?? post.date)),
      ]),
      changeFrequency: "weekly" as const,
      priority: 0.55,
    })),
    ...projects.map((project) => ({
      url: `${site.url}/work/${project.slug}`,
      lastModified: dateFromWorkYear(project.year),
      changeFrequency: "monthly" as const,
      priority: 0.75,
    })),
  ]
}
