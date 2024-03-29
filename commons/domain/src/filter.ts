import { Data } from './data'

export namespace Filter {
  export type Array = {
    type: 'array.none' | 'array.some' | 'array.every'
    matcher: any
  }

  export type Object = {
    type: 'match-none' | 'match-some' | 'match-every'
    matcher: any
  }

  export type NumberBase = {
    type:
      | 'number.>='
      | 'number.>'
      | 'number.<='
      | 'number.<'
      | 'number.=='
      | 'number.!='
    to: number
  }
  export type NumberRange = {
    type: 'number.<>' | 'number.><'
    range: [number, number]
  }
  export type Number = NumberBase | NumberRange

  export type Boolean = boolean

  export type Logic =
    | { type: 'or' | 'and'; filters: any[] }
    | { type: 'not'; filter: any }
}

export declare namespace Filter2 {
  export namespace Boolean {
    export interface Equal {
      type: 'boolean.equal'
      value: boolean
    }

    export type Any = Equal
  }

  export namespace Number {
    export interface Equal {
      type: 'number.equal'
      value: number
    }

    export interface Between {
      type: 'number.between'
      min: number
      max: number
    }

    export type Any = Equal | Between
  }

  export namespace String {
    export interface Equal {
      type: 'string.equal'
      value: string
    }

    export interface Match {
      type: 'string.match'
      pattern: string
    }

    export type Any = Equal | Match
  }

  export namespace Array {
    export interface Equal {
      type: 'array.equal'
      value: Data[]
    }

    export interface Includes {
      type: 'array.includes'
      value: Data
    }

    export interface None {
      type: 'array.none'
      filter: Filter2.Any
    }

    export interface Some {
      type: 'array.some'
      filter: Filter2.Any
    }

    export interface Every {
      type: 'array.every'
      filter: Filter2.Any
    }

    export type Any = Equal | Includes | None | Some | Every
  }

  export namespace Object {
    export interface Equal {
      type: 'object.equal'
      value: Data.Object
      partial: boolean
    }

    export interface Matcher {
      [index: string]: Filter2.Any
    }

    export interface Match {
      type: 'object.match'
      value: Matcher
    }

    export type Any = Equal | Match
  }

  export namespace Link {
    export interface Equal {
      type: 'link.equal'
      value: string
    }

    export interface Referenced {
      type: 'link.referenced'
      value: string
    }

    export type Any = Equal | Referenced
  }

  export interface Or {
    type: 'or'
    filters: Any[]
  }

  export interface And {
    type: 'and'
    filters: Any[]
  }

  export type Any =
    | Boolean.Any
    | Number.Any
    | String.Any
    | Array.Any
    | Object.Any
    | Link.Any
    | Or
    | And
}
