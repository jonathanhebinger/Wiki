import { useEffect, useMemo, useRef } from 'react'
import { Badge } from 'src/blocs/badge'
import { Search, useSearchContext, useSearchStore } from 'src/blocs/search'
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
    Option({ option }) {
      return <NodeSearch_Option option={option} index={0} />
    },
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

function NodeSearch_Option({
  option,
  index,
}: {
  option: NodeSearch_Option
  index: number
}) {
  const { actions } = useSearchContext<NodeSearch_Option>()
  const option_index = 0

  const Tags = option.tags_name.map(tag_name => (
    <span className="text-xs" key={tag_name}>
      {tag_name}
    </span>
  ))

  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (index === option_index) {
      ref.current?.scrollIntoView()
    }
  }, [index, option_index])

  function filters$add() {
    actions.filters$add({
      id: '#' + option.id,
      name: '#' + option.name,
      test: o => o.tags.includes(option.id),
    })
  }

  return (
    <div
      className={`p-2 flex justify-between items-center cursor-pointer hover:bg-gray-100 ${
        option_index === index ? 'bg-gray-200' : ''
      }`}
      // onClick={() => option$set(option)}
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
