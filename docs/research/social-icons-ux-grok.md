# Social icons UX — placement tradeoff (Grok Build)

**Date:** 2026-07-24  
**Agent:** Grok Build (analysis only — no implementation)  
**Repo:** `netiza-web` (Astro single-page landing)  
**Audience:** Orchestrator (Claude) + synthesis with Agy  

## Decision constraint (fixed)

| Priority | Goal |
|----------|------|
| **#1** | Conversion: consultas por WhatsApp (`whatsapp_click` → mensaje real en WA Business) |
| **#2** | Redes (Instagram + Facebook) visibles y clickeables — señal de presencia/confianza, no KPI |

Structured data already exposes profiles; UI does not.

## Evidence from this codebase (verified)

### What exists today

| Area | Reality |
|------|---------|
| Social URLs in UI | **None** — no clickable IG/FB anywhere |
| Social in SEO | `sameAs` in `src/layouts/BaseLayout.astro` → `instagram.com/netiza.ar` + FB profile `61578894231398` |
| WhatsApp source of truth | `src/data/links.ts` → `WHATSAPP_URL` |
| WA CTAs (in-page) | Navbar, Hero, QueHacemos, Metodo, CTAFinal, Footer |
| Tracking | `src/components/Analytics.astro` — delegated click on `a[href*="wa.me"]` → GA4 `whatsapp_click` + Meta `WhatsappClick` with `section` |
| Floating UI | **None** — no `position: fixed` chrome (only skip-link offscreen, sticky navbar `z-index: 100`) |
| Stack conventions | Scoped CSS per component, design tokens (`tokens.css`), **no Tailwind**, no icon library in `package.json` (only `astro` + `@astrojs/sitemap`) |

### Layout / chrome pressure

**Navbar** (`src/components/sections/Navbar.astro`):

- Sticky header with logo, 5 section links, primary **WhatsApp** button, theme toggle, mobile hamburger.
- Mobile (`≤809px`): bar keeps **logo + theme + hamburger only**; WhatsApp lives **inside** the dropdown, not in the always-visible bar.
- Adding social icons to the header fights limited real estate, especially mobile.

**Footer** (`src/components/sections/Footer.astro`):

- Brand (`Logo`) + tagline, location line, text link “Escribinos por WhatsApp” (accent color, touch min-height).
- Sparse, end-of-funnel contact block — natural home for secondary channels.

**Page shape** (`src/pages/index.astro`):

- Single `main` with 11 sections + Footer. Long scroll; footer is the deliberate “cierro / cómo contactar” zone after CTAFinal.

### Engram priors

- `#1087` — structured data complete (`sameAs`, geo, hours); remaining open item: wire clickable socials after UX placement research (this doc).
- Product doctrine in docs: métrica única WhatsApp; no vanity metrics; one primary CTA per block (`docs/planes/pamela-comercial.md`, `PLAN-UNICO-WEB.md`).

---

## 1. Tradeoff — three placements for THIS site

Scoring relative to **WhatsApp conversion first**, then discoverability of socials, a11y, mobile, and fit with Netiza’s “slow / boutique / Raíces Digitales” tone.

| Criterion | **A. Footer** | **B. Header (Navbar)** | **C. Floating lateral rail** |
|-----------|---------------|------------------------|------------------------------|
| Impact on WA conversion | **Best** — secondary; does not sit in sticky decision chrome | **Worse** — competes with WA in the one persistent chrome | **Worst** — permanent alternative actions on every viewport |
| Discoverability of IG/FB | Good for scrollers / intent “buscar redes”; weaker for bounce-before-footer | High (always near top) | Highest (always on screen) |
| Mobile density | Low — footer already sparse | High — bar already logo/theme/hamburger; WA is menu-hidden | High — fixed edge + thumbs + safe areas; site has **zero** floats today |
| Cognitive load mid-funnel | None | Medium (extra chrome next to CTA) | High (persistent choice noise) |
| Fit with existing design system | High — extends footer contact cluster | Medium — design spec nav is brand + nav + WA + theme | Low — introduces first floating pattern for a **secondary** goal |
| Implementation risk | Low — one component | Medium — responsive reflow of sticky nav | Medium–high — new fixed layer, z-index, overlap, a11y order |
| Future WA FAB compatibility | Neutral | Neutral | **Conflict** — if a WA float is ever added, social rail fights the same edge |

### A. Footer (recommended)

**Pros for Netiza**

- Matches conversion hierarchy: user is sold (or ready) after scrolling; footer = “how else to find us” without interrupting Hero/Método/CTAs.
- Footer already owns contact affordances (WA text link + location). Social icons complete the **trust/presence** cluster without inventing new UI patterns.
- Does not dilute the sticky primary CTA story on desktop, nor the cramped mobile top bar.
- Aligns with commercial rule: one primary CTA per block; socials are tertiary links, not buttons.

**Cons**

- Users who never reach the footer won’t see socials (acceptable: those users also didn’t convert; social is not the KPI).
- Footer WA link is text-only and quiet; social row must stay **visually subordinate** so it doesn’t steal clicks from “Escribinos por WhatsApp”.

