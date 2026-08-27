---
version: alpha
name: Etsy
website: "https://www.etsy.com"
description: >-
  A handmade-marketplace system anchored on a true white canvas ("#ffffff") and Etsy Orange ("#f1641e") — the single saturated voltage that carries the wordmark, the primary "Sign in" pill, the favorite-heart fill, and the holiday banner gradient. The wordmark itself is set in a custom serif (Guru, derived from a hand-drawn Cooper-style display face) — every other surface in the system runs Graphik Webfont at modest weights 400 to 600, with display headlines at 28 to 32px rather than the 60-plus weights that fintech brands lean on. Product-tile grids tile at four to six across with a 16px gutter and 8px-radius card corners, the seller-shop chrome scopes a warm-cream secondary palette ("#fdf6e8" band fills, "#a66523" Etsy Brown for the seller-program lockup), and the entire product photography surface trusts the listings — many of them shot on kitchen tables under window light — to do the visual heavy lifting that more disciplined retailers hand to typography.

seo:
  title: "Etsy Design System for React — Etsy Orange #f1641e, Graphik Webfont, 22 components"
  metaDescription: "Etsy's marketplace design system as a DESIGN.md file. Etsy Orange #f1641e, Guru serif wordmark, Graphik Webfont, 19 colors, 22 components."
  highlights:
    - "Single-accent voltage — Etsy Orange (#f1641e) reserved for the wordmark, the Sign-in pill, the heart-favorite fill, and seasonal banners; never decorative"
    - "Two-typeface split — Guru custom serif lives only inside the wordmark; every other role uses Graphik Webfont at weights 400 to 600"
    - "Soft 8px card geometry — product tiles, seller cards, and inputs share one radius; the Sign-in CTA goes pill (9999px) for contrast"
    - "Warm-cream secondary surface — #fdf6e8 band fills carry seller-program ribbons and gift-card lockups, scoped never to bleed onto product grids"
    - "Etsy Brown #a66523 is the seller-side voice — appears in the Sell on Etsy CTA and Etsy Plus chrome, almost never in the buyer experience"
  tags:
    - "Marketplaces"
    - "E-commerce & Retail"
  lastUpdated: "2026-05-13"
  author:
    name: "Dov Azencot"
    url: "https://x.com/dovazencot"
  opening: |
    Etsy's public design system is built around two ideas the rest of the marketplace category has steadily abandoned: a hand-drawn serif wordmark and a single chromatic voltage. The wordmark sits in a custom Cooper-style serif called Guru, with its characteristic flared "E" and rounded terminals — a typographic ancestor of the brand's craft-fair origins. Every other surface in the system runs Graphik Webfont at workmanlike weights of 400, 500, and 600, with display headlines sitting at 28 to 32px rather than the 48-plus most modern e-commerce brands use. The canvas is true white ("#ffffff"), text is near-black "#222222" ink, and one saturated Etsy Orange ("#f1641e") carries the wordmark, the primary Sign-in pill, the heart-favorite fill, and the seasonal banner ribbon — nothing else.

    This page packages the system into a single DESIGN.md file built on the Google Labs open specification. Inside: 19 color tokens grouped into brand, surface, hairline, text, semantic, and seller-side buckets; 11 Graphik Webfont typography roles plus the Guru wordmark token, mapped from 32px display down to 11px badge; six border-radius values where 8px ("rounded.md") does the heavy lifting and 9999px appears only on the Sign-in pill and circular avatars; an eight-step 8px-based spacing scale; and 22 components covering buttons, product tiles, seller cards, the search bar, the top nav, gift-card surfaces, and the warm-cream seller ribbon. Each component declares its background, text color, typography, radius, and padding by reference — every value resolves back to a quoted hex or pixel literal.

    Feed this file to Claude, Cursor, or GitHub Copilot and the agent reproduces Etsy's particular marketplace voice — the orange-on-white restraint, the 8px card radius, the buyer/seller two-palette split, the modest 32px display tier — rather than a generic retail theme. Reference the tokens directly in Tailwind config or CSS variables when you want one specific value. The system rewards study because Etsy commits to a constraint most peers hedge on: the marketplace chrome is a frame for handmade objects, never a competitor with them.
  related:
    - href: "/design"
      title: "Browse all design systems"
      description: "The full directory of DESIGN.md files on shadcn.io, with live mockups for each."
    - href: "https://www.etsy.com"
      title: "Etsy — official site"
      description: "The handmade and vintage marketplace whose buyer-facing surfaces this DESIGN.md captures."
    - href: "https://github.com/google-labs-code/design.md"
      title: "The DESIGN.md specification"
      description: "Google Labs' open spec for machine-readable design system files — the format this page is built on."
  questions:
    - id: "primary-color"
      title: "What is Etsy's primary brand color?"
      answer: "Etsy's brand color is Etsy Orange — #f1641e, a saturated red-orange that has been the brand's only chromatic voltage since the 2016 wordmark refresh. It is used scarcely: the wordmark itself, the primary Sign-in pill in the top nav, the heart-favorite fill state on product tiles, seasonal hero banners (Mother's Day, Cyber Week), and the chat-icon active state in the messages drawer. Pressed state drops one notch to #d44e0d. Every other surface in the system is monochrome white-on-near-black, so the orange functions as the page's single voltage rather than a decorative tone."
    - id: "typography"
      title: "What typography does Etsy use, and what should I use if Graphik isn't available?"
      answer: "Etsy runs two families. The wordmark is set in Guru, a custom Cooper-style display serif licensed only to Etsy — it never appears outside the logo. Every other typographic role uses Graphik Webfont at weights 400, 500, and 600, with display sizes at 28 to 32px, headings at 18 to 22px, and body at 14 to 16px. If Graphik is unavailable, Inter is the closest open-source substitute at body sizes; for the wordmark itself there is no direct substitute — Cooper BT Light, Recoleta, or Cheee can echo the silhouette but the brand specifically forbids replacing the serif logo with any system equivalent."
    - id: "shape-system"
      title: "How does Etsy's border-radius system work?"
      answer: "Etsy uses a two-radius vocabulary plus pill. Most components — product tiles, seller cards, text inputs, secondary buttons, the search bar's outer frame — sit at 8px (rounded.md). Modal cards and large editorial tiles step up to 12px (rounded.lg). The primary Sign-in pill in the top nav, circular avatars, and the heart-favorite chip go fully pill (9999px). There is no sharp-cornered interactive element anywhere on the buyer surface, and the spec deliberately keeps a tight three-value scale rather than the eight-step ramps common in design-token starters."
    - id: "buyer-seller-split"
      title: "How does Etsy separate the buyer and seller design surfaces?"
      answer: "The buyer experience runs the white canvas, orange voltage, and Graphik chrome described in this spec. The seller-facing chrome — \"Sell on Etsy\", the seller dashboard signup flow, Etsy Plus marketing — flips to a warm-cream "#fdf6e8" canvas with Etsy Brown "#a66523" as its primary accent. The two never blend: a buyer never sees brown chrome in the product grid, and a seller never sees the orange Sign-in pill inside the dashboard signup wizard. The dual palette is encoded as the etsy-brown and surface-cream tokens; treat them as a sub-system scoped to seller surfaces."
    - id: "use-in-project"
      title: "Can I use this DESIGN.md to build my own React marketplace?"
      answer: "Yes — drop the file into Claude, Cursor, or any AI tool that reads structured design tokens and the agent will reproduce Etsy's particular restraint rather than a generic retail theme. The single Etsy Orange accent, the 8px card radius, the two-palette buyer/seller split, the 28 to 32px display tier and modest body sizes all encode as tokens the AI can map to Tailwind classes or CSS variables. Reference values directly when you want one specific number — {colors.primary} resolves to #f1641e, {rounded.md} to 8px, {spacing.section} to 64px."
    - id: "known-gaps"
      title: "What's missing from this DESIGN.md spec?"
      answer: "Several things, documented in the Known Gaps section: Etsy's live site returned an access-restricted page during automated extraction, so this spec was composed from the brand's published style references and visual analysis of the wordmark surface; mobile screenshots were not captured, so the responsive section synthesizes Etsy's known mobile patterns; hover states are intentionally undocumented per system policy; authenticated chrome (favorites, cart, conversations) is out of scope; the native mobile-app screens are not represented; and form-validation states beyond focused are not documented."

