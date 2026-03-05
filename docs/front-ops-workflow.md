# Front-End Ops Workflow

## Purpose of `/ui`

The `/ui` route is an internal playground for visual iteration and component QA.

- It is not linked in the main navigation.
- Use it to validate tokens, interaction states, and composition patterns before touching production pages.

## Component inventory

Component inventory is generated from `.tsx` files in:

- `src/components`
- `src/features`
- `src/ui-kit`
- `src/ui-playground`

Generated output:

- `src/ui-playground/component-inventory.generated.json`

Regenerate inventory:

```bash
npm run inventory:generate
```

## Visual snapshots

Use screenshot smoke tests to catch obvious regressions before opening a PR.

```bash
npm run visual:snap
```

Baseline output:

- `scripts/visual-baseline/output/`

When updating snapshots:

- Confirm intended visual changes first.
- Regenerate snapshots.
- Review each page screenshot before commit.

## Before push / PR checklist

Run:

```bash
npm run check:all
```

This gate runs:

1. token guard checks
2. component inventory generation
3. production build
4. visual snapshot smoke

## Future upgrades (optional)

- Accessibility smoke checks (keyboard + landmark assertions)
- Bundle size budget checks
- Lighthouse/performance smoke checks
