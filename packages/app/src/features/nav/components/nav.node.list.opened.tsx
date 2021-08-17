import {
  IconButton,
  ListItem,
  ListItemSecondaryAction,
} from '@material-ui/core'
import { Close } from '@material-ui/icons'
import { useStoreActions, useStoreState } from 'src/app/store'
import { ListAccordion } from 'src/blocs/list.accordion'

export function MenuNodeListOpened() {
  const opened = useStoreState(state => state.openedNodes)
  const close = useStoreActions(actions => actions.close)

  const openedElem = opened.map(node => {
    function handleClose() {
      close(node.id)
    }

    return (
      <ListItem key={node.id} button>
        {node.name}
        <ListItemSecondaryAction>
          <IconButton onClick={handleClose} size="small">
            <Close />
          </IconButton>
        </ListItemSecondaryAction>
      </ListItem>
    )
  })

  return (
    <ListAccordion dense subheader="Opened">
      {openedElem}
    </ListAccordion>
  )
}
