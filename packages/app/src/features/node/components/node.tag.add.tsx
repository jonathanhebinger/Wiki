import { Chip, IconButton } from '@material-ui/core'
import { Add } from '@material-ui/icons'
import { useState } from 'react'

import { NodeTagAddDialog } from './node.tag.add.dialog'

export function NodeTagAdd() {
  const [open, setOpen] = useState(false)

  function handleOpen() {
    setOpen(true)
  }
  function handleClose() {
    setOpen(false)
  }

  return (
    <>
      <Chip
        label={
          <IconButton size="small">
            <Add />
          </IconButton>
        }
        size="small"
        onClick={handleOpen}
      />

      {open && <NodeTagAddDialog onClose={handleClose} />}
    </>
  )
}
