import { Editor, Node, Path, Transforms } from 'slate'
import { ArrayUtil, Logger } from 'src/utils'
import { NodeEntry } from 'src/view/blocs/inputs/node-entry'

const log = Logger.new( 'info' )

export type Location = Path | Node | NodeEntry
type Position = 'absolute' | 'relative'

export const Navigator = {
  get( editor: Editor, location: Location ) {
    if( Path.isPath( location ) ) return NodeEntry.fromPath( editor, location )
    else if( Node.isNode( location ) ) return NodeEntry.fromNode( editor, location )
    return NodeEntry.isValid( editor, location )
      ? location
      : log.info( 'NodeEntry is not valid : ', location )
  },
  children( editor: Editor, location: Location ) {
    const entry = Navigator.get( editor, location )
    return entry && NodeEntry.children( entry )
  },
  child: {
    first( editor: Editor, location: Location ) {
      return Navigator.child.at( editor, location, 0 )
    },
    at( editor: Editor, location: Location, index: number, position: Position = 'absolute' ) {
      const entry = Navigator.get( editor, location )
      if( !entry ) return
      const children = Navigator.children( editor, entry )
      if( !children ) return
      return position === 'absolute'
        ? ArrayUtil.at( children, index >= 0 ? index : children.length + index )
        : ArrayUtil.at( children, NodeEntry.index( entry ) + index )
    },
    last( editor: Editor, location: Location ) {
      return Navigator.child.at( editor, location, -1 )
    },
  },
  parent( editor: Editor, location: Location ) {
    const entry = Navigator.get( editor, location )
    if( !entry ) return
    const [ node, path ] = entry
    if( Editor.isEditor( node ) ) return log.info( 'Cannot get parent of Editor' )
    return Navigator.get( editor, Path.parent( path ) )
  },
  root( editor: Editor, location: Location ) {
    const entry = Navigator.get( editor, location )
    if( !entry ) return
    const [ , path ] = entry
    if( ArrayUtil.isEmpty( path ) ) return
    return Navigator.get( editor, path.slice( 0, 1 ) )
  },
  siblings( editor: Editor, location: Location ) {
    const entry = Navigator.parent( editor, location )
    if( entry ) return NodeEntry.children( entry )
  },
  sibling: {
    first( editor: Editor, location: Location ) {
      return Navigator.sibling.at( editor, location, 0 )
    },
    previous( editor: Editor, location: Location ) {
      return Navigator.sibling.at( editor, location, -1, 'relative' )
    },
    at( editor: Editor, location: Location, index: number, position: Position = 'absolute' ) {
      const entry = Navigator.get( editor, location )
      if( !entry ) return
      const siblings = Navigator.siblings( editor, entry )
      if( !siblings ) return
      return position === 'absolute'
        ? ArrayUtil.at( siblings, index >= 0 ? index : siblings.length - index )
        : ArrayUtil.at( siblings, NodeEntry.index( entry ) + index )
    },
    next( editor: Editor, location: Location ) {
      return Navigator.sibling.at( editor, location, 1, 'relative' )
    },
    last( editor: Editor, location: Location ) {
      return Navigator.sibling.at( editor, location, -1 )
    },
  },

  update( editor: Editor, location: Location, details: Partial<Node> ) {
    const entry = Navigator.get( editor, location )
    if( !entry ) return log.info( 'Impossible to update node at ', location )
    Transforms.setNodes( editor, details, { at: entry[ 1 ] } )
  },
  insert( editor: Editor, path: Path, details: Node | Node[] ) {
    Transforms.insertNodes( editor, details, { at: path } )
  },
  append( editor: Editor, location: Location, details: Node | Node[] ) {
    const entry = Navigator.child.last( editor, location )
    if( !entry ) return log.info( 'Impossible to append nodes at ', location )
    Navigator.insert( editor, Path.next( NodeEntry.path( entry ) ), details )
  },
  delete( editor: Editor, location: Location ) {
    const entry = Navigator.get( editor, location )
    if( !entry ) return log.info( 'Impossible to delete node at ', location )
    Transforms.delete( editor, { at: entry[ 1 ] } )
    return entry
  },
  extract: {
    content( editor: Editor, location: Location, deleteParent = true ) {
      const entry = Navigator.get( editor, location )
      if( !entry ) return log.info( 'Impossible to extract content at path ', location )
      const children = Navigator.children( editor, entry )
      if( !children ) return
      if( deleteParent ) Navigator.delete( editor, location )
      else {
        [ ...children ].reverse().forEach( child => Transforms.delete( editor, { at: child[ 1 ] } ) )
      }
      return children
    },
    node( editor: Editor, location: Location ) {
      return Navigator.delete( editor, location )
        || log.info( 'Impossible to extract node at ', location )

    },
  },
}
