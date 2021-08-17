import { Button, ButtonGroup, Grid, SvgIcon } from '@material-ui/core'
import {
  FormatBold,
  FormatIndentDecrease,
  FormatIndentIncrease,
  FormatItalic,
  FormatListBulleted,
  FormatListNumbered,
  FormatStrikethrough,
  FormatUnderlined,
  Link,
  Redo,
  Undo,
} from '@material-ui/icons'
import React, { MouseEvent } from 'react'
import { Editor, Text, Transforms } from 'slate'
import { ReactEditor, useSlate } from 'slate-react'

import { LeafAttributes } from './editor.leaf'
import { EDITOR_ELEMENT } from './element'
import { SlateList } from './list'

function isMarkActive(editor: ReactEditor, format: keyof LeafAttributes) {
  const [match] = Editor.nodes(editor, {
    match: node => node[format] === true,
    universal: true,
  })
  return !!match
}

function toggleMark(editor: ReactEditor, format: keyof LeafAttributes) {
  const isActive = isMarkActive(editor, format)
  Transforms.setNodes(
    editor,
    { [format]: isActive ? null : true },
    { match: Text.isText, split: true },
  )
}

const isBlockActive = (editor: ReactEditor, format: string) => {
  const [match] = Editor.nodes(editor, {
    match: node => node.type === format,
  })
  return !!match
}

const toggleBlock = (editor: ReactEditor, format: string) => {
  switch (format) {
    case EDITOR_ELEMENT.LIST.VARIANT.ORDERED:
    case EDITOR_ELEMENT.LIST.VARIANT.UNORDERED:
      SlateList.toggle(editor, { variant: format as any })
      break
    default:
      SlateList.remove(editor)
      const type = isBlockActive(editor, format)
        ? EDITOR_ELEMENT.PARAGRAPH
        : format
      Transforms.setNodes(editor, { type })
  }
}

type Command = (editor: ReactEditor, event: MouseEvent<any, any>) => void
type IsActive = (editor: ReactEditor) => boolean

function toolbarButtonData(
  Icon: typeof SvgIcon,
  name: string,
  command: Command,
  isActive?: IsActive,
) {
  return () => {
    const editor = useSlate()

    const active = !isActive || isActive(editor)

    return (
      <Button size="small" title={name} onClick={e => command(editor, e)}>
        <Icon />
      </Button>
    )
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
    editor => toggleMark(editor, format),
    editor => isMarkActive(editor, format),
  )
}

const unorderedListButtonData = toolbarButtonData(
  FormatListBulleted,
  'Unordered list',
  editor => () => toggleBlock(editor, EDITOR_ELEMENT.LIST.VARIANT.UNORDERED),
  editor => isBlockActive(editor, EDITOR_ELEMENT.LIST.VARIANT.UNORDERED),
)

const orderedListButtonData = toolbarButtonData(
  FormatListNumbered,
  'Ordered list',
  editor => () => toggleBlock(editor, EDITOR_ELEMENT.LIST.VARIANT.ORDERED),
  editor => isBlockActive(editor, EDITOR_ELEMENT.LIST.VARIANT.ORDERED),
)

export const ACTIONS: React.FunctionComponent[][] = [
  [
    toolbarButtonData(Undo, 'Undo', editor => editor.undo()),
    toolbarButtonData(Redo, 'Redo', editor => editor.redo()),
  ],
  [
    leafToolbarFormatButtonData('Bold', FormatBold, 'bold'),
    leafToolbarFormatButtonData('Italic', FormatItalic, 'italic'),
    leafToolbarFormatButtonData('Underline', FormatUnderlined, 'underline'),
    leafToolbarFormatButtonData(
      'Strikethrough',
      FormatStrikethrough,
      'strikethrough',
    ),
  ],
  [
    leafToolbarFormatButtonData('Indent', FormatIndentIncrease, 'indent'),
    leafToolbarFormatButtonData('Outdent', FormatIndentDecrease, 'outdent'),
  ],
  [unorderedListButtonData, orderedListButtonData],
  //[Link, LinkOff],
  [
    () => (
      <Button size="small" onClick={console.log}>
        <Link />
      </Button>
    ),
  ],
]

export function NodeEditorActionBar() {
  const Groups = ACTIONS.map((group, index) => {
    const Actions = group.map((Item, index) => {
      return <Item key={index} />
    })

    return (
      <ButtonGroup className="m-2" key={index}>
        {Actions}
      </ButtonGroup>
    )
  })

  return (
    <Grid container justify="center">
      {Groups}
    </Grid>
  )
}
