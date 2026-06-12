"use client"

import { AnimatePresence, motion, useReducedMotion } from "framer-motion"
import { useEffect, useMemo, useState } from "react"

const roles = ["Web apps", "Frontends", "Backends"]

function SlotWord({
  reducedMotion,
  text,
}: {
  reducedMotion: boolean
  text: string
}) {
  const characters = useMemo(() => text.split(""), [text])

  return (
    <span aria-hidden="true" className="slot-word">
      {characters.map((character, characterIndex) => (
        <motion.span
          key={`${character}-${characterIndex}`}
          initial={
            reducedMotion
              ? false
              : { y: "105%", opacity: 0, filter: "blur(8px)" }
          }
          animate={{ y: 0, opacity: 1, filter: "blur(0px)" }}
          exit={
            reducedMotion
              ? undefined
              : { y: "-105%", opacity: 0, filter: "blur(8px)" }
          }
          transition={{
            duration: reducedMotion ? 0 : 0.8,
            delay: reducedMotion ? 0 : characterIndex * 0.045,
            ease: [0.22, 1, 0.36, 1],
          }}
        >
          {character}
        </motion.span>
      ))}
    </span>
  )
}

export function HeroRoleSlot() {
  const [index, setIndex] = useState(0)
  const prefersReducedMotion = useReducedMotion()
  const [isMounted, setIsMounted] = useState(false)
  const reducedMotion = isMounted && Boolean(prefersReducedMotion)
  const role = roles[index]
  const nextRole = roles[(index + 1) % roles.length]

  useEffect(() => {
    const frame = window.requestAnimationFrame(() => setIsMounted(true))

    return () => window.cancelAnimationFrame(frame)
  }, [])

  useEffect(() => {
    const interval = window.setInterval(
      () => {
        setIndex((current) => (current + 1) % roles.length)
      },
      reducedMotion ? 6500 : 5500
    )

    return () => window.clearInterval(interval)
  }, [reducedMotion])

  return (
    <>
      <div
        className="hero-role-static"
        aria-label="I build web apps, frontends, and backends"
      >
        <span>I build</span>
        <strong>Web apps</strong>
        <strong>Frontends</strong>
        <strong>Backends</strong>
      </div>
      <div
        className="hero-role hero-role-animated"
        aria-label={`I build ${role}`}
        aria-live="polite"
      >
        <p className="hero-role-kicker">I build</p>
        <AnimatePresence mode="popLayout">
          <motion.span
            key={`ghost-${nextRole}`}
            aria-hidden="true"
            className="role-ghost"
            initial={
              reducedMotion
                ? false
                : { y: 28, opacity: 0, filter: "blur(10px)" }
            }
            animate={{ y: 0, opacity: 0.34, filter: "blur(0px)" }}
            exit={
              reducedMotion
                ? undefined
                : { y: -28, opacity: 0, filter: "blur(10px)" }
            }
            transition={{
              duration: reducedMotion ? 0 : 0.85,
              ease: [0.22, 1, 0.36, 1],
            }}
          >
            {nextRole}
          </motion.span>
        </AnimatePresence>
        <div className="slot-word-container">
          <AnimatePresence mode="wait">
            <SlotWord
              key={`slot-${role}`}
              reducedMotion={Boolean(reducedMotion)}
              text={role}
            />
          </AnimatePresence>
        </div>
      </div>
    </>
  )
}
