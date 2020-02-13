import { Card, CardContent, CardHeader, IconButton, Typography } from '@material-ui/core'
import { Close, Delete, Edit, Save } from '@material-ui/icons'
import React from 'react'
import { InputContentEditable } from 'src/blocs'
import { NoteProvider, useNoteContext } from 'src/providers'

export function Note( { id }: { id: string } ) {
  return (
    <NoteProvider id={id}>
      <Card>
        <NoteHeader />
        <NoteContent />
      </Card>
    </NoteProvider>
  )
}

function NoteContent() {
  const { editing, note } = useNoteContext()
  const onChange = ( content: string ) => console.log( content )
  return (
    <CardContent>
      <Typography>Content :</Typography>
      <InputContentEditable content={note.content} editing={editing} onChange={onChange} />
    </CardContent>
  )
}

function NoteHeader() {
  const { note } = useNoteContext()
  return <CardHeader action={<NoteHeaderAction />} title={note.title} subheader={note.id} />
}

function NoteHeaderAction() {
  const { edit, save, close, remove, editing } = useNoteContext()
  return (
    <div>
      <IconButton aria-label="save" onClick={editing ? save : edit}>
        {editing ? <Save /> : <Edit />}
      </IconButton>
      <IconButton aria-label="delete" onClick={remove}>
        <Delete />
      </IconButton>
      <IconButton aria-label="close" onClick={close}>
        <Close />
      </IconButton>
    </div>
  )
}
