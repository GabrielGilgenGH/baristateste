import { ClientsCarousel } from '../components/ClientsCarousel'
import { Section } from '../components/ui/Section'
import logoExato from '../assets/brand/logo.png'

export function QuemSomos() {
  return (
    <Section
      eyebrow="História e valores"
      title="Quem somos"
      center
      className="space-y-12 py-20 [&_header]:mx-auto [&_header]:max-w-4xl [&_header]:text-center [&_header>p:first-of-type]:text-[1.125rem] [&_header>h2]:text-[clamp(2.85rem,3.6vw+1.3rem,4.5rem)]"
    >
      <p
        data-reveal="up"
        data-reveal-delay="90"
        className="mx-auto mb-16 max-w-4xl text-center text-xl font-medium leading-relaxed text-brand-charcoal/95 md:text-2xl"
      >
        Há mais de 16 anos levando soluções profissionais de café para empresas.
      </p>

      <div className="mx-auto grid max-w-6xl items-start gap-12 lg:grid-cols-2">
        <div
          data-reveal="left"
          data-reveal-delay="130"
          className="max-w-2xl space-y-6 text-left text-[1.1rem] leading-relaxed text-brand-charcoal/95 md:text-[1.24rem]"
        >
          <p>
            Dr. Barista Vending, uma empresa joinvillense, fundada em 2010, tem como característica principal o compromisso da
            excelência no atendimento.
          </p>
          <p>
            Instalada em sede própria, conta com estrutura organizacional que permite oferecer aos nossos clientes e seus
            colaboradores atendimento diferenciado e serviços de qualidade em todo estado de Santa Catarina.
          </p>
          <p>
            Com vasta experiência no ramo, sua diretoria assume o comprometimento e responsabilidade para com seus clientes,
            com funcionários qualificados, utilizando equipamentos, produtos de alta qualidade e preços competitivos.
          </p>
          <p>
            A Dr. Barista Vending conta ainda com diferencial maior: a manutenção dos equipamentos e entrega de insumos em até
            24 horas da solicitação feita, sem taxa de frete.
          </p>
          <p>
            Com o compromisso de desenvolver uma relação de parceria, a Dr. Barista Vending deseja atender todas suas
            expectativas com relação aos serviços propostos, colocando-nos à disposição.
          </p>
        </div>

        <div
          data-reveal="right"
          data-reveal-delay="180"
          className="mt-12 flex items-start justify-center lg:mt-0 lg:justify-end"
        >
          <img
            src={logoExato}
            alt="Logo Dr. Barista Vending"
            className="h-auto w-[260px] max-w-full object-contain lg:w-[420px]"
            loading="lazy"
            decoding="async"
          />
        </div>
      </div>
      <ClientsCarousel />
    </Section>
  )
}
