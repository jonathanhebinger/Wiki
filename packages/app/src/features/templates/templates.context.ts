import constate from 'constate'
import { Template, TemplateId, TemplateKey } from 'src/types/template'

import { useTemplatesContext } from './templates.store'

export const [TemplateProvider, useTemplate] = constate(
  ({ templateId: template_id }: { templateId: TemplateId }) => {
    const [templates, actions] = useTemplatesContext()

    const template = templates.list.find(
      template => template.id === template_id,
    )

    if (!template) throw new Error()

    const { id, name, info } = template

    function name$update(name: string) {
      actions.update(id, { name, info })
    }
    function info$update(info: string) {
      actions.update(id, { name, info })
    }
    function keys$update(key: TemplateKey) {
      actions.keys_update(template_id, key.id, key)
    }
    function keys$create() {
      actions.keys_create(template_id)
    }

    return { ...template, name$update, info$update, keys$update, keys$create }
  },
)

export interface TemplateDataKey {
  typeTemplate: Template
  type: any
  data: any
}
