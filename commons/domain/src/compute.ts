import { TemplateId } from './template'

export namespace Compute {
  export type ObjectPath = {
    type: 'object.path'
    path: string[]
  }
  export type StringConcat = {
    type: 'string.concat'
    paths: ObjectPath[]
  }
  export type Any = ObjectPath | StringConcat
}

export namespace UI {
  export type Select = {
    type: 'select'
    template: TemplateId
    name: Compute.Any
  }
}
