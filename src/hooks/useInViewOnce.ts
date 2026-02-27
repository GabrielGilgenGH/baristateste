import { useEffect, useRef, useState, type MutableRefObject } from 'react'

type UseInViewOnceOptions = {
  threshold?: number
  rootMargin?: string
}

type UseInViewOnceResult<T extends Element> = {
  ref: MutableRefObject<T | null>
  inView: boolean
}

export function useInViewOnce<T extends Element = HTMLDivElement>({
  threshold = 0.2,
  rootMargin = '0px 0px -10% 0px',
}: UseInViewOnceOptions = {}): UseInViewOnceResult<T> {
  const ref = useRef<T | null>(null)
  const [inView, setInView] = useState(false)

  useEffect(() => {
    if (inView) return
    if (typeof window === 'undefined') return

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReducedMotion) {
      setInView(true)
      return
    }

    const node = ref.current
    if (!node) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry?.isIntersecting) return
        setInView(true)
        observer.unobserve(entry.target)
      },
      { threshold, rootMargin },
    )

    observer.observe(node)
    return () => observer.disconnect()
  }, [inView, rootMargin, threshold])

  return { ref, inView }
}
