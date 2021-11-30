import React from 'react'

import { mergeClassNames } from '../../util/class'
import { QuickProps } from '../../util/type'
import { getSurfaceClass, SurfaceProps } from '../structure/surface'

export type ButtonProps = Pick<SurfaceProps, 'contrast' | 'squared'> &
  QuickProps<HTMLButtonElement, 'onClick'>

export function Button({
  contrast,
  squared,
  children,
  className,
  htmlProps,
  onClick,
}: ButtonProps) {
  const CLASS = mergeClassNames(
    getSurfaceClass({
      contrast,
      border: contrast ? 'none' : 'md',
      radius: 'sm',
      shadow: 'lg',
      squared,
    }),
    'px-1',
    'cursor-pointer uppercase font-bold text-center', //tw
    'border-gray-100', //tw
    contrast
      ? 'text-white' //tw
      : 'text-gray-400', //tw
    contrast
      ? 'bg-gray-300 hover:bg-gray-400' //tw
      : 'hover:bg-gray-100', //tw
    contrast
      ? 'active:bg-gray-500 transition-colors' //tw
      : 'active:bg-gray-300 transition-colors', //tw
    className,
  )

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation()
    onClick && onClick(e)
  }

  return (
    <button
      className={CLASS}
      {...{
        onClick: handleClick,
        ...htmlProps,
      }}
    >
      {children}
    </button>
  )
}
