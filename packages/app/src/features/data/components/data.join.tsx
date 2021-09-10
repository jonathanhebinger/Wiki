import { NodeId, Type } from '@brainote/common'
import {
  faEye,
  faPlus,
  faSave,
  faSearch,
} from '@fortawesome/free-solid-svg-icons'
import React, { useMemo, useState } from 'react'
import { Icon } from 'src/blocs/icon'
import { Block, BlockAction } from 'src/blocs/structure/block'
import { Shelf } from 'src/blocs/structure/shelf'
import { useNodesSearch } from 'src/features/nodes/components/nodes.search'
import {
  useActions,
  useModel,
  useNavActions,
} from 'src/features/root/root.store'

import { DataItem } from '..'
import { useDataContext } from '../data.context'

export function DataJoin({ Label }: { Label: React.ReactNode }) {
  const nodes = useModel(state => state.nodes)
  const nodesActions = useActions(state => state.nodes)

  const { type, draft, saved, $change, modified, $save } = useDataContext<
    Type.Join,
    NodeId[]
  >()

  const template = nodes.template(type.template)

  if (!template) return null

  const keys = template['template.keys'].map(nodes.key).map(key => ({
    id: key.id,
    name: key['root.name'],
    type: key['key.type'],
  }))

  function handleChange(ids: NodeId[]) {
    $change([...draft, ...ids])
  }

  const search = useNodesSearch({
    onChange: handleChange,
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

    nodesActions.attach({
      node_id: node.id,
      template_id: template.id,
    })

    $change([...draft, node.id])
  }

  const actions: BlockAction[] = [
    { Label: <Icon icon={faSearch} />, handler: handleSearch },
    { Label: <Icon icon={faPlus} />, handler: handleCreate },
  ]

  if (modified && $save) {
    actions.unshift({
      Label: <Icon icon={faSave} />,
      handler: $save,
    })
  }

  const Joined = draft.map(id => {
    return <DataJoinItem key={id} id={id} keys={keys} />
  })

  return (
    <>
      <Block
        Label={Label}
        Content={<Shelf>{Joined}</Shelf>}
        actions={actions}
      />
      {search.Component}
    </>
  )
}

export type DataJoinItemProps = {
  id: NodeId
  keys: Type.ObjectKey[]
}
export function DataJoinItem({ id, keys }: DataJoinItemProps) {
  const nodes = useModel(state => state.nodes)
  const nodesActions = useActions(state => state.nodes)
  const navActions = useNavActions()

  const node = nodes.node(id)

  const data = useMemo(() => {
    const entries = keys.map(key => {
      return [key.id, node[key.id]]
    })

    return Object.fromEntries(entries)
  }, [])

  const [draft, handleChange] = useState(data)

  function handleSave() {
    nodesActions.update_data({
      node_id: id,
      data: draft,
    })
  }

  function handleOpen() {
    navActions.open(id)
  }

  const actions = [{ Label: <Icon icon={faEye} />, handler: handleOpen }]

  return (
    <DataItem
      Label={<>{node['root.name']}</>}
      draft={draft}
      saved={data}
      type={{ type: 'object', keys }}
      onChange={handleChange}
      onSave={handleSave}
      actions={actions}
    />
  )
}
