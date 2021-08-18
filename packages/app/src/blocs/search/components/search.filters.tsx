import { Badge } from 'src/blocs/badge'

import { useSearchContext } from '../search.context'

export function SearchFilters() {
  const { state, actions } = useSearchContext()

  const Filters = state.filters.map((filter, index) => {
    return (
      <Badge
        key={index}
        className="m-1"
        label={filter.name + ' - ' + state.filtered.sizes[index]}
        onDelete={() => actions.filters$remove(filter)}
      />
    )
  })

  return <div className="flex flex-wrap p-1">{Filters}</div>
}
