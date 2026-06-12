import { getBlogPost } from "@/lib/blog"
import { OG_CONTENT_TYPE, OG_SIZE, renderOgCard } from "@/lib/og"

export const size = OG_SIZE
export const contentType = OG_CONTENT_TYPE
export const alt = "Blog post — Adnan Bin Hossen"

export default async function Image({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const post = getBlogPost(slug)

  return renderOgCard({
    eyebrow: post ? post.tags.slice(0, 2).join(" · ") || "Blog" : "Blog",
    title: post?.title ?? "Field notes",
  })
}
