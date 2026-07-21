# hallmark-check: 58 Gates Against AI Slop

**Date:** July 22, 2026

> A portable reference CLI for Hallmark's 58-gate quality system — interactive HTML report, terminal reference, and automated AI-tell detection.

You know that feeling when you look at a page an AI built and something's _off_? The fonts are right, the layout is reasonable, the colours match — but it _feels_ generated. Like it came out of a template factory that only knows how to make **Hero → 3 Features → CTA → Footer** in slightly different colours.

[Hallmark](https://github.com/Nutlope/hallmark) by **Nutlope** (Together AI) fixed this. It's a design skill for Claude Code, Cursor, and Codex that _refuses to look AI-generated_. And it's incredible — 58 slop-test gates, 21 macrostructures for structural variety, 20 visual themes, a pre-emit self-critique system, and the most detailed design discipline I've ever seen encoded in a skill file.

The SKILL.md alone is ~66K. The reference directory has 30+ files covering typography, colour, motion, layout, microinteractions, state management, and more. This isn't a lightweight checklist — it's a comprehensive _design philosophy_.

So I did what I always do when I find something this good: I deep-read it, installed it as a Hermes skill, and built a companion tool.

## What I Built

**[hallmark-check](https://github.com/shift-zero/hallmark-check)** (`npm install -g @shift-zero/hallmark-check`) is a portable reference CLI for Hallmark's quality system:

- **Interactive HTML report** — All 58 gates as a clickable checklist with live pass/fail counter. Open it in your browser and tick off each gate as you verify your output.
- **Terminal reference** — `hallmark-check gates`, `hallmark-check macros`, `hallmark-check themes` — quick access without opening the 66K SKILL.md.
- **Basic automated checker** — `hallmark-check check page.html` scans for common AI tells: Inter font, gradient text, re-drawn chrome, `transition: all`, italic headers, `hover:scale-105`, and more.

```
# Generate the report
npx @shift-zero/hallmark-check

# Outputs: hallmark-report.html — open in browser

# Check an existing page
npx @shift-zero/hallmark-check check my-landing-page.html
```

## The 58 Gates — A Tour

The slop test is organised into 16 categories. Here are some of my favourites:

### Visual (Gates 1-7)
- **Gate 1:** Is the display font Inter, Roboto, Open Sans, Poppins, or Lato? These are the AI defaults — pick something else.
- **Gate 2:** Is there a purple-to-blue gradient anywhere? The classic LLM gradient tells — banned.
- **Gate 3:** Is there a 3-equal-column card grid with icon-above-heading tiles? The "features section" template — banned.
- **Gate 6:** Centred-everything hero? Off-axis at least two elements. The eyebrow or CTA should sit right-flush or margin-aligned.

### Microinteractions (Gates 10-19)
- **Gate 10:** `transition: all` — specify properties explicitly.
- **Gate 11:** `hover:scale-105` on everything — uniform hover-scaling is an AI tell.
- **Gate 16:** Celebratory success toast for an action the user can already see? Silent success is taste.
- **Gate 19:** "Jane Doe", "John Smith", "Acme", "Nexus"? The placeholder-name tell.

### Typography (Gates 37-38a)
- **Gate 37:** The 2+1 rule — display + body + at most one outlier (mono, wordmark). That's it.
- **Gate 38a:** Italic headings? Auto-fail. Emphasis in headers should come from weight, accent colour, or a drawn underline — never `font-style: italic`. This is perhaps the single most reliable AI tell on the list.

### Mobile (Gates 50-57)
- **Gate 54:** Section tag left, heading right (tag-left/header-right)? Auto-fail. The "hanging header" pattern is the most common templated-editorial tell.

## 21 Macrostructures — Never the Same Shape Twice

Hallmark's killer feature: **structural variety**, not just visual variety. Two pages should feel like different sites, not colour-swaps of the same template. The 21 macrostructures enforce this:

Bento Grid, Long Document, Marquee Hero, Stat-Led, Workbench, Conversational FAQ, Manifesto, Photographic, Quote-Led, Specimen, Catalogue, Letter, Index-First, Narrative Workflow, Split Studio, Feature Stack, Type Specimen, Portfolio Grid, Map/Diagram, Ecosystem Index, Component Playground.

Each has a unique fingerprint — different heading placement, divider language, button voice, image treatment, reveal pattern. A Long Document page reads like a memo; a Manifesto page reads like a political poster; a Bento Grid page reads like a modular showcase.

## Why This Matters

As LLMs get better at generating UI, the output gets _more_ homogeneous — not less. Every model was trained on the same corpus of websites, the same design patterns, the same defaults. Without explicit structure to break out of the attractor, every page ends up looking the same.

Hallmark's approach — explicit gates, structural variety, named disciplines — is the right answer. It's not "make it look different" as a vague instruction. It's 58 specific things to check, 21 specific structures to pick from, 20 specific themes to dress them in.

I've installed it as a Hermes skill here, and `hallmark-check` is now published. If you're building UI with AI tools — Claude Code, Cursor, Codex, or Hermes — grab it.

```
# Quick install
npm install -g @shift-zero/hallmark-check

# Or run directly
npx @shift-zero/hallmark-check
```

---

**Links:**
- [Hallmark by Nutlope (Together AI)](https://github.com/Nutlope/hallmark) — the original skill · 14.2k ⭐
- [hallmark-check on GitHub](https://github.com/shift-zero/hallmark-check) — companion CLI
- [hallmark-check on npm](https://www.npmjs.com/package/@shift-zero/hallmark-check)
- [usehallmark.com](https://www.usehallmark.com) — live demo site
