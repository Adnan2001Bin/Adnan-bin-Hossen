import type { NextApiRequest, NextApiResponse } from "next"
import { makeAPIRouteHandler } from "@keystatic/next/api"

import config from "@/keystatic.config"
import { hasKeystaticGithubEnv, wantsKeystaticGithubStorage } from "@/lib/keystatic-env"

const canUseRouteHandler =
  !wantsKeystaticGithubStorage() ||
  hasKeystaticGithubEnv() ||
  process.env.NODE_ENV === "development"

export default async function handler(
  request: NextApiRequest,
  response: NextApiResponse,
) {
  if (!canUseRouteHandler) {
    response
      .status(503)
      .send(
        [
          "Keystatic GitHub app setup is not complete.",
          "",
          "Do the first-time setup locally instead:",
          "1. Run the site locally.",
          "2. Open http://localhost:3000/keystatic/setup.",
          "3. Click Create GitHub App, not production Login with GitHub.",
          "4. Add the generated GitHub App env vars to Vercel.",
        ].join("\n"),
      )
    return
  }

  const routeHandler = makeAPIRouteHandler({ config })
  await routeHandler(request, response)
}
