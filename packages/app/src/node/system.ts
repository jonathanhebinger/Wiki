import { Node } from 'src/node/type'

export const Node_System: Node[] = sanitize([
  {
    id: 'System:Key',
    tags: ['System:Type'],
    data: {
      'System:Type': { type: 'type' },
    },
  },
  {
    id: 'System:Type',
    tags: ['System:Type'],
    data: {
      'System:Type': { type: 'type' },
    },
  },
  {
    id: 'System:Template',
    tags: ['System:Type'],
    data: {
      'System:Type': {
        type: 'array',
        of: {
          type: 'object',
          keys: [
            ['node', { type: 'node' }],
            ['required', { type: 'boolean' }],
          ],
        },
      },
    },
  },
])

function sanitize(nodes: Omit<Node, 'tagged' | 'name'>[]): Node[] {
  return nodes.map(node => {
    return {
      ...node,
      tagged: nodes
        .filter(tagged => tagged.tags.includes(node.id))
        .map(node => node.id),
      name: node.id,
    }
  })
}
