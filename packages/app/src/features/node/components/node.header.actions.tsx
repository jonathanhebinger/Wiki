import { IconButton } from '@material-ui/core'
import { Close, Delete, Favorite, Save } from '@material-ui/icons'
import { useNodeContext } from 'src/features/node/context'

export function NodeHeaderActions() {
  const {
    favorite,
    handleSave,
    handleDelete,
    handleClose,
    handleToggleFavorite,
  } = useNodeContext()

  return (
    <>
      <IconButton
        onClick={handleToggleFavorite}
        color={favorite ? 'primary' : 'default'}
      >
        <Favorite />
      </IconButton>
      <IconButton onClick={handleDelete}>
        <Delete />
      </IconButton>
      <IconButton onClick={handleSave} color="primary">
        <Save />
      </IconButton>
      <IconButton onClick={handleClose}>
        <Close />
      </IconButton>
    </>
  )
}
