// export namespace CQE {
//   export type Command<P = void, R = void> = {
//     type: 'command'
//     path: string[]
//     payload: P
//     result?: R
//   }
//   export type Query<P = void, R = void> = {
//     type: 'query'
//     path: string[]
//     payload: P
//     result?: R
//   }
//   export type Event<P = void> = {
//     type: 'event'
//     path: string[]
//     payload: P
//   }
//   export type CommandBuilder<P = void, R = void> = ((
//     payload: P,
//   ) => Command<P, R>) & { type: 'command'; path: string[] }
//   export type QueryBuilder<P = void, R = void> = ((
//     payload: P,
//   ) => Query<P, R>) & { type: 'query'; path: string[] }
//   export type EventBuilder<P = void> = ((payload: P) => Event<P>) & {
//     type: 'event'
//     path: string[]
//   }
// }

// export type Id<K extends string> = string & { key?: K }

// export type OrderId = Id<'order'>
// export type Order = {
//   id: OrderId
//   items: VariationNode[]
// }

// export type ProductId = Id<'product'>
// export type Product = {
//   id: ProductId
//   name: string
//   info: string
//   variations: {
//     category: Variation
//     options: Variation.Option[]
//   }[]
//   variationsNodes: ProductVariation[]
//   inventory: inventory
// }
// export namespace Product {}

// export type VariationId = Id<'variation'>
// export type Variation = {
//   id: VariationId
//   name: string
//   info: string
//   options: Variation.Option[]
// }
// export namespace Variation {
//   export type OptionId = Id<'variation-option'>
//   export type Option = {
//     id: OptionId
//     name: string
//     info: string
//   }

//   export namespace Command {
//     export namespace Payload {
//       export type Create = Omit<Variation, 'id'>
//       export type Update = Variation
//       export type CreateOption = {
//         variation: VariationId
//         payload: Omit<Option, 'id'>
//       }
//       export type UpdateOption = {
//         variation: VariationId
//         payload: Option
//       }
//     }
//     export type Create = CQE.Command<Payload.Create, Variation>
//     export type Update = CQE.Command<Payload.Update, Variation>
//     export type CreateOption = CQE.Command<Payload.CreateOption, Variation>
//     export type UpdateOption = CQE.Command<Payload.UpdateOption, Variation>
//   }

//   export namespace Event {
//     export namespace Payload {
//       type OptionBase = {
//         variation: Variation
//         option: Option
//       }
//       export type OptionCreated = OptionBase
//       export type OptionUpdated = OptionBase
//     }
//     export type Created = CQE.Event<Variation>
//     export type Updated = CQE.Event<Variation>
//     export type OptionCreated = CQE.Event<Payload.OptionCreated>
//     export type OptionUpdated = CQE.Event<Payload.OptionUpdated>
//   }

//   export namespace Query {}
// }

// export type ProductVariationId = Id<'product-variation'>
// export type ProductVariation = {
//   id: ProductVariationId
//   product: ProductId
//   entries: Record<VariationId, Variation.OptionId>
//   inventory: InventoryId
//   images: File[]
// }
// export namespace ProductVariation {
//   export namespace Command {
//     export namespace Payload {
//       export type Create = Omit<Variation, 'id'>
//       export type Update = Variation
//     }
//     export type Create = CQE.Command<Payload.Create, ProductVariation>
//     export type Update = CQE.Command<Payload.Update, ProductVariation>

//     export type Lock = CQE.Command<ProductVariationId>
//     export type Unlock = CQE.Command<ProductVariationId>
//     export type Sell = CQE.Command<ProductVariationId>
//   }

//   export namespace Event {
//     export type Created = CQE.Event<Variation>
//     export type Updated = CQE.Event<Variation>

//     export type Locked = CQE.Event<Variation>
//     export type Unlocked = CQE.Event<Variation>
//     export type Sold = CQE.Event<Variation>
//   }

//   export namespace Query {}
// }

// export type InventoryId = Id<'inventory'>
// export type Inventory = {
//   id: InventoryId
//   parent?: InventoryId
//   quantityAvailable: number
//   quantityLocked: number
//   quantitySold: number
// }
// export namespace Inventory {
//   export type LockId = Id<'inventory-lock'>
//   export type Lock = {
//     id: LockId
//     inventory: InventoryId
//     timestamp: number
//   }
//   export namespace Lock {
//     export namespace Command {
//       export type Create = CQE.Command<InventoryId, LockId>
//       export type Delete = CQE.Command<LockId>
//     }

//     export namespace Event {
//       export type Created = CQE.Event<Lock>
//       export type Deleted = CQE.Event<Lock>
//     }

//     export namespace Query {
//       export type Expired = CQE.Query<number, LockId[]>
//     }
//   }

//   export namespace Command {
//     export type Create = CQE.Command<Omit<Inventory, 'id'>, Inventory>
//     export type Delete = CQE.Command<InventoryId>

//     export type Lock = CQE.Command<InventoryId, LockId>
//     export type Sell = CQE.Command<InventoryId>
//   }

//   export namespace Event {
//     export type Created = CQE.Event<Inventory>
//     export type Deleted = CQE.Event<Inventory>

//     export type Locked = CQE.Event<Inventory>
//     export type Unlocked = CQE.Event<Inventory>
//     export type Sold = CQE.Event<Inventory>
//   }

//   export namespace Query {
//     export type Availability = CQE.Query<
//       Record<InventoryId, number>,
//       Record<InventoryId, number>
//     >
//   }
// }

// export class Domain {
//   private _version: number = 1
//   public get version(): number {
//     return this.root ? this.root.version : this._version
//   }
//   public set version(version: number) {
//     if (!this.root) {
//       this._version = version
//     }
//   }

//   public get path(): string[] {
//     return this.root
//       ? [`v-${this.version}`, ...this.root.path, this.name]
//       : [`v-${this.version}`, this.name]
//   }

//   constructor(public name: string, public root?: Domain) {}

//   subdomain(name: string) {
//     return new Domain(name, this)
//   }

//   command<P = void, R = void>(name: string): CQE.CommandBuilder<P, R> {
//     const type = 'command' as const
//     const path = [...this.path, name]

//     return Object.assign((payload: P) => ({ type, path, payload }), {
//       type,
//       path,
//     })
//   }
//   query<P = void, R = void>(name: string): CQE.QueryBuilder<P, R> {
//     const type = 'query' as const
//     const path = [...this.path, name]

//     return Object.assign((payload: P) => ({ type, path, payload }), {
//       type,
//       path,
//     })
//   }
//   event<P = void>(name: string): CQE.EventBuilder<P> {
//     const type = 'event' as const
//     const path = [...this.path, name]

//     return Object.assign((payload: P) => ({ type, path, payload }), {
//       type,
//       path,
//     })
//   }
// }

/////////

/////////

/////////

/////////

export type Named<Name extends string = string> = { name: Name }

export type Get<List extends Named, Name extends string> = Extract<
  List,
  Named<Name>
>

export type Filter<List extends Named, Name extends string> = Exclude<
  List,
  Named<Name>
>

export type Insert<List extends Named, Item extends Named> = List | Item

export type Update<
  List extends Named,
  OldItem extends string,
  NewItem extends Named,
> = Filter<List, OldItem> | (NewItem extends Named<never> ? never : NewItem)

export type UpdateMany<
  List extends Named,
  ItemList extends [string, Named][],
> = ItemList extends [infer Pair, ...infer Rest]
  ? Pair extends [infer Name, infer Item]
    ? Name extends string
      ? Item extends Named
        ? Update<
            Rest extends [string, Named][] ? UpdateMany<List, Rest> : List,
            Name,
            Item
          >
        : List
      : List
    : List
  : List

/////////

/////////

/////////

/////////

export class Table<
  Name extends string = any,
  Fields extends Field<any, any> = never,
> {
  public name: Name
  public fields: Fields[] = []

  constructor(name: Name) {
    this.name = name
  }

  rename<Name extends string>(name: Name): Table<Name, Fields> {
    return Object.assign(this, { name }) as any
  }

  field<FieldName extends string, FieldType extends FieldNS.TypeList>(
    fieldName: FieldName,
    fieldType: FieldType,
  ): TableNS.InsertField<this, Field<FieldName, FieldType>>
  field<FieldName extends Fields['name'], FieldUpdate extends Field<any, any>>(
    fieldName: FieldName,
    fieldUpdater: (field: Get<Fields, FieldName>) => FieldUpdate,
  ): Table<FieldName, Update<Fields, FieldName, FieldUpdate>>
  field(fieldName: string, fieldTypeOrUpdater: any): Table<any, any> {
    return this
  }

  delete(): Table<never> {
    return
  }
}

export namespace TableNS {
  export type InsertField<
    T extends Table<any, any>,
    F extends Field<any, any>,
  > = T extends Table<infer Name, infer Fields>
    ? Table<Name, Insert<Fields, F>>
    : T

  export type Entity<
    Tables extends Table<any, any>,
    T extends Table<any, any>,
  > = T extends Table<infer Name, infer Fields>
    ? {
        [FieldName in Fields['name']]: FieldNS.TypeMapper<
          Tables,
          Get<Fields, FieldName>
        >
      }
    : {}
}

export type Field<Name extends string, Type extends FieldNS.TypeList> = {
  name: Name
  type: Type
} & FieldNS.List
export namespace FieldNS {
  export type Base<Type extends string, Data = never> = {
    type: Type
    required?: boolean
  } & Data

  export type Boolean = Base<'boolean'>

  export type NumberData = {
    min?: number
    max?: number
  }
  export type Number = Base<'number', NumberData>

  export type StringData = {
    minLength?: number
    maxLength?: number
    pattern?: string
  }
  export type String = Base<'string', StringData>

  export type JoinData = {
    many: boolean
    with: string
  }
  export type Join = Base<'join', JoinData>

  export type List = Boolean | Number | String | Join
  export type TypeList = List['type']

  export type Any<Name extends string> = {
    name: Name
  } & List

  export type TypeMapper<
    Tables extends Table<any, any>,
    Field,
  > = Field extends Base<infer Type, infer Data>
    ? Type extends 'boolean'
      ? boolean
      : Type extends 'number'
      ? number
      : Type extends 'string'
      ? string
      : Type extends 'join'
      ? Data extends { with: infer With }
        ? With extends string
          ? Promise<TableNS.Entity<Tables, Get<Tables, With>>>
          : never
        : never
      : never
    : never
}

export namespace DatabaseNS {}

export class Database<Tables extends Table<any, any> = never> {
  major<ProjectUpdate extends Database<any> = this>(
    about: string,
    handler?: (project: this) => ProjectUpdate,
  ): ProjectUpdate {
    return handler ? handler(this) : (this as any)
  }
  minor<ProjectUpdate extends Database<any> = this>(
    about: string,
    handler?: (project: this) => ProjectUpdate,
  ): ProjectUpdate {
    return handler ? handler(this) : (this as any)
  }
  feature<ProjectUpdate extends Database<any> = this>(
    about: string,
    handler?: (project: this) => ProjectUpdate,
  ): ProjectUpdate {
    return handler ? handler(this) : (this as any)
  }

  table<
    SchemaUpdate extends Table<any, any>,
    SchemaName extends string = SchemaUpdate['name'],
  >(schema: SchemaUpdate): Database<Update<Tables, SchemaName, SchemaUpdate>>
  table<
    SchemaName extends Tables['name'],
    SchemaUpdate extends Table<any, any>,
  >(
    schemaName: SchemaName,
    schemaUpdater: (schema: Get<Tables, SchemaName>) => SchemaUpdate,
  ): Database<Update<Tables, SchemaName, SchemaUpdate>>
  table(
    schemaOrSchemaName: Table | string,
    schemaUpdater?: (schema: any) => Table,
  ): Database<any> {
    return this
  }

  join<
    TableL extends Tables['name'],
    TableR extends Tables['name'],
    ManyL extends boolean = false,
    ManyR extends boolean = false,
    FieldL extends string = ManyR extends true
      ? `${Uncapitalize<TableR>}List`
      : `${Uncapitalize<TableR>}`,
    FieldR extends string = ManyL extends true
      ? `${Uncapitalize<TableL>}List`
      : `${Uncapitalize<TableL>}`,
  >(
    left:
      | TableL
      | {
          table: TableL
          field?: FieldL
          many?: ManyL
          required?: boolean
        },
    right:
      | TableR
      | {
          table: TableR
          field?: FieldR
          many?: ManyR
          required?: boolean
        },
  ): Database<
    UpdateMany<
      Tables,
      [
        [
          TableL,
          TableNS.InsertField<
            Get<Tables, TableL>,
            { name: FieldL; type: 'join'; many: ManyL; with: TableR }
          >,
        ],
        [
          TableR,
          TableNS.InsertField<
            Get<Tables, TableR>,
            { name: FieldR; type: 'join'; many: ManyR; with: TableL }
          >,
        ],
      ]
    >
  > {
    return this
  }

  command<Payload, Response>(name: string) {}
  event<Payload>(name: string) {}
  query<Response, Payload>(name: string) {}

  build(): {
    [SchemaName in Tables['name']]: TableNS.Entity<
      Tables,
      Get<Tables, SchemaName>
    >
  } {
    return {}
  }
}

const { Inventory, Product } = new Database()
  // some comment
  .table(new Table('Inventory').field('a', 'number'))
  .table(new Table('Product').field('b', 'string'))

  // some comment
  .minor('inventory')
  .join({ table: 'Inventory', many: true }, 'Product')

  .build()
