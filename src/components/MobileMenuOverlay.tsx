import { useEffect } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { Button } from './ui/Button'

type NavItem = {
  label: string
  path: string
}

type MobileMenuOverlayProps = {
  navItems: NavItem[]
  onClose: () => void
  onRequestQuote: () => void
}

export function MobileMenuOverlay({ navItems, onClose, onRequestQuote }: MobileMenuOverlayProps) {
  useEffect(() => {
    const previousBodyOverflow = document.body.style.overflow
    const previousHtmlOverflow = document.documentElement.style.overflow

    document.body.style.overflow = 'hidden'
    document.documentElement.style.overflow = 'hidden'

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose()
    }

    window.addEventListener('keydown', handleKeyDown)

    return () => {
      document.body.style.overflow = previousBodyOverflow
      document.documentElement.style.overflow = previousHtmlOverflow
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [onClose])

  return (
    <div className="fixed inset-0 z-[100] bg-brand-cream/95 px-6 pb-8 pt-6 backdrop-blur-md">
      <div className="mx-auto flex h-full w-full max-w-7xl flex-col animate-[pageAssemble_220ms_cubic-bezier(0.22,1,0.36,1)]">
        <div className="flex items-center justify-between gap-4">
          <Link
            to="/"
            onClick={onClose}
            className="rounded-sm text-lg font-semibold uppercase tracking-[0.25em] text-brand-warmGray transition-colors duration-200 ease-out hover:text-brand-ink focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-copper/95 focus-visible:ring-offset-2 focus-visible:ring-offset-brand-cream"
          >
            Dr Barista
          </Link>
          <button
            type="button"
            onClick={onClose}
            className="inline-flex min-h-10 items-center justify-center rounded-full border border-brand-warmGray/40 bg-brand-cream/62 px-4 py-2 text-[0.65rem] font-semibold uppercase tracking-[0.26em] text-brand-warmGray transition-all duration-200 ease-out hover:border-brand-copper/70 hover:bg-brand-copper/12 hover:text-brand-ink focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-copper/70 focus-visible:ring-offset-2 focus-visible:ring-offset-brand-cream"
          >
            Fechar
          </button>
        </div>

        <div className="mt-8">
          <Button
            variant="primary"
            onClick={onRequestQuote}
            className="border border-brand-copperHover/55 px-5 py-2.5 text-[0.68rem] tracking-[0.24em] shadow-[0_10px_24px_rgba(181,139,51,0.28)] focus-visible:ring-offset-brand-cream"
          >
            Solicitar orçamento
          </Button>
        </div>

        <nav className="mt-8 flex flex-1 flex-col gap-2">
          {navItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              onClick={onClose}
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
        </nav>
      </div>
    </div>
  )
}
