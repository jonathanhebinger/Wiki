import { Badge } from 'src/blocs/badge'

import { useSearchContext } from '../search.context'

export function SearchFilters() {
  const { state, actions } = useSearchContext()

  const Filters = state.filters.map((filter, index) => {
    return (
      <Badge
        key={index}
        className="m-2"
        label={filter.name}
        onDelete={() => actions.filters$remove(filter)}
      />
    )
  })

  return <>{Filters}</>
}
