import { NodeId, Template, TemplateDataId, TemplateId, Type } from '@brainote/domain'
import { Icon } from '@brainote/ui/src/components/forms'
import { Block, BlockAction } from '@brainote/ui/src/components/structure'
import { faEye, faMinus, faPlus, faSave, faSearch, faUndo } from '@fortawesome/free-solid-svg-icons'
import { useMemo } from 'react'

import { useMain, useMainActions, useNavActions } from '../../main'
import { selectTemplate, selectTemplateData } from '../../main/state/main.selector'
import { useNodeSearch } from '../../templates'
import { useDataContext } from '../data.context'

export function DataJoin() {
  const nodesActions = useMainActions()

  const {
    Label,
    typeConfig,
    draft,
    saved,
    modified,
    handleUndo,
    handleQuickSave,
    handleDraftChange,
  } = useDataContext<Type.Join, NodeId[]>()

  const templateId = typeConfig.templateId
  const template = useMain(selectTemplate(templateId))

  function handleSearchValidate(ids: NodeId[]) {
    handleDraftChange([...draft, ...ids])
  }

  const search = useNodeSearch({
    onChange: handleSearchValidate,
    excluded: useMemo(() => ['root', ...draft], [draft]),
    templateId: typeConfig.templateId,
  })

  function handleSearch() {
    search.open()
  }
  function handleCreate() {
    const templateDataId = nodesActions.templateDataCreate({ templateId })

    handleDraftChange([...draft, templateDataId])
  }

  const actions: BlockAction[] = [
    { Label: <Icon icon={faSearch} />, handler: handleSearch },
    { Label: <Icon icon={faPlus} />, handler: handleCreate },
  ]

  console.log(draft, saved)

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

  const Joined = draft.map(templateDataId => (
    <DataJoinItem
      key={templateDataId}
      template={template}
      templateId={templateId}
      templateDataId={templateDataId}
    />
  ))

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

function DataJoinItem({
  template,
  templateId,
  templateDataId,
}: {
  template: Template
  templateId: TemplateId
  templateDataId: TemplateDataId
}) {
  const navActions = useNavActions()

  const { draft, handleDraftChange } = useDataContext<Type.Join, NodeId[]>()

  const templateData = useMain(selectTemplateData(templateId, templateDataId))
  const templateDataName = templateData[template.namePath] || templateId

  function handleRemove() {
    const filtered = draft.filter(item => item !== templateDataId)

    handleDraftChange(filtered)
  }

  function handleOpen() {
    navActions.open({
      type: 'data',
      templateId,
      templateDataId,
    })
  }

  const actions: BlockAction[] = [
    { Label: <Icon icon={faEye} />, handler: handleOpen },
    { Label: <Icon icon={faMinus} />, handler: handleRemove },
  ]

  return (
    <Block Label={templateDataName} actions={actions} onClick={handleOpen} />
  )
}
