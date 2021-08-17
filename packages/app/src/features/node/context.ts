import { Node } from '@brainote/common'
import constate from 'constate'
import { useState } from 'react'
import { emit, useStoreActions, useStoreState } from 'src/app/store'

export interface NodeContextProviderProps {
  node: Node
}

export const [NodeContextProvider, useNodeContext] = constate(
  ({ node }: NodeContextProviderProps) => {
    const { id } = node

    const tags = useStoreState(state => state.nodes.tags).filter(tag =>
      node.tags.includes(tag.id),
    )

    const favorite = useStoreState(state => state.favorite).has(id)

    const actions = useStoreActions(actions => actions)

    const [editing, setEditing] = useState(false)

    function handleTagAdd(type: 'add' | 'create', tag: string) {
      if (type === 'add') {
        emit({ type: 'tag.add', payload: { node: id, tag } })
      } else {
        emit({ type: 'tag.create', payload: { node: id, name: tag } })
      }
    }
    function handleTagRemove(tag: string) {
      emit({ type: 'tag.remove', payload: { node: id, tag } })
    }

    function handleEdit() {
      setEditing(true)
    }
    function handleSave() {
      //actions.nodes.update({ id, ...draft })
      setEditing(false)
    }
    function handleClose() {
      actions.close(id)
    }
    function handleDelete() {
      emit({ type: 'delete', payload: id })
    }
    function handleToggleFavorite() {
      actions.toggleFavorite(id)
    }

    return {
      node,
      tags,
      favorite,
      editing,
      handleTagAdd,
      handleTagRemove,
      handleEdit,
      handleSave,
      handleClose,
      handleDelete,
      handleToggleFavorite,
    }
  },
)
