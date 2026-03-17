# Dr Barista Website

Institutional B2B website for coffee machine rental and vending.

## Stack

- Vite + React + TypeScript
- Tailwind CSS
- React Router
- Vercel serverless function for lead proxying
- Google Apps Script Web App as the final lead destination

## Local development

```bash
npm install
npm run dev
```

## Validation

```bash
npm run build
npm run lint
```

Optional lead proxy smoke test:

```bash
BASE_URL=https://your-deployment.example.com npm run smoke:leads
```

## Lead form integration

Current submission path:

1. `src/components/home/LeadCaptureSection.tsx`
2. `src/features/leads/submitLead.ts`
3. `src/lib/leads.ts`
4. `POST /api/leads`
5. `api/leads.ts`
6. Google Apps Script Web App

The frontend must continue posting only to `/api/leads`.
Do not move the Apps Script URL or webhook token into the frontend bundle.

Required server-side environment variables:

- `GOOGLE_APPS_SCRIPT_URL`
- `LEADS_WEBHOOK_TOKEN`

Copy `.env.example` only for local server-side testing. Never commit real values.

Detailed flow notes: [`docs/google-apps-script-leads.md`](docs/google-apps-script-leads.md)

## Deployment handoff notes

- `vercel.json` is intentionally kept because the current production flow relies on the Vercel-style `/api/leads` function plus SPA fallback routing.
- `api/leads.ts` is intentionally kept. It protects the shared Apps Script token by keeping it on the server.
- `public/_redirects` was removed because it was a Netlify-specific leftover and is not part of the current deployment path.
- Local-only artifacts such as `.env.local`, `.vercel/`, `dist/`, `test-results/`, `_pr_evidence/`, and `.tmp-playwright/` should not be included in any handoff bundle.
