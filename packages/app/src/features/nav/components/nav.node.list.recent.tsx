import { ListItem } from '@material-ui/core'
import { useMemo } from 'react'
import { useStoreActions, useStoreState } from 'src/app/store'
import { ListAccordion } from 'src/blocs/list.accordion'

export function MenuNodeListRecent() {
  const nodes = useStoreState(state => state.nodes.list)
  const open = useStoreActions(actions => actions.open)
  const recent = useMemo(() => {
    return nodes.sort((a, b) => a.creation - b.creation).slice(0, 10)
  }, [nodes])

  const listItems = recent.map(node => {
    function handleOpen() {
      open(node.id)
    }

    return (
      <ListItem key={node.id} button onClick={handleOpen}>
        {node.name}
      </ListItem>
    )
  })

  return (
    <ListAccordion dense subheader="Recent">
      {listItems}
    </ListAccordion>
  )
}
