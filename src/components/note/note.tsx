import { Card, CardContent, CardHeader, IconButton, Typography } from '@material-ui/core'
import { Close, Delete, Edit, Save } from '@material-ui/icons'
import React, { Fragment } from 'react'
import { FloatingToolBox, InputContentEditable } from 'src/blocs'
import { NoteEditorProvider, useEditorNoteContext, useNoteEditorFieldProvider } from 'src/providers'
import { Key } from 'src/types'

export function Note( { id }: { id: string } ) {
  return (
    <NoteEditorProvider id={id}>
      <Card>
        <NoteHeader />
        <NoteContent />
      </Card>
    </NoteEditorProvider>
  )
}

function NoteContent() {
  const { editing, note } = useEditorNoteContext()
  const onChange = ( content: string ) => console.log( content )
  return (
    <CardContent>
      <Typography>Content :</Typography>
      <InputContentEditable content={note.content} editing={editing} onChange={onChange} />
    </CardContent>
  )
}

function NoteHeader() {
  const { id } = useEditorNoteContext()
  return <CardHeader action={<NoteHeaderAction />} title={<NoteStringItem field="title" />} subheader={id} />
}

function NoteHeaderAction() {
  const { modified, save, close, remove } = useEditorNoteContext()
  return (
    <div>
      <IconButton onClick={save} disabled={!modified}>
        <Save />
      </IconButton>
      <IconButton onClick={remove}>
        <Delete />
      </IconButton>
      <IconButton onClick={close}>
        <Close />
      </IconButton>
    </div>
  )
}

interface NoteStringItemProps {
  field: Key
}

const NoteStringItem = ( { field }: NoteStringItemProps ) => {
  const {
    field: { required, editable, editing, value },
    edit,
    save,
    remove,
  } = useNoteEditorFieldProvider( field )

  const onClick = editing ? save : edit
  const deleteButton = required || (
    <IconButton onClick={remove}>
      <Delete />
    </IconButton>
  )
  const tools = editable && (
    <Fragment>
      {deleteButton}
      <IconButton onClick={onClick}>{editing ? <Save /> : <Edit />}</IconButton>
    </Fragment>
  )

  return (
    <FloatingToolBox tools={tools}>
      <Typography>{value.old}</Typography>
    </FloatingToolBox>
  )
}
