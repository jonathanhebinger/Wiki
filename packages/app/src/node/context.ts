import constate from 'constate'
import { useMemo } from 'react'
import { Node } from 'src/node/type'
import { useStoreActions, useStoreState } from 'src/store'

export const [NodeProvider, useNode] = constate((node: Node) => {
  const nodes = useStoreState(state => state.nodes.dictionnary)
  const actions = useStoreActions(actions => actions.nodes)

  const parents = useMemo(() => {
    return node.parents.map(id => nodes[id] as Node)
  }, [node.parents])
  const children = useMemo(() => {
    return node.children.map(id => nodes[id] as Node)
  }, [node.children])

  function parents$add(parent: Node) {
    actions.parents$add({ node: node.id, parent: parent.id })
  }
  function parents$remove(parent: Node) {
    actions.parents$add({ node: node.id, parent: parent.id })
  }

  function children$add(child: Node) {
    actions.children$add({ node: node.id, child: child.id })
  }
  function children$remove(child: Node) {
    actions.children$add({ node: node.id, child: child.id })
  }

  return {
    node,

    parents,
    parents$add,
    parents$remove,

    children,
    children$add,
    children$remove,
  }
})
