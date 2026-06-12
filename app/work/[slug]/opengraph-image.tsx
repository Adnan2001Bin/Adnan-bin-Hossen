import { getWorkProject } from "@/lib/work"
import { OG_CONTENT_TYPE, OG_SIZE, renderOgCard } from "@/lib/og"

export const size = OG_SIZE
export const contentType = OG_CONTENT_TYPE
export const alt = "Work — Adnan Bin Hossen"

export default async function Image({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const project = getWorkProject(slug)

  return renderOgCard({
    eyebrow: project ? `Work · ${project.category}` : "Work",
    title: project?.name ?? "Selected work",
  })
}
