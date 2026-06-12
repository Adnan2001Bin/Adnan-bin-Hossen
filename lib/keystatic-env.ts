export function wantsKeystaticGithubStorage() {
  return process.env.NEXT_PUBLIC_KEYSTATIC_STORAGE_KIND === "github"
}

export function hasKeystaticGithubEnv() {
  return Boolean(
    process.env.KEYSTATIC_GITHUB_CLIENT_ID &&
      process.env.KEYSTATIC_GITHUB_CLIENT_SECRET &&
      process.env.KEYSTATIC_SECRET &&
      process.env.NEXT_PUBLIC_KEYSTATIC_GITHUB_APP_SLUG,
  )
}

export function shouldUseKeystaticGithubStorage() {
  return wantsKeystaticGithubStorage()
}
