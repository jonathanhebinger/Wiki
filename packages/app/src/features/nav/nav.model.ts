import { Action, Computed, ThunkOn } from 'easy-peasy'
import { Injections, RootModel } from 'src/features/root/root.model'
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

export interface NavModel {
  opened: NavRef[]
  opened_nodes: Computed<NavModel, NavRefJoined[], RootModel>

  $open: Action<NavModel, NavRefPayload>
  $close: Action<NavModel, NavRefPayload>
  $close_all: Action<NavModel>

  on_templates$create: ThunkOn<NavModel, Injections, RootModel>
  on_templatesData$create: ThunkOn<NavModel, Injections, RootModel>
}
