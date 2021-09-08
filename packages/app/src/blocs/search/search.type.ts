export interface SearchFilter<O> {
  id: string | number
  name: React.ReactNode
  test: (option: O) => boolean
}

export interface SearchStoreState<O> {
  value: string
  opened: boolean
  filters: SearchFilter<O>[]
  selected: O[]

  filtered: { options: O[]; sizes: number[] }
}
export interface SearchStoreActions<O> {
  focus(): void
  unfocus(): void
  change(value: string): void
  selected_add(option: O): void
  selected_clear(): void
  selected_remove(index: number): void
  filters_add(filter: SearchFilter<O>): void
  filters_remove(filter: SearchFilter<O>): void
}

export type SearchStore<O> = SearchStoreState<O> & SearchStoreActions<O>

export interface SearchStoreConfig<O> {
  options: O[]
  filterSelected?: boolean
  multiple?: boolean
  Option: SearchOption<O>
  Selected: SearchSelected<O>
  onChange?: (selected: O[]) => void
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
  state: SearchStoreState<O>
  actions: SearchStoreActions<O>
  input_ref: React.RefObject<HTMLInputElement>
  block_ref: React.RefObject<HTMLDivElement>
  Option: SearchOption<O>
  Selected: SearchSelected<O>
}
