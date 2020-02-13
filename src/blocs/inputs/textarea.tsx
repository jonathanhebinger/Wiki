import { Button, ButtonGroup, Paper } from '@material-ui/core'
import {
  FormatAlignCenter,
  FormatAlignJustify,
  FormatAlignLeft,
  FormatAlignRight,
  FormatBold,
  FormatIndentDecrease,
  FormatIndentIncrease,
  FormatItalic,
  FormatListBulleted,
  FormatListNumbered,
  FormatStrikethrough,
  FormatUnderlined,
  Redo,
  Undo,
} from '@material-ui/icons'
import React from 'react'
import ContentEditable, { ContentEditableEvent } from 'react-contenteditable'

export const actions = [
  [
    { name: 'Undo', icon: <Undo />, command: 'undo' },
    { name: 'Redo', icon: <Redo />, command: 'redo' },
  ],
  [
    { name: 'Bold', icon: <FormatBold />, command: 'bold' },
    { name: 'Italic', icon: <FormatItalic />, command: 'italic' },
    { name: 'Underline', icon: <FormatUnderlined />, command: 'underline' },
    { name: 'Strikethrough', icon: <FormatStrikethrough />, command: 'strikethrough' },
  ],
  [
    { name: 'Bold', icon: <FormatAlignLeft />, command: 'justifyLeft' },
    { name: 'Bold', icon: <FormatAlignCenter />, command: 'justifyCenter' },
    { name: 'Bold', icon: <FormatAlignRight />, command: 'justifyRight' },
    { name: 'Bold', icon: <FormatAlignJustify />, command: 'justifyFull' },
  ],
  [
    { name: 'Bold', icon: <FormatIndentIncrease />, command: 'indent' },
    { name: 'Bold', icon: <FormatIndentDecrease />, command: 'outdent' },
  ],
  [
    { name: 'Bold', icon: <FormatListBulleted />, command: 'insertUnorderedList' },
    { name: 'Bold', icon: <FormatListNumbered />, command: 'insertOrderedList' },
  ],
]

/*
    <a href="#" data-command='h1'>H1</a>
    <a href="#" data-command='h2'>H2</a>
    <a href="#" data-command='createlink'><i class='fa fa-link'></i></a>
    <a href="#" data-command='unlink'><i class='fa fa-unlink'></i></a>
    <a href="#" data-command='insertimage'><i class='fa fa-image'></i></a>
    <a href="#" data-command='p'>P</a>
    <a href="#" data-command='subscript'><i class='fa fa-subscript'></i></a>
    <a href="#" data-command='superscript'><i class='fa fa-superscript'></i></a>
*/
export function InputContentEditable( {
  editing = true,
  content,
  onChange,
}: {
  editing: boolean
  content: string
  onChange: ( newContent: string ) => void,
} ) {
  const vOnChange = ( evt: ContentEditableEvent ) => onChange( evt.target.value )
  return (
    <div>
      {editing && <InputContentEditableActions />}
      <Paper elevation={editing ? 1 : 0}>
        <ContentEditable html={content} disabled={!editing} onChange={vOnChange} />
      </Paper>
    </div>
  )
}

function InputContentEditableActions() {
  const doAction = ( command: string ) => () => document.execCommand( command )
  const vGroups = actions.map( ( group, index ) => {
    const vActions = group.map( action => (
      <Button
        size="small"
        title={action.name}
        onClick={doAction( action.command )}
        key={action.command}
      >
        {action.icon}
      </Button>
    ) )
    return <ButtonGroup key={index}>{vActions}</ButtonGroup>
  } )
  return (
    <React.Fragment>
      {vGroups}
    </React.Fragment>
  )
}
