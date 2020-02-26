import { Card, CardContent, CardHeader, IconButton, Typography } from '@material-ui/core'
import { Close, Delete, Edit, Save } from '@material-ui/icons'
import React, { Fragment, useState } from 'react'
import { FloatingToolBox, InputContentEditable } from 'src/blocs'
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
  return (
    <CardHeader
      action={<NoteHeaderAction />}
      title={<NoteStringItem />}
      subheader={note.id}
    />
  )
}

function NoteHeaderAction() {
  const { edit, save, close, remove, editing } = useNoteContext()
  return (
    <div>
      <IconButton onClick={editing ? save : edit}>{editing ? <Save /> : <Edit />}</IconButton>
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
  key: string
  required?: true
  value: string
  editing: boolean
  onSave: ( value: string ) => void
}

const NoteStringItem = ( { required, value, onSave }: NoteStringItemProps ) => {
  const [ editing, setEditing ] = useState( false )
  const onClickDelete = () => {
    setEditing( false )
  }
  const onClickSave = () => {
    setEditing( false )
  }
  const onClickEdit = () => setEditing( true )
  const onClick = editing ? onClickSave : onClickEdit
  const tools = (
    <Fragment>
      {required || <IconButton onClick={onClickDelete}><Delete /></IconButton>}
      <IconButton onClick={onClick}>{editing ? <Save /> : <Edit />}</IconButton>
    </Fragment>
  )
  return (
    <FloatingToolBox tools={tools}>
      <Typography>{value}</Typography>
    </FloatingToolBox>
  )
}
