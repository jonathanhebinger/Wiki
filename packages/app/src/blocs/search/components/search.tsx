import { SearchFilters } from 'src/blocs/search/components/search.filters'
import { SearchOptions } from 'src/blocs/search/components/search.options'
import { SearchSelected } from 'src/blocs/search/components/search.selected'
import { Surface } from 'src/blocs/structure/surface'

import { SearchContextProvider } from '../search.context'
import { SearchContext } from '../search.type'
import { SearchInput } from './search.input'

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
            onClick: () => store.actions.$focus(),
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
