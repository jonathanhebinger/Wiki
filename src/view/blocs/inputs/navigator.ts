import { Editor, Element, Node, Path, Point, Range, Text, Transforms } from 'slate'
import { ArrayUtil, Logger } from 'src/utils'
import { NodeEntry } from 'src/view/blocs/inputs/node-entry'

const log = Logger.new( 'info' )

export type Location = Path | Node | NodeEntry | Point
type Position = 'absolute' | 'relative'

export const is = {
  node: Node.isNode,
  text: Text.isText,
  nodeEntry: NodeEntry.isNodeEntry,
  editor: Editor.isEditor,
  element: Element.isElement,
  path: Path.isPath,
  range: Range.isRange,
  point: Point.isPoint,
  location: ( value: any ) =>
    is.path( value ) || is.node( value ) || is.nodeEntry( value ) || is.point( value ),
  list: {
    node: Node.isNodeList,
    text: Text.isTextList,
    nodeEntry: ( value: any ): value is NodeEntry[] =>
      Array.isArray( value ) && value.every( is.nodeEntry ),
    element: Element.isElementList,
    path: ( value: any ): value is Path[] =>
      Array.isArray( value ) && value.every( is.path ),
    range: Range.isRange,
    point: ( value: any ): value is Point[] =>
      Array.isArray( value ) && value.every( is.point ),
    location: ( value: any ): value is Location[] =>
      Array.isArray( value ) && value.every( is.location ),

  },
}

