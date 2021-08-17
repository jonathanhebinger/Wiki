import { useSearchContext } from '../search.context'

const INPUT_CLASS =
  ' outline-none' + //tw
  ' w-32 flex-grow' + //tw
  ' border-b focus:border-gray-500' + //tw
  ' hover:bg-gray-50' + //tw
  ' m-2 px-2' //tw

export function SearchInput() {
  const { input_ref, actions } = useSearchContext()

  return (
    <input
      ref={input_ref}
      type="text"
      className={INPUT_CLASS}
      onChange={e => actions.$change(e.target.value)}
    />
  )
}
