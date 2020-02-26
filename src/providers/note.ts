import constate from 'constate'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { noteActionClose, noteDelete, noteSaveAction } from 'src/actions'
import { noteSelectorById } from 'src/selectors'
import { INote } from 'src/types'

const reducer = ( acc: State<INote>, [ key, value ]: [ string, any ] ) => {
  acc[ key as keyof INote ] = {
    required: false,
    editable: true,
    editing: false,
    value: { old: value, new: value },
  }
  return acc
}

export const [ NoteProvider, useNoteContext ] = constate( ( { id }: { id: string } ) => {
  const dispatch = useDispatch()

  const note = useSelector( noteSelectorById( id ) )
  const [ state, setState ] = useState( Object.entries( note ).reduce( reducer, {} as State<INote> ) )
  const [ editing, setEditing ] = useState( false )

  useEffect( () => {
    setState( Object.entries( note ).reduce(
      ( acc, [ key, value ]: [ string, any ] ) => {
        const field = {
          required: false,
          editable: true,
          editing: false,
          value: { old: value, new: value },
        }

        const oldField = state[ key as keyof INote ]
        if( oldField ) {
          Object.assign( field, oldField )
          field.value = { old: value, new: value }
        }

        acc[ key as keyof INote ] = field

        return acc
      },
      {} as State<INote>,
    ) )
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ note ] )

  const edit = () => setEditing( true )
  const save = () => {
    setEditing( false )
    dispatch( noteSaveAction( note ) )
  }
  const close = () => dispatch( noteActionClose( note.id ) )
  const remove = () => dispatch( noteDelete( note.id ) )

  return { editing, edit, save, note, close, remove, state }
} )

export const useNoteFieldProvider = ( key: keyof INote ) => {
  const { note, ...context } = useNoteContext()
  const field = context.state[ key ]

  const edit = () => {
    context.edit()
  }
  const save = () => {
    Reflect.set( note, key, field.value.new )
    context.save()
  }
  const remove = () => delete note[ key ]

  return { ...field, save, remove }
}
