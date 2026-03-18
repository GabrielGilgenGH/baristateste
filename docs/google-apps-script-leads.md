# Google Apps Script Lead Capture

This project now uses the simplest static flow:

1. Frontend form collects lead data
2. Frontend submits directly to the Google Apps Script Web App URL
3. Google Apps Script writes to the private Google Sheet

The sheet remains private. Only the Apps Script Web App is public.

## Current code path

- Form UI: `src/components/home/LeadCaptureSection.tsx`
- Form mapping: `src/features/leads/submitLead.ts`
- Frontend request client: `src/lib/leads.ts`

## Frontend config

- `VITE_GOOGLE_APPS_SCRIPT_URL`

This value is a public Apps Script Web App URL and is expected to be present in the frontend environment.

## Existing minimal protections

- required client-side field validation
- honeypot field using `company_website`
- client-side repeated-submit guard via local storage
- payload trimming before submission

## Payload format

The frontend submits `application/x-www-form-urlencoded` fields, keeping the existing mapping as closely as possible:

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

The deployed Apps Script Web App should:

- accept browser `POST` requests
- accept `application/x-www-form-urlencoded`
- return JSON when possible
- write to a private Google Sheet

Expected success response:

```json
{ "ok": true }
```

Any Vercel-specific lead proxy is no longer part of the static frontend flow.
