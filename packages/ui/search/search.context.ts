import constate from 'constate'

import { SearchContext } from './search.type'

const Context = constate(({ store }: { store: SearchContext<any> }) => {
  return store
})

export type UseSearchContext = <O>() => SearchContext<O>

export const SearchContextProvider = Context[0]
export const useSearchContext = Context[1] as UseSearchContext
