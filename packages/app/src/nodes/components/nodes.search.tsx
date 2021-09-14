import { Node, NodeId } from '@brainote/common'
import { Button, useModal } from '@brainote/ui/forms'
import {
  Search,
  SearchContext,
  SearchOptionProps,
  useSearchStore,
} from '@brainote/ui/search'
import { Shelf } from '@brainote/ui/structure'
import { useEffect, useMemo, useState } from 'react'

import { useMain } from '../../main'

export type NodesSearchProps = {
  nodes: Node[]
  multiple?: boolean
  exclude?: NodeId[]
  onChange: (ids: NodeId[], context: SearchContext<NodeSearchOption>) => void
}
export function NodesSearch({
  nodes,
  multiple = false,
  exclude = [],
  onChange,
}: NodesSearchProps) {
  const options = useMemo<NodeSearchOption[]>(() => {
    return nodes
      .filter(node => !exclude.includes(node.id))
      .map(node => ({
        id: node.id,
        name: node.name,
        test: node.name.toLowerCase(),
      }))
  }, [nodes, exclude])

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

type NodeSearchOption = {
  id: NodeId
  name: string
  test: string
}

function Option({
  option,
  selected,
  onSelect,
}: SearchOptionProps<NodeSearchOption>) {
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

export function useNodesSearch({
  onChange,
  multiple = false,
  excluded = [],
}: {
  onChange: (ids: NodeId[]) => void
  multiple?: boolean
  excluded?: NodeId[]
}) {
  const [selected, handleChange] = useState<NodeId[]>([])

  const nodes = useMain().datas['note']
  const modal = useModal(
    <Shelf>
      <NodesSearch
        onChange={handleChange}
        nodes={nodes as Node[]}
        multiple={multiple}
        exclude={excluded}
      />
      <Button onClick={handleCancel}>Cancel</Button>
      <Button onClick={handleValidate}>Validate</Button>
    </Shelf>,
  )

  function handleCancel() {
    modal.close()
  }
  function handleValidate() {
    onChange(selected)

    modal.close()
  }

  return modal
}
