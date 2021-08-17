import { Data, Node, Type } from '@brainote/common'

export function validateLink(
  nodes: Map<string, Node>,
  type: Type.Link,
  value: Data,
) {
  if (typeof value !== 'string') return false

  const linked = nodes[value]

  if (!linked) return false

  return true
}
