import constate from 'constate'
import { useStoreActions, useStoreState } from 'src/features/root/root.store'
import { Template, TemplateId, TemplateKey } from 'src/types/template'

export const [TemplateProvider, useTemplate] = constate(
  ({ templateId: template_id }: { templateId: TemplateId }) => {
    const template = useStoreState(state => state.templates.dictionnary)[
      template_id
    ] as Template

    if (!template) throw new Error()

    const actions = useStoreActions(actions => actions.templates)

    const { id, name, info } = template

    function name$update(name: string) {
      actions.$update({ id, name, info })
    }
    function info$update(info: string) {
      actions.$update({ id, name, info })
    }
    function keys$update(key: TemplateKey) {
      actions.keys$update({ template_id, key })
    }
    function keys$create() {
      actions.keys$create({ template_id })
    }

    return { ...template, name$update, info$update, keys$update, keys$create }
  },
)

export interface TemplateDataKey {
  typeTemplate: Template
  type: any
  data: any
}
