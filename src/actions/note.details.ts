import { createAction } from '@reduxjs/toolkit'
import { NOTE_CLOSE, NOTE_OPEN } from 'src/constants'
import { noteSelectorById, noteSelectorSelectedAsIds } from 'src/selectors'
import { ID, INote, INoteDetails, Thunk } from 'src/types'

export const noteActionOpen = createAction( NOTE_OPEN, ( id: ID ) => ( { payload: id } ) )
export const noteActionClose = createAction( NOTE_CLOSE, ( id: ID ) => ( { payload: id } ) )

const reducer = ( acc: INoteDetails[ 'keys' ], [ key, value ]: [ string, any ] ) => {
  acc[ key as keyof INote ] = {
    required: false,
    editable: true,
    editing: false,
    value: { old: value, new: value },
  }
  return acc
}

const noteToNoteDetails = ( note: INote ): INoteDetails => {
  return {
    id: note.id,
    keys: Object.entries( note ).reduce( reducer, {} as INoteDetails[ 'keys' ] ),
  }
}

export const noteOpen = ( id: ID ): Thunk => ( dispatch, getState ) => {
  const note = noteSelectorById( id )( getState() )
  dispatch( noteActionOpen( noteToNoteDetails( note ) ) )
}
export const noteClose = ( id: ID ) => noteActionClose( id )
export const noteCloseAll = (): Thunk => ( dispatch, getState ) =>
  noteSelectorSelectedAsIds( getState() ).forEach( id => dispatch( noteActionClose( id ) ) )
