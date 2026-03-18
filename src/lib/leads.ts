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
  category?: LeadDiagnosticCategory
  diagnostic?: LeadSubmitDiagnostic
}

type LeadResponseBody = {
  ok?: boolean
  error?: string
  code?: string
  message?: string
  status?: string
  result?: string
}

type LeadDiagnosticCategory =
  | 'validation'
  | 'misconfigured'
  | 'legacy_protected_endpoint'
  | 'http_error'
  | 'timeout'
  | 'network_error'

type LeadSubmitDiagnostic = {
  requestUrl: string
  finalUrl?: string
  status?: number
  statusText?: string
  responseTextSnippet?: string
  category: LeadDiagnosticCategory
}

const UTM_SESSION_KEY = 'drbarista:utm:first-touch'
const UTM_KEYS = ['utm_source', 'utm_medium', 'utm_campaign', 'utm_term', 'utm_content'] as const
const DEFAULT_TIMEOUT_MS = 10_000
const MAX_ERROR_BODY_LENGTH = 200
const LEADS_SCRIPT_URL = import.meta.env.VITE_GOOGLE_APPS_SCRIPT_URL?.trim() ?? ''
const LEGACY_AUTH_MARKERS = [
  'UNAUTHORIZED',
  'MISSING_EXPECTED_TOKEN',
  'INVALID_TOKEN',
  'EXPECTED TOKEN',
  'PROVIDED TOKEN',
] as const

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
    return `Lead submission failed: ${toShortBody(exceptionDetail)}`
  }

  return 'Lead submission failed: Unknown error.'
}

function mapServerError(errorCode: string) {
  if (errorCode === 'VALIDATION') return 'Please review the required form fields.'
  if (errorCode === 'INVALID_PAYLOAD') return 'Lead form payload is invalid.'
  if (errorCode === 'MISCONFIGURED') return 'Lead endpoint is not configured.'
  if (errorCode === 'UNAUTHORIZED') return 'Lead endpoint rejected the request.'
  return 'Lead submission failed.'
}

function resolveLeadScriptUrl() {
  if (!LEADS_SCRIPT_URL) return null

  try {
    const url = new URL(LEADS_SCRIPT_URL)
    return url.protocol === 'https:' ? url.toString() : null
  } catch {
    return null
  }
}

function buildLeadFormBody(payload: LeadSubmitPayload) {
  const params = new URLSearchParams()

  for (const [key, value] of Object.entries(payload)) {
    if (key === 'company_website') continue
    if (typeof value !== 'string') continue
    const trimmed = value.trim()
    if (!trimmed) continue
    params.set(key, trimmed)
  }

  if (!params.has('created_at')) {
    params.set('created_at', payload.submittedAt?.trim() || new Date().toISOString())
  }

  if (!params.has('website') && payload.company_website?.trim()) {
    params.set('website', payload.company_website.trim())
  }

  return params
}

function normalizeResponseFlag(value?: string) {
  return value?.trim().toLowerCase() ?? ''
}

function normalizeErrorCode(value?: string) {
  if (!value) return ''
  const compact = value.trim()
  if (!compact) return ''
  return compact.replace(/\s+/g, '_').toUpperCase()
}

function detectLegacyProtectedEndpoint({
  status,
  bodyText,
  data,
}: {
  status: number
  bodyText: string
  data: LeadResponseBody
}) {
  if (status === 401 || status === 403) return true

  const haystack = [
    data.error,
    data.code,
    data.message,
    data.status,
    data.result,
    bodyText,
  ]
    .filter(Boolean)
    .join(' ')
    .toUpperCase()

  return LEGACY_AUTH_MARKERS.some((marker) => haystack.includes(marker))
}

function logLeadDiagnostic(diagnostic: LeadSubmitDiagnostic) {
  console.error('[lead-submit]', diagnostic)
}

