import { TemplateId, TemplateKeyId } from './template'

export namespace Type {
  export type Base<Type extends string> = { type: Type }

  export type Boolean = Base<'boolean'>
  export type Number = Base<'number'>
  export type String = Base<'string'>

  export type Array = Base<'array'> & {
    of: Any
  }

  export type Object = Base<'object'> & {
    keys: ObjectKey[]
  }
  export type ObjectKey = {
    id: string
    name: string
    type: Any
  }

  export type Join = Base<'join'> & {
    template: TemplateId
    reflect?: TemplateKeyId
  }

  export type Type = Base<'type'>

  export type Any = Boolean | Number | String | Array | Object | Join | Type
}
