import React from 'react'
import { useSelector } from 'react-redux'
import { noteSelectorSelectedAsIds } from 'src/state/selectors'
import { Note } from 'src/view/components'

export function NotesOpened() {
  const notes = useSelector( noteSelectorSelectedAsIds )
    .slice()
    .reverse()
    .map( id => <Note id={id} key={id} /> )
  return <div> {notes} </div>
}
