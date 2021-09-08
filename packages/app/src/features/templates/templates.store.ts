import { createSystemContext } from 'src/bang/hooks/system'
import {
  Template,
  TemplateData,
  TemplateDataId,
  TemplateId,
  TemplateKey,
  TemplateKeyId,
} from 'src/types/template'
import { v4 } from 'uuid'

import { Data$get_default } from '../data/data.default'

export const [TemplatesContextProvider, useTemplatesContext] =
  createSystemContext(() => ({
    list: [] as Template[],

    get map(): { [k: string]: Template } {
      console.log(this.list)
      return Object.fromEntries(this.list.map(item => [item.id, item]))
    },

    create(name: string) {
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

      this.list.push(template)

      return template
    },
    update(
      id: TemplateId,
      patch: Partial<Template> | ((template: Template) => void),
    ) {
      this.list.forEach(template => {
        if (template.id !== id) return

        if (typeof patch === 'function') {
          patch(template)
        } else {
          Object.assign(template, patch)
        }
      })
    },
    delete(id: TemplateId) {
      this.list = this.list.filter(template => template.id !== id)
    },

    data_create(id: TemplateId) {
      const data: TemplateData = { id: v4() }

      this.update(id, template => {
        template.keys.forEach(key => {
          if (!key.required) return

          data[key.id] = Data$get_default(key.type)
        })

        template.data.push(data)
      })

      return data
    },
    data_update(
      template_id: TemplateId,
      data_id: TemplateDataId,
      patch: Partial<TemplateData> | ((key: TemplateData) => void),
    ) {
      this.update(template_id, template => {
        template.data.forEach(data => {
          if (data.id !== data_id) return

          Object.assign(data, patch)
        })
      })
    },
    data_delete(template_id: TemplateId, data_id: TemplateDataId) {
      this.update(template_id, template => {
        template.data = template.data.filter(data => data.id !== data_id)
      })
    },

    keys_create(id: TemplateId) {
      const key: TemplateKey = {
        id: v4(),
        info: '',
        name: 'New Key',
        required: true,
        type: {
          type: 'string',
        },
      }

      this.update(id, template => {
        template.keys.push(key)
      })

      return key
    },
    keys_update(
      template_id: TemplateId,
      key_id: TemplateKeyId,
      patch: Partial<TemplateKey> | ((key: TemplateKey) => void),
    ) {
      this.update(template_id, template => {
        template.keys.forEach(key => {
          if (key.id !== key_id) return

          Object.assign(key, patch)
        })
      })
    },
    keys_delete(template_id: TemplateId, key_id: TemplateKeyId) {
      this.update(template_id, template => {
        template.keys = template.keys.filter(key => key.id !== key_id)
      })
    },
  }))
