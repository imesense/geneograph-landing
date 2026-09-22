# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

GeneoGraph primarily serves serious amateur genealogists, advanced genealogy hobbyists, and researchers working on complicated family-history projects, especially projects involving uncertain family relationships. Secondary audiences include professional and semi-professional genealogists, family archivists, historical researchers, and genealogy storytellers.

These users need to organize fragmented research material, preserve its context, reason about incomplete evidence, and communicate family relationships without forcing every working theory into a conventional family tree.

## Product Purpose

GeneoGraph is early-stage genealogy research and visualization software. It is intended as a research workspace for organizing people, documents, notes, photographs, places, evidence, and research questions while keeping their relationships visible and understandable.

The product exists to make complicated family-history research easier to organize and reason about. Success means a researcher can connect scattered material around people, explore uncertain relationships without presenting them as established fact, and create flexible visual family charts.

## Positioning

GeneoGraph is not primarily another large online genealogy-record database. Its distinctive mechanism is a connected, visual research workspace that supports both established conclusions and unresolved investigation.

A traditional family tree represents what the researcher currently believes is true. The Geneograph feature also provides a place to represent what the researcher is still investigating, including possible relationships, unknown people, competing hypotheses, and supporting evidence.

## Operating Context

Genealogy research commonly spans a family-tree application, documents, photographs, notes, spreadsheets, screenshots, hand-drawn diagrams, research questions, and archival sources. GeneoGraph is intended to keep these materials connected within a project rather than treating them as unrelated files or records.

An interactive application prototype currently serves as a product-validation tool. The public web structure is intended to place the landing site at `/` and the interactive demo at `/demo/` on `geneograph.com`. The landing page's main conversion path is understanding the product, recognizing its differentiation, and opening the interactive demo. Research-group signup is secondary; investor and collaborator credibility is tertiary.

The founder has genealogy-domain experience and access to genealogy communities. Product communication should reflect real genealogy work rather than generic startup language.

## Capabilities and Constraints

- Product/company name: **GeneoGraph**.
- Free-form visual workspace feature name: **Geneograph**.
- Geneograph is intended to support people, family relationships, notes, documents and evidence, photographs, shapes, visual connections, tentative relationships, hypotheses, and custom chart layouts.
- The product direction includes connected research context, uncertain and hypothetical relationships, flexible visualization, custom family charts, local projects, portable data, and optional future online services.
- GeneoGraph is early-stage and has an interactive prototype; conceptual or planned capabilities must not be presented as implemented production features.
- The landing site is a lightweight static Vite frontend. It should remain compatible with static hosting and GitHub Pages-style deployment.
- The landing site must not acquire backend infrastructure, authentication, databases, a CMS, server dependencies, heavy component libraries, or unnecessary dependencies unless a later task explicitly requires them.
- The original application was intentionally migrated away from one large HTML file toward a modular source structure. Future application work must not reverse that direction merely for convenience.
- The landing page should remain simpler than the application, use minimal JavaScript, favor CSS where appropriate, optimize images, and lazy-load below-the-fold media when applicable.
- Routing, links, public assets, and build configuration must preserve the intended `/` and `/demo/` hosting structure.

## Brand Commitments

GeneoGraph should communicate as a serious, modern, calm, distinctive, research-oriented, visually intelligent, product-led tool. It combines genealogy, a research workspace, and visual knowledge work. It should not resemble a generic AI startup, generic SaaS dashboard, parchment-and-sepia ancestry site, marketing template, or corporate enterprise website.

The established identity uses a very dark charcoal or near-black foundation, restrained GeneoGraph green accents, white or off-white primary text, muted gray-green secondary text, a graph-and-node visual language, and clean modern sans-serif typography. This incumbent identity is authoritative unless a future task explicitly requests a redesign.

Product presentation should favor real product UI, Geneograph boards, nodes and relationship lines, research notes, and archival materials used as meaningful content. It should avoid decorative startup clichés, fake dashboards, excessive cards and containers, excessive glass effects, meaningless animation, and unsubstantiated social proof.

Material-design principles may guide hierarchy, containment, interaction states, spacing, and accessibility, but the interface is not required to resemble Material UI.

## Evidence on Hand

- An interactive application prototype exists and demonstrates the product concept and major workflows, but it is not a finished production product.
- The landing repository contains the GeneoGraph logo, favicon, an archival sample portrait, a board-dot texture, and an Open Graph image under `src/landing/`.
- The current landing implementation contains schematic HTML, CSS, and SVG product illustrations. These must not be mistaken for proof that every depicted capability is production-ready.
- The founder's genealogy-domain experience and access to genealogy communities are confirmed, but the repository currently contains no completed founder profile, customer testimonials, usage benchmarks, press coverage, or verified social proof. Future work must not fabricate them.

## Product Principles

1. Keep genealogy evidence and context connected to the people and questions they concern.
2. Give researchers a safe visual space for uncertainty, hypotheses, and competing explanations without confusing them with conclusions.
3. Respect researcher ownership through a local-first direction, portable data, and optional rather than mandatory online services.
4. Communicate product stage honestly and distinguish implemented prototype behavior from planned capability.
5. Prefer focused, maintainable, lightweight solutions that preserve the existing architecture and static-deployment model.

## Accessibility & Inclusion

Future work must preserve or improve semantic HTML, logical heading structure, native interactive elements, visible keyboard focus, accessible form labels, sufficient contrast, meaningful alternative text, reduced-motion support, and keyboard navigation.

Confirmed and hypothetical relationship states must not be communicated by color alone. Accessibility must not be sacrificed for visual polish.
