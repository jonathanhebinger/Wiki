import { Data } from '@brainote/common'
import { Icon } from '@brainote/ui/forms'
import { Block } from '@brainote/ui/structure'
import { faEye, faTrash } from '@fortawesome/free-solid-svg-icons'
import React from 'react'

import { DataItem } from '../../data'
import { useNavActions, useNodesActions } from '../../root'
import { NodeTemplate as NodeTemplate, useNode } from '../node.context'

export function NodeTemplates() {
  const { templates } = useNode()

  const Items = templates.map(({ keys, template }) => {
    return (
      <NodeTemplatesItem keys={keys} template={template} key={template.id} />
    )
  })

  return <>{Items}</>
}

export function NodeTemplatesItem({ template, keys }: NodeTemplate) {
  const nodesActions = useNodesActions()
  const navActions = useNavActions()

  const { id, saved, draft } = useNode()

  function handleOpen() {
    navActions.open(template.id)
  }
  function handleDetach() {
    nodesActions.detach({
      node_id: id,
      template_id: template.id,
    })
  }

  const actions = [
    { Label: <Icon icon={faEye} />, handler: handleOpen },
    { Label: <Icon icon={faTrash} />, handler: handleDetach },
  ]

  const Keys = keys.map(key => {
    function handleDraftUpdate(draft: Data.Any) {
      const data = { [key.id]: draft }

      nodesActions.draft_update({ id, data })
    }
    function handleSavedUpdate(saved: Data.Any) {
      nodesActions.key_update({
        node_id: id,
        key_id: key.id,
        data: saved,
      })
    }

    return (
      <DataItem
        key={key.id}
        Label={key['root.name']}
        draft={draft[key.id]}
        saved={saved[key.id]}
        type={key['key.type']}
        onDraftUpdate={handleDraftUpdate}
        onSavedUpdate={handleSavedUpdate}
      />
    )
  })

  return (
    <Block
      Label={<span className="capitalize">{template['root.name']}</span>}
      Content={Keys}
      actions={actions}
    />
  )
}
