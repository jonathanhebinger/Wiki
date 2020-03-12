import { Editor, Node, Path } from 'slate'
import { useSlate } from 'slate-react'
import { Logger } from 'src/utils'
import { EditorElementList, SlateList } from 'src/view/blocs/inputs/list'

const log = Logger.new()

const canMerge = ( element: EditorElementList, previous: Node ): boolean => {
  return previous.type === element.type && previous.variant === element.variant
}

export function useListcreate( element: EditorElementList, path: Path ) {

}

export function useListMerge( element: EditorElementList, path: Path ) {
  try {
    const editor = useSlate()
    const [ previous, previousPath ] = Editor.node( editor, Path.previous( path ) )
    if( canMerge( element, previous ) )
      return {
        enabled: true,
        merge() {
          SlateList.merge( editor, path, previousPath )
          editor.focus( previousPath )
        },
      }
  } catch( e ) {
    log.info( 'Impossible to use list merge : ', e )
  }
  return { enabled: false }
}
