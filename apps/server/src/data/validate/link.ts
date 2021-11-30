import { Data, Node, Type } from '@brainote/domain'

export function validateLink(nodes: Map<string, Node>, type: Type.Link, value: Data) {
  if (typeof value !== 'text') return false

  const linked = nodes[value]

  if (!linked) return false

  return true
}
