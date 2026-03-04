export type LeadInterest = 'maquinas' | 'produtos'

export type UtmParams = {
  utm_source?: string
  utm_medium?: string
  utm_campaign?: string
  utm_term?: string
  utm_content?: string
}

export type LeadPayload = {
  name: string
  company: string
  whatsapp: string
  email?: string
  interest: LeadInterest
  pagePath: string
  referrer?: string
  website?: string
  startedAt: string
  submittedAt: string
  utm_source?: string
  utm_medium?: string
  utm_campaign?: string
  utm_term?: string
  utm_content?: string
}

const UTM_SESSION_KEY = 'drbarista:utm:first-touch'
const UTM_KEYS = ['utm_source', 'utm_medium', 'utm_campaign', 'utm_term', 'utm_content'] as const

function isBrowser() {
  return typeof window !== 'undefined'
}

function pickUtmFromSearch(search: string): UtmParams {
  const params = new URLSearchParams(search)
  const result: UtmParams = {}

  for (const key of UTM_KEYS) {
    const value = params.get(key)
    if (value) result[key] = value
  }

  return result
}

function hasAnyUtm(utm: UtmParams) {
  return UTM_KEYS.some((key) => Boolean(utm[key]))
}

function readStoredUtm(): UtmParams {
  if (!isBrowser()) return {}

  const raw = window.sessionStorage.getItem(UTM_SESSION_KEY)
  if (!raw) return {}

  try {
    return JSON.parse(raw) as UtmParams
  } catch {
    return {}
  }
}

function writeStoredUtm(utm: UtmParams) {
  if (!isBrowser()) return
  window.sessionStorage.setItem(UTM_SESSION_KEY, JSON.stringify(utm))
}

export function getUtmParams(): UtmParams {
  if (!isBrowser()) return {}

  const stored = readStoredUtm()
  if (hasAnyUtm(stored)) return stored

  const fromUrl = pickUtmFromSearch(window.location.search)
  if (hasAnyUtm(fromUrl)) {
    writeStoredUtm(fromUrl)
  }

  return fromUrl
}

export async function submitLead(payload: LeadPayload): Promise<{ ok: boolean }> {
  const response = await fetch('/.netlify/functions/lead', {
    method: 'POST',
    headers: {
      'content-type': 'application/json',
    },
    body: JSON.stringify(payload),
  })

  let data: { ok?: boolean; error?: string } = {}
  try {
    data = (await response.json()) as { ok?: boolean; error?: string }
  } catch {
    data = {}
  }

  if (!response.ok || !data.ok) {
    throw new Error(data.error ?? 'Não foi possível enviar sua solicitação agora.')
  }

  return { ok: true }
}
