import { Key, Template, TemplateId } from '@brainote/common'
import constate from 'constate'

import { useNodesContext } from '../nodes/nodes.system'

export const [TemplateProvider, useTemplate] = constate(
  ({ templateId: template_id }: { templateId: TemplateId }) => {
    const [nodes, actions] = useNodesContext()

    const template = nodes.template(template_id)

    const { id, name, info, data } = template

    function name$update(name: string) {
      actions.update(id, { name })
    }
    function info$update(info: string) {
      actions.update(id, { info })
    }
    function keys$update(key: Key) {
      actions.update(key.id, key)
    }
    function keys$create() {
      const key = actions.create(name)

      actions.attach(key.id, 'key')

      actions.update(id, template => {
        ;(template as Template).data['template.keys'].push(key.id)
      })
    }

    const keys = data['template.keys'].map(nodes.key)

    return {
      id,
      name,
      info,
      keys,
      name$update,
      info$update,
      keys$update,
      keys$create,
    }
  },
)

export interface TemplateDataKey {
  typeTemplate: Template
  type: any
  data: any
}
