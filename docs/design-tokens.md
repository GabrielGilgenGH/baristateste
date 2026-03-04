# Design Tokens Guardrails

This project uses tokenized values from `tailwind.config.js` for colors, spacing rhythm, and radius consistency.

## Color tokens

Use `brand.*` tokens from Tailwind:

- `brand.base`
- `brand.surface`
- `brand.surfaceSoft`
- `brand.cream`
- `brand.charcoal`
- `brand.espresso`
- `brand.copper`
- `brand.copperHover`
- `brand.copperPressed`
- `brand.teal`
- `brand.tealSoft`
- `brand.tealHover`
- `brand.brassSoft`
- `brand.warmGray`
- `brand.ink`

Examples:

- `bg-brand-surface`
- `text-brand-charcoal`
- `border-brand-warmGray/45`
- `focus-visible:ring-brand-copper/90`

## Spacing and radius conventions

- Prefer Tailwind scale spacing (`p-4`, `px-6`, `gap-3`, `mt-8`).
- For large layout blocks, keep widths aligned to existing container pattern (`max-w-6xl`).
- Prefer configured radius tokens:
  - `rounded-lg`
  - `rounded-xl`
  - `rounded-2xl`

## Do / Don’t

Do:

- Reuse token classes (`bg-brand-surfaceSoft`, `text-brand-espresso`).
- Reuse existing component primitives (`Button`, `Input`, `Card`, `Section`).

Don’t:

- Add raw colors (`#fff`, `#123456`, `rgb(0,0,0)`).
- Add Tailwind arbitrary one-off color values (`bg-[#123456]`).

## Guard check

Run:

```bash
npm run tokens:check
```

Notes:

- By default, the check scans changed files only.
- To scan all tracked files, run:

```bash
CHECK_ALL=1 npm run tokens:check
```
