---
name: GeneoGraph landing
description: One connected genealogy research workspace
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

**Creative North Star: "Different research spaces, one connected project."**

The page feels like a calm, capable genealogy workspace. Its first product view is a real prototype capture of Family Tree and connected person information together; later sections give People, Archive, Albums, Notes and Geneograph distinct space. The established charcoal and green identity remains intact.

**Key Characteristics:**
- Whole-application proof from the actual prototype before individual module detail.
- Meaningful geometry rather than decorative networks.
- Distinct module views inside a connected visual system.
- Restrained containment and clear conversion hierarchy.

## Colors

Green identifies the primary action, selected people and confirmed connections. Amber is reserved for possible relationships. Charcoal surfaces create a small depth hierarchy without glow or glass effects.

## Typography

Manrope carries both display and body copy. Display headings are large but restrained; smaller copy remains readable and secondary rather than faint.

## Layout

The content width is capped at 1320px. Wide desktop sections move from an application overview into distinct Build, Organize, Connect and Visualize compositions, then a compact summary and demo close. At narrow widths prose stacks and prototype captures scroll within keyboard-focusable, labeled regions so desktop UI is not shrunk to illegibility.

## Elevation & Depth

Prototype captures use one quiet edge and no imitation application frame. The primary action alone uses a soft offset shadow.

## Shapes

Buttons use an 8px radius; screenshot regions use a quiet 12px radius. The product's own interface provides the visual detail.

## Components

The primary demo link is a filled green button. Secondary navigation and Research Group use text links. Static, optimized prototype captures are identified as sample-project views rather than interactive controls; their captions and explanations remain HTML. The Connect section uses a semantic record-to-view ledger rather than decorative network lines.

## Do's and Don'ts

- Do use the real Whiskerfield sample project consistently across all module views.
- Do connect every line to meaningful endpoints and every research object to a person or question.
- Do distinguish the interactive prototype from future product direction.
- Don't let Geneograph stand in for the whole product.
- Don't use floating cards, decorative connectors, or unsupported product claims.
