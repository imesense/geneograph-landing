---
name: GeneoGraph landing
description: Genealogy data with the freedom of a visual canvas
colors:
  background: "#0b100e"
  surface: "#111915"
  raised-surface: "#17211b"
  text: "#f2f5ef"
  secondary-text: "#bdc9be"
  muted-text: "#96a799"
  primary: "#66d58f"
  possible: "#e3b579"
  border: "#304238"
typography:
  display:
    fontFamily: "Manrope, system-ui, sans-serif"
    fontSize: "clamp(3rem, 6.4vw, 6rem)"
    fontWeight: 700
    lineHeight: 1.03
    letterSpacing: "-0.035em"
  body:
    fontFamily: "Manrope, system-ui, sans-serif"
    fontSize: "16px"
    fontWeight: 400
    lineHeight: 1.72
rounded:
  action: "8px"
  board: "14px"
components:
  button-primary:
    backgroundColor: "{colors.primary}"
    textColor: "{colors.background}"
    rounded: "{rounded.action}"
    padding: "13px 23px"
---

# Design System: GeneoGraph landing

## Overview

**Creative North Star: "Genealogy data with the freedom of a visual canvas."**

The page feels like a calm, capable research workspace whose family visualization is the principal artifact. It demonstrates relationships and context at useful scale, then lets quieter typography explain the value. The established charcoal and green identity remains intact.

**Key Characteristics:**
- Product visual before feature taxonomy.
- Meaningful geometry rather than decorative networks.
- Restrained containment and clear conversion hierarchy.

## Colors

Green identifies the primary action, selected people and confirmed connections. Amber is reserved for possible relationships. Charcoal surfaces create a small depth hierarchy without glow or glass effects.

## Typography

Manrope carries both display and body copy. Display headings are large but restrained; smaller copy remains readable and secondary rather than faint.

## Layout

The content width is capped at 1320px. Wide desktop sections alternate between a large visual, comparison, information flow and concise editorial copy. At narrow widths prose stacks while complex diagrams scroll horizontally to preserve legibility.

## Elevation & Depth

Boards use a distinct tonal surface and one clear edge. The primary action alone uses a soft offset shadow.

## Shapes

Buttons use an 8px radius; large board figures use a 14px radius. Person records and notes use compact, quieter corners so the relationships, not the boxes, dominate.

## Components

The primary demo link is a filled green button. Secondary navigation and Research Group use text links. Family diagrams share one person-card treatment and accurate relationship paths, with direct labels for confirmed and possible states.

## Do's and Don'ts

- Do use one consistent sample family across related transformations.
- Do connect every line to meaningful endpoints and every research object to a person or question.
- Do distinguish the interactive prototype from future product direction.
- Don't use fake app chrome, floating cards, decorative connectors, or unsupported product claims.
