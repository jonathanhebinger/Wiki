import constate from 'constate'
import { useMemo } from 'react'
import { Data, Node } from 'src/features/node/type'
import { useStoreActions, useStoreState } from 'src/features/root/root.store'

export const [NodeProvider, useNode] = constate(({ node }: { node: Node }) => {
  const nodes = useStoreState(state => state.nodes.dictionnary)
  const actions = useStoreActions(actions => actions.nodes)

  const tags = useMemo(() => {
    return node.tags.map(id => nodes[id] as Node)
  }, [node.tags])
  const tagged = useMemo(() => {
    return node.tagged.map(id => nodes[id] as Node)
  }, [node.tagged])

  function tags$add(parent: Node['id']) {
    actions.tags$add({ id: node.id, tag: parent })
  }
  function tags$remove(parent: Node['id']) {
    actions.tags$remove({ node: node.id, tag: parent })
  }

  function tagged$add(tagged: Node['id']) {
    actions.tags$add({ id: tagged, tag: node.id })
  }
  function tagged$remove(tagged: Node['id']) {
    actions.tags$remove({ node: tagged, tag: node.id })
  }

  function data$set(type: Node.Id, data: Data.Any) {
    actions.data$set({
      id: node.id,
      type,
      data,
    })
  }

  const templates = tags.filter(tag => tag.tags.includes('System:Template'))
  const keys: NodeDataKey[] = Object.entries(node.data).map(
    ([key_id, data]) => {
      const typeNode = nodes[key_id] as Node
      const type = typeNode.data['System:Type']

      return { typeNode, type, data }
    },
  )

  return {
    node,

    tags,
    tags$add,
    tags$remove,

    tagged,
    tagged$add,
    tagged$remove,

    data$set,

    templates,
    keys,
  }
})

export interface NodeDataKey {
  typeNode: Node
  type: any
  data: any
}
