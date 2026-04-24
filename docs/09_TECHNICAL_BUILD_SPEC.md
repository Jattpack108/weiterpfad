# 09 — TECHNICAL BUILD SPEC

## Stack
- Next.js App Router
- TypeScript
- Tailwind CSS
- framer-motion when subtle and useful
- lucide-react for icons

## Build expectation
Codex should turn the current monolithic homepage into a clean multi-page site.

## Expected structure
- app/
  - page.tsx
  - about/page.tsx
  - product/page.tsx
  - providers/page.tsx
  - for-families/page.tsx
  - contact/page.tsx
  - layout.tsx
  - globals.css
- components/
  - layout/
  - sections/
  - ui/
- data/
- lib/ if needed

## Refactoring rule
Treat `app/page.tsx` as the visual and strategic reference.
Do not discard it.
Decompose it carefully into reusable sections and shared components.

## Code quality rules
- strong typing
- no broken imports
- no dead code
- no giant final page files
- no unnecessary libraries
- clean mock-data separation

## Data rule
Use local structured mock data for the first coded release.
The mock data should feel plausible and aligned with the product.

## Form rule
No backend is required now.
A polished UI-only form is acceptable.

## Accessibility rules
- semantic HTML
- visible focus states
- keyboard-usable controls
- proper heading hierarchy
- strong contrast
- good tap targets

## Responsive rule
Premium on desktop.
Still clear and intentional on mobile.
