import { Shelf } from '@brainote/ui/structure'
import { Title } from '@brainote/ui/typo'

export function NavSearch() {
  // const actions = useStoreActions(state => state.nav)

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
