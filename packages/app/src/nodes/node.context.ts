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

    const [showData, showData$set] = useState(true)

    function handleToggleData() {
      showData$set(!showData)
    }

    return {
      data,
      template,
      showData,
      handleToggleData,
    }
  },
)
