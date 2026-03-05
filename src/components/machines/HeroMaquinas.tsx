type HeroMaquinasProps = {
  proposalLink: string
}

const benefits = [
  'Diagnóstico gratuito da sua operação',
  'Recomendação personalizada por volume e perfil',
  'Contrato flexível com suporte contínuo',
]

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
    <section className="relative overflow-hidden rounded-2xl bg-brand-base pt-20 pb-24 lg:pt-28 lg:pb-32">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-[0.03]"
        style={engineeringGridStyle}
      />

      <div className="relative mx-auto max-w-7xl px-6 lg:px-12">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-[60fr_40fr] lg:gap-16">
          <div className="max-w-[560px]">
            <h1 className="text-4xl font-extrabold leading-[1.05] tracking-tight text-stone-100 md:text-[64px] lg:text-[72px]">
              A máquina certa para a sua operação. A gente descobre juntos.
            </h1>

            <p className="mt-6 text-[17px] font-normal leading-relaxed text-zinc-300 lg:text-[18px]">
              Cada empresa tem um volume, um espaço e uma expectativa diferentes. Por isso não vendemos catálogo —
              agendamos uma conversa rápida e recomendamos o modelo ideal para o seu time.
            </p>

            <ul className="mt-6 mb-8 space-y-3">
              {benefits.map((benefit) => (
                <li key={benefit} className="flex items-start gap-3 text-[15px] font-normal text-stone-200">
                  <span aria-hidden="true" className="mt-0.5 text-base leading-none text-amber-400">
                    ✓
                  </span>
                  <span>{benefit}</span>
                </li>
              ))}
            </ul>

            <div className="flex flex-wrap items-center gap-3">
              <a
                href={proposalLink}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center justify-center rounded-full bg-amber-400 px-7 py-3.5 text-[13px] font-bold uppercase tracking-widest text-stone-900 transition-all duration-200 hover:scale-[1.03] hover:bg-amber-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-300 focus-visible:ring-offset-2 focus-visible:ring-offset-brand-base shadow-lg shadow-amber-400/20"
              >
                Agendar conversa gratuita
              </a>
              <button
                type="button"
                onClick={scrollToMachines}
                className="inline-flex items-center justify-center rounded-full border border-white/20 bg-transparent px-7 py-3.5 text-[13px] font-semibold uppercase tracking-widest text-white transition-all duration-200 hover:border-white/40 hover:bg-white/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/80 focus-visible:ring-offset-2 focus-visible:ring-offset-brand-base"
              >
                Conhecer as máquinas
              </button>
            </div>

            <div className="mt-8 border-t border-white/10 pt-4">
              <p className="text-[13px] font-normal text-stone-400">
                <span>800+ empresas</span>
                <span aria-hidden="true" className="px-2 text-white/20">
                  ·
                </span>
                <span>12 anos de mercado</span>
                <span aria-hidden="true" className="px-2 text-white/20">
                  ·
                </span>
                <span>NPS 94</span>
              </p>
            </div>
          </div>

          <aside className="rounded-2xl border border-white/10 bg-white/5 p-6 shadow-xl shadow-black/30 backdrop-blur-sm lg:p-8">
            <h2 className="text-xl font-semibold text-stone-100">Como funciona em 3 passos</h2>

            <div className="mt-6 space-y-4">
              {processSteps.map((step, index) => (
                <article
                  key={step.number}
                  className={`relative ${index < processSteps.length - 1 ? 'border-b border-white/5 pb-4' : ''}`}
                >
                  <span
                    aria-hidden="true"
                    className="pointer-events-none absolute right-0 top-0 text-5xl font-black leading-none text-amber-400/30"
                  >
                    {step.number}
                  </span>
                  <p className="pr-16 text-[13px] font-semibold uppercase tracking-widest text-amber-400">
                    {step.label}
                  </p>
                  <p className="mt-2 max-w-[30ch] text-[14px] leading-snug text-stone-300">{step.body}</p>
                </article>
              ))}
            </div>
          </aside>
        </div>
      </div>
    </section>
  )
}
