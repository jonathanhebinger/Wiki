import { useEffect, useRef } from 'react'

export type FadeProps = {
  faded: boolean
  children: React.ReactNode
  className?: string
}
export function Fade({ faded, children, className = '' }: FadeProps) {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const div = ref.current

    if (div) {
      if (faded) {
        div.style.opacity = '0'
      } else {
        div.style.opacity = '1'
      }
    }
  }, [faded])

  return (
    <div ref={ref} className={`transition-opacity ${className}`}>
      {children}
    </div>
  )
}
