import { useEffect, useState, type ReactNode } from 'react'
import { Link, NavLink, useLocation, useNavigate } from 'react-router-dom'
import { useScrollY } from '../hooks/useScrollY'
import { Button } from './ui/Button'
import { WhatsAppFloatingButton } from './WhatsAppFloatingButton'

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
  const [pageEntered, setPageEntered] = useState(false)
  const { isScrolled } = useScrollY({ threshold: 20 })
  const isHomeTop = location.pathname === '/' && !isScrolled

  useEffect(() => {
    setPageEntered(false)
    const rafId = window.requestAnimationFrame(() => setPageEntered(true))
    return () => window.cancelAnimationFrame(rafId)
  }, [location.pathname])

  const scrollToForm = () => {
    if (location.pathname === '/') {
      const element = document.getElementById('lead-form')
      element?.scrollIntoView({ behavior: 'smooth', block: 'start' })
      return
    }

    navigate('/', { state: { scrollToLead: true } })
  }

  return (
    <div className="min-h-screen bg-brand-base text-brand-charcoal">
      <div className="relative">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(208,138,69,0.22),transparent_56%)] opacity-35" />
        <div className="relative">
          <header
            className={`sticky top-0 z-40 border-b backdrop-blur-xl transition-all duration-200 ease-out ${
              isHomeTop
                ? 'border-transparent bg-brand-base/35'
                : 'border-brand-copper/30 bg-brand-base/92 shadow-[0_14px_32px_rgba(0,0,0,0.28)]'
            }`}
          >
            <div className="mx-auto flex h-20 max-w-6xl flex-wrap items-center justify-between gap-4 px-6">
              <Link
                to="/"
                className="rounded-sm text-lg font-semibold uppercase tracking-[0.25em] text-brand-charcoal transition-colors duration-200 ease-out hover:text-brand-espresso focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-copper/95 focus-visible:ring-offset-2 focus-visible:ring-offset-brand-base"
              >
                Dr Barista
              </Link>
              <nav className="hidden flex-wrap gap-6 text-xs font-semibold uppercase tracking-[0.3em] text-brand-charcoal/85 md:flex">
                {navItems.map((item) => (
                  <NavLink
                    key={item.path}
                    to={item.path}
                    className={({ isActive }) =>
                      isActive
                        ? 'relative rounded-sm text-brand-espresso after:absolute after:-bottom-2 after:left-0 after:h-[2px] after:w-full after:rounded-full after:bg-brand-copper focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-copper/95 focus-visible:ring-offset-2 focus-visible:ring-offset-brand-base'
                        : 'relative rounded-sm text-brand-charcoal/80 transition-all duration-200 ease-out hover:text-brand-espresso after:absolute after:-bottom-2 after:left-0 after:h-[2px] after:w-0 after:rounded-full after:bg-brand-copper/85 after:transition-all after:duration-200 hover:after:w-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-copper/95 focus-visible:ring-offset-2 focus-visible:ring-offset-brand-base'
                    }
                  >
                    {item.label}
                  </NavLink>
                ))}
              </nav>
              <div className="flex flex-1 items-center justify-end gap-3 md:flex-none">
                <a
                  href="https://wa.me/5547991072458"
                  target="_blank"
                  rel="noreferrer"
                  aria-label="Abrir WhatsApp da Dr Barista"
                  className="hidden rounded-full border border-[#25D366]/55 bg-[#25D366]/10 px-4 py-2 text-[0.65rem] font-semibold uppercase tracking-[0.28em] text-[#79f2a8] transition-all duration-200 ease-out hover:-translate-y-0.5 hover:bg-[#25D366]/18 hover:text-[#9bf8be] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#79f2a8] focus-visible:ring-offset-2 focus-visible:ring-offset-brand-base md:inline-flex"
                >
                  WhatsApp
                </a>
                <Button variant="primary" onClick={scrollToForm}>
                  Solicitar orçamento
                </Button>
                <NavLink
                  to="/solucoes"
                  className="rounded-sm text-[0.65rem] font-semibold uppercase tracking-[0.4em] text-brand-charcoal/85 transition-colors duration-200 ease-out hover:text-brand-espresso focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-copper/95 focus-visible:ring-offset-2 focus-visible:ring-offset-brand-base md:hidden"
                >
                  Soluções
                </NavLink>
              </div>
            </div>
          </header>
          <main className="page-shell mx-auto w-full max-w-6xl px-6 py-10 sm:py-14">
            <div key={location.pathname} className={`page-enter ${pageEntered ? 'page-enter-active' : ''}`}>
              {children}
            </div>
          </main>
          <WhatsAppFloatingButton />
          <footer className="border-t border-brand-warmGray/35 bg-brand-surfaceSoft">
            <div className="mx-auto flex max-w-6xl flex-col gap-4 px-6 py-8 text-sm text-brand-cream md:flex-row md:items-center md:justify-between">
              <p>© {new Date().getFullYear()} Dr Barista · Operação premium B2B</p>
              <p>administracao@baristacafe.com.br · (47) 99107-2458</p>
            </div>
          </footer>
        </div>
      </div>
    </div>
  )
}
