import type { NavItem } from "@/lib/types"
import navigationContent from "@/content/settings/navigation.json"

export const navigation = navigationContent.items satisfies NavItem[]
