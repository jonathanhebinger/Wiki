import {
  Box,
  Button,
  ButtonGroup,
  Grid,
  List,
  ListItem,
  ListItemText,
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
  Link,
  LinkOff,
  Redo,
  Undo,
} from '@material-ui/icons'
import constate from 'constate'
import React, { useCallback, useEffect, useMemo, useState } from 'react'
import { useSelector } from 'react-redux'
import { createEditor, Text } from 'slate'
import { Editable, Slate, withReact } from 'slate-react'
import { noteSelectorAll } from 'src/state/selectors'
import { INote } from 'src/types/models'
import { TabPanel, useModalContext } from 'src/view/blocs'

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
  [
    { name: 'Link', icon: <Link />, command: 'createlink' },
    { name: 'Unlink', icon: <LinkOff />, command: 'unlink' },
  ],
]

interface ElementProps {
  attributes: any
  children: React.ReactElement
  element: any
}

const Element = ( { attributes, children, element }: ElementProps ) => {
  switch( element.type ) {
    case 'block-quote':
      return <blockquote {...attributes}>{children}</blockquote>
    case 'bulleted-list':
      return <ul {...attributes}>{children}</ul>
    case 'heading-one':
      return <h1 {...attributes}>{children}</h1>
    case 'heading-two':
      return <h2 {...attributes}>{children}</h2>
    case 'list-item':
      return <li {...attributes}>{children}</li>
    case 'numbered-list':
      return <ol {...attributes}>{children}</ol>
    default:
      return <p {...attributes}>{children}</p>
  }
}

interface LeafProps {
  attributes: any
  children: React.ReactElement
  leaf: Text
}

const Leaf = ( { attributes, children, leaf }: LeafProps ) => {
  if( leaf.bold ) {
    children = <strong>{children}</strong>
  }
  if( leaf.code ) {
    children = <code>{children}</code>
  }
  if( leaf.italic ) {
    children = <em>{children}</em>
  }
  if( leaf.underline ) {
    children = <u>{children}</u>
  }
  return <span {...attributes}>{children}</span>
}

export function InputContentEditable( {
  editing = true,
  content,
  ...props
}: {
  editing: boolean
  content: string
  onChange: ( newContent: string ) => void,
} ) {
  const editor = useMemo( () => withReact( createEditor() ), [] )

  const renderElement = useCallback( props => <Element {...props} />, [] )
  const renderLeaf = useCallback( props => <Leaf {...props} />, [] )

  const [ value, setValue ] = useState( [
    {
      type: 'paragraph',
      children: [ { text: 'A line of text in a paragraph.' } ],
    },
  ] )
  const onChange = ( newValue: any ) => setValue( newValue )
  return (
    <Slate editor={editor} value={value} onChange={onChange}>
      {editing && <InputContentEditableActions />}
      <Paper elevation={editing ? 1 : 0}>
        <Editable renderElement={renderElement} renderLeaf={renderLeaf} readOnly={!editing} />
      </Paper>
    </Slate>
  )
}

