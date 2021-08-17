import constate from 'constate'
import { useState } from 'react'
import { Surface } from 'src/blocs/surface'

export type Modal_Props = {
  children?: React.ReactNode
  className?: string
  bgClassName?: string
  control: ModalControl
}

const BG_POSITION = 'absolute -inset-0 z-10' //tw
const BG_BACKGROUND = 'bg-gray-500 bg-opacity-25' //tw
const BG_FLEX = 'flex items-center justify-center' //tw

const BG_CLASS = `${BG_POSITION} ${BG_BACKGROUND} ${BG_FLEX}`

export function Modal({
  className = '',
  bgClassName = '',
  children,
  control,
}: Modal_Props) {
  if (!control.opened) return null

  return (
    <ModalControlContextProvider control={control}>
      <div
        className={`${BG_CLASS} ${bgClassName}`}
        onClick={control.handleClickOut}
      >
        <Surface
          className={`bg-white ${className}`}
          htmlProps={{
            onClick: e => e.stopPropagation(),
          }}
        >
          {children}
        </Surface>
      </div>
    </ModalControlContextProvider>
  )
}

export type ModalControlProps = {
  onClose?: () => void
  closeOnClickOut?: boolean
}
export type ModalControl = {
  opened: boolean
  open: () => void
  close: () => void
  handleClickOut: () => void
}
export function useModalControl({
  onClose,
  closeOnClickOut = false,
}: ModalControlProps = {}): ModalControl {
  const [opened, opened$set] = useState(false)

  function close() {
    opened$set(false)
    onClose && onClose()
  }
  function open() {
    opened$set(true)
  }
  function handleClickOut() {
    closeOnClickOut && close()
  }

  return {
    opened,
    open,
    close,
    handleClickOut,
  }
}

export const [ModalControlContextProvider, useModalControlContext] = constate(
  ({ control }: { control: ModalControl }) => {
    return control
  },
)
