import { Key, Type } from '@brainote/common'
import { useState } from 'react'
import { Button } from 'src/blocs/button'
import { Section } from 'src/blocs/structure/section'
import { Shelf } from 'src/blocs/structure/shelf'
import { DataItem } from 'src/features/data'

import { useTemplate } from '../templates.context'

const KEY_TYPE: Type.Object = {
  type: 'object',
  keys: [
    {
      id: 'key.required',
      name: 'key.required',
      type: { type: 'boolean' },
    },
    {
      id: 'key.type',
      name: 'key.type',
      type: { type: 'type' },
    },
  ],
}

export function TemplateKeys() {
  const { keys, keys$create } = useTemplate()

  const Keys = keys.map(key => {
    return <TemplateKeyE key={key.id} saved={key} />
  })

  return (
    <Section Label={<>Keys - {keys.length}</>}>
      <Shelf noPadding>
        {Keys}
        <Button className="p-1" onClick={keys$create} contrast>
          Add Key
        </Button>
      </Shelf>
    </Section>
  )
}

export function TemplateKeyE({ saved }: { saved: Key }) {
  const { keys$update } = useTemplate()

  const [draft, draft$set] = useState(saved.data)

  return (
    <DataItem
      Label={<>{saved.name}</>}
      draft={draft}
      saved={saved.data}
      type={KEY_TYPE}
      onChange={draft$set}
      onSave={keys$update}
    />
  )
}
