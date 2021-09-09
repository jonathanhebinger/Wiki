import { Node, NodeId } from './node'

export interface Event<Type extends string, Payload> {
  type: Type
  payload: Payload
}

export declare namespace Event {
  export namespace Payload {
    export type Multiple = Any[]

    export type Init = { nodes: Node[] }
    export type Set = Node[]
    export type Delete = NodeId

    export type Open = NodeId
  }
  export type Multiple = Event<'multiple', Payload.Multiple>

  export type Init = Event<'init', Payload.Init>
  export type Set = Event<'set', Payload.Set>
  export type Delete = Event<'delete', Payload.Delete>

  export type Open = Event<'open', Payload.Open>

  export type Any = Multiple | Init | Set | Delete | Open
}
