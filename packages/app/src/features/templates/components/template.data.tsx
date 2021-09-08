import { faSave } from '@fortawesome/free-solid-svg-icons'
import React, { useState } from 'react'
import { Icon } from 'src/blocs/icon'
import { Block } from 'src/blocs/structure/block'
import { DataObject } from 'src/features/data/components/data.object'
import { DataContextProvider } from 'src/features/data/data.context'
import { useStoreActions } from 'src/features/root/root.store'
import { Template, TemplateData } from 'src/types/template'

export function TemplateDataMain({
  template,
  data,
}: {
  template: Template
  data: TemplateData
}) {
  const { data$update } = useStoreActions().templates

  const [draft, draft$set] = useState(data)

  function handleChange(data: TemplateData) {
    draft$set(data)
  }

  function handleSave() {
    data$update({ template_id: template.id, data })
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
