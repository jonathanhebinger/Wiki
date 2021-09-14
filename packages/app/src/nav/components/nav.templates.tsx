import { Section, Shelf, Surface } from '@brainote/ui/structure'

import { useModel, useNavActions } from '../../main'

export function NavTemplates() {
  const templates = useModel(state => state.main.templates)
  const actions = useNavActions()

  const Nodes = templates.map(template => {
    function handleOpen() {
      return actions.open({
        template_id: 'template',
        data_id: template.id,
      })
    }

    return (
      <Surface
        key={template.id}
        htmlProps={{ onClick: handleOpen }}
        className="p-1"
        shadow="sm"
        squared
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
