import { Section } from '../components/ui/Section'

const technicalSupportWhatsApp = 'https://wa.me/5547992382832'
const suppliesWhatsApp = 'https://wa.me/5547992382832'
const commercialWhatsApp = 'https://wa.me/5547991072458'
const mapQuery = encodeURIComponent('Rua Pardal, 45 - Costa e Silva - Joinville - SC')

export function Contato() {
  return (
    <Section
      eyebrow="Fale conosco"
      title="Contato"
      description="Estamos disponíveis para atendimento presencial e digital em Joinville."
      center
      className="space-y-10 [&_header]:mx-auto [&_header]:max-w-3xl [&_header]:space-y-4 [&_header_p]:mx-auto"
    >
      <div className="grid items-stretch gap-6 lg:grid-cols-2">
        <div
          data-reveal="left"
          data-reveal-delay="90"
          className="mx-auto flex h-full w-full max-w-2xl flex-col items-center justify-center space-y-6 rounded-3xl border border-brand-warmGray/40 bg-brand-surface/90 px-6 py-10 text-center shadow-soft md:py-12"
        >
          <p className="text-[0.9rem] uppercase tracking-[0.4em] text-brand-charcoal/75">E-mails</p>
          <div className="space-y-4">
            <a
              href="mailto:roseli@baristacafe.com.br"
              className="block text-[1.35rem] font-semibold text-brand-espresso underline-offset-4 hover:underline"
            >
              roseli@baristacafe.com.br
            </a>
            <a
              href="mailto:administracao@baristacafe.com.br"
              className="block text-[1.35rem] font-semibold text-brand-espresso underline-offset-4 hover:underline"
            >
              administracao@baristacafe.com.br
            </a>
          </div>

          <div className="w-full space-y-4">
            <p className="text-[0.9rem] uppercase tracking-[0.4em] text-brand-charcoal/75">Telefones</p>
            <div className="mx-auto grid w-full grid-cols-1 gap-4 sm:grid-cols-2">
              <a
                href={technicalSupportWhatsApp}
                target="_blank"
                rel="noreferrer"
                className="cta-secondary-link w-full px-5 py-3 text-center text-[1.05rem] font-semibold"
              >
                SUPORTE TÉCNICO
              </a>
              <a
                href={suppliesWhatsApp}
                target="_blank"
                rel="noreferrer"
                className="cta-secondary-link w-full px-5 py-3 text-center text-[1.05rem] font-semibold"
              >
                REPOSIÇÃO DE INSUMOS
              </a>
            </div>
          </div>

          <div className="w-full pt-1">
            <a
              href={commercialWhatsApp}
              target="_blank"
              rel="noreferrer"
              className="cta-primary-link mx-auto inline-flex w-full max-w-none px-6 py-4 text-center text-[1.05rem] font-semibold"
            >
              SOLICITAR PROPOSTA COMERCIAL
            </a>
          </div>
        </div>
        <div
          data-reveal="right"
          data-reveal-delay="160"
          className="mx-auto flex h-full w-full max-w-2xl flex-col items-center justify-start space-y-6 rounded-3xl border border-brand-warmGray/40 bg-brand-surface/90 px-6 py-10 text-center shadow-soft md:py-12"
        >
          <p className="text-[0.9rem] uppercase tracking-[0.4em] text-brand-charcoal/75">Endereço</p>
          <p className="text-[1.2rem] font-medium text-brand-charcoal/95">
            Rua Pardal, 45 - Costa e Silva - 89220-080 - Joinville - SC
          </p>
          <div className="mx-auto w-full space-y-3">
            <iframe
              title="Mapa Dr Barista Joinville"
              src={`https://www.google.com/maps?q=${mapQuery}&output=embed`}
              className="h-48 w-full rounded-2xl border border-brand-warmGray/40 bg-brand-surface/70 shadow-inner"
              loading="lazy"
            />
            <div className="flex w-full flex-col items-center gap-3 text-[1.05rem] text-brand-charcoal/95">
              <a
                href={`https://www.google.com/maps/search/?api=1&query=${mapQuery}`}
                target="_blank"
                rel="noreferrer"
                className="cta-primary-link w-full px-5 py-3 text-center text-[1.05rem] font-semibold"
              >
                Ver no Google Maps
              </a>
              <a
                href={`https://www.google.com/maps/dir/?api=1&destination=${mapQuery}`}
                target="_blank"
                rel="noreferrer"
                className="cta-secondary-link w-full px-5 py-3 text-center text-[1.05rem] font-semibold"
              >
                Traçar rota
              </a>
            </div>
          </div>
        </div>
      </div>
    </Section>
  )
}
