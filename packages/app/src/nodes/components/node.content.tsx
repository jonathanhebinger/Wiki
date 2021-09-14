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
import { useMainActions, useNavActions } from '../../main'
import { useNode } from '../node.context'

export function NodeInfos() {
  const nodesActions = useMainActions()
  const navActions = useNavActions()

  const { data, template, showReadonly, handleToggleReadonly } = useNode()
  const [draft, draft$set] = useState(data as Partial<TemplateData>)

  function handleDraftUpdate(patch: Partial<TemplateData>) {
    draft$set(patch)
  }
  function handleSavedUpdate(patch: Partial<TemplateData>) {
    nodesActions.dataUpdate({
      templateId: template.id,
      dataId: data.id,
      patch,
    })
  }

  function handleClose() {
    navActions.close({
      templateId: template.id,
      dataId: data.id,
    })
  }
  const actions: BlockAction[] = [
    {
      Label: <Icon icon={showReadonly ? faEyeSlash : faEye} />,
      handler: handleToggleReadonly,
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
