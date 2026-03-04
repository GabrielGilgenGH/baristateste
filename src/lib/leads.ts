export type LeadSubmitPayload = {
  name: string
  company: string
  whatsapp: string
  email?: string
  city?: string
  team_size_range?: string
  message?: string
  interest?: 'maquinas' | 'produtos'
  pagePath?: string
  source_url?: string
  referrer?: string
  user_agent?: string
  submittedAt?: string
  utm_source?: string
  utm_medium?: string
  utm_campaign?: string
  utm_term?: string
  utm_content?: string
  company_website?: string
}

export type LeadSubmitResult = {
  ok: boolean
  message?: string
}

const UTM_SESSION_KEY = 'drbarista:utm:first-touch'
const UTM_KEYS = ['utm_source', 'utm_medium', 'utm_campaign', 'utm_term', 'utm_content'] as const
const DEFAULT_TIMEOUT_MS = 10_000
const RETRY_DELAY_MS = 500
const MAX_ERROR_BODY_LENGTH = 200
const LEADS_DIAG_MARKER = '[LEADS_DIAG_V1]'

export function isLeadsEndpointConfigured() {
  return Boolean(import.meta.env.VITE_LEADS_ENDPOINT_URL)
}

export function getLeadsEndpointUrl() {
  return (import.meta.env.VITE_LEADS_ENDPOINT_URL ?? '').trim()
}

function readStoredUtm() {
  if (typeof window === 'undefined') return {}
  const raw = window.sessionStorage.getItem(UTM_SESSION_KEY)
  if (!raw) return {}

  try {
    return JSON.parse(raw) as Record<string, string>
  } catch {
    return {}
  }
}

function readUtmFromUrl() {
  if (typeof window === 'undefined') return {}

  const params = new URLSearchParams(window.location.search)
  const utm = Object.fromEntries(
    UTM_KEYS
      .map((key) => [key, params.get(key)])
      .filter(([, value]) => Boolean(value)),
  ) as Partial<Record<(typeof UTM_KEYS)[number], string>>

  return utm
}

export function getUtmParams() {
  if (typeof window === 'undefined') return {}

  const stored = readStoredUtm()
  const hasStored = UTM_KEYS.some((key) => Boolean(stored[key]))
  if (hasStored) return stored

  const fromUrl = readUtmFromUrl()
  const hasFromUrl = UTM_KEYS.some((key) => Boolean(fromUrl[key]))
  if (hasFromUrl) {
    window.sessionStorage.setItem(UTM_SESSION_KEY, JSON.stringify(fromUrl))
  }

  return fromUrl
}

function validatePayload(payload: LeadSubmitPayload): string | null {
  if (!payload.name?.trim()) return 'Please provide your name.'
  if (!payload.company?.trim()) return 'Please provide your company.'
  if (!payload.whatsapp?.trim()) return 'Please provide your WhatsApp number.'
  return null
}

function wait(ms: number) {
  return new Promise((resolve) => window.setTimeout(resolve, ms))
}

function shouldRetryResponse(status: number) {
  return status >= 500 || status === 429
}

function toShortBody(value: string) {
  return value.replace(/\s+/g, ' ').trim().slice(0, MAX_ERROR_BODY_LENGTH)
}

function toExceptionMessage(error: unknown) {
  if (error instanceof Error) {
    const exceptionDetail = `${error.name}: ${error.message || 'No message'}`
    return `${LEADS_DIAG_MARKER} Exception: ${toShortBody(exceptionDetail)}`
  }

  return `${LEADS_DIAG_MARKER} Exception: Unknown error (no message).`
}

function logLeadEndpointError(endpointUrl: string, status: number, responseText: string) {
  if (!import.meta.env.DEV) return
  console.error('[lead] endpoint error', {
    endpointUrl,
    status,
    responseText,
  })
}

function buildLeadRequestUrl(endpointUrl: string, token: string) {
  const url = new URL(endpointUrl)
  url.searchParams.set('token', token)
  return url.toString()
}

