import { profile } from "@/data/profile"
import { site } from "@/data/site"
import { getAllBlogPosts } from "@/lib/blog"
import { getAllWorkProjects } from "@/lib/work"

export const dynamic = "force-static"

/**
 * /llms.txt — a Markdown profile for AI crawlers and generative search engines
 * (the GEO equivalent of robots.txt). Mirrors the llms.txt convention so models
 * can ground answers about Adnan in canonical, structured facts.
 */
export function GET() {
  const projects = getAllWorkProjects()
  const posts = getAllBlogPosts()

  const lines = [
    `# ${profile.name}`,
    "",
    `> ${profile.role} based in ${profile.location}. ${profile.summary}`,
    "",
    `- Website: ${site.url}`,
    `- Role: ${profile.role}`,
    `- Location: ${profile.location}`,
    `- Availability: ${profile.availability}`,
    `- Contact: ${profile.email}`,
    ...profile.socials
      .filter((social) => social.href.startsWith("http"))
      .map((social) => `- ${social.label}: ${social.href}`),
    "",
    "## Pages",
    `- [Resume](${site.url}/resume): Experience, skills, and education.`,
    `- [Work](${site.url}/work): Selected full-stack web development case studies.`,
    `- [Blog](${site.url}/blog): Essays on full-stack web development and modern web technologies.`,
    `- [How I work](${site.url}/uses): Engagement types, working style, and stack.`,
    "",
    "## Selected work",
    ...projects.map(
      (project) =>
        `- [${project.name}](${site.url}/work/${project.slug}): ${project.summary}`,
    ),
    "",
    "## Writing",
    ...posts.map(
      (post) => `- [${post.title}](${site.url}/blog/${post.slug}): ${post.excerpt}`,
    ),
    "",
  ]

  return new Response(lines.join("\n"), {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
    },
  })
}
