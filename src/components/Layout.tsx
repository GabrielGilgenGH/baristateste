import { useEffect, useLayoutEffect, useState, type ReactNode } from 'react'
import { Link, NavLink, useLocation, useNavigate } from 'react-router-dom'
import { MobileMenuOverlay } from './MobileMenuOverlay'
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

  useLayoutEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'auto' })
  }, [location.pathname])

  const scrollToForm = () => {
    if (location.pathname === '/') {
      const element = document.getElementById('lead-form')
      element?.scrollIntoView({ behavior: 'smooth', block: 'start' })
      return
    }

    navigate('/', { state: { scrollToLead: true } })
  }

  const openMobileMenu = () => setMobileMenuOpen(true)
  const closeMobileMenu = () => setMobileMenuOpen(false)

  const handleMobileQuote = () => {
    closeMobileMenu()
    window.setTimeout(() => {
      scrollToForm()
    }, 0)
  }

  return (
    <div className="min-h-screen bg-brand-base text-brand-charcoal">
      <div className="relative">
        <div className="relative">
          <header className="fixed inset-x-0 top-0 z-50 bg-transparent">
            <div className="mx-auto max-w-6xl px-4 pt-3">
              <div className="h-16 rounded-2xl border border-[#c9b8a6] bg-[#E9DCCF] shadow-md transition-all duration-200 ease-out">
                <div className="flex h-full items-center justify-between gap-3 px-4">
                  <Link
                    to="/"
                    className="rounded-sm text-sm font-medium uppercase tracking-[0.25em] text-[#4a3426] transition-colors duration-200 ease-out hover:text-brand-ink focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-copper/95 focus-visible:ring-offset-2 focus-visible:ring-offset-brand-cream"
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
                      className="h-10 w-auto rounded-full border-0 bg-[#D9A441] px-5 py-0 text-sm font-semibold tracking-wide text-black shadow-sm hover:translate-y-0 hover:bg-[#D9A441] hover:shadow-sm active:translate-y-0 active:shadow-sm focus-visible:ring-offset-brand-cream"
                    >
                      Solicitar orçamento
                    </Button>
                    <button
                      type="button"
                      onClick={openMobileMenu}
                      aria-expanded={mobileMenuOpen}
                      aria-controls="mobile-site-nav"
                      className="inline-flex h-10 items-center justify-center rounded-full border border-[#b9a48f] bg-transparent px-4 py-0 text-xs font-semibold uppercase tracking-[0.25em] text-[#4a3426] transition-all duration-200 ease-out hover:border-brand-copper/70 hover:bg-brand-copper/12 hover:text-brand-ink focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-copper/70 focus-visible:ring-offset-2 focus-visible:ring-offset-brand-cream md:hidden"
                    >
                      Menu
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </header>
          {mobileMenuOpen ? (
            <MobileMenuOverlay navItems={navItems} onClose={closeMobileMenu} onRequestQuote={handleMobileQuote} />
          ) : null}
          <main className="page-shell mx-auto w-full max-w-7xl px-6 pb-10 pt-[5.25rem] sm:pb-14 sm:pt-[5.75rem]">
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
