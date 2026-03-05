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
  const { isScrolled } = useScrollY({ threshold: 8 })
  useEffect(() => {
    let enterRafId: number | null = null
    const resetRafId = window.requestAnimationFrame(() => {
      setPageEntered(false)
      enterRafId = window.requestAnimationFrame(() => setPageEntered(true))
    })

    return () => {
      window.cancelAnimationFrame(resetRafId)
      if (enterRafId) window.cancelAnimationFrame(enterRafId)
    }
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
        <div className="relative">
          <header className="sticky top-0 z-50 bg-transparent">
            <div className="mx-auto max-w-7xl px-4 pt-3 sm:px-6">
              <div
                className={`flex h-[4.35rem] flex-wrap items-center justify-between gap-4 rounded-2xl border border-brand-warmGray/35 px-4 backdrop-blur-md backdrop-saturate-150 ring-1 ring-inset ring-brand-warmGray/20 transition-all duration-200 ease-out sm:px-6 ${
                  isScrolled
                    ? 'bg-brand-surface/95 shadow-[0_14px_30px_rgba(11,5,4,0.28)]'
                    : 'bg-brand-surface/90 shadow-[0_10px_24px_rgba(11,5,4,0.22)]'
                }`}
              >
                <Link
                  to="/"
                  className="rounded-sm text-lg font-semibold uppercase tracking-[0.25em] text-brand-espresso transition-colors duration-200 ease-out hover:text-brand-charcoal focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-copper/95 focus-visible:ring-offset-2 focus-visible:ring-offset-brand-surface"
                >
                  Dr Barista
                </Link>
                <nav className="hidden flex-wrap gap-6 text-xs font-semibold uppercase tracking-[0.3em] text-brand-charcoal/80 md:flex">
                  {navItems.map((item) => (
                    <NavLink
                      key={item.path}
                      to={item.path}
                      className={({ isActive }) =>
                        isActive
                          ? 'relative rounded-sm text-brand-espresso after:absolute after:-bottom-2 after:left-0 after:h-[1.5px] after:w-full after:rounded-full after:bg-brand-copper focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-copper/95 focus-visible:ring-offset-2 focus-visible:ring-offset-brand-surface'
                          : 'relative rounded-sm text-brand-charcoal/82 transition-all duration-200 ease-out hover:text-brand-espresso after:absolute after:-bottom-2 after:left-0 after:h-[1.5px] after:w-0 after:rounded-full after:bg-brand-copper/90 after:transition-all after:duration-200 hover:after:w-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-copper/95 focus-visible:ring-offset-2 focus-visible:ring-offset-brand-surface'
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
                    className="hidden rounded-full border border-emerald-400/45 bg-emerald-500/[0.1] px-4 py-2 text-[0.65rem] font-semibold uppercase tracking-[0.26em] text-emerald-100 transition-all duration-200 ease-out hover:-translate-y-0.5 hover:border-emerald-300/55 hover:bg-emerald-500/[0.16] hover:text-emerald-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-300/70 focus-visible:ring-offset-2 focus-visible:ring-offset-brand-surface md:inline-flex"
                  >
                    WhatsApp
                  </a>
                  <Button
                    variant="primary"
                    onClick={scrollToForm}
                    className="border border-brand-copperHover/55 px-5 py-2.5 text-[0.68rem] tracking-[0.24em] shadow-[0_10px_24px_rgba(181,139,51,0.28)] focus-visible:ring-offset-brand-surface"
                  >
                    Solicitar orçamento
                  </Button>
                  <NavLink
                    to="/solucoes"
                    className="rounded-sm text-[0.65rem] font-semibold uppercase tracking-[0.4em] text-brand-charcoal/82 transition-colors duration-200 ease-out hover:text-brand-espresso focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-copper/95 focus-visible:ring-offset-2 focus-visible:ring-offset-brand-surface md:hidden"
                  >
                    Soluções
                  </NavLink>
                </div>
              </div>
            </div>
          </header>
          <main className="page-shell mx-auto w-full max-w-7xl px-6 py-10 sm:py-14">
            <div key={location.pathname} className={`page-enter ${pageEntered ? 'page-enter-active' : ''}`}>
              {children}
            </div>
          </main>
          <WhatsAppFloatingButton />
          <footer className="border-t border-brand-warmGray/35 bg-brand-surfaceSoft">
            <div className="mx-auto flex max-w-7xl flex-col gap-4 px-6 py-8 text-sm text-brand-cream md:flex-row md:items-center md:justify-between">
              <p>© {new Date().getFullYear()} Dr Barista · Operação premium B2B</p>
              <p>administracao@baristacafe.com.br · (47) 99107-2458</p>
            </div>
          </footer>
        </div>
      </div>
    </div>
  )
}
