import { Node } from '@brainote/common'
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from '@material-ui/core'
import { useCallback, useState } from 'react'
import { useStoreState } from 'src/app/store'
import { SearchNode } from 'src/blocs/search.node'

import { useNodeContext } from '../context'

export function NodeTagAddDialog({ onClose }: { onClose: () => void }) {
  const { handleTagAdd, tags, node } = useNodeContext()

  const nodes = useStoreState(state => {
    return state.nodes.list
  })

  const [tag, setTag] = useState<{ name: string } | { id: Node['id'] }>()

  function handleAdd() {
    if (tag) {
      if ('name' in tag) {
        handleTagAdd('create', tag.name)
      } else {
        handleTagAdd('add', tag.id)
      }
    }
    onClose()
  }

  const handleCreate = useCallback((name: string) => {
    setTag({ name })
  }, [])

  const handleChange = useCallback((id: Node['id']) => {
    setTag({ id })
  }, [])

  return (
    <Dialog onClose={onClose} open>
      <DialogTitle id="simple-dialog-title">Add Tag</DialogTitle>
      <DialogContent style={{ width: '400px' }}>
        <SearchNode
          nodes={nodes}
          label="Search nodes"
          exclude={[...tags.map(tag => tag.id), node.id]}
          onSelect={handleChange}
          onCreate={handleCreate}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button onClick={handleAdd} color="primary">
          Add
        </Button>
      </DialogActions>
    </Dialog>
  )
}
