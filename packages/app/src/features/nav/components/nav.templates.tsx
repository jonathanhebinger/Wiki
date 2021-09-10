import { Section } from 'src/blocs/structure/section'
import { Shelf } from 'src/blocs/structure/shelf'
import { Surface } from 'src/blocs/structure/surface'
import { useModel, useNavActions } from 'src/features/root/root.store'

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
        {template.name}
      </Surface>
    )
  })

  return (
    <Section Label={<>Templates - {templates.length}</>}>
      <Shelf noPadding>{Nodes}</Shelf>
    </Section>
  )
}
