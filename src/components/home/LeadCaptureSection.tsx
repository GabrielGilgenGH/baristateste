import type { FormEvent } from 'react'
import { useState } from 'react'
import { submitLead, type LeadPayload } from '../../features/leads/submitLead'
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

type LeadCaptureSectionProps = {
  compact?: boolean
}

export function LeadCaptureSection({ compact = false }: LeadCaptureSectionProps) {
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
  })

  const handleChange = (field: keyof LeadPayload, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setStatus('loading')
    setMessage('')

    try {
      await submitLead(formData)
      setStatus('success')
      setMessage('Recebemos sua solicitação. Retornamos em até 24h úteis.')
      setFormData({
        name: '',
        company: '',
        email: '',
        whatsapp: '',
        city: '',
        teamSize: teamRanges[0],
        message: '',
      })
    } catch (error) {
      setStatus('error')
      setMessage(
        error instanceof Error
          ? error.message
          : 'Ocorreu um problema ao enviar o formulário. Tente novamente mais tarde.',
      )
    }
  }

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
        <div className="flex flex-col gap-3">
          <Button type="submit" variant="primary" disabled={status === 'loading'}>
            {status === 'loading' ? 'Enviando...' : 'Solicitar orçamento'}
          </Button>
          {message && (
            <p className={`text-sm font-semibold ${status === 'success' ? 'text-emerald-600' : 'text-pink-600'}`} aria-live="polite">
              {message}
            </p>
          )}
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
