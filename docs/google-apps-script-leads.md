# Google Apps Script Lead Capture

This repository intentionally keeps the current lead flow:

1. Frontend submits to `POST /api/leads`
2. `api/leads.ts` validates and rate-limits the request
3. The server appends `token=<LEADS_WEBHOOK_TOKEN>` to the Apps Script URL
4. The server forwards the payload to Google Apps Script as `application/x-www-form-urlencoded`

Do not replace this flow with a direct frontend submission. The shared token must stay server-side.

## Current code path

- Form UI: `src/components/home/LeadCaptureSection.tsx`
- Form mapping: `src/features/leads/submitLead.ts`
- Frontend request client: `src/lib/leads.ts`
- Server proxy: `api/leads.ts`

## Server environment variables

- `GOOGLE_APPS_SCRIPT_URL`
- `LEADS_WEBHOOK_TOKEN`

These values belong only in the server runtime. They must not be exposed as `VITE_*` variables.

## Payload fields forwarded upstream

The proxy forwards the submitted lead using form-encoded fields. Current fields include:

- `created_at`
- `interest`
- `name`
- `company`
- `email`
- `whatsapp`
- `city`
- `team_size_range`
- `message`
- `pagePath`
- `referrer`
- `utm_source`
- `utm_medium`
- `utm_campaign`
- `utm_term`
- `utm_content`
- `source_url`
- `user_agent`
- `website`

`website` is derived from `company_website` when present.

## Apps Script expectations

The deployed Apps Script endpoint must:

- accept `POST`
- accept URL query parameter `token`
- validate the token server-side
- read `application/x-www-form-urlencoded` request bodies
- return JSON

Expected success response:

```json
{ "ok": true }
```

Expected unauthorized response:

```json
{ "ok": false, "error": "UNAUTHORIZED" }
```

## Deployment note

`vercel.json` is still kept because the current production setup uses:

- Vercel-style routing for `/api/leads`
- SPA fallback to `index.html`

If another infrastructure team migrates the app away from Vercel, they must provide equivalents for:

- the `/api/leads` server endpoint
- server-side injection of `GOOGLE_APPS_SCRIPT_URL` and `LEADS_WEBHOOK_TOKEN`
- SPA fallback routing
