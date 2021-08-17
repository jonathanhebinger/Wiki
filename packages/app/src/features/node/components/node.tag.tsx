import { Chip } from '@material-ui/core'
import { useState } from 'react'

export interface NodeTagProps {
  tag: string
  onDelete?: () => void
}
export function NodeTag({ tag, onDelete }: NodeTagProps) {
  const [focused, setFocus] = useState(false)

  function handleToggle() {
    setFocus(!focused)
  }

  function handleDelete() {
    onDelete && onDelete()
  }

  return (
    <Chip
      label={tag}
      size="small"
      onClick={handleToggle}
      onDelete={focused ? handleDelete : undefined}
    />
  )
}
