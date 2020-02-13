import { IconButton } from '@material-ui/core'
import { Add, Close } from '@material-ui/icons'
import React from 'react'
import { useDispatch } from 'react-redux'
import { noteThunkCloseAll, noteThunkCreate } from 'src/actions'

export function NavigatorActions() {
  const dispatch = useDispatch()

  const add = () => dispatch( noteThunkCreate() )
  const closeAll = () => dispatch( noteThunkCloseAll() )

  return (
    <React.Fragment>
      <IconButton aria-label="add note" onClick={add}>
        <Add />
      </IconButton>
      <IconButton aria-label="close all" onClick={closeAll}>
        <Close />
      </IconButton>
    </React.Fragment>
  )
}
