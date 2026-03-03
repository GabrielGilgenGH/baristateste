import type { CSSProperties, ReactNode } from 'react'
import { useInViewOnce } from '../../hooks/useInViewOnce'
import { cn } from '../../lib/cn'

type RevealProps = {
  children: ReactNode
  delay?: number
  y?: number
  className?: string
  threshold?: number
  rootMargin?: string
}

export function Reveal({
  children,
  delay = 0,
  y = 24,
  className,
  threshold = 0.2,
  rootMargin = '0px 0px -10% 0px',
}: RevealProps) {
  const { ref, inView } = useInViewOnce<HTMLDivElement>({ threshold, rootMargin })

  const style: CSSProperties = {
    opacity: inView ? 1 : 0,
    transform: inView ? 'translateY(0px)' : `translateY(${y}px)`,
    transitionDelay: `${delay}ms`,
  }

  return (
    <div
      ref={ref}
      style={style}
      className={cn(
        'transition-[opacity,transform] duration-500 ease-out motion-reduce:transform-none motion-reduce:opacity-100 motion-reduce:transition-none',
        className,
      )}
    >
      {children}
    </div>
  )
}
