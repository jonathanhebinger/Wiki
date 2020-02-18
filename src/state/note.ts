import { createReducer } from '@reduxjs/toolkit'
import { noteActionCreate, noteActionDelete, noteActionSave } from 'src/actions'
import { INote } from 'src/types'
import { find, remove } from 'src/utils'

export const noteReducer = createReducer( [] as INote[], builder =>
  builder
    .addCase( noteActionCreate, ( state, { payload } ) => {
      state.push( {
        id: payload,
        title: 'New note',
        content: '42',
        creation: Date.now(),
        modification: Date.now(),
      } )
    } )
    .addCase( noteActionSave, ( state, { payload } ) => {
      const note = find( state, payload.id )
      Object.assign( note, payload )
      note.modification = Date.now()
    } )
    .addCase( noteActionDelete, ( state, { payload } ) => {
      remove( state, payload )
    } ),
)