import { IconButton } from '@material-ui/core'
import { Delete, FormatListBulleted, FormatListNumbered, MergeType } from '@material-ui/icons'
import React, { Fragment } from 'react'
import { Path } from 'slate'
import { EDITOR_ELEMENT, FloatingToolBox } from 'src/view/blocs'

import { Editor, ReactEditor, Transforms, useSlate } from '../editor'
import { SlateElementRenderer } from '../renderer'
import { EditorElementList, EditorElementListDetails } from './element'
import { useListMerge } from './hooks'

export const editorElementRendererList: SlateElementRenderer<EditorElementList> = ( {
  attributes,
  children,
  element,
} ) => (
    <FloatingToolBox tools={<HoveringToolbar element={element} />}>
      {getItem( { attributes, children, element } )}
    </FloatingToolBox>
  )

const getItem: SlateElementRenderer<EditorElementList> = ( { attributes, children, element } ) => {
  if( element.style ) {
    attributes.style = Object.assign( attributes.style || {}, { 'list-style-type': element.style } )
  }
  switch( element.variant ) {
    case 'ordered':
      return <ol {...attributes}>{children}</ol>
    case 'unordered':
      return <ul {...attributes}>{children}</ul>
  }
}

const HoveringToolbar = ( { element }: { element: EditorElementList } ) => {
  const editor = useSlate()
  if( ReactEditor.isFocused( editor ) ) {
    const nodes = Editor.nodes( editor, { match: node => node === element } )
    const list = Array.from( nodes )[ 0 ]
    if( list ) {
      const [ , path ] = list

      const update = ( details: EditorElementListDetails ) => () => {
        Transforms.setNodes( editor, details, { at: path } )
        editor.focus()
      }
      const bulleted = update( { variant: 'unordered' } )
      const ordered = update( { variant: 'ordered' } )

      return (
        <Fragment>
          <IconButton
            onClick={bulleted}
            color={element.variant === 'unordered' ? 'primary' : 'default'}
          >
            <FormatListBulleted />
          </IconButton>
          <IconButton
            onClick={ordered}
            color={element.variant === 'ordered' ? 'primary' : 'default'}
          >
            <FormatListNumbered />
          </IconButton>
          <DeleteButton element={element} path={path} />
          <MergeButton element={element} path={path} />
        </Fragment>
      )
    }
  }
  return null
}

const DeleteButton = ( { element, path }: { element: EditorElementList; path: Path } ) => {
  const editor = useSlate()
  const remove = () => {
    element.children.forEach( ( _, index ) =>
      Transforms.setNodes( editor, { type: EDITOR_ELEMENT.PARAGRAPH }, { at: [ ...path, index ] } ),
    )
    Transforms.unwrapNodes( editor, { at: path, split: true } )
  }
  return (
    <IconButton onClick={remove}>
      <Delete />
    </IconButton>
  )
}

const MergeButton = ( { element, path }: { element: EditorElementList; path: Path } ) => {
  const { enabled, merge } = useListMerge( element, path )
  return (
    <IconButton onClick={merge} disabled={!enabled}>
      <MergeType transform='rotate(90)' />
    </IconButton>
  )
}
