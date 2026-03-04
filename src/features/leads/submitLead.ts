export type LeadPayload = {
  name: string
  company: string
  email?: string
  whatsapp: string
  city?: string
  teamSize?: string
  message?: string
  interest?: 'maquinas' | 'produtos'
  website?: string
  pagePath?: string
  referrer?: string
  submittedAt?: string
  utm_source?: string
  utm_medium?: string
  utm_campaign?: string
  utm_term?: string
  utm_content?: string
}

type SubmitLeadResponse = {
  ok?: boolean
  error?: string
}

const UTM_SESSION_KEY = 'drbarista:utm:first-touch'
const UTM_KEYS = ['utm_source', 'utm_medium', 'utm_campaign', 'utm_term', 'utm_content'] as const

function readUtmFromUrl() {
  if (typeof window === 'undefined') return {}

  const params = new URLSearchParams(window.location.search)
  const utm = Object.fromEntries(
    UTM_KEYS
      .map((key) => [key, params.get(key)])
      .filter(([, value]) => Boolean(value)),
  ) as Pick<LeadPayload, (typeof UTM_KEYS)[number]>

  return utm
}

function readStoredUtm() {
  if (typeof window === 'undefined') return {}

  const raw = window.sessionStorage.getItem(UTM_SESSION_KEY)
  if (!raw) return {}

  try {
    return JSON.parse(raw) as Pick<LeadPayload, (typeof UTM_KEYS)[number]>
  } catch {
    return {}
  }
}

function resolveUtmParams() {
  if (typeof window === 'undefined') return {}

  const stored = readStoredUtm()
  const hasStored = UTM_KEYS.some((key) => Boolean(stored[key]))
  if (hasStored) return stored

  const fromUrl = readUtmFromUrl()
  const hasUrlUtm = UTM_KEYS.some((key) => Boolean(fromUrl[key]))

  if (hasUrlUtm) {
    window.sessionStorage.setItem(UTM_SESSION_KEY, JSON.stringify(fromUrl))
  }

  return fromUrl
}

function resolveInterest(payload: LeadPayload) {
  if (payload.interest) return payload.interest
  if ((payload.pagePath ?? '').startsWith('/produtos')) return 'produtos'
  return 'maquinas'
}

export async function submitLead(payload: LeadPayload): Promise<void> {
  const pagePath = payload.pagePath ?? (typeof window !== 'undefined' ? window.location.pathname : '')
  const referrer = payload.referrer ?? (typeof document !== 'undefined' ? document.referrer : '')
  const utm = resolveUtmParams()

  const requestBody: LeadPayload = {
    ...payload,
    email: payload.email?.trim() || '',
    city: payload.city?.trim() || '',
    teamSize: payload.teamSize?.trim() || '',
    message: payload.message?.trim() || '',
    website: payload.website?.trim() || '',
    pagePath,
    referrer,
    submittedAt: payload.submittedAt ?? new Date().toISOString(),
    interest: resolveInterest({ ...payload, pagePath }),
    ...utm,
  }

  if (import.meta.env.DEV) {
    console.info('[lead] submit', { pagePath: requestBody.pagePath, interest: requestBody.interest })
  }

  const response = await fetch('/.netlify/functions/lead', {
    method: 'POST',
    headers: {
      'content-type': 'application/json',
    },
    body: JSON.stringify(requestBody),
  })

  let data: SubmitLeadResponse = {}
  try {
    data = (await response.json()) as SubmitLeadResponse
  } catch {
    data = {}
  }

  if (!response.ok || !data.ok) {
    throw new Error('Não foi possível enviar agora. Tente novamente em alguns instantes.')
  }
}
