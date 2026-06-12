import { execFileSync } from "node:child_process"
import process from "node:process"

const message = process.argv.slice(2).join(" ") || "Publish content updates"

function run(command, args) {
  execFileSync(command, args, {
    cwd: process.cwd(),
    stdio: "inherit",
    shell: process.platform === "win32",
  })
}

run("pnpm", ["validate:content"])
run("pnpm", ["typecheck"])
run("pnpm", ["lint"])
run("pnpm", ["build"])
run("git", ["add", "content", "app", "components", "data", "lib", "keystatic.config.ts", "package.json", "pnpm-lock.yaml"])

try {
  run("git", ["diff", "--cached", "--quiet"])
  console.log("No content changes to publish.")
} catch {
  run("git", ["commit", "-m", message])
  run("git", ["push"])
}
