import { useState } from 'react'
import { Shelf } from 'src/blocs/structure/shelf'
import { useNodes } from 'src/features/root/root.store'

import { useNode } from '../node.context'
import { NodeTemplatesItemKey } from './node.templates'

export function NodeInfos() {
  const nodes = useNodes()
  const { data } = useNode()

  const keys = nodes.template('root')['template.keys'].map(nodes.key)

  const Keys = keys.map(key => {
    return <NodeTemplatesItemKey key={key.id} data={data[key.id]} _key={key} />
  })

  return <Shelf>{Keys}</Shelf>
}
