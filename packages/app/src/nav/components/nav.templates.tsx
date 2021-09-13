import { Section, Shelf, Surface } from '@brainote/ui/structure'

import { useModel, useNavActions } from '../../root'

export function NavTemplates() {
  const templates = useModel(state => state.nodes.templates)
  const actions = useNavActions()

  const Nodes = templates.map(template => {
    return (
      <Surface
        htmlProps={{
          onClick: () => actions.open(template.id),
        }}
        key={template.id}
        className="p-1"
        squared
        shadow="sm"
      >
        {template['root.name']}
      </Surface>
    )
  })

  return (
    <Section Label={<>Templates - {templates.length}</>}>
      <Shelf noPadding>{Nodes}</Shelf>
    </Section>
  )
}
