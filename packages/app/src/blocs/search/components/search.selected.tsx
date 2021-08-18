import { Badge } from 'src/blocs/badge'

import { useSearchContext } from '../search.context'

export function SearchSelected() {
  const { state, actions, Selected } = useSearchContext()

  const Filters = state.selected.map((option, index) => {
    return (
      <Badge
        key={index}
        className="m-1"
        label={<Selected option={option} index={index} />}
        onDelete={() => actions.selected$remove(index)}
      />
    )
  })

  return <div className="flex flex-wrap p-1">{Filters}</div>
}
