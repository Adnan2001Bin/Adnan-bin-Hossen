import { collection, config, fields, singleton } from "@keystatic/core"

import { shouldUseKeystaticGithubStorage } from "@/lib/keystatic-env"

const storage = shouldUseKeystaticGithubStorage()
  ? ({
      kind: "github",
      repo: "hrmasss/hojayfa",
    } as const)
  : ({ kind: "local" } as const)

const seoFields = {
  seoTitle: fields.text({
    label: "SEO title",
    validation: { isRequired: false },
  }),
  seoDescription: fields.text({
    label: "SEO description",
    multiline: true,
    validation: { isRequired: false },
  }),
}

const imageFields = fields.object(
  {
    light: fields.text({ label: "Light image path" }),
    dark: fields.text({ label: "Dark image path" }),
    alt: fields.text({ label: "Alt text" }),
  },
  { label: "Image" },
)

const stringList = (label: string, itemLabel: string) =>
  fields.array(fields.text({ label: itemLabel }), {
    label,
    itemLabel: (props) => props.value,
  })

export default config({
  storage,
  ui: {
    brand: { name: "Adnan Content" },
    navigation: {
      Writing: ["blog", "work"],
      Settings: [
        "site",
        "profile",
        "navigation",
        "experience",
        "skills",
        "resume",
        "testimonials",
      ],
    },
  },
  collections: {
    blog: collection({
      label: "Blog",
      path: "content/blog/*",
      slugField: "title",
      format: { contentField: "content" },
      entryLayout: "content",
      columns: ["title", "status", "date"],
      schema: {
        title: fields.slug({
          name: { label: "Title" },
          slug: { label: "Slug" },
        }),
        status: fields.select({
          label: "Status",
          defaultValue: "draft",
          options: [
            { label: "Draft", value: "draft" },
            { label: "Published", value: "published" },
          ],
        }),
        date: fields.date({ label: "Published date" }),
        updatedAt: fields.date({
          label: "Updated date",
          validation: { isRequired: false },
        }),
        excerpt: fields.text({ label: "Excerpt", multiline: true }),
        tags: stringList("Tags", "Tag"),
        image: imageFields,
        ...seoFields,
        content: fields.mdx({ label: "Body" }),
      },
    }),
    work: collection({
      label: "Work",
      path: "content/work/*",
      slugField: "name",
      format: { contentField: "content" },
      entryLayout: "content",
      columns: ["name", "status", "category", "year"],
      schema: {
        name: fields.slug({
          name: { label: "Name" },
          slug: { label: "Slug" },
        }),
        status: fields.select({
          label: "Status",
          defaultValue: "draft",
          options: [
            { label: "Draft", value: "draft" },
            { label: "Published", value: "published" },
          ],
        }),
        order: fields.integer({
          label: "Display order",
          validation: { isRequired: false },
        }),
        url: fields.url({
          label: "Project URL",
          validation: { isRequired: false },
        }),
        category: fields.text({ label: "Category" }),
        year: fields.text({ label: "Year or period" }),
        summary: fields.text({ label: "Summary", multiline: true }),
        stack: stringList("Stack", "Tool"),
        metrics: fields.array(
          fields.object({
            label: fields.text({ label: "Label" }),
            value: fields.text({ label: "Value" }),
          }),
          {
            label: "Metrics",
            itemLabel: (props) => props.fields.label.value,
          },
        ),
        image: imageFields,
        ...seoFields,
        content: fields.mdx({ label: "Case study" }),
      },
    }),
  },
  singletons: {
    site: singleton({
      label: "Site",
      path: "content/settings/site",
      format: "json",
      schema: {
        name: fields.text({ label: "Name" }),
        domain: fields.text({ label: "Domain" }),
        url: fields.url({ label: "Canonical URL" }),
        title: fields.text({ label: "Default title" }),
        description: fields.text({ label: "Description", multiline: true }),
      },
    }),
    profile: singleton({
      label: "Profile",
      path: "content/settings/profile",
      format: "json",
      schema: {
        name: fields.text({ label: "Name" }),
        email: fields.text({ label: "Email" }),
        url: fields.url({ label: "URL" }),
        role: fields.text({ label: "Role" }),
        titles: stringList("Titles", "Title"),
        location: fields.text({ label: "Location" }),
        availability: fields.text({ label: "Availability" }),
        booking: fields.text({
          label: "Booking link",
          validation: { isRequired: false },
        }),
        summary: fields.text({ label: "Summary", multiline: true }),
        socials: fields.array(
          fields.object({
            label: fields.text({ label: "Label" }),
            username: fields.text({ label: "Username" }),
            href: fields.text({ label: "Href" }),
            icon: fields.select({
              label: "Icon",
              defaultValue: "external",
              options: [
                { label: "GitHub", value: "github" },
                { label: "LinkedIn", value: "linkedin" },
                { label: "Mail", value: "mail" },
                { label: "External", value: "external" },
              ],
            }),
          }),
          {
            label: "Social links",
            itemLabel: (props) => props.fields.label.value,
          },
        ),
      },
    }),
    navigation: singleton({
      label: "Navigation",
      path: "content/settings/navigation",
      format: "json",
      schema: {
        items: fields.array(
          fields.object({
            label: fields.text({ label: "Label" }),
            href: fields.text({ label: "Href" }),
          }),
          {
            label: "Items",
            itemLabel: (props) => props.fields.label.value,
          },
        ),
      },
    }),
    experience: singleton({
      label: "Experience",
      path: "content/settings/experience",
      format: "json",
      schema: {
        items: fields.array(
          fields.object({
            organization: fields.text({ label: "Organization" }),
            url: fields.url({
              label: "URL",
              validation: { isRequired: false },
            }),
            location: fields.text({ label: "Location" }),
            role: fields.text({ label: "Role" }),
            start: fields.text({ label: "Start" }),
            end: fields.text({ label: "End" }),
            highlights: stringList("Highlights", "Highlight"),
          }),
          {
            label: "Experience",
            itemLabel: (props) => props.fields.organization.value,
          },
        ),
      },
    }),
    skills: singleton({
      label: "Skills",
      path: "content/settings/skills",
      format: "json",
      schema: {
        groups: fields.array(
          fields.object({
            category: fields.text({ label: "Category" }),
            skills: stringList("Skills", "Skill"),
          }),
          {
            label: "Groups",
            itemLabel: (props) => props.fields.category.value,
          },
        ),
      },
    }),
    resume: singleton({
      label: "Resume",
      path: "content/settings/resume",
      format: "json",
      schema: {
        pdfPath: fields.text({ label: "PDF path" }),
        headline: fields.text({ label: "Headline", multiline: true }),
        summary: fields.text({ label: "Summary", multiline: true }),
        sourceNote: fields.text({ label: "Source note", multiline: true }),
        education: fields.array(
          fields.object({
            institution: fields.text({ label: "Institution" }),
            url: fields.url({ label: "URL", validation: { isRequired: false } }),
            location: fields.text({ label: "Location" }),
            credential: fields.text({ label: "Credential" }),
            start: fields.text({ label: "Start" }),
            end: fields.text({ label: "End" }),
            highlights: stringList("Highlights", "Highlight"),
          }),
          {
            label: "Education",
            itemLabel: (props) => props.fields.institution.value,
          },
        ),
        languages: fields.array(
          fields.object({
            name: fields.text({ label: "Language" }),
            proficiency: fields.text({ label: "Proficiency" }),
          }),
          {
            label: "Languages",
            itemLabel: (props) => props.fields.name.value,
          },
        ),
      },
    }),
    testimonials: singleton({
      label: "Testimonials",
      path: "content/settings/testimonials",
      format: "json",
      schema: {
        items: fields.array(
          fields.object({
            quote: fields.text({ label: "Quote", multiline: true }),
            author: fields.text({ label: "Author" }),
            role: fields.text({ label: "Role" }),
            organization: fields.text({
              label: "Organization",
              validation: { isRequired: false },
            }),
            url: fields.url({ label: "URL", validation: { isRequired: false } }),
          }),
          {
            label: "Testimonials",
            itemLabel: (props) => props.fields.author.value,
          },
        ),
      },
    }),
  },
})
