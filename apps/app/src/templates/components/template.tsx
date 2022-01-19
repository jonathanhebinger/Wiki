import { TemplateId, Type } from '@brainote/domain'
import { Icon } from '@brainote/ui/src/components/forms'
import { Block, BlockAction } from '@brainote/ui/src/components/structure'
import { Title } from '@brainote/ui/src/components/typo'
import { faPlus, faTimes, faTrash } from '@fortawesome/free-solid-svg-icons'
import React, { useState } from 'react'

import { DataContextProvider } from '../../data'
import { DataTypeObject } from '../../data/components/type/data.type.object'
import { useMain, useMainActions, useNavActions } from '../../main'
import { selectTemplate } from '../../main/state/main.selector'

export type TemplateMainProps = {
  templateId: TemplateId
}
export function TemplateMain({ templateId }: TemplateMainProps) {
  const template = useMain(selectTemplate(templateId))

  const mainActions = useMainActions()
  const navActions = useNavActions()

  const [draft, draft$set] = useState(template)

  function handleDraftUpdate([, template]: Type.Object) {
    draft$set(template)
  }
  function handleSavedUpdate([, template]: Type.Object) {
    mainActions.templateUpdate({ templateId, template })
  }

  function handleCreate() {
    mainActions.templateDataCreate({ templateId })
  }
  function handleClose() {
    navActions.close({
      type: 'template',
      templateId,
    })
  }
  const actions: BlockAction[] = [
    { Label: <Icon icon={faPlus} />, handler: handleCreate },
    { Label: <Icon icon={faTrash} />, handler: handleClose },
    { Label: <Icon icon={faTimes} />, handler: handleClose },
  ]

  const Content = (
    <DataContextProvider
      Label={templateId}
      type={['type', {}]}
      saved={['object', template]}
      draft={['object', draft]}
      onDraftUpdate={handleDraftUpdate as any}
      onSavedUpdate={handleSavedUpdate as any}
    >
      <DataTypeObject />
    </DataContextProvider>
  )

  return (
    <Block
      Label={
        <Title uppercase underline={false}>
          {'Template -- ' + template.name}
        </Title>
      }
      actions={actions}
      Content={Content}
    />
  )
}
