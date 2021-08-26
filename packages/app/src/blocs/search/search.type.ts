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
  selected: O[]

  // Computed
  filtered: Computed<this, { options: O[]; sizes: number[] }>

  // Actions
  $focus: Action<this>
  $unfocus: Action<this>
  $change: Action<this, string>
  selected$add: Action<this, O>
  selected$clear: Action<this>
  selected$remove: Action<this, number>
  filters$add: Action<this, SearchFilter<O>>
  filters$remove: Action<this, SearchFilter<O>>

  // ThunksOn
  $refocus: ThunkOn<this>
}

export interface SearchStoreConfig<O> {
  options: O[]
  filterSelected?: boolean
  multiple?: boolean
  Option: SearchOption<O>
  Selected: SearchSelected<O>
}

export interface SearchOptionProps<O> {
  option: O
  selected: boolean
  focused: boolean
  onSelect: () => void
}
export type SearchOption<O> = (
  props: SearchOptionProps<O>,
) => React.ReactElement

export interface SearchSelectedProps<O> {
  option: O
  index: number
}
export type SearchSelected<O> = (
  props: SearchSelectedProps<O>,
) => React.ReactElement

export type SearchContext<O> = {
  state: State<SearchStore<O>>
  actions: Actions<SearchStore<O>>
  input_ref: React.RefObject<HTMLInputElement>
  block_ref: React.RefObject<HTMLDivElement>
  Option: SearchOption<O>
  Selected: SearchSelected<O>
}
