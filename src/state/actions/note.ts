import { NOTE_CREATE, NOTE_DELETE, NOTE_SAVE } from 'src/constants'
import { noteClose, noteOpen } from 'src/state/actions'
import { ID, INote } from 'src/types/models'
import { Thunk } from 'src/types/state'
import { createAction } from 'src/utils'
import uuid from 'uuid'

export const noteCreateAction = createAction( NOTE_CREATE, ( id: ID ) => id )
export const noteSaveAction = createAction( NOTE_SAVE, ( note: Partial<INote> & Pick<INote, 'id'> ) => note )
export const noteDeleteAction = createAction( NOTE_DELETE, ( id: ID ) => id )

export const noteCreate = (): Thunk => dispatch => {
  const id = uuid.v4()
  dispatch( noteCreateAction( id ) )
  dispatch( noteOpen( id ) )
}
export const noteSave = ( note: Partial<INote> & Pick<INote, 'id'> ) => noteSaveAction( note )
export const noteDelete = ( id: ID ): Thunk => dispatch => {
  dispatch( noteClose( id ) )
  dispatch( noteDeleteAction( id ) )
}
