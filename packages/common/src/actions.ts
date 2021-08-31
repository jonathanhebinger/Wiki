import { Node } from './node'

export interface Action<Type extends string, Payload> {
  type: Type
  payload: Payload
}

export declare namespace Action {
  export namespace Payload {
    export type Create = Pick<Node, 'name' | 'tags'>
    export type Update = Pick<Node, 'id' | 'name'>
    export type Delete = NodeId
  }

  export type Create = Action<'create', Payload.Create>
  export type Update = Action<'update', Payload.Update>
  export type Delete = Action<'delete', Payload.Delete>

  export namespace Tag {
    export namespace Payload {
      export type Create = { node: NodeId; name: string }
      export type Add = { node: NodeId; tag: NodeId }
      export type Move = { node: NodeId; tag: NodeId; index: number }
      export type Remove = { node: NodeId; tag: NodeId }
    }

    export type Create = Action<'tag.create', Payload.Create>
    export type Add = Action<'tag.add', Payload.Add>
    export type Move = Action<'tag.move', Payload.Move>
    export type Remove = Action<'tag.remove', Payload.Remove>

    export type Any = Create | Add | Move | Remove
  }

  export type Any = Create | Update | Update | Delete | Tag.Any
}
