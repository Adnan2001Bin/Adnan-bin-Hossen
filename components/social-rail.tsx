"use client"

import { useEffect, useRef } from "react"
import Link from "next/link"

import { profile } from "@/data/profile"
import { SiteIcon } from "@/components/site-icon"

export function SocialRail() {
  const railRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const rail = railRef.current
    const footer = document.querySelector("#contact")

    if (!rail || !footer) return

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            rail.style.opacity = "0"
            rail.style.pointerEvents = "none"
          } else {
            rail.style.opacity = "1"
            rail.style.pointerEvents = "auto"
          }
        })
      },
      {
        threshold: 0.1,
        rootMargin: "-20% 0px 0px 0px",
      }
    )

    observer.observe(footer)

    return () => observer.disconnect()
  }, [])

  return (
    <aside
      ref={railRef}
      aria-label="Social links"
      className="social-rail fixed z-40 hidden flex-col items-center gap-7 transition-opacity duration-500 ease-out lg:flex"
    >
      {profile.socials.map((social) => (
        <Link
          key={social.href}
          href={social.href}
          target={social.href.startsWith("http") ? "_blank" : undefined}
          rel={social.href.startsWith("http") ? "noreferrer" : undefined}
          aria-label={social.label}
          className="grid size-8 place-items-center text-foreground/90 transition hover:-translate-y-1 hover:text-primary"
        >
          <SiteIcon name={social.icon} size={30} strokeWidth={1.9} />
        </Link>
      ))}
    </aside>
  )
}
