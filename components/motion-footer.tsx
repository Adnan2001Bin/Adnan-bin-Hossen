"use client"

import { useEffect, useRef, type ReactNode } from "react"

import { profile } from "@/data/profile"
import { SiteIcon } from "@/components/site-icon"

const marqueeItems = [
  "Full-stack development",
  "Web applications",
  "React & Next.js",
  "User-centric design",
]

function MagneticAnchor({
  children,
  className,
  href,
  target,
  rel,
}: {
  children: ReactNode
  className: string
  href: string
  target?: string
  rel?: string
}) {
  const ref = useRef<HTMLAnchorElement>(null)

  useEffect(() => {
    const element = ref.current
    let cancelled = false
    let cleanupListeners: (() => void) | undefined

    if (
      !element ||
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      return
    }

    const anchor = element

    async function setupMagneticAnchor() {
      const { gsap } = await import("gsap")

      if (cancelled) {
        return
      }

      const handleMove = (event: MouseEvent) => {
        const rect = anchor.getBoundingClientRect()
        const x = event.clientX - rect.left - rect.width / 2
        const y = event.clientY - rect.top - rect.height / 2

        gsap.to(anchor, {
          x: x * 0.22,
          y: y * 0.22,
          scale: 1.04,
          duration: 0.35,
          ease: "power2.out",
        })
      }

      const handleLeave = () => {
        gsap.to(anchor, {
          x: 0,
          y: 0,
          scale: 1,
          duration: 0.8,
          ease: "elastic.out(1, 0.35)",
        })
      }

      anchor.addEventListener("mousemove", handleMove)
      anchor.addEventListener("mouseleave", handleLeave)

      cleanupListeners = () => {
        anchor.removeEventListener("mousemove", handleMove)
        anchor.removeEventListener("mouseleave", handleLeave)
      }
    }

    void setupMagneticAnchor()

    return () => {
      cancelled = true
      cleanupListeners?.()
    }
  }, [])

  return (
    <a ref={ref} className={className} href={href} target={target} rel={rel}>
      {children}
    </a>
  )
}

export function MotionFooter() {
  const sectionRef = useRef<HTMLElement>(null)
  const giantTextRef = useRef<HTMLDivElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const section = sectionRef.current
    const giantText = giantTextRef.current
    const content = contentRef.current
    let cleanupAnimations: (() => void) | undefined
    let cancelled = false

    if (
      !section ||
      !giantText ||
      !content ||
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      return
    }

    const sectionElement = section
    const giantTextElement = giantText
    const contentElement = content

    async function setupFooterAnimations() {
      const [{ gsap }, { ScrollTrigger }] = await Promise.all([
        import("gsap"),
        import("gsap/ScrollTrigger"),
      ])

      if (cancelled) {
        return
      }

      gsap.registerPlugin(ScrollTrigger)

      const context = gsap.context(() => {
        gsap.fromTo(
          giantTextElement,
          { yPercent: 18, scale: 0.92, opacity: 0.3 },
          {
            yPercent: -4,
            scale: 1,
            opacity: 0.82,
            ease: "none",
            scrollTrigger: {
              trigger: sectionElement,
              start: "top 82%",
              end: "bottom bottom",
              scrub: 1,
            },
          }
        )

        gsap.fromTo(
          contentElement.children,
          { y: 42, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            stagger: 0.12,
            ease: "power3.out",
            scrollTrigger: {
              trigger: sectionElement,
              start: "top 62%",
            },
          }
        )
      }, sectionElement)

      cleanupAnimations = () => context.revert()
    }

    const setupTimer = window.setTimeout(() => {
      void setupFooterAnimations()
    }, 0)

    return () => {
      cancelled = true
      window.clearTimeout(setupTimer)
      cleanupAnimations?.()
    }
  }, [])

  const github = profile.socials.find((social) => social.label === "GitHub")
  const linkedin = profile.socials.find((social) => social.label === "LinkedIn")

  return (
    <section
      id="contact"
      ref={sectionRef}
      className="snap-section contact-section motion-footer-section"
    >
      <div className="motion-footer-grid" aria-hidden="true" />
      <div className="motion-footer-aurora" aria-hidden="true" />
      <div
        ref={giantTextRef}
        className="motion-footer-giant"
        aria-hidden="true"
      >
        ADNAN
      </div>

      <div className="motion-footer-marquee" aria-hidden="true">
        <div>
          {[...marqueeItems, ...marqueeItems, ...marqueeItems, ...marqueeItems].map(
            (item, index) => <span key={`${item}-${index}`}>{item}</span>
          )}
        </div>
      </div>

      <div ref={contentRef} className="site-frame motion-footer-content">
        <h2>Let&apos;s build something great together.</h2>
        <div className="motion-footer-links">
          <MagneticAnchor
            className="motion-footer-pill"
            href={`mailto:${profile.email}`}
          >
            <SiteIcon name="mail" size={24} /> Email
          </MagneticAnchor>
          {github ? (
            <MagneticAnchor
              className="motion-footer-pill"
              href={github.href}
              target="_blank"
              rel="noreferrer"
            >
              <SiteIcon name="github" size={24} /> GitHub
            </MagneticAnchor>
          ) : null}
          {linkedin ? (
            <MagneticAnchor
              className="motion-footer-pill"
              href={linkedin.href}
              target="_blank"
              rel="noreferrer"
            >
              <SiteIcon name="linkedin" size={24} /> LinkedIn
            </MagneticAnchor>
          ) : null}
          <MagneticAnchor className="motion-footer-pill" href="/work">
            <SiteIcon name="arrowUpRight" size={24} /> Work
          </MagneticAnchor>
          <MagneticAnchor className="motion-footer-pill" href="/blog">
            <SiteIcon name="blog" size={24} /> Blog
          </MagneticAnchor>
        </div>
      </div>
    </section>
  )
}
