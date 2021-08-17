import { SearchFilters } from 'src/blocs/search/components/search.filters'
import { SearchOptions } from 'src/blocs/search/components/search.options'

import { SearchContextProvider } from '../search.context'
import { SearchContext } from '../search.type'
import { SearchInput } from './search.input'

export interface SearchProps {
  store: SearchContext<any>
}
export function Search({ store }: SearchProps) {
  return (
    <SearchContextProvider store={store}>
      <div className="relative flex-grow" ref={store.block_ref}>
        <div
          className="border flex flex-wrap"
          onClick={() => store.actions.$focus()}
        >
          <SearchFilters />
          <SearchInput />
        </div>
        <SearchOptions />
      </div>
    </SearchContextProvider>
  )
}
