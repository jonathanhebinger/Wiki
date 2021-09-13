import { TemplateData } from '@brainote/common'
import { Icon } from '@brainote/ui/forms'
import { BlockAction } from '@brainote/ui/structure'
import { Title } from '@brainote/ui/typo'
import {
  faEye,
  faEyeSlash,
  faTimes,
  faTrash,
} from '@fortawesome/free-solid-svg-icons'
import { useState } from 'react'

import { DataItem } from '../../data'
import { useNavActions, useNodesActions } from '../../main'
import { useNode } from '../node.context'

export function NodeInfos() {
  const nodesActions = useNodesActions()
  const navActions = useNavActions()

  const { data, template, showData, handleToggleData } = useNode()
  const [draft, draft$set] = useState(data as Partial<TemplateData>)

  function handleDraftUpdate(patch: Partial<TemplateData>) {
    draft$set(patch)
  }
  function handleSavedUpdate(patch: Partial<TemplateData>) {
    nodesActions.templateData_update({
      template_id: template.id,
      data_id: data.id,
      patch,
    })
  }

  function handleClose() {
    navActions.close_templateData({
      template_id: template.id,
      data_id: data.id,
    })
  }
  const actions: BlockAction[] = [
    {
      Label: <Icon icon={showData ? faEyeSlash : faEye} />,
      handler: handleToggleData,
    },
    { Label: <Icon icon={faTrash} />, handler: handleClose },
    { Label: <Icon icon={faTimes} />, handler: handleClose },
  ]

  return (
    <DataItem
      Label={
        <Title underline={false} uppercase>
          {template.name} -- {data?.name}
        </Title>
      }
      type={{ type: 'object', keys: template.keys }}
      draft={draft}
      saved={data}
      onDraftUpdate={handleDraftUpdate}
      onSavedUpdate={handleSavedUpdate}
      actions={actions}
    />
  )
}
