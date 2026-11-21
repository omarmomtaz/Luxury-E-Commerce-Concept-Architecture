# DESIGN_SYSTEM.md — Luxury Formalwear Portfolio Contract

You are building a single React (Vite) + Tailwind CSS showcase housing three routes:
1. `/` — **Pitch Hub** (stark commercial framing linking both demos)
2. `/maison-verre` — **MAISON VERRE** (High-conversion minimalist editorial storefront)
3. `/solene` — **SOLÈNE ATELIER** (Global luxury flagship with 2.5D depth & kinetic motion)

Follow every rule below strictly. Any deviation toward generic SaaS styling is a failure.

---

## 1. BANNED PATTERNS (ANTI-SLOP RULES)
- **NO** rounded corners above `2px` (`rounded-md`, `rounded-lg`, `rounded-xl`, `rounded-2xl` are BANNED except `rounded-full` strictly on 14px color swatches and lookbook hotspot dots).
- **NO** drop shadows (`shadow`, `shadow-md`, `shadow-lg`, `shadow-xl`). Use `1px` hairline borders (`border-[var(--border)]`) or subtle surface contrast instead.
- **NO** CSS gradients, glassmorphism blur cards, glowing buttons, or vibrant accent colors (no blue, purple, teal, or neon green).
- **NO** bouncy spring physics (`type: "spring"` with bounce) or scale-up-on-hover cards (`hover:scale-105` on containers is BANNED; subtle `scale-[1.03]` over `700ms` on inner overflow-hidden photography only).
- **NO** dead links or dummy buttons. Every visible button must trigger real state (cart, currency, language, modal, filter, bundler, or size calculator).
- **NO** physical directional utilities (`ml-`, `mr-`, `pl-`, `pr-`, `text-left`, `text-right`, `left-0`, `right-0` on flow elements).

---

## 2. STRICT RTL & BILINGUAL ARCHITECTURE
- All directional spacing and alignment MUST use Tailwind logical properties: `ms-*`, `me-*`, `ps-*`, `pe-*`, `start-*`, `end-*`, `text-start`, `text-end`, `border-s`, `border-e`.
- Toggling `lang` between `"en"` and `"ar"` MUST update `document.documentElement.dir` (`"ltr"` / `"rtl"`) and `document.documentElement.lang`.
- In Arabic (`dir="rtl"`), disable uppercase tracking (`tracking-widest` must become `tracking-normal` via `ltr:tracking-[0.18em] rtl:tracking-normal`) so Arabic glyphs remain properly connected.
- Keep numeric prices and SKUs formatted cleanly via `Intl.NumberFormat` in Latin numerals (`0-9`) for luxury international clarity.

---

## 3. TYPOGRAPHY & GOOGLE FONTS
Load in `index.html`:
- Display Serif (Maison Verre & Hub): `Cormorant Garamond` (weights 300, 400, 500, italic 400)
- Display Serif (Solène Atelier): `Italiana` (400) + `Cormorant Garamond` (italic 300, 400)
- UI Sans (Latin): `Inter` (300, 400, 500)
- UI & Display Arabic: `IBM Plex Sans Arabic` (300, 400, 500, 600)

Typography Rules:
- Headings: Tight line-height (`leading-[1.05]`), light/regular weight (`font-light` or `font-normal`), never `font-bold`.
- Micro-labels & Nav links: `text-[11px] uppercase ltr:tracking-[0.2em] rtl:tracking-normal font-normal`.
- Body copy: `text-[14px] leading-[1.65] font-light`.

---

## 4. BRAND COLOR TOKENS

### A. Pitch Hub (`/`)
- `--hub-bg`: `#F8F7F4` (Warm Alabaster)
- `--hub-surface`: `#FFFFFF`
- `--hub-ink`: `#111110`
- `--hub-muted`: `#6B6963`
- `--hub-border`: `#E5E2DC`

### B. MAISON VERRE (`/maison-verre`) — Crisp Architectural Minimalism
- `--mv-bg`: `#FAF9F6` (Porcelain Ivory)
- `--mv-surface`: `#F2EFE9` (Stone Linen)
- `--mv-ink`: `#141413` (Obsidian Ink)
- `--mv-muted`: `#6E6A63` (Taupe Slate)
- `--mv-border`: `#E4DFD6` (Hairline Sand)
- `--mv-accent`: `#4A2C2A` (Deep Espresso Burgundy — used sparingly for active indicators/stock badges)

### C. SOLÈNE ATELIER (`/solene`) — Dual-Mode Global Editorial
**9 AM Mode (Daylight Atelier):**
- `--sol-bg`: `#F3EFEA` (Warm Limestone)
- `--sol-surface`: `#E8E2D9`
- `--sol-ink`: `#121110`
- `--sol-muted`: `#645F57`
- `--sol-border`: `#D5CEC3`

**9 PM Mode (Evening Salon):**
- `--sol-bg`: `#0E0E0D` (Velvet Noir)
- `--sol-surface`: `#181715`
- `--sol-ink`: `#F2EDE6` (Champagne Chalk)
- `--sol-muted`: `#9E978D`
- `--sol-border`: `#2B2926`

---

## 5. LAYOUT & SPACING RHYTHM
- Max content width: `max-w-[1440px] mx-auto px-4 sm:px-8 lg:px-12`.
- Section vertical breathing room: `py-16 md:py-28`.
- Product card photography aspect ratio: strictly `aspect-[3/4]` with `object-cover object-top`.
- Mobile (`390px`) first: Zero horizontal overflow (`overflow-x-clip`, never `overflow-x-hidden` on sticky parents). Touch targets minimum `44px` height.

---

## 6. MOTION & PERFORMANCE CONTRACT (60FPS MOBILE GATE)
- Animate **ONLY** GPU-composited properties: `transform` (`x`, `y`, `scale`) and `opacity`.
- **BANNED** animations: `filter: blur()`, `width`, `height`, `top`, `left`, `box-shadow`, or SVG turbulence filters.
- Default luxury easing curve: `[0.22, 1, 0.36, 1]` (smooth exponential deceleration).
- Duration range: micro-interactions `250ms–350ms`; editorial reveals `650ms–900ms`.
- Wrap scroll-linked motion in `useReducedMotion()` fallback. On touch viewports under `768px`, reduce parallax travel distance by 60% to protect iOS Safari / WhatsApp WebView frame rate.