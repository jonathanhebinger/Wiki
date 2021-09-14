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
  templateId: TemplateId
  patch: Patch<Template>
}
export type TemplateDeletePayload = {
  templateId: TemplateId
}

export type DataCreatePayload = {
  templateId: TemplateId
}
export type DataInsertPayload = {
  templateId: TemplateId
  data: TemplateData
}
export type DataUpdatePayload = {
  templateId: TemplateId
  dataId: TemplateDataId
  patch: Partial<Data.Object>
}
export type DataDeletePayload = {
  templateId: TemplateId
  dataId: TemplateDataId
}

export type DataAttachPayload = {
  node_id: NodeId
  templateId: TemplateId
  dataId: TemplateDataId
}
export type DataDetachPayload = DataAttachPayload
