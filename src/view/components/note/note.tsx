import { Card, CardContent, CardHeader, IconButton, Input, Typography } from '@material-ui/core'
import { Close, Delete, Edit, Save, Undo } from '@material-ui/icons'
import React, { ChangeEvent, Fragment } from 'react'
import {
  NoteEditorFieldProvider,
  NoteEditorProvider,
  useEditorNoteContext,
  useNoteEditorFieldProvider,
} from 'src/providers'
import { Key } from 'src/types/models'
import { FloatingToolBox, InputContentEditable } from 'src/view/blocs'

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
  return (
    <CardHeader
      action={<NoteHeaderAction />}
      title={
        <div>
          <NoteStringItem field="title" />
        </div>
      }
      subheader={id}
    />
  )
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
  return (
    <NoteEditorFieldProvider field={field}>
      <FloatingToolBox tools={<NoteFieldStringTools />}>
        <NoteFieldStringContent />
      </FloatingToolBox>
    </NoteEditorFieldProvider>
  )
}

const NoteFieldStringTools = () => {
  const {
    field: { required, editable, editing },
    edit,
    save,
    reset,
    remove,
  } = useNoteEditorFieldProvider()

  const onClick = editing ? save : edit
  const deleteButton = required || (
    <IconButton onClick={remove}>
      <Delete />
    </IconButton>
  )
  return editable ? (
    <Fragment>
      <IconButton onClick={onClick}>{editing ? <Save /> : <Edit />}</IconButton>
      <IconButton onClick={reset}><Undo /></IconButton>
      {deleteButton}
    </Fragment>
  ) : null
}

const NoteFieldStringContent = () => {
  const {
    field: { editing, value },
    edit,
    update,
  } = useNoteEditorFieldProvider()

  const onChange = ( event: ChangeEvent<HTMLInputElement> ) => update( event.target.value )

  if( editing ) {
    return <Input type="text" value={value.new} onChange={onChange} autoFocus />
  } else {
    return <Typography onDoubleClick={edit}>{value.old}</Typography>
  }
}
