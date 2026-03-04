function jsonResponse(statusCode, payload) {
  return {
    statusCode,
    headers: {
      'content-type': 'application/json',
      'cache-control': 'no-store',
    },
    body: JSON.stringify(payload),
  }
}

function parseJsonBody(event) {
  try {
    return event.body ? JSON.parse(event.body) : null
  } catch {
    return null
  }
}

function isBlank(value) {
  return typeof value !== 'string' || value.trim().length === 0
}

function resolveInterest(payload) {
  if (payload.interest === 'maquinas' || payload.interest === 'produtos') {
    return payload.interest
  }

  const pagePath = typeof payload.pagePath === 'string' ? payload.pagePath : ''
  return pagePath.startsWith('/produtos') ? 'produtos' : 'maquinas'
}

exports.handler = async function handler(event) {
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

  if (isBlank(payload.name) || isBlank(payload.company) || isBlank(payload.whatsapp)) {
    return jsonResponse(400, { ok: false, error: 'Missing required fields' })
  }

  if (typeof payload.website === 'string' && payload.website.trim().length > 0) {
    return jsonResponse(200, { ok: true })
  }

  const forwardedPayload = {
    timestamp: new Date().toISOString(),
    interest: resolveInterest(payload),
    name: payload.name.trim(),
    company: payload.company.trim(),
    whatsapp: payload.whatsapp.trim(),
    email: typeof payload.email === 'string' ? payload.email.trim() : '',
    city: typeof payload.city === 'string' ? payload.city.trim() : '',
    teamSize: typeof payload.teamSize === 'string' ? payload.teamSize.trim() : '',
    message: typeof payload.message === 'string' ? payload.message.trim() : '',
    pagePath: typeof payload.pagePath === 'string' ? payload.pagePath : '',
    referrer: typeof payload.referrer === 'string' ? payload.referrer : '',
    utm_source: typeof payload.utm_source === 'string' ? payload.utm_source : '',
    utm_medium: typeof payload.utm_medium === 'string' ? payload.utm_medium : '',
    utm_campaign: typeof payload.utm_campaign === 'string' ? payload.utm_campaign : '',
    utm_term: typeof payload.utm_term === 'string' ? payload.utm_term : '',
    utm_content: typeof payload.utm_content === 'string' ? payload.utm_content : '',
    userAgent: event.headers?.['user-agent'] ?? '',
    submittedAt: typeof payload.submittedAt === 'string' ? payload.submittedAt : '',
  }

  try {
    const upstreamResponse = await fetch(webAppUrl, {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
        'x-leads-token': webhookToken,
      },
      body: JSON.stringify(forwardedPayload),
    })

    if (!upstreamResponse.ok) {
      return jsonResponse(502, { ok: false, error: 'Lead forwarding failed' })
    }

    return jsonResponse(200, { ok: true })
  } catch {
    return jsonResponse(500, { ok: false, error: 'Unexpected lead forwarding error' })
  }
}
