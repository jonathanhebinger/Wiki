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

import { Leaf, LeafAttributes } from './editor.leaf'
import { EDITOR_ELEMENT, EditorElement } from './element'
import { SlateList } from './list'

function isMarkActive( editor: ReactEditor, format: keyof LeafAttributes ) {
  const [ match ] = Editor.nodes( editor, {
    match: node => node[ format ] === true,
    universal: true,
  } )
  return !!match
}

function toggleMark( editor: ReactEditor, format: keyof LeafAttributes ) {
  const isActive = isMarkActive( editor, format )
  Transforms.setNodes( editor,
    { [ format ]: isActive ? null : true },
    { match: Text.isText, split: true },
  )
}

const isBlockActive = ( editor: ReactEditor, format: string ) => {
  const [ match ] = Editor.nodes( editor, {
    match: node => node.type === format,
  } )
  return !!match
}

const toggleBlock = ( editor: ReactEditor, format: string ) => {
  switch( format ) {
    case EDITOR_ELEMENT.LIST.VARIANT.ORDERED:
    case EDITOR_ELEMENT.LIST.VARIANT.UNORDERED:
      SlateList.toggle( editor, { variant: format as any } )
      break
    default:
      SlateList.remove( editor )
      const type = isBlockActive( editor, format )
        ? EDITOR_ELEMENT.PARAGRAPH
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

interface ToolbarButtonData {
  Icon: typeof SvgIcon
  name: string
  command: Command
  isActive?: IsActive
}

function toolbarButtonData(
  Icon: typeof SvgIcon,
  name: string,
  command: Command,
  isActive?: IsActive,
): ToolbarButtonData {
  return {
    Icon,
    name,
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
    Icon,
    name,
    editor => () => toggleMark( editor, format ),
    editor => isMarkActive( editor, format ),
  )
}

const unorderedListButtonData = toolbarButtonData(
  FormatListBulleted,
  'Unordered list',
  editor => () => toggleBlock( editor, EDITOR_ELEMENT.LIST.VARIANT.UNORDERED ),
  editor => isBlockActive( editor, EDITOR_ELEMENT.LIST.VARIANT.UNORDERED ),
)

const orderedListButtonData = toolbarButtonData(
  FormatListNumbered,
  'Ordered list',
  editor => () => toggleBlock( editor, EDITOR_ELEMENT.LIST.VARIANT.ORDERED ),
  editor => isBlockActive( editor, EDITOR_ELEMENT.LIST.VARIANT.ORDERED ),
)

export const actions2 = [
  [
    toolbarButtonData( Undo, 'Undo', editor => () => editor.undo() ),
    toolbarButtonData( Redo, 'Redo', editor => () => editor.redo() ),
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

  const renderElement = useCallback( props => <EditorElement {...props} />, [] )
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
            const next = Path.next( listPath )
            Transforms.removeNodes( editor, { at: itemPath } )
            Transforms.insertNodes( editor,
              { type: 'paragraph', children: [] },
              { at: next } )
            Transforms.select( editor, next )
            event.preventDefault()
          }
        }
        break
    }
  }, [ editor ] )

  const [ ref, setRef ] = useState()
  editor.focus = ( path?: Path ) => {
    if( ref && ref.focus ) {
      if( path ) {
        Transforms.select( editor, path )
      }
      ref.focus()
    }
  }

  const [ info, setInfo ] = useState( JSON.stringify( editor.selection ) )

  const setInfoEvent = () => {
    setInfo( JSON.stringify( [ ...Editor.nodes( editor, { mode: 'highest' } ) ].length ) )
  }

  if( editing ) {
    const eSetRef = ( event: React.FocusEvent<any> ) => {
      editor.ref = ref
      setRef( event.target )
    }
    return (
      <Slate editor={editor} value={value} onChange={onChange}>
        <InputContentEditableActions />
        <Paper elevation={1}>
          <Editable
            {...{ ref }}
            renderElement={renderElement}
            renderLeaf={renderLeaf}
            autoFocus
            onKeyDown={onKeyDown}
            onBlur={eSetRef}
            onMouseMove={setInfoEvent}
          />
        </Paper>
        <Paper>
          {info}
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
        size='small'
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
    <Grid container justify='center'>
      {vGroups}
    </Grid>
  )
}
