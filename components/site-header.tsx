import Link from "next/link"

import { navigation } from "@/data/navigation"
import { profile } from "@/data/profile"
import { site } from "@/data/site"
import { MobileNav } from "@/components/mobile-nav"
import { ThemeToggle } from "@/components/theme-toggle"

export function SiteHeader() {
  return (
    <header className="site-header fixed inset-x-0 top-0 z-50">
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:left-5 focus:top-5 focus:z-[90] focus:rounded-md focus:bg-primary focus:px-4 focus:py-2 focus:text-primary-foreground"
      >
        Skip to content
      </a>
      <div className="site-frame header-frame flex items-center justify-between gap-4">
        <Link
          href="/"
          className="header-brand text-foreground transition hover:text-primary"
        >
          {site.domain}
        </Link>
        <a
          href={`mailto:${profile.email}`}
          className="header-email hidden text-muted-foreground transition hover:text-primary md:block"
        >
          {profile.email}
        </a>
        <nav aria-label="Primary navigation" className="flex items-center gap-4 sm:gap-6">
          <div className="hidden items-center gap-12 sm:flex">
            {navigation.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="header-nav-link uppercase text-foreground/80 transition hover:text-primary"
              >
                {item.label}
              </Link>
            ))}
          </div>
          <ThemeToggle />
          <MobileNav />
        </nav>
      </div>
    </header>
  )
}
