import { IconButton } from '@material-ui/core'
import { Add, Close } from '@material-ui/icons'
import React from 'react'
import { useDispatch } from 'react-redux'
import { noteCloseAll, noteCreate } from 'src/state/actions'

export function NavigatorActions() {
  const dispatch = useDispatch()

  const add = () => dispatch( noteCreate() )
  const closeAll = () => dispatch( noteCloseAll() )

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