function resolveFailureState({
  response,
  data,
  bodyText,
  endpoint,
}: {
  response: Response
  data: LeadResponseBody
  bodyText: string
  endpoint: string
}): Pick<LeadSubmitResult, 'message' | 'category' | 'diagnostic'> {
  const code = normalizeErrorCode(data.error ?? data.code)
  const message = toShortBody(data.message ?? '')
  const statusFlag = normalizeResponseFlag(data.status ?? data.result)
  const isLegacyProtected = detectLegacyProtectedEndpoint({
    status: response.status,
    bodyText,
    data,
  })
  const category: LeadDiagnosticCategory = isLegacyProtected ? 'legacy_protected_endpoint' : 'http_error'
  const diagnostic: LeadSubmitDiagnostic = {
    requestUrl: endpoint,
    finalUrl: response.url || endpoint,
    status: response.status,
    statusText: response.statusText,
    responseTextSnippet: toShortBody(bodyText || message || code || response.statusText || ''),
    category,
  }

  logLeadDiagnostic(diagnostic)

  if (isLegacyProtected) {
    return {
      category,
      diagnostic,
      message: 'Lead endpoint rejected the request. The configured Apps Script URL is likely an old protected deployment.',
    }
  }

  if (message && statusFlag !== 'error' && code !== 'UNAUTHORIZED') {
    return {
      category,
      diagnostic,
      message,
    }
  }

  if (code) {
    return {
      category,
      diagnostic,
      message: `${mapServerError(code)} (${code})`,
    }
  }

  if (statusFlag === 'error' && message) {
    return {
      category,
      diagnostic,
      message,
    }
  }

  return {
    category,
    diagnostic,
    message: `Lead submission failed. (HTTP_${response.status})`,
  }
}

export async function submitLead(payload: LeadSubmitPayload): Promise<LeadSubmitResult> {
  const validationError = validatePayload(payload)
  if (validationError) {
    return { ok: false, message: validationError, category: 'validation' }
  }

  if (payload.company_website?.trim()) {
    return { ok: true }
  }

  const endpoint = resolveLeadScriptUrl()
  if (!endpoint) {
    return {
      ok: false,
      message: `${mapServerError('MISCONFIGURED')} (MISCONFIGURED)`,
      category: 'misconfigured',
      diagnostic: {
        requestUrl: LEADS_SCRIPT_URL,
        category: 'misconfigured',
      },
    }
  }

  const controller = new AbortController()
  const timeoutId = window.setTimeout(() => controller.abort(), DEFAULT_TIMEOUT_MS)
  const body = buildLeadFormBody(payload)

  try {
    const response = await fetch(endpoint, {
      method: 'POST',
      headers: {
        Accept: 'application/json, text/plain, */*',
        'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
      },
      body,
      signal: controller.signal,
    })

    const bodyText = await response.text()
    let data: LeadResponseBody = {}
    if (bodyText) {
      try {
        data = JSON.parse(bodyText) as LeadResponseBody
      } catch {
        data = { message: toShortBody(bodyText) }
      }
    }
    const code = normalizeErrorCode(data.error ?? data.code)
    const statusFlag = normalizeResponseFlag(data.status ?? data.result)
    const isLegacyProtected = detectLegacyProtectedEndpoint({
      status: response.status,
      bodyText,
      data,
    })

    if (response.ok && data.ok !== false && !code && statusFlag !== 'error' && !isLegacyProtected) {
      return { ok: true }
    }

    return {
      ok: false,
      ...resolveFailureState({
        response,
        data,
        bodyText,
        endpoint,
      }),
    }
  } catch (error) {
    if (error instanceof DOMException && error.name === 'AbortError') {
      const diagnostic: LeadSubmitDiagnostic = {
        requestUrl: endpoint,
        category: 'timeout',
      }
      logLeadDiagnostic(diagnostic)
      return { ok: false, message: 'Lead submission timed out. Please try again.', category: 'timeout', diagnostic }
    }

    const diagnostic: LeadSubmitDiagnostic = {
      requestUrl: endpoint,
      category: 'network_error',
      responseTextSnippet: toShortBody(error instanceof Error ? error.message : 'Unknown error'),
    }
    logLeadDiagnostic(diagnostic)
    return {
      ok: false,
      message: toExceptionMessage(error),
      category: 'network_error',
      diagnostic,
    }
  } finally {
    window.clearTimeout(timeoutId)
  }
}
