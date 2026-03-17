import { useEffect, useMemo, useState, type CSSProperties, type FormEvent } from 'react'
import { useLocation } from 'react-router-dom'
import { submitLead } from '../features/leads/submitLead'
import { Button } from './ui/Button'
import { Input } from './ui/Input'

const WHATSAPP_BASE_TEXT =
  'Olá, vi o site da Dr Barista e gostaria de entender melhor sobre a locação de máquinas.'

const WHATSAPP_NUMBER = '5547991072458'

type WhatsAppClickPayload = {
  event: 'whatsapp_click'
  page: string
  ts: string
  user_agent?: string
}

type WhatsAppLeadForm = {
  name: string
  company: string
  email: string
  whatsapp: string
}

function trackWhatsAppClick(payload: WhatsAppClickPayload) {
  if (import.meta.env.DEV) return

  window.dispatchEvent(
    new CustomEvent('drbarista:analytics', {
      detail: payload,
    }),
  )
}

function buildWhatsAppLink(lead: WhatsAppLeadForm) {
  const leadSummary = [
    `Nome: ${lead.name}`,
    `Empresa: ${lead.company}`,
    `Email: ${lead.email}`,
    `WhatsApp: ${lead.whatsapp}`,
  ].join('\n')

  const text = `${WHATSAPP_BASE_TEXT}\n\n${leadSummary}`
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`
}

export function WhatsAppFloatingButton() {
  const [visible, setVisible] = useState(false)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [status, setStatus] = useState<'idle' | 'loading'>('idle')
  const [formData, setFormData] = useState<WhatsAppLeadForm>({
    name: '',
    company: '',
    email: '',
    whatsapp: '',
  })

  const location = useLocation()
  const tooltipId = useMemo(() => 'whatsapp-floating-tooltip', [])

  useEffect(() => {
    const timerId = window.setTimeout(() => setVisible(true), 3000)
    return () => window.clearTimeout(timerId)
  }, [])

  useEffect(() => {
    if (!isModalOpen) return

    const onEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && status !== 'loading') {
        setIsModalOpen(false)
      }
    }

    document.addEventListener('keydown', onEscape)
    return () => document.removeEventListener('keydown', onEscape)
  }, [isModalOpen, status])

  const safeAreaStyle = {
    '--wa-bottom': 'calc(env(safe-area-inset-bottom, 0px) + 1.25rem)',
    '--wa-right': 'calc(env(safe-area-inset-right, 0px) + 1.25rem)',
  } as CSSProperties

  const handleOpenModal = () => {
    setStatus('idle')
    setIsModalOpen(true)
  }

  const handleCloseModal = () => {
    if (status === 'loading') return
    setIsModalOpen(false)
  }

  const handleChange = (field: keyof WhatsAppLeadForm, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const openWhatsAppConversation = (lead: WhatsAppLeadForm) => {
    const link = buildWhatsAppLink(lead)
    const payload: WhatsAppClickPayload = {
      event: 'whatsapp_click',
      page: location.pathname,
      ts: new Date().toISOString(),
      user_agent: navigator.userAgent,
    }
    void trackWhatsAppClick(payload)

    const newWindow = window.open(link, '_blank', 'noopener,noreferrer')
    if (!newWindow) {
      window.location.href = link
    }
  }

  const handleSubmitLead = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setStatus('loading')

    try {
      await submitLead({
        name: formData.name,
        company: formData.company,
        email: formData.email,
        whatsapp: formData.whatsapp,
        city: 'Não informado',
        teamSize: 'não informado',
        message: 'Lead capturado via popup do botão de WhatsApp.',
      })
    } catch {
      // Preserve current UX: even if lead capture fails, continue the WhatsApp handoff.
    }

    openWhatsAppConversation(formData)
    setStatus('idle')
    setIsModalOpen(false)
    setFormData({ name: '', company: '', email: '', whatsapp: '' })
  }

  if (!visible) return null

  return (
    <>
      <div
        className="fixed z-[60] bottom-[var(--wa-bottom)] right-[var(--wa-right)] sm:bottom-[var(--wa-bottom)] sm:right-[var(--wa-right)] md:bottom-10 md:right-8 md:translate-y-0 lg:bottom-12"
        style={safeAreaStyle}
      >
        <div className="group relative">
          <button
            type="button"
            onClick={handleOpenModal}
            aria-label="Fale conosco agora no WhatsApp"
            aria-describedby={tooltipId}
            className="inline-flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-sm font-semibold text-white shadow-[0_12px_30px_rgba(37,211,102,0.4)] transition duration-300 hover:scale-105 hover:bg-[#1ebe5d] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/90 focus-visible:ring-offset-2 focus-visible:ring-offset-brand-base md:h-auto md:w-auto md:gap-3 md:px-5 md:py-4 md:text-base"
          >
            <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-white/15 md:h-10 md:w-10">
              <svg
                viewBox="0 0 16 16"
                className="h-5 w-5 md:h-6 md:w-6"
                fill="currentColor"
                aria-hidden="true"
                focusable="false"
              >
                <path d="M13.601 2.326A7.85 7.85 0 0 0 8.02 0a7.95 7.95 0 0 0-6.9 11.89L0 16l4.23-1.1A7.95 7.95 0 0 0 8.02 16h.003a7.98 7.98 0 0 0 7.977-7.97 7.9 7.9 0 0 0-2.399-5.704Zm-5.58 12.33h-.003a6.6 6.6 0 0 1-3.36-.92l-.24-.142-2.51.654.669-2.448-.157-.252a6.6 6.6 0 0 1-1.03-3.52A6.64 6.64 0 0 1 8.024 1.37a6.57 6.57 0 0 1 4.69 1.947 6.58 6.58 0 0 1 1.936 4.708 6.64 6.64 0 0 1-6.629 6.631ZM11.66 9.85c-.2-.1-1.19-.585-1.374-.651-.184-.067-.317-.1-.451.1-.134.2-.518.651-.635.786-.117.134-.234.15-.434.05-.2-.1-.844-.311-1.607-.993-.593-.53-.993-1.185-1.11-1.385-.117-.2-.012-.308.088-.408.09-.09.2-.234.301-.351.1-.117.134-.2.2-.334.067-.134.034-.251-.017-.351-.05-.1-.451-1.086-.618-1.487-.162-.389-.327-.336-.451-.342a7.83 7.83 0 0 0-.384-.007c-.134 0-.351.05-.535.251-.184.2-.702.685-.702 1.67s.719 1.938.819 2.071c.1.134 1.414 2.16 3.425 3.028.478.207.851.33 1.142.422.48.153.917.131 1.262.08.385-.057 1.19-.485 1.357-.953.167-.468.167-.87.117-.953-.05-.084-.184-.134-.384-.234Z" />
              </svg>
            </span>
            <span className="hidden md:inline">Fale conosco agora</span>
          </button>

          <div
            id={tooltipId}
            role="tooltip"
            className="pointer-events-none absolute -top-11 right-0 hidden rounded-lg bg-brand-ink/95 px-3 py-2 text-xs font-medium text-brand-cream opacity-0 transition-opacity duration-200 group-hover:opacity-100 md:block"
          >
            Fale conosco agora
          </div>
        </div>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 z-[80] flex items-center justify-center bg-black/60 p-4">
          <div className="w-full max-w-lg rounded-2xl border border-brand-warmGray/40 bg-brand-surface p-6 shadow-medium">
            <div className="mb-4 flex items-start justify-between gap-4">
              <div>
                <p className="text-xs uppercase tracking-[0.35em] text-brand-charcoal/75">WhatsApp</p>
                <h2 className="text-2xl font-semibold text-brand-espresso">Fale com nosso time</h2>
                <p className="mt-1 text-sm text-brand-charcoal/90">
                  Antes de abrir o contato, informe seus dados para registrarmos seu atendimento.
                </p>
              </div>
              <button
                type="button"
                onClick={handleCloseModal}
                className="rounded-full p-2 text-brand-charcoal/80 transition hover:bg-brand-surfaceSoft/70 hover:text-brand-espresso"
                aria-label="Fechar"
              >
                <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M6 6 18 18M18 6 6 18" />
                </svg>
              </button>
            </div>

            <form className="space-y-3" onSubmit={handleSubmitLead}>
              <label className="flex flex-col gap-2 text-sm font-semibold text-brand-charcoal">
                Nome completo
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

              <div className="grid gap-3 sm:grid-cols-2">
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
                    placeholder="(47) 9XXXX-XXXX"
                  />
                </label>
              </div>

              <div className="flex flex-col-reverse gap-2 pt-2 sm:flex-row sm:justify-end">
                <Button type="button" variant="secondary" onClick={handleCloseModal} disabled={status === 'loading'}>
                  Cancelar
                </Button>
                <Button type="submit" variant="primary" disabled={status === 'loading'}>
                  {status === 'loading' ? 'Enviando...' : 'Continuar no WhatsApp'}
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  )
}

export const WHATSAPP_LINK = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(WHATSAPP_BASE_TEXT)}`
