import { thunk } from 'easy-peasy'
import { crudRepository } from 'src/repository'
import { Template, TemplateData } from 'src/types/template'
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
  $update: thunk((actions, template) => {
    actions.crud.setOne(template)

    return template
  }),
  $delete: thunk((actions, template_id) => {
    actions.crud.removeOne(template_id)
  }),

  data$create: thunk((actions, { template_id }) => {
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
}
