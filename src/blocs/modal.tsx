import { Dialog, DialogActions, DialogContent, DialogTitle } from '@material-ui/core'
import constate from 'constate'
import React, { useCallback, useState } from 'react'

interface ModalConfig {
  title: string
  content: React.ReactNode
  actions: React.ReactNode
  wrapper?: React.FunctionComponent<{ [ index: string ]: any } & { children: React.ReactNode }>
}

export const [ ModalProvider, useModalContext ] = constate( () => {
  const [ isOpen, setOpen ] = useState( false )
  const [ config, setConfig ] = useState( {} as ModalConfig )
  const open = useCallback( () => setOpen( true ), [] )
  const close = useCallback( () => setOpen( false ), [] )
  return { isOpen, open, config, close, setConfig }
} )

export const Modal = () => {
  const { isOpen, config, close } = useModalContext()
  const { title, content, actions, wrapper: Wrapper = React.Fragment } = config
  return (
    <Wrapper>
      <Dialog open={isOpen} onClose={close}>
        <DialogTitle>{title}</DialogTitle>
        <DialogContent>{content}</DialogContent>
        <DialogActions>{actions}</DialogActions>
      </Dialog>
    </Wrapper>
  )
}
