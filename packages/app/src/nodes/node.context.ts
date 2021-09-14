import {
  Template,
  TemplateData,
  TemplateDataId,
  TemplateId,
} from '@brainote/common'
import constate from 'constate'
import { useState } from 'react'

import { useMain } from '../main'

export interface NodeTemplate {
  template: Template
  templateData: TemplateData
}

export const [NodeProvider, useNode] = constate(
  ({
    templateId,
    dataId,
  }: {
    templateId: TemplateId
    dataId: TemplateDataId
  }) => {
    const nodes = useMain()

    const template = nodes.template(templateId)
    const data = nodes.data(templateId, dataId)

    const [showReadonly, showReadonly$set] = useState(false)

    function handleToggleReadonly() {
      showReadonly$set(!showReadonly)
    }

    return {
      data,
      template,
      showReadonly,
      handleToggleReadonly,
    }
  },
)
