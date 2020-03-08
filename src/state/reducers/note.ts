import { NOTE_CREATE, NOTE_DELETE, NOTE_SAVE } from 'src/constants'
import { ID, INote } from 'src/types/models'
import { NoteActions } from 'src/types/state/actions'
import { find, remove } from 'src/utils'

export const noteReducer = ( state: INote[] = [], action: NoteActions ) => {
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
    default:
      return state
  }
}

const noteCreateHandler = ( state: INote[], id: ID ) =>
  state.push( {
    id,
    title: 'New note',
    content: '42',
    creation: Date.now(),
    modification: Date.now(),
  } )

const noteSaveHandler = ( state: INote[], patch: Partial<INote> & Pick<INote, 'id'> ) => {
  const note = find( state, patch.id )
  Object.assign( note, patch )
  note.modification = Date.now()
}