import { createSelector } from 'reselect'
import { IState } from 'src/types/models'
import { find } from 'src/utils'

export const noteSelectorAll = ( state: IState ) => state.notes

export const noteSelectorById = ( id: string ) => ( state: IState ) => find( state.notes, id )

export const noteSelectorSelected = ( state: IState ) => state.selected

export const noteSelectorSelectedAsIds = createSelector(
  noteSelectorSelected,
  selected => Object.keys( selected ),
)

export const noteSelectorSortedByModification = createSelector(
  noteSelectorAll,
  notes => [ ...notes ].sort( ( a, b ) => a.modification - b.modification ),
)

export const noteSelectorSelectedAsNotes = createSelector(
  noteSelectorSelectedAsIds,
  noteSelectorAll,
  ( selected, notes ) => selected.map( id => find( notes, id ) ),
)
