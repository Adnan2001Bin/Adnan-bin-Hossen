"use client"

import {
  motion,
  type MotionValue,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion"
import { useEffect, useMemo, useRef, useState } from "react"

type ManifestoToken =
  | {
      kind: "word"
      text: string
    }
  | {
      kind: "emoji"
      label: string
      text: string
    }

const manifestoLines: ManifestoToken[][] = [
  [
    { kind: "word", text: "I" },
    { kind: "word", text: "build" },
    { kind: "word", text: "end-to-end" },
    { kind: "word", text: "web" },
    { kind: "word", text: "applications" },
    { kind: "emoji", text: "🚀", label: "rocket" },
    { kind: "word", text: "that" },
    { kind: "word", text: "feel" },
    { kind: "word", text: "polished" },
    { kind: "word", text: "and" },
    { kind: "word", text: "stay" },
    { kind: "word", text: "scalable." },
    { kind: "word", text: "React," },
    { kind: "word", text: "Node," },
    { kind: "word", text: "and" },
    { kind: "word", text: "APIs" },
    { kind: "emoji", text: "⚡", label: "lightning" },
    { kind: "word", text: "should" },
    { kind: "word", text: "work" },
    { kind: "word", text: "together" },
    { kind: "word", text: "without" },
    { kind: "word", text: "friction." },
    { kind: "word", text: "Less" },
    { kind: "word", text: "complexity." },
    { kind: "word", text: "More" },
    { kind: "word", text: "shipping." },
    { kind: "emoji", text: "✨", label: "sparkles" },
  ],
]

function AnimatedWord({
  index,
  progress,
  reducedMotion,
  text,
  total,
}: {
  index: number
  progress: MotionValue<number>
  reducedMotion: boolean
  text: string
  total: number
}) {
  const start = Math.max(0, (index / total) * 0.3)
  const end = Math.min(0.5, start + 0.15)
  const opacity = useTransform(progress, [start, end], [0.3, 1])
  const y = useTransform(progress, [start, end], [14, 0])

  return (
    <motion.span
      className="manifesto-word"
      style={reducedMotion ? { opacity: 1 } : { opacity, y }}
    >
      {text}
    </motion.span>
  )
}

function AnimatedEmoji({
  index,
  label,
  progress,
  reducedMotion,
  text,
  total,
}: {
  index: number
  label: string
  progress: MotionValue<number>
  reducedMotion: boolean
  text: string
  total: number
}) {
  const start = Math.max(0, (index / total) * 0.3)
  const mid = Math.min(0.5, start + 0.08)
  const end = Math.min(0.5, start + 0.18)
  const opacity = useTransform(progress, [start, mid], [0.26, 1])
  const scale = useTransform(progress, [start, mid, end], [0.62, 1.24, 1])
  const rotate = useTransform(progress, [start, mid, end], [-18, 12, 0])
  const y = useTransform(progress, [start, mid, end], [16, -10, 0])

  return (
    <motion.span
      aria-label={label}
      role="img"
      className="manifesto-emoji"
      style={reducedMotion ? { opacity: 1 } : { opacity, rotate, scale, y }}
      animate={
        reducedMotion
          ? {}
          : {
              y: [0, -3, 0],
              rotate: [0, 5, -5, 0],
            }
      }
      transition={{
        duration: 3,
        repeat: Infinity,
        ease: "easeInOut",
        delay: index * 0.2,
      }}
    >
      {text}
    </motion.span>
  )
}

export function Manifesto() {
  const containerRef = useRef<HTMLDivElement>(null)
  const prefersReducedMotion = Boolean(useReducedMotion())
  const [isMounted, setIsMounted] = useState(false)
  const reducedMotion = isMounted && prefersReducedMotion
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  })
  const progress = useSpring(scrollYProgress, {
    stiffness: 92,
    damping: 28,
    mass: 0.45,
  })
  const totalTokens = useMemo(() => manifestoLines.flat().length, [])
  let tokenIndex = 0

  useEffect(() => {
    const frame = window.requestAnimationFrame(() => setIsMounted(true))

    return () => window.cancelAnimationFrame(frame)
  }, [])

  return (
    <div
      ref={containerRef}
      className="manifesto-container"
      style={{ position: "relative" }}
    >
      {manifestoLines.map((line, lineIndex) => (
        <p key={lineIndex} className="manifesto-line">
          {line.map((token) => {
            const currentIndex = tokenIndex++

            if (token.kind === "emoji") {
              return (
                <AnimatedEmoji
                  key={`${token.text}-${currentIndex}`}
                  index={currentIndex}
                  label={token.label}
                  progress={progress}
                  reducedMotion={reducedMotion}
                  text={token.text}
                  total={totalTokens}
                />
              )
            }

            return (
              <AnimatedWord
                key={`${token.text}-${currentIndex}`}
                index={currentIndex}
                progress={progress}
                reducedMotion={reducedMotion}
                text={token.text}
                total={totalTokens}
              />
            )
          })}
        </p>
      ))}
    </div>
  )
}
