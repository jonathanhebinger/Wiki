import { useState } from 'react'
import { Button } from 'src/blocs/button'
import { Modal } from 'src/blocs/modal'
import { Badge } from 'src/blocs/structure/badge'
import { Shelf } from 'src/blocs/structure/shelf'
import { NodeSearch } from 'src/features/node/components/node.search'
import { useNode } from 'src/features/node/node.context'
import { NodeId } from 'src/types/node'

export function NodeTagsAdd({}: {}) {
  const { node, tags$add } = useNode()

  const [opened, opened$set] = useState(false)
  const [selected, selected$set] = useState<NodeId[]>([])

  function handleAdd() {
    selected.map(tags$add)
    opened$set(false)
  }

  function handleOpen() {
    opened$set(true)
  }

  return (
    <>
      <Badge className="m-1" label="+" onClick={handleOpen} />
      <Modal opened={opened} className="w-1/2">
        <Shelf spacing="lg">
          <NodeSearch onChange={selected$set} exclude={node.tags} />
          <Button onClick={handleAdd} contrast>
            Validate
          </Button>
        </Shelf>
      </Modal>
    </>
  )
}
