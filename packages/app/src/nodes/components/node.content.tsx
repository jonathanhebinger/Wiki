import { Data, TemplateData } from '@brainote/common'
import { Icon } from '@brainote/ui/forms'
import { Block, BlockAction } from '@brainote/ui/structure'
import { Title } from '@brainote/ui/typo'
import { faTimes, faTrash } from '@fortawesome/free-solid-svg-icons'
import React, { useState } from 'react'

import { DataItem } from '../../data'
import { useMainActions, useNavActions } from '../../main'
import { useNode } from '../node.context'

export function NodeInfos() {
  const mainActions = useMainActions()
  const navActions = useNavActions()

  const { node, template, keys } = useNode()
  const [draft, draft$set] = useState(node as TemplateData)

  function handleDraftUpdate(patch: TemplateData) {
    draft$set(patch)
  }
  function handleSavedUpdate(templateData: TemplateData) {
    mainActions.templateDataUpdate({
      templateId: template.id,
      templateData,
    })
  }

  function handleClose() {
    navActions.close({
      type: 'data',
      templateId: template.id,
      templateDataId: node.id,
    })
  }
  const actions: BlockAction[] = [
    { Label: <Icon icon={faTrash} />, handler: handleClose },
    { Label: <Icon icon={faTimes} />, handler: handleClose },
  ]

  const Keys = keys.map(([keyId, key]) => {
    function key_handleDraftChange(item: Data.Any) {
      handleDraftUpdate({ ...draft, [keyId]: item })
    }
    function key_handleSavedChange(item: Data.Any) {
      handleSavedUpdate({ ...node, [keyId]: item })
    }

    return (
      <DataItem
        key={keyId}
        Label={key.name}
        type={key.type}
        saved={node[keyId]}
        draft={draft[keyId]}
        onDraftUpdate={key_handleDraftChange}
        onSavedUpdate={key_handleSavedChange}
      />
    )
  })

  return (
    <Block
      Label={
        <Title underline={false} uppercase>
          {template.name} -- {node[template.namePath]}
        </Title>
      }
      Content={Keys}
      actions={actions}
    />
  )
}
