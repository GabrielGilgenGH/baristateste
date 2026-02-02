import type { ReactNode } from 'react'
import { Link, NavLink, useLocation, useNavigate } from 'react-router-dom'
import { Button } from './ui/Button'

const navItems = [
  { label: 'Home', path: '/' },
  { label: 'Quem Somos', path: '/quem-somos' },
  { label: 'Máquinas', path: '/maquinas' },
  { label: 'Produtos', path: '/produtos' },
  { label: 'Contato', path: '/contato' },
]

type LayoutProps = {
  children: ReactNode
}

export function Layout({ children }: LayoutProps) {
  const navigate = useNavigate()
  const location = useLocation()

  const scrollToForm = () => {
    if (location.pathname === '/') {
      const element = document.getElementById('lead-form')
      element?.scrollIntoView({ behavior: 'smooth', block: 'start' })
      return
    }

    navigate('/', { state: { scrollToLead: true } })
  }

  return (
    <div className="min-h-screen bg-brand-cream text-brand-charcoal">
      <div className="relative">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(183,110,59,0.08),transparent_45%)] opacity-80" />
        <div className="relative">
          <header className="sticky top-0 z-40 border-b border-brand-warmGray/30 bg-brand-cream/70 backdrop-blur-xl">
            <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-4 px-6 py-4">
              <Link to="/" className="text-lg font-semibold uppercase tracking-[0.25em] text-brand-charcoal">
                Barista Office
              </Link>
              <nav className="hidden flex-wrap gap-6 text-xs font-semibold uppercase tracking-[0.3em] text-brand-charcoal/60 md:flex">
                {navItems.map((item) => (
                  <NavLink
                    key={item.path}
                    to={item.path}
                    className={({ isActive }) =>
                      isActive
                        ? 'text-brand-espresso'
                        : 'text-brand-charcoal/50 hover:text-brand-espresso'
                    }
                  >
                    {item.label}
                  </NavLink>
                ))}
              </nav>
              <div className="flex flex-1 items-center justify-end gap-3 md:flex-none">
                <Button variant="primary" onClick={scrollToForm}>
                  Solicitar orçamento
                </Button>
                <NavLink
                  to="/solucoes"
                  className="text-[0.65rem] font-semibold uppercase tracking-[0.4em] text-brand-charcoal/60 hover:text-brand-espresso md:hidden"
                >
                  Soluções
                </NavLink>
              </div>
            </div>
          </header>
          <main className="mx-auto w-full max-w-6xl px-6 py-10 sm:py-14">{children}</main>
          <footer className="border-t border-brand-warmGray/30 bg-brand-espresso">
            <div className="mx-auto flex max-w-6xl flex-col gap-4 px-6 py-8 text-sm text-brand-cream md:flex-row md:items-center md:justify-between">
              <p>© {new Date().getFullYear()} Barista Office · Operação premium B2B</p>
              <p>atendimento@baristaoffice.com · (11) 99999-0000</p>
            </div>
          </footer>
        </div>
      </div>
    </div>
  )
}
