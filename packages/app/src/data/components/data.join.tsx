import { NodeId, Type } from '@brainote/common'
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
import { useMemo } from 'react'

import { useMain, useMainActions, useNavActions } from '../../main'
import {
  selectTemplate,
  selectTemplateData,
} from '../../main/state/main.selector'
import { useNodeSearch } from '../../templates'
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
  } = useDataContext<Type.Join, NodeId[]>()
  const main = useMain()

  const templateId = type.template

  function handleSearchValidate(ids: NodeId[]) {
    handleDraftChange([...draft, ...ids])
  }

  const search = useNodeSearch({
    onChange: handleSearchValidate,
    excluded: useMemo(() => ['root', ...draft], [draft]),
    templateId: type.template,
  })

  function handleSearch() {
    search.open()
  }
  function handleCreate() {
    const node = nodesActions.templateDataCreate({ templateId })

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

  const template = useMain(selectTemplate(templateId))

  const Joined = draft.map(templateDataId => {
    function handleRemove() {
      handleDraftChange(draft.filter(item => item !== templateDataId))
    }

    function handleOpen() {
      navActions.open({ type: 'data', templateId, templateDataId })
    }

    const actions: BlockAction[] = [
      { Label: <Icon icon={faEye} />, handler: handleOpen },
      { Label: <Icon icon={faMinus} />, handler: handleRemove },
    ]

    const node = useMain(selectTemplateData(templateId, templateDataId))
    const name = node[template.namePath] || template.name

    return (
      <Block
        key={templateDataId}
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
