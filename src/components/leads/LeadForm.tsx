import { useEffect, useMemo, useRef, useState, type FormEvent } from 'react'
import { track } from '../../lib/track'
import { cn } from '../../lib/cn'
import { type LeadInterest, type LeadPayload, getUtmParams, submitLead } from '../../lib/leadCapture'
import { buildB2BProposalMessage, buildWhatsAppLink } from '../../lib/whatsapp'
import { Button } from '../ui/Button'
import { Card } from '../ui/Card'
import { Input } from '../ui/Input'

type LeadFormProps = {
  interest: LeadInterest
  className?: string
}

type LeadFormData = {
  name: string
  company: string
  whatsapp: string
  email: string
  website: string
}

const initialFormData: LeadFormData = {
  name: '',
  company: '',
  whatsapp: '',
  email: '',
  website: '',
}

function getInterestContext(interest: LeadInterest) {
  return interest === 'maquinas' ? 'máquinas de café' : 'mix de produtos'
}

export function LeadForm({ interest, className }: LeadFormProps) {
  const [formData, setFormData] = useState<LeadFormData>(initialFormData)
  const [utm, setUtm] = useState(getUtmParams)
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [message, setMessage] = useState('')
  const startedAtRef = useRef(new Date().toISOString())
  const pagePath = typeof window !== 'undefined' ? window.location.pathname : ''
  const referrer = typeof document !== 'undefined' ? document.referrer : ''

  useEffect(() => {
    setUtm(getUtmParams())
  }, [])

  const whatsappLink = useMemo(() => {
    return buildWhatsAppLink(buildB2BProposalMessage(getInterestContext(interest)))
  }, [interest])

  const handleChange = (field: keyof LeadFormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setStatus('loading')
    setMessage('')

    const payload: LeadPayload = {
      name: formData.name.trim(),
      company: formData.company.trim(),
      whatsapp: formData.whatsapp.trim(),
      email: formData.email.trim() || undefined,
      website: formData.website.trim(),
      interest,
      pagePath,
      referrer,
      startedAt: startedAtRef.current,
      submittedAt: new Date().toISOString(),
      ...utm,
    }

    if (payload.website) {
      setStatus('success')
      setMessage('Recebido! Vamos te chamar no WhatsApp/em breve.')
      setFormData(initialFormData)
      return
    }

    try {
      await submitLead(payload)
      track('lead_submit', {
        interest,
        pagePath,
      })

      setStatus('success')
      setMessage('Recebido! Vamos te chamar no WhatsApp/em breve.')
      setFormData(initialFormData)
      startedAtRef.current = new Date().toISOString()
    } catch (error) {
      setStatus('error')
      setMessage(
        error instanceof Error
          ? error.message
          : 'Não foi possível enviar agora. Tente novamente em instantes.',
      )
    }
  }

  return (
    <Card className={cn('space-y-5 border-brand-warmGray/35 bg-brand-surface/92 p-6 md:p-8', className)}>
      <div className="space-y-2">
        <p className="text-xs uppercase tracking-[0.35em] text-brand-charcoal/75">Receba uma proposta</p>
        <h3 className="text-2xl font-semibold text-brand-espresso">Fale com nosso time comercial</h3>
        <p className="max-w-3xl text-sm leading-relaxed text-brand-charcoal/90">
          Envie seus dados e retornamos com condições para sua operação.
        </p>
      </div>

      <form className="space-y-4" onSubmit={handleSubmit}>
        <div className="grid gap-3 md:grid-cols-2">
          <label className="flex flex-col gap-2 text-sm font-semibold text-brand-charcoal">
            Nome
            <Input
              required
              value={formData.name}
              onChange={(event) => handleChange('name', event.target.value)}
              placeholder="Seu nome"
            />
          </label>

          <label className="flex flex-col gap-2 text-sm font-semibold text-brand-charcoal">
            Empresa
            <Input
              required
              value={formData.company}
              onChange={(event) => handleChange('company', event.target.value)}
              placeholder="Nome da empresa"
            />
          </label>
        </div>

        <div className="grid gap-3 md:grid-cols-2">
          <label className="flex flex-col gap-2 text-sm font-semibold text-brand-charcoal">
            WhatsApp
            <Input
              required
              value={formData.whatsapp}
              onChange={(event) => handleChange('whatsapp', event.target.value)}
              placeholder="(47) 9XXXX-XXXX"
            />
          </label>

          <label className="flex flex-col gap-2 text-sm font-semibold text-brand-charcoal">
            Email (opcional)
            <Input
              type="email"
              value={formData.email}
              onChange={(event) => handleChange('email', event.target.value)}
              placeholder="nome@empresa.com"
            />
          </label>
        </div>

        <label className="hidden" aria-hidden="true">
          Website
          <input
            tabIndex={-1}
            autoComplete="off"
            value={formData.website}
            onChange={(event) => handleChange('website', event.target.value)}
          />
        </label>

        <div className="space-y-3">
          <Button type="submit" variant="primary" disabled={status === 'loading'} className="w-full sm:w-full">
            {status === 'loading' ? 'Enviando...' : 'Receber proposta'}
          </Button>

          {status === 'success' ? (
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
              <p className="text-sm font-semibold text-emerald-600" aria-live="polite">
                {message}
              </p>
              <a
                href={whatsappLink}
                target="_blank"
                rel="noreferrer"
                onClick={() =>
                  track('whatsapp_click', {
                    page: interest,
                    itemType: interest === 'maquinas' ? 'machine' : 'product',
                    itemId: 'lead_form_success',
                  })
                }
                className="inline-flex items-center justify-center rounded-full border border-[#25D366]/55 bg-[#25D366]/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.16em] text-[#79f2a8] transition-all duration-200 ease-out hover:bg-[#25D366]/18 hover:text-[#9bf8be] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#79f2a8] focus-visible:ring-offset-2 focus-visible:ring-offset-brand-base"
              >
                Falar agora no WhatsApp
              </a>
            </div>
          ) : null}

          {status === 'error' ? (
            <p className="text-sm font-semibold text-pink-600" aria-live="polite">
              {message}
            </p>
          ) : null}
        </div>
      </form>
    </Card>
  )
}
