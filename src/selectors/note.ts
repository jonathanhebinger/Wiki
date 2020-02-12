import { createSelector } from 'reselect'
import { IState } from 'src/types'
import { find } from 'src/utils'

export function getNotes( state: IState ) {
  return state.notes
}

export function getSelected( state: IState ) {
  return state.selected
}

export const getSelectedNotes = createSelector(
  getSelected,
  getNotes,
  ( selected, notes ) => Array.from( selected ).map( id => find( notes, id ) ),
)
