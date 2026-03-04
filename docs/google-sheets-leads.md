# Google Sheets Lead Capture (Netlify Function -> Apps Script)

This project sends leads through:

`Frontend form -> Netlify Function -> Google Apps Script Web App -> Google Sheets`

## 1) Create the Spreadsheet

1. Open Google Sheets and create a new spreadsheet.
2. Name it: `Dr Barista — Leads`.
3. Create or keep one tab named `Leads`.

## 2) Attach Google Apps Script

1. In the sheet, open `Extensions -> Apps Script`.
2. Replace the default code with the file content from:
   `docs/apps-script/lead_webapp.gs`
3. Save the project.

## 3) Set Script Properties (token)

1. In Apps Script, open `Project Settings`.
2. Under `Script Properties`, add:
   - Key: `LEADS_WEBHOOK_TOKEN`
   - Value: a strong random secret (must match Netlify env var).

## 4) Deploy as Web App

1. Click `Deploy -> New deployment`.
2. Type: `Web app`.
3. Execute as: `Me`.
4. Who has access: `Anyone`.
5. Deploy and authorize.
6. Copy the generated Web App URL.

## 5) Configure Netlify Environment Variables

Set these variables in Netlify Site Settings:

- `GOOGLE_SHEETS_WEBAPP_URL` = the Web App URL from step 4
- `LEADS_WEBHOOK_TOKEN` = same token used in Apps Script Script Properties

## 6) Netlify Function endpoint

The frontend submits to:

- `/.netlify/functions/submit-lead`

The function forwards JSON payload to Apps Script with:

- header: `x-leads-token: <LEADS_WEBHOOK_TOKEN>`

## 7) Expected Sheet Columns

The Apps Script appends in this order:

1. `timestamp`
2. `interest`
3. `name`
4. `company`
5. `whatsapp`
6. `email`
7. `pagePath`
8. `referrer`
9. `utm_source`
10. `utm_medium`
11. `utm_campaign`
12. `utm_term`
13. `utm_content`
14. `userAgent`

## 8) Notes

- The lead form includes a honeypot field (`website`) and timestamps (`startedAt`, `submittedAt`).
- UTM params are captured from URL and persisted in `sessionStorage` for first-touch attribution.
- No SQL database is required for this pipeline.
