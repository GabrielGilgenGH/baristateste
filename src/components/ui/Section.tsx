import type { ReactNode } from 'react'
import { Reveal } from './Reveal'

type SectionProps = {
  id?: string
  title?: string
  description?: string
  eyebrow?: string
  children: ReactNode
  center?: boolean
  className?: string
}

export function Section({
  id,
  title,
  description,
  eyebrow,
  center = false,
  children,
  className = '',
}: SectionProps) {
  return (
    <section id={id} className={`mx-auto flex w-full max-w-6xl flex-col gap-6 ${className}`.trim()}>
      {title && (
        <Reveal delay={80}>
          <header className={`space-y-3 ${center ? 'text-center' : ''}`}>
            {eyebrow && (
              <p className="text-xs uppercase tracking-[0.4em] text-brand-charcoal/75">
                {eyebrow}
              </p>
            )}
            <h2 className="text-[clamp(1.9rem,2.4vw+1.1rem,3rem)] font-semibold leading-[1.14] tracking-[-0.02em] text-brand-espresso">
              {title}
            </h2>
            {description && (
              <p className="max-w-3xl text-base leading-relaxed text-brand-charcoal/95">{description}</p>
            )}
          </header>
        </Reveal>
      )}
      {children}
    </section>
  )
}
