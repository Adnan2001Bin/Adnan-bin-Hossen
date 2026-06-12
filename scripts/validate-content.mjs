import fs from "node:fs"
import path from "node:path"
import process from "node:process"

import matter from "gray-matter"

const root = process.cwd()
const contentRoot = path.join(root, "content")

const errors = []

function readJson(relativePath) {
  const filePath = path.join(root, relativePath)

  try {
    return JSON.parse(fs.readFileSync(filePath, "utf8"))
  } catch (error) {
    errors.push(`${relativePath}: invalid JSON (${error.message})`)
    return null
  }
}

function requireString(value, label, file) {
  if (typeof value !== "string" || value.trim() === "") {
    errors.push(`${file}: missing ${label}`)
  }
}

function requireStringArray(value, label, file) {
  if (!Array.isArray(value) || value.length === 0) {
    errors.push(`${file}: ${label} must be a non-empty array`)
    return
  }

  for (const item of value) {
    if (typeof item !== "string" || item.trim() === "") {
      errors.push(`${file}: ${label} contains an empty value`)
    }
  }
}

function requireDate(value, label, file) {
  requireString(value, label, file)

  if (typeof value === "string" && Number.isNaN(Date.parse(value))) {
    errors.push(`${file}: ${label} must be a valid date`)
  }
}

function requireImage(value, file) {
  if (!value || typeof value !== "object") {
    errors.push(`${file}: missing image`)
    return
  }

  requireString(value.light, "image.light", file)
  requireString(value.dark, "image.dark", file)
  requireString(value.alt, "image.alt", file)
}

function validateCollection(collection, requiredFields) {
  const dir = path.join(contentRoot, collection)
  const seenSlugs = new Set()

  for (const fileName of fs.readdirSync(dir)) {
    if (!fileName.endsWith(".mdx")) {
      continue
    }

    const slug = fileName.replace(/\.mdx$/, "")
    const relativePath = path.join("content", collection, fileName)
    const filePath = path.join(dir, fileName)
    const { content, data } = matter(fs.readFileSync(filePath, "utf8"))

    if (seenSlugs.has(slug)) {
      errors.push(`${relativePath}: duplicate slug ${slug}`)
    }

    seenSlugs.add(slug)

    if (!["draft", "published"].includes(data.status)) {
      errors.push(`${relativePath}: status must be draft or published`)
    }

    for (const field of requiredFields) {
      requireString(data[field], field, relativePath)
    }

    if (collection === "blog") {
      requireDate(data.date, "date", relativePath)

      if (data.updatedAt) {
        requireDate(data.updatedAt, "updatedAt", relativePath)
      }

      requireStringArray(data.tags, "tags", relativePath)
    }

    if (collection === "work") {
      requireStringArray(data.stack, "stack", relativePath)
    }

    requireImage(data.image, relativePath)

    if (data.seoTitle) {
      requireString(data.seoTitle, "seoTitle", relativePath)
    }

    if (data.seoDescription) {
      requireString(data.seoDescription, "seoDescription", relativePath)
    }

    if (content.trim().length < 200) {
      errors.push(`${relativePath}: content is too short for a public-quality page`)
    }
  }
}

function validateSettings() {
  const site = readJson("content/settings/site.json")
  const profile = readJson("content/settings/profile.json")
  const navigation = readJson("content/settings/navigation.json")
  const experience = readJson("content/settings/experience.json")
  const skills = readJson("content/settings/skills.json")
  const resume = readJson("content/settings/resume.json")

  if (site) {
    for (const field of ["name", "domain", "url", "title", "description"]) {
      requireString(site[field], field, "content/settings/site.json")
    }
  }

  if (profile) {
    for (const field of ["name", "email", "url", "role", "location", "summary"]) {
      requireString(profile[field], field, "content/settings/profile.json")
    }

    if (!Array.isArray(profile.socials) || profile.socials.length === 0) {
      errors.push("content/settings/profile.json: socials must be non-empty")
    }
  }

  if (navigation && (!Array.isArray(navigation.items) || navigation.items.length === 0)) {
    errors.push("content/settings/navigation.json: items must be non-empty")
  }

  if (experience && (!Array.isArray(experience.items) || experience.items.length === 0)) {
    errors.push("content/settings/experience.json: items must be non-empty")
  }

  if (skills && (!Array.isArray(skills.groups) || skills.groups.length === 0)) {
    errors.push("content/settings/skills.json: groups must be non-empty")
  }

  if (resume) {
    for (const field of ["pdfPath", "headline", "summary"]) {
      requireString(resume[field], field, "content/settings/resume.json")
    }
  }
}

validateCollection("blog", ["title", "excerpt"])
validateCollection("work", ["name", "category", "year", "summary"])
validateSettings()

if (errors.length) {
  console.error("Content validation failed:")
  for (const error of errors) {
    console.error(`- ${error}`)
  }
  process.exit(1)
}

console.log("Content validation passed.")