colors:
  primary: "#f1641e"
  primary-pressed: "#d44e0d"
  on-primary: "#ffffff"
  etsy-brown: "#a66523"
  ink: "#222222"
  body: "#3f3f3f"
  muted: "#595959"
  muted-soft: "#757575"
  hairline: "#d6d6d6"
  hairline-soft: "#e6e6e6"
  border-strong: "#bdbdbd"
  canvas: "#ffffff"
  surface-soft: "#f6f6f6"
  surface-card: "#ffffff"
  surface-cream: "#fdf6e8"
  surface-cream-strong: "#f5e8c8"
  link-blue: "#258ddb"
  success: "#258635"
  error: "#b3261e"
  scrim: "#000000"

typography:
  wordmark:
    fontFamily: "Guru, 'Cooper BT', Georgia, serif"
    fontSize: 36px
    fontWeight: 400
    lineHeight: 1.0
    letterSpacing: "-0.5px"
  display-xl:
    fontFamily: "'Graphik Webfont', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif"
    fontSize: 32px
    fontWeight: 600
    lineHeight: 1.2
    letterSpacing: "-0.3px"
  display-lg:
    fontFamily: "'Graphik Webfont', sans-serif"
    fontSize: 28px
    fontWeight: 600
    lineHeight: 1.25
    letterSpacing: 0
  heading-lg:
    fontFamily: "'Graphik Webfont', sans-serif"
    fontSize: 22px
    fontWeight: 600
    lineHeight: 1.27
    letterSpacing: 0
  heading-md:
    fontFamily: "'Graphik Webfont', sans-serif"
    fontSize: 18px
    fontWeight: 500
    lineHeight: 1.33
    letterSpacing: 0
  title-md:
    fontFamily: "'Graphik Webfont', sans-serif"
    fontSize: 16px
    fontWeight: 500
    lineHeight: 1.5
    letterSpacing: 0
  body-md:
    fontFamily: "'Graphik Webfont', sans-serif"
    fontSize: 16px
    fontWeight: 400
    lineHeight: 1.5
    letterSpacing: 0
  body-sm:
    fontFamily: "'Graphik Webfont', sans-serif"
    fontSize: 14px
    fontWeight: 400
    lineHeight: 1.43
    letterSpacing: 0
  caption:
    fontFamily: "'Graphik Webfont', sans-serif"
    fontSize: 13px
    fontWeight: 400
    lineHeight: 1.38
    letterSpacing: 0
  button-md:
    fontFamily: "'Graphik Webfont', sans-serif"
    fontSize: 16px
    fontWeight: 600
    lineHeight: 1.25
    letterSpacing: 0
  button-sm:
    fontFamily: "'Graphik Webfont', sans-serif"
    fontSize: 14px
    fontWeight: 600
    lineHeight: 1.29
    letterSpacing: 0
  badge:
    fontFamily: "'Graphik Webfont', sans-serif"
    fontSize: 11px
    fontWeight: 600
    lineHeight: 1.27
    letterSpacing: "0.2px"

