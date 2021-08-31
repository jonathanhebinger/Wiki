import { faChevronRight } from '@fortawesome/free-solid-svg-icons'
import { useEffect, useRef, useState } from 'react'
import { Icon } from 'src/blocs/icon'
import { QuickProps } from 'src/blocs/type'
import { mergeClassNames } from 'src/blocs/util'

export type CollapseProps = QuickProps & {
  collapsed: boolean
  direction?: 'vertical' | 'horizontal' | 'both'
}
export function Collapse({
  collapsed,
  direction = 'vertical',
  children,
  className = '',
}: CollapseProps) {
  const vertical = direction !== 'horizontal'
  const horizontal = direction !== 'vertical'
  const ref = useRef<HTMLDivElement>(null)

  const [display, display$set] = useState(!collapsed)

  const widthRef = useRef<number>(0)
  const heightRef = useRef<number>(0)

  useEffect(() => {
    const div = ref.current

    if (div) {
      if (collapsed) {
        heightRef.current = div.scrollHeight
        widthRef.current = div.scrollWidth

        div.style.maxHeight = div.scrollHeight + 'px'

        if (horizontal) {
          div.style.width = div.scrollWidth + 'px'
        }

        requestAnimationFrame(() => {
          if (horizontal) {
            div.style.width = '0px'
          }
          if (vertical) {
            div.style.maxHeight = '0px'
          }
        })

        setTimeout(() => {
          display$set(false)
        }, 150)
      } else {
        display$set(true)
        requestAnimationFrame(() => {
          div.style.width = (widthRef.current || div.scrollWidth) + 'px'
          div.style.maxHeight = (heightRef.current || div.scrollHeight) + 'px'

          setTimeout(() => {
            div.style.width = ''
            div.style.maxHeight = ''
          }, 150)
        })
      }
    }
  }, [collapsed])

  return (
    <div
      ref={ref}
      className={mergeClassNames(
        'transition-all',
        display ? '' : 'hidden',
        collapsed && 'overflow-hidden',
        className,
      )}
    >
      {children}
    </div>
  )
}

export function CollapseIcon({
  collapsed,
  className,
}: {
  collapsed: boolean
  className?: string
}) {
  return (
    <Icon
      icon={faChevronRight}
      className={mergeClassNames(
        'float-right cursor-pointer px-1',
        'transition-transform transform',
        collapsed ? 'rotate-90' : '-rotate-90',
        className,
      )}
    />
  )
}
