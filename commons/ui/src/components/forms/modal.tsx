import React, { useState } from 'react'

import { DivProps, mergeClassNames } from '../../util/class'
import { QuickProps } from '../../util/type'
import { Surface } from '../structure'

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

export function useModal(Content: JSX.Element) {
  const [opened, opened$set] = useState(false)

  function open() {
    opened$set(true)
  }
  function close() {
    opened$set(false)
  }

  return {
    open,
    close,
    Component: <Modal opened={opened}>{Content}</Modal>,
  }
}
