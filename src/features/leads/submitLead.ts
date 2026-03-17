import { getUtmParams, submitLead as submitLeadRequest, type LeadSubmitPayload } from '../../lib/leads'

export type LeadPayload = {
  name: string
  company: string
  email?: string
  whatsapp: string
  city?: string
  teamSize?: string
  message?: string
  interest?: 'maquinas' | 'produtos' | 'budget_request'
  website?: string
  company_website?: string
  pagePath?: string
  referrer?: string
  submittedAt?: string
}

function resolveInterest(payload: LeadPayload) {
  if (payload.interest) return payload.interest
  if ((payload.pagePath ?? '').startsWith('/produtos')) return 'produtos'
  if ((payload.pagePath ?? '').startsWith('/maquinas')) return 'maquinas'
  return 'budget_request'
}

export async function submitLead(payload: LeadPayload): Promise<void> {
  const pagePath = payload.pagePath ?? (typeof window !== 'undefined' ? window.location.pathname : '')
  const referrer = payload.referrer ?? (typeof document !== 'undefined' ? document.referrer : '')
  const utm = getUtmParams()

  const requestBody: LeadSubmitPayload = {
    name: payload.name?.trim() ?? '',
    company: payload.company?.trim() ?? '',
    whatsapp: payload.whatsapp?.trim() ?? '',
    email: payload.email?.trim() ?? '',
    city: payload.city?.trim() ?? '',
    team_size_range: payload.teamSize?.trim() ?? '',
    message: payload.message?.trim() ?? '',
    interest: resolveInterest({ ...payload, pagePath }),
    pagePath,
    source_url: typeof window !== 'undefined' ? window.location.href : pagePath,
    referrer,
    user_agent: typeof navigator !== 'undefined' ? navigator.userAgent : '',
    submittedAt: payload.submittedAt ?? new Date().toISOString(),
    company_website: payload.company_website?.trim() || payload.website?.trim() || '',
    ...utm,
  }

  const result = await submitLeadRequest(requestBody)

  if (!result.ok) {
    throw new Error(result.message ?? 'Unable to submit lead right now. Please try again soon.')
  }
}
