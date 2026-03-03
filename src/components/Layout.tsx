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
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    setPageEntered(false)
    const rafId = window.requestAnimationFrame(() => setPageEntered(true))
    return () => window.cancelAnimationFrame(rafId)
  }, [location.pathname])

  useEffect(() => {
    const nodes = Array.from(document.querySelectorAll<HTMLElement>('[data-reveal]'))
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    if (prefersReducedMotion) {
      nodes.forEach((node) => node.classList.add('is-visible'))
      return
    }

    nodes.forEach((node) => {
      node.classList.remove('is-visible')
      const delay = node.dataset.revealDelay
      if (delay) node.style.setProperty('--reveal-delay', `${delay}ms`)
    })

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return
          entry.target.classList.add('is-visible')
          observer.unobserve(entry.target)
        })
      },
      { threshold: 0.2, rootMargin: '0px 0px -10% 0px' },
    )

    nodes.forEach((node) => observer.observe(node))
    return () => observer.disconnect()
  }, [location.pathname])

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 14)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

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
            className={`sticky top-0 z-40 border-b backdrop-blur-xl transition-all duration-300 ${
              isScrolled
                ? 'border-brand-copper/35 bg-brand-base/92 shadow-[0_14px_32px_rgba(0,0,0,0.28)]'
                : 'border-brand-warmGray/35 bg-brand-base/95'
            }`}
          >
            <div
              className={`mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-4 px-6 transition-all duration-300 ${
                isScrolled ? 'py-3' : 'py-4'
              }`}
            >
              <Link to="/" className="text-lg font-semibold uppercase tracking-[0.25em] text-brand-charcoal transition-colors hover:text-brand-espresso">
                Dr Barista
              </Link>
              <nav className="hidden flex-wrap gap-6 text-xs font-semibold uppercase tracking-[0.3em] text-brand-charcoal/85 md:flex">
                {navItems.map((item) => (
                  <NavLink
                    key={item.path}
                    to={item.path}
                    className={({ isActive }) =>
                      isActive
                        ? 'relative text-brand-espresso after:absolute after:-bottom-2 after:left-0 after:h-[2px] after:w-full after:rounded-full after:bg-brand-copper'
                        : 'relative text-brand-charcoal/80 transition-colors hover:text-brand-espresso after:absolute after:-bottom-2 after:left-0 after:h-[2px] after:w-0 after:rounded-full after:bg-brand-copper/85 after:transition-all hover:after:w-full'
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
                  className="hidden rounded-full border border-[#25D366]/55 bg-[#25D366]/10 px-4 py-2 text-[0.65rem] font-semibold uppercase tracking-[0.28em] text-[#79f2a8] transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#25D366]/18 hover:text-[#9bf8be] md:inline-flex"
                >
                  WhatsApp
                </a>
                <Button variant="primary" onClick={scrollToForm}>
                  Solicitar orçamento
                </Button>
                <NavLink
                  to="/solucoes"
                  className="text-[0.65rem] font-semibold uppercase tracking-[0.4em] text-brand-charcoal/85 hover:text-brand-espresso md:hidden"
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
