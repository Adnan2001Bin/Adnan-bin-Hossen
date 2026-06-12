import { ImageResponse } from "next/og"

import { profile } from "@/data/profile"
import { site } from "@/data/site"

export const OG_SIZE = { width: 1200, height: 630 }
export const OG_CONTENT_TYPE = "image/png"

/**
 * Shared branded social card used by the file-based `opengraph-image` routes.
 * Renders a title-bearing card (eyebrow + title) so each page gets a distinct,
 * informative preview instead of sharing one static portrait.
 */
export function renderOgCard({
  eyebrow,
  title,
}: {
  eyebrow: string
  title: string
}) {
  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "80px",
          backgroundColor: "#faf7ef",
          backgroundImage:
            "radial-gradient(circle at 88% 12%, rgba(120,86,255,0.16), transparent 42%), radial-gradient(circle at 8% 92%, rgba(255,118,86,0.14), transparent 40%)",
          color: "#111111",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{
              fontSize: 26,
              letterSpacing: 6,
              textTransform: "uppercase",
              color: "#7856ff",
              fontWeight: 700,
            }}
          >
            {eyebrow}
          </div>
          <div
            style={{
              marginTop: 28,
              fontSize: 70,
              lineHeight: 1.08,
              fontWeight: 800,
              maxWidth: 980,
              letterSpacing: -1,
            }}
          >
            {title}
          </div>
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-end",
            fontSize: 30,
          }}
        >
          <div style={{ display: "flex", flexDirection: "column" }}>
            <span style={{ fontWeight: 700 }}>{profile.name}</span>
            <span style={{ color: "#555", fontSize: 24 }}>{profile.role}</span>
          </div>
          <span style={{ color: "#7856ff", fontWeight: 700 }}>
            {site.domain}
          </span>
        </div>
      </div>
    ),
    { ...OG_SIZE },
  )
}
