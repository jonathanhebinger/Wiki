import { Box, Button, ButtonGroup, Grid, Paper, SvgIcon } from '@material-ui/core'
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
import React, { useCallback, useMemo, useState } from 'react'
import { createEditor, Editor, Text, Transforms } from 'slate'
import { withHistory } from 'slate-history'
import { Editable, ReactEditor, Slate, useSlate, withReact } from 'slate-react'
import { Element, Leaf, LeafAttributes } from 'src/view/blocs'

function isMarkActive( editor: ReactEditor, format: keyof LeafAttributes ) {
  const [ match ] = Editor.nodes( editor, {
    match: node => node[ format ] === true,
    universal: true,
  } )
  return !!match
}

function toggleMark( editor: ReactEditor, format: keyof LeafAttributes ) {
  const isActive = isMarkActive( editor, format )
  Transforms.setNodes(
    editor,
    { [ format ]: isActive ? null : true },
    { match: Text.isText, split: true },
  )
}

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

const leafCommandEventBuilder = ( format: keyof LeafAttributes ) => ( editor: ReactEditor ) =>
  () => toggleMark( editor, format )
const leafToolbarButtonBuilder = ( name: string, Icon: typeof SvgIcon, format: keyof LeafAttributes ) =>
  ( { name, Icon, command: leafCommandEventBuilder( format ) } )
export const actions2 = [
  [
    leafToolbarButtonBuilder( 'Bold', FormatBold, 'bold' ),
    leafToolbarButtonBuilder( 'Italic', FormatItalic, 'italic' ),
    leafToolbarButtonBuilder( 'Underline', FormatUnderlined, 'underline' ),
    leafToolbarButtonBuilder( 'Strikethrough', FormatStrikethrough, 'strikethrough' ),
  ],
]

interface InputContentEditableProps {
  editing: boolean
  content: string
  onChange: ( newContent: string ) => void
}

export function InputContentEditable( { editing, content, ...props }: InputContentEditableProps ) {
  const editor = useMemo( () => withHistory( withReact( createEditor() ) ), [] )

  const renderElement = useCallback( props => <Element {...props} />, [] )
  const renderLeaf = useCallback( props => <Leaf {...props} />, [] )

  const [ value, setValue ] = useState( [
    {
      type: 'paragraph',
      children: [ { text: 'A line of text in a paragraph.' } ],
    },
  ] )
  const onChange = ( newValue: any ) => setValue( newValue )

  if( editing ) {
    return (
      <Slate editor={editor} value={value} onChange={onChange} >
        <InputContentEditableActions />
        <Paper elevation={1}>
          <Editable
            renderElement={renderElement}
            renderLeaf={renderLeaf}
            autoFocus
          />
        </Paper>
      </Slate>
    )
  } else {
    return (
      <Slate editor={editor} value={value} onChange={onChange} >
        <Editable
          renderElement={renderElement}
          renderLeaf={renderLeaf}
          readOnly
        />
      </Slate>
    )
  }
}

function InputContentEditableActions() {
  const editor = useSlate()

  const vGroups = actions2.map( ( group, index ) => {
    const vActions = group.map( ( { name, command, Icon } ) => (
      <Button size="small" title={name} onClick={command( editor )} key={name}>
        <Icon />
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

/*
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
*/
