import { CardHeader } from '@material-ui/core'

import { useNodeContext } from '../context'
import { NodeHeaderActions } from './node.header.actions'
import { NodeTagList } from './node.tag.list'

export function NodeHeader() {
  const { node } = useNodeContext()

  return (
    <CardHeader
      title={node.name}
      subheader={<NodeTagList />}
      action={<NodeHeaderActions />}
    />
  )
}
