import { Node } from '@brainote/common'
import { TextField } from '@material-ui/core'
import {
  Autocomplete,
  createFilterOptions,
  FilterOptionsState,
} from '@material-ui/lab'
import { useEffect, useMemo, useState } from 'react'
import { useStoreState } from 'src/app/store'

export namespace SearchNode {
  export interface Option {
    id?: Node['id']
    name: string
    tags: string[]
    searchString: string
  }

  export interface PropsMono {
    nodes: Node[]
    label: string
    onSelect: (node: Node['id']) => void
    onCreate?: (name: Node['name']) => void
    exclude?: Node['id'][]
  }

  export interface PropsMulti {
    nodes: Node[]
    label: string
    onSelect: (nodes: Node['id'][]) => void
    exclude?: Node['id'][]
  }
}

function useSearchNodeOptions(nodes: Node[], exclude: string[]) {
  const tagsMap = Object.fromEntries(
    useStoreState(state => state.nodes.tags).map(tag => {
      return [tag.id, tag]
    }),
  )

  const options = useMemo<SearchNode.Option[]>(() => {
    return nodes
      .filter(node => {
        return !exclude.includes(node.id)
      })
      .map(({ id, name, tags }) => {
        tags = tags.map(tag => {
          return `#${tagsMap[tag].name}`
        })

        const searchString = [name, ...tags].join(' ')

        return { id, name, tags, searchString }
      })
  }, [nodes, exclude, tagsMap])

  return options
}

const filter = createFilterOptions<SearchNode.Option>({
  stringify: option => option.searchString,
})

function renderOptions(option: SearchNode.Option) {
  return option.id ? option.name : `Add "${option.name}"`
}
function filterOptionsMono(
  options: SearchNode.Option[],
  state: FilterOptionsState<SearchNode.Option>,
) {
  options = filter(options, state)

  const name = state.inputValue

  if (name !== '') {
    options.push({
      name,
      tags: [],
      searchString: name,
    })
  }

  return options
}
function getOptionLabel(option: SearchNode.Option) {
  return typeof option === 'string' ? option : option.name
}

export function SearchNode({
  nodes,
  label,
  onSelect,
  onCreate,
  exclude = [],
}: SearchNode.PropsMono) {
  const options = useSearchNodeOptions(nodes, exclude)

  const [value, setValue] = useState<SearchNode.Option | null>(null)

  useEffect(() => {
    if (!value) return

    if (value.id) {
      onSelect(value.id)
    } else if (onCreate) {
      onCreate(value.name)
    }
  }, [value, onSelect, onCreate])

  return (
    <Autocomplete
      value={value}
      onChange={(event, newValue) => {
        setValue(newValue as any)
      }}
      filterOptions={filterOptionsMono}
      selectOnFocus
      clearOnBlur
      handleHomeEndKeys
      options={options}
      getOptionLabel={getOptionLabel}
      renderOption={renderOptions}
      size="small"
      freeSolo
      renderInput={params => (
        <TextField {...params} label={label} variant="outlined" />
      )}
    />
  )
}

export function SearchNodeMultiple({
  nodes,
  label,
  onSelect,
  exclude = [],
}: SearchNode.PropsMulti) {
  const options = useSearchNodeOptions(nodes, exclude)

  const [value, setValue] = useState<Required<SearchNode.Option>[]>([])

  useEffect(() => {
    onSelect(value.map(option => option.id))
  }, [value, onSelect])

  return (
    <Autocomplete
      multiple
      value={value}
      onChange={(event, newValue) => {
        setValue(newValue as any)
      }}
      filterOptions={filter}
      selectOnFocus
      clearOnBlur
      handleHomeEndKeys
      options={options}
      getOptionLabel={getOptionLabel}
      renderOption={renderOptions}
      size="small"
      freeSolo
      renderInput={params => (
        <TextField {...params} label={label} variant="outlined" />
      )}
    />
  )
}
