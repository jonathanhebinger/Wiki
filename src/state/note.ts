import produce from 'immer'
import { INoteActions } from 'src/actions'
import { NOTE_CREATE, NOTE_DELETE, NOTE_SAVE } from 'src/constants'
import { ID, INote } from 'src/types'
import { find, remove } from 'src/utils'

const noteCreateHandler = ( state: INote[], id: ID ) => state.push( {
  id,
  title: 'New note',
  content: '42',
  creation: Date.now(),
  modification: Date.now(),
} )

const noteSaveHandler = ( state: INote[], patch: INote ) => {
  const note = find( state, patch.id )
  Object.assign( note, patch )
  note.modification = Date.now()
}

export const noteReducer = produce( ( state: INote[], action: INoteActions ) => {
  switch( action.type ) {
    case NOTE_CREATE:
      noteCreateHandler( state, action.payload )
      break
    case NOTE_SAVE:
      noteSaveHandler( state, action.payload )
      break
    case NOTE_DELETE:
      remove( state, action.payload )
      break
  }
} )
