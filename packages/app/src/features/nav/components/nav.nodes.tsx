import { Section } from 'src/blocs/structure/section'
import { Shelf } from 'src/blocs/structure/shelf'
import { Surface } from 'src/blocs/structure/surface'
import { useModel, useNavActions } from 'src/features/root/root.store'

export function NavNodes() {
  const list = useModel(state => state.nodes.list)

  const actions = useNavActions()

  const Nodes = list.map(node => {
    function handleOpen() {
      actions.open(node.id)
    }

    return (
      <Surface
        htmlProps={{
          onClick: handleOpen,
        }}
        key={node.id}
        className="p-1"
        squared
        shadow="sm"
      >
        {node.name}
      </Surface>
    )
  })

  return (
    <Section Label={<>Nodes - {list.length}</>}>
      <Shelf noPadding>{Nodes}</Shelf>
    </Section>
  )
}
