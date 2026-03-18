# Dr Barista Website

Institutional B2B website for coffee machine rental and vending.

## Stack

- Vite + React + TypeScript
- Tailwind CSS
- React Router
- Google Apps Script Web App for lead capture
- Static hosting compatible with cPanel/shared hosting

## Local development

```bash
npm install
cp .env.example .env.local
npm run dev
```

## Validation

```bash
npm run build
npm run lint
```

## Lead form integration

Current submission path:

1. `src/components/home/LeadCaptureSection.tsx`
2. `src/features/leads/submitLead.ts`
3. `src/lib/leads.ts`
4. Browser `POST` directly to the Google Apps Script Web App URL
5. Google Apps Script writes to the private Google Sheet

The sheet remains private. The browser never writes to it directly.
The hidden honeypot field and existing client-side repeated-submit guard remain in place.

Required frontend environment variable:

- `VITE_GOOGLE_APPS_SCRIPT_URL`

This value is a public Apps Script Web App URL, so it can live in the frontend config.

Detailed flow notes: [`docs/google-apps-script-leads.md`](docs/google-apps-script-leads.md)

## Static deploy

Run:

```bash
npm run build
```

Upload the contents of `dist/` to `public_html/` on cPanel.

`dist/` includes an Apache `.htaccess` fallback so React Router routes continue to work on shared hosting.

## What no longer depends on Vercel

- Lead submission no longer depends on `/api/leads`
- The frontend no longer depends on `api/leads.ts`
- The frontend no longer depends on `vercel.json`
