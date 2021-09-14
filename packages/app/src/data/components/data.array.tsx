import { Data, Type } from '@brainote/common'
import { Icon } from '@brainote/ui/forms'
import { Block } from '@brainote/ui/structure'
import {
  faPlus,
  faSave,
  faTrash,
  faUndo,
} from '@fortawesome/free-solid-svg-icons'
import { useMemo, useState } from 'react'

import { useDataContext } from '../data.context'
import { Data$get_default } from '../data.default'
import { DataItem } from './data'

function compute(item: any, path: string[]): any {
  const [key, ...rest] = path

  return rest.length > 0 && typeof item === 'object'
    ? compute(item[key], rest)
    : `${item[key]}`
}

export function DataArray() {
  const {
    type,
    Label,
    draft,
    saved,
    modified,
    handleUndo,
    handleQuickSave,
    handleDraftChange,
    handleSavedChange,
  } = useDataContext<Type.Array, Data.Array>()
  const [indexes] = useState(saved.map((item, index) => index))
  const [next, next$set] = useState(indexes.length)

  function handleItemDelete(index: number) {
    return () => {
      const data = [...draft]

      indexes.splice(index, 1)
      data.splice(index, 1)

      handleDraftChange(data)
    }
  }
  function handleDraftItemUpdate(index: number) {
    return (item: Type.Any) => {
      const data = [...draft]

      data.splice(index, 1, item)

      handleDraftChange(data)
    }
  }
  function handleSavedItemUpdate(index: number) {
    return (item: Type.Any) => {
      const data = [...draft]

      data.splice(index, 1, item)

      handleSavedChange(data)
    }
  }

  function handleItemAdd() {
    const item = Data$get_default(type.of)

    indexes.push(next)
    next$set(next + 1)

    handleDraftChange([...draft, item])
  }

  const Items = draft.map((item, index) => {
    const name = type.name ? compute(draft[index], type.name) : index

    return (
      <DataItem
        key={indexes[index]}
        type={type.of}
        Label={name}
        draft={draft[index]}
        saved={saved[indexes[index]] ?? Data$get_default(type.of)}
        onDraftUpdate={handleDraftItemUpdate(index)}
        onSavedUpdate={handleSavedItemUpdate(index)}
        actions={[
          { Label: <Icon icon={faTrash} />, handler: handleItemDelete(index) },
        ]}
      />
    )
  })

  const actions = [{ Label: <Icon icon={faPlus} />, handler: handleItemAdd }]

  if (modified) {
    actions.push({
      Label: <Icon icon={faUndo} />,
      handler: handleUndo,
    })
  }

  if (modified && handleSavedChange) {
    actions.push({
      Label: <Icon icon={faSave} />,
      handler: handleQuickSave,
    })
  }

  return <Block Label={Label} Content={Items} actions={actions} />
}
