import { Typography } from '@material-ui/core'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { noteActionOpen } from 'src/actions'
import { noteSelectorSortedByModification } from 'src/selectors'
import { INote } from 'src/types'

export function NavigatorRecent() {
  const notes = useSelector( noteSelectorSortedByModification )
    .slice( 0, 10 )
    .map( note => <NavigatorRecentNote note={note} key={note.id} /> )

  return <React.Fragment>{notes}</React.Fragment>
}

function NavigatorRecentNote( { note: { id, title } }: { note: INote } ) {
  const dispatch = useDispatch()
  const open = () => dispatch( noteActionOpen( id ) )
  return (
    <Typography key={id} onClick={open}>
      {title}
    </Typography>
  )
}
