import constate from 'constate'
import { useEffect, useMemo, useRef, useState } from 'react'
import { Node_Id } from 'src/node/type'
import { useStoreState } from 'src/store'

export interface I_NodeSearch_Option {
  id: Node_Id
  name: string
  tags: Node_Id[]
  tags_name: string[]
  test: string
}

type Filter_Tag = {
  type: 'tag'
  name: string
  tag: Node_Id
}
type Filter_Text = {
  type: 'text'
  name: string
  test: string
}
type Filter = Filter_Tag | Filter_Text

export const [NodeSearch_ContextProvider, use_NodeSearch_Context] = constate(
  () => {
    // GLobal state

    const nodes = useStoreState(state => state.nodes.entities)
    const nodes_map = useStoreState(state => state.nodes.dictionnary)

    // Local state

    const [value, value$set] = useState('')
    const [opened, opened$set] = useState(false)
    const [option, option$set] = useState<I_NodeSearch_Option>()
    const [option_index, option_index$set] = useState(0)
    const [filters, filters$set] = useState<Filter[]>([
      { type: 'text', name: '', test: '' },
    ])

    const ref = useRef({
      index: option_index,
      size: 0,
    })

    // Computed

    const options = useMemo<I_NodeSearch_Option[]>(
      () =>
        nodes.map(node => ({
          id: node.id,
          name: node.name,
          test: node.name.toLowerCase(),
          tags: node.tags,
          tags_name: node.tags.map(tag => nodes_map[tag]?.name || ''),
        })),
      [nodes],
    )
    const options_filtered = useMemo(
      () =>
        options.filter(option =>
          filters.every(filter => {
            return filter.type === 'tag'
              ? option.tags.includes(filter.tag)
              : option.test.includes(filter.test)
          }),
        ),
      [options, filters],
    )

    // Actions

    function filters$add(option: I_NodeSearch_Option) {
      filters$set([
        ...filters,
        { type: 'tag', name: option.name, tag: option.id },
      ])
    }
    function filters$delete(filter: Filter) {
      filters$set(filters.filter(f => f !== filter))
    }

    // Effects

    useEffect(() => {
      const filter = filters[0] as Filter_Text
      filter.name = value
      filter.test = value.toLowerCase()
      filters$set([...filters])
    }, [value])

    useEffect(() => {
      ref.current.index = option_index
    }, [option_index])

    useEffect(() => {
      ref.current.size = options_filtered.length
    }, [options_filtered])

    useEffect(() => {
      function keyboard_listener(e: KeyboardEvent) {
        const { index, size } = ref.current

        switch (e.key) {
          case 'ArrowUp':
            option_index$set(index - 1 < 0 ? size - 1 : index - 1)
            break
          case 'ArrowDown':
            option_index$set(index + 1 >= size ? 0 : index + 1)
            break
        }
      }

      window.addEventListener('keydown', keyboard_listener)

      return () => {
        window.removeEventListener('keydown', keyboard_listener)
      }
    }, [])

    return {
      option,
      option$set,

      option_index,
      option_index$set,

      options,
      options_filtered,

      opened,
      opened$set,

      filters,
      filters$add,
      filters$delete,

      value,
      value$set,
    }
  },
)
