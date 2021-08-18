import { Surface } from 'src/blocs/surface'

import { useSearchContext } from '../search.context'

export function SearchOptions() {
  const { state, actions, Option } = useSearchContext()

  if (!state.opened || state.filtered.options.length === 0) return null

  const Options = state.filtered.options.map((option, index) => {
    return (
      <Option
        option={option}
        selected={state.selected.includes(option)}
        focused={false}
        onSelect={() => actions.selected$add(option)}
        key={index}
      />
    )
  })

  return (
    <Surface
      className="bg-white relative bottom-0 overflow-auto -mx-1"
      shadow="large"
    >
      {Options}
    </Surface>
  )
}
