import { NOTE_CREATE, NOTE_DELETE, NOTE_SAVE } from 'src/constants'
import { ID, INote } from 'src/types/models'
import { Action } from 'src/types/state'

export type NoteCreateAction = Action<typeof NOTE_CREATE, ID>
export type NoteSaveAction = Action<typeof NOTE_SAVE, Partial<INote> & Pick<INote, 'id'>>
export type NoteDeleteAction = Action<typeof NOTE_DELETE, ID>

export type NoteActions = NoteCreateAction | NoteSaveAction | NoteDeleteAction
