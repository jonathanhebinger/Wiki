import { applyMiddleware, combineReducers, createStore } from 'redux'
import thunk from 'redux-thunk'

import { noteReducer } from './note'
import { noteSelectionReducer } from './note-selection'

export const store = createStore(
  combineReducers( {
    notes: noteReducer,
    selected: noteSelectionReducer,
  } ),
  applyMiddleware( thunk ),
)
