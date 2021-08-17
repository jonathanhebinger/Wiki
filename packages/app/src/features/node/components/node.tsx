import { Node as INode } from '@brainote/common'
import { Card, CardContent } from '@material-ui/core'
import { Editor } from 'src/view/blocs'

import { NodeContextProvider } from '../context'
import { NodeHeader } from './node.header'

export function Node({ node }: { node: INode }) {
  const data = node.data as any

  return (
    <NodeContextProvider node={node}>
      <Card>
        <NodeHeader />

        <CardContent>{data.content}</CardContent>
        <CardContent>
          <Editor editing={true} content="" onChange={console.log} />
        </CardContent>
      </Card>
    </NodeContextProvider>
  )
}
