import { Editor, Element, Node, Path, Point, Range, Text, Transforms } from 'slate'
import { ArrayUtil, Logger } from 'src/utils'
import { NodeEntry } from 'src/view/blocs/inputs/node-entry'

const log = Logger.new( 'info' )

export type Location = Path | Node | NodeEntry | Point
type Position = 'absolute' | 'relative'

const is = {
  node: Node.isNode,
  text: Text.isText,
  nodeEntry: NodeEntry.isNodeEntry,
  editor: Editor.isEditor,
  element: Element.isElement,
  path: Path.isPath,
  range: Range.isRange,
  point: Point.isPoint,
  location: ( value: any ): value is Location =>
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

function at( root: Node, location: Location ): NodeEntry
function at( root: Node, locations: Location[] ): NodeEntry[]
function at( root: Node, location: Location | Location[] ): NodeEntry | NodeEntry[] {
  if( is.list.location( location ) )
    return ( location as Location[] )
      .map( item => at( root, item ) )
      .filter( entry => entry ) as NodeEntry[]
  if( is.point( location ) )
    return NodeEntry.fromPath( root, location.path )
  if( is.path( location ) )
    return NodeEntry.fromPath( root, location )
  if( is.node( location ) )
    return NodeEntry.fromNode( root, location )
  if( NodeEntry.isValid( root, location ) )
    return location
  throw new Error( 'NodeEntry is not valid ' )
}

const get = {
  at,
  children( root: Node, location: Location ) {
    return NodeEntry.children( get.at( root, location ) )
  },
  child: {
    first( root: Node, location: Location ) {
      return get.child.at( root, location, 0 )
    },
    at( root: Node, location: Location, index: number ) {
      const [ node, path ] = get.at( root, location )
      index = index >= 0 ? index : node.children.length + index
      return get.at( root, [ ...path, index ] )
    },
    last( root: Node, location: Location ) {
      return get.child.at( root, location, -1 )
    },
  },
  parent( root: Node, location: Location ) {
    const [ node, path ] = get.at( root, location )
    if( is.editor( node ) )
      throw new Error( 'Cannot get parent of Editor' )
    return get.at( root, Path.parent( path ) )
  },
  root( root: Node, location: Location ) {
    if( is.editor( root ) )
      throw new Error( 'Cannot get root of Editor' )
    const [ , path ] = get.at( root, location )
    return get.at( root, path.slice( 0, 1 ) )
  },
  siblings( root: Node, location: Location ) {
    get.root( root, location )
    return NodeEntry.children( get.parent( root, location ) )
  },
  sibling: {
    first( root: Node, location: Location ) {
      return get.sibling.at( root, location, 0 )
    },
    previous( root: Node, location: Location ) {
      return get.sibling.at( root, location, -1, 'relative' )
    },
    at( root: Node, location: Location, index: number, position: Position = 'absolute' ) {
      const [ , path ] = get.at( root, location )
      const siblings = get.siblings( root, location )
      index = position === 'absolute'
        ? index >= 0 ? index : siblings.length - index
        : ArrayUtil.last( path ) + index
      return get.at( root, [ ...path, index ] )
    },
    next( root: Node, location: Location ) {
      return get.sibling.at( root, location, 1, 'relative' )
    },
    last( root: Node, location: Location ) {
      return get.sibling.at( root, location, -1 )
    },
  },
}

interface Wrapper {
  [ index: string ]: ( ( ...args: any[] ) => any ) | Wrapper
}
type Opt<S extends Wrapper> = {
  [ K in keyof S ]: S[ K ] extends Wrapper
  ? Opt<S[ K ]>
  // @ts-ignore
  : ( ...args: Parameters<S[ K ]> ) => ReturnType<S[ K ]> | undefined
}
function makeOpt<T extends Wrapper>( wrapper: T ): Opt<T> {
  const optWrapper = {} as Opt<T>
  for( const [ key, value ] of Object.entries( wrapper ) ) {
    optWrapper[ key as keyof T ] = typeof value === 'object'
      ? makeOpt( value ) as any
      : ( ...args: any[] ) => {
        try { value( ...args ) } catch( e ) { log.info( e ) }
      }
  }
  return optWrapper
}

const opt = makeOpt( get )

/*
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

const Do = {
  /** Set properties of node at location */
  set( editor: Editor, details: Partial<Node>, location: Location ) {
    const [ , path ] = get.at( editor, location )
    Transforms.setNodes( editor, details, { at: path } )
  },

  /** Unset properties of node at location */
  unset( editor: Editor, details: Partial<Node>, location: Location ) {
    const [ , path ] = get.at( editor, location )
    Transforms.setNodes( editor, details, { at: path } )
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
      const entry = get.at( editor, location )
      const path = mode === 'before'
        ? NodeEntry.path( entry )
        : Path.next( NodeEntry.path( entry ) )
      if( !is.list.node( nodes ) )
        nodes = [ nodes ]
      Transforms.insertNodes( editor, nodes, { at: path } )
      return get.siblings( editor, entry ).filter( ( [ node ] ) => ( nodes as Node[] ).includes( node ) )
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
        return Do.insert.at( editor, nodes, first, 'before' )
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
        return Do.insert.at( editor, nodes, entry, mode )
      },

      /** Insert nodes as the last children of location and return their nodeEntry */
      end( editor: Editor, nodes: Node | Node[], location: Location ) {
        const last = get.child.last( editor, location )
        return Do.insert.at( editor, nodes, last, 'after' )
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
      const into = get.at( editor, location )
      const target = mode === 'before'
        ? NodeEntry.path( into )
        : Path.next( NodeEntry.path( into ) )
      sources = is.list.location( sources ) ? sources : [ sources ]
      const entries = sources
        .map( source => get.at( editor, source ) )
      entries
        .map( NodeEntry.path )
        .sort( Path.compare )
        .forEach( path => Transforms.moveNodes( editor, { at: path, to: target } ) )
      const nodes = entries
        .map( NodeEntry.node )
      return get.siblings( editor, into )
        .filter( sibling => nodes.includes( NodeEntry.node( sibling ) ) )
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
        return Do.move.at( editor, sources, first, 'before' )
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
        return Do.move.at( editor, sources, entry, mode )
      },

      /** Move nodes as the last children of location */
      end( editor: Editor, sources: Location | Location[], location: Location ) {
        const last = get.child.last( editor, location )
        return Do.move.at( editor, sources, last, 'after' )
      },
    },
  },

  /** Methods to remove nodes in the editor and return their nodeEntry */
  remove: {

    /** Remove node at location and return its nodeEntry */
    at( editor: Editor, location: Location ) {
      const entry = get.at( editor, location )
      Transforms.delete( editor, { at: NodeEntry.path( entry ) } )
      return entry
    },

    /** Remove children nodes of location and return their nodeEntry */
    content( editor: Editor, location: Location, deleteParent = true ) {
      const children = get.children( editor, location )
      children.reverse().forEach( child => Do.remove.at( editor, child ) )
      if( deleteParent )
        Do.remove.at( editor, location )
      return children
    },
  },

  /** Wrap node with wrapper at location */
  wrap( editor: Editor, wrapper: Element | Element[], location: Location ) {
    const wrappers = ArrayUtil.is.array( wrapper ) ? wrapper : [ wrapper ]
    const [ , path ] = get.at( editor, location )
    wrappers
      .reverse()
      .forEach( element => Transforms.wrapNodes( editor, element, { at: path } ) )
    return get.at( editor, path )
  },

  /** Methods to merge nodes and return their new NodeEntry */
  merge: {

    /** Insert nodes as the previous siblings of location and return their nodeEntry */
    before( editor: Editor, source: Location, location: Location ) {
      return Do.merge.at( editor, source, location, 'before' )
    },

    /** Merge nodes at a location and return their new nodeEntry */
    at(
      editor: Editor,
      source: Location,
      into: Location,
      mode: 'before' | 'after' = 'before',
    ) {
      const content = Slate.get.children( editor, source )
      const nodes = Slate.do.insert.at( editor, content.map( NodeEntry.node ), into, mode )
      Slate.do.remove.at( editor, source )
      return nodes
    },

    /** Insert nodes as the previous siblings of location and return their nodeEntry */
    after( editor: Editor, source: Location, location: Location ) {
      return Do.merge.at( editor, source, location, 'after' )
    },

    /** Merge nodes in a location and return their new nodeEntry */
    in: {

      /** Merge content of source at start of target */
      start( editor: Editor, source: Location, target: Location ) {
        const first = get.child.first( editor, target )
        return Do.merge.at( editor, source, first, 'before' )
      },

      /** Merge content of source into target at index */
      at(
        editor: Editor,
        source: Location,
        into: Location,
        index: number,
        mode: 'after' | 'before' = 'before',
      ) {
        const entry = get.child.at( editor, into, index )
        return Do.merge.at( editor, source, entry, mode )
      },

      /** Merge content of source at end of target */
      end( editor: Editor, source: Location, target: Location ) {
        const first = get.child.first( editor, target )
        return Do.merge.at( editor, source, first, 'before' )
      },
    },
  },
}

export const Slate = {
  is,
  get,
  opt,
  do: Do,
}
