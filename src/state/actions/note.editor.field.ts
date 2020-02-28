import {
  NOTE_KEY_ADD,
  NOTE_KEY_DELETE,
  NOTE_KEY_EDIT,
  NOTE_KEY_RESET,
  NOTE_KEY_SAVE,
  NOTE_KEY_UPDATE,
} from 'src/constants'
import { noteSaveAction } from 'src/state/actions'
import { noteEditorSelectorById, noteSelectorById } from 'src/state/selectors'
import { ID, Key } from 'src/types/models'
import { Thunk } from 'src/types/state'
import { createAction } from 'src/utils'

const noteEditorFieldDefaultBuilder = ( id: ID, key: Key ) => ( { id, key } )
const noteEditorFieldAddBuilder = ( id: ID, key: Key, value?: any ) => ( { id, key, value } )
const noteEditorFieldUpdateBuilder = ( id: ID, key: Key, value: any ) => ( { id, key, value } )

export const noteEditorFieldAddAction = createAction( NOTE_KEY_ADD, noteEditorFieldAddBuilder )
export const noteEditorFieldSaveAction = createAction( NOTE_KEY_SAVE, noteEditorFieldDefaultBuilder )
export const noteEditorFieldUpdateAction = createAction( NOTE_KEY_UPDATE, noteEditorFieldUpdateBuilder )
export const noteEditorFieldEditAction = createAction( NOTE_KEY_EDIT, noteEditorFieldDefaultBuilder )
export const noteEditorFieldResetAction = createAction( NOTE_KEY_RESET, noteEditorFieldDefaultBuilder )
export const noteEditorFieldDeleteAction = createAction( NOTE_KEY_DELETE, noteEditorFieldDefaultBuilder )

export const noteEditorFieldAdd = noteEditorFieldAddAction
export const noteEditorFieldSave = ( id: ID, key: Key ): Thunk => ( dispatch, getState ) => {
  dispatch( noteEditorFieldSaveAction( id, key ) )
  const editor = noteEditorSelectorById( id )( getState() )
  const patch = Object.assign( { id }, { [ key ]: editor.keys[ key ].value.new } )
  dispatch( noteSaveAction( patch ) )
}
export const noteEditorFieldUpdate = noteEditorFieldUpdateAction
export const noteEditorFieldEdit = noteEditorFieldEditAction
export const noteEditorFieldReset = noteEditorFieldResetAction
export const noteEditorFieldDelete = ( id: ID, key: Key ): Thunk => ( dispatch, getState ) => {
  dispatch( noteEditorFieldSave( id, key ) )
  const note = noteSelectorById( id )( getState() )
  const patch = Object.assign( {}, note )
  delete patch[ key ]
  dispatch( noteSaveAction( patch ) )
}

export const noteEditorFieldSaveAll = ( id: ID ): Thunk => ( dispatch, getState ) => {
  const editor = noteEditorSelectorById( id )( getState() )
  const patch = Object.keys( editor.keys ).reduce(
    ( acc, key ) => Object.assign( acc, { [ key as Key ]: editor.keys[ key as Key ].value.new } ),
    { id },
  )
  dispatch( noteSaveAction( patch ) )
}
