const heroBullets = ['Instalação e manutenção', 'Reposição de insumos', 'Locação e comodato']

export function Hero15Anos() {
  return (
    <section className="rounded-[36px] border border-brand-warmGray/40 bg-brand-surface/95 p-8 shadow-medium backdrop-blur-xl">
      <div className="space-y-6">
        <h1 className="font-sans text-4xl font-semibold leading-[1.08] tracking-tight text-brand-espresso sm:text-5xl">
          Há 15 anos elevando a experiência de café premium no escritório
        </h1>
        <p className="max-w-3xl text-lg text-brand-charcoal/95">
          Planejamos a operação, entregamos equipamentos, treinamos o time e garantimos suporte técnico contínuo
          para empresas que valorizam qualidade com previsibilidade.
        </p>
        <div className="flex flex-wrap gap-2 text-[0.65rem] font-semibold uppercase tracking-[0.35em] text-brand-charcoal/95 sm:gap-3">
          {heroBullets.map((bullet) => (
            <p
              key={bullet}
              className="flex min-w-[160px] items-center justify-center rounded-full border border-brand-warmGray/50 bg-brand-surfaceSoft/90 px-3 py-1.5 text-center text-[0.55rem] leading-tight transition-colors duration-200 hover:bg-brand-surfaceSoft"
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
