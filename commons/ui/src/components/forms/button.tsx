import React from 'react'

import { mergeClassNames } from '../../util/class'
import { BaseProps } from '../../util/type'
import { getSurfaceClass, SurfaceProps } from '../structure/surface'

export type ButtonProps = BaseProps<
  Pick<SurfaceProps, 'contrast'> & {
    squared: boolean
    onClick?: () => void
  }
>

export function Button({
  contrast,
  squared,
  children,
  className,
  onClick,
}: ButtonProps) {
  const CLASS = mergeClassNames(
    getSurfaceClass({
      contrast,
      border: contrast ? 'none' : 'md',
      radius: squared ? 'none' : 'sm',
      shadow: 'lg',
    }),
    'px-1',
    'cursor-pointer uppercase font-bold text-center', //tw
    'border-gray-100', //tw
    contrast
      ? 'text-white' //tw
      : 'text-gray-400', //tw
    contrast
      ? 'hover:bg-gray-400 bg-gray-300' //tw
      : 'hover:bg-gray-100', //tw
    contrast
      ? 'active:bg-gray-500 transition-colors' //tw
      : 'active:bg-gray-300 transition-colors', //tw
    className,
  )

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation()
    onClick && onClick()
  }

  return (
    <button className={CLASS} onClick={handleClick}>
      {children}
    </button>
  )
}