function InputContentEditableActions() {
  const { execute, Element } = useContentEditableCommand()

  const doAction = ( command: string ) => () => execute( command )

  const vGroups = actions.map( ( group, index ) => {
    const vActions = group.map( action => (
      <Button size="small" title={action.name} onClick={doAction( action.command )} key={action.command}>
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
    <React.Fragment>
      <Grid container justify="center">
        {vGroups}
      </Grid>
      <Box hidden>{Element}</Box>
    </React.Fragment>
  )
}

function useContentEditableCommand() {
  const [ Element, setElement ] = useState( null as React.ReactNode | null )
  const reset = useCallback( () => setElement( null ), [] )
  const execute = useCallback(
    ( command: string ) => {
      switch( command ) {
        case 'createlink':
          console.log( document.getSelection()?.getRangeAt( 0 ) )
          const createLinkOnClose = () => {
            reset()
          }
          setElement( <LinkInputDialog onValidate={createLinkOnClose} onCancel={reset} /> )
          break
        default:
          document.execCommand( command )
      }
    },
    [ reset ],
  )
  return { execute, Element }
}

enum LinkInputType {
  INTERNAL,
  NOTES,
  EXTERNAL,
}

const [ LinkInputProvider, useLinkInputContext ] = constate( () => {
  const [ label, setLabel ] = useState( '' )

  const [ type, setType ] = React.useState( LinkInputType.INTERNAL )

  return { label, setLabel, type, setType }
} )

interface LinkInputDialogProps {
  onValidate: () => void
  onCancel: () => void
}

export function LinkInputDialog( { onValidate, onCancel }: LinkInputDialogProps ) {
  const { setConfig, open, close } = useModalContext()

  useEffect( () => {
    setConfig( {
      title: 'Create link',
      content: <LinkInputDialogContent />,
      actions: <LinkInputDialogActions />,
      wrapper: LinkInputProvider,
      onClose: onCancel,
      width: 'md',
    } )
    open()
    return () => close()
  }, [ setConfig, open, close, onCancel ] )

  return <React.Fragment />
}

const LinkInputDialogContent = () => {
  const { type, setType } = useLinkInputContext()

  const eTabChange = useCallback( ( e: React.ChangeEvent<{}>, value: LinkInputType ) => setType( value ), [ setType ] )

  return (
    <React.Fragment>
      <Box marginBottom={2.5}>
        <LinkInputExternalLabel />
      </Box>

      <Paper square>
        <Tabs value={type} indicatorColor="primary" textColor="primary" onChange={eTabChange}>
          <Tab label="External" value={LinkInputType.INTERNAL} />
          <Tab label="Notes" value={LinkInputType.NOTES} />
          <Tab label="Internal" value={LinkInputType.EXTERNAL} />
        </Tabs>
      </Paper>

      <TabPanel value={type} index={LinkInputType.INTERNAL}>
        <LinkInputExternal />
      </TabPanel>

      <TabPanel value={type} index={LinkInputType.NOTES}>
        <LinkInputNotes />
      </TabPanel>

      <TabPanel value={type} index={LinkInputType.EXTERNAL}>
        <LinkInputInternal />
      </TabPanel>
    </React.Fragment>
  )
}

const LinkInputDialogActions = () => {
  const { close } = useModalContext()
  return (
    <React.Fragment>
      <Button onClick={close} color="primary">
        Cancel
      </Button>
      <Button onClick={close} color="primary" disabled>
        Validate
      </Button>
    </React.Fragment>
  )
}

const LinkInputExternalLabel = () => {
  const { label, setLabel } = useLinkInputContext()
  const eLabelChange = useCallback( ( e: React.ChangeEvent<HTMLInputElement> ) => setLabel( e.target.value ), [ setLabel ] )
  return <TextField margin="dense" label="Label" type="text" fullWidth value={label} onChange={eLabelChange} required />
}

const LinkInputExternal = () => {
  return (
    <React.Fragment>
      <TextField margin="dense" label="Address" type="text" fullWidth required />
    </React.Fragment>
  )
}

const LinkInputNotes = () => {
  const [ search, setSearch ] = useState( '' )

  const onSearch = ( e: React.ChangeEvent<HTMLInputElement> ) => setSearch( e.target.value )

  const select = useCallback( ( note: INote ) => {
    setSearch( note.title )
  }, [] )

  const notes = useSelector( noteSelectorAll )

  const searchResult = useMemo( () => {
    return notes.filter( note => note.title.includes( search ) ).slice( 0, 10 )
  }, [ search, notes ] )

  const vSearchResult = useMemo(
    () =>
      searchResult.map( note => {
        const onClick = () => select( note )

        return (
          <ListItem key={note.id} button>
            <ListItemText primary={note.title} onClick={onClick} />
          </ListItem>
        )
      } ),
    [ searchResult, select ],
  )

  return (
    <React.Fragment>
      <TextField type="text" value={search} onChange={onSearch} required margin="dense" label="Title" fullWidth />
      <List>{vSearchResult}</List>
    </React.Fragment>
  )
}

const LinkInputInternal = () => {
  return (
    <React.Fragment>
      <LinkInputExternalLabel />
    </React.Fragment>
  )
}
