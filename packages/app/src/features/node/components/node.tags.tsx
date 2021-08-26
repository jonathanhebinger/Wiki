import { Badge } from 'src/blocs/structure/badge'
import { Section } from 'src/blocs/structure/section'
import { Surface } from 'src/blocs/structure/surface'
import { NodeTagsAdd } from 'src/features/node/components/node.tags.add'
import { useNode } from 'src/features/node/node.context'

export function Node_Tags() {
  const { tags, tags$remove } = useNode()

  const badges = tags.map(parent => {
    return (
      <Badge
        key={parent.id}
        className="m-1"
        label={parent.name}
        onClick={() => {}}
        onDelete={() => tags$remove(parent.id)}
      />
    )
  })

  return (
    <Section Label={<>TAGS - {tags.length}</>}>
      <Surface shadow="sm" className="flex flex-row" contrast>
        {badges}
        <NodeTagsAdd />
      </Surface>
    </Section>
  )
}
