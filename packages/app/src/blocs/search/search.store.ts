import { action, computed, thunkOn, useLocalStore } from 'easy-peasy'
import { useEffect, useRef } from 'react'
import { useOnClickOutside } from 'src/util/useOnClickOutside'

import { SearchContext, SearchFilter, SearchStore } from './search.type'

export interface useSearchStoreProps<O> {
  options: O[]
  Option: (props: { option: O }) => React.ReactElement
}

export function useSearchStore<O>({
  options,
  Option,
}: useSearchStoreProps<O>): SearchContext<O> {
  const input_ref = useRef<HTMLInputElement>(null)
  const block_ref = useRef<HTMLDivElement>(null)

  const [state, actions] = useLocalStore<SearchStore<O>>(
    previous => ({
      value: '',
      opened: false,
      filters: [],
      ...previous,

      options_filtered: computed(state => {
        return state.filters.reduce((options, filter) => {
          options = options.filter(option => filter.test(option))

          options.length

          return options
        }, options)
      }),

      $focus: action(state => {
        state.opened = true

        input_ref.current?.focus()
      }),
      $unfocus: action(state => {
        state.opened = false
      }),
      $change: action((state, value) => {
        state.value = value
      }),
      filters$add: action((state, filter: SearchFilter<O>) => {
        state.filters.push(filter)
      }),
      filters$remove: action((state, filter: SearchFilter<O>) => {
        state.filters = state.filters.filter(f => f.id !== filter.id)
      }),

      $refocus: thunkOn(
        action => [action.filters$add, action.filters$remove],
        actions => {
          actions.$focus()
        },
      ),
    }),
    [options, Option],
  )

  useOnClickOutside(block_ref, () => {
    actions.$unfocus()
  })

  return {
    state,
    actions,
    input_ref,
    block_ref,
    Option,
  }
}
