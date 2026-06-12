"use client"

import { useEffect } from "react"

export function ScrollEffects() {
  useEffect(() => {
    let cleanupAnimations: (() => void) | undefined
    let cancelled = false

    const updateScrollbarWidth = () => {
      const scrollbarWidth =
        window.innerWidth - document.documentElement.clientWidth

      document.documentElement.style.setProperty(
        "--scrollbar-w",
        `${scrollbarWidth}px`
      )
      document.documentElement.style.setProperty(
        "--scrollbar-half-w",
        `${scrollbarWidth / 2}px`
      )
    }

    const setupAnimations = async () => {
      const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)")
      const shouldReduceMotion = reducedMotion.matches
      const [{ gsap }, { ScrollTrigger }] = await Promise.all([
        import("gsap"),
        import("gsap/ScrollTrigger"),
      ])

      if (cancelled) {
        return
      }

      gsap.registerPlugin(ScrollTrigger)
      const cleanupFns: (() => void)[] = []

      const context = gsap.context(() => {
        const allowParallax = window.matchMedia("(min-width: 768px)").matches

        if (!shouldReduceMotion) {
          gsap.utils
            .toArray<HTMLElement>("[data-gsap-reveal]")
            .forEach((element) => {
              gsap.fromTo(
                element,
                { opacity: 0, y: 40 },
                {
                  opacity: 1,
                  y: 0,
                  duration: 0.9,
                  ease: "power3.out",
                  scrollTrigger: {
                    trigger: element,
                    start: "top 82%",
                  },
                }
              )
            })

          if (allowParallax) {
            gsap.utils
              .toArray<HTMLElement>("[data-parallax]")
              .forEach((element) => {
                gsap.to(element, {
                  yPercent: Number(element.dataset.parallax) || -8,
                  ease: "none",
                  scrollTrigger: {
                    trigger: element,
                    start: "top bottom",
                    end: "bottom top",
                    scrub: true,
                  },
                })
              })
          }
        }

        const timeline = document.querySelector<HTMLElement>(
          "[data-timeline-progress]"
        )
        const timelineBulb = document.querySelector<HTMLElement>(
          "[data-timeline-bulb]"
        )

        if (timeline) {
          gsap.fromTo(
            timeline,
            { scaleY: 0 },
            {
              scaleY: 1,
              ease: "none",
              transformOrigin: "top",
              scrollTrigger: {
                trigger: ".experience-timeline",
                start: "top 70%",
                end: "bottom 42%",
                scrub: true,
              },
            }
          )
        }

        if (timelineBulb) {
          const getBulbDistance = () => {
            const timelineElement = document.querySelector<HTMLElement>(
              ".experience-timeline"
            )

            return timelineElement
              ? Math.max(
                  0,
                  timelineElement.offsetHeight - timelineBulb.offsetHeight
                )
              : 0
          }

          gsap.fromTo(
            timelineBulb,
            { y: 0, scale: 0.8, opacity: 0.55 },
            {
              y: () => getBulbDistance(),
              scale: 1.08,
              opacity: 1,
              ease: "none",
              scrollTrigger: {
                trigger: ".experience-timeline",
                start: "top 70%",
                end: "bottom 42%",
                scrub: true,
                invalidateOnRefresh: true,
              },
            }
          )
        }

        if (window.matchMedia("(min-width: 1024px)").matches) {
          const section = document.querySelector<HTMLElement>(
            "[data-horizontal-work]"
          )
          const pin = document.querySelector<HTMLElement>("[data-work-pin]")
          const viewport = document.querySelector<HTMLElement>(
            "[data-work-viewport]"
          )
          const track = document.querySelector<HTMLElement>("[data-work-track]")

          if (!section || !pin || !viewport || !track) {
            return
          }

          const getDistance = () =>
            Math.max(0, track.scrollWidth - viewport.clientWidth)

          const tween = gsap.to(track, {
            x: () => -getDistance(),
            ease: "none",
            scrollTrigger: {
              trigger: section,
              start: "top -10%",
              end: () => `+=${getDistance()}`,
              pin,
              pinSpacing: true,
              scrub: 0.85,
              anticipatePin: 1,
              invalidateOnRefresh: true,
            },
          })

          const refresh = () => ScrollTrigger.refresh()
          window.addEventListener("load", refresh, { once: true })
          document.fonts?.ready.then(refresh).catch(() => undefined)
          const imageRefresh = window.setTimeout(refresh, 450)

          cleanupFns.push(() => {
            window.clearTimeout(imageRefresh)
            window.removeEventListener("load", refresh)
            tween.kill()
          })
        }
      })

      cleanupAnimations = () => {
        cleanupFns.forEach((cleanup) => cleanup())
        context.revert()
      }
    }

    updateScrollbarWidth()
    window.addEventListener("resize", updateScrollbarWidth)
    const setupTimer = window.setTimeout(() => {
      void setupAnimations()
    }, 0)

    return () => {
      cancelled = true
      window.clearTimeout(setupTimer)
      cleanupAnimations?.()
      window.removeEventListener("resize", updateScrollbarWidth)
    }
  }, [])

  return null
}
