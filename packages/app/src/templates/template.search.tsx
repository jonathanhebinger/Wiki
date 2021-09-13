import { Template, TemplateId } from '@brainote/common'
import { Button, useModal } from '@brainote/ui/forms'
import {
  Search,
  SearchContext,
  SearchOptionProps,
  useSearchStore,
} from '@brainote/ui/search'
import { Shelf } from '@brainote/ui/structure'
import { useEffect, useMemo, useState } from 'react'

import { useMain } from '../main'

export type iTemplateSearchOption = {
  id: TemplateId
  name: string
  test: string
}

export type TemplateSearchProps = {
  templates: Template[]
  multiple?: boolean
  exclude?: TemplateId[]
  onChange: (
    ids: TemplateId[],
    context: SearchContext<iTemplateSearchOption>,
  ) => void
}
export function TemplateSearch({
  templates,
  multiple = false,
  exclude = [],
  onChange,
}: TemplateSearchProps) {
  const options = useMemo<iTemplateSearchOption[]>(() => {
    return templates
      .filter(data => !exclude.includes(data.id))
      .map(node => ({
        id: node.id,
        name: node.name,
        test: node.name.toLowerCase(),
      }))
  }, [templates, exclude])

  const store = useSearchStore({
    options,
    Option: TemplateSearchOption,
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
export type TemplateSearchOptionProps = SearchOptionProps<iTemplateSearchOption>
export function TemplateSearchOption({
  option,
  selected,
  onSelect,
}: TemplateSearchOptionProps) {
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

export function useTemplateSearch({
  onChange,
  multiple = false,
  excluded = [],
}: {
  onChange: (ids: TemplateId[]) => void
  multiple?: boolean
  excluded?: TemplateId[]
}) {
  const [selected, handleChange] = useState<TemplateId[]>([])

  const { templates } = useMain()

  const modal = useModal(
    <Shelf>
      <TemplateSearch
        onChange={handleChange}
        templates={templates}
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
