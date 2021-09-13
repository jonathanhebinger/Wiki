import {
  Data,
  Node,
  NodeId,
  Template,
  TemplateData,
  TemplateDataId,
  TemplateId,
} from '@brainote/common'

type Patch<T> = Partial<T> | ((template: T) => void)

export type NodeCreatePayload = {
  name: string
}
export type NodeUpdatePayload = {
  node_id: NodeId
  patch: Patch<Node>
}
export type NodeDeletePayload = {
  node_id: NodeId
}

export type TemplateCreatePayload = {
  name: string
}
export type TemplateUpdatePayload = {
  template_id: TemplateId
  patch: Patch<Template>
}
export type TemplateDeletePayload = {
  template_id: TemplateId
}

export type DataCreatePayload = {
  template_id: TemplateId
}
export type DataInsertPayload = {
  template_id: TemplateId
  data: TemplateData
}
export type DataUpdatePayload = {
  template_id: TemplateId
  data_id: TemplateDataId
  patch: Partial<Data.Object>
}
export type DataDeletePayload = {
  template_id: TemplateId
  data_id: TemplateDataId
}

export type DataAttachPayload = {
  node_id: NodeId
  template_id: TemplateId
  data_id: TemplateDataId
}
export type DataDetachPayload = DataAttachPayload
