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
import React, { useMemo } from 'react'

import { useNodesSearch } from '../../nodes/components/nodes.search'
import { useNode } from '../../nodes/node.context'
import { useActions, useModel, useNavActions } from '../../root'
import { useDataContext } from '../data.context'

export function DataJoin({ Label }: { Label: React.ReactNode }) {
  const nodes = useModel(state => state.nodes)
  const nodesActions = useActions(state => state.nodes)
  const navActions = useNavActions()

  const {
    type,
    draft,
    modified,
    handleUndo,
    handleQuickSave,
    handleDraftChange,
  } = useDataContext<Type.Join, NodeId[]>()

  const node = useNode()

  const template_id =
    node && type.template === '__self__' ? node.id : type.template

  const template = nodes.template(template_id)

  if (!template) return null

  const keys = template['template.keys'].map(nodes.key).map(key => ({
    id: key.id,
    name: key['root.name'],
    type: key['key.type'],
  }))

  function handleSearchValidate(ids: NodeId[]) {
    handleDraftChange([...draft, ...ids])
  }

  const search = useNodesSearch({
    onChange: handleSearchValidate,
    excluded: useMemo(() => ['root', ...draft], [draft]),
    template: type.template,
  })

  function handleSearch() {
    search.open()
  }
  function handleCreate() {
    const node = nodesActions.create({
      name: 'New Node',
    })

    nodesActions.key_update({
      node_id: node.id,
      key_id: 'root.templates',
      data: [template.id],
    })

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

  const Joined = draft.map(id => {
    function handleRemove() {
      handleDraftChange(draft.filter(item => item !== id))
    }

    const saved = nodes.node(id)

    function handleOpen() {
      navActions.open(id)
    }

    const actions: BlockAction[] = [
      { Label: <Icon icon={faEye} />, handler: handleOpen },
      { Label: <Icon icon={faMinus} />, handler: handleRemove },
    ]

    return (
      <Block
        key={id}
        Label={saved['root.name']}
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
