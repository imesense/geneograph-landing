---
name: GeneoGraph
description: A calm, research-led visual system for connected genealogy work.
colors:
  research-green: "#2fae74"
  research-green-light: "#62d99a"
  app-black: "#0b0f0e"
  work-surface: "#0f1413"
  raised-surface: "#1a201f"
  paper: "#f3f1e9"
  text-primary: "#f2f4f3"
  text-secondary: "#b8c0bd"
  text-tertiary: "#7f8a86"
  evidence-amber: "#d4aa6b"
typography:
  display:
    fontFamily: "Manrope, ui-sans-serif, system-ui, sans-serif"
    fontWeight: 720
    lineHeight: 1.02
    letterSpacing: "-0.035em"
  body:
    fontFamily: "Manrope, ui-sans-serif, system-ui, sans-serif"
    fontSize: "16px"
    fontWeight: 400
    lineHeight: 1.6
rounded:
  sm: "8px"
  md: "12px"
  lg: "18px"
spacing:
  sm: "8px"
  md: "16px"
  lg: "24px"
components:
  button-primary:
    backgroundColor: "{colors.research-green}"
    textColor: "{colors.app-black}"
    rounded: "{rounded.sm}"
    height: "50px"
---

# Design System: GeneoGraph

## Overview

**Creative North Star: "The Living Research Desk"**

GeneoGraph should feel like a serious researcher’s working surface: calm enough for sustained attention, structured enough to clarify evidence, and open enough to hold uncertainty. The visual system is product-led rather than promotional; relationship lines, source objects, working notes, and archival material are the defining content.

**Key Characteristics:**

- Deep charcoal work surfaces with restrained green emphasis.
- Large, inspectable product canvases instead of decorative feature cards.
- Editorial pacing with compact supporting passages and decisive conversion moments.
- Uncertainty expressed through labels, line styles, and structure—not color alone.

## Colors

Green is a scarce functional accent for action, focus, and hypotheses. Neutral charcoal surfaces create depth; amber identifies evidence and research notes.

**The Meaningful Green Rule.** Green marks action, focus, or research state and is never scattered as decoration.

## Typography

Manrope is self-hosted and used across display and body roles. Display copy is compact, confident, and tightly tracked; body copy remains generous and readable.

## Layout

The main content width is 1240px with fluid side gutters. Desktop compositions are deliberately asymmetric and product-dominant. At tablet and mobile widths, text and product views stack; complex canvases scale to remain inside the viewport and preserve their important relationship states.

## Elevation & Depth

Depth comes primarily from tonal surface changes. Soft, offset shadows are reserved for actual product canvases and raised forms.

## Shapes

Controls and product objects use restrained 7–12px corners. Pills are not part of the general surface language. Relationship geometry stays crisp and orthogonal.

## Components

### Buttons

Primary buttons use research green, dark ink, an 8px radius, and strong action labels. Secondary actions are textual or dark surfaced; focus is always visibly outlined.

### Cards / Containers

Containment is reserved for meaningful objects such as people, records, notes, canvases, and forms. Narrative copy is not boxed by default.

### Inputs / Fields

Fields use the input surface, subtle borders, green focus treatment, themed caret, and explicit error copy.

### Navigation

Navigation is minimal. The Demo destination is the only button-like header action.

## Do's and Don'ts

### Do:

- **Do** make real research objects and relationships the visual subject.
- **Do** preserve the distinction between confirmed, possible, unknown, and evidentiary states.
- **Do** use section scale and density—not more containers—to create rhythm.

### Don't:

- **Don't** use generic SaaS gradients, glass effects, metric cards, or decorative badges.
- **Don't** imply prototype or planned capabilities are production-ready.
- **Don't** reduce important product UI until its labels become unreadable.
