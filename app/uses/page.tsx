import type { Metadata } from "next"
import Link from "next/link"

import { profile } from "@/data/profile"
import { site } from "@/data/site"
import { MotionFooter } from "@/components/motion-footer"
import { Reveal } from "@/components/reveal"
import { SiteIcon } from "@/components/site-icon"
import {
  breadcrumbJsonLd,
  faqJsonLd,
  seoKeywords,
  webPageJsonLd,
} from "@/lib/seo"

export const metadata: Metadata = {
  title: "How I work",
  description:
    "How Adnan Bin Hossen works: the kind of engagements he takes on, working style, timezone, and the full-stack web development stack he reaches for.",
  keywords: [...seoKeywords, "how I work", "engagement", "freelance backend engineer"],
  alternates: {
    canonical: "/uses",
  },
  openGraph: {
    title: `How I work | ${site.name}`,
    description:
      "Engagement types, working style, timezone, and stack for full-stack web and mobile development work.",
    url: "/uses",
    type: "website",
  },
}

const faqs = [
  {
    question: "What kind of work do you take on?",
    answer:
      "Full-stack web and mobile development — building end-to-end applications with React, Next.js, Node.js, and React Native. I work on school management systems, e-commerce platforms, productivity dashboards, supply chain tools, and custom web applications. I take on freelance projects and full-time opportunities.",
  },
  {
    question: "Where are you based and what hours do you work?",
    answer:
      "I'm based in Ashulia, Dhaka, Bangladesh (GMT+6). That overlaps comfortably with European and Asian working hours and gives a workable window with US mornings. I work async-first and keep timezone differences from becoming a bottleneck through clear written updates.",
  },
  {
    question: "How do you prefer to work?",
    answer:
      "Collaborative and iterative. I like clear requirements, regular communication, and shipping in small increments. I work closely with designers and backend teams, follow agile workflows with Git and GitHub, and focus on delivering scalable, user-centric features with clean UI/UX.",
  },
  {
    question: "What's your stack?",
    answer:
      "React, Next.js, and TypeScript on the frontend; Node.js and Express.js on the backend; MongoDB and Supabase for data; React Native for mobile; and Tailwind CSS, Redux, and Framer Motion for styling and interactivity. I also use Docker, Vercel, and Netlify for deployment.",
  },
  {
    question: "How do we start working together?",
    answer:
      `The fastest path is email — ${profile.email}. Share the project you're building or the problem you're stuck on, and I'll tell you honestly whether it's a good fit and how I'd approach it.`,
  },
]

export default function UsesPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      webPageJsonLd({
        path: "/uses",
        name: "How I work",
        description: String(metadata.description),
      }),
      breadcrumbJsonLd([
        { name: "Home", path: "/" },
        { name: "How I work", path: "/uses" },
      ]),
      faqJsonLd(faqs),
    ],
  }

  return (
    <main id="main" className="editorial-page">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <section className="site-frame editorial-hero">
        <Reveal className="editorial-hero-copy">
          <p className="eyebrow">How I work</p>
          <h1 className="section-title">Engagements, working style, and stack</h1>
          <p className="editorial-lede">
            A short, honest description of the work I take on, how I like to
            work, and the tools I reach for — so we can decide quickly whether
            it&apos;s a good fit.
          </p>
          <div className="hero-actions">
            <Link className="primary-link" href="/#contact">
              Work with me <SiteIcon name="arrowUpRight" size={17} />
            </Link>
            <Link className="secondary-link" href="/resume">
              See resume <SiteIcon name="arrowRight" size={17} />
            </Link>
          </div>
        </Reveal>
      </section>

      <section className="site-frame resume-section" aria-label="How I work">
        <div className="uses-list">
          {faqs.map((faq) => (
            <Reveal key={faq.question}>
              <div className="uses-item">
                <h3>{faq.question}</h3>
                <p>{faq.answer}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      <MotionFooter />
    </main>
  )
}
