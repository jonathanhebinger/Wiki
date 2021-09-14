import { TemplateDataId, Type } from '@brainote/common'
import { Icon } from '@brainote/ui/forms'
import { Block, BlockAction } from '@brainote/ui/structure'
import {
  faEye,
  faMinus,
  faPlus,
  faSave,
  faSearch,
  faUndo,
} from '@fortawesome/free-solid-svg-icons'
import React, { useMemo } from 'react'

import { useMain, useMainActions, useNavActions } from '../../main'
import { useTemplateDataSearch } from '../../templates/template.data.search'
import { useDataContext } from '../data.context'

export function DataJoin() {
  const nodesActions = useMainActions()
  const navActions = useNavActions()

  const {
    type,
    Label,
    draft,
    modified,
    handleUndo,
    handleQuickSave,
    handleDraftChange,
  } = useDataContext<Type.Join, TemplateDataId[]>()
  const main = useMain()

  const templateId = type.template

  function handleSearchValidate(ids: TemplateDataId[]) {
    handleDraftChange([...draft, ...ids])
  }

  const search = useTemplateDataSearch({
    onChange: handleSearchValidate,
    excluded: useMemo(() => ['root', ...draft], [draft]),
    templateId: type.template,
  })

  function handleSearch() {
    search.open()
  }
  function handleCreate() {
    const node = nodesActions.dataCreate({ templateId })

    handleDraftChange([...draft, node.id])
  }

  const actions: BlockAction[] = [
    { Label: <Icon icon={faSearch} />, handler: handleSearch },
    { Label: <Icon icon={faPlus} />, handler: handleCreate },
  ]

  if (modified) {
    actions.unshift({
      Label: <Icon icon={faSave} />,
      handler: handleQuickSave,
    })
    actions.unshift({
      Label: <Icon icon={faUndo} />,
      handler: handleUndo,
    })
  }

  const template_name = main.template(templateId)

  const Joined = draft.map(dataId => {
    function handleRemove() {
      handleDraftChange(draft.filter(item => item !== dataId))
    }

    function handleOpen() {
      navActions.open({ templateId, dataId })
    }

    const actions: BlockAction[] = [
      { Label: <Icon icon={faEye} />, handler: handleOpen },
      { Label: <Icon icon={faMinus} />, handler: handleRemove },
    ]

    const name = main.data(templateId, dataId).name || template_name

    return (
      <Block key={dataId} Label={name} actions={actions} onClick={handleOpen} />
    )
  })

  return (
    <>
      <Block
        Label={Label}
        Content={Joined}
        actions={actions}
        noGutter={Joined.length === 0}
      />
      {search.Component}
    </>
  )
}
