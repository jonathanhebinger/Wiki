import { Node, NodeId, Template, TemplateId } from '@brainote/common'

export type NavRef = NavRefPayload & {
  collapsed: boolean
}
export type NavRefPayload =
  | { type: 'template'; template: TemplateId }
  | { type: 'data'; node: NodeId; template: TemplateId }
  | { type: 'node'; node: NodeId }
export type NavRefJoined = { collapsed: boolean; name: string } & (
  | { type: 'template'; template: Template }
  | { type: 'data'; node: Node; template: Template }
  | { type: 'node'; node: Node }
)
