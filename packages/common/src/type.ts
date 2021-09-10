import { Data } from './data'
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
    multiple: boolean
  }

  export type Type = Base<'type'>

  export type Any = Boolean | Number | String | Array | Object | Join | Type
}

export declare namespace Type2 {
  export interface Base {
    type: string

    required: boolean
  }
  export interface Boolean extends Base {
    type: 'boolean'

    default?: boolean
  }
  export interface Number extends Base {
    type: 'number'

    default?: number

    min?: number
    max?: number
    step?: number
  }
  export interface String extends Base {
    type: 'string'

    default?: string

    minLength?: number
    maxLength?: number
    pattern?: string | string[]
    enum?: string[]
  }
  export interface Text extends Base {
    type: 'text'

    default?: Data

    minLength?: number
    maxLength?: number
  }
  export interface Array extends Base {
    type: 'array'

    of: Any

    default?: Data[]

    minLength?: number
    maxLength?: number
    unique?: boolean
  }
  export interface Object extends Base {
    type: 'object'

    entries: [string, Type.Any][]
  }
  export interface Link extends Base {
    type: 'link'

    default?: string

    with: any

    reflect: boolean
  }
  export interface Type {
    type: 'type'
    name: string
  }

  export interface Node extends Base {
    type: 'node'

    name: string
    properties: [string, Type.Any][]
  }

  export namespace Patch {
    export type Boolean = boolean
    export type Number = number
    export type String = string
    export type Text = Data
    export type Array = (
      | { type: 'set'; value: Data[] }
      | { type: 'insert'; value: Data; index?: number }
      | { type: 'update'; value: Any; index: number }
      | { type: 'move'; from: number; to: number }
      | { type: 'delete'; index: number }
      | { type: 'delete'; value: Any }
    )[]
    export type Object = { [index: string]: Any }
    export type Link = string

    export type Any =
      | undefined
      | Boolean
      | Number
      | String
      | Text
      | Array
      | Object
      | Link
  }

  export type Any =
    | Boolean
    | Number
    | String
    | Text
    | Array
    | Object
    | Link
    | Type
}
