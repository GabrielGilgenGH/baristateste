# Google Apps Script Lead Capture (Vercel + Vite)

This project sends leads from the frontend to `POST /api/leads` (Vercel Function).
The function forwards data to the Google Apps Script Web App with a server-side token.

## 1) Create the private Google Sheet

1. Create a new Google Sheet named `Dr Barista - Leads`.
2. Keep the spreadsheet private.
3. Rename the first tab to `Leads`.
4. Add this header row:

`created_at, interest, name, company, email, whatsapp, city, team_size_range, message, page_path, referrer, utm_source, utm_medium, utm_campaign, utm_term, utm_content, source_url, user_agent`

## 2) Create Apps Script attached to the sheet

1. Open the sheet.
2. Go to `Extensions` -> `Apps Script`.
3. Replace the default file with the script below.
4. Save as `Code.gs`.

```javascript
const SHEET_NAME = 'Leads'

function doOptions(e) {
  return createJsonResponse({ ok: true })
}

function doPost(e) {
  try {
    const payload = parseBody_(e)

    if (!payload.name || !payload.company || !payload.whatsapp || !payload.interest) {
      return createJsonResponse({ ok: false, message: 'Missing required fields.' })
    }

    const spreadsheet = SpreadsheetApp.getActiveSpreadsheet()
    const sheet = spreadsheet.getSheetByName(SHEET_NAME) || spreadsheet.insertSheet(SHEET_NAME)

    sheet.appendRow([
      new Date().toISOString(),
      payload.interest || '',
      payload.name || '',
      payload.company || '',
      payload.email || '',
      payload.whatsapp || '',
      payload.city || '',
      payload.team_size_range || '',
      payload.message || '',
      payload.pagePath || '',
      payload.referrer || '',
      payload.utm_source || '',
      payload.utm_medium || '',
      payload.utm_campaign || '',
      payload.utm_term || '',
      payload.utm_content || '',
      payload.source_url || '',
      payload.user_agent || '',
    ])

    return createJsonResponse({ ok: true })
  } catch (error) {
    return createJsonResponse({
      ok: false,
      message: 'Unable to process lead.',
    })
  }
}

function parseBody_(e) {
  const raw = e && e.postData && e.postData.contents ? e.postData.contents : '{}'
  return JSON.parse(raw)
}

function createJsonResponse(data) {
  return ContentService.createTextOutput(JSON.stringify(data)).setMimeType(ContentService.MimeType.JSON)
}
```

## 3) Deploy as Web App

1. Click `Deploy` -> `New deployment`.
2. Select type `Web app`.
3. `Execute as`: `Me`.
4. `Who has access`: `Anyone`.
5. Deploy and copy the Web App URL.

## 4) Configure Vercel environment

Set these environment variables in Vercel:

- `GOOGLE_APPS_SCRIPT_URL` = `<your apps script web app url>`
- `LEADS_WEBHOOK_TOKEN` = `<shared token validated by Apps Script>`

No token is exposed in the frontend bundle.

## Recommended columns

- `created_at` (ISO)
- `interest`
- `name`
- `company`
- `email`
- `whatsapp`
- `city`
- `team_size_range`
- `message`
- `page_path`
- `referrer`
- `utm_source`
- `utm_medium`
- `utm_campaign`
- `utm_term`
- `utm_content`
- `source_url`
- `user_agent`
