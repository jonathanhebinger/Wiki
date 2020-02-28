import { NOTE_EDITOR_CLOSE, NOTE_EDITOR_OPEN } from 'src/constants'
import { noteSelectorById, noteSelectorSelectedAsIds } from 'src/state/selectors'
import { ID, INote } from 'src/types/models'
import { Thunk } from 'src/types/state'
import { createAction } from 'src/utils'

const noteEditorOpenBuilder = ( id: ID, note: INote ) => ( { id, note } )
export const noteEditorOpenAction = createAction( NOTE_EDITOR_OPEN, noteEditorOpenBuilder )
export const noteEditorCloseAction = createAction( NOTE_EDITOR_CLOSE, ( id: ID ) => id )

export const noteOpen = ( id: ID ): Thunk => ( dispatch, getState ) => {
  const note = noteSelectorById( id )( getState() )
  dispatch( noteEditorOpenAction( id, note ) )
}
export const noteClose = noteEditorCloseAction
export const noteCloseAll = (): Thunk => ( dispatch, getState ) =>
  noteSelectorSelectedAsIds( getState() ).forEach( id => dispatch( noteClose( id ) ) )
