import { Action, action, Computed, computed } from 'easy-peasy'

type EntityId = number | string

export type Dictionnary<T> = Record<EntityId, T | undefined>

interface Updater<T, Id> {
  id: Id
  patch: Patcher<T>
}
type Patcher<T> =
  | (T extends Function ? never : T extends object ? PatcherObject<T> : T)
  | ((state: T) => T | void)
type PatcherObject<T> = {
  [Key in keyof T]?: Patcher<T[Key]>
}
function update<T, Id extends EntityId>(
  data: Dictionnary<T>,
  updater: Updater<T, Id>,
) {
  const entity = data[updater.id]

  if (!entity) return

  data[updater.id] = patch<T>(entity as T, updater.patch)
}
function patch<T>(item: T, patcher: Patcher<T>): T {
  if (typeof patcher === 'function') {
    return (patcher as (value: T) => T)(item) ?? item
  } else if (typeof patcher === 'object') {
    const object = item as any

    Object.entries(patcher).forEach(([key, patcher]) => {
      Reflect.set(object, key, patch(object[key], patcher))
    })
    return item
  } else {
    return patcher as T
  }
}

type DefaultId<T> = T extends {
  id: infer TID
}
  ? TID extends EntityId
    ? TID
    : EntityId
  : EntityId

export interface RepositoryCRUD<T, Id extends EntityId = DefaultId<T>> {
  data: Record<EntityId, T | undefined>

  addOne: Action<this, T>
  addMany: Action<this, T[]>

  setOne: Action<this, T>
  setMany: Action<this, T[]>
  setAll: Action<this, T[]>

  updateOne: Action<this, Updater<T, Id>>
  updateMany: Action<this, Updater<T, Id>[]>

  removeOne: Action<this, Id>
  removeMany: Action<this, Id[]>
  removeAll: Action<this>
}

export interface CrudRepository<T, Id extends EntityId = DefaultId<T>> {
  dictionnary: Computed<this, Dictionnary<T>>
  ids: Computed<this, Id[]>
  entities: Computed<this, T[]>

  crud: RepositoryCRUD<T, Id>
}

export type CrudRepositoryConfig<T, Id extends EntityId = EntityId> = {
  initialState?: T[] | Record<EntityId, T>
} & (T extends { id: Id }
  ? { indexer?: (entity: T) => Id }
  : { indexer: (entity: T) => Id })

export function crudRepository<
  T extends object,
  Id extends EntityId = DefaultId<T>,
>(config: CrudRepositoryConfig<T, Id>): CrudRepository<T, Id> {
  const { initialState = [], indexer = item => Reflect.get(item, 'id') } =
    config || ({} as CrudRepositoryConfig<T, Id>)

  const data = Array.isArray(initialState)
    ? Object.fromEntries(initialState.map(entity => [indexer(entity), entity]))
    : initialState

  const STAMP = Symbol()
  let stampValue = 0
  function stamp(item: T): T {
    return STAMP in item ? item : Object.assign(item, { [STAMP]: stampValue++ })
  }

  return {
    dictionnary: computed(state => {
      return state.crud.data
    }),
    ids: computed(state => {
      return Object.keys(state.crud.data) as Id[]
    }),
    entities: computed(state => {
      return (
        Object.values(state.crud.data) as (T & {
          [STAMP]: number
        })[]
      ).sort((a, b) => a[STAMP] - b[STAMP])
    }),

    crud: {
      data,

      addOne: action((state, entity) => {
        if (!state.data[indexer(entity)]) {
          state.data[indexer(entity)] = stamp(entity)
        }
      }),
      addMany: action((state, entities) => {
        entities.forEach(entity => {
          if (!state.data[indexer(entity)]) {
            state.data[indexer(entity)] = stamp(entity)
          }
        })
      }),

      setOne: action((state, entity) => {
        state.data[indexer(entity)] = stamp(entity)
      }),
      setMany: action((state, entities) => {
        entities.forEach(entity => {
          state.data[indexer(entity)] = stamp(entity)
        })
      }),
      setAll: action((state, entities) => {
        state.data = Object.fromEntries(
          entities.map(entity => [indexer(entity), stamp(entity)]),
        )
      }),

      updateOne: action((state, updater) => {
        update(state.data, updater)
      }),
      updateMany: action((state, updaters) => {
        updaters.forEach(updater => {
          update(state.data, updater)
        })
      }),

      removeOne: action((state, id) => {
        delete state.data[id]
      }),
      removeMany: action((state, ids) => {
        ids.forEach(id => {
          delete state.data[id]
        })
      }),
      removeAll: action(state => {
        Object.keys(state).forEach(id => {
          delete state.data[id]
        })
      }),
    },
  }
}
