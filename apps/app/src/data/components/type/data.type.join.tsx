import { Type } from '@brainote/domain'
import { Select } from '@brainote/ui/src/components/forms'
import { Block, Shelf } from '@brainote/ui/src/components/structure'
import React, { useEffect, useMemo } from 'react'

import { useDataContext } from '../..'
import { useMain } from '../../../main'
import { selectTemplate } from '../../../main/state/main.selector'
import { useTemplateSelect } from '../../../templates'

export function DataTypeJoin() {
  const { draft, handleDraftChange } = useDataContext<Type.Type, Type.Join>()

  const { Select: SelectTemplate, selected: templateId } = useTemplateSelect()

  const template = useMain(selectTemplate(templateId))

  const nameSelectOptions = template.keys
    .filter(([keyId, key]) => {
      return key.type[0] === 'join'
    })
    .map(([keyId, key]) => ({
      id: keyId,
      label: key.name,
    }))

  nameSelectOptions.unshift({ id: '', label: '' })

  const KeySelect = (
    <Select
      options={nameSelectOptions}
      onSelect={on => {
        handleDraftChange([draft[0], { ...draft[1], templateId, on }])
      }}
      value={draft[1].on}
    />
  )

  return (
    <>
      <Block
        Label="Template"
        Inline={SelectTemplate}
        Content={<Shelf>{SelectTemplate}</Shelf>}
      />
      <Block
        Label="Key"
        Inline={KeySelect}
        Content={<Shelf>{KeySelect}</Shelf>}
      />
    </>
  )
}
