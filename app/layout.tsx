import type { Metadata } from "next"
import { Figtree, Space_Grotesk } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import { SpeedInsights } from "@vercel/speed-insights/next"

import "./globals.css"
import { CursorFollower } from "@/components/cursor-follower"
import { ScrollEffects } from "@/components/scroll-effects"
import { SiteHeader } from "@/components/site-header"
import { SocialRail } from "@/components/social-rail"
import { ThemeProvider } from "@/components/theme-provider"
import { profile } from "@/data/profile"
import { site } from "@/data/site"
import { defaultSocialImage, seoKeywords } from "@/lib/seo"
import { cn } from "@/lib/utils"

const sans = Figtree({
  subsets: ["latin"],
  variable: "--font-sans",
  weight: ["400", "500", "600", "700", "800", "900"],
  display: "swap",
})

const display = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-display",
  weight: ["400", "500", "600", "700"],
  display: "swap",
})

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: site.title,
    template: `%s | ${site.name}`,
  },
  description: site.description,
  keywords: seoKeywords,
  category: "technology",
  manifest: "/manifest.webmanifest",
  applicationName: site.name,
  authors: [{ name: profile.name, url: site.url }],
  creator: profile.name,
  alternates: {
    canonical: "/",
    types: {
      "application/atom+xml": "/feed.xml",
    },
  },
  openGraph: {
    type: "website",
    url: site.url,
    siteName: site.name,
    title: site.title,
    description: site.description,
    images: [
      {
        url: defaultSocialImage,
        width: 1100,
        height: 1100,
        alt: "Risograph portrait illustration of Adnan Bin Hossen.",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: site.title,
    description: site.description,
    images: [defaultSocialImage],
  },
  robots: {
    index: true,
    follow: true,
  },
  appleWebApp: {
    capable: true,
    title: site.name,
    statusBarStyle: "default",
  },
  ...(process.env.NEXT_PUBLIC_GSC_VERIFICATION
    ? {
        verification: {
          google: process.env.NEXT_PUBLIC_GSC_VERIFICATION,
        },
      }
    : {}),
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={cn(
        "scroll-smooth antialiased",
        sans.variable,
        display.variable,
      )}
    >
      <body suppressHydrationWarning>
        <ThemeProvider>
          <SiteHeader />
          <SocialRail />
          <CursorFollower />
          <ScrollEffects />
          {children}
        </ThemeProvider>
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  )
}