### B. Header / Navbar

**Pros**

- Persistent visibility; some visitors hunt socials early for legitimacy.

**Cons for THIS site**

- Desktop: WA button is already the primary nav action. Icons next to it create parallel “ways out” of the page (Instagram is a high-engagement trap: leave site → feed, not → consulta).
- Mobile: **no spare chrome**. Logo + theme + hamburger already fill the bar; WA is inside the panel. Socials in the bar force either tinier targets, wrapping, or burying them in the menu (then discoverability ≈ footer, with more nav complexity).
- Design/spec posture (`design-spec-penpot-netiza.md`): nav = marca + navegación + CTA + tema — no social rail.
- Risks Hick’s-law delay on the only conversion that pays.

### C. Floating lateral rail (fixed)

**Pros**

- Maximum exposure; common on “agency” sites for vanity reach.

**Cons for THIS site — decisive**

1. **Conversion competition:** Every pixel of fixed chrome is attention not spent on section CTAs or (eventually) a WA FAB. Social float is the wrong first float for a WhatsApp-only funnel.
2. **No existing float:** Introducing `position: fixed` social icons creates a new product pattern without a primary-conversion float. If product later wants a WA bubble (common in LatAm service landings), social rail will **compete for the same corner/thumb zone**.
3. **Mobile saturation:** Fixed side icons overlap content, fight notches/home indicators, and invite accidental taps. Site is already long-scroll mobile-first.
4. **Brand tone:** Netiza is slow, editorial, non-aggressive. Sticky social rails read as generic growth-agency chrome — at odds with “Raíces Digitales”.
5. **a11y / focus:** Fixed layers complicate reading order, can cover focus rings, and need careful `z-index` vs sticky navbar (100) and skip-link (999).
6. **Performance:** Cost is tiny for 2 SVGs, but **layout/paint permanence** and distraction cost dominate — not bytes.

---

## 2. Risks (concrete)

### Conversion

| Risk | Footer | Header | Float |
|------|--------|--------|-------|
| Distraction from WA CTAs mid-scroll | Minimal | Medium | High |
| Exit to IG/FB before message | Low (end of journey) | Higher (early exit) | Highest (always available exit) |
| Dilution of “one primary action” | Controllable with muted icons | Harder | Fails hierarchy |

**Does a lateral float compete with WhatsApp?**  
**Yes.** Even without a WA FAB today, it competes with in-section primary buttons and with the mental model of “the action is write us on WhatsApp.” It also pre-occupies the float layer that product might later reserve for WA.

### Mobile

| Risk | Mitigation if chosen | Severity if float |
|------|----------------------|-------------------|
| Crowded top bar | N/A for footer | Header: high |
| Thumb zone clutter / content cover | Footer: none | Float: high — avoid |
| Accidental taps | Touch targets ≥ `--size-touch` (2.75rem / 44px) | Float: high |

Repo already standardizes touch at **44px** (`--size-touch: 2.75rem`), which exceeds the 24px floor.

### Accessibility

Requirements for any placement:

- Real `<a href>` (not div-onclick); `target="_blank"` + `rel="noopener noreferrer"`.
- Accessible name: `aria-label="Instagram de Netiza"` / `aria-label="Facebook de Netiza"` (or visible text).
- Icons decorative: `aria-hidden="true"` on SVG; name on the link.
- Focus-visible uses global ring (`BaseLayout` `:focus-visible` + tokens).
- Hit area ≥ `--size-touch` (prefer padding on the link, not only 16px glyph).
- Do not place fixed controls that cover main content or trap keyboard order after sticky header without care.

Footer is simplest: natural document order after main, no fixed positioning traps.

### Performance

| Approach | Cost |
|----------|------|
| Two inline SVG icons (~1–2 KB total, no request) | Negligible; preferred |
| Add `simple-icons` npm package | **Avoid** — empty need; no icon dep today; bloats node_modules for 2 paths |
| External icon font / CDN | **Avoid** — FOIT, third-party, off-brand |
| Floating bar JS (show/hide on scroll) | Unneeded complexity; worse for a11y |

---

## 3. Recommendation (one)

### **Footer only — muted social icon row; no header icons; no floating rail.**

**Why (conversion-first):**

1. WhatsApp remains the only primary action across the funnel; socials appear at the **end**, where trust/contact is expected.
2. Footer already holds brand + location + WA — IG/FB complete presence without inventing chrome.
3. Header is already capacity-constrained (especially mobile); adding secondary exits next to WA is anti-conversion.
4. A floating rail would be the site’s **first** fixed overlay and would spend that privilege on a non-KPI channel — wrong hierarchy for Netiza.
5. Matches documented product doctrine (WA-only conversion, no vanity-first UI).

**Combination rejected for v1:** header+footer or float+footer. Duplication increases exit surface without improving consulta rate.

**Optional later (not now):** if data shows high “legitimacy check” bounce before scroll, re-test **one** muted icon pair in the **mobile menu panel only** (not sticky bar) — still never a float.

---