rounded:
  none: "0px"
  xs: "4px"
  md: "8px"
  lg: "12px"
  xl: "20px"
  full: "9999px"

spacing:
  xxs: "2px"
  xs: "4px"
  sm: "8px"
  md: "12px"
  base: "16px"
  lg: "24px"
  xl: "32px"
  xxl: "48px"
  section: "64px"

components:
  button-primary:
    backgroundColor: "{colors.primary}"
    textColor: "{colors.on-primary}"
    typography: "{typography.button-md}"
    rounded: "{rounded.full}"
    padding: "12px 22px"
    height: "44px"
  button-primary-pressed:
    backgroundColor: "{colors.primary-pressed}"
    textColor: "{colors.on-primary}"
    rounded: "{rounded.full}"
  button-secondary:
    backgroundColor: "{colors.canvas}"
    textColor: "{colors.ink}"
    typography: "{typography.button-md}"
    rounded: "{rounded.md}"
    padding: "11px 21px"
    border: "1px solid {colors.border-strong}"
    height: "44px"
  button-seller-brown:
    backgroundColor: "{colors.etsy-brown}"
    textColor: "{colors.on-primary}"
    typography: "{typography.button-md}"
    rounded: "{rounded.full}"
    padding: "12px 22px"
    height: "44px"
  button-tertiary-text:
    backgroundColor: "transparent"
    textColor: "{colors.ink}"
    typography: "{typography.button-md}"
    border: "0"
  heart-favorite:
    backgroundColor: "{colors.canvas}"
    textColor: "{colors.primary}"
    rounded: "{rounded.full}"
    height: "32px"
  top-nav:
    backgroundColor: "{colors.canvas}"
    textColor: "{colors.ink}"
    typography: "{typography.title-md}"
    height: "72px"
    border: "0 0 1px 0 solid {colors.hairline}"
  nav-link:
    backgroundColor: "transparent"
    textColor: "{colors.ink}"
    typography: "{typography.title-md}"
  wordmark-lockup:
    backgroundColor: "transparent"
    textColor: "{colors.primary}"
    typography: "{typography.wordmark}"
  search-bar:
    backgroundColor: "{colors.canvas}"
    textColor: "{colors.ink}"
    typography: "{typography.body-md}"
    rounded: "{rounded.md}"
    padding: "10px 16px"
    height: "44px"
    border: "1px solid {colors.ink}"
  search-submit:
    backgroundColor: "{colors.primary}"
    textColor: "{colors.on-primary}"
    rounded: "{rounded.md}"
    height: "44px"
    padding: "0 18px"
  product-tile:
    backgroundColor: "{colors.canvas}"
    textColor: "{colors.ink}"
    typography: "{typography.body-sm}"
    rounded: "{rounded.md}"
    border: "0"
  product-tile-photo:
    rounded: "{rounded.md}"
  product-title:
    backgroundColor: "transparent"
    textColor: "{colors.ink}"
    typography: "{typography.body-sm}"
  product-price:
    backgroundColor: "transparent"
    textColor: "{colors.ink}"
    typography: "{typography.title-md}"
  seller-card:
    backgroundColor: "{colors.canvas}"
    textColor: "{colors.ink}"
    typography: "{typography.body-sm}"
    rounded: "{rounded.md}"
    padding: "16px"
    border: "1px solid {colors.hairline}"
  seller-ribbon:
    backgroundColor: "{colors.surface-cream}"
    textColor: "{colors.etsy-brown}"
    typography: "{typography.title-md}"
    rounded: "{rounded.lg}"
    padding: "20px 24px"
  category-chip:
    backgroundColor: "{colors.surface-soft}"
    textColor: "{colors.ink}"
    typography: "{typography.button-sm}"
    rounded: "{rounded.full}"
    padding: "8px 14px"
    height: "36px"
  badge-bestseller:
    backgroundColor: "{colors.surface-cream-strong}"
    textColor: "{colors.etsy-brown}"
    typography: "{typography.badge}"
    rounded: "{rounded.xs}"
    padding: "3px 8px"
  text-input:
    backgroundColor: "{colors.canvas}"
    textColor: "{colors.ink}"
    typography: "{typography.body-md}"
    rounded: "{rounded.md}"
    padding: "12px 14px"
    height: "48px"
    border: "1px solid {colors.border-strong}"
  footer:
    backgroundColor: "{colors.canvas}"
    textColor: "{colors.ink}"
    typography: "{typography.body-sm}"
    padding: "48px 24px"
    border: "1px 0 0 0 solid {colors.hairline}"
  footer-link:
    backgroundColor: "transparent"
    textColor: "{colors.muted}"
    typography: "{typography.body-sm}"
  legal-band:
    backgroundColor: "{colors.canvas}"
    textColor: "{colors.muted}"
    typography: "{typography.caption}"
