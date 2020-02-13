import { createAction } from '@reduxjs/toolkit'
import { NOTE_CLOSE, NOTE_CREATE, NOTE_DELETE, NOTE_OPEN, NOTE_SAVE } from 'src/constants'
import { noteSelectorSelectedAsIds } from 'src/selectors'
import { INote, Thunk } from 'src/types'
import uuid from 'uuid'

export const noteActionCreate = createAction( NOTE_CREATE, ( id: string ) => ( { payload: id } ) )
export const noteActionOpen = createAction( NOTE_OPEN, ( id: string ) => ( { payload: id } ) )
export const noteActionClose = createAction( NOTE_CLOSE, ( id: string ) => ( { payload: id } ) )
export const noteActionSave = createAction( NOTE_SAVE, ( note: INote ) => ( { payload: note } ) )
export const noteActionDelete = createAction( NOTE_DELETE, ( id: string ) => ( { payload: id } ) )

export const noteThunkCreate = (): Thunk => dispatch => {
  const id = uuid.v4()
  dispatch( noteActionCreate( id ) )
  dispatch( noteActionOpen( id ) )
}

export const noteThunkDelete = ( id: string ): Thunk => dispatch => {
  dispatch( noteActionClose( id ) )
  dispatch( noteActionDelete( id ) )
}

export const noteThunkCloseAll = (): Thunk => ( dispatch, getState ) =>
  noteSelectorSelectedAsIds( getState() ).forEach( id => dispatch( noteActionClose( id ) ) )
