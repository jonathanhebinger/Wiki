import constate from 'constate'
import { useCallback, useState } from 'react'
import { useDispatch } from 'react-redux'
import { noteActionClose, noteActionDelete, noteActionSave } from 'src/actions'
import { INote } from 'src/types'

export const [ NoteProvider, useNoteContext ] = constate( ( { note }: { note: INote } ) => {
  const dispatch = useDispatch()

  const [ editing, setEditing ] = useState( false )
  const [ unsaved, setUnsaved ] = useState( false )

  const edit = useCallback( () => setEditing( true ), [] )

  const save = useCallback( () => {
    setEditing( false )
    setUnsaved( false )
    dispatch( noteActionSave( note ) )
  }, [ dispatch, note ] )

  const close = useCallback( () => {
    if( unsaved ) { setUnsaved( false ) }
    if( !unsaved ) { dispatch( noteActionClose( note.id ) ) }
  }, [ dispatch, note.id, unsaved ] )

  const remove = useCallback( () => {
    dispatch( noteActionDelete( note.id ) )
  }, [ dispatch, note.id ] )

  return { editing, edit, save, note, close, remove }
} )
