import { createReducer } from '@reduxjs/toolkit'
import { noteActionClose, noteActionOpen } from 'src/actions'
import { INoteDetails } from 'src/types'

export const noteOpenedReducer = createReducer( [] as INoteDetails[], builder =>
  builder
    .addCase( noteActionOpen, ( state, { payload } ) => {
      state.
    } )
    .addCase( noteActionClose, ( state, { payload } ) => {
      delete state[ payload ]
    } ),
)
