import { Surface } from 'src/blocs/structure/surface'

import { SearchContextProvider } from '../search.context'
import { SearchContext } from '../search.type'
import { SearchFilters } from './search.filters'
import { SearchInput } from './search.input'
import { SearchOptions } from './search.options'
import { SearchSelected } from './search.selected'

export interface SearchProps {
  store: SearchContext<any>
}
export function Search({ store }: SearchProps) {
  return (
    <SearchContextProvider store={store}>
      <div className="relative" ref={store.block_ref}>
        <Surface
          className="flex flex-col"
          htmlProps={{
            onClick: () => store.actions.focus(),
          }}
        >
          <SearchFilters />
          <SearchInput />
          <SearchSelected />
        </Surface>
        <SearchOptions />
      </div>
    </SearchContextProvider>
  )
}