export const get = {
  get( root: Node, location: Location ) {
    if( is.point( location ) ) {
      return NodeEntry.fromPath( root, location.path )
    }
    if( is.path( location ) ) {
      return NodeEntry.fromPath( root, location )
    }
    if( is.node( location ) ) {
      return NodeEntry.fromNode( root, location )
    }
    if( NodeEntry.isValid( root, location ) ) {
      return location
    }
    log.info( 'NodeEntry is not valid : ', location )
  },
  children( root: Node, location: Location ) {
    const entry = get.get( root, location )
    return entry && NodeEntry.children( entry )
  },
  child: {
    first( root: Node, location: Location ) {
      return get.child.at( root, location, 0 )
    },
    at( root: Node, location: Location, index: number, position: Position = 'absolute' ) {
      const entry = get.get( root, location )
      if( !entry ) {
        return
      }
      const children = get.children( root, entry )
      if( !children ) {
        return
      }
      return position === 'absolute'
        ? ArrayUtil.at( children, index >= 0 ? index : children.length + index )
        : ArrayUtil.at( children, NodeEntry.index( entry ) + index )
    },
    last( root: Node, location: Location ) {
      return get.child.at( root, location, -1 )
    },
  },
  parent( root: Node, location: Location ) {
    const entry = get.get( root, location )
    if( !entry ) {
      return
    }
    const [ node, path ] = entry
    if( Editor.isEditor( node ) ) {
      return log.info( 'Cannot get parent of Editor' )
    }
    return get.get( root, Path.parent( path ) )
  },
  root( root: Node, location: Location ) {
    const entry = get.get( root, location )
    if( !entry ) {
      return
    }
    const [ , path ] = entry
    if( ArrayUtil.isEmpty( path ) ) {
      return
    }
    return get.get( root, path.slice( 0, 1 ) )
  },
  siblings( root: Node, location: Location ) {
    const entry = get.parent( root, location )
    if( entry ) {
      return NodeEntry.children( entry )
    }
  },
  sibling: {
    first( root: Node, location: Location ) {
      return get.sibling.at( root, location, 0 )
    },
    previous( root: Node, location: Location ) {
      return get.sibling.at( root, location, -1, 'relative' )
    },
    at( root: Node, location: Location, index: number, position: Position = 'absolute' ) {
      const entry = get.get( root, location )
      if( !entry ) {
        return
      }
      const siblings = get.siblings( root, entry )
      if( !siblings ) {
        return
      }
      return position === 'absolute'
        ? ArrayUtil.at( siblings, index >= 0 ? index : siblings.length - index )
        : ArrayUtil.at( siblings, NodeEntry.index( entry ) + index )
    },
    next( root: Node, location: Location ) {
      return get.sibling.at( root, location, 1, 'relative' )
    },
    last( root: Node, location: Location ) {
      return get.sibling.at( root, location, -1 )
    },
  },

  update( root: Editor, location: Location, details: Partial<Node> ) {
    const entry = get.get( root, location )
    if( !entry ) {
      return log.info( 'Impossible to update node at ', location )
    }
    Transforms.setNodes( root, details, { at: entry[ 1 ] } )
  },
  insert( root: Editor, path: Path, details: Node | Node[] ) {
    Transforms.insertNodes( root, details, { at: path } )
  },
  append( root: Editor, location: Location, details: Node | Node[] ) {
    const entry = get.child.last( root, location )
    if( !entry ) {
      return log.info( 'Impossible to append nodes at ', location )
    }
    get.insert( root, Path.next( NodeEntry.path( entry ) ), details )
  },
  delete( root: Editor, location: Location ) {
    const entry = get.get( root, location )
    if( !entry ) {
      return log.info( 'Impossible to delete node at ', location )
    }
    Transforms.delete( root, { at: entry[ 1 ] } )
    return entry
  },
  extract: {
    content( root: Editor, location: Location, deleteParent = true ) {
      const entry = get.get( root, location )
      if( !entry ) {
        return log.info( 'Impossible to extract content at path ', location )
      }
      const children = get.children( root, entry )
      if( !children ) {
        return
      }
      if( deleteParent ) {
        get.delete( root, location )
      } else {
        ;[ ...children ].reverse().forEach( child => Transforms.delete( root, { at: child[ 1 ] } ) )
      }
      return children
    },
    node( root: Editor, location: Location ) {
      return (
        get.delete( root, location ) || log.info( 'Impossible to extract node at ', location )
      )
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
  /** Set properties of node at location */
  set( editor: Editor, details: Partial<Node>, location: Location ) {
    const entry = get.get( editor, location )
    if( !entry ) {
      return log.info( 'Impossible to set node at ', location )
    }
    Transforms.setNodes( editor, details, { at: entry[ 1 ] } )
  },

  /** Unset properties of node at location */
  unset( editor: Editor, details: Partial<Node>, location: Location ) {
    const entry = get.get( editor, location )
    if( !entry ) {
      return log.info( 'Impossible to unset node at ', location )
    }
    Transforms.setNodes( editor, details, { at: entry[ 1 ] } )
  },

  /** Methods to insert nodes in the editor and return their nodeEntry */
  insert: {

    /** Insert nodes as the previous siblings of location and return their nodeEntry */
    before( editor: Editor, nodes: Node | Node[], location: Location ) {
      return Do.insert.at( editor, nodes, location, 'before' )
    },

    /** Insert nodes as the previous siblings of location and return their nodeEntry */
    at(
      editor: Editor,
      nodes: Node | Node[],
      location: Location,
      mode: 'after' | 'before' = 'before',
    ) {
      const entry = get.get( editor, location )
      if( !entry )
        return log.info( `Impossible to insert nodes ${ mode } `, location )
      const path = mode === 'before'
        ? NodeEntry.path( entry )
        : Path.next( NodeEntry.path( entry ) )
      if( !is.list.node( nodes ) )
        nodes = [ nodes ]
      Transforms.insertNodes( editor, nodes, { at: path } )
      const sibling = get.siblings( editor, entry )
      return sibling
        ? sibling.filter( ( [ node ] ) => ( nodes as Node[] ).includes( node ) )
        : log.info( `Impossible to get inserted nodes `, location )
    },

    /** Insert nodes as the next siblings of location and return their nodeEntry */
    after( editor: Editor, nodes: Node | Node[], location: Location ) {
      return Do.insert.at( editor, nodes, location, 'after' )
    },

    /** Insert to move nodes in a location and return their nodeEntry */
    in: {

      /** Insert nodes as the first children of location */
      start( editor: Editor, nodes: Node | Node[], location: Location ) {
        const first = get.child.first( editor, location )
        return first
          ? Do.insert.at( editor, nodes, first, 'before' )
          : log.info( 'Impossible to insert node as first sibling of ', location )
      },

      /** Insert nodes at a, index in a location and return their nodeEntry */
      at(
        editor: Editor,
        nodes: Node | Node[],
        location: Location,
        index: number,
        mode: 'after' | 'before' = 'before',
      ) {
        const entry = get.child.at( editor, location, index )
        return entry
          ? Do.insert.at( editor, nodes, entry, mode )
          : log.info( `Impossible to get inserted nodes `, location )
      },

      /** Insert nodes as the last children of location and return their nodeEntry */
      end( editor: Editor, nodes: Node | Node[], location: Location ) {
        const last = get.child.last( editor, location )
        return last
          ? Do.insert.at( editor, nodes, last, 'after' )
          : log.info( 'Impossible to insert node as last sibling of ', location )
      },
    },
  },

  /** Methods to move nodes in the editor and return their nodeEntry */
  move: {

    /** Move nodes as the previous siblings of location and return their nodeEntry */
    before( editor: Editor, sources: Location | Location[], location: Location ) {
      return Do.move.at( editor, sources, location, 'before' )
    },

    /** Move nodes at a location and return their nodeEntry */
    at(
      editor: Editor,
      sources: Location | Location[],
      location: Location,
      mode: 'after' | 'before',
    ) {
      const into = get.get( editor, location )
      if( !into ) return log.info( 'Location to move into not found ', location )
      const target = mode === 'before'
        ? NodeEntry.path( into )
        : Path.next( NodeEntry.path( into ) )
      sources = is.list.location( sources ) ? sources : [ sources ]
      const entries = sources
        .map( source => get.get( editor, source ) as NodeEntry )
        .filter( entry => entry )
      entries
        .map( NodeEntry.path )
        .sort( Path.compare )
        .forEach( path => Transforms.moveNodes( editor, { at: path, to: target } ) )
      const siblings = get.siblings( editor, into )
      if( !siblings ) return log.error( 'Something happened during move at ', location )
      const nodes = entries.map( NodeEntry.node )
      return siblings.filter( sibling => nodes.includes( NodeEntry.node( sibling ) ) )
    },

    /** Move nodes as the next siblings of location and return their nodeEntry */
    after( editor: Editor, sources: Location | Location[], location: Location ) {
      return Do.move.at( editor, sources, location, 'after' )
    },

    /** Methods to move nodes in a location and return their nodeEntry */
    in: {
      /** Move nodes as the first children of location and return their nodeEntry */
      start( editor: Editor, sources: Location | Location[], location: Location ) {
        const first = get.child.first( editor, location )
        return first
          ? Do.move.at( editor, sources, first, 'before' )
          : log.info( 'Impossible to move node as first sibling of ', location )
      },

      /** Move nodes at a, index in a location and return their nodeEntry */
      at(
        editor: Editor,
        sources: Location | Location[],
        location: Location,
        index: number,
        mode: 'after' | 'before' = 'before',
      ) {
        const entry = get.child.at( editor, location, index )
        return entry
          ? Do.move.at( editor, sources, entry, mode )
          : log.info( `Impossible to get moved nodes `, location )
      },

      /** Move nodes as the last children of location */
      end( editor: Editor, sources: Location | Location[], location: Location ) {
        const last = get.child.last( editor, location )
        return last
          ? Do.move.at( editor, sources, last, 'after' )
          : log.info( 'Impossible to move node as last sibling of ', location )
      },
    },
  },

  /** Methods to remove nodes in the editor and return their nodeEntry */
  remove: {
    at( editor: Editor, location: Location ) {
      const entry = get.get( editor, location )
      if( !entry )
        return log.info( 'Impossible to remove node at ', location )
      Transforms.delete( editor, { at: NodeEntry.path( entry ) } )
      return entry
    },

    content( editor: Editor, location: Location, deleteParent = true ) {
      const children = get.children( editor, location )
      if( !children )
        return log.info( 'Impossible to remove children of ', location )
      children.reverse().forEach( child => Do.remove.at( editor, child ) )
      if( deleteParent ) {
        Do.remove.at( editor, location )
      }
      return children
    },
  },
}
