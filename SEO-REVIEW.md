# SEO / GEO / Personal-Branding Overhaul — Review & Assumptions Log

This document logs every fact that was **inferred, weakly supported, or drafted from reasoning** during the autonomous SEO/GEO overhaul, so you can review and correct it. It also lists genuine gaps that need data only you can provide.

Confidence grades: **High** = sourced from your own résumé/GitHub/site; **Medium** = taken from a live product marketing site (may be marketing copy, not audited fact); **Low** = reasoned/drafted, unverified.

---

## 1. Facts sourced and used (research footprint)

Sources read on 2026-06-09:

- `public/resume/Adnan Bin Hossen.pdf` (your bundled résumé, 2 pages)
- `github.com/Adnan2001Bin` (public profile + pinned repos)
- `oppora.ai`, `sailorsearch.dev`, `heimdall.social` (live product sites)
- Web search for `"Adnan Bin Hossen"` / `Adnan2001Bin`

### High confidence (from your own résumé / GitHub) — used directly

- **Education added to `/resume`:** Daffodil International University — BSc in Software Engineering, Sep 2020 – Jun 2024, CGPA 3.71/4.00; Government Science College — HSC, GPA 4.33/5.00. _(From résumé PDF.)_
- **Languages added:** English (Professional Proficiency), Bangla (Native Speaker). _(From résumé PDF.)_
- **Humana Apparels** is part of **Ha-Meem Group** _(résumé)_ — noted but not changed in experience.json (kept existing label).
- GitHub bio, pinned repos (pixelq, fleethr, protrac-backend/frontend), and "Go, Python, TypeScript" focus — used to inform copy, not quoted as metrics.

---

## 2. ⚠️ Action items that need YOUR decision

### 2.1 Domain split (HIGH PRIORITY — affects SEO authority)

Your **résumé PDF and GitHub profile both list external URLs**, but the live site canonical (and recent git history) is **`adnan-bin-hossenebon.vercel.app`**. External links pointing at other domains split your ranking authority and confuse AI engines about your canonical identity.
**Recommended fix (one of):**

- (a) Point custom domains → 301-redirect to `adnan-bin-hossenebon.vercel.app` (keeps both, consolidates authority), **or**
- (b) Update GitHub website + résumé to `adnan-bin-hossenebon.vercel.app` for consistency.
  I did **not** change the canonical (it is correctly `adnan-bin-hossenebon.vercel.app`); this is an off-site consistency task only you can complete.

### 2.2 No X / Twitter presence found

No X account was discoverable via GitHub or web search. I therefore **did not** add an X link or `twitter:creator`. For a developer brand, an active X presence materially helps GEO (LLMs cite X heavily). **Suggestion:** create one and add it to `content/settings/profile.json` socials — the schema `sameAs` and Twitter card creator will pick it up automatically.

### 2.3 Branded email not adopted

The site shows `adnan2001bin@gmail.com` everywhere (confirmed as your contact on résumé + GitHub). No active `hi@adnan-bin-hossenebon.vercel.app` was found, so I **kept gmail**. **Suggestion:** set up a branded `hi@adnan-bin-hossenebon.vercel.app` forwarder for stronger brand consistency, then update `profile.json`.

### 2.4 Google Search Console verification token (BLOCKS one sub-task)

A `verification.google` slot is wired in `app/layout.tsx` but left empty (env-driven). To finish: create a Search Console property for `adnan-bin-hossenebon.vercel.app`, paste the token into the `NEXT_PUBLIC_GSC_VERIFICATION` env var (or the layout), redeploy, then submit `sitemap.xml`. Everything else ships without it.

### 2.5 Booking link (optional)

No public booking link (Cal.com/Calendly) found. The "Work with me" CTA falls back to email. Add a `booking` URL to `profile.json` to turn the CTA into a one-click scheduler.

### 2.6 Testimonials — structure shipped EMPTY (no fabrication)

No verifiable third-party testimonials about you were found (your GitHub follower count is low and LinkedIn recommendations are gated). I built the testimonials data structure + `Review` schema + render, but **left it empty** so nothing false ships. **To activate:** add real quotes (e.g. LinkedIn recommendations from SoftStandard / Ha-Meem / Hours Media colleagues) to `content/settings/testimonials.json`; the section auto-appears.

---

## 3. Project metrics — MEDIUM confidence (from product marketing sites)

The metrics now shown on the work cards/case studies were pulled from the **live product sites you built the backend for**. They are product/marketing claims, framed as _system scale_ (not as your personal performance numbers). Please verify or adjust each:

| Project       | Metric shown                                                     | Source               | Note                                                                                                                                                          |
| ------------- | ---------------------------------------------------------------- | -------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Oppora AI     | "8 AI agents", "1B+ verified leads", "MCP + REST (51 tools)"     | oppora.ai            | Product capability claims. Site also states "5,000+ customers" and a "$850k in 2 months" customer result — I deliberately did **not** attribute those to you. |
| Sailor Search | "~70% smaller token output", "99.99% uptime", "<300 ms response" | sailorsearch.dev     | Marketing-page figures; confirm they reflect the production system.                                                                                           |
| Heimdall      | "2,000+ marketing teams", "8 publishing channels"                | heimdall.social      | "Teams" is a product traction claim, not your metric; some other page numbers appeared corrupted and were excluded.                                           |
| ProTrac       | "Real-time floor signals", "DHU + bottleneck + plan-vs-actual"   | résumé (qualitative) | No public numbers; kept descriptive, not numeric.                                                                                                             |
| TrueSpec      | "Order lifecycle + anomaly detection"                            | résumé (qualitative) | No public numbers; kept descriptive.                                                                                                                          |

If any of these are wrong or you'd rather not display product-traction numbers, edit the `metrics:` block in the corresponding `content/work/*.mdx` file (or remove it).

---

## 4. Long-form content — LOW confidence (drafted prose)

Blog posts were expanded from ~250 words to long-form, and case studies deepened (Problem → Approach → Outcome). The **arguments and engineering reasoning are drafted in your voice from your existing material** — they contain **no invented numbers**. Please read for accuracy of claims and tone before they represent you publicly. Files:

- `content/blog/agent-friendly-search-apis.mdx`
- `content/blog/backend-systems-that-reduce-dependencies.mdx`
- `content/blog/production-workflows-need-action-signals.mdx`
- `content/work/*.mdx` (expanded sections)
- `app/uses/page.tsx` ("How I work" — timezone GMT+6, engagement types are reasoned defaults; adjust to taste)

---

## 5. What shipped with no caveats (high confidence, mechanical)

- Per-page dynamic OG/Twitter images (`next/og`) with title + role + domain.
- `llms.txt` for AI crawlers.
- Icon set (`app/icon`, `app/apple-icon`) + manifest entries.
- `/resume` now renders experience + skills + education + languages as crawlable HTML (was PDF-only).
- Schema: `Organization` publisher, `Person` enriched with `hasOccupation`/`alumniOf`/`knowsLanguage`, `BlogPosting` + `wordCount`/`inLanguage`, `FAQPage` on `/uses`.
- Vercel Analytics + Speed Insights.
- "Work with me" CTA in hero + footer.
