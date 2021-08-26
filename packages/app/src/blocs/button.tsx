import React from 'react'
import { Surface_Props } from 'src/blocs/structure/surface'
import { Surface$class } from 'src/blocs/structure/surface.class'
import { QuickProps } from 'src/blocs/type'
import { mergeClassNames } from 'src/blocs/util'

export type ButtonProps = Pick<Surface_Props, 'contrast'> &
  QuickProps<HTMLButtonElement, 'onClick'>

export function Button({
  contrast,
  children,
  className,
  htmlProps,
  onClick,
}: ButtonProps) {
  const CLASS = mergeClassNames(
    Surface$class({
      contrast,
      border: contrast ? 'none' : 'md',
      radius: 'sm',
      shadow: 'lg',
    }),
    'px-1',
    'cursor-pointer uppercase font-bold text-center', //tw
    'border-gray-300', //tw
    contrast
      ? 'text-white' //tw
      : 'text-gray-400', //tw
    contrast
      ? 'bg-gray-300 hover:bg-gray-400' //tw
      : 'hover:bg-gray-200', //tw
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
