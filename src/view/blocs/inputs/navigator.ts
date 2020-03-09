import { Editor, Element, Node, Path, Point, Range, Text, Transforms } from 'slate'
import { ArrayUtil, Logger } from 'src/utils'
import { NodeEntry } from 'src/view/blocs/inputs/node-entry'

const log = Logger.new( 'info' )

export type Location = Path | Node | NodeEntry | Point
type Position = 'absolute' | 'relative'

export const Is = {
  node: Node.isNode,
  text: Text.isText,
  nodeEntry: NodeEntry.isNodeEntry,
  editor: Editor.isEditor,
  element: Element.isElement,
  path: Path.isPath,
  range: Range.isRange,
  point: Point.isPoint,
  location: ( value: any ) =>
    Is.path( value )
    || Is.node( value )
    || Is.nodeEntry( value )
    || Is.path( value ),
}

export const Navigator = {
  get( root: Node, location: Location ) {
    if( Is.point( location ) ) return NodeEntry.fromPath( root, location.path )
    if( Is.path( location ) ) return NodeEntry.fromPath( root, location )
    if( Is.node( location ) ) return NodeEntry.fromNode( root, location )
    if( NodeEntry.isValid( root, location ) ) return location
    log.info( 'NodeEntry is not valid : ', location )
  },
  children( root: Node, location: Location ) {
    const entry = Navigator.get( root, location )
    return entry && NodeEntry.children( entry )
  },
  child: {
    first( root: Node, location: Location ) {
      return Navigator.child.at( root, location, 0 )
    },
    at( root: Node, location: Location, index: number, position: Position = 'absolute' ) {
      const entry = Navigator.get( root, location )
      if( !entry ) return
      const children = Navigator.children( root, entry )
      if( !children ) return
      return position === 'absolute'
        ? ArrayUtil.at( children, index >= 0 ? index : children.length + index )
        : ArrayUtil.at( children, NodeEntry.index( entry ) + index )
    },
    last( root: Node, location: Location ) {
      return Navigator.child.at( root, location, -1 )
    },
  },
  parent( root: Node, location: Location ) {
    const entry = Navigator.get( root, location )
    if( !entry ) return
    const [ node, path ] = entry
    if( Editor.isEditor( node ) ) return log.info( 'Cannot get parent of Editor' )
    return Navigator.get( root, Path.parent( path ) )
  },
  root( root: Node, location: Location ) {
    const entry = Navigator.get( root, location )
    if( !entry ) return
    const [ , path ] = entry
    if( ArrayUtil.isEmpty( path ) ) return
    return Navigator.get( root, path.slice( 0, 1 ) )
  },
  siblings( root: Node, location: Location ) {
    const entry = Navigator.parent( root, location )
    if( entry ) return NodeEntry.children( entry )
  },
  sibling: {
    first( root: Node, location: Location ) {
      return Navigator.sibling.at( root, location, 0 )
    },
    previous( root: Node, location: Location ) {
      return Navigator.sibling.at( root, location, -1, 'relative' )
    },
    at( root: Node, location: Location, index: number, position: Position = 'absolute' ) {
      const entry = Navigator.get( root, location )
      if( !entry ) return
      const siblings = Navigator.siblings( root, entry )
      if( !siblings ) return
      return position === 'absolute'
        ? ArrayUtil.at( siblings, index >= 0 ? index : siblings.length - index )
        : ArrayUtil.at( siblings, NodeEntry.index( entry ) + index )
    },
    next( root: Node, location: Location ) {
      return Navigator.sibling.at( root, location, 1, 'relative' )
    },
    last( root: Node, location: Location ) {
      return Navigator.sibling.at( root, location, -1 )
    },
  },

  update( root: Editor, location: Location, details: Partial<Node> ) {
    const entry = Navigator.get( root, location )
    if( !entry ) return log.info( 'Impossible to update node at ', location )
    Transforms.setNodes( root, details, { at: entry[ 1 ] } )
  },
  insert( root: Editor, path: Path, details: Node | Node[] ) {
    Transforms.insertNodes( root, details, { at: path } )
  },
  append( root: Editor, location: Location, details: Node | Node[] ) {
    const entry = Navigator.child.last( root, location )
    if( !entry ) return log.info( 'Impossible to append nodes at ', location )
    Navigator.insert( root, Path.next( NodeEntry.path( entry ) ), details )
  },
  delete( root: Editor, location: Location ) {
    const entry = Navigator.get( root, location )
    if( !entry ) return log.info( 'Impossible to delete node at ', location )
    Transforms.delete( root, { at: entry[ 1 ] } )
    return entry
  },
  extract: {
    content( root: Editor, location: Location, deleteParent = true ) {
      const entry = Navigator.get( root, location )
      if( !entry ) return log.info( 'Impossible to extract content at path ', location )
      const children = Navigator.children( root, entry )
      if( !children ) return
      if( deleteParent ) Navigator.delete( root, location )
      else {
        [ ...children ].reverse().forEach( child => Transforms.delete( root, { at: child[ 1 ] } ) )
      }
      return children
    },
    node( root: Editor, location: Location ) {
      return Navigator.delete( root, location )
        || log.info( 'Impossible to extract node at ', location )

    },
  },
}

