export type LeadSubmitPayload = {
  name: string
  company: string
  whatsapp: string
  email?: string
  city?: string
  team_size_range?: string
  message?: string
  interest?: 'maquinas' | 'produtos' | 'budget_request'
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
const MAX_ERROR_BODY_LENGTH = 200
const LEADS_DIAG_MARKER = '[LEADS_DIAG_V1]'
const LEADS_API_ENDPOINT = '/api/leads'

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

function mapServerError(errorCode: string) {
  if (errorCode === 'UNAUTHORIZED') return 'Unauthorized lead webhook.'
  if (errorCode === 'RATE_LIMIT') return 'Too many requests. Please try again later.'
  if (errorCode === 'VALIDATION') return 'Invalid lead payload.'
  if (errorCode === 'INVALID_PAYLOAD') return 'Invalid request payload.'
  if (errorCode === 'MISCONFIGURED') return 'Lead endpoint is not configured.'
  return 'Lead submission failed.'
}

function resolveLeadApiEndpoint() {
  const endpoint = LEADS_API_ENDPOINT.trim()
  if (endpoint.includes('script.google.com') || endpoint.includes('macros/s/')) {
    if (import.meta.env.DEV) {
      throw new Error('Lead client must use /api/leads, never a direct Apps Script URL.')
    }
    return '/api/leads'
  }

  if (!endpoint.startsWith('/api/leads')) {
    if (import.meta.env.DEV) {
      throw new Error('Lead client endpoint must stay on relative /api/leads.')
    }
    return '/api/leads'
  }

  return endpoint
}

export async function submitLead(payload: LeadSubmitPayload): Promise<LeadSubmitResult> {
  const validationError = validatePayload(payload)
  if (validationError) {
    return { ok: false, message: validationError }
  }

  if (payload.company_website?.trim()) {
    return { ok: true }
  }

  const controller = new AbortController()
  const timeoutId = window.setTimeout(() => controller.abort(), DEFAULT_TIMEOUT_MS)
  const endpoint = resolveLeadApiEndpoint()

  try {
    const response = await fetch(endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
      signal: controller.signal,
      credentials: 'same-origin',
    })

    let data: { ok?: boolean; error?: string; message?: string } = {}
    try {
      data = (await response.json()) as { ok?: boolean; error?: string; message?: string }
    } catch {
      data = {}
    }

    if (response.ok && data.ok === true) {
      return { ok: true }
    }

    const safeCode = toShortBody(data.error ?? data.message ?? `HTTP_${response.status}`)
    return {
      ok: false,
      message: `${LEADS_DIAG_MARKER} ${mapServerError(safeCode)} (${safeCode})`,
    }
  } catch (error) {
    if (error instanceof DOMException && error.name === 'AbortError') {
      return { ok: false, message: `${LEADS_DIAG_MARKER} Timeout. Please try again.` }
    }

    return {
      ok: false,
      message: toExceptionMessage(error),
    }
  } finally {
    window.clearTimeout(timeoutId)
  }
}
