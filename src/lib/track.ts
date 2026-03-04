export type TrackProps = Record<string, unknown>

export function track(eventName: string, props: TrackProps = {}) {
  if (typeof window === 'undefined') return

  if (import.meta.env.DEV) {
    console.info(`[track] ${eventName}`, props)
    return
  }

  window.dispatchEvent(
    new CustomEvent('drbarista:track', {
      detail: {
        eventName,
        props,
        ts: new Date().toISOString(),
      },
    }),
  )
}
