import { createReducer } from '@reduxjs/toolkit'
import { noteActionClose, noteActionOpen } from 'src/actions'

export const noteSelectionReducer = createReducer( {} as { [ index: string ]: boolean }, builder =>
  builder
    .addCase( noteActionOpen, ( state, { payload } ) => {
      state[ payload ] = true
    } )
    .addCase( noteActionClose, ( state, { payload } ) => {
      delete state[ payload ]
    } ),
)
