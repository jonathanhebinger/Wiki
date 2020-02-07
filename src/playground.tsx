import { Card, CardContent, CardHeader, IconButton } from '@material-ui/core'
import { Close, Delete, Edit, Save } from '@material-ui/icons'
import constate from 'constate'
import React, { useCallback, useState } from 'react'
import ContentEditable, { ContentEditableEvent } from 'react-contenteditable'
import uuid from 'uuid'

interface INote {
  id: string
  title: string
  content: string
  creation: number
  modification: number
}

const notes: INote[] = []

export function createNote(): INote {
  return {
    id: uuid.v4(),
    title: 'New note',
    content: '42',
    creation: Date.now(),
    modification: Date.now(),
  }
}

function getNote( id: string ) {
  return notes.find( note => note.id === id )
}

function saveNote( update: INote ) {
  const note = getNote( update.id )
  if( note ) {
    update.modification = Date.now()
    Object.assign( note, update )
  } else {
    notes.push( update )
  }
}

export const [ NoteProvider, useNoteContext ] = constate( ( { note }: { note: INote } ) => {
  const [ editing, setEditing ] = useState( false )
  const edit = useCallback( () => setEditing( true ), [ setEditing ] )
  const save = () => {
    saveNote( note )
    setEditing( false )
  }

  return { editing, edit, save, note }
} )

export function Note() {
  const { editing, edit, save, note } = useNoteContext()

  const onChange = ( evt: ContentEditableEvent ) => {
    note.content = evt.target.value
  }

  const actions = (
    <div>
      <IconButton aria-label="edit" onClick={edit}>
        <Edit />
      </IconButton>
      <IconButton aria-label="save" onClick={save}>
        <Save />
      </IconButton>
      <IconButton aria-label="delete">
        <Delete />
      </IconButton>
      <IconButton aria-label="close">
        <Close />
      </IconButton>
    </div>
  )

  return (
    <Card>
      <CardHeader action={actions} title={note.title} subheader={note.id} />
      <CardContent>
        <ContentEditable
          html={note.content}
          disabled={!editing}
          onChange={onChange}
        />
        {/* https://www.npmjs.com/package/react-contenteditable */}
        {/* https://codesandbox.io/s/l91xvkox9l */}
      </CardContent>
    </Card>
  )
}
