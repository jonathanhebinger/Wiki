import React, { useEffect, useState } from 'react'

export function useOnClickOutside(
  ref: React.RefObject<HTMLElement>,
  handler: (event: Event) => void,
) {
  useEffect(() => {
    const listener = (event: any) => {
      if (ref.current && ref.current.contains(event.target)) {
        handler(event)
      }
    }

    document.addEventListener('mousedown', listener)
    document.addEventListener('touchstart', listener)

    return () => {
      document.removeEventListener('mousedown', listener)
      document.removeEventListener('touchstart', listener)
    }
  }, [ref, handler])
}

export function useHover(ref: React.RefObject<HTMLElement>) {
  const [hover, setHover] = useState(false)

  useEffect(() => {
    const listenerEnter = () => setHover(true)
    const listenerLeave = () => setHover(false)

    document.addEventListener('mouseenter', listenerEnter)
    document.addEventListener('mouseleave', listenerLeave)

    return () => {
      document.removeEventListener('mouseenter', listenerEnter)
      document.removeEventListener('mouseleave', listenerLeave)
    }
  }, [ref])

  return hover
}