/*
get
  path(location|Point, ?root)
do
  set(root, data, location([])): NodeEntry([])
  unset(root, data, location([])): NodeEntry([])
  insert(root, data([]), location(uncheck)): NodeEntry([])
    start
    before
    at = before
    after
    end
  move(root, data([]), location(uncheck)): NodeEntry([])
    start
    before
    at = before
    after
    end
  remove(root, location([])): Node([])
  wrap(root, data([]), location([])): NodeEntry([])
  unwrap(root, location([]), depth): NodeEntry([])
  merge(root, location([]), into): NodeEntry([])
    start
    before
    at = before
    after
    end
  cut(root, location([]), depth): NodeEntry([])
  focus(root, ?location)

*/

export const Do = {
  set( editor: Editor, details: Partial<Node>, location: Location ) {
    const entry = Navigator.get( editor, location )
    if( !entry ) return log.info( 'Impossible to set node at ', location )
    Transforms.setNodes( editor, details, { at: entry[ 1 ] } )
  },
  unset( editor: Editor, details: Partial<Node>, location: Location ) {
    const entry = Navigator.get( editor, location )
    if( !entry ) return log.info( 'Impossible to unset node at ', location )
    Transforms.setNodes( editor, details, { at: entry[ 1 ] } )
  },
  insert: {
    first( editor: Editor, location: Path, nodes: Node | Node[] ) {
      const first = Navigator.sibling.first( editor, location )
      if( !first ) return log.info( 'Impossible to insert node as first sibling of ', location )
      return Do.insert.at( editor, first, nodes, 'before' )
    },
    before( editor: Editor, location: Path, nodes: Node | Node[] ) {
      return Do.insert.at( editor, location, nodes, 'before' )
    },
    at( editor: Editor, location: Location, nodes: Node | Node[], mode: 'after' | 'before' = 'before' ) {
      const entry = Navigator.get( editor, location )
      if( !entry ) return log.info( `Impossible to insert node ${ mode } `, location )
      let path = NodeEntry.path( entry )
      path = mode === 'before' ? path : Path.next( path )
      Transforms.insertNodes( editor, nodes, { at: path } )
    },
    after( editor: Editor, location: Path, nodes: Node | Node[] ) {
      return Do.insert.at( editor, location, nodes, 'after' )
    },
    last( editor: Editor, location: Path, nodes: Node | Node[] ) {
      const last = Navigator.sibling.last( editor, location )
      if( !last ) return log.info( 'Impossible to insert node as last sibling of ', location )
      return Do.insert.at( editor, last, nodes, 'after' )
    },
  },
  remove( editor: Editor, location: Location ) {
    const entry = Navigator.get( root, location )
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
  },
}
