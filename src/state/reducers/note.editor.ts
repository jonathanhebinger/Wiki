import {
  NOTE_DELETE,
  NOTE_EDITOR_CLOSE,
  NOTE_EDITOR_OPEN,
  NOTE_KEY_ADD,
  NOTE_KEY_DELETE,
  NOTE_KEY_EDIT,
  NOTE_KEY_RESET,
  NOTE_KEY_SAVE,
  NOTE_KEY_UPDATE,
} from 'src/constants'
import {
  NoteDeleteAction,
  NoteEditorActions,
  NoteEditorFieldAddAction,
  NoteEditorFieldDeleteAction,
  NoteEditorFieldEditAction,
  NoteEditorFieldResetAction,
  NoteEditorFieldSaveAction,
  NoteEditorFieldUpdateAction,
} from 'src/state'
import { INote, INoteEditor, Payload, Wrapper } from 'src/types'

type State = Wrapper<INoteEditor>

export const noteEditorReducer = ( state: State = {}, action: NoteEditorActions | NoteDeleteAction ) => {
  switch( action.type ) {
    case NOTE_EDITOR_OPEN:
      state[ action.payload.id ] = noteToNoteDetails( action.payload.note )
      break
    case NOTE_DELETE:
    case NOTE_EDITOR_CLOSE:
      delete state[ action.payload ]
      break
    case NOTE_KEY_ADD:
      editorKeyAdd( state, action.payload )
      break
    case NOTE_KEY_EDIT:
      editorKeyEdit( state, action.payload )
      break
    case NOTE_KEY_UPDATE:
      editorKeyUpdate( state, action.payload )
      break
    case NOTE_KEY_SAVE:
      editorKeySave( state, action.payload )
      break
    case NOTE_KEY_RESET:
      editorKeyReset( state, action.payload )
      break
    case NOTE_KEY_DELETE:
      editorKeyDelete( state, action.payload )
      break
    default:
      return state
  }
}

const editorKeyAdd = ( state: State, { id, key, value }: Payload<NoteEditorFieldAddAction> ) =>
  ( state[ id ].keys[ key ] = {
    required: false,
    editable: true,
    editing: true,
    value: { old: value, new: value },
  } )
const editorKeyEdit = ( state: State, { id, key }: Payload<NoteEditorFieldEditAction> ) =>
  ( state[ id ].keys[ key ].editing = true )
const editorKeyUpdate = ( state: State, { id, key, value }: Payload<NoteEditorFieldUpdateAction> ) =>
  state[ id ].keys[ key ].value.new = value
const editorKeySave = ( state: State, { id, key }: Payload<NoteEditorFieldSaveAction> ) => {
  const field = state[ id ].keys[ key ]
  field.editing = false
  field.value.old = field.value.new
}
const editorKeyReset = ( state: State, { id, key }: Payload<NoteEditorFieldResetAction> ) =>
  state[ id ].keys[ key ].value.new = state[ id ].keys[ key ].value.old
const editorKeyDelete = ( state: State, { id, key }: Payload<NoteEditorFieldDeleteAction> ) =>
  delete state[ id ].keys[ key ]

const reducer = ( acc: INoteEditor[ 'keys' ], [ key, value ]: [ string, any ] ) => {
  acc[ key as keyof INote ] = {
    required: true,
    editable: true,
    editing: false,
    value: { old: value, new: value },
  }
  return acc
}

const noteToNoteDetails = ( note: INote ): INoteEditor => {
  return {
    id: note.id,
    keys: Object.entries( note ).reduce( reducer, {} as INoteEditor[ 'keys' ] ),
  }
}
