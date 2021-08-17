import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogProps,
  DialogTitle,
} from '@material-ui/core'
import constate from 'constate'
import React, { useCallback, useState } from 'react'

interface ModalConfig {
  title: string
  content: React.ReactNode
  actions: React.ReactNode
  wrapper?: React.FunctionComponent<
    { [index: string]: any } & { children: React.ReactNode }
  >
  onOpen?: () => void
  onClose?: () => void
  width?: DialogProps['maxWidth']
}

export const [ModalProvider, useModalContext] = constate(() => {
  const [config, setConfig] = useState({} as ModalConfig)

  const [isOpen, setOpen] = useState(false)

  const { onOpen, onClose } = config

  const open = useCallback(() => {
    setOpen(true)
    if (onOpen) {
      onOpen()
    }
  }, [onOpen])

  const close = useCallback(() => {
    setOpen(false)
    if (onClose) {
      onClose()
    }
  }, [onClose])

  return { isOpen, open, config, close, setConfig }
})

export const Modal = () => {
  const { isOpen, config, close } = useModalContext()
  const { title, content, actions, wrapper: Wrapper = React.Fragment } = config
  return (
    <Wrapper>
      <Dialog open={isOpen} onClose={close} maxWidth={config.width}>
        <DialogTitle>{title}</DialogTitle>
        <DialogContent>{content}</DialogContent>
        <DialogActions>{actions}</DialogActions>
      </Dialog>
    </Wrapper>
  )
}
