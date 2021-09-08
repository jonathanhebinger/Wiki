import { faSave } from '@fortawesome/free-solid-svg-icons'
import React, { useState } from 'react'
import { Icon } from 'src/blocs/icon'
import { Block } from 'src/blocs/structure/block'
import { DataObject } from 'src/features/data/components/data.object'
import { DataContextProvider } from 'src/features/data/data.context'
import { Template, TemplateData } from 'src/types/template'

import { useTemplatesContext } from '../templates.store'

export function TemplateDataMain({
  template,
  data,
}: {
  template: Template
  data: TemplateData
}) {
  const [, templatesActions] = useTemplatesContext()

  const [draft, draft$set] = useState(data)

  function handleChange(data: TemplateData) {
    draft$set(data)
  }

  function handleSave() {
    templatesActions.data_update(template.id, data.id, data)
  }

  const modified = JSON.stringify(data) !== JSON.stringify(draft)

  const actions = modified
    ? [{ Label: <Icon icon={faSave} />, handler: handleSave }]
    : []

  return (
    <DataContextProvider
      draft={draft}
      saved={data}
      onChange={handleChange as any}
      type={{ type: 'object', keys: template.keys }}
    >
      <Block
        Label={<>{template.name}</>}
        Content={<DataObject />}
        actions={actions}
      />
    </DataContextProvider>
  )
}
