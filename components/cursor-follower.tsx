"use client"

import { useEffect, useState } from "react"
import { motion, useMotionValue, useSpring } from "framer-motion"

export function CursorFollower() {
  const [enabled, setEnabled] = useState(false)
  const x = useMotionValue(-100)
  const y = useMotionValue(-100)
  const smoothX = useSpring(x, { stiffness: 380, damping: 38, mass: 0.4 })
  const smoothY = useSpring(y, { stiffness: 380, damping: 38, mass: 0.4 })

  useEffect(() => {
    const finePointer = window.matchMedia("(pointer: fine)")
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)")

    function updateAvailability() {
      setEnabled(finePointer.matches && !reducedMotion.matches)
    }

    function onPointerMove(event: PointerEvent) {
      x.set(event.clientX - 20)
      y.set(event.clientY - 20)
    }

    updateAvailability()
    window.addEventListener("pointermove", onPointerMove)
    finePointer.addEventListener("change", updateAvailability)
    reducedMotion.addEventListener("change", updateAvailability)

    return () => {
      window.removeEventListener("pointermove", onPointerMove)
      finePointer.removeEventListener("change", updateAvailability)
      reducedMotion.removeEventListener("change", updateAvailability)
    }
  }, [x, y])

  if (!enabled) {
    return null
  }

  return (
    <motion.div
      aria-hidden="true"
      className="pointer-events-none fixed left-0 top-0 z-[80] hidden size-10 rounded-full border border-primary/50 bg-primary/15 mix-blend-difference shadow-[0_0_40px_color-mix(in_oklch,var(--primary)_55%,transparent)] lg:block"
      style={{ x: smoothX, y: smoothY }}
    />
  )
}
