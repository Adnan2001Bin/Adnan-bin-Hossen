import type { Experience } from "@/lib/types"
import experienceContent from "@/content/settings/experience.json"

export const experience = experienceContent.items satisfies Experience[]