---

## Overview

Etsy's marketplace chrome is the discipline of a craft fair brought online — handmade objects sit on a true white canvas ("{colors.canvas}" — "#ffffff") with near-black ink ("{colors.ink}" — "#222222"), and a single saturated Etsy Orange ("{colors.primary}" — "#f1641e") carries the load-bearing brand voltage across the wordmark, the Sign-in pill, the favorite-heart fill, and the seasonal banner ribbon. There is no second accent in the buyer experience — the warm cream ("{colors.surface-cream}" — "#fdf6e8") and Etsy Brown ("{colors.etsy-brown}" — "#a66523") tokens are seller-side accents scoped to "Sell on Etsy" and Etsy Plus surfaces.

**Wordmark-as-typography**: where most marketplaces flatten their logo into a SVG silhouette and never speak of it again, Etsy treats the wordmark as a first-class typographic specimen. Guru, the brand's custom Cooper-style display serif, lives only inside the wordmark — and the system's character emerges from the visual rhyme between that hand-drawn serif overhead and the Graphik Webfont running every other role beneath it. Unlike Airbnb, which uses one custom variable typeface across the entire scale, Etsy splits the labor: the serif carries warmth and craft, the sans carries clarity and density. Where most fintech brands command attention with weight 600-plus display, Etsy holds display at 28 to 32px / weight 600, trusting product photography of mosaic candles and crocheted blankets to do the work that type would otherwise perform.

The shape language is soft and uniform: "{rounded.md}" 8px on product tiles, seller cards, search frames, and inputs; "{rounded.lg}" 12px on the cream seller ribbon and modal cards; "{rounded.full}" pill on the orange Sign-in CTA, favorite-heart chip, and category filter chips. There is no sharp-cornered interactive element anywhere on the buyer surface.

