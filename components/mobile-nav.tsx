"use client"

import Link from "next/link"
import { useEffect, useState } from "react"
import { AnimatePresence, motion, useReducedMotion } from "framer-motion"

import { navigation } from "@/data/navigation"
import { profile } from "@/data/profile"
import { SiteIcon, type SiteIconName } from "@/components/site-icon"

const bookingHref = profile.booking?.trim() ? profile.booking : "/#contact"

export function MobileNav() {
  const [open, setOpen] = useState(false)
  const reduceMotion = useReducedMotion()
  const close = () => setOpen(false)

  // Lock body scroll and close on Escape while open.
  useEffect(() => {
    if (!open) return

    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = "hidden"

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false)
    }
    window.addEventListener("keydown", onKeyDown)

    return () => {
      document.body.style.overflow = previousOverflow
      window.removeEventListener("keydown", onKeyDown)
    }
  }, [open])

  const socials = profile.socials.filter((social) =>
    social.href.startsWith("http"),
  )

  return (
    <>
      <button
        type="button"
        className="mobile-nav-trigger sm:hidden"
        aria-label="Open menu"
        aria-expanded={open}
        aria-haspopup="dialog"
        onClick={() => setOpen(true)}
      >
        <SiteIcon name="menu" size={24} />
      </button>

      <AnimatePresence>
        {open ? (
          <motion.div
            className="mobile-nav-overlay"
            role="dialog"
            aria-modal="true"
            aria-label="Site menu"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: reduceMotion ? 0 : 0.22, ease: "easeOut" }}
          >
            <div className="mobile-nav-top">
              <span className="header-brand">{profile.url.replace(/^https?:\/\//, "")}</span>
              <button
                type="button"
                className="mobile-nav-trigger"
                aria-label="Close menu"
                onClick={() => setOpen(false)}
              >
                <SiteIcon name="close" size={24} />
              </button>
            </div>

            <motion.nav
              className="mobile-nav-links"
              aria-label="Mobile navigation"
              initial={reduceMotion ? false : "hidden"}
              animate="visible"
              variants={{
                visible: { transition: { staggerChildren: 0.05, delayChildren: 0.05 } },
              }}
            >
              {navigation.map((item) => (
                <motion.div
                  key={item.href}
                  variants={{
                    hidden: { opacity: 0, y: 14 },
                    visible: { opacity: 1, y: 0 },
                  }}
                  transition={{ duration: reduceMotion ? 0 : 0.3, ease: [0.22, 1, 0.36, 1] }}
                >
                  <Link href={item.href} className="mobile-nav-link" onClick={close}>
                    {item.label}
                    <SiteIcon name="arrowUpRight" size={22} />
                  </Link>
                </motion.div>
              ))}
            </motion.nav>

            <div className="mobile-nav-foot">
              <Link
                href={bookingHref}
                className="primary-link mobile-nav-cta"
                onClick={close}
              >
                Work with me <SiteIcon name="arrowUpRight" size={18} />
              </Link>
              <a className="mobile-nav-email" href={`mailto:${profile.email}`}>
                <SiteIcon name="mail" size={18} /> {profile.email}
              </a>
              <div className="mobile-nav-socials">
                {socials.map((social) => (
                  <a
                    key={social.href}
                    href={social.href}
                    target="_blank"
                    rel="noreferrer"
                    aria-label={social.label}
                  >
                    <SiteIcon name={social.icon as SiteIconName} size={22} />
                  </a>
                ))}
              </div>
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </>
  )
}
