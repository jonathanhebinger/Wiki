import { createAction } from '@reduxjs/toolkit'
import { noteSaveAction } from 'src/actions'
import {
  NOTE_KEY_ADD,
  NOTE_KEY_DELETE,
  NOTE_KEY_EDIT,
  NOTE_KEY_RESET,
  NOTE_KEY_SAVE,
  NOTE_KEY_UPDATE,
} from 'src/constants'
import { noteSelectorById } from 'src/selectors'
import { ID, Key, Thunk } from 'src/types'

export const noteKeyActionAdd = createAction( NOTE_KEY_ADD, ( id: ID, key: Key, value?: any ) => ( {
  payload: { id, key, value },
} ) )
export const noteKeyActionSave = createAction( NOTE_KEY_SAVE, ( id: ID, key: Key ) => ( {
  payload: { id, key },
} ) )
export const noteKeyActionUpdate = createAction(
  NOTE_KEY_UPDATE,
  ( id: ID, key: Key, value: any ) => ( { payload: { id, key, value } } ),
)
export const noteKeyActionEdit = createAction( NOTE_KEY_EDIT, ( id: ID, key: Key ) => ( {
  payload: { id, key },
} ) )
export const noteKeyActionReset = createAction( NOTE_KEY_RESET, ( id: ID, key: Key ) => ( {
  payload: { id, key },
} ) )
export const noteKeyActionDelete = createAction( NOTE_KEY_DELETE, ( id: ID, key: Key ) => ( {
  payload: { id, key },
} ) )

export const noteKeyThunkSave = ( id: ID, key: Key ): Thunk => ( dispatch, getState ) => {
  dispatch( noteKeyActionSave( id, key ) )
  const note = noteSelectorById( id )( getState() )
  const patch = Object.assign( {}, note, { [ key ]: key } )
  dispatch( noteSaveAction( patch ) )
}

export const noteKeyThunkDelete = ( id: ID, key: Key ): Thunk => ( dispatch, getState ) => {
  dispatch( noteKeyActionSave( id, key ) )
  const note = noteSelectorById( id )( getState() )
  const patch = Object.assign( {}, note )
  delete patch[ key ]
  dispatch( noteSaveAction( patch ) )
}
