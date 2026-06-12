import { OG_CONTENT_TYPE, OG_SIZE, renderOgCard } from "@/lib/og"

export const size = OG_SIZE
export const contentType = OG_CONTENT_TYPE
export const alt = "Resume — Adnan Bin Hossen"

export default function Image() {
  return renderOgCard({
    eyebrow: "Resume",
    title: "Backend & AI systems engineer — experience and skills",
  })
}
