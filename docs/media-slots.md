# Viral — Media Slots Reference

Placeholder inventory for the Penpot replica. Each gray placeholder in the design maps to one
real image/video from the original site. Replace by selecting the shape in Penpot (names listed
below) and setting a `fillImage`, or import via the Penpot MCP `media_upload` / image tools.

**Art direction (keep consistent across all assets):**
Warm cream + black monochrome palette (bg `#EFEBE5`). Editorial, premium, natural soft light.
No heavy saturation — the only color comes from skin tones and product. Short-form / social-media
agency vibe.

**Note:** The original uses *video* (MP4) in most media slots. Penpot is static, so these are
single frames. If you want motion, keep the MP4s for the eventual coded build; in Penpot use a
representative still frame.

| # | Penpot shape name | Render size (px) | Aspect | Radius | Content / suggested prompt |
|---|-------------------|------------------|--------|--------|-----------------------------|
| 1 | `Hero story (video placeholder)` | 359 × 649 | 9:16 | 24 | Instagram-story frame: young female content creator, soft studio light, pink-toned hair, close-up. Vertical reel look. |
| 2 | `icon tile` (Card Content Creation) | 288 × 150 | ~2:1 | 12 | 3D render icon: clapperboard / film slate, matte clay style, cream background, soft shadow. |
| 3 | `icon tile` (Card Social Management) | 288 × 150 | ~2:1 | 12 | 3D render icon: smartphone showing a social feed, matte clay style, cream background. |
| 4 | `icon tile` (Card Paid Media) | 288 × 150 | ~2:1 | 12 | 3D render icon: megaphone with coins/sparkles, matte clay style, cream background. |
| 5 | `case image (video placeholder)` (Case Glowhaus) | 442 × 598 | ~3:4 | 34 | Beauty brand: close-up of a face with glowing skincare, warm tones. Overlay wordmark "Glowhaus". |
| 6 | `case image (video placeholder)` (Case Theo) | 442 × 598 | ~3:4 | 34 | Clothing brand: person in neutral-tone dress/outfit, editorial fashion. Overlay wordmark "theo". |
| 7 | `testimonial image (video placeholder)` | 392 × 400 | ~1:1 | 16 | Skincare close-up (eye / product), warm. Overlay script wordmark "Bloom". brightness ~0.9. |
| 8 | `portrait (photo placeholder)` (Sofia Lindt) | 341 × 470 | ~0.66 | 16 | Portrait of a person in a pink sweater against a light background. |
| 9 | `portrait (photo placeholder)` (James Cohen) | 341 × 470 | ~0.66 | 16 | Portrait of a person in dark clothing speaking on a phone. |
| 10 | `portrait (photo placeholder)` (Maya Rodriguez) | 341 × 470 | ~0.66 | 16 | Portrait of a laughing person with curly hair wearing a white shirt. |
| 11 | `phone mockup (placeholder)` (CTA final) | 372 × 372 | 1:1 | 24 | 3D phone mockup, layered soft shadow, showing the app/feed, cream background. |

## Fonts (already correct in the document)
- Body/UI/headings: **Inter** 500 (resolved to exact "Inter", not "Inter Tight").
- Italic accent words in every heading: **Source Serif 4** italic (separate text elements).
- The `export_shape` preview renders these as a fallback sans — in the Penpot browser app they
  render correctly.

## Known deviations from the live site (tool constraints, documented)
- Negative `letter-spacing` applied via design tokens (direct setter rejects negatives).
- Italic accent words are separate text runs (range styling `applyToRange` is non-functional here).
- "Havana" font (original "Bloom" wordmark) not available → using Source Serif 4 italic.
- All media are gray placeholders pending the assets above.
