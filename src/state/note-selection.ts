import { createReducer } from '@reduxjs/toolkit'
import { noteActionClose, noteActionDelete, noteActionOpen } from 'src/actions'

export const noteSelectionReducer = createReducer( new Set<string>(), builder =>
  builder
    .addCase( noteActionOpen, ( state, { payload } ) => {
      state.add( payload )
    } )
    .addCase( noteActionClose, ( state, { payload } ) => {
      state.delete( payload )
    } )
    .addCase( noteActionDelete, ( state, { payload } ) => {
      state.delete( payload )
    } ),
)
