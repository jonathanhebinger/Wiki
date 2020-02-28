import { NOTE_EDITOR_CLOSE, NOTE_EDITOR_OPEN } from 'src/constants'
import { ID, INote } from 'src/types/models'
import { Action } from 'src/types/state'
import { NoteEditorFieldActions } from 'src/types/state/actions'

export type NoteEditorOpenAction = Action<typeof NOTE_EDITOR_OPEN, { id: ID; note: INote }>
export type NoteEditorCloseAction = Action<typeof NOTE_EDITOR_CLOSE, ID>

export type NoteEditorActions = NoteEditorOpenAction | NoteEditorCloseAction | NoteEditorFieldActions
