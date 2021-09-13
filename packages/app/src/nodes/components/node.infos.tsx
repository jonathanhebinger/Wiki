import { Data } from '@brainote/common'
import React from 'react'

import { DataItem } from '../../data'
import { useNodes, useNodesActions } from '../../root'
import { useNode } from '../node.context'

export function NodeInfos() {
  const nodes = useNodes()
  const nodesActions = useNodesActions()

  const { id, saved, draft } = useNode()

  const keys = nodes.template('root')['template.keys'].map(nodes.key)
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
        type={key['key.type']}
        draft={draft[key.id]}
        saved={saved[key.id]}
        onDraftUpdate={handleDraftUpdate}
        onSavedUpdate={handleSavedUpdate}
      />
    )
  })

  return <>{Keys}</>
}
