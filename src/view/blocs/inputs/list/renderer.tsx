import { IconButton } from '@material-ui/core'
import { Delete, FormatListBulleted, FormatListNumbered, MergeType } from '@material-ui/icons'
import React, { Fragment } from 'react'
import { Path } from 'slate'
import { EDITOR_ELEMENT, FloatingToolBox } from 'src/view/blocs'

import { Editor, ReactEditor, Transforms, useSlate } from '../editor'
import { SlateElementRenderer } from '../renderer'
import { EditorElementList, EditorElementListDetails } from './element'

export const editorElementRendererList: SlateElementRenderer<EditorElementList> =
  ( { attributes, children, element } ) => (
    <FloatingToolBox tools={<HoveringToolbar element={element} />}>
      {getItem( { attributes, children, element } )}
    </FloatingToolBox>
  )

const getItem: SlateElementRenderer<EditorElementList> =
  ( { attributes, children, element } ) => {
    if( element.style ) {
      attributes.style = Object.assign( attributes.style || {}, { 'list-style-type': element.style } )
    }
    switch( element.variant ) {
      case "ordered":
        return <ol {...attributes}>{children}</ol>
      case "unordered":
      default:
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

      const update = ( details: EditorElementListDetails = {} ) => () => {
        Transforms.setNodes( editor, details, { at: path } )
        editor.focus()
      }
      const bulleted = update( { variant: "unordered" } )
      const ordered = update( { variant: "ordered" } )

      const remove = () => {
        element.children.forEach( ( _, index ) =>
          Transforms.setNodes( editor,
            { type: EDITOR_ELEMENT.PARAGRAPH },
            { at: [ ...path, index ] },
          ),
        )
        Transforms.unwrapNodes( editor, { at: path, split: true } )
      }

      let canMerge = false
      try {
        const next = Editor.nodes( editor, { at: Path.next( path ) } )[ 0 ]
        canMerge = next && next[ 0 ].variant === element.variant
      } catch( e ) {

      }

      const merge = () => {
        if( canMerge ) {
          Transforms.mergeNodes( editor, { at: Path.next( path ) } )
        }
      }

      return (
        <Fragment>
          <IconButton
            onClick={bulleted}
            color={element.variant === "unordered" ? 'primary' : 'default'}
          ><FormatListBulleted />
          </IconButton>
          <IconButton
            onClick={ordered}
            color={element.variant === "ordered" ? 'primary' : 'default'}
          ><FormatListNumbered />
          </IconButton>
          <IconButton
            onClick={remove}
          ><Delete />
          </IconButton>
          <IconButton
            onClick={merge}
            disabled={!canMerge}
          ><MergeType />
          </IconButton>
        </Fragment>
      )
    }
  }
  return null
}
