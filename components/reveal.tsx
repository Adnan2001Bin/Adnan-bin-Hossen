"use client"

import { motion } from "framer-motion"
import type { ComponentProps, ReactNode } from "react"

import { cn } from "@/lib/utils"

export function Reveal({
  children,
  className,
  delay = 0,
  y = 28,
  ...props
}: {
  children: ReactNode
  className?: string
  delay?: number
  y?: number
} & Omit<ComponentProps<typeof motion.div>, "children" | "className">) {
  return (
    <motion.div
      className={cn("will-change-transform", className)}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "0px 0px -10% 0px" }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay }}
      {...props}
    >
      {children}
    </motion.div>
  )
}
