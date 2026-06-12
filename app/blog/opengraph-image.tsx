import { OG_CONTENT_TYPE, OG_SIZE, renderOgCard } from "@/lib/og"

export const size = OG_SIZE
export const contentType = OG_CONTENT_TYPE
export const alt = "Blog — Adnan Bin Hossen"

export default function Image() {
  return renderOgCard({
    eyebrow: "Blog",
    title: "Field notes for backend-heavy products",
  })
}
