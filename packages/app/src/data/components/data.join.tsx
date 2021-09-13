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

import { useActions, useMain, useModel, useNavActions } from '../../main'
import { useTemplateDataSearch } from '../../templates/template.data.search'
import { useDataContext } from '../data.context'

export function DataJoin({ Label }: { Label: React.ReactNode }) {
  const nodes = useModel(state => state.main)
  const nodesActions = useActions(state => state.main)
  const navActions = useNavActions()

  const {
    type,
    draft,
    modified,
    handleUndo,
    handleQuickSave,
    handleDraftChange,
  } = useDataContext<Type.Join, TemplateDataId[]>()
  const main = useMain()

  const template_id = type.template

  function handleSearchValidate(ids: TemplateDataId[]) {
    handleDraftChange([...draft, ...ids])
  }

  const search = useTemplateDataSearch({
    onChange: handleSearchValidate,
    excluded: useMemo(() => ['root', ...draft], [draft]),
    template: type.template,
  })

  function handleSearch() {
    search.open()
  }
  function handleCreate() {
    const node = nodesActions.templateData_create({ template_id })

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

  const template_name = main.template(template_id)

  const Joined = draft.map(data_id => {
    function handleRemove() {
      handleDraftChange(draft.filter(item => item !== data_id))
    }

    function handleOpen() {
      navActions.open_templateData({ template_id, data_id })
    }

    const actions: BlockAction[] = [
      { Label: <Icon icon={faEye} />, handler: handleOpen },
      { Label: <Icon icon={faMinus} />, handler: handleRemove },
    ]

    const name = template_id ? template_name : main.node(data_id as any).name

    return (
      <Block
        key={data_id}
        Label={name}
        actions={actions}
        onClick={handleOpen}
      />
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
