import {
  IconButton,
  ListItem,
  ListItemSecondaryAction,
} from '@material-ui/core'
import { Favorite } from '@material-ui/icons'
import { useStoreActions, useStoreState } from 'src/app/store'
import { ListAccordion } from 'src/blocs/list.accordion'

export function MenuNodeListFavorite() {
  const favorites = useStoreState(state => state.favoriteNodes)
  const actions = useStoreActions(actions => actions)

  const listItems = favorites.map(node => {
    function handleOpen() {
      actions.open(node.id)
    }

    function handleFavoriteClick() {
      actions.toggleFavorite(node.id)
    }

    return (
      <ListItem key={node.id} button onClick={handleOpen}>
        {node.name}
        <ListItemSecondaryAction>
          <IconButton
            onClick={handleFavoriteClick}
            size="small"
            color="primary"
          >
            <Favorite />
          </IconButton>
        </ListItemSecondaryAction>
      </ListItem>
    )
  })

  return (
    <ListAccordion dense subheader="Favorite">
      {listItems}
    </ListAccordion>
  )
}
