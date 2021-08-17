import { Node } from '@brainote/common'
import { useState } from 'react'
import { useStoreActions, useStoreState } from 'src/app/store'
import { SearchNode, SearchNodeMultiple } from 'src/blocs/search.node'

export function NavNodeSearch() {
  const [tags, setTags] = useState<Node['id'][]>([])

  const open = useStoreActions(actions => actions.open)

  const nodes = useStoreState(state => {
    return state.nodes.list
  })

  const filteredNodes = nodes.filter(node => {
    return tags.every(tag => node.tags.includes(tag))
  })

  return (
    <>
      <SearchNodeMultiple
        nodes={nodes}
        label="Filter by tags"
        onSelect={setTags}
        exclude={tags}
      />
      <SearchNode nodes={filteredNodes} label="Search nodes" onSelect={open} />
    </>
  )
}
