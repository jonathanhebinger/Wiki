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
import React, { MouseEvent, useCallback, useMemo, useState } from 'react'
import { createEditor, Editor, Path, Text, Transforms } from 'slate'
import { withHistory } from 'slate-history'
import { Editable, ReactEditor, Slate, useSlate, withReact } from 'slate-react'
import { Element, ElementType, Leaf, LeafAttributes } from 'src/view/blocs'

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

const LIST_TYPES = [ 'numbered-list', 'bulleted-list' ]

const isBlockActive = ( editor: ReactEditor, format: string ) => {
  const [ match ] = Editor.nodes( editor, {
    match: node => node.type === format,
  } )
  return !!match
}

const toggleBlock = ( editor: ReactEditor, format: string ) => {
  const isActive = isBlockActive( editor, format )

  Transforms.unwrapNodes( editor, {
    match: node => LIST_TYPES.includes( node.type ),
    split: true,
  } )

  switch( format ) {
    case ElementType.List.Numbered:
    case ElementType.List.Bulleted: {
      const type = isActive
        ? ElementType.Paragraph
        : ElementType.List.Item
      Transforms.setNodes( editor, { type } )
      if( !isActive ) {
        Transforms.wrapNodes( editor, {
          type: format,
          children: [],
        } )
      }
      break
    }
    default:
      const type = isActive
        ? ElementType.Paragraph
        : format
      Transforms.setNodes( editor, { type } )
  }

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

type Command = ( editor: ReactEditor ) => ( event: MouseEvent<any, any> ) => void
type IsActive = ( editor: ReactEditor ) => boolean

function toolbarButtonData(
  name: string,
  Icon: typeof SvgIcon,
  command: Command,
  isActive?: IsActive,
) {
  return {
    name,
    Icon,
    command,
    isActive,
  }
}

function leafToolbarFormatButtonData(
  name: string,
  Icon: typeof SvgIcon,
  format: keyof LeafAttributes,
) {
  return toolbarButtonData(
    name,
    Icon,
    editor => () => toggleMark( editor, format ),
    editor => isMarkActive( editor, format ),
  )
}

const unorderedListButtonData = toolbarButtonData(
  'Unordered list',
  FormatListBulleted,
  editor => () => toggleBlock( editor, 'bulleted-list' ),
  editor => isBlockActive( editor, 'bulleted-list' ),
)

const orderedListButtonData = toolbarButtonData(
  'Ordered list',
  FormatListNumbered,
  editor => () => toggleBlock( editor, 'numbered-list' ),
  editor => isBlockActive( editor, 'numbered-list' ),
)

export const actions2 = [
  [
    toolbarButtonData( 'Undo', Undo, editor => () => editor.undo() ),
    toolbarButtonData( 'Redo', Redo, editor => () => editor.redo() ),
  ],
  [
    leafToolbarFormatButtonData( 'Bold', FormatBold, 'bold' ),
    leafToolbarFormatButtonData( 'Italic', FormatItalic, 'italic' ),
    leafToolbarFormatButtonData( 'Underline', FormatUnderlined, 'underline' ),
    leafToolbarFormatButtonData( 'Strikethrough', FormatStrikethrough, 'strikethrough' ),
  ],
  [
    unorderedListButtonData,
    orderedListButtonData,
  ],
]

interface InputContentEditableProps {
  editing: boolean
  content: string
  onChange: ( newContent: string ) => void
}

export function InputContentEditable( { editing }: InputContentEditableProps ) {
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

  const onKeyDown = useCallback( ( event: React.KeyboardEvent<any> ) => {
    switch( event.key ) {
      case 'Enter':
        const nodeEntryItem = Editor.above( editor,
          { match: node => node.type === 'list-item' },
        )
        if( nodeEntryItem ) {
          const [ item, itemPath ] = nodeEntryItem
          const listPath = Path.parent( itemPath )
          if( Editor.isEmpty( editor, item ) ) {
            const nextPath = Path.next( listPath )
            Transforms.removeNodes( editor, { at: itemPath } )
            Transforms.insertNodes( editor,
              { type: 'paragraph', children: [] },
              { at: nextPath } )
            Transforms.select( editor, nextPath )
            event.preventDefault()
          }
        }
        break
    }
  }, [ editor ] )

  if( editing ) {
    return (
      <Slate editor={editor} value={value} onChange={onChange} >
        <InputContentEditableActions />
        <Paper elevation={1}>
          <Editable
            renderElement={renderElement}
            renderLeaf={renderLeaf}
            autoFocus
            onKeyDown={onKeyDown}
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
    const vActions = group.map( ( { name, command, Icon, isActive } ) => (
      <Button
        key={name}
        size="small"
        title={name}
        onClick={command( editor )}
        color={isActive && isActive( editor ) ? 'primary' : undefined}
      >
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
