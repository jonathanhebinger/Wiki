import { Template, TemplateData, TemplateDataId, TemplateId } from 'src/types/template'

export type NavRef = NavRefPayload & {
  collapsed: boolean
}
export type NavRefPayload =
  | { type: 'template'; template: TemplateId }
  | { type: 'data'; template: TemplateId; data: TemplateDataId }
export type NavRefJoined = { collapsed: boolean; name: string } & (
  | { type: 'template'; template: Template }
  | { type: 'data'; template: Template; data: TemplateData }
)
