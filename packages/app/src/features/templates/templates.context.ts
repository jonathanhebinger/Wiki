import constate from 'constate'
import { useStoreActions, useStoreState } from 'src/features/root/root.store'
import { Template, TemplateId } from 'src/types/template'

export const [TemplateProvider, useTemplate] = constate(
  ({ templateId }: { templateId: TemplateId }) => {
    const template = useStoreState(state => state.templates.dictionnary)[
      templateId
    ]

    if (!template) throw new Error()

    const actions = useStoreActions(actions => actions.templates)

    function $update(template: Template) {
      actions.$update(template)
    }

    return { ...template }
  },
)

export interface TemplateDataKey {
  typeTemplate: Template
  type: any
  data: any
}
