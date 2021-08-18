import { useEffect, useMemo, useRef } from 'react'
import { Badge } from 'src/blocs/badge'
import { Search, SearchOptionProps, useSearchContext, useSearchStore } from 'src/blocs/search'
import { Node_Id } from 'src/node/type'
import { useStoreState } from 'src/store'

export function NodeSearch() {
  const nodes = useStoreState(state => state.nodes.entities)
  const nodes_map = useStoreState(state => state.nodes.dictionnary)

  const options = useMemo<NodeSearch_Option[]>(
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

  const store = useSearchStore({
    options: options,
    Option: Option,
    Selected: ({ option }) => <div>{option.name}</div>,
  })

  return <Search store={store} />
}

interface NodeSearch_Option {
  id: Node_Id
  name: string
  test: string
  tags: Node_Id[]
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
