import { HugeiconsIcon } from "@hugeicons/react"
import {
  AiBrain01Icon,
  ArrowDown01Icon,
  ArrowRight02Icon,
  ArrowUpRight01Icon,
  BookOpen01Icon,
  Briefcase01Icon,
  Cancel01Icon,
  CodeIcon,
  Database01Icon,
  GithubIcon,
  Globe02Icon,
  Linkedin01Icon,
  Location01Icon,
  Mail01Icon,
  Menu01Icon,
  Moon02Icon,
  Search02Icon,
  Sun02Icon,
  WorkflowCircle01Icon,
} from "@hugeicons/core-free-icons"

import { cn } from "@/lib/utils"

const icons = {
  ai: AiBrain01Icon,
  arrowDown: ArrowDown01Icon,
  arrowRight: ArrowRight02Icon,
  arrowUpRight: ArrowUpRight01Icon,
  blog: BookOpen01Icon,
  briefcase: Briefcase01Icon,
  close: Cancel01Icon,
  code: CodeIcon,
  database: Database01Icon,
  external: ArrowUpRight01Icon,
  github: GithubIcon,
  globe: Globe02Icon,
  linkedin: Linkedin01Icon,
  location: Location01Icon,
  mail: Mail01Icon,
  menu: Menu01Icon,
  moon: Moon02Icon,
  search: Search02Icon,
  sun: Sun02Icon,
  workflow: WorkflowCircle01Icon,
} as const

export type SiteIconName = keyof typeof icons

export function SiteIcon({
  name,
  className,
  size = 20,
  strokeWidth = 1.6,
}: {
  name: SiteIconName
  className?: string
  size?: number
  strokeWidth?: number
}) {
  return (
    <HugeiconsIcon
      aria-hidden="true"
      className={cn("shrink-0", className)}
      color="currentColor"
      icon={icons[name]}
      size={size}
      strokeWidth={strokeWidth}
    />
  )
}
