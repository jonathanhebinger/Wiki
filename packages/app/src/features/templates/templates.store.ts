import { thunk } from 'easy-peasy'
import { crudRepository } from 'src/repository'
import { Template, TemplateData, TemplateKey } from 'src/types/template'
import { v4 } from 'uuid'

import { Data$get_default } from '../data/data.default'
import { TemplatesModel } from './templates.model'

export const templates_model: TemplatesModel = {
  ...crudRepository({}),

  $create: thunk((actions, name) => {
    const template: Template = {
      id: v4(),
      name,
      info: '',
      keys: [],
      data: [],
      computed: {
        name: '',
      },
    }

    actions.crud.addOne(template)

    return template
  }),
  $update: thunk((actions, { id, ...patch }) => {
    actions.crud.updateOne({ id, patch })
  }),
  $delete: thunk((actions, template_id) => {
    actions.crud.removeOne(template_id)
  }),

  data$create: thunk((actions, { templateId: template_id }) => {
    const data: TemplateData = { id: v4() }

    actions.crud.updateOne({
      id: template_id,
      patch(template) {
        template.keys.forEach(key => {
          if (!key.required) return

          data[key.id] = Data$get_default(key.type)
        })

        template.data.push(data)
      },
    })

    return data
  }),
  data$update: thunk((actions, { template_id, data }) => {
    actions.crud.updateOne({
      id: template_id,
      patch(template) {
        template.data = template.data.map(item => {
          return item.id === data.id ? data : item
        })
      },
    })

    return data
  }),
  data$delete: thunk((actions, { template_id, data_id }) => {
    actions.crud.updateOne({
      id: template_id,
      patch(template) {
        template.data = template.data.filter(item => {
          return item.id !== data_id
        })
      },
    })
  }),

  keys$create: thunk((actions, { template_id }) => {
    const key: TemplateKey = {
      id: v4(),
      info: '',
      name: 'New Key',
      required: true,
      type: {
        type: 'string',
      },
    }

    actions.crud.updateOne({
      id: template_id,
      patch(template) {
        template.keys.push(key)
      },
    })

    return key
  }),
  keys$update: thunk((actions, { template_id, key }) => {
    actions.crud.updateOne({
      id: template_id,
      patch(template) {
        template.keys = template.keys.map(item => {
          return item.id === key.id ? key : item
        })
      },
    })

    return key
  }),
  keys$delete: thunk((actions, { template_id, key_id }) => {
    actions.crud.updateOne({
      id: template_id,
      patch(template) {
        template.keys = template.keys.filter(item => {
          return item.id !== key_id
        })
      },
    })
  }),
}
