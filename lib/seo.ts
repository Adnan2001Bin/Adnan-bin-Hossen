import { experience } from "@/data/experience"
import { profile } from "@/data/profile"
import { resume } from "@/data/resume"
import { site } from "@/data/site"

export const seoKeywords = [
  "Adnan Bin Hossen",
  "Full Stack Developer",
  "Web Developer",
  "React Developer",
  "Next.js Developer",
  "Node.js Developer",
  "TypeScript Developer",
  "React Native Developer",
  "MongoDB",
  "Express.js",
  "Dhaka Software Engineer",
]

export const defaultSocialImage = "/images/blended/hero-potrait-light.avif"

export function absoluteUrl(path: string) {
  if (path.startsWith("http")) {
    return path
  }

  return `${site.url}${path.startsWith("/") ? path : `/${path}`}`
}

export function personJsonLd() {
  const currentRole = experience[0]

  return {
    "@type": "Person",
    "@id": `${site.url}/#person`,
    name: profile.name,
    url: site.url,
    email: `mailto:${profile.email}`,
    jobTitle: profile.role,
    description: profile.summary,
    image: absoluteUrl(defaultSocialImage),
    address: {
      "@type": "PostalAddress",
      addressLocality: "Dhaka",
      addressCountry: "BD",
    },
    sameAs: profile.socials
      .filter((social) => social.href.startsWith("http"))
      .map((social) => social.href),
    knowsAbout: seoKeywords.filter((keyword) => keyword !== profile.name),
    knowsLanguage: (resume.languages ?? []).map((language) => language.name),
    hasOccupation: {
      "@type": "Occupation",
      name: profile.role,
      occupationLocation: {
        "@type": "City",
        name: "Dhaka, Bangladesh",
      },
      skills: seoKeywords.filter((keyword) => keyword !== profile.name).join(", "),
    },
    ...(currentRole
      ? {
          worksFor: {
            "@type": "Organization",
            name: currentRole.organization,
            ...(currentRole.url ? { url: currentRole.url } : {}),
          },
        }
      : {}),
    alumniOf: (resume.education ?? []).map((entry) => ({
      "@type": "EducationalOrganization",
      name: entry.institution,
      ...(entry.url ? { url: entry.url } : {}),
    })),
  }
}

export function organizationJsonLd() {
  return {
    "@type": "Organization",
    "@id": `${site.url}/#brand`,
    name: site.name,
    url: site.url,
    logo: absoluteUrl(defaultSocialImage),
    founder: {
      "@id": `${site.url}/#person`,
    },
    sameAs: profile.socials
      .filter((social) => social.href.startsWith("http"))
      .map((social) => social.href),
  }
}

export function websiteJsonLd() {
  return {
    "@type": "WebSite",
    "@id": `${site.url}/#website`,
    url: site.url,
    name: site.name,
    description: site.description,
    inLanguage: "en",
    publisher: {
      "@id": `${site.url}/#person`,
    },
    author: {
      "@id": `${site.url}/#person`,
    },
  }
}

export function faqJsonLd(items: { question: string; answer: string }[]) {
  return {
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  }
}

export function webPageJsonLd({
  path,
  name,
  description,
  type = "WebPage",
}: {
  path: string
  name: string
  description: string
  type?: "WebPage" | "ProfilePage" | "CollectionPage" | "Blog"
}) {
  const url = absoluteUrl(path)

  return {
    "@type": type,
    "@id": `${url}#webpage`,
    url,
    name,
    description,
    isPartOf: {
      "@id": `${site.url}/#website`,
    },
    about: {
      "@id": `${site.url}/#person`,
    },
    inLanguage: "en",
  }
}

export function breadcrumbJsonLd(
  items: {
    name: string
    path: string
  }[]
) {
  return {
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: absoluteUrl(item.path),
    })),
  }
}
