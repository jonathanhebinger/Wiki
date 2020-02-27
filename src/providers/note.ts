import constate from 'constate'
import { useMemo } from 'react'
import { noteEditorSelectorById, noteSelectorById } from 'src/selectors'
import {
  noteClose,
  noteDelete,
  noteEditorFieldDelete,
  noteEditorFieldEdit,
  noteEditorFieldSave,
  noteEditorFieldSaveAll,
  noteEditorFieldUpdate,
} from 'src/state'
import { ID, INote } from 'src/types'
import { useDispatch, useSelector } from 'src/utils'

export const [ NoteEditorProvider, useEditorNoteContext ] = constate( ( { id }: { id: ID } ) => {
  const dispatch = useDispatch()
  const note = useSelector( noteSelectorById( id ) )
  const editor = useSelector( noteEditorSelectorById( id ) )
  const values = Object.values( editor.keys )
  const editing = useMemo( () => values.some( field => field.editing === true ), [ values ] )
  const modified = useMemo( () => values.some( ( { value } ) => value.old !== value.new ), [ values ] )
  console.log( modified, editing )
  const save = () => dispatch( noteEditorFieldSaveAll( id ) )
  const close = () => dispatch( noteClose( id ) )
  const remove = () => dispatch( noteDelete( id ) )

  return { note, editing, modified, save, close, remove, editor, id }
} )

export const useNoteEditorFieldProvider = ( key: keyof INote ) => {
  const dispatch = useDispatch()

  const {
    editor: { id, keys },
  } = useEditorNoteContext()
  const field = keys[ key ]

  const edit = () => dispatch( noteEditorFieldEdit( id, key ) )
  const save = () => dispatch( noteEditorFieldSave( id, key ) )
  const update = ( value: any ) => dispatch( noteEditorFieldUpdate( id, key, value ) )
  const reset = () => dispatch( noteEditorFieldEdit( id, key ) )
  const remove = () => dispatch( noteEditorFieldDelete( id, key ) )

  return { field, edit, save, update, reset, remove }
}
