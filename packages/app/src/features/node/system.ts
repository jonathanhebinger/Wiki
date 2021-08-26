import { Node } from 'src/features/node/type'

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
    id: 'LocationDemo',
    tags: ['System:Type'],
    data: {
      Location: {
        X: 0,
        Y: 2,
      },
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
            {
              id: 'node',
              name: 'node',
              required: true,
              type: { type: 'node' },
            },
            {
              id: 'required',
              name: 'required',
              required: true,
              type: { type: 'number' },
            },
          ],
        },
      },
    },
  },
  {
    id: 'Location',
    tags: ['System:Type'],
    data: {
      'System:Type': {
        type: 'object',
        keys: [
          { id: 'X', name: 'X', required: true, type: { type: 'number' } },
          { id: 'Y', name: 'Y', required: true, type: { type: 'number' } },
        ],
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
