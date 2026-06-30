# C-GULL Family — design notes

A short reference for the design system. Update this when tokens or patterns change. The tokens themselves live in `style.css` under `:root`.

## Principles

1. **Trustworthy, not clinical.** This is a health study app, so it has to read as credible. But families — many of them in the early months of parenthood — open it for reassurance, not procedure. Lean warm.
2. **Plain English over jargon.** "Know what's next" instead of "Upcoming appointments". "See your child's data" instead of "Records view".
3. **One friendly motif, used sparingly.** The stylised gull (a nod to C-GULL) appears in the brand mark and the hero illustration. Don't sprinkle it everywhere.
4. **Generous whitespace.** Parents are often reading one-handed at 3am. Big tap targets, roomy line-height, no dense tables.

## Palette

Anchored in an NHS-adjacent navy + teal for trust, warmed with coral + cream so it doesn't feel institutional.

| Token | Hex | Role |
|---|---|---|
| `--navy` | `#0F2A5C` | Primary text, primary buttons, brand mark body |
| `--navy-soft` | `#2B4A85` | Hover state for navy, secondary headings |
| `--teal` | `#0E8FB8` | Accents, links on dark, icon tints |
| `--teal-tint` | `#E8F1FA` | Soft fill behind eyebrows, icon backgrounds |
| `--coral` | `#F08F73` | Warm accent — gull's eye, dots, twin pill |
| `--coral-tint` | `#FCE1D7` | Soft fill for warm callouts |
| `--cream` | `#FAF7F1` | Page background — softer than pure white |
| `--paper` | `#FFFFFF` | Cards and content surfaces |
| `--ink` | `#14213D` | Body text |
| `--ink-muted` | `#5A6986` | Secondary text, captions |
| `--line` | `#ECE7DA` | Hairline borders, dashed rules |

**Why coral?** A typical NHS palette is navy + teal + white, which reads correct but cold. Coral, used in small doses (the gull's eye, twin-order pills, the reassurance card's glow), is what makes the app feel like it was made *for families* rather than *for clinicians*.

**Contrast.** All text/background pairs meet WCAG AA. The teal pill background (`--teal-tint`) is only used with `--navy` text, never `--ink-muted`.

## Typography

- **Headlines — Fraunces** (`--font-display`). Humanist serif. Used at h1/h2/h3 and on avatar monograms. Soft, friendly, slightly literary — the opposite of a clinical UI font.
- **Body — Inter** (`--font-sans`). Wide x-height, legible at small sizes, neutral.
- **Italic teal accent** on the hero headline (`<span class="accent">`) — the one place serifs and italics overlap.

Scale uses `clamp()` so headings fluid-size with the viewport. Line-height is 1.55 on body, ~1.1–1.3 on display.

## Shape language

- **Radii** — `10px` for small chips, `18px` for cards, `28px` for hero/reassurance cards. The bigger the surface, the softer the corner.
- **Pills** — fully rounded (`999px`) for eyebrows, pills, and buttons. Makes the UI feel approachable; sharp rectangles would push it back toward clinical.
- **Shadows** — two soft levels (`--shadow-sm`, `--shadow-md`), both tinted navy rather than black so they sit naturally on the cream background. Hover on cards lifts to `--shadow-md` with a `translateY(-3px)`.

## Motif: the gull

A simple two-curve silhouette in `--navy` with a single `--coral` dot for the eye, on a `--teal-tint` circle. Used in:

- Brand mark (header + footer)
- Hero illustration (large gull + small gull above a soft horizon)

Don't add wings, don't make it cartoonish, don't introduce a second mascot. The point of the motif is restraint.

## Components

### Eyebrows
Small uppercase, rounded pill with tinted background. Three variants by section mood — navy/teal-tint (default), teal/teal-soft, coral/coral-tint. They orient the reader before each heading.

### Buttons
- `.btn-primary` — navy fill, white text, pill shape, soft navy shadow. The main "do this" action.
- `.btn-ghost` — transparent fill, navy text, hairline navy border. Used for secondary actions.
- `.btn-large` — used on the single primary CTA per page.
- All buttons have a 48px minimum height (56px for large) — comfortable thumb targets.

### Cards
- **Feature card** (landing) — cream fill, hairline border, icon tile (one of four tint colors), heading, description. Hovers lift.
- **Child card** (picker) — paper fill, avatar + name + birth time, twin-order pill, dashed-rule summary list of waiting items, primary CTA with sliding arrow.
- **Reassurance card** — navy gradient with a coral radial glow bottom-right. The single dark surface in the app, reserved for the privacy moment.

### Avatars
Monogram on a gradient circle, Fraunces letterform. Teal gradient and coral gradient are the two variants — distinguishable without relying on gendered colors. Inner shadow gives them a soft 3D feel without going skeuomorphic.

### Pills
Same shape as eyebrows but inline within content (e.g., "Twin · born first"). Use teal-tint or coral-tint depending on which child.

## Voice

- **Welcoming, not breezy.** "Who would you like to see?" not "Hey there! 👋"
- **Specific over generic.** "Born 12 Oct 2024 · 04:18" reads warmer than "DOB: 12/10/24".
- **No emoji.** The motif and color do the warmth work.
- **Acknowledge the context.** The shared-pregnancy note on the picker exists because twin parents will wonder why both hubs mention the same midwife visit. Anticipate questions.

## Imagery

All illustrations are inline SVG — no raster art, no third-party icon library. This keeps things crisp, themeable via `currentColor`, and trivially editable. The four feature icons share a 32x32 viewBox, 2px stroke, no fill, rounded line-caps.

## Accessibility baseline

- Skip link to `#main` on every page.
- Semantic landmarks (`header`, `main`, `footer`, `nav`, `aside` with `role="note"`).
- `:focus-visible` outlined in teal with 3px width and 3px offset — visible against every background.
- `prefers-reduced-motion` honored — all transitions disabled.
- Decorative SVGs marked `aria-hidden="true"`.
- Color is never the only signal (twin order is also stated in text).

## Things deliberately not in the system (yet)

- A dark mode. Cream-on-paper assumes light contexts; needs separate testing for night use.
- An icon library beyond the four feature glyphs and a handful of inline SVGs. Add as needed; don't pull in a pack.
- A component framework. Static HTML + CSS is enough for the prototype.
- Photography. Illustrations only, matching cgullstudy.com.
