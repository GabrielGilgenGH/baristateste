const heroBullets = ['Instalação e manutenção', 'Reposição de insumos', 'Locação e comodato']

export function Hero15Anos() {
  return (
    <section className="h-full rounded-[36px] border border-brand-warmGray/40 bg-brand-surface/95 p-8 shadow-medium backdrop-blur-xl">
      <div className="flex h-full flex-col justify-between gap-6">
        <h1 className="text-[clamp(2rem,3.1vw+1rem,3.55rem)] font-semibold leading-[1.08] tracking-[-0.022em] text-brand-espresso">
          Há 16 anos elevando a experiência de café premium na empresa.
        </h1>
        <p className="max-w-4xl text-[clamp(1.02rem,1.05vw+0.82rem,1.48rem)] leading-relaxed text-brand-charcoal/95">
          Planejamos a operação, entregamos equipamentos, treinamos o time e garantimos suporte técnico contínuo
          para empresas que valorizam qualidade com previsibilidade.
        </p>
        <div className="flex flex-wrap gap-3 text-xs font-semibold uppercase tracking-[0.3em] text-brand-charcoal/95 sm:gap-4 sm:text-sm">
          {heroBullets.map((bullet) => (
            <p
              key={bullet}
              className="flex min-w-[190px] items-center justify-center rounded-full border border-brand-warmGray/55 bg-brand-surfaceSoft/95 px-5 py-2.5 text-center text-[0.62rem] leading-tight transition-colors duration-200 hover:bg-brand-surfaceSoft sm:text-[0.72rem]"
            >
              {bullet}
            </p>
          ))}
        </div>
        {/* TODO: insert official "16 anos" visual when available in assets/public. */}
      </div>
    </section>
  )
}
