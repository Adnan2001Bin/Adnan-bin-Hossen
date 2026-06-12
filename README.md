# Hojayfa Portfolio

Reference-faithful personal portfolio for Hojayfa Rahman, built as a motion-rich, SEO-sensitive Next.js site with static data that can later move behind ISR or server-rendered content.

## Overview

The site pairs a neutral atmospheric interface with risograph-inspired illustrations, section snapping, a horizontal work carousel, MDX blog content, and structured SEO for portfolio, work, and writing pages.

## Tech Stack

- Next.js 16 and React 19
- Tailwind CSS 4, shadcn/ui preset, and `tailwindcss-motion`
- Framer Motion and GSAP ScrollTrigger
- Hugeicons React
- Local MDX blog content with static metadata
- Optimized AVIF/WebP assets in `public/images`

## Routes

- `/` portfolio homepage
- `/blog` blog index
- `/blog/[slug]` static article pages
- `/work/[slug]` project detail pages
- `/sitemap.xml` and `/robots.txt`

## Getting Started

```bash
pnpm install
pnpm dev
```

Open `http://localhost:3000`.

## Quality Checks

```bash
pnpm lint
pnpm typecheck
pnpm build
```

## Notes

Private reference material, local agent files, build output, dependency folders, TypeScript cache files, and environment files are intentionally ignored.