function buildLeadFormBody(payload: LeadSubmitPayload) {
  const timestamp = payload.submittedAt ?? new Date().toISOString()
  const form = new URLSearchParams({
    created_at: timestamp,
    name: payload.name?.trim() ?? '',
    company: payload.company?.trim() ?? '',
    email: payload.email?.trim() ?? '',
    whatsapp: payload.whatsapp?.trim() ?? '',
    city: payload.city?.trim() ?? '',
    team_size_range: payload.team_size_range?.trim() ?? '',
    message: payload.message?.trim() ?? '',
    source_url: payload.source_url?.trim() ?? '',
    pagePath: payload.pagePath?.trim() ?? '',
    referrer: payload.referrer?.trim() ?? '',
    user_agent: payload.user_agent?.trim() ?? '',
    utm_source: payload.utm_source?.trim() ?? '',
    utm_medium: payload.utm_medium?.trim() ?? '',
    utm_campaign: payload.utm_campaign?.trim() ?? '',
    utm_term: payload.utm_term?.trim() ?? '',
    utm_content: payload.utm_content?.trim() ?? '',
    interest: payload.interest?.trim() ?? '',
    submittedAt: timestamp,
    website: payload.company_website?.trim() ?? '',
  })

  return form.toString()
}

export async function submitLead(payload: LeadSubmitPayload): Promise<LeadSubmitResult> {
  const endpointUrl = getLeadsEndpointUrl()
  if (!endpointUrl) {
    return { ok: false, message: 'Leads endpoint is not configured. Set VITE_LEADS_ENDPOINT_URL.' }
  }
  const token = (import.meta.env.VITE_LEADS_TOKEN ?? '').trim()
  if (!token) {
    return { ok: false, message: 'Leads token is not configured. Set VITE_LEADS_TOKEN.' }
  }

  const validationError = validatePayload(payload)
  if (validationError) {
    return { ok: false, message: validationError }
  }

  if (payload.company_website?.trim()) {
    return { ok: true }
  }

  let requestUrl = ''
  try {
    requestUrl = buildLeadRequestUrl(endpointUrl, token)
  } catch {
    return { ok: false, message: 'Leads endpoint URL is invalid. Set VITE_LEADS_ENDPOINT_URL.' }
  }

  const requestBody = buildLeadFormBody(payload)
  const maxAttempts = 2

  for (let attempt = 0; attempt < maxAttempts; attempt += 1) {
    const controller = new AbortController()
    const timeoutId = window.setTimeout(() => controller.abort(), DEFAULT_TIMEOUT_MS)

    try {
      const response = await fetch(requestUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
        },
        body: requestBody,
        signal: controller.signal,
      })

      let responseText = ''
      try {
        responseText = await response.text()
      } catch {
        responseText = ''
      }

      const shortBody = toShortBody(responseText)
      let responseBody: { ok?: boolean } = {}
      if (responseText) {
        try {
          responseBody = JSON.parse(responseText) as { ok?: boolean }
        } catch {
          responseBody = {}
        }
      }

      if (!response.ok || responseBody.ok === false) {
        logLeadEndpointError(endpointUrl, response.status, shortBody)

        if (attempt < maxAttempts - 1 && shouldRetryResponse(response.status)) {
          await wait(RETRY_DELAY_MS)
          continue
        }

        return {
          ok: false,
          message: `Lead endpoint error (${response.status}): ${shortBody || 'Empty response body'}`,
        }
      }

      return { ok: true }
    } catch (error) {
      if (error instanceof DOMException && error.name === 'AbortError') {
        return { ok: false, message: `${LEADS_DIAG_MARKER} Exception: AbortError: Request timeout. Please try again.` }
      }

      if (attempt < maxAttempts - 1) {
        await wait(RETRY_DELAY_MS)
        continue
      }

      return {
        ok: false,
        message: toExceptionMessage(error),
      }
    } finally {
      window.clearTimeout(timeoutId)
    }
  }

  return { ok: false, message: `${LEADS_DIAG_MARKER} Exception: Unknown error (no message).` }
}
