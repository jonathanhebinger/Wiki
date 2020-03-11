import { Editor, Node, Path, useSlate } from '../editor'
import { NodeEntry } from '../node-entry'
import { get, Location } from '../slate'
import { EditorElementList } from './element'

const canMerge = ( element: EditorElementList, previous: Node ): boolean => {
  return previous.type === element.type && previous.variant === element.variant
}

const merge = ( editor: Editor, source: Location, into: Location ) => {
  const content = get.children( editor, source )
  if( !content ) return
  get.append( editor, into, content.map( NodeEntry.node ) )
  get.delete( editor, source )
}

export function useListcreate( element: EditorElementList, path: Path ) {

}

export function useListMerge( element: EditorElementList, path: Path ) {
  const editor = useSlate()
  const previous = get.sibling.previous( editor, path )
  if( previous && canMerge( element, NodeEntry.node( previous ) ) )
    return {
      enabled: true,
      merge() {
        merge( editor, element, previous )
        editor.focus( NodeEntry.path( previous ) )
      },
    }
  return { enabled: false }
}
