import { NodeId, Type } from '@brainote/common'
import React, { useMemo, useState } from 'react'
import { GroupItem } from 'src/blocs/structure/group'
import { Shelf } from 'src/blocs/structure/shelf'
import { useActions, useModel } from 'src/features/root/root.store'

import { DataItem } from '..'
import { useDataContext } from '../data.context'
import { DataArray } from './data.array'
import { DataObject } from './data.object'
import { DataType } from './type/data.type'

export function DataBlock() {
  const { type } = useDataContext()

  switch (type.type) {
    case 'array':
      return <DataArray />
    case 'object':
      return <DataObject />
    case 'join':
      return <DataJoin />
    case 'type':
      return <DataType />
  }

  return null
}

function Item({ id, keys }: { id: NodeId; keys: Type.ObjectKey[] }) {
  const nodes = useModel(state => state.nodes)
  const nodesActions = useActions(state => state.nodes)

  const node = nodes.node(id)

  const data = useMemo(() => {
    const entries = keys.map(key => {
      return [key.id, node.data[key.id]]
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

  return (
    <DataItem
      Label={<>{data.name}</>}
      draft={draft}
      saved={data.data}
      type={{ type: 'object', keys }}
      onChange={handleChange}
      onSave={handleSave}
    />
  )
}

export function DataJoin() {
  const nodes = useModel(state => state.nodes)
  const nodesActions = useActions(state => state.nodes)

  const { type, draft, saved, $change } = useDataContext<Type.Join, NodeId[]>()

  const template = nodes.template(type.template)

  if (!template) return null

  const keys = template.data['template.keys'].map(nodes.key).map(key => ({
    id: key.id,
    name: key.name,
    type: key.data['key.type'],
  }))

  const Joined = draft.map(id => {
    return <Item key={id} id={id} keys={keys} />
  })

  function handleAdd() {
    // $change([...draft, Data$get_default(type.of)])
  }
  function handleCreate() {
    const node = nodesActions.create({
      name: 'New Node',
    })

    nodesActions.attach({
      node_id: node.id,
      template_id: template.name,
    })
  }

  const template_id = type.template
  const options = template_id
    ? nodes.list.filter(node => node.templates.includes(template_id))
    : nodes.list

  return (
    <Shelf>
      {Joined}
      <GroupItem
        squared
        className="p-2 cursor-pointer"
        htmlProps={{ onClick: handleAdd }}
      >
        Add Item
      </GroupItem>
    </Shelf>
  )
}
