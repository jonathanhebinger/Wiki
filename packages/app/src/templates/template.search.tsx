import { NodeId } from '@brainote/common'
import {
  Search,
  SearchContext,
  SearchOptionProps,
  useSearchStore,
} from '@brainote/ui/search'
import React, { useEffect, useMemo } from 'react'

import { useModel } from '../root'

export function TemplateSearch({
  multiple = false,
  exclude = [],
  onChange,
}: {
  multiple?: boolean
  exclude?: NodeId[]
  onChange: (
    ids: NodeId[],
    context: SearchContext<TemplateSearch_Option>,
  ) => void
}) {
  const nodes = useModel(state => state.nodes)

  const options = useMemo<TemplateSearch_Option[]>(
    () =>
      nodes.templates
        .filter(template => !exclude.includes(template.id))
        .map(template => ({
          id: template.id,
          name: template['root.name'],
          test: template['root.name'].toLowerCase(),
        })),
    [nodes, exclude],
  )

  const store = useSearchStore({
    options,
    Option,
    Selected: ({ option }) => <div>{option.name}</div>,
    multiple,
  })

  useEffect(() => {
    onChange(
      store.state.selected.map(option => option.id),
      store,
    )
  }, [store.state.selected])

  return <Search store={store} />
}

interface TemplateSearch_Option {
  id: NodeId
  name: string
  test: string
}

function Option({
  option,
  selected,
  onSelect,
}: SearchOptionProps<TemplateSearch_Option>) {
  return (
    <div
      className={`px-2 py-1 flex justify-between items-center cursor-pointer hover:bg-gray-100 ${
        selected ? 'bg-gray-200' : ''
      }`}
      onClick={onSelect}
    >
      {option.name}
    </div>
  )
}
