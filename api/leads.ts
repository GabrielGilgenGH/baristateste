const RATE_LIMIT_WINDOW_MS = 10 * 60 * 1000
const RATE_LIMIT_MAX_REQUESTS = 10

const requestTimestampsByIp = new Map<string, number[]>()

type HandlerRequest = {
  method?: string
  headers: Record<string, string | string[] | undefined>
  body?: unknown
  socket?: { remoteAddress?: string }
}

type HandlerResponse = {
  status: (code: number) => HandlerResponse
  setHeader: (name: string, value: string) => void
  json: (body: unknown) => void
  end: (body?: string) => void
}

function getHeader(req: HandlerRequest, key: string) {
  const value = req.headers[key]
  if (Array.isArray(value)) return value[0]
  return value
}

function setCommonHeaders(res: HandlerResponse) {
  res.setHeader('Cache-Control', 'no-store, no-cache, must-revalidate')
  res.setHeader('Pragma', 'no-cache')
  res.setHeader('Expires', '0')
  res.setHeader('Content-Type', 'application/json; charset=utf-8')
  res.setHeader('X-Content-Type-Options', 'nosniff')
}

function allowSameOrigin(req: HandlerRequest, res: HandlerResponse) {
  const origin = getHeader(req, 'origin')
  const forwardedHost = getHeader(req, 'x-forwarded-host')
  const host = forwardedHost ?? getHeader(req, 'host')
  const proto = getHeader(req, 'x-forwarded-proto') ?? 'https'

  res.setHeader('Vary', 'Origin')

  if (!origin || !host) return true

  const expectedOrigin = `${proto}://${host}`
  if (origin !== expectedOrigin) {
    return false
  }

  res.setHeader('Access-Control-Allow-Origin', expectedOrigin)
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS')
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type')
  return true
}

function getClientIp(req: HandlerRequest) {
  const forwardedFor = getHeader(req, 'x-forwarded-for')
  if (forwardedFor) {
    return forwardedFor.split(',')[0].trim()
  }
  return req.socket?.remoteAddress ?? 'unknown'
}

function isRateLimited(ip: string) {
  const now = Date.now()
  const recent = (requestTimestampsByIp.get(ip) ?? []).filter((ts) => now - ts < RATE_LIMIT_WINDOW_MS)
  if (recent.length >= RATE_LIMIT_MAX_REQUESTS) {
    requestTimestampsByIp.set(ip, recent)
    return true
  }

  recent.push(now)
  requestTimestampsByIp.set(ip, recent)
  return false
}

function parsePayload(body: unknown) {
  if (!body) return null

  if (typeof body === 'string') {
    try {
      const parsed = JSON.parse(body) as unknown
      if (parsed && typeof parsed === 'object' && !Array.isArray(parsed)) {
        return parsed as Record<string, unknown>
      }
      return null
    } catch {
      return null
    }
  }

  if (typeof body === 'object' && !Array.isArray(body)) {
    return body as Record<string, unknown>
  }

  return null
}

function asString(value: unknown) {
  return typeof value === 'string' ? value.trim() : ''
}

function buildFormBody(payload: Record<string, unknown>) {
  const params = new URLSearchParams()

  for (const [key, value] of Object.entries(payload)) {
    if (value === undefined || value === null) continue

    if (typeof value === 'string' || typeof value === 'number' || typeof value === 'boolean') {
      params.set(key, String(value))
      continue
    }

    params.set(key, JSON.stringify(value))
  }

  if (!params.has('created_at')) {
    params.set('created_at', new Date().toISOString())
  }

  if (!params.has('website') && typeof payload.company_website === 'string') {
    params.set('website', payload.company_website)
  }

  return params
}

export default async function handler(req: HandlerRequest, res: HandlerResponse) {
  setCommonHeaders(res)

  if (!allowSameOrigin(req, res)) {
    res.status(403).json({ ok: false, error: 'FORBIDDEN' })
    return
  }

  if (req.method === 'OPTIONS') {
    res.status(204).end()
    return
  }

  if (req.method !== 'POST') {
    res.status(405).json({ ok: false, error: 'METHOD_NOT_ALLOWED' })
    return
  }

  const payload = parsePayload(req.body)
  if (!payload) {
    res.status(400).json({ ok: false, error: 'INVALID_PAYLOAD' })
    return
  }

  const email = asString(payload.email)
  const phone = asString(payload.phone)
  const whatsapp = asString(payload.whatsapp)
  if (!email && !phone && !whatsapp) {
    res.status(400).json({ ok: false, error: 'VALIDATION' })
    return
  }

  const clientIp = getClientIp(req)
  if (isRateLimited(clientIp)) {
    res.status(429).json({ ok: false, error: 'RATE_LIMIT' })
    return
  }

  const scriptUrl = process.env.GOOGLE_APPS_SCRIPT_URL?.trim()
  const token = process.env.LEADS_WEBHOOK_TOKEN?.trim()
  if (!scriptUrl || !token) {
    res.status(500).json({ ok: false, error: 'MISCONFIGURED' })
    return
  }

  let targetUrl = ''
  try {
    const url = new URL(scriptUrl)
    url.searchParams.set('token', token)
    targetUrl = url.toString()
  } catch {
    res.status(500).json({ ok: false, error: 'MISCONFIGURED' })
    return
  }

  const body = buildFormBody(payload)

  try {
    const upstreamResponse = await fetch(targetUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
      },
      body: body.toString(),
    })

    const text = await upstreamResponse.text()
    let data: { ok?: boolean; error?: string } = {}
    try {
      data = JSON.parse(text) as { ok?: boolean; error?: string }
    } catch {
      data = {}
    }

    if (upstreamResponse.ok && data.ok === true) {
      res.status(200).json({ ok: true })
      return
    }

    if (data.error === 'UNAUTHORIZED') {
      res.status(401).json({ ok: false, error: 'UNAUTHORIZED' })
      return
    }

    res.status(502).json({ ok: false, error: 'FAILED' })
  } catch {
    res.status(502).json({ ok: false, error: 'FAILED' })
  }
}
