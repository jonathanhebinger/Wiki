import { Card, CardContent, CardHeader, IconButton } from '@material-ui/core'
import { Close, Delete, Edit, Save } from '@material-ui/icons'
import React from 'react'
import ContentEditable, { ContentEditableEvent } from 'react-contenteditable'
import { useNoteContext } from 'src/providers'

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
      <IconButton aria-label="delete" onClick={save}>
        <Delete />
      </IconButton>
      <IconButton aria-label="close" onClick={save}>
        <Close />
      </IconButton>
    </div>
  )

  return (
    <Card>
      <CardHeader action={actions} title={note.title} subheader={note.id} />
      <CardContent>
        <ContentEditable html={note.content} disabled={!editing} onChange={onChange} />
        {/* https://www.npmjs.com/package/react-contenteditable */}
        {/* https://codesandbox.io/s/l91xvkox9l */}
      </CardContent>
    </Card>
  )
}
