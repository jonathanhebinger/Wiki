import { Shelf } from 'src/blocs/structure/shelf'
import { Title } from 'src/blocs/typo/title'
import { useStoreActions } from 'src/features/root/root.store'

export function NavSearch() {
  const actions = useStoreActions(state => state.nav)

  return (
    <Shelf noPadding>
      <Title>Search</Title>
      {/* <NodeSearch
        onChange={(ids, context) => {
          // ids.map(id => actions.$open(id))

          if (ids.length > 0) {
            context.actions.selected$clear()
          }
        }}
      /> */}
    </Shelf>
  )
}
