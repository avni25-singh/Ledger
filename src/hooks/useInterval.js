import { useEffect, useRef } from 'react'

/**
 * Runs `callback` every `delay` ms without resetting the timer when the
 * callback identity changes (the classic Dan Abramov useInterval pattern).
 * Pass delay = null to pause.
 */
export function useInterval(callback, delay) {
  const savedCallback = useRef(callback)

  useEffect(() => {
    savedCallback.current = callback
  }, [callback])

  useEffect(() => {
    if (delay === null) return
    const id = setInterval(() => savedCallback.current(), delay)
    return () => clearInterval(id)
  }, [delay])
}
