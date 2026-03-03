import { useEffect, useRef, useState } from 'react'

type UseCountUpOptions = {
  end: number
  duration?: number
  enabled?: boolean
}

export function useCountUp({ end, duration = 900, enabled = true }: UseCountUpOptions) {
  const [value, setValue] = useState(0)
  const frameRef = useRef<number | null>(null)

  useEffect(() => {
    if (!enabled) {
      const resetFrame = window.requestAnimationFrame(() => setValue(0))
      frameRef.current = resetFrame
      return () => {
        window.cancelAnimationFrame(resetFrame)
      }
    }

    const start = performance.now()
    const activeFrameRef = frameRef

    const step = (now: number) => {
      const progress = Math.min((now - start) / duration, 1)
      const eased = 1 - Math.pow(1 - progress, 3)
      setValue(end * eased)

      if (progress < 1) {
        activeFrameRef.current = window.requestAnimationFrame(step)
      }
    }

    activeFrameRef.current = window.requestAnimationFrame(step)

    return () => {
      if (activeFrameRef.current) window.cancelAnimationFrame(activeFrameRef.current)
    }
  }, [duration, enabled, end])

  return value
}
