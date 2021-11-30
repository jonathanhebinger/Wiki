import constate from 'constate'
import React, { useState } from 'react'

import { mergeClassNames } from '../../util/class'
import { Surface } from '../structure'

export namespace Dialog {
  export type Config = {
    Content: React.ReactNode
    className?: string
    bgClassName?: string
    clickOutsideHandler?: Dialog.On$ClickOutside
  }
  export type Context = {
    $open: $Open
    $close: $Close
  }

  export type $Open = (config: Config) => $Close
  export type $Close = () => void
  export type On$ClickOutside = (context: Context) => void
}

export const DIALOG_BG_CLASS = mergeClassNames(
  'h-full w-full overflow-auto', //tw
  'fixed -inset-0 z-10', //tw
  'bg-gray-500 bg-opacity-25', //tw
  'flex items-center justify-center', //tw
)

export const [DialogContextProvider, useDialogContext] = constate(() => {
  const [config, config$set] = useState<Dialog.Config>()

  const $open: Dialog.$Open = config => {
    config$set(config)
    return close
  }
  const $close: Dialog.$Close = () => {
    config$set(undefined)
  }

  return { config, $open, $close }
})

export function Dialog() {
  const { config, $open, $close } = useDialogContext()

  if (config) {
    const { Content, clickOutsideHandler, bgClassName, className } = config

    return (
      <div
        className={`${DIALOG_BG_CLASS} ${bgClassName}`}
        onClick={() => {
          clickOutsideHandler && clickOutsideHandler({ $close, $open })
        }}
      >
        <Surface
          className={`bg-white ${className}`}
          htmlProps={{
            onClick: e => e.stopPropagation(),
          }}
        >
          {Content}
        </Surface>
      </div>
    )
  } else {
    return null
  }
}
