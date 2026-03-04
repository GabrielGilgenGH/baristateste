type JsonRecord = Record<string, unknown>

type LeadPayload = {
  name?: string
  company?: string
  whatsapp?: string
  email?: string
  interest?: string
  pagePath?: string
  referrer?: string
  website?: string
  startedAt?: string
  submittedAt?: string
  utm_source?: string
  utm_medium?: string
  utm_campaign?: string
  utm_term?: string
  utm_content?: string
}

function jsonResponse(statusCode: number, payload: JsonRecord) {
  return {
    statusCode,
    headers: {
      'content-type': 'application/json',
      'cache-control': 'no-store',
    },
    body: JSON.stringify(payload),
  }
}

function parseJsonBody(event: { body?: string | null }) {
  try {
    return event.body ? (JSON.parse(event.body) as LeadPayload) : null
  } catch {
    return null
  }
}

export const handler = async (event: {
  httpMethod?: string
  body?: string | null
  headers?: Record<string, string | undefined>
}) => {
  if (event.httpMethod !== 'POST') {
    return jsonResponse(405, { ok: false, error: 'Method not allowed' })
  }

  const webAppUrl = process.env.GOOGLE_SHEETS_WEBAPP_URL
  const webhookToken = process.env.LEADS_WEBHOOK_TOKEN

  if (!webAppUrl || !webhookToken) {
    return jsonResponse(500, { ok: false, error: 'Lead integration is not configured' })
  }

  const payload = parseJsonBody(event)
  if (!payload) {
    return jsonResponse(400, { ok: false, error: 'Invalid JSON payload' })
  }

  const requiredFields = ['name', 'company', 'whatsapp', 'interest'] as const
  const missingRequiredField = requiredFields.find((field) => {
    const value = payload[field]
    return typeof value !== 'string' || value.trim().length === 0
  })

  if (missingRequiredField) {
    return jsonResponse(400, { ok: false, error: 'Missing required fields' })
  }

  if (!['maquinas', 'produtos'].includes(payload.interest ?? '')) {
    return jsonResponse(400, { ok: false, error: 'Invalid interest' })
  }

  if (typeof payload.website === 'string' && payload.website.trim().length > 0) {
    return jsonResponse(200, { ok: true })
  }

  const forwardedPayload = {
    _token: webhookToken,
    timestamp: new Date().toISOString(),
    interest: payload.interest,
    name: payload.name?.trim() ?? '',
    company: payload.company?.trim() ?? '',
    whatsapp: payload.whatsapp?.trim() ?? '',
    email: payload.email?.trim() ?? '',
    pagePath: payload.pagePath ?? '',
    referrer: payload.referrer ?? '',
    utm_source: payload.utm_source ?? '',
    utm_medium: payload.utm_medium ?? '',
    utm_campaign: payload.utm_campaign ?? '',
    utm_term: payload.utm_term ?? '',
    utm_content: payload.utm_content ?? '',
    userAgent: event.headers?.['user-agent'] ?? '',
    startedAt: payload.startedAt ?? '',
    submittedAt: payload.submittedAt ?? '',
    serverTimestamp: new Date().toISOString(),
  }

  try {
    const response = await fetch(webAppUrl, {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
        'x-leads-token': webhookToken,
      },
      body: JSON.stringify(forwardedPayload),
    })

    if (!response.ok) {
      return jsonResponse(502, { ok: false, error: 'Lead forwarding failed' })
    }

    return jsonResponse(200, { ok: true })
  } catch {
    return jsonResponse(500, { ok: false, error: 'Unexpected lead forwarding error' })
  }
}