## 4. Implementation plan (no code — for orchestrator / implementer)

### Scope

| In | Out |
|----|-----|
| Clickable IG + FB in footer | Floating rail |
| Centralize social URLs | Header social icons (v1) |
| a11y + tokens-compliant styling | New npm deps (`simple-icons`, icon fonts) |
| Keep WA visually primary in footer | Changing WA tracking contract |

### Components / files to touch

| File | Change |
|------|--------|
| **`src/data/links.ts`** | Add `INSTAGRAM_URL` and `FACEBOOK_URL` constants with the **exact** URLs already in `sameAs` (BaseLayout). Single source of truth for UI. |
| **`src/layouts/BaseLayout.astro`** | Prefer importing those constants into `professionalService.sameAs` so SEO and UI cannot drift. No visual change. |
| **`src/components/sections/Footer.astro`** | Only UI placement: social list under brand/tagline or between location and WA CTA. Scoped CSS only; tokens only. |
| **`src/pages/index.astro`** | **No change** (Footer already imported). |
| **`src/components/sections/Navbar.astro`** | **No change** for v1. |
| **`src/components/Analytics.astro`** | **No change required** for v1. Optional later: `social_click` delegated listener (secondary metric; do not dilute `whatsapp_click`). |
| **New component?** | Optional `SocialLinks.astro` under `src/components/ui/` **only if** reuse is planned; for footer-only, inline in Footer is enough and smaller. Prefer **no** new float component. |

### Icons

- **Inline SVG** (path data from Simple Icons or official brand assets), monochrome, `currentColor`.
- Color: `var(--color-text-secondary)`; hover → `var(--color-text-primary)` or subtle accent — **not** full brand gradients that outshine WA.
- Size: glyph ~20–24px inside a **min 44×44** interactive area (`min-width/min-height: var(--size-touch)`).
- Do **not** add `simple-icons` package for two static paths.

### Footer layout behavior

1. Structure (semantic):
   - Keep brand block.
   - Add `nav` or list with `aria-label="Redes sociales"` containing two links.
   - Keep location line.
   - Keep WA CTA as the **strongest** interactive (existing accent text link or leave as-is).
2. **Hierarchy rule:** social icons = secondary; WA link remains accent (`--color-accent`). Never style socials as primary buttons.
3. **Mobile:** horizontal row of two icons is fine; do not introduce a sticky bottom bar.
4. **Desktop:** same row; no fixed positioning.
5. Links: `target="_blank"` `rel="noopener noreferrer"`.

### How NOT to compete with WhatsApp

| Rule | Detail |
|------|--------|
| No float | Ever, for socials on this landing, unless product reopens conversion strategy |
| No header icons v1 | Protects sticky primary CTA story |
| Visual weight | Ghost/muted icons vs accent WA |
| No “Seguinos” mega banner | One quiet row is enough |
| Copy | Optional tiny label “Redes” if needed; no CTA-style “Unite a la comunidad” that steals WA intent |
| Tracking | Do not rename or overload `whatsapp_click`; socials optional separate event |

### a11y checklist (implementer)

- [ ] Links keyboard-focusable in natural order after main
- [ ] `:focus-visible` visible (global styles apply)
- [ ] Accessible names on each link
- [ ] Touch targets ≥ 44px
- [ ] Contrast of muted icons still ≥ WCAG for non-text UI against canvas (or ensure focus/hover state is clear)
- [ ] `prefers-reduced-motion` — no required motion; if hover transitions, keep using token duration

### QA / verification (when implemented — not this task)

- Visual: light + dark theme (`data-theme`)
- Mobile 390 + desktop 1200: footer row, no overlap
- Links open correct profiles (same as `sameAs`)
- axe: no orphan icons without names
- Confirm no regression on WA CTAs / `whatsapp_click` section labels (`footer.footer` landmark still valid)
- Lighthouse: negligible perf delta expected

### Suggested work unit (for apply agent)

1. Constants in `links.ts` + wire `sameAs` from them.  
2. Footer social row + scoped CSS.  
3. Manual a11y + theme pass.  
4. No PR for float/header experiments without new product decision.

---

## 5. Summary matrix (orchestrator)

| Option | Verdict |
|--------|---------|
| Footer | **Ship** — primary and only placement |
| Header | Reject v1 — chrome + conversion cost |
| Floating lateral | **Reject** — competes with WA priority, saturates mobile, first float spent on secondary goal |

---

## Executive summary

1. Socials exist only in JSON-LD `sameAs`; UI has zero IG/FB links and zero floating elements.  
2. Conversion doctrine is WhatsApp-only; socials are trust/presence, not KPI.  
3. **Recommend footer-only** muted icon links; reject header and lateral float for this landing.  
4. Implement via `links.ts` URL constants + `Footer.astro` inline SVGs + tokens; optionally DRY `sameAs`; no new deps, no Navbar change.  
5. Keep socials visually subordinate to footer WA; never introduce a social float that would fight a future WA FAB or mid-funnel CTAs.

---

*Report author: Grok Build · analysis-only · feeds Claude orchestration + Agy synthesis*
