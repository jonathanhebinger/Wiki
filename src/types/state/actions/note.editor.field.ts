import {
  NOTE_KEY_ADD,
  NOTE_KEY_DELETE,
  NOTE_KEY_EDIT,
  NOTE_KEY_RESET,
  NOTE_KEY_SAVE,
  NOTE_KEY_UPDATE,
} from 'src/constants'
import { ID, Key } from 'src/types/models'
import { Action } from 'src/types/state'

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
