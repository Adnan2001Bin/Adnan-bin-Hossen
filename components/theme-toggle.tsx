"use client"

import { useTheme } from "next-themes"

import { Button } from "@/components/ui/button"
import { SiteIcon } from "@/components/site-icon"

export function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme()

  return (
    <Button
      aria-label="Toggle color theme"
      className="size-9 rounded-full border-transparent bg-transparent text-foreground/80 hover:bg-transparent hover:text-primary"
      size="icon"
      type="button"
      variant="outline"
      onClick={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")}
    >
      <SiteIcon name="moon" size={18} className="dark:hidden" />
      <SiteIcon name="sun" size={18} className="hidden dark:block" />
    </Button>
  )
}
