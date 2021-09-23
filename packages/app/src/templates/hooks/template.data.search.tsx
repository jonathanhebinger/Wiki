import { NodeId, TemplateId } from '@brainote/common'
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
import { selectTemplate } from '../../main/state/main.selector'

export type NodeSearchOption = {
  id: NodeId
  name: string
  test: string
}

export function useNodeSearch({
  onChange,
  templateId,
  multiple = false,
  excluded = [],
}: {
  onChange: (ids: NodeId[]) => void
  templateId: TemplateId
  multiple?: boolean
  excluded?: NodeId[]
}) {
  const [selected, handleChange] = useState<NodeId[]>([])

  const main = useMain()
  const template = useMain(selectTemplate(templateId))
  const nodeList = template.data

  const options = useMemo<NodeSearchOption[]>(() => {
    return nodeList
      .filter(node => !excluded.includes(node.id))
      .map(node => ({
        id: node.id,
        name: node[template.namePath] as string,
        test: node[template.namePath] as string,
      }))
  }, [nodeList, excluded])

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
function Selected({
  option,
}: SearchSelectedProps<NodeSearchOption>): JSX.Element {
  return <div>{option.name}</div>
}
