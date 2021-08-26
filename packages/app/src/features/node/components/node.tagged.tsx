import { Section } from 'src/blocs/section'
import { Badge } from 'src/blocs/structure/badge'
import { Group } from 'src/blocs/structure/group'
import { useNode } from 'src/features/node/node.context'

export function Node_Tagged() {
  const { tagged, tagged$remove } = useNode()

  const Badges = tagged.map(parent => {
    return (
      <Badge
        className="bg-white"
        label={parent.name}
        onClick={() => {}}
        onDelete={() => tagged$remove(parent.id)}
        key={parent.id}
      />
    )
  })

  return (
    <Section Label={<>TAGGED - {tagged.length}</>}>
      <Group spacing="sm">{Badges}</Group>
    </Section>
  )
}
