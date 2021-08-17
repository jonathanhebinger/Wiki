import { useSearchContext } from '../search.context'

export function SearchOptions() {
  const { state, Option } = useSearchContext()

  if (!state.opened) return null

  const Options = state.options_filtered.map((option, index) => {
    return <Option option={option} key={index} />
  })

  return (
    <div className="bg-white border relative bottom-0 overflow-auto">
      {Options}
    </div>
  )
}
