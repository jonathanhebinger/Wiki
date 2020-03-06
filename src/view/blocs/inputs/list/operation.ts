import { Editor, Node, Transforms } from 'slate'
import { ReactEditor } from 'slate-react'
import { EDITOR_ELEMENT } from 'src/view/blocs'

import { EDITOR_ELEMENT_LIST, EditorElementListDetails } from './element'

const isList = ( node: Node ) => node.type === EDITOR_ELEMENT_LIST.TYPE

const isActive = ( editor: ReactEditor ) => {
  const [ match ] = Editor.nodes( editor, { match: isList } )
  return !!match
}

const needUpdate = ( editor: ReactEditor, details?: EditorElementListDetails ) => {
  const lists = Array.from( Editor.nodes( editor, { match: isList } ) )
  const top = lists[ 0 ]
  return top
    && details
    && ( ( top[ 0 ].variant !== details.variant )
      || ( top[ 0 ].style !== details.style ) )
}

const toggle = (
  editor: ReactEditor,
  details?: EditorElementListDetails,
) => isActive( editor )
    ? needUpdate( editor, details )
      ? update( editor, details )
      : remove( editor )
    : insert( editor, details )

const update = (
  editor: ReactEditor,
  details: EditorElementListDetails = {},
) => {
  const listNodes = Editor.nodes( editor, { match: isList } )
  const top = Array.from( listNodes )[ 0 ]
  if( top ) {
    Transforms.setNodes( editor, details, { at: top[ 1 ] } )
  }
}

const insert = (
  editor: ReactEditor,
  details: EditorElementListDetails = {},
) => {
  const { variant = "unordered", style } = details
  Transforms.setNodes( editor, { type: EDITOR_ELEMENT_LIST.ITEM } )
  Transforms.wrapNodes( editor, {
    type: EDITOR_ELEMENT_LIST.TYPE,
    variant,
    style,
    children: [],
  } )
}

const remove = ( editor: ReactEditor ) => {
  Transforms.unwrapNodes( editor, {
    match: node => EDITOR_ELEMENT_LIST.TYPE === node.type,
    split: true,
  } )
  Transforms.setNodes( editor, { type: EDITOR_ELEMENT.PARAGRAPH } )
}

export const EditorList = {
  toggle,
  update,
  insert,
  remove,
  isActive,
}
