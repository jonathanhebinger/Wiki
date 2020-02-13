import constate from 'constate'
import { useCallback, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { noteActionClose, noteActionSave, noteThunkDelete } from 'src/actions'
import { noteSelectorById } from 'src/selectors'

export const [ NoteProvider, useNoteContext ] = constate( ( { id }: { id: string } ) => {
  const dispatch = useDispatch()

  const note = useSelector( noteSelectorById( id ) )

  const [ editing, setEditing ] = useState( false )

  const edit = useCallback( () => setEditing( true ), [] )

  const save = useCallback( () => {
    setEditing( false )
    dispatch( noteActionSave( note ) )
  }, [ dispatch, note ] )

  const close = useCallback( () => {
    dispatch( noteActionClose( note.id ) )
  }, [ dispatch, note.id ] )

  const remove = useCallback( () => {
    dispatch( noteThunkDelete( note.id ) )
  }, [ dispatch, note.id ] )

  return { editing, edit, save, note, close, remove }
} )
