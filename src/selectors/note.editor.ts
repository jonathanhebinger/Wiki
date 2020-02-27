import { createSelector } from 'reselect'
import { IState } from 'src/types'

export const noteEditorSelectorAll = ( state: IState ) => state.selected
export const noteEditorSelectorById = ( id: string ) => ( state: IState ) => state.selected[ id ]

export const noteEditorSelectorToIds = createSelector(
  noteEditorSelectorAll,
  selected => Object.keys( selected ),
)
