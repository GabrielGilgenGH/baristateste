type HeroMaquinasProps = {
  proposalLink: string
}

const processSteps = [
  {
    number: '01',
    label: 'Conversa rápida',
    body: 'Entendemos sua operação, volume e necessidades',
  },
  {
    number: '02',
    label: 'Recomendação ideal',
    body: 'Indicamos a máquina certa para o seu perfil',
  },
  {
    number: '03',
    label: 'Instalação e suporte',
    body: 'Cuidamos de tudo, do início ao fim',
  },
]

const engineeringGridStyle = {
  backgroundImage:
    "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='36' height='36' viewBox='0 0 36 36'%3E%3Cpath d='M36 0H0V36' fill='none' stroke='%23fff4e6' stroke-width='1' stroke-opacity='0.34'/%3E%3C/svg%3E\")",
  backgroundSize: '36px 36px',
}

export function HeroMaquinas({ proposalLink }: HeroMaquinasProps) {
  const scrollToMachines = () => {
    if (typeof document === 'undefined') return
    const machinesGrid = document.querySelector('ul[role="grid"]')
    if (!machinesGrid) return
    machinesGrid.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  return (
    <section className="relative overflow-hidden rounded-2xl border border-brand-warmGray/30 bg-brand-surface/90 pt-10 pb-10 shadow-[0_22px_48px_rgba(11,5,4,0.24)] sm:pt-12 sm:pb-12 lg:pt-14 lg:pb-12">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-20 top-4 h-56 w-56 rounded-full bg-brand-copper/8 blur-[100px]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-24 bottom-0 h-64 w-64 rounded-full bg-brand-surfaceSoft/35 blur-[120px]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-[0.025]"
        style={engineeringGridStyle}
      />

      <div className="relative mx-auto max-w-7xl px-6 sm:px-8">
        <div className="grid grid-cols-1 items-start gap-8 lg:grid-cols-12 lg:gap-12">
          <div className="mx-auto flex w-full max-w-[42rem] flex-col items-center text-center lg:col-span-7 lg:self-center">
            <h1 className="text-4xl font-extrabold leading-[1.02] tracking-tight text-brand-espresso sm:text-5xl lg:text-6xl xl:text-6xl">
              Descobrimos juntos a máquina certa para a sua operação
            </h1>

            <p className="mx-auto mt-4 w-full max-w-[46rem] text-sm font-normal leading-relaxed text-brand-charcoal/90 sm:text-base">
              <span className="block lg:whitespace-nowrap">Cada empresa tem volumes, espaços e expectativas diferentes.</span>
              <span className="block lg:whitespace-nowrap">
                Por isso analisamos sua operação e indicamos a máquina ideal para o seu negócio.
              </span>
            </p>

            <div className="mt-6 flex w-full flex-col items-stretch gap-3 sm:flex-row sm:items-center sm:justify-center">
              <a
                href={proposalLink}
                target="_blank"
                rel="noreferrer"
                className="inline-flex min-h-12 w-full items-center justify-center rounded-full bg-brand-copper px-8 py-3 text-sm font-bold uppercase tracking-[0.14em] text-brand-ink shadow-lg shadow-black/35 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-xl hover:shadow-brand-copper/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-copper focus-visible:ring-offset-2 focus-visible:ring-offset-brand-base sm:min-h-14 sm:w-auto sm:px-9 sm:text-[15px]"
              >
                Agendar conversa gratuita
              </a>
              <button
                type="button"
                onClick={scrollToMachines}
                className="inline-flex min-h-11 w-full items-center justify-center rounded-full border border-brand-warmGray/50 bg-brand-surfaceSoft/30 px-6 py-2.5 text-[13px] font-semibold uppercase tracking-[0.12em] text-brand-charcoal transition-all duration-200 hover:-translate-y-0.5 hover:border-brand-copper/50 hover:bg-brand-copper/10 hover:text-brand-espresso focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-copper/85 focus-visible:ring-offset-2 focus-visible:ring-offset-brand-base sm:min-h-12 sm:w-auto sm:text-sm"
              >
                Conhecer as máquinas
              </button>
            </div>
          </div>

          <aside className="mx-auto w-full max-w-[30rem] rounded-3xl border border-brand-warmGray/30 bg-brand-surface/90 p-4 shadow-[0_16px_32px_rgba(11,5,4,0.22)] sm:p-5 lg:col-span-5 lg:justify-self-center lg:self-center lg:p-6">
            <h2 className="text-center text-[1.25rem] font-semibold text-brand-espresso lg:text-[1.4rem]">
              Como funciona em 3 passos
            </h2>

            <div className="mt-6 flex flex-col gap-y-5 lg:mt-7 lg:gap-y-8">
              {processSteps.map((step, index) => (
                <article
                  key={step.number}
                  className={`flex items-start gap-4 lg:gap-5 ${
                    index < processSteps.length - 1 ? 'border-b border-brand-warmGray/35 pb-5 lg:pb-6' : ''
                  }`}
                >
                  <span className="inline-flex h-[2.2rem] w-[2.2rem] flex-none items-center justify-center rounded-full border border-brand-copper/45 bg-brand-copper/12 text-[15px] font-semibold leading-none text-brand-copper">
                    {Number(step.number)}
                  </span>
                  <div className="flex flex-col gap-1.5 lg:gap-2">
                    <p className="text-[15px] font-semibold uppercase tracking-[0.16em] text-brand-copper">
                      {step.label}
                    </p>
                    <p className="max-w-[31ch] text-[16px] leading-relaxed text-brand-charcoal/90">{step.body}</p>
                  </div>
                </article>
              ))}
            </div>
          </aside>
        </div>
      </div>
    </section>
  )
}
