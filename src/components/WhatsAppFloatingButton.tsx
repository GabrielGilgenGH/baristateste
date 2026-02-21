import { useEffect, useMemo, useState, type CSSProperties } from 'react'
import { useLocation } from 'react-router-dom'
import { supabaseClient } from '../lib/supabaseClient'

const WHATSAPP_TEXT =
  'Olá, vi o site da Barista Office e gostaria de entender melhor sobre a locação de máquinas.'

const WHATSAPP_LINK = `https://wa.me/5547991072458?text=${encodeURIComponent(WHATSAPP_TEXT)}`

type WhatsAppClickPayload = {
  event: 'whatsapp_click'
  page: string
  ts: string
  user_agent?: string
}

async function trackWhatsAppClick(payload: WhatsAppClickPayload) {
  if (!supabaseClient) {
    console.log(payload)
    return
  }

  const eventRow = {
    event: payload.event,
    page: payload.page,
    user_agent: payload.user_agent ?? null,
    created_at: payload.ts,
    meta: { source: 'floating_button' },
  }

  const attempts = ['whatsapp_events', 'analytics_events'] as const

  for (const tableName of attempts) {
    const { error } = await supabaseClient.from(tableName).insert(eventRow)
    if (!error) return
  }

  console.log(payload)
}

export function WhatsAppFloatingButton() {
  const [visible, setVisible] = useState(false)
  const location = useLocation()
  const tooltipId = useMemo(() => 'whatsapp-floating-tooltip', [])

  useEffect(() => {
    const timerId = window.setTimeout(() => setVisible(true), 3000)
    return () => window.clearTimeout(timerId)
  }, [])

  const handleClick = () => {
    const payload: WhatsAppClickPayload = {
      event: 'whatsapp_click',
      page: location.pathname,
      ts: new Date().toISOString(),
      user_agent: navigator.userAgent,
    }
    void trackWhatsAppClick(payload)
  }

  if (!visible) return null

  const safeAreaStyle = {
    '--wa-bottom': 'calc(env(safe-area-inset-bottom, 0px) + 1.25rem)',
    '--wa-right': 'calc(env(safe-area-inset-right, 0px) + 1.25rem)',
  } as CSSProperties

  return (
    <div
      className="fixed z-[60] bottom-[var(--wa-bottom)] right-[var(--wa-right)] sm:bottom-[var(--wa-bottom)] sm:right-[var(--wa-right)] md:bottom-10 md:right-8 md:translate-y-0 lg:bottom-12"
      style={safeAreaStyle}
    >
      <div className="group relative">
        <a
          href={WHATSAPP_LINK}
          target="_blank"
          rel="noreferrer"
          onClick={handleClick}
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
        </a>

        <div
          id={tooltipId}
          role="tooltip"
          className="pointer-events-none absolute -top-11 right-0 hidden rounded-lg bg-brand-ink/95 px-3 py-2 text-xs font-medium text-brand-cream opacity-0 transition-opacity duration-200 group-hover:opacity-100 md:block"
        >
          Fale conosco agora
        </div>
      </div>
    </div>
  )
}

export { WHATSAPP_LINK }
