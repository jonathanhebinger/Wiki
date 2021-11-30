export interface Query<Type extends string, Payload> {
  type: Type
  payload: Payload
}

export declare namespace Query {
  export type Init = Query<'init', {}>

  export type Any = Init
}
