import { Typography } from '@material-ui/core'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { noteSelectorSortedByModification } from 'src/selectors'
import { noteOpen } from 'src/state/actions'
import { INote } from 'src/types/models'

export function NavigatorRecent() {
  const notes = useSelector( noteSelectorSortedByModification )
    .slice( 0, 10 )
    .map( note => <NavigatorRecentNote note={note} key={note.id} /> )

  return <React.Fragment>{notes}</React.Fragment>
}

function NavigatorRecentNote( { note: { id, title } }: { note: INote } ) {
  const dispatch = useDispatch()
  const open = () => dispatch( noteOpen( id ) )
  return (
    <Typography key={id} onClick={open}>
      {title}
    </Typography>
  )
}
