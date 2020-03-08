import { Editor, Element, Node, Path } from 'slate'
import * as Slate from 'slate'
import { ArrayUtil, Logger } from 'src/utils'

const log = Logger.new( 'debug' )

function pathReducer( element: Node | undefined, index: number ) {
  return Element.isElement( element ) || Editor.isEditor( element )
    ? element.children[ index ]
    : undefined
}

export type NodeEntry<T extends Node = Node> = Slate.NodeEntry<T>

export const NodeEntry = {
  isNodeEntry( value: any ): value is NodeEntry {
    return Array.isArray( value )
      && Node.isNode( value[ 0 ] )
      && Path.isPath( value[ 1 ] )
  },
  isValid( editor: Editor, entry: NodeEntry ): boolean {
    const [ node, path ] = entry
    return node === path.reduce( pathReducer, editor )
  },
  index( entry: NodeEntry ): number {
    const [ , path ] = entry
    return ArrayUtil.last( path )
  },
  hasChildren( entry: NodeEntry ): entry is NodeEntry<Element | Editor> {
    const [ node ] = entry
    return Element.isElement( node ) || Editor.isEditor( node )
  },
  children( entry: NodeEntry ): NodeEntry[] {
    if( NodeEntry.hasChildren( entry ) ) {
      const [ node, path ] = entry
      return node.children.map( ( child, index ) => [ child, [ ...path, index ] ] )
    }
    log.info( 'Trying to get children of text node entry : ', entry )
    return []
  },
  fromPath( editor: Editor, path: Path ) {
    const node = path.reduce( pathReducer, editor )
    return node
      ? [ node, path ] as NodeEntry
      : log.info( 'Path is not valid : ', path )
  },
  fromNode( editor: Editor, node: Node ) {
    const nodesIterable = Editor.nodes( editor, { match: n => n === node } )
    const entry = Array.from( nodesIterable )[ 0 ]
    return entry || log.info( 'Node not found : ', node )
  },
  node( entry: NodeEntry ) {
    return entry[ 0 ]
  },
  path( entry: NodeEntry ) {
    return entry[ 1 ]
  },
}
