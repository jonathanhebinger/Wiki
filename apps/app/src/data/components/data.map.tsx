import { Data, Type } from '@brainote/domain'
import { Icon } from '@brainote/ui/src/components/forms'
import { Block, BlockAction } from '@brainote/ui/src/components/structure'
import { faPlus, faSave, faTrash, faUndo } from '@fortawesome/free-solid-svg-icons'
import { useEffect, useState } from 'react'
import { v4 } from 'uuid'

import { useDataContext } from '../data.context'
import { Data$get_default } from '../data.default'
import { DataItem } from './data'

export function DataMap() {
  const {
    typeConfig,
    Label,
    draft,
    saved,
    modified,
    handleUndo,
    handleQuickSave,
    handleDraftChange,
    handleSavedChange,
  } = useDataContext<Type.Map, Data.Map>()

  const [draftMap, draftMap$set] = useState(new Map<any, any>(draft))
  const [savedMap, savedMap$set] = useState(new Map<any, any>(saved))

  useEffect(() => {
    if (!modified) {
      draftMap$set(new Map(draft))
      savedMap$set(new Map(saved))
    }
  }, [draft, saved])

  function handleItemDelete(index: number) {
    return () => {
      draftMap.delete(index)

      handleDraftChange([...draftMap])
    }
  }
  function handleDraftItemUpdate(index: number) {
    return (item: Type.Any) => {
      draftMap.set(index, item)

      handleDraftChange([...draftMap])
    }
  }
  function handleSavedItemUpdate(index: number) {
    return (item: Type.Any) => {
      draftMap.set(index, item)
      savedMap.set(index, item)

      handleSavedChange([...savedMap])
    }
  }

  function handleItemAdd() {
    const index = v4()
    const item = Data$get_default(typeConfig.type)

    draftMap.set(index, item)

    handleDraftChange([...draftMap])
  }

  const Items = [...draftMap].map(([key], index) => {
    const name =
      typeConfig.type[0] === 'object'
        ? draftMap.get(key)[typeConfig.type[1].namePath]
        : index

    const actions: BlockAction[] = []
    if (!savedMap.get(key)) {
      actions.push({
        Label: <Icon icon={faSave} />,
        handler: () => handleSavedItemUpdate(key)(draftMap.get(key)),
      })
    }
    actions.push({
      Label: <Icon icon={faTrash} />,
      handler: handleItemDelete(key),
    })

    return (
      <DataItem
        key={key}
        type={typeConfig.type}
        Label={name || index}
        draft={draftMap.get(key)}
        saved={savedMap.get(key) ?? draftMap.get(key)}
        onDraftUpdate={handleDraftItemUpdate(key)}
        onSavedUpdate={handleSavedItemUpdate(key)}
        actions={actions}
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
