import { Surface } from '../../structure/surface'
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
    <div className="bg-white absolute bot-0 w-full overflow-visible z-10">
      <Surface shadow="xl" className="mx-1" border="lg">
        {Options}
      </Surface>
    </div>
  )
}
