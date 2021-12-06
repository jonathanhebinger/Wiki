import { faChevronRight } from '@fortawesome/free-solid-svg-icons/faChevronRight'
import { useEffect, useRef, useState } from 'react'

import { Icon } from '../components/forms/icon'
import { mergeClassNames } from '../util/class'
import { QuickProps } from '../util/type'

export interface CollapseProps extends QuickProps {
  collapsed: boolean
  direction?: 'vertical' | 'horizontal' | 'both'
  displayStrategy?: 'hidden' | 'none'
}
export function Collapse({
  collapsed,
  direction = 'vertical',
  displayStrategy = 'hidden',
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
    if (collapsed) {
      const div = ref.current

      if (!div) return

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
        const div = ref.current

        if (!div) return

        if (horizontal) {
          div.style.width = '0px'
        }
        if (vertical) {
          div.style.maxHeight = '0px'
        }

        requestAnimationFrame(() => {
          div.style.width = (widthRef.current || div.scrollWidth) + 'px'
          div.style.maxHeight = (heightRef.current || div.scrollHeight) + 'px'

          setTimeout(() => {
            div.style.width = ''
            div.style.maxHeight = ''
          }, 150)
        })
      })
    }
  }, [collapsed])

  if (!display && displayStrategy === 'none') return null

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

export interface CollapseIconProps {
  collapsed: boolean
  className?: string
}
export function CollapseIcon({ collapsed, className }: CollapseIconProps) {
  return (
    <Icon
      icon={faChevronRight}
      className={mergeClassNames(
        'cursor-pointer px-1',
        'transition-transform transform',
        collapsed ? 'rotate-90' : '-rotate-90',
        className,
      )}
    />
  )
}
