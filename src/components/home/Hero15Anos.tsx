import logoExato from '../../assets/brand/logo.png'

export function Hero15Anos() {
  return (
    <section className="h-full rounded-[36px] border border-brand-warmGray/40 bg-brand-surface/95 p-8 shadow-medium backdrop-blur-xl">
      <div className="flex h-full flex-col gap-8">
        <h1 className="mx-auto max-w-[20ch] text-center text-[clamp(2rem,3.1vw+1rem,3.55rem)] font-semibold leading-[1.08] tracking-[-0.022em] text-brand-espresso">
          Há 16 anos elevando a experiência de café premium na empresa.
        </h1>

        <div className="grid flex-1 gap-8 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-end">
          <div className="flex h-full flex-col justify-center text-left">
            <p className="max-w-[24ch] text-[clamp(1.02rem,1.05vw+0.82rem,1.48rem)] leading-relaxed text-brand-charcoal/95">
              Planejamos a operação, entregamos equipamentos, treinamos o time e garantimos suporte técnico contínuo
              para empresas que valorizam qualidade com previsibilidade.
            </p>
          </div>

          <div className="flex items-end justify-end">
            <img
              src={logoExato}
              alt="Logo Dr. Barista Vending"
              className="h-auto w-full max-w-[140px] object-contain lg:max-w-[180px]"
              loading="lazy"
              decoding="async"
            />
          </div>
        </div>
      </div>
    </section>
  )
}
