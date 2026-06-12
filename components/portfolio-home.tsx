import Link from "next/link"
import type { CSSProperties } from "react"

import { experience } from "@/data/experience"
import { profile } from "@/data/profile"
import { skillGroups } from "@/data/skills"
import type { BlogPost } from "@/lib/blog"
import type { WorkProject } from "@/lib/work"
import { HeroRoleSlot } from "@/components/hero-role-slot"
import { Manifesto } from "@/components/manifesto"
import { MotionFooter } from "@/components/motion-footer"
import { Reveal } from "@/components/reveal"
import { SiteIcon, type SiteIconName } from "@/components/site-icon"
import { Testimonials } from "@/components/testimonials"
import { ThemedImage } from "@/components/themed-image"

const workWithMeHref = profile.booking?.trim()
  ? profile.booking
  : "/#contact"

const capabilities: {
  title: string
  label: string
  icon: SiteIconName
  description: string
  tools: string[]
}[] = [
  {
    title: "Develop",
    label: "Full-stack apps",
    icon: "code",
    description:
      "Building end-to-end web applications with modern frontend and backend technologies that scale with your product.",
    tools: ["React", "Next.js", "Node.js", "TypeScript", "Tailwind CSS"],
  },
  {
    title: "Integrate",
    label: "APIs & mobile",
    icon: "workflow",
    description:
      "Connecting frontends to robust backends with RESTful APIs, and delivering seamless mobile experiences with React Native.",
    tools: ["Express.js", "REST APIs", "React Native", "MongoDB", "Supabase"],
  },
  {
    title: "Deliver",
    label: "Product engineering",
    icon: "briefcase",
    description:
      "Collaborating with designers and teams to ship polished, user-centric features with clean UI/UX across web and mobile.",
    tools: ["Git", "Vercel", "Docker", "Figma", "Framer Motion"],
  },
]

const workloadItems: {
  label: string
  icon?: SiteIconName
  type: "pill" | "icon"
  className: string
  tone: string
  rotate: number
}[] = [
  // Top arc - outer layer
  {
    label: "React",
    type: "pill",
    className: "left-[10%] top-[18%]",
    tone: "violet",
    rotate: -5,
  },
  {
    label: "TypeScript",
    icon: "code",
    type: "icon",
    className: "left-[28%] top-[8%]",
    tone: "blue",
    rotate: 4,
  },
  {
    label: "Next.js",
    icon: "globe",
    type: "icon",
    className: "left-[50%] top-[6%]",
    tone: "ember",
    rotate: 3,
  },
  {
    label: "MongoDB",
    icon: "database",
    type: "icon",
    className: "right-[28%] top-[8%]",
    tone: "rose",
    rotate: -3,
  },
  {
    label: "Node.js",
    type: "pill",
    className: "right-[10%] top-[18%]",
    tone: "blue",
    rotate: 5,
  },

  // Top arc - inner layer (closer to center)
  {
    label: "Express",
    type: "pill",
    className: "left-[20%] top-[28%]",
    tone: "teal",
    rotate: 6,
  },
  {
    label: "Tailwind",
    icon: "workflow",
    type: "icon",
    className: "left-[38%] top-[22%]",
    tone: "violet",
    rotate: -4,
  },
  {
    label: "Redux",
    type: "pill",
    className: "right-[38%] top-[22%]",
    tone: "rose",
    rotate: 5,
  },
  {
    label: "Vercel",
    icon: "briefcase",
    type: "icon",
    className: "right-[20%] top-[28%]",
    tone: "ember",
    rotate: -6,
  },

  // Middle sides
  {
    label: "Docker",
    icon: "workflow",
    type: "icon",
    className: "left-[6%] top-[48%]",
    tone: "violet",
    rotate: -8,
  },
  {
    label: "Supabase",
    type: "pill",
    className: "left-[14%] top-[42%]",
    tone: "blue",
    rotate: 7,
  },
  {
    label: "APIs",
    icon: "arrowRight",
    type: "icon",
    className: "right-[14%] top-[42%]",
    tone: "teal",
    rotate: -7,
  },
  {
    label: "React Native",
    icon: "code",
    type: "icon",
    className: "right-[6%] top-[48%]",
    tone: "rose",
    rotate: 6,
  },

  // Bottom arc - inner layer (closer to center)
  {
    label: "JWT",
    type: "pill",
    className: "left-[20%] bottom-[28%]",
    tone: "rose",
    rotate: -5,
  },
  {
    label: "Firebase",
    type: "pill",
    className: "left-[38%] bottom-[22%]",
    tone: "blue",
    rotate: 4,
  },
  {
    label: "Python",
    type: "pill",
    className: "right-[38%] bottom-[22%]",
    tone: "violet",
    rotate: -3,
  },
  {
    label: "Figma",
    icon: "location",
    type: "icon",
    className: "right-[20%] bottom-[28%]",
    tone: "teal",
    rotate: 6,
  },

  // Bottom arc - outer layer
  {
    label: "Git",
    type: "pill",
    className: "left-[10%] bottom-[18%]",
    tone: "blue",
    rotate: -6,
  },
  {
    label: "Postman",
    icon: "arrowDown",
    type: "icon",
    className: "left-[28%] bottom-[8%]",
    tone: "teal",
    rotate: 5,
  },
  {
    label: "Framer",
    type: "pill",
    className: "left-[50%] bottom-[6%]",
    tone: "rose",
    rotate: 4,
  },
  {
    label: "Java",
    icon: "blog",
    type: "icon",
    className: "right-[28%] bottom-[8%]",
    tone: "ember",
    rotate: -4,
  },
  {
    label: "Netlify",
    type: "pill",
    className: "right-[10%] bottom-[18%]",
    tone: "ember",
    rotate: -5,
  },
]

