import { Section, Shelf, Surface } from '@brainote/ui/structure'

import { useModel, useNavActions } from '../../main'

export function NavNodes() {
  const navActions = useNavActions()
  const nodes = useModel(state => state.main.datas)['note']

  const Nodes = nodes.map(node => {
    function handleOpen() {
      navActions.open({
        templateId: 'note',
        dataId: node.id,
      })
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
    <Section Label={<>Nodes - {nodes.length}</>}>
      <Shelf noPadding>{Nodes}</Shelf>
    </Section>
  )
}
