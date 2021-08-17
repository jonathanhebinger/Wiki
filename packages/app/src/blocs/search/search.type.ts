import { Action, Actions, Computed, State, ThunkOn } from 'easy-peasy'

export interface SearchFilter<O> {
  id: string | number
  name: React.ReactNode
  test: (option: O) => boolean
}

export interface SearchStore<O> {
  // State
  value: string
  opened: boolean
  filters: SearchFilter<O>[]

  // Computed
  options_filtered: Computed<this, O[]>

  // Actions
  $focus: Action<this>
  $unfocus: Action<this>
  $change: Action<this, string>
  filters$add: Action<this, SearchFilter<O>>
  filters$remove: Action<this, SearchFilter<O>>

  // ThunksOn
  $refocus: ThunkOn<this>
}

export type SearchContext<O> = {
  state: State<SearchStore<O>>
  actions: Actions<SearchStore<O>>
  input_ref: React.RefObject<HTMLInputElement>
  block_ref: React.RefObject<HTMLDivElement>
  Option: (props: { option: O }) => React.ReactElement
}
