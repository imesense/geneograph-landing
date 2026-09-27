# AGENTS.md

Guidelines for AI agents working on the GeneoGraph landing repository.

## Project Overview

GeneoGraph landing is a static multi-page site (English + Russian) for the GeneoGraph genealogy research workspace. It has no build tooling, no package manager and no framework: plain HTML, CSS and vanilla JavaScript in `src/` are deployed as-is to GitHub Pages by `.github/workflows/deploy-landing.yml` (the workflow just copies `src/` to `dist/`). The primary conversion is the "Try Demo" CTA pointing to `https://imesense.github.io/geneograph-prototype/`.

Before making content or design changes, read:

- `PRODUCT.md` — product positioning, audience, capabilities and constraints, brand commitments.
- `DESIGN.md` — design system: colors, typography, layout, components, do's and don'ts.
- `.impeccable/design.json` — machine-readable design tokens (color ramps, shadows, motion, breakpoints).

## Repository Structure

- `src/` — the deployed site root.
  - `index.html`, `contact.html`, `privacy.html` — English pages.
  - `ru/index.html`, `ru/contact.html`, `ru/privacy.html` — Russian pages (keep in sync with English versions).
  - `Main.css` — single shared stylesheet (design tokens live in `:root`).
  - `ResearchGroup.js` — form handling for the Research Group and contact forms; localizes messages via `document.documentElement.lang === 'ru'`.
  - `prototype-*.png` / `prototype-*.webp` — optimized captures of the Whiskerfield sample project from the separate prototype. Treat as binary assets; do not edit.
  - `logo.svg` — brand mark.
- `.github/workflows/deploy-landing.yml` — GitHub Pages deployment on pushes to the `default` branch.
- `DESIGN.md`, `PRODUCT.md`, `.impeccable/design.json` — design and product sources of truth.

## File Format Rules (from `.gitattributes` / `.editorconfig`)

- Encoding is UTF-8 for all text files.
- Line endings and indentation by file type:
  - CRLF: `.txt`, `.md` (2-space indent), `.editorconfig` (4-space indent).
  - LF: `.htm`, `.html`, `.css`, `.json`, `.js` (4-space indent), `.gitattributes`, `.gitignore` (tab indent).
- Always end files with a final newline.
- `.svg`, `.png`, `.webp`, `.ico` are binary — never normalize them as text.

## Coding Conventions

- No build step, no dependencies, no transpilation. Keep it that way; write plain, standards-based HTML/CSS/JS.
- JavaScript: Allman-style braces (opening brace on its own line), single quotes for strings, no semicolons omitted inconsistently (follow existing style in `ResearchGroup.js`).
- CSS: custom properties in `:root` for tokens (`--bg`, `--green`, `--max`, etc.); reuse tokens instead of hard-coded values.
- HTML: semantic elements (`section`, `figure`, `article`, `nav`), explicit `width`/`height` on images, `loading="lazy"`/`decoding="async"` for non-hero images, `fetchpriority="high"` only for the hero image.
- Language switching is per-page via `<html lang="...">`; `ResearchGroup.js` reads it to pick localized messages. When adding user-facing text, update both English and Russian pages.

## Mandatory Decomposition Rule

The project must stay a decomposed static site at all times — during refactors, rewrites and redesigns alike:

- **No inline CSS or JavaScript in HTML.** All styles live in `.css` files and all behavior lives in `.js` files, linked via `<link rel="stylesheet">` and `<script src="..." defer>`. Do not add `<style>` blocks, inline `style="..."` attributes, or `onclick`/inline event handlers in markup. If styling or behavior is needed, put it in the appropriate external file.
- **Keep markup structural.** HTML carries content and semantics only; presentation belongs in CSS, logic in JS.
- **Keep the project static.** No build tooling, bundling, package manager, client-side framework or server runtime may be introduced. The deployed output is exactly the files in `src/`.
- Preserve the existing file layout (`src/*.html`, `src/Main.css`, `src/ResearchGroup.js`, `src/ru/`); extend it rather than restructuring it unless the user explicitly asks.

## Content and Design Rules

- Capitalization: the product is **GeneoGraph**; the visual board/workspace is **Geneograph**.
- The interactive application is a prototype. Never present planned capabilities as shipped; distinguish prototype behavior from product direction.
- Use the Whiskerfield sample project (Silver Whiskerfield, Luna Purrington, the Meowbridge marriage record) consistently across module views. This is sample data, not historical records.
- Keep the charcoal/near-black + GeneoGraph green identity (`#0b100e` background, `#66d58f` primary, `#e3b579` for "possible" relationships). Amber is reserved for possible/uncertain relationships only.
- Typography: Manrope for display and body; content width capped at 1320px.
- No floating cards, decorative connectors, fake dashboards, glass/glow effects, or generic startup motifs.
- Prototype captures are static images identified as sample-project views; wrap wide ones in keyboard-focusable scroll regions (`.image-scroll` with `tabindex="0"`, `role="group"`, descriptive `aria-label`).

## Accessibility Requirements

Maintain on every change:

- Semantic heading hierarchy and skip link.
- Keyboard focus styles (`:focus-visible` with the green outline) and `tabindex`-focusable scroll regions.
- Native links and controls (`<a>`, `<button>`, `<details>`).
- Legible contrast; secondary text must stay readable, not faint.
- Reduced-motion support and non-color labels for uncertain relationship states.
- Descriptive `alt` text for prototype captures; decorative images use `alt=""`.

## Deployment

- Pushes to the `default` branch that touch `.github/workflows/**`, `src/**` or top-level `*.html`/`*.css`/`*.js` trigger the deploy workflow.
- The site is served from `src/` contents; verify pages locally by opening `src/index.html` in a browser before pushing.
- The non-deployed `design-backups/` directory (if present) holds prior illustrative designs; do not link it into the live site.

## License

Repository contents are licensed under GNU GPL 3 (see `LICENSE.txt`). Do not add code with incompatible licenses.
