import { useEffect, useState } from 'react'

type UseScrollYOptions = {
  threshold?: number
}

type UseScrollYResult = {
  scrollY: number
  isScrolled: boolean
}

export function useScrollY({ threshold = 20 }: UseScrollYOptions = {}): UseScrollYResult {
  const [scrollY, setScrollY] = useState(0)

  useEffect(() => {
    const updateScroll = () => setScrollY(window.scrollY)
    updateScroll()

    window.addEventListener('scroll', updateScroll, { passive: true })
    return () => window.removeEventListener('scroll', updateScroll)
  }, [])

  return { scrollY, isScrolled: scrollY > threshold }
}
