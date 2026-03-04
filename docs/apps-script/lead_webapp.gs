function jsonResponse_(statusCode, payload) {
  return ContentService
    .createTextOutput(JSON.stringify(payload))
    .setMimeType(ContentService.MimeType.JSON)
}

function getHeaderToken_(event) {
  if (event && event.headers) {
    return event.headers['x-leads-token'] || event.headers['X-Leads-Token'] || ''
  }
  return ''
}

function getBody_(event) {
  if (!event || !event.postData || !event.postData.contents) return null
  try {
    return JSON.parse(event.postData.contents)
  } catch (error) {
    return null
  }
}

function ensureSheet_(spreadsheet, sheetName) {
  var sheet = spreadsheet.getSheetByName(sheetName)
  if (!sheet) {
    sheet = spreadsheet.insertSheet(sheetName)
  }
  return sheet
}

function doPost(e) {
  var body = getBody_(e)
  if (!body) {
    return jsonResponse_(400, { ok: false, error: 'Invalid JSON payload' })
  }

  // Apps Script may not expose custom headers in every runtime; use header when available.
  var headerToken = getHeaderToken_(e)
  var fallbackToken = body._token || ''
  var receivedToken = headerToken || fallbackToken
  var expectedToken = PropertiesService.getScriptProperties().getProperty('LEADS_WEBHOOK_TOKEN')

  if (!expectedToken || receivedToken !== expectedToken) {
    return jsonResponse_(401, { ok: false, error: 'Unauthorized' })
  }

  var spreadsheet = SpreadsheetApp.getActiveSpreadsheet()
  var sheet = ensureSheet_(spreadsheet, 'Leads')

  var row = [
    body.timestamp || new Date().toISOString(),
    body.interest || '',
    body.name || '',
    body.company || '',
    body.whatsapp || '',
    body.email || '',
    body.pagePath || '',
    body.referrer || '',
    body.utm_source || '',
    body.utm_medium || '',
    body.utm_campaign || '',
    body.utm_term || '',
    body.utm_content || '',
    body.userAgent || '',
  ]

  sheet.appendRow(row)

  return jsonResponse_(200, { ok: true })
}
