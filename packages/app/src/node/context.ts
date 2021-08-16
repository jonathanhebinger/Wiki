import constate from 'constate'
import { useMemo } from 'react'
import { Node } from 'src/node/type'
import { useStoreActions, useStoreState } from 'src/store'

export const [NodeProvider, useNode] = constate(({ node }: { node: Node }) => {
  const nodes = useStoreState(state => state.nodes.dictionnary)
  const actions = useStoreActions(actions => actions.nodes)

  const tags = useMemo(() => {
    return node.tags.map(id => nodes[id] as Node)
  }, [node.tags])
  const tagged = useMemo(() => {
    return node.tagged.map(id => nodes[id] as Node)
  }, [node.tagged])

  function tags$add(parent: Node) {
    actions.tags$add({ node: node.id, parent: parent.id })
  }
  function tags$remove(parent: Node) {
    actions.tags$remove({ node: node.id, parent: parent.id })
  }

  function tagged$add(child: Node) {
    actions.tagged$add({ node: node.id, child: child.id })
  }
  function tagged$remove(child: Node) {
    actions.tagged$remove({ node: node.id, child: child.id })
  }

  const templates = tags.filter(tag => tag.tags.includes('System:Template'))
  const keys = Object.entries(node.data).map(([key_id, value]) => {
    const node = nodes[key_id] as Node
    const type = node.data['System:Type']

    return { node, type, value }
  })

  return {
    node,

    tags,
    tags$add,
    tags$remove,

    tagged,
    tagged$add,
    tagged$remove,

    templates,
    keys,
  }
})
