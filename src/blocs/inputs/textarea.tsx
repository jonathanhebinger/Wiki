import {
  Box,
  Button,
  ButtonGroup,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Divider,
  FormControlLabel,
  Grid,
  Paper,
  Radio,
  RadioGroup,
  TextField,
} from '@material-ui/core'
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
import React, { ChangeEvent, useState } from 'react'
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
    { name: 'Align left', icon: <FormatAlignLeft />, command: 'justifyLeft' },
    { name: 'Align center', icon: <FormatAlignCenter />, command: 'justifyCenter' },
    { name: 'Align right', icon: <FormatAlignRight />, command: 'justifyRight' },
    { name: 'Align justify', icon: <FormatAlignJustify />, command: 'justifyFull' },
  ],
  [
    { name: 'Indent', icon: <FormatIndentIncrease />, command: 'indent' },
    { name: 'Outdent', icon: <FormatIndentDecrease />, command: 'outdent' },
  ],
  [
    { name: 'Unordered list', icon: <FormatListBulleted />, command: 'insertUnorderedList' },
    { name: 'Ordered list', icon: <FormatListNumbered />, command: 'insertOrderedList' },
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
        <FormDialog />
      </Paper>
    </div>
  )
}

function InputContentEditableActions() {
  const doAction = ( command: string ) => () => execCommand( command )
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
    return (
      <Box mx={0.5} key={index}>
        <ButtonGroup>{vActions}</ButtonGroup>
      </Box>
    )
  } )
  return (
    <Grid container justify="center">
      {vGroups}
    </Grid>
  )
}

function execCommand( command: string ) {
  switch( command ) {
    case 'createlink':
      break
    default:
      document.execCommand( command )
  }
}

export function FormDialog() {
  const [ open, setOpen ] = useState( false )
  const [ type, setType ] = useState( 'external' )

  const handleClickOpen = () => {
    setOpen( true )
  }

  const handleClose = () => {
    setOpen( false )
  }

  const eTypeChange = ( event: ChangeEvent<HTMLInputElement> ) => setType( event.target.value )

  let form

  if( type === 'external' ) {
    form = <TextField margin="dense" id="name" label="Email Address" type="email" fullWidth />
  }
  if( type === 'internal' ) {
    form =  <React.Fragment/> <TextField margin="dense" id="name" label="Email Address" type="email" fullWidth />
  }

  return (
    <div>
      <Button variant="outlined" color="primary" onClick={handleClickOpen}>
        Open form dialog
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Add link</DialogTitle>
        <DialogContent>
          <DialogContentText>
            To subscribe to this website, please enter your email address here. We will send updates
            occasionally.
          </DialogContentText>
          <RadioGroup value={type} onChange={eTypeChange} row>
            <FormControlLabel
              value="external"
              control={<Radio color="primary" />}
              label="External"
              labelPlacement="start"
            />
            <FormControlLabel
              value="internal"
              control={<Radio color="primary" />}
              label="Internal"
              labelPlacement="end"
            />
          </RadioGroup>
          <Divider />
          {form}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleClose} color="primary">
            Subscribe
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  )
}
