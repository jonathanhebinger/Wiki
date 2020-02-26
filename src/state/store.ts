import { applyMiddleware, combineReducers, createStore } from 'redux'
import thunk from 'redux-thunk'

import { noteReducer } from './note'
import { noteOpenedReducer } from './note.opened'

export const store = createStore(
  combineReducers( {
    notes: noteReducer,
    selected: noteOpenedReducer,
  } ),
  applyMiddleware( thunk ),
)
