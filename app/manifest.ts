import type { MetadataRoute } from "next"

import { site } from "@/data/site"
import { defaultSocialImage } from "@/lib/seo"

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: site.title,
    short_name: site.name,
    description: site.description,
    start_url: "/",
    scope: "/",
    display: "standalone",
    background_color: "#faf7ef",
    theme_color: "#111111",
    icons: [
      {
        src: "/boy.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "any",
      },
      {
        src: defaultSocialImage,
        sizes: "1100x1100",
        type: "image/avif",
        purpose: "any",
      },
    ],
  }
}
