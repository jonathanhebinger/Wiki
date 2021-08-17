import { Data, Type } from '@brainote/common'

export const TypeUtil = {
  Root: {
    reflect(type: Type.Object, data: { [index: string]: Data }) {
      return new Map(
        type.entries.map(([key, type]) => {
          return [key, TypeUtil.Any.reflect(new Set(), type, data[key])]
        }),
      )
    },
  },
  Any: {
    reflect(reflect: Set<string>, type: Type.Any, data: Data) {
      switch (type.type) {
        case 'array':
          TypeUtil.Array.reflect(reflect, type, data as any)
          break
        case 'object':
          TypeUtil.Object.reflect(reflect, type, data as any)
          break
        case 'link':
          TypeUtil.Link.reflect(reflect, type, data as any)
          break
      }

      return reflect
    },
  },
  Array: {
    reflect(reflect: Set<string>, type: Type.Array, data: Data[]) {
      return data.map(item => {
        return TypeUtil.Any.reflect(reflect, type.of, item)
      })
    },
  },
  Object: {
    reflect(
      reflect: Set<string>,
      type: Type.Object,
      data: { [index: string]: Data },
    ) {
      return type.entries.map(([key, type]) => {
        return TypeUtil.Any.reflect(reflect, type, data[key])
      })
    },
  },
  Link: {
    reflect(reflect: Set<string>, type: Type.Link, data: undefined | string) {
      if (!type.reflect) return
      if (data === undefined) return

      reflect.add(data)
    },
  },
}
