import {
  Box,
  Button,
  ButtonGroup,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  Paper,
  Tab,
  Tabs,
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
import constate from 'constate'
import React, { useEffect, useState } from 'react'
import ContentEditable, { ContentEditableEvent } from 'react-contenteditable'
import { TabPanel } from 'src/blocs'

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
        <InputLinkProvider>
          <FormDialog />
        </InputLinkProvider>
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

interface ModalConfig {
  title: string
  content: React.ReactNode
  actions: React.ReactNode
}

const [ ModalProvider, useModalContext ] = constate( () => {
  const [ open, setOpen ] = useState( false )
  const [ config, setConfig ] = useState( {} as ModalConfig )
  const close = () => setOpen( false )
  return { open, config, close, setConfig }
} )

const Modal = () => {
  const { open, config, close } = useModalContext()
  const { title, content, actions } = config
  return (
    <Dialog open={open} onClose={close}>
      <DialogTitle>{title}</DialogTitle>
      <DialogContent>{content}</DialogContent>
      <DialogActions>{actions}</DialogActions>
    </Dialog>
  )
}

enum InputLinkType {
  INTERNAL,
  NOTES,
  EXTERNAL,
}

type InputChange = React.ChangeEvent<HTMLInputElement>
type Change = React.ChangeEvent<{}>

const [ InputLinkProvider, useInputLinkContext ] = constate( () => {
  const [ label, setLabel ] = useState( '' )
  const eLabelChange = ( event: InputChange ) => setLabel( event.target.value )

  const [ type, setType ] = React.useState( InputLinkType.INTERNAL )
  const eTabChange = ( event: Change, newValue: InputLinkType ) => setType( newValue )

  return { label, setLabel, eLabelChange, type, setType, eTabChange }
} )

export function useLinkInputDialog() {
  const { type: tab, eTabChange } = useInputLinkContext()

  const modal = useModalContext()

  useEffect( () => {
    modal.setConfig( {
      title: 'Add link',
      content: (
        <React.Fragment>
          <Paper square>
            <Tabs value={tab} indicatorColor="primary" textColor="primary" onChange={eTabChange}>
              <Tab label="External" value={InputLinkType.INTERNAL} />
              <Tab label="Notes" value={InputLinkType.NOTES} />
              <Tab label="Internal" value={InputLinkType.EXTERNAL} />
            </Tabs>
          </Paper>

          <TabPanel value={tab} index={InputLinkType.INTERNAL}>
            <InputLinkExternal />
          </TabPanel>

          <TabPanel value={tab} index={InputLinkType.NOTES}>
            <InputLinkNotes />
          </TabPanel>

          <TabPanel value={tab} index={InputLinkType.EXTERNAL}>
            <InputLinkInternal />
          </TabPanel>
        </React.Fragment>
      ),
      actions: (
        <React.Fragment>
          <Button onClick={modal.close} color="primary">
            Cancel
        </Button>
          <Button onClick={modal.close} color="primary">
            Subscribe
        </Button>
        </React.Fragment>
      ),
    } )
  }, [ eTabChange, modal, tab ] )
}

const InputLinkExternalLabel = () => {
  const { label, eLabelChange } = useInputLinkContext()
  return (
    <TextField
      margin="dense"
      label="Label"
      type="text"
      fullWidth
      value={label}
      onChange={eLabelChange}
    />
  )
}

const InputLinkExternal = () => {
  return (
    <React.Fragment>
      <InputLinkExternalLabel />
      <TextField margin="dense" label="Address" type="text" fullWidth />
    </React.Fragment>
  )
}

const InputLinkNotes = () => {
  return (
    <React.Fragment>
      <InputLinkExternalLabel />
      <TextField margin="dense" label="Title" type="text" fullWidth />
    </React.Fragment>
  )
}

const InputLinkInternal = () => {
  return (
    <React.Fragment>
      <InputLinkExternalLabel />
    </React.Fragment>
  )
}
