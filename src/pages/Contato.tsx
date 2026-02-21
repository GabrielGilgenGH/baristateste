import { Section } from '../components/ui/Section'

const contactNumbers = ['47 3465-1415', '47 3454-4889']
const whatsApp = '47 99107-2458'
const mapQuery = encodeURIComponent('Rua Pardal, 45 - Costa e Silva - Joinville - SC')

export function Contato() {
  return (
    <Section
      eyebrow="Fale conosco"
      title="Contato"
      description="Estamos disponíveis para atendimento presencial e digital em Joinville."
      className="space-y-10"
    >
      <div className="grid gap-6 lg:grid-cols-2">
        <div className="space-y-4 rounded-3xl border border-brand-warmGray/40 bg-brand-surface/90 p-6 shadow-soft">
          <p className="text-xs uppercase tracking-[0.4em] text-brand-charcoal/75">E-mail</p>
          <a
            href="mailto:atendimento@baristacafe.com.br"
            className="text-lg font-semibold text-brand-espresso underline-offset-4 hover:underline"
          >
            atendimento@baristacafe.com.br
          </a>
          <div className="space-y-3">
            <p className="text-xs uppercase tracking-[0.4em] text-brand-charcoal/75">Telefone</p>
            {contactNumbers.map((phone) => (
              <a
                key={phone}
                href={`tel:+55${phone.replace(/\D/g, '')}`}
                className="block text-base font-medium text-brand-charcoal/95 hover:text-brand-espresso"
              >
                {phone}
              </a>
            ))}
          </div>
          <div className="space-y-3">
            <p className="text-xs uppercase tracking-[0.4em] text-brand-charcoal/75">WhatsApp</p>
            <a
              href="https://wa.me/5547991072458"
              target="_blank"
              rel="noreferrer"
              className="text-base font-medium text-brand-charcoal/95 hover:text-brand-espresso"
            >
              {whatsApp}
            </a>
          </div>
        </div>
        <div className="space-y-4 rounded-3xl border border-brand-warmGray/40 bg-brand-surface/90 p-6 shadow-soft">
          <p className="text-xs uppercase tracking-[0.4em] text-brand-charcoal/75">Endereço</p>
          <p className="text-base font-medium text-brand-charcoal/95">
            Rua Pardal, 45 - Costa e Silva - 89220-080 - Joinville - SC
          </p>
          <div className="space-y-3">
            <iframe
              title="Mapa Barista Office Joinville"
              src={`https://www.google.com/maps?q=${mapQuery}&output=embed`}
              className="h-48 w-full rounded-2xl border border-brand-warmGray/40 bg-brand-surface/70 shadow-inner"
              loading="lazy"
            />
            <div className="flex flex-col gap-3 text-sm text-brand-charcoal/95">
              <a
                href={`https://www.google.com/maps/search/?api=1&query=${mapQuery}`}
                target="_blank"
                rel="noreferrer"
                className="rounded-full border border-brand-charcoal/20 px-4 py-2 text-center font-semibold text-brand-espresso"
              >
                Ver no Google Maps
              </a>
              <a
                href={`https://www.google.com/maps/dir/?api=1&destination=${mapQuery}`}
                target="_blank"
                rel="noreferrer"
                className="rounded-full border border-brand-charcoal/20 px-4 py-2 text-center font-semibold text-brand-espresso"
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
