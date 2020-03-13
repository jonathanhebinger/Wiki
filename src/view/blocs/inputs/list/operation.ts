import { Editor, Element, Node, Path, Transforms } from 'slate'
import { ReactEditor } from 'slate-react'
import { Logger } from 'src/utils'
import { EDITOR_ELEMENT } from 'src/view/blocs'

import { EDITOR_ELEMENT_LIST, EditorElementListDetails } from './element'

const log = Logger.new( 'debug' )

const match = ( node: Node ) => node.type === EDITOR_ELEMENT_LIST.TYPE
const itemMatcher = ( node: Node ) => node.type === EDITOR_ELEMENT_LIST.ITEM

export const SlateList = {
  toggle,
  update,
  insert,
  remove,
  merge,
  isActive,
  matcher: match,
  item: {
    matcher: itemMatcher,
  },
}

function isActive( editor: ReactEditor ) {
  const [ node ] = Editor.nodes( editor, { match } )
  return !!node
}

function needUpdate( editor: ReactEditor, details?: EditorElementListDetails ) {
  const [ top ] = Editor.nodes( editor, { match } )
  return top && details && ( top[ 0 ].variant !== details.variant || top[ 0 ].style !== details.style )
}

function toggle(
  editor: ReactEditor,
  details: EditorElementListDetails = { variant: 'unordered' },
) {
  needUpdate( editor, details )
    ? update( editor, details )
    : insert( editor, details )
}

function update( editor: ReactEditor, details: EditorElementListDetails ) {
  log.debug( 'Updating list at selection with : ', editor.selection, details )
  const [ top ] = Editor.nodes( editor, { match } )
  if( top ) {
    Transforms.setNodes( editor, details, { at: top[ 1 ] } )
  }
}

function merge( editor: ReactEditor, at: Path, to: Path ) {
  log.debug( 'Merging lists : ', at, to )
  const [ target ] = Editor.node( editor, to )
  to = [ ...to, target.children.length ]
  Transforms.moveNodes( editor, { at, match: itemMatcher, to, mode: 'highest' } )
}

function insert( editor: ReactEditor, details: EditorElementListDetails ) {
  log.debug( 'Inserting list at selection with : ', editor.selection, details )
  Transforms.setNodes( editor, { type: EDITOR_ELEMENT_LIST.ITEM } )
  Transforms.wrapNodes( editor, { type: EDITOR_ELEMENT_LIST.TYPE, ...details, children: [] } )
}

function insertAt( editor: ReactEditor, details: EditorElementListDetails, at: Path ) {
  log.debug( 'Inserting list at with : ', at, details )
  const nest = Node.get( editor, at )
  if( Element.isElement( nest ) && match( nest ) ) {
    Transforms.wrapNodes( editor, { type: EDITOR_ELEMENT.PARAGRAPH, children: [] } )
    Transforms.insertNodes( editor, {
      type: EDITOR_ELEMENT_LIST.TYPE,
      children: [ { type: EDITOR_ELEMENT_LIST.ITEM, children: [] } ],
    }, { at: [ ...at, nest.children.length ] } )
  } else {
    Transforms.setNodes( editor, { type: EDITOR_ELEMENT_LIST.ITEM }, { at, match: itemMatcher, mode: 'lowest' } )
    Transforms.wrapNodes( editor, { type: EDITOR_ELEMENT_LIST.TYPE, ...details, children: [] } )
  }
}

function remove( editor: ReactEditor ) {
  log.debug( 'Removing list at selection : ', editor.selection )
  Transforms.unwrapNodes( editor, { match, split: true, mode: 'highest' } )
  Transforms.setNodes( editor, { type: EDITOR_ELEMENT.PARAGRAPH, mode: 'highest' } )
}
