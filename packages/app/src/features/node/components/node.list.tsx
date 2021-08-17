import { useStoreState } from 'src/app/store'

import { Node } from './node'

export function NodeList() {
  const nodeList = useStoreState(state => state.openedNodes)

  const nodeListElem = nodeList.map(node => {
    return <Node key={node.id} node={node} />
  })

  return <div className="space-y-4">{nodeListElem}</div>
}
