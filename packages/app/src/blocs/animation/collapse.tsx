import { useEffect, useRef } from 'react'

export type CollapseProps = {
  collapsed: boolean
  children: React.ReactNode
  className?: string
}
export function Collapse({
  collapsed,
  children,
  className = '',
}: CollapseProps) {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const div = ref.current

    if (div) {
      if (collapsed) {
        div.style.height = '0px'
      } else {
        div.style.height = div.scrollHeight + 'px'
      }
    }
  }, [collapsed])

  return (
    <div
      ref={ref}
      className={`transition-all overflow-hidden h-0 ${className}`}
    >
      {children}
    </div>
  )
}
