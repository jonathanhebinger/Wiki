import { useEffect, useRef } from 'react'
import { Badge } from 'src/blocs/badge'
import {
  I_NodeSearch_Option,
  NodeSearch_ContextProvider,
  use_NodeSearch_Context,
} from 'src/node/components/search.context'

export function NodeSearch() {
  return (
    <NodeSearch_ContextProvider>
      <NodeSearch_Main />
    </NodeSearch_ContextProvider>
  )
}

function NodeSearch_Main() {
  const { opened$set, value$set } = use_NodeSearch_Context()

  return (
    <div className="relative flex-grow">
      <div className="border flex flex-wrap" onClick={() => opened$set(true)}>
        <NodeSearch_Filters />
        <input
          type="text"
          className="flex-grow w-32 outline-none border-b focus:border-gray-500 hover:bg-gray-50 m-2 px-2"
          onChange={e => value$set(e.target.value)}
        ></input>
      </div>
      {<NodeSearch_Options />}
    </div>
  )
}

function NodeSearch_Filters() {
  const { filters, filters$delete: filter$delete } = use_NodeSearch_Context()

  const Filters = filters.slice(1).map(filter => {
    switch (filter.type) {
      case 'tag':
        return (
          <Badge
            className="m-2"
            key={filter.name}
            label={`#${filter.name}`}
            onDelete={() => filter$delete(filter)}
          />
        )
      case 'text':
        if (filter.test === '') {
          return null
        } else {
          return (
            <Badge className="m-2" key={filter.test} label={`${filter.name}`} />
          )
        }
    }
  })

  return <>{Filters}</>
}

function NodeSearch_Options() {
  const { opened, options_filtered } = use_NodeSearch_Context()

  if (!opened) return null

  const Options = options_filtered.map((option, index) => {
    return <NodeSearch_Option option={option} key={option.id} index={index} />
  })

  return (
    <div className="bg-white border relative bottom-0 overflow-auto h-32">
      {Options}
    </div>
  )
}

function NodeSearch_Option({
  option,
  index,
}: {
  option: I_NodeSearch_Option
  index: number
}) {
  const { option$set, filters, filters$add, option_index } =
    use_NodeSearch_Context()

  const can_be_used_as_filter = filters.every(
    filter => filter.type !== 'tag' || filter.tag !== option.id,
  )

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

  return (
    <div
      className={`p-2 flex justify-between items-center cursor-pointer hover:bg-gray-100 ${
        option_index === index ? 'bg-gray-200' : ''
      }`}
      onClick={() => option$set(option)}
      ref={ref}
    >
      <div>
        <div>{option.name}</div>
        <div>{Tags}</div>
      </div>
      {can_be_used_as_filter && (
        <Badge
          className="py-0"
          label="#"
          onClick={() => filters$add(option)}
        ></Badge>
      )}
    </div>
  )
}