const stackDomainMeta: Record<
  string,
  {
    shortLabel: string
    icon: SiteIconName
    description: string
  }
> = {
  Frontend: {
    shortLabel: "UI layer",
    icon: "workflow",
    description: "Interfaces built with modern React and styling tools.",
  },
  "Backend and APIs": {
    shortLabel: "Service edges",
    icon: "code",
    description: "Production APIs and server-side logic.",
  },
  "Database and Infrastructure": {
    shortLabel: "Reliability base",
    icon: "database",
    description: "Storage, auth, deployments, and tooling.",
  },
  "Tools and Design": {
    shortLabel: "Design & data",
    icon: "briefcase",
    description: "Design tools, data analysis, and workflow utilities.",
  },
}

function yearOf(value: string) {
  return value.split(" ").at(-1) ?? value
}

function stackMetaFor(category: string) {
  return (
    stackDomainMeta[category] ?? {
      shortLabel: category,
      icon: "workflow" as SiteIconName,
      description: `${category} tools used for resilient product delivery.`,
    }
  )
}

export function PortfolioHome({
  posts,
  projects,
}: {
  posts: BlogPost[]
  projects: WorkProject[]
}) {
  const featuredPosts = posts.slice(0, 3)
  const leadPost = featuredPosts[0]
  const secondaryPosts = featuredPosts.slice(1)
  const frontendStack =
    skillGroups.find((group) => group.category === "Frontend") ??
    skillGroups[0]
  const backendStack =
    skillGroups.find((group) => group.category === "Backend and APIs") ??
    skillGroups[1]
  const dataStack =
    skillGroups.find((group) => group.category === "Database and Infrastructure") ??
    skillGroups[2]
  const toolsStack =
    skillGroups.find((group) => group.category === "Tools and Design") ??
    skillGroups[3]
  const frontendMeta = stackMetaFor(frontendStack.category)
  const backendMeta = stackMetaFor(backendStack.category)
  const dataMeta = stackMetaFor(dataStack.category)
  const toolsMeta = stackMetaFor(toolsStack.category)
  const stackWorkingSet = [
    {
      group: frontendStack,
      meta: frontendMeta,
      skills: frontendStack.skills.slice(0, 3),
    },
    {
      group: backendStack,
      meta: backendMeta,
      skills: backendStack.skills.slice(0, 3),
    },
    { group: dataStack, meta: dataMeta, skills: dataStack.skills.slice(0, 3) },
    {
      group: toolsStack,
      meta: toolsMeta,
      skills: toolsStack.skills.slice(0, 3),
    },
  ]
  const stackBentoCards = [
    {
      key: "frontend",
      className: "stack-bento-ai",
      delay: 0.02,
      label: frontendMeta.shortLabel,
      title: "Frontend",
      support: "React, Next.js, and modern UI tooling.",
      light: "/images/blended/stack-ai-light.avif",
      dark: "/images/blended/stack-ai.avif",
      chips: frontendStack.skills.slice(0, 3),
    },
    {
      key: "backend",
      className: "stack-bento-backend",
      delay: 0.06,
      label: backendMeta.shortLabel,
      title: "APIs",
      support: "Node.js, Express, and RESTful services.",
      light: "/images/blended/stack-backend-light.avif",
      dark: "/images/blended/stack-backend.avif",
      chips: backendStack.skills.slice(0, 2),
    },
    {
      key: "path",
      className: "stack-bento-metric",
      delay: 0.1,
      label: "Build path",
      title: "Full-stack",
      support: "Frontend, APIs, data, and design.",
      light: "/images/blended/stack-path-light.avif",
      dark: "/images/blended/stack-path.avif",
      chips: [frontendMeta.shortLabel, backendMeta.shortLabel, dataMeta.shortLabel],
    },
    {
      key: "data",
      className: "stack-bento-data",
      delay: 0.14,
      label: dataMeta.shortLabel,
      title: "Data core",
      support: "Databases, auth, and deployment tooling.",
      light: "/images/blended/stack-data-light.avif",
      dark: "/images/blended/stack-data.avif",
      chips: dataStack.skills.slice(0, 3),
    },
    {
      key: "tools",
      className: "stack-bento-product",
      delay: 0.18,
      label: toolsMeta.shortLabel,
      title: "Tools & design",
      support: "Design, data analysis, and workflow utilities.",
      light: "/images/blended/stack-product-light.avif",
      dark: "/images/blended/stack-product.avif",
      chips: toolsStack.skills.slice(0, 2),
    },
    {
      key: "working-set",
      className: "stack-bento-wide",
      delay: 0.22,
      label: "Working set",
      title: "Practical stack",
      support: "A compact slice grouped by layer.",
      light: "/images/blended/stack-working-set-light.avif",
      dark: "/images/blended/stack-working-set.avif",
      chips: stackWorkingSet.map((item) => item.meta.shortLabel),
    },
  ]

  return (
    <>
      <section className="snap-section hero-section">
        <div className="site-frame hero-grid">
          <Reveal className="hero-copy-left">
            <p className="hero-hello">Hello! I&apos;m</p>
            <h1 className="hero-name">
              Adnan
              <span>Bin Hossen</span>
            </h1>
            <Link className="primary-link hero-cta" href={workWithMeHref}>
              Work with me <SiteIcon name="arrowUpRight" size={17} />
            </Link>
          </Reveal>

          <div className="hero-subject" data-parallax="-3">
            <div className="subject-glow" />
            <ThemedImage
              light="/images/new/hero-light.png"
              dark="/images/new/hero-dark.png"
              alt="Risograph portrait illustration of Adnan Bin Hossen."
              priority
              sizes="(min-width: 1024px) 42vw, 92vw"
              className="blended-illustration"
            />
          </div>

          <Reveal className="hero-copy-right" delay={0.08}>
            <HeroRoleSlot />
          </Reveal>
        </div>
      </section>

      <section id="about" className="snap-section about-section">
        <div className="site-frame split-layout">
          <Reveal className="section-illustration" data-parallax="-4">
            <ThemedImage
              light="/images/new/about-light.png"
              dark="/images/new/about-dark.png"
              alt="Risograph portrait of Adnan Bin Hossen with warm halftone texture."
              sizes="(min-width: 1024px) 42vw, 92vw"
              className="blended-illustration"
            />
          </Reveal>
          <div className="text-panel about-copy">
            <Reveal delay={0.08}>
              <p className="section-label">About me</p>
            </Reveal>
            <Manifesto />
          </div>
        </div>
      </section>

      <section className="snap-section capability-section">
        <div className="site-frame capability-grid">
          <Reveal className="what-heading">
            <h2>
              What
              <span>I do</span>
            </h2>
          </Reveal>
          <div className="capability-figure" data-parallax="-5">
            <ThemedImage
              light="/images/new/desk-light.png"
              dark="/images/new/desk-dark.png"
              alt="Risograph illustration of Adnan Bin Hossen working at a laptop."
              sizes="(min-width: 1024px) 36vw, 92vw"
              className="blended-illustration"
            />
          </div>
          <div className="capability-list">
            {capabilities.map((item) => (
              <article
                key={item.title}
                className="capability-card"
                tabIndex={0}
              >
                <span className="corner corner-tl" />
                <span className="corner corner-tr" />
                <span className="corner corner-bl" />
                <span className="corner corner-br" />
                <div>
                  <div className="capability-title-row">
                    <h3>{item.title}</h3>
                    <SiteIcon name={item.icon} size={30} />
                  </div>
                  <p>{item.label}</p>
                  <span>{item.description}</span>
                </div>
                <div className="capability-tools">
                  {item.tools.map((tool) => (
                    <em key={tool}>{tool}</em>
                  ))}
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="snap-section experience-section">
        <div className="site-frame">
          <Reveal className="section-center-heading">
            <h2>My career and experiences</h2>
          </Reveal>
          <div className="experience-timeline">
            <div className="timeline-line" />
            <div className="timeline-line-active" data-timeline-progress />
            <div className="timeline-bulb" data-timeline-bulb />
            {experience.map((item, index) => (
              <article
                key={`${item.organization}-${item.role}`}
                className="experience-row"
              >
                <div className="experience-role">
                  <h3>{item.role}</h3>
                  <p>{item.organization}</p>
                </div>
                <div className="experience-year">
                  {index === 0 ? "NOW" : yearOf(item.start)}
                </div>
                <p className="experience-summary">{item.highlights[0]}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section
        id="work"
        className="snap-section work-section"
        data-horizontal-work
      >
        <div className="site-frame work-pin" data-work-pin>
          <Reveal className="section-row-heading">
            <div>
              <h2>Some of my work</h2>
            </div>
          </Reveal>
          <div className="work-viewport" data-work-viewport>
            <div
              className="work-track"
              aria-label="Selected projects"
              data-work-track
            >
              {projects.map((project, index) => (
                <Link
                  key={project.slug}
                  href={`/work/${project.slug}`}
                  className="work-slide"
                  data-image-position={index % 2 === 0 ? "top" : "bottom"}
                >
                  <div className="work-image">
                    <ThemedImage
                      light={project.image.light}
                      dark={project.image.dark}
                      alt={project.image.alt}
                      sizes="(min-width: 1024px) 24vw, 74vw"
                      className="blended-illustration"
                    />
                  </div>
                  <div className="work-content-block">
                    <div className="work-slide-header">
                      <span className="work-number">
                        {String(index + 1).padStart(2, "0")}
                      </span>
                      <div className="work-title-group">
                        <h3>{project.name}</h3>
                        <p>{project.category}</p>
                      </div>
                    </div>
                    <div className="work-details">
                      <div className="work-tags">
                        {project.stack.slice(0, 6).map((tool) => (
                          <span key={tool}>{tool}</span>
                        ))}
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="snap-section workload-section">
        <div className="site-frame workload-inner">
          <div
            className="workload-field"
            aria-label="Full-stack development skills and technologies"
          >
            {workloadItems.map((item, index) => (
              <div
                key={item.label}
                className={`workload-float ${item.className}`}
                style={
                  {
                    "--rotate": `${item.rotate}deg`,
                    "--float-delay": `${index * 28}ms`,
                  } as CSSProperties
                }
              >
                {item.type === "pill" ? (
                  <span className={`workload-pill tone-${item.tone}`}>
                    {item.label}
                  </span>
                ) : (
                  <span className={`workload-icon tone-${item.tone}`}>
                    <SiteIcon name={item.icon ?? "workflow"} size={26} />
                  </span>
                )}
              </div>
            ))}
            <Reveal className="workload-title">
              <h2>Technologies I build with</h2>
            </Reveal>
          </div>
        </div>
      </section>

      <section className="snap-section stack-section">
        <div className="site-frame stack-grid">
          <Reveal className="stack-bottom-title">
            <h2>Tools I reach for when the product has to ship.</h2>
          </Reveal>
          <div className="stack-bento" data-parallax="-2">
            {stackBentoCards.map((card) => (
              <Reveal
                key={card.key}
                className={`stack-bento-cell ${card.className}`}
                delay={card.delay}
              >
                <article className="stack-bento-card">
                  <div className="stack-bento-image" aria-hidden="true">
                    <ThemedImage
                      light={card.light}
                      dark={card.dark}
                      alt=""
                      sizes="(min-width: 1024px) 28vw, 92vw"
                      className="blended-illustration"
                    />
                  </div>
                  <div className="stack-bento-copy">
                    <span className="stack-bento-kicker">{card.label}</span>
                    <h3>{card.title}</h3>
                    <p>{card.support}</p>
                    <div className="stack-bento-pills">
                      {card.chips.map((skill) => (
                        <span key={skill}>{skill}</span>
                      ))}
                    </div>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section id="blog" className="snap-section blog-section">
        <div className="site-frame blog-grid">
          <Reveal className="blog-copy">
            <h2 className="blog-copy-title">Field notes</h2>
            <Link className="text-link" href="/blog">
              All posts <SiteIcon name="arrowRight" size={18} />
            </Link>
            <div className="blog-copy-figure" data-parallax="-4">
              <ThemedImage
                light="/images/new/blog-light.png"
                dark="/images/new/blog-dark.png"
                alt="Risograph illustration of books and reading notes."
                sizes="(min-width: 1024px) 28vw, 72vw"
                className="blended-illustration"
              />
            </div>
          </Reveal>
          <div className="blog-editorial">
            {leadPost ? (
              <Reveal className="blog-feature-reveal">
                <Link
                  href={`/blog/${leadPost.slug}`}
                  className="blog-feature-card"
                >
                  <span className="blog-ghost-index">01</span>
                  <div className="blog-card-inner">
                    <div className="blog-card-face blog-card-front">
                      <div className="blog-feature-image">
                        <ThemedImage
                          light={leadPost.image.light}
                          dark={leadPost.image.dark}
                          alt={leadPost.image.alt}
                          sizes="(min-width: 1024px) 16vw, 32vw"
                          className="blended-illustration"
                        />
                      </div>
                      <div className="blog-feature-copy">
                        <p>{new Date(leadPost.date).getFullYear()}</p>
                        <h3>{leadPost.title}</h3>
                      </div>
                      <SiteIcon name="arrowUpRight" size={26} />
                    </div>
                    <div className="blog-card-face blog-card-back">
                      <p>{leadPost.excerpt}</p>
                      <span>
                        Read note <SiteIcon name="arrowUpRight" size={18} />
                      </span>
                    </div>
                  </div>
                </Link>
              </Reveal>
            ) : null}
            <div className="blog-list">
              {secondaryPosts.map((post, index) => (
                <Reveal key={post.slug} delay={(index + 1) * 0.06}>
                  <Link href={`/blog/${post.slug}`} className="blog-row">
                    <span className="blog-ghost-index">0{index + 2}</span>
                    <div className="blog-card-inner">
                      <div className="blog-card-face blog-card-front">
                        <div className="blog-row-image" aria-hidden="true">
                          <ThemedImage
                            light={post.image.light}
                            dark={post.image.dark}
                            alt=""
                            sizes="7rem"
                            className="blended-illustration"
                          />
                        </div>
                        <div>
                          <p>{new Date(post.date).getFullYear()}</p>
                          <h3>{post.title}</h3>
                        </div>
                        <SiteIcon name="arrowUpRight" size={24} />
                      </div>
                      <div className="blog-card-face blog-card-back">
                        <p>{post.excerpt}</p>
                        <span>
                          Read note <SiteIcon name="arrowUpRight" size={18} />
                        </span>
                      </div>
                    </div>
                  </Link>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      <Testimonials />

      <MotionFooter />
    </>
  )
}
