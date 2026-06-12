import type { SkillGroup } from "@/lib/types"
import skillsContent from "@/content/settings/skills.json"

export const skillGroups = skillsContent.groups satisfies SkillGroup[]
