import { v4 } from 'uuid'

import { Data$get_default } from './features/data/data.default'

export type Id<Key extends string> = string & { key?: Key }

export type NodeId = Id<'node'>
export type Node = {
  id: NodeId
  name: string
  info: any
}

export namespace Type {
  export type Base<Type extends string> = { type: Type }

  export type Type = Base<'type'>

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

  export type Node = Base<'node'>

  export type Join = Base<'join'> & {
    template: TemplateId
    reflect?: TemplateKeyId
  }

  export type Any = Type | Boolean | Number | String | Array | Object | Node
}

export type Data = Data.Any
export namespace Data {
  export type Array = Any[]
  export type Object = { [index: string]: Any }
  export type Any =
    | undefined
    | boolean
    | number
    | string
    | Array
    | Object
    | Node['id']
    | Type.Any
}

export namespace Filter {
  export type Array = {
    type: 'match-none' | 'match-some' | 'match-every'
    matcher: any
  }

  export type Object = {
    type: 'match-none' | 'match-some' | 'match-every'
    matcher: any
  }

  export type NumberBase = {
    type: 'sup' | 'sup-strict' | 'inf' | 'inf-strict' | 'equal' | 'diff'
    to: number
  }
  export type NumberRange = {
    type: 'between' | 'outside'
    range: [number, number]
  }
  export type Number = NumberBase | NumberRange

  export type Boolean = boolean

  export type Logic =
    | { type: 'or' | 'and'; filters: any[] }
    | { type: 'not'; filter: any }
}

type TemplateKeyId = Id<'template-key'>
type TemplateKey = {
  id: TemplateKeyId
  name: string
  info: string
  type: Type.Any
  required: boolean
}

type TemplateDataId = Id<'template-data'>
type TemplateData = {
  id: TemplateDataId
  info: string
  keys: {
    [index: string]: Data.Any
  }
}

type TemplateId = Id<'template'>
type Template = {
  id: TemplateId
  name: string
  info: string
  keys: TemplateKey[]
  data: TemplateData[]
  computed: {
    name: TemplateKeyId
  }
}

const TEMPLATES = new Map<TemplateId, Template>()
const APP = {
  template: {
    select(template_id: TemplateId): Template {
      return TEMPLATES.get(template_id) as Template
    },
    create(name: string): Template {
      const id = v4()
      const template: Template = {
        id,
        name,
        info: '',
        keys: [],
        data: [],
        computed: {
          name: '',
        },
      }

      TEMPLATES.set(id, template)

      return template
    },
    update(template: Template): Template {
      TEMPLATES.set(template.id, template)

      return template
    },
    delete(template_id: TemplateId): void {
      TEMPLATES.delete(template_id)
    },
    data: {
      select(template_id: TemplateId, data_id: TemplateDataId): TemplateData {
        const template = APP.template.select(template_id)

        return template.data.find(data => data.id === data_id) as TemplateData
      },
      create(template_id: TemplateId): TemplateData {
        const template = APP.template.select(template_id)

        const id = v4()
        const data: TemplateData = {
          id,
          info: '',
          keys: {},
        }

        template.keys.map(key => {
          if (!key.required) return

          data.keys[key.id] = Data$get_default(key.type)
        })

        template.data.push(data)

        APP.template.update(template)

        return data
      },
      update(template_id: TemplateId, data: TemplateData): TemplateData {
        const template = APP.template.select(template_id)

        template.data = template.data.map(template_data => {
          if (template_data.id === data.id) return data

          return template_data
        })

        APP.template.update(template)

        return data
      },
      delete(template_id: TemplateId, data_id: TemplateDataId): void {
        const template = APP.template.select(template_id)

        template.data = template.data.filter(template_data => {
          return template_data.id !== data_id
        })

        APP.template.update(template)
      },
    },
    key: {
      create(template_id: TemplateId, name: string): TemplateKey {
        const id = v4()
        const key: TemplateKey = {
          id,
          name,
          info: '',
          required: true,
          type: { type: 'string' },
        }

        const template = APP.template.select(template_id)

        template.keys.push(key)

        APP.template.update(template)

        return key
      },
      update(template_id: TemplateId, key: TemplateKey): TemplateKey {
        const template = APP.template.select(template_id)

        template.keys = template.keys.map(template_key => {
          if (template_key.id === key.id) return key

          return template_key
        })

        APP.template.update(template)

        return key
      },
      delete(template_id: TemplateId, key_id: TemplateKeyId): void {
        const template = APP.template.select(template_id)

        template.keys = template.keys.filter(template_key => {
          return template_key.id !== key_id
        })

        APP.template.update(template)
      },
    },
  },
}
