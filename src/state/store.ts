import produce from 'immer'
import { applyMiddleware, combineReducers, createStore } from 'redux'
import thunk from 'redux-thunk'
import { noteEditorReducer, noteReducer } from 'src/state'

const mainReducer = combineReducers( {
  notes: produce( noteReducer ),
  selected: produce( noteEditorReducer ),
} )

export const store = createStore(
  mainReducer,
  applyMiddleware( thunk ),
)
