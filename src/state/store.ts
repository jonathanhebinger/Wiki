import { combineReducers, createStore } from 'redux'

import { noteReducer } from './note'
import { noteSelectionReducer } from './note-selection'

export const store = createStore( combineReducers( {
  notes: noteReducer,
  selected: noteSelectionReducer,
} ) )
