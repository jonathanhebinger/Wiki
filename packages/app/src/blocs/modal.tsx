import { useState } from 'react'
import { Surface } from 'src/blocs/structure/surface'
import { QuickProps } from 'src/blocs/type'
import { DivProps, mergeClassNames } from 'src/blocs/util'

export type Modal_Props = QuickProps & {
  opened: boolean
  onClickOut?: () => void
  backgroundProps?: DivProps
}

export const MODAL_BG_CLASS = mergeClassNames(
  'h-full w-full overflow-auto', //tw
  'fixed -inset-0 z-10', //tw
  'bg-gray-500 bg-opacity-25', //tw
  'flex items-center justify-center', //tw
)

export function Modal({
  className = '',
  children,
  opened,
  onClickOut,
  htmlProps,
  backgroundProps,
}: Modal_Props) {
  if (!opened) return null

  return (
    <div
      className={`${MODAL_BG_CLASS} ${backgroundProps?.className || ''}`}
      onClick={onClickOut}
      {...backgroundProps}
    >
      <Surface
        className={`bg-white ${className}`}
        htmlProps={{
          onClick: e => e.stopPropagation(),
          ...htmlProps,
        }}
      >
        {children}
      </Surface>
    </div>
  )
}
