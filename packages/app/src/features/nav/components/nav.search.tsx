import { Shelf } from 'src/blocs/structure/shelf'
import { Title } from 'src/blocs/typo/title'
import { NodeSearch } from 'src/features/node/components/node.search'
import { useStoreActions, useStoreState } from 'src/features/root/root.store'

export function NavSearch() {
  const exclude = useStoreState(state => state.nav.opened_ids).map(({ id }) => {
    return id
  })
  const actions = useStoreActions(state => state.nav)

  return (
    <Shelf noPadding>
      <Title>Search</Title>
      <NodeSearch
        onChange={(ids, context) => {
          ids.map(id => actions.$open(id))

          if (ids.length > 0) {
            context.actions.selected$clear()
          }
        }}
        exclude={exclude}
      />
    </Shelf>
  )
}
