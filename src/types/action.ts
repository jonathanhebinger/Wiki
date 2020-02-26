export interface ActionAtomic<Type extends string> {
  type: Type
}

export interface ActionPayload<Type extends string, Payload = undefined> {
  type: Type
  payload: Payload
}

export type Action<Type extends string, Payload = undefined> = Payload extends undefined
  ? ActionAtomic<Type>
  : ActionPayload<Type, Payload>
