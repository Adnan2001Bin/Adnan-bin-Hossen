import Link from "next/link"

import { SiteIcon } from "@/components/site-icon"
import { ThemedImage } from "@/components/themed-image"

export default function NotFound() {
  return (
    <main id="main" className="px-4 pb-24 pt-32 sm:px-6 lg:px-10">
      <section className="section-shell grid min-h-[70svh] items-center gap-10 lg:grid-cols-[0.9fr_1fr]">
        <div>
          <p className="eyebrow">404</p>
          <h1 className="section-title mt-4">This page slipped out of frame</h1>
          <p className="mt-7 max-w-xl text-lg leading-9 text-muted-foreground">
            The route you requested does not exist, or it moved while the ink
            was still drying.
          </p>
          <Link className="primary-link mt-8" href="/">
            Return home <SiteIcon name="arrowRight" size={17} />
          </Link>
        </div>
        <div className="relative aspect-square">
          <ThemedImage
            light="/images/new/404-light.png"
            dark="/images/new/404-dark.png"
            alt="Risograph 404 illustration."
            sizes="(min-width: 1024px) 42vw, 92vw"
            priority
            className="blended-illustration"
          />
        </div>
      </section>
    </main>
  )
}
