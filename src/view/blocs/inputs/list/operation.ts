import { Editor, Node, Transforms } from 'slate'
import { ReactEditor } from 'slate-react'
import { Logger } from 'src/utils'
import { EDITOR_ELEMENT } from 'src/view/blocs'

import { get, Location } from '../navigator'
import { NodeEntry } from '../node-entry'
import { EDITOR_ELEMENT_LIST, EditorElementListDetails } from './element'

const log = Logger.new( 'info' )

const matcher = ( node: Node ) => node.type === EDITOR_ELEMENT_LIST.TYPE
const itemMatcher = ( node: Node ) => node.type === EDITOR_ELEMENT_LIST.ITEM

const isActive = ( editor: ReactEditor ) => {
  const [ match ] = Editor.nodes( editor, { match: matcher } )
  return !!match
}

const needUpdate = ( editor: ReactEditor, details?: EditorElementListDetails ) => {
  const lists = Editor.nodes( editor, { match: matcher } )
  const top = Array.from( lists )[ 0 ]
  return top && details && ( top[ 0 ].variant !== details.variant || top[ 0 ].style !== details.style )
}

const toggle = (
  editor: ReactEditor,
  details: EditorElementListDetails = { variant: 'unordered' },
) =>
  isActive( editor )
    ? needUpdate( editor, details )
      ? update( editor, details )
      : remove( editor )
    : insert( editor, details )

const update = ( editor: ReactEditor, details: EditorElementListDetails ) => {
  const listNodes = Editor.nodes( editor, { match: matcher } )
  const top = Array.from( listNodes )[ 0 ]
  if( top ) {
    Transforms.setNodes( editor, details, { at: top[ 1 ] } )
  }
}

const merge = ( editor: Editor, source: Location, into: Location ) => {
  const content = get.children( editor, source )
  if( !content ) return
  get.append( editor, into, content.map( NodeEntry.node ) )
  get.delete( editor, source )
}

const insert = ( editor: ReactEditor, details: EditorElementListDetails ) => {
  Transforms.setNodes( editor, { type: EDITOR_ELEMENT_LIST.ITEM } )
  Transforms.wrapNodes( editor, { type: EDITOR_ELEMENT_LIST.TYPE, ...details, children: [] } )
}

const remove = ( editor: ReactEditor ) => {
  Transforms.unwrapNodes( editor, { match: matcher, split: true } )
  Transforms.setNodes( editor, { type: EDITOR_ELEMENT.PARAGRAPH } )
}

export const EditorList = {
  toggle,
  update,
  insert,
  remove,
  merge,
  isActive,
  matcher,
  item: {
    matcher: itemMatcher,
  },
}
