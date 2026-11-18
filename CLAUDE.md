# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Bilingual (pt-BR default, en) personal portfolio at `me.gaqtech.dev`, built with **Astro 7** as a fully static site and deployed to GitHub Pages through GitHub Actions. Planned later: es and fr locales; possible migration to Next.js on Vercel or to the owner's Oracle ARM server (Coolify, Cloudflare DNS).

## Commands

```bash
npm install
npm run dev         # dev server on :4321
npm run build       # astro check (types) + astro build -> dist/
npm run build:fast  # build without type check
npm run preview
```

Node >= 22.12. There is no test suite; `npm run build` is the gate (it validates the content schema and types).

## Deployment

`.github/workflows/deploy.yml` builds on every push/PR to `master` and deploys `dist/` to GitHub Pages on push. Repo setting **Pages → Source** must be **GitHub Actions**. With Actions, GitHub ignores the `CNAME` file: the custom domain `me.gaqtech.dev` must be set in **Settings → Pages → Custom domain** (switching the source once cleared it). DNS: Cloudflare CNAME `me` → GitHub Pages, DNS only. `public/CNAME` is kept only as documentation.

## Hard Constraints

- **Static output only**: no SSR adapter, no server endpoints at runtime. Endpoints in `src/pages/*.ts` are prerendered files.
- **No UI framework on the client**: Astro components + small vanilla `<script>` blocks. Don't add React/Vue/jQuery/Bootstrap.
- **No em dash ("—") in any user-facing copy** (owner preference). Use commas, periods, colons or "a/to". En dash "–" only in date ranges.
- **Every user-facing string exists in both `pt` and `en`**. UI strings in `src/i18n/ui.ts`; content in `src/data/profile.ts` and the project YAMLs.
- **Profile photo in the hero is `loading="eager"`** (above the fold). The source image `src/assets/img/profile.jpg` has EXIF stripped; keep it that way.
- **GA4 ID `G-PG7DWB3S52` is the owner's real ID**; keep it in `site.gaId`.
- **OpenAI logo stays local** at `public/img/logos/openai.svg`. Skill logos are self-hosted devicons in `public/img/skills/` (no CDN).
- **Web3Forms access key** goes in `site.web3formsKey` (public by design). Empty key = form shows the email fallback on submit.

## Architecture

```
src/
  content.config.ts        # zod schema for the projects collection
  content/projects/*.yaml  # one file per project; filename = slug
  data/profile.ts          # site config, about, experience, education, certs, skills
  i18n/ui.ts, utils.ts     # UI strings, URL helpers (homeUrl, projectUrl, aiPageUrl, markdownUrl)
  lib/projects.ts          # getProjects/getFeatured/getCatalog, CATALOG_PAGE_SIZE, CATALOG_INCLUDES_FEATURED
  lib/markdown.ts          # builds portfolio markdown + llms.txt from the same data
  lib/icons.ts             # inlines Boxicons SVGs at build time (getIcon)
  layouts/Base.astro       # head (SEO, hreflang, OG, JSON-LD, theme script, GA4), header, footer
  components/              # Header, Hero, About, Projects, ProjectCard, ProjectCover, Experience,
                           # Skills, Education, Contact, Footer, HomePage, ProjectPage, AiPage, Icon
  pages/                   # index (pt), en/index, projetos/[slug], en/projects/[slug], ia/, en/ai/,
                           # portfolio.md, en/portfolio.md, llms.txt, llms-full.txt, 404
  styles/global.css        # tokens + base + shared utilities
public/                    # CNAME, favicon, manifest, robots.txt, og.png, img/, projects/*.html (old-URL redirects)
```

### Routing / i18n

Astro i18n with `defaultLocale: 'pt'`, `prefixDefaultLocale: false`. pt lives at `/`, en at `/en/`. Localized path segments: `projetos`/`projects`, `ia`/`ai`. Always build URLs through `src/i18n/utils.ts`. Each page passes `alternates` to `Base` for hreflang tags and the language menu (a `<details>` dropdown that scales to more languages).

To add a locale (es, fr): add it to `languages` and `ui` in `src/i18n/ui.ts`, to `astro.config.mjs` (i18n + sitemap), add the key to the `text`/`list` schemas in `content.config.ts` and to every YAML and `profile.ts` entry, then create `src/pages/<lang>/...` route files mirroring `en/`.

### Projects

- Schema fields: `title, summary, problem, features, results?, metrics?, sections?, notes?` (all `{pt, en}`), `category: app|tool`, `status: production|development|completed`, `featured`, `private`, `order`, `icon` (Boxicons name), `hue` (0-360, generated cover gradient), `stack[]`, `links{repo,demo,store}`, `cover?`, `screenshots?[{src, alt}]` (paths relative to the YAML, images in `src/assets/projects/<slug>/`).
- Featured projects render in a scroll-snap carousel. The catalog below shows the non-featured ones (`CATALOG_INCLUDES_FEATURED = false`) with category filters and client-side pagination (`CATALOG_PAGE_SIZE = 3`). Without JS the full list is shown.
- Private projects show a lock badge and a private-note box on the detail page; never add repo links for them.
- Copy rule: publish facts only. Don't publish "no metrics documented"-style caveats; omit the field instead.

### Theme

Dark is the brand default. Tokens on `:root` (dark), `:root[data-theme='light']`, and a `prefers-color-scheme` fallback for no-JS. An inline head script sets `data-theme` before paint from `localStorage.theme` or the system preference; the header toggle flips it.

## Colors

| Token | Dark | Light | Usage |
|---|---|---|---|
| `--accent` | `#12d640` | `#12d640` | Buttons, highlights, adv tier |
| `--accent-text` | `#12d640` | `#087a26` | Accent text (AA contrast on light) |
| `--bg` | `#010e1b` | `#f5f7fa` | Page background |
| `--surface` | `#061a2e` | `#ffffff` | Cards |
| `--tier-int` | `#ffc107` | `#a87700` | Intermediate tier |
| `--tier-bas` | `#8b97a4` | `#5d6a77` | Basic tier |
| `--gold` | `#c9a33a` | `#8a6d17` | Featured star, private note icon |
