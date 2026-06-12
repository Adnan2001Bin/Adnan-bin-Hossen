export type NavItem = {
  label: string
  href: string
}

export type SocialLink = {
  label: string
  username: string
  href: string
  icon: "github" | "linkedin" | "mail" | "external"
}

export type Profile = {
  name: string
  email: string
  url: string
  role: string
  titles: string[]
  location: string
  summary: string
  availability: string
  booking?: string
  socials: SocialLink[]
}

export type SiteSettings = {
  name: string
  domain: string
  url: string
  title: string
  description: string
}

export type ResumeSettings = {
  pdfPath: string
  headline: string
  summary: string
  sourceNote?: string
  education?: EducationEntry[]
  languages?: LanguageEntry[]
}

export type EducationEntry = {
  institution: string
  url?: string
  location: string
  credential: string
  start: string
  end: string
  highlights: string[]
}

export type LanguageEntry = {
  name: string
  proficiency: string
}

export type Testimonial = {
  quote: string
  author: string
  role: string
  organization?: string
  url?: string
}

export type WorkMeta = {
  slug: string
  name: string
  status?: "draft" | "published"
  order?: number
  url?: string
  category: string
  year: string
  summary: string
  stack: string[]
  metrics?: { label: string; value: string }[]
  image: {
    light: string
    dark: string
    alt: string
  }
  seoTitle?: string
  seoDescription?: string
}

export type Experience = {
  organization: string
  url?: string
  location: string
  role: string
  start: string
  end: string
  highlights: string[]
}

export type SkillGroup = {
  category: string
  skills: string[]
}

export type BlogMeta = {
  slug: string
  title: string
  status?: "draft" | "published"
  date: string
  updatedAt?: string
  excerpt: string
  tags: string[]
  image: {
    light: string
    dark: string
    alt: string
  }
  seoTitle?: string
  seoDescription?: string
  readingTime?: string
}
