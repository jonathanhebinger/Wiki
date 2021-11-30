import { useEffect, useRef, useState } from 'react'

export type FadeProps = React.PropsWithChildren<{
  faded: boolean
  children: React.ReactNode
  className?: string
}>
export function Fade({ faded, children, className = '' }: FadeProps) {
  const ref = useRef<HTMLDivElement>(null)

  const [display, display$set] = useState(!faded)

  useEffect(() => {
    const div = ref.current

    if (!div) return

    if (faded) {
      div.style.opacity = '0'

      setTimeout(() => {
        display$set(false)
      }, 150)
    } else {
      display$set(true)

      div.style.opacity = '1'
    }
  }, [faded])

  return (
    <div
      ref={ref}
      className={`transition-opacity ${display ? '' : 'hidden'} ${className}`}
    >
      {children}
    </div>
  )
}