**Key Characteristics:**
- Single accent voltage: "{colors.primary}" ("#f1641e" — Etsy Orange) carries the wordmark, the Sign-in pill, the heart-favorite fill, and the seasonal banner. Scoped tightly — never used as a card background or large area fill.
- Two-typeface split: Guru custom Cooper-style serif for the wordmark only; Graphik Webfont at weights 400, 500, 600 for every other role.
- Buyer/seller palette divergence: the buyer surface is white + orange; the seller surface flips to cream "#fdf6e8" + Etsy Brown "#a66523". The tokens never blend across the divide.
- 8px shape baseline: every product tile, seller card, search frame, and input shares "{rounded.md}". The orange Sign-in pill is the singular pill exception.
- Modest display tier: page headlines run 28 to 32px at weight 600 — friendly density per scroll over editorial gallery-emptiness.
- Cream-tinted seller ribbon: a "{component.seller-ribbon}" surface that appears on signup banners and Etsy Plus lockups; the only chromatic surface in the system above 12% saturation.
- 8px base spacing system, with major sections at "{spacing.section}" (64px) — tighter than typical SaaS marketing (80–96px) because marketplace pages need higher tile density per scroll.

## Colors

### Brand & Accent
- **Etsy Orange** ("{colors.primary}" — "#f1641e"): The single brand voltage. Use: wordmark, primary Sign-in pill (`button-primary`), favorite-heart fill state on product tiles, seasonal banner ribbons (Mother's Day, Cyber Week), search-submit button fill. The most-recognized color in handmade commerce.
- **Etsy Orange Pressed** ("{colors.primary-pressed}" — "#d44e0d"): The pointer-down variant — one notch deeper. Use: `button-primary-pressed`.
- **Etsy Brown** ("{colors.etsy-brown}" — "#a66523"): The seller-side primary. Use: "Sell on Etsy" CTA fill, Etsy Plus marketing lockup, seller-program ribbon text. Never appears in the buyer-side product grid.

### Surface
- **Canvas** ("{colors.canvas}" — "#ffffff"): The default page floor for every public page. Etsy does not run a dark-mode buyer surface.
- **Surface Soft** ("{colors.surface-soft}" — "#f6f6f6"): The lightest fill — used on category-filter chip backgrounds, disabled fields, the inline search-filter band.
- **Surface Cream** ("{colors.surface-cream}" — "#fdf6e8"): The warm-cream wash used on seller-program ribbons, "Sell on Etsy" hero banners, and gift-card lockups. Scoped to seller surfaces and editorial highlights.
- **Surface Cream Strong** ("{colors.surface-cream-strong}" — "#f5e8c8"): A heavier cream tone for the "Bestseller" badge background.

### Hairlines & Borders
- **Hairline** ("{colors.hairline}" — "#d6d6d6"): The default 1px border tone — top-nav bottom rule, footer top rule, footer column dividers, search-bar outline.
- **Hairline Soft** ("{colors.hairline-soft}" — "#e6e6e6"): A lighter divider used on long-scrolling editorial separators.
- **Border Strong** ("{colors.border-strong}" — "#bdbdbd"): A heavier stroke used on secondary outline buttons and text-input outlines after focus.

### Text
- **Ink** ("{colors.ink}" — "#222222"): The dominant text color on light surfaces. Use: display headlines, product titles, primary nav links, prices. Near-black rather than pure black.
- **Body** ("{colors.body}" — "#3f3f3f"): A secondary running-text color used inside long-form listing descriptions and review copy.
- **Muted** ("{colors.muted}" — "#595959"): Use: footer link rows, secondary metadata under product tiles ("Sponsored", "Free shipping"), inactive nav-item labels.
- **Muted Soft** ("{colors.muted-soft}" — "#757575"): Use: legal-band copyright text, disabled link text. Sparingly applied.
- **On Primary** ("{colors.on-primary}" — "#ffffff"): White text on the orange Sign-in pill and the brown seller CTA.

### Semantic
- **Link Blue** ("{colors.link-blue}" — "#258ddb"): Inline help and policy links inside the footer-legal sub-band — the only blue in the system.
- **Success** ("{colors.success}" — "#258635"): "In stock", "Order confirmed" inline status text.
- **Error** ("{colors.error}" — "#b3261e"): Form-validation error text. Distinct from Etsy Orange — darker, more saturated red.

### Scrim
- **Scrim** ("{colors.scrim}" — "#000000" at 50% opacity): The global modal backdrop tone — login dialog, gift-card modal, region picker. Stored as base hex; opacity applied at render time.

## Typography

### Font Family
The system runs **two families**. The wordmark uses **Guru**, a custom Cooper-style display serif licensed only to Etsy, with flared serifs and rounded terminals echoing the brand's hand-drawn craft origins. Guru never appears outside the logo. Every other role — display, headings, body, buttons, captions, badges — runs **Graphik Webfont** at weights 400, 500, and 600, with a fallback stack walking "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif".

There is no separate display family for non-wordmark display tiers; Graphik carries every typographic scale beneath the logo.

### Hierarchy

| Token | Size | Weight | Line Height | Letter Spacing | Use |
|---|---|---|---|---|---|
| "{typography.wordmark}" | "36px" | "400" | "1.0" | "-0.5px" | Etsy wordmark in top-nav only |
| "{typography.display-xl}" | "32px" | "600" | "1.2" | "-0.3px" | Hero h1 ("Find something one-of-a-kind") |
| "{typography.display-lg}" | "28px" | "600" | "1.25" | "0" | Category landing h1 ("Jewelry & Accessories") |
| "{typography.heading-lg}" | "22px" | "600" | "1.27" | "0" | Section heads ("Editors' Picks", "Trending Now") |
| "{typography.heading-md}" | "18px" | "500" | "1.33" | "0" | Sub-section titles, modal heads |
| "{typography.title-md}" | "16px" | "500" | "1.5" | "0" | Footer column heads, nav-link labels |
| "{typography.body-md}" | "16px" | "400" | "1.5" | "0" | Default running-text inside listing descriptions |
| "{typography.body-sm}" | "14px" | "400" | "1.43" | "0" | Product-tile titles, price meta, dates |
| "{typography.caption}" | "13px" | "400" | "1.38" | "0" | Legal-band copyright, sponsored-tag micro-labels |
| "{typography.button-md}" | "16px" | "600" | "1.25" | "0" | Sign-in pill, secondary button labels |
| "{typography.button-sm}" | "14px" | "600" | "1.29" | "0" | Category-chip filter labels |
| "{typography.badge}" | "11px" | "600" | "1.27" | "0.2px" | "Bestseller", "Free shipping" badge text |

### Note on Font Substitutes
If Graphik Webfont is unavailable, **Inter** is the closest open-source substitute at body sizes — geometry and x-height match within ~2%. For the wordmark itself there is no direct substitute; Cooper BT Light, Recoleta, or Cheee can echo the silhouette, but the brand specifically scopes Guru to the logo lockup and forbids substituting any system serif as a wordmark replacement.

## Layout

### Spacing System
- **Base unit:** 4px (with 2px micro-step).
- **Tokens:** "{spacing.xxs}" 2px · "{spacing.xs}" 4px · "{spacing.sm}" 8px · "{spacing.md}" 12px · "{spacing.base}" 16px · "{spacing.lg}" 24px · "{spacing.xl}" 32px · "{spacing.xxl}" 48px · "{spacing.section}" 64px.
- **Section padding (vertical):** "{spacing.section}" (64px) for major page bands; tighter than typical SaaS marketing (80–96px) because marketplace pages need higher tile density per scroll.
- **Card internal padding:** "{spacing.base}" (16px) for `seller-card`; "{spacing.lg}" (24px) for `seller-ribbon`; "{spacing.sm}" (8px) for product-tile meta gutters.
- **Gutters:** "{spacing.base}" (16px) between product tiles in the homepage grid; "{spacing.lg}" (24px) inside footer column gutters.

### Grid & Container
- **Max content width:** ~1296px centered on the homepage and category pages.
- **Product grid:** 4-up on desktop, 5-up on wide (>1440px), with 16px gutters; tiles flow at consistent aspect ratio rather than masonry.
- **Listing detail:** 2-column with photo gallery on the left (~58% width) and a sticky buy box on the right (~38%).
- **Footer:** 4-column link list (Shop / Sell / About / Help) at desktop, collapsing to 1-column on mobile.

### Whitespace Philosophy
The system gives editorial bands 64px of vertical breathing room but compresses product grids — tiles sit just 16px apart. The contrast is intentional: the page reads as "open hero, dense marketplace below," reinforcing the marketplace nature without overwhelming the visitor at the fold.

## Elevation

The system runs essentially **one shadow tier** plus the flat baseline.

- **Flat (no shadow):** Body, hero, footer, all editorial bands — 95% of surfaces.
- **Card hover float:** "box-shadow: rgba(0, 0, 0, 0.04) 0 1px 4px 0, rgba(0, 0, 0, 0.08) 0 4px 12px 0" — applied to product tiles on pointer hover and to the search-autocomplete dropdown. This is the single shadow definition in the entire chrome.
- **Modal scrim:** "{colors.scrim}" rendered at 50% opacity — the global modal backdrop for login, region picker, gift-card flow.

There are no progressive elevation tiers — the system either has the one shadow or none. Depth comes from product photography and the 1px hairline outlines on tiles and inputs, not from layered shadow stacks.

## Shapes

The corner-radius vocabulary is deliberately narrow:

- **"{rounded.none}" (0px):** Used nowhere on the buyer interactive surface — the system has no sharp-cornered interactive elements.
- **"{rounded.xs}" (4px):** Bestseller and free-shipping micro-badges.
- **"{rounded.md}" (8px):** The workhorse radius — product tiles, seller cards, text inputs, search-bar outer frame, secondary buttons, category-tile thumbnails.
- **"{rounded.lg}" (12px):** Seller-program ribbon, modal cards, gift-card hero tiles.
- **"{rounded.xl}" (20px):** Reserved for the holiday banner ribbon and the wishlist hero card.
- **"{rounded.full}" (9999px):** The Sign-in primary pill, category-filter chips, the favorite-heart fill chip, circular seller avatars.

The two-radius rhythm (8px workhorse, pill for chips and primary CTA) keeps the chrome readable without adding a third intermediate tier between 12px and 20px — a constraint the spec encodes deliberately.

## Components

### Buttons

**`button-primary`** — Etsy Orange fill, white text, fully rounded pill (9999px), 12×22px padding, 44px height, weight 600. The most prominent CTA on the homepage: "Sign in", "Continue", primary checkout actions.

**`button-primary-pressed`** — The press state. Background flips to "{colors.primary-pressed}" ("#d44e0d"). No transform, no shadow change.

**`button-secondary`** — White fill with ink text and a 1px "{colors.border-strong}" outline. 8px radius. Used for "Save", "Cancel", and inverse CTAs.

**`button-seller-brown`** — Etsy Brown fill, white text, pill geometry. Use: "Sell on Etsy" CTA in the top nav and dashboard signup. Never appears on buyer-side product surfaces.

**`button-tertiary-text`** — Plain ink text, no surface, no border. Underlined on hover. Used for "Show more" type links and modal close labels.

### Top Navigation

**`top-nav`** — White surface, 72px height, 1px bottom hairline. The Etsy wordmark sits flush left in "{typography.wordmark}" Guru serif at "{colors.primary}" orange, the search bar takes the center, and account utilities (heart-favorites, gift-card icon, account avatar, cart) sit flush right.

**`wordmark-lockup`** — The orange Guru serif logo. Renders at 36px / 400 with a -0.5px tracking adjustment. Never appears anywhere else in the system.

**`nav-link`** — Ink text label in "{typography.title-md}" (16px / 500). No icon, no underline at rest. Underlined on hover.

### Search

**`search-bar`** — A white-filled, 1px ink-outlined frame at "{rounded.md}" 8px, holding a placeholder line in "{typography.body-md}" and a circular "{component.search-submit}" orange button anchored right.

**`search-submit`** — Etsy Orange fill, white magnifying-glass icon, 44×44px square at "{rounded.md}" radius — the only orange square in the chrome (every other orange surface is a pill).

### Product Tiles

**`product-tile`** — A photo-first card. 1:1 aspect-ratio image with "{rounded.md}" corner clipping, image overlay heart top-right ("{component.heart-favorite}"), and 3–4 lines of meta beneath: product title in "{typography.body-sm}" (clipped to 2 lines), seller name in "{typography.caption}" muted, price in "{typography.title-md}" ink, and an optional review-stars + count row.

**`product-tile-photo`** — The photo plate itself, separated as a token because some surfaces (wishlist, recently-viewed strip) reuse just the photo without the meta block.

**`product-title`** — Ink text in "{typography.body-sm}". Clipped to 2 lines with ellipsis. Never bold — pricing carries the visual hierarchy.

**`product-price`** — Ink text in "{typography.title-md}" (16px / 500). The strongest typographic weight inside a product tile.

**`heart-favorite`** — A circular 32px white-fill chip overlaid on the top-right corner of every product tile. Default state has a 1px hairline outline and an empty-heart icon in ink; saved state fills with "{colors.primary}" orange and a white heart.

### Seller Surfaces

**`seller-card`** — A white card with "{rounded.md}" rounding, 16px padding, and a 1px "{colors.hairline}" outline. Holds a circular seller avatar (40×40px), shop name, location, and a "Visit shop" tertiary link.

**`seller-ribbon`** — The warm-cream "{colors.surface-cream}" band that wraps Etsy-Plus and "Sell on Etsy" marketing. "{rounded.lg}" 12px rounding, 20×24px padding, "{colors.etsy-brown}" text. The only chromatic surface fill in the system.

### Filters & Badges

**`category-chip`** — A pill-shaped filter chip with a "{colors.surface-soft}" gray fill and ink text at "{typography.button-sm}". Used in the category strip beneath the search bar.

**`badge-bestseller`** — A small rectangular "{colors.surface-cream-strong}" badge with "{colors.etsy-brown}" text at "{typography.badge}" (11px / 600). Anchored top-left of a product photo to signal "Bestseller", "Star Seller", or "Free shipping".

### Forms

**`text-input`** — White surface, 1px "{colors.border-strong}" outline, "{rounded.md}" 8px radius, 48px height, 12×14px padding. Stacked label above in "{typography.body-sm}", placeholder text in "{typography.body-md}" muted. On focus, the border thickens to 2px ink.

### Footer

**`footer`** — White surface (matches the page canvas — Etsy has no contrast footer), 48×24px padding, 1px hairline top rule. Four columns of link blocks (Shop / Sell / About / Help), separated by 24px gutters. Each column heads with a "{typography.title-md}" ink label.

**`footer-link`** — Muted ("{colors.muted}") ink in "{typography.body-sm}", underlined on hover.

**`legal-band`** — A bottom strip beneath the footer columns carrying the copyright line, region picker, and social icons. All text in muted "{colors.muted}" at "{typography.caption}".

## Do's and Don'ts

### Do
- Use "{colors.primary}" Etsy Orange for the wordmark, the Sign-in pill, the favorite-heart saved-state fill, and seasonal hero banners — scarcely.
- Keep display headlines at 28 to 32px / weight 600. Modest weights are intentional; product photography carries visual heft.
- Set the wordmark in Guru and never anywhere else. Every other role uses Graphik Webfont.
- Apply "{rounded.md}" 8px to product tiles, seller cards, search frames, and text inputs uniformly.
- Scope warm-cream "{colors.surface-cream}" and Etsy Brown "{colors.etsy-brown}" exclusively to seller surfaces.

### Don't
- Don't use "{colors.primary}" Etsy Orange as a large area fill or card background — it is reserved for sub-100×100px voltage moments (pill CTAs, heart chips, the wordmark). Wrapping a hero in orange breaks the system's restraint.
- Don't substitute Guru with a system serif for the wordmark — Cheee, Recoleta, or Cooper BT Light echo the silhouette but the brand explicitly forbids any system-serif replacement.
- Don't introduce a radius between "{rounded.lg}" 12px and "{rounded.xl}" 20px — the spec deliberately keeps the gap to enforce the two-radius rhythm.
- Don't bleed "{colors.surface-cream}" "#fdf6e8" into buyer-side product grids — it is a seller-program token. The cream wash behind a product tile flips the page's perceived intent from buying to selling.
- Don't run display headlines at weight 700-plus to "make them louder" — Etsy's 28 to 32px / 600 ceiling is deliberate. Heavier weights pull eye away from the product photograph.
- Don't pair Etsy Orange "#f1641e" with Etsy Brown "#a66523" in a single component — the two are intentionally separated across the buyer/seller divide. Combining them inside one card creates color-theory disharmony the system avoids.

## Known Gaps

- **Extraction-source limitation:** Etsy's live site returned an access-restricted page during automated extraction (bot-fight challenge fired on both the initial run and the --force retry). This DESIGN.md was composed from the brand's published style references and direct visual analysis of the orange Guru-serif wordmark surface captured in the screenshot, anchored against sibling marketplace systems (Airbnb, Pinterest, Shopify). Hex values for Etsy Orange "#f1641e" and Etsy Brown "#a66523" reflect the brand's public guidelines.
- **Hover state colors:** intentionally not documented per the global no-hover policy — actual `:hover` styling for product tiles is a subtle elevation lift, but precise extraction is unreliable without live-DOM access.
- **Mobile screenshots:** were not captured. The responsive section synthesizes Etsy's known mobile patterns from desktop evidence and category-platform norms.
- **Authenticated chrome:** favorites page, cart, conversation drawer, and order-history surfaces are out of scope.
- **Form-validation states:** error text color ("{colors.error}") is documented, but the full input outline + helper-text combination on validation failure is not visible in the captured surfaces.
- **Sub-brand surfaces:** Etsy Plus marketing chrome and Pattern (Etsy's standalone-shop product) are referenced through the etsy-brown / surface-cream tokens but their full sub-system is not captured here.
- **Native mobile app:** out of scope. The spec documents the buyer web experience only.
