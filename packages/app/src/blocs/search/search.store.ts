import { useEffect, useRef } from 'react'
import { useObserve, useSystem } from 'src/bang/hooks/system'
import { useOnClickOutside } from 'src/util/useOnClickOutside'

import { SearchContext, SearchFilter, SearchStoreConfig } from './search.type'

export function useSearchStore<O>({
  options,
  filterSelected = true,
  multiple = true,
  Option,
  Selected,
  onChange,
}: SearchStoreConfig<O>): SearchContext<O> {
  const input_ref = useRef<HTMLInputElement>(null)
  const block_ref = useRef<HTMLDivElement>(null)

  const tuple = useSystem(() => ({
    options,

    value: '',
    opened: false,
    filters: [] as SearchFilter<O>[],
    selected: [] as O[],

    get filtered() {
      let options_filtered = options

      if (filterSelected) {
        options_filtered = options_filtered.filter(
          option => !this.selected.includes(option),
        )
      }

      const sizes: number[] = []

      options_filtered = this.filters.reduce((options, filter) => {
        options = options.filter(option => filter.test(option))

        sizes.push(options.length)

        return options
      }, options_filtered)

      return { options: options_filtered, sizes }
    },

    change(value: string) {
      this.value = value
    },

    focus() {
      this.opened = true
      input_ref.current?.focus()
    },
    unfocus() {
      this.opened = false
    },

    selected_add(option: O) {
      if (multiple) {
        this.selected.includes(option) || this.selected.push(option)
        this.opened = false
      } else {
        this.selected = [option]
        this.opened = false
      }
    },
    selected_clear() {
      this.selected = []
    },
    selected_remove(index: number) {
      this.selected.splice(index, 1)
    },

    filters_add(filter: SearchFilter<O>) {
      if (!this.filters.find(f => f.id === filter.id)) {
        this.filters.push(filter)
      }
    },
    filters_remove(filter: SearchFilter<O>) {
      this.filters = this.filters.filter(f => f.id !== filter.id)
    },
  }))

  const [state, actions, refs] = tuple

  useEffect(() => {
    onChange && onChange(state.selected)
  }, [options])

  useObserve(refs.filters_add, () => {
    actions.focus()
  })
  useObserve(refs.filters_remove, () => {
    actions.focus()
  })

  useEffect(() => {
    onChange && onChange(state.selected)
  }, [state.selected])

  useEffect(() => {
    function listener(event: KeyboardEvent) {
      switch (event.key) {
        case 'Escape':
          actions.unfocus()
      }
    }

    addEventListener('keydown', listener)

    return () => removeEventListener('keydown', listener)
  }, [])

  useOnClickOutside(block_ref, e => {
    actions.unfocus()
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
