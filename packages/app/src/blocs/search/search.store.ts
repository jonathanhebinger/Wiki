import { action, computed, thunkOn, useLocalStore } from 'easy-peasy'
import { useEffect, useRef } from 'react'
import { useOnClickOutside } from 'src/util/useOnClickOutside'

import {
  SearchContext,
  SearchFilter,
  SearchStore,
  SearchStoreConfig,
} from './search.type'

export function useSearchStore<O>({
  options,
  filterSelected = true,
  multiple = true,
  Option,
  Selected,
}: SearchStoreConfig<O>): SearchContext<O> {
  const input_ref = useRef<HTMLInputElement>(null)
  const block_ref = useRef<HTMLDivElement>(null)

  const [state, actions] = useLocalStore<SearchStore<O>>(
    previous => ({
      value: '',
      opened: false,
      filters: [],
      selected: [],

      ...previous,

      filtered: computed(state => {
        let options_filtered = options

        if (filterSelected) {
          options_filtered = options_filtered.filter(
            option => !state.selected.includes(option),
          )
        }

        const sizes: number[] = []

        options_filtered = state.filters.reduce((options, filter) => {
          options = options.filter(option => filter.test(option))

          sizes.push(options.length)

          return options
        }, options_filtered)

        return { options: options_filtered, sizes }
      }),

      $focus: action(state => {
        state.opened = true
        input_ref.current?.focus()
      }),
      $unfocus: action(state => {
        state.opened = false
      }),

      selected$add: action((state, option) => {
        if (multiple) {
          state.selected.includes(option) || state.selected.push(option)
          state.opened = false
        } else {
          state.selected = [option]
          state.opened = false
        }
      }),
      selected$clear: action(state => {
        state.selected = []
      }),
      selected$remove: action((state, index) => {
        state.selected.splice(index, 1)
      }),

      $change: action((state, value) => {
        state.value = value
      }),

      filters$add: action((state, filter: SearchFilter<O>) => {
        if (!state.filters.find(f => f.id === filter.id)) {
          state.filters.push(filter)
        }
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

  useEffect(() => {
    function listener(event: KeyboardEvent) {
      switch (event.key) {
        case 'Escape':
          actions.$unfocus()
      }
    }

    addEventListener('keydown', listener)

    return () => removeEventListener('keydown', listener)
  }, [])

  useOnClickOutside(block_ref, e => {
    actions.$unfocus()
  })

  return {
    state,
    actions,
    input_ref,
    block_ref,
    Option,
    Selected,
  }
}
