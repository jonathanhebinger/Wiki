import { Node, Template } from '@brainote/common'
import { faSave } from '@fortawesome/free-solid-svg-icons'
import { useState } from 'react'
import { Icon } from 'src/blocs/icon'
import { Block } from 'src/blocs/structure/block'
import { DataObject } from 'src/features/data/components/data.object'
import { DataContextProvider } from 'src/features/data/data.context'
import { useNodesContext } from 'src/features/nodes/nodes.system'

import { useTemplate } from '../templates.context'

export function TemplateDataMain({
  template,
  data,
}: {
  template: Template
  data: Node
}) {
  const { keys } = useTemplate()

  const [, nodes] = useNodesContext()

  const [draft, draft$set] = useState(data.data)

  function handleChange(data: Node['data']) {
    draft$set(data)
  }

  function handleSave() {
    nodes.update(data.id, node => {
      Object.assign(node.data, draft)
    })
  }

  const modified = JSON.stringify(data) !== JSON.stringify(draft)

  const actions = modified
    ? [{ Label: <Icon icon={faSave} />, handler: handleSave }]
    : []

  return (
    <DataContextProvider
      draft={draft}
      saved={data.data}
      onChange={handleChange as any}
      type={{ type: 'object', keys: keys as any }}
    >
      <Block
        Label={<>{template.name}</>}
        Content={<DataObject />}
        actions={actions}
      />
    </DataContextProvider>
  )
}
