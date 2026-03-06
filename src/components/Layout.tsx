import { useEffect, useState, type ReactNode } from 'react'
import { Link, NavLink, useLocation, useNavigate } from 'react-router-dom'
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
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

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

  useEffect(() => {
    setMobileMenuOpen(false)
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
              <div className="rounded-2xl border border-brand-warmGray/28 bg-brand-cream/95 shadow-[0_14px_30px_rgba(36,22,17,0.16)] backdrop-blur-md backdrop-saturate-150 ring-1 ring-inset ring-brand-warmGray/15 transition-all duration-200 ease-out">
                <div className="flex min-h-[4.35rem] flex-wrap items-center justify-between gap-3 px-4 sm:px-6">
                  <Link
                    to="/"
                    className="rounded-sm text-lg font-semibold uppercase tracking-[0.25em] text-brand-warmGray transition-colors duration-200 ease-out hover:text-brand-ink focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-copper/95 focus-visible:ring-offset-2 focus-visible:ring-offset-brand-cream"
                  >
                    Dr Barista
                  </Link>
                  <nav className="hidden flex-wrap gap-6 text-xs font-semibold uppercase tracking-[0.3em] text-brand-warmGray/80 md:flex">
                    {navItems.map((item) => (
                      <NavLink
                        key={item.path}
                        to={item.path}
                        className={({ isActive }) =>
                          isActive
                            ? 'relative rounded-sm text-brand-warmGray after:absolute after:-bottom-2 after:left-0 after:h-[1.5px] after:w-full after:rounded-full after:bg-brand-copper focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-copper/95 focus-visible:ring-offset-2 focus-visible:ring-offset-brand-cream'
                            : 'relative rounded-sm text-brand-warmGray/85 transition-all duration-200 ease-out hover:text-brand-ink after:absolute after:-bottom-2 after:left-0 after:h-[1.5px] after:w-0 after:rounded-full after:bg-brand-copper/90 after:transition-all after:duration-200 hover:after:w-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-copper/95 focus-visible:ring-offset-2 focus-visible:ring-offset-brand-cream'
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
                      className="hidden rounded-full border border-brand-warmGray/40 bg-brand-cream/62 px-4 py-2 text-[0.65rem] font-semibold uppercase tracking-[0.26em] text-brand-warmGray transition-all duration-200 ease-out hover:-translate-y-0.5 hover:border-brand-copper/70 hover:bg-brand-copper/12 hover:text-brand-ink focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-copper/70 focus-visible:ring-offset-2 focus-visible:ring-offset-brand-cream md:inline-flex"
                    >
                      WhatsApp
                    </a>
                    <Button
                      variant="primary"
                      onClick={scrollToForm}
                      className="border border-brand-copperHover/55 px-4 py-2.5 text-[0.62rem] tracking-[0.2em] shadow-[0_10px_24px_rgba(181,139,51,0.28)] focus-visible:ring-offset-brand-cream sm:px-5 sm:text-[0.68rem]"
                    >
                      Solicitar orçamento
                    </Button>
                    <button
                      type="button"
                      onClick={() => setMobileMenuOpen((current) => !current)}
                      aria-expanded={mobileMenuOpen}
                      aria-controls="mobile-site-nav"
                      className="inline-flex min-h-10 items-center justify-center rounded-full border border-brand-warmGray/40 bg-brand-cream/62 px-4 py-2 text-[0.65rem] font-semibold uppercase tracking-[0.26em] text-brand-warmGray transition-all duration-200 ease-out hover:border-brand-copper/70 hover:bg-brand-copper/12 hover:text-brand-ink focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-copper/70 focus-visible:ring-offset-2 focus-visible:ring-offset-brand-cream md:hidden"
                    >
                      {mobileMenuOpen ? 'Fechar' : 'Menu'}
                    </button>
                  </div>
                </div>

                {mobileMenuOpen ? (
                  <nav
                    id="mobile-site-nav"
                    className="border-t border-brand-warmGray/20 px-4 py-4 md:hidden"
                  >
                    <div className="grid gap-2">
                      {navItems.map((item) => (
                        <NavLink
                          key={item.path}
                          to={item.path}
                          className={({ isActive }) =>
                            `rounded-xl border px-4 py-3 text-center text-[0.72rem] font-semibold uppercase tracking-[0.28em] transition-all duration-200 ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-copper/95 focus-visible:ring-offset-2 focus-visible:ring-offset-brand-cream ${
                              isActive
                                ? 'border-brand-copper/55 bg-brand-copper/10 text-brand-ink'
                                : 'border-brand-warmGray/28 bg-brand-cream/45 text-brand-warmGray hover:border-brand-copper/50 hover:bg-brand-copper/10 hover:text-brand-ink'
                            }`
                          }
                        >
                          {item.label}
                        </NavLink>
                      ))}
                    </div>
                  </nav>
                ) : null}
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
