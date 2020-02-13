import React from 'react'
import { useSelector } from 'react-redux'
import { Note } from 'src/components'
import { noteSelectorSelectedAsIds } from 'src/selectors'

export function NotesOpened() {
  const notes = useSelector( noteSelectorSelectedAsIds )
    .slice()
    .reverse()
    .map( id => <Note id={id} key={id} /> )
  return <div> {notes} </div>
}
