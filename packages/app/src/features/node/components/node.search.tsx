import { useEffect, useMemo, useRef } from 'react'
import {
  Search,
  SearchContext,
  SearchOptionProps,
  useSearchContext,
  useSearchStore,
} from 'src/blocs/search'
import { Badge } from 'src/blocs/structure/badge'
import { Node } from 'src/features/node/type'
import { useStoreState } from 'src/features/root/root.store'

export function NodeSearch({
  multiple = false,
  exclude = [],
  onChange,
}: {
  multiple?: boolean
  exclude?: Node['id'][]
  onChange: (
    ids: Node['id'][],
    context: SearchContext<NodeSearch_Option>,
  ) => void
}) {
  const nodes = useStoreState(state => state.nodes.entities)
  const nodes_map = useStoreState(state => state.nodes.dictionnary)

  const options = useMemo<NodeSearch_Option[]>(
    () =>
      nodes
        .filter(node => !exclude.includes(node.id))
        .map(node => ({
          id: node.id,
          name: node.name,
          test: node.name.toLowerCase(),
          tags: node.tags,
          tags_name: node.tags.map(tag => nodes_map[tag]?.name || ''),
        })),
    [nodes, exclude],
  )

  console.log(options, exclude)

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

interface NodeSearch_Option {
  id: Node['id']
  name: string
  test: string
  tags: Node['id'][]
  tags_name: string[]
}

function Option({
  focused,
  option,
  selected,
  onSelect,
}: SearchOptionProps<NodeSearch_Option>) {
  const { actions } = useSearchContext<NodeSearch_Option>()

  const Tags = option.tags_name.map(tag_name => (
    <span className="text-xs" key={tag_name}>
      {tag_name}
    </span>
  ))

  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    focused && ref.current?.scrollIntoView()
  }, [focused])

  function filters$add() {
    actions.filters$add({
      id: '#' + option.id,
      name: '#' + option.name,
      test: o => o.tags.includes(option.id),
    })
  }

  return (
    <div
      className={`px-2 py-1 flex justify-between items-center cursor-pointer hover:bg-gray-100 ${
        selected ? 'bg-gray-200' : ''
      }`}
      onClick={onSelect}
      ref={ref}
    >
      <div>
        <div>{option.name}</div>
        <div>{Tags}</div>
      </div>
      <Badge className="py-0" label="#" onClick={filters$add}></Badge>
    </div>
  )
}
