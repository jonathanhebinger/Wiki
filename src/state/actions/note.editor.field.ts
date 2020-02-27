import {
  NOTE_KEY_ADD,
  NOTE_KEY_DELETE,
  NOTE_KEY_EDIT,
  NOTE_KEY_RESET,
  NOTE_KEY_SAVE,
  NOTE_KEY_UPDATE,
} from 'src/constants'
import { noteEditorSelectorById, noteSelectorById } from 'src/selectors'
import { noteSaveAction } from 'src/state/actions'
import { Action, ID, Key, Thunk } from 'src/types'
import { createAction } from 'src/utils'

export type NoteEditorFieldAddAction = Action<typeof NOTE_KEY_ADD, { id: ID; key: Key; value?: any }>
export type NoteEditorFieldSaveAction = Action<typeof NOTE_KEY_SAVE, { id: ID; key: Key }>
export type NoteEditorFieldUpdateAction = Action<typeof NOTE_KEY_UPDATE, { id: ID; key: Key; value: any }>
export type NoteEditorFieldEditAction = Action<typeof NOTE_KEY_EDIT, { id: ID; key: Key }>
export type NoteEditorFieldResetAction = Action<typeof NOTE_KEY_RESET, { id: ID; key: Key }>
export type NoteEditorFieldDeleteAction = Action<typeof NOTE_KEY_DELETE, { id: ID; key: Key }>

export type NoteEditorFieldActions =
  | NoteEditorFieldAddAction
  | NoteEditorFieldSaveAction
  | NoteEditorFieldUpdateAction
  | NoteEditorFieldEditAction
  | NoteEditorFieldResetAction
  | NoteEditorFieldDeleteAction

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
  const note = noteSelectorById( id )( getState() )
  const patch = Object.assign( {}, note, { [ key ]: key } )
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
  Object.keys( editor.keys ).map( key => noteEditorFieldSave( id, key as Key ) )
}
