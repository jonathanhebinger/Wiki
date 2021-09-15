import { TemplateDataId, TemplateId } from '@brainote/common'
import { Button, useModal } from '@brainote/ui/forms'
import {
  Search,
  SearchOptionProps,
  SearchSelectedProps,
  useSearchStore,
} from '@brainote/ui/search'
import { Shelf } from '@brainote/ui/structure'
import { useEffect, useMemo, useState } from 'react'

import { useMain } from '../../main'

export type TemplateDataSearchOption = {
  id: TemplateDataId
  name: string
  test: string
}

export function useTemplateDataSearch({
  onChange,
  templateId,
  multiple = false,
  excluded = [],
}: {
  onChange: (ids: TemplateDataId[]) => void
  templateId: TemplateId
  multiple?: boolean
  excluded?: TemplateDataId[]
}) {
  const [selected, handleChange] = useState<TemplateDataId[]>([])

  const main = useMain()
  const data = main.datas[templateId]
  const template = main.template(templateId)

  const options = useMemo<TemplateDataSearchOption[]>(() => {
    return data
      .filter(data => !excluded.includes(data.id))
      .map(data => ({
        id: data.id,
        name: data.name as string,
        test: data.name as string,
      }))
  }, [data, excluded])

  const store = useSearchStore({
    options,
    Option,
    multiple,
    Selected,
  })

  useEffect(() => {
    handleChange(store.state.selected.map(option => option.id))
  }, [store.state.selected])

  const modal = useModal(
    <Shelf>
      <Search store={store} />
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
function Selected({
  option,
}: SearchSelectedProps<TemplateDataSearchOption>): JSX.Element {
  return <div>{option.name}</div>
}
