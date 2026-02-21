const heroBullets = ['Instalação e manutenção', 'Reposição de insumos', 'Locação e comodato']

export function Hero15Anos() {
  return (
    <section className="h-full rounded-[36px] border border-brand-warmGray/40 bg-brand-surface/95 p-8 shadow-medium backdrop-blur-xl">
      <div className="flex h-full flex-col justify-between gap-6">
        <h1 className="font-sans text-4xl font-semibold leading-[1.08] tracking-tight text-brand-espresso sm:text-5xl">
          Há 15 anos elevando a experiência de café premium no escritório
        </h1>
        <p className="max-w-4xl text-xl leading-relaxed text-brand-charcoal/95 md:text-2xl">
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
        {/* TODO: inserir imagem/arte oficial de "15 anos" quando disponível em assets/public. */}
      </div>
    </section>
  )
}
