import { TemplateData, TemplateDataId, TemplateId } from '@brainote/common'
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

export type TemplateDataSearchProps = {
  templateData: TemplateData[]
  multiple?: boolean
  exclude?: TemplateDataId[]
  onChange: (
    ids: TemplateDataId[],
    context: SearchContext<TemplateDataSearchOption>,
  ) => void
}
export function NodesSearch({
  templateData,
  multiple = false,
  exclude = [],
  onChange,
}: TemplateDataSearchProps) {
  const options = useMemo<TemplateDataSearchOption[]>(() => {
    return templateData
      .filter(data => !exclude.includes(data.id))
      .map(data => ({
        id: data.id,
        name: '',
        test: '',
      }))
  }, [templateData, exclude])

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

type TemplateDataSearchOption = {
  id: TemplateDataId
  name: string
  test: string
}

function Option({
  option,
  selected,
  onSelect,
}: SearchOptionProps<TemplateDataSearchOption>) {
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

export function useTemplateDataSearch({
  onChange,
  multiple = false,
  template: template_id,
  excluded = [],
}: {
  onChange: (ids: TemplateDataId[]) => void
  template: TemplateId
  multiple?: boolean
  excluded?: TemplateDataId[]
}) {
  const [selected, handleChange] = useState<TemplateDataId[]>([])

  const main = useMain()

  const template = main.template(template_id)

  const modal = useModal(
    <Shelf>
      <NodesSearch
        onChange={handleChange}
        templateData={template.data}
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
