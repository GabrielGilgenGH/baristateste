import type { FormEvent } from 'react'
import { useState } from 'react'
import { submitLead, type LeadPayload } from '../../features/leads/submitLead'
import { isLeadsEndpointConfigured } from '../../lib/leads'
import { buildWhatsAppLink } from '../../lib/whatsapp'
import { Button } from '../ui/Button'
import { Card } from '../ui/Card'
import { Input } from '../ui/Input'
import { Section } from '../ui/Section'
import { Select } from '../ui/Select'
import { Textarea } from '../ui/Textarea'

const teamRanges = [
  '1-10 colaboradores',
  '11-30 colaboradores',
  '31-80 colaboradores',
  '81-200 colaboradores',
  'mais de 200 colaboradores',
]

const LEAD_RATE_LIMIT_MS = 30_000
const LEAD_RATE_LIMIT_KEY = 'drbarista:lead:last-submit-at'

type LeadCaptureSectionProps = {
  compact?: boolean
}

export function LeadCaptureSection({ compact = false }: LeadCaptureSectionProps) {
  const diagMarker = '[LEADS_DIAG_V1]'
  const isEndpointConfigured = isLeadsEndpointConfigured()
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [message, setMessage] = useState('')
  const [formData, setFormData] = useState<LeadPayload>({
    name: '',
    company: '',
    email: '',
    whatsapp: '',
    city: '',
    teamSize: teamRanges[0],
    message: '',
    company_website: '',
  })
  const whatsappLink = buildWhatsAppLink(
    'Olá! Quero uma proposta para máquinas de café para minha empresa. Pode me passar valores e condições? (Joinville/SC)',
  )

  const handleChange = (field: keyof LeadPayload, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setStatus('loading')
    setMessage('')

    if (!isEndpointConfigured) {
      setStatus('error')
      setMessage('Lead endpoint is unavailable. Please try again later.')
      return
    }

    const lastSubmitAtRaw = window.localStorage.getItem(LEAD_RATE_LIMIT_KEY)
    const lastSubmitAt = lastSubmitAtRaw ? Number(lastSubmitAtRaw) : 0
    const now = Date.now()

    if (lastSubmitAt && now - lastSubmitAt < LEAD_RATE_LIMIT_MS) {
      const secondsLeft = Math.ceil((LEAD_RATE_LIMIT_MS - (now - lastSubmitAt)) / 1000)
      setStatus('error')
      setMessage(`Please wait ${secondsLeft}s before submitting again.`)
      return
    }

    if (formData.company_website?.trim()) {
      setStatus('success')
      setMessage('Recebido! Vamos te chamar no WhatsApp/em breve.')
      setFormData({
        name: '',
        company: '',
        email: '',
        whatsapp: '',
        city: '',
        teamSize: teamRanges[0],
        message: '',
        company_website: '',
      })
      window.localStorage.setItem(LEAD_RATE_LIMIT_KEY, String(now))
      return
    }

    try {
      await submitLead(formData)
      setStatus('success')
      setMessage('Recebido! Vamos te chamar no WhatsApp/em breve.')
      setFormData({
        name: '',
        company: '',
        email: '',
        whatsapp: '',
        city: '',
        teamSize: teamRanges[0],
        message: '',
        company_website: '',
      })
      window.localStorage.setItem(LEAD_RATE_LIMIT_KEY, String(now))
    } catch (error) {
      setStatus('error')
      setMessage(error instanceof Error ? error.message : 'Unknown error (no message).')
    }
  }

  const safeErrorMessage = (() => {
    if (!message.trim()) return 'Unknown error (no message).'
    if (message.startsWith(diagMarker)) {
      return message.slice(diagMarker.length).trim() || 'Unknown error (no message).'
    }
    return message.trim()
  })()

  const formCard = (
    <Card
      id="lead-form"
      className={`space-y-4 border border-brand-warmGray/60 bg-brand-surfaceSoft/95 p-6 shadow-medium ${
        compact ? 'h-full rounded-[36px]' : ''
      }`}
    >
      {compact ? (
        <div className="space-y-2">
          <p className="text-xs uppercase tracking-[0.35em] text-brand-charcoal/75">Solicite um orçamento</p>
          <h2 className="text-2xl font-semibold text-brand-espresso">Fale com nosso time</h2>
          <p className="text-sm text-brand-charcoal/90">
            Compartilhe os dados da sua operação e retornamos com um plano sob medida.
          </p>
        </div>
      ) : null}
      <form className="space-y-4" onSubmit={handleSubmit}>
        <div className="grid gap-3 md:grid-cols-2">
          <label className="flex flex-col gap-2 text-sm font-semibold text-brand-charcoal">
            Nome completo
            <Input
              required
              value={formData.name}
              onChange={(event) => handleChange('name', event.target.value)}
              placeholder="Ana Silva"
            />
          </label>
          <label className="flex flex-col gap-2 text-sm font-semibold text-brand-charcoal">
            Empresa
            <Input
              required
              value={formData.company}
              onChange={(event) => handleChange('company', event.target.value)}
              placeholder="Escritório Central"
            />
          </label>
        </div>
        <div className="grid gap-3 md:grid-cols-2">
          <label className="flex flex-col gap-2 text-sm font-semibold text-brand-charcoal">
            Email
            <Input
              required
              type="email"
              value={formData.email}
              onChange={(event) => handleChange('email', event.target.value)}
              placeholder="nome@empresa.com"
            />
          </label>
          <label className="flex flex-col gap-2 text-sm font-semibold text-brand-charcoal">
            WhatsApp
            <Input
              required
              value={formData.whatsapp}
              onChange={(event) => handleChange('whatsapp', event.target.value)}
              placeholder="(11) 9xxxx-xxxx"
            />
          </label>
        </div>
        <div className="grid gap-3 md:grid-cols-2">
          <label className="flex flex-col gap-2 text-sm font-semibold text-brand-charcoal">
            Cidade
            <Input
              required
              value={formData.city}
              onChange={(event) => handleChange('city', event.target.value)}
              placeholder="São Paulo"
            />
          </label>
          <label className="flex flex-col gap-2 text-sm font-semibold text-brand-charcoal">
            Faixa de colaboradores
            <Select value={formData.teamSize} onChange={(event) => handleChange('teamSize', event.target.value)}>
              {teamRanges.map((range) => (
                <option key={range} value={range}>
                  {range}
                </option>
              ))}
            </Select>
          </label>
        </div>
        <label className="flex flex-col gap-2 text-sm font-semibold text-brand-charcoal">
          Mensagem
          <Textarea
            required
            rows={3}
            value={formData.message}
            onChange={(event) => handleChange('message', event.target.value)}
            placeholder="Conte como podemos personalizar a operação para seu time."
          />
        </label>
        <label className="hidden" aria-hidden="true">
          Company Website
          <input
            name="company_website"
            tabIndex={-1}
            autoComplete="off"
            value={formData.company_website ?? ''}
            onChange={(event) => handleChange('company_website', event.target.value)}
          />
        </label>
        <div className="flex flex-col gap-3">
          <Button type="submit" variant="primary" disabled={status === 'loading' || !isEndpointConfigured}>
            {status === 'loading' ? 'Enviando...' : 'Solicitar orçamento'}
          </Button>
          {status === 'success' && message ? (
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
              <p className="text-sm font-semibold text-emerald-600" aria-live="polite">
                {message}
              </p>
              <a
                href={whatsappLink}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center justify-center rounded-full border border-[#25D366]/55 bg-[#25D366]/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.16em] text-[#79f2a8] transition-all duration-200 ease-out hover:bg-[#25D366]/18 hover:text-[#9bf8be] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#79f2a8] focus-visible:ring-offset-2 focus-visible:ring-offset-brand-base"
              >
                Falar agora no WhatsApp
              </a>
            </div>
          ) : null}
          {status === 'error' ? (
            <p className="text-sm font-semibold text-pink-600" aria-live="polite">
              {`${diagMarker} ${safeErrorMessage}`}
            </p>
          ) : null}
        </div>
      </form>
    </Card>
  )

  if (compact) return formCard

  return (
    <Section
      id="contato"
      eyebrow="Solicite um orçamento"
      title="Fale com nosso time"
      description="Compartilhe os dados da sua operação e retornamos com um plano sob medida."
    >
      {formCard}
    </Section>
  )
}
