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
