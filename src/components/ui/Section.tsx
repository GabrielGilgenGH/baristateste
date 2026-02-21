import type { ReactNode } from 'react'

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
    <section
      id={id}
      className={`mx-auto flex w-full max-w-6xl flex-col gap-6 ${className}`.trim()}
    >
      {title && (
        <header className={`space-y-3 ${center ? 'text-center' : ''}`}>
          {eyebrow && (
            <p className="text-xs uppercase tracking-[0.4em] text-brand-charcoal/75">
              {eyebrow}
            </p>
          )}
          <h2 className="font-sans text-3xl font-semibold text-brand-espresso sm:text-4xl">
            {title}
          </h2>
          {description && (
            <p className="text-base text-brand-charcoal/95">{description}</p>
          )}
        </header>
      )}
      {children}
    </section>
  )
}
