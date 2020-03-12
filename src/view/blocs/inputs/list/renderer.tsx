import { IconButton } from '@material-ui/core'
import { Delete, FormatListBulleted, FormatListNumbered, MergeType } from '@material-ui/icons'
import React, { Fragment } from 'react'
import { Editor, Node, Path, Transforms } from 'slate'
import { ReactEditor, useSlate } from 'slate-react'
import { EDITOR_ELEMENT, FloatingToolBox, FloatingToolBoxProps } from 'src/view/blocs'
import { SlateList } from 'src/view/blocs/inputs/list'

import { SlateElementRenderer } from '../renderer'
import { EditorElementList, EditorElementListDetails } from './element'
import { useListMerge } from './hooks'

const SlateFloatingToolBox = ( props: FloatingToolBoxProps & { element: Node } ) => {
  const editor = useSlate()
  const { element, ...others } = props
  const [ entry ] = Editor.nodes( editor, { match: node => node === element } )
  if( entry ) {
    const [ , path ] = entry
    const onClick = ( e: React.MouseEvent<any, MouseEvent> ) => {
      editor.active = path
      e.stopPropagation()
    }
    if( editor.active && Path.equals( path, editor.active ) ) {
      return <FloatingToolBox {...others} onClick={onClick} />
    } else {
      return <div onClick={onClick}>{props.children}</div>
    }
  }
  return <div>{props.children}</div>
}

export const editorElementRendererList: SlateElementRenderer<EditorElementList> = ( {
  attributes,
  children,
  element,
} ) => (
    < SlateFloatingToolBox tools={< HoveringToolbar element={element} />} element={element} >
      {getItem( { attributes, children, element } )}
    </SlateFloatingToolBox >
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
    const [ list ] = Editor.nodes( editor, { match: node => node === element } )
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
    const parent = Node.parent( editor, path )
    if( !SlateList.matcher( parent ) ) {
      element.children.forEach( ( _, index ) =>
        Transforms.setNodes( editor, { type: EDITOR_ELEMENT.PARAGRAPH }, { at: [ ...path, index ] } ),
      )
    }
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
