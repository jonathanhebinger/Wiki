import { Type } from '@brainote/common'
import { useState } from 'react'
import { Section } from 'src/blocs/structure/section'
import { Shelf } from 'src/blocs/structure/shelf'
import { DataItem } from 'src/features/data'

import { useTemplate } from '../templates.context'

const KEY_TYPE: Type.Object = {
  type: 'object',
  keys: [
    { id: 'name', name: 'name', type: { type: 'string' } },
    { id: 'type', name: 'type', type: { type: 'type' } },
    { id: 'required', name: 'required', type: { type: 'boolean' } },
  ],
}

export function TemplateInfos() {
  return (
    <Section Label={<>Info</>}>
      <Shelf noPadding>
        <TemplateName />
        <TemplateInfo />
      </Shelf>
    </Section>
  )
}

export function TemplateName() {
  const { name, name$update } = useTemplate()

  const [draft, draft$set] = useState(name)

  return (
    <DataItem
      Label={<>Name</>}
      draft={draft}
      saved={name}
      type={{ type: 'string' }}
      onChange={draft$set}
      onSave={name$update}
    />
  )
}

export function TemplateInfo() {
  const { info, info$update } = useTemplate()

  const [draft, draft$set] = useState(info)

  return (
    <DataItem
      Label={<>About</>}
      draft={draft}
      saved={info}
      type={{ type: 'string' }}
      onChange={draft$set}
      onSave={info$update}
    />
  )
}
