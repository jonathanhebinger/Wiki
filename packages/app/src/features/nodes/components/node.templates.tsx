import { Data, Key } from '@brainote/common'
import { faEye, faTrash } from '@fortawesome/free-solid-svg-icons'
import { useState } from 'react'
import { Icon } from 'src/blocs/icon'
import { Block } from 'src/blocs/structure/block'
import { Shelf } from 'src/blocs/structure/shelf'
import { DataItem } from 'src/features/data'
import { useNavActions, useNodesActions } from 'src/features/root/root.store'

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

function NodeTemplatesItem({ template, keys }: NodeTemplate) {
  const nodesActions = useNodesActions()
  const navActions = useNavActions()

  const { id, data } = useNode()

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
    { Label: <Icon icon={faTrash} />, handler: handleDetach },
    { Label: <Icon icon={faEye} />, handler: handleOpen },
  ]

  const Keys = keys.map(key => {
    return <NodeTemplatesItemKey key={key.id} data={data[key.id]} _key={key} />
  })

  return (
    <Block
      Label={<span className="capitalize">{template['root.name']}</span>}
      Content={<Shelf>{Keys}</Shelf>}
      actions={actions}
    />
  )
}

export function NodeTemplatesItemKey({
  data,
  _key,
}: {
  _key: Key
  data: Data.Any
}) {
  const nodesActions = useNodesActions()

  const { id } = useNode()

  const [draft, draft$set] = useState(data)

  function handleSave() {
    nodesActions.update_data({
      node_id: id,
      data: { [_key.id]: draft },
    })
  }

  return (
    <DataItem
      key={_key.id}
      Label={_key['root.name']}
      draft={draft}
      saved={data}
      type={_key['key.type']}
      onChange={draft$set}
      onSave={handleSave}
    />
  )
}
