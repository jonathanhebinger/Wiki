import React from 'react'
import { Button } from 'src/blocs/button'
import { Section } from 'src/blocs/structure/section'
import { Shelf } from 'src/blocs/structure/shelf'
import { DataItem } from 'src/features/data'
import { Type } from 'src/types/type'

import { useTemplate } from '../templates.context'

const KEY_TYPE: Type.Object = {
  type: 'object',
  keys: [
    { id: 'name', name: 'name', type: { type: 'string' } },
    { id: 'type', name: 'type', type: { type: 'type' } },
    { id: 'required', name: 'required', type: { type: 'boolean' } },
  ],
}

export function TemplateKeys() {
  const { keys, keys$create } = useTemplate()

  const Keys = keys.map(key => {
    return <TemplateKey key={key.id} saved={key}/>
  })

  return (
    <Section Label={<>Keys - {keys.length}</>}>
      <Shelf noPadding>
        {Keys}
        <Button className="p-1" onClick={keys$create} contrast>
          Add Item
        </Button>
      </Shelf>
    </Section>
  )
}

export function TemplateKey({ saved }: { saved: TemplateKey }) {
  const { keys$update } = useTemplate()

  const [draft, draft$set] = useState(saved)

  const modified = JSON.stringify(saved) !== JSON.stringify(draft)

  function handleChange(key: TemplateKey) {
    draft$set(key)
  }

  function handleSave() {
    keys$update(item.typeNode.id, draft)
  }

  const Label = (
    <div className="flex justify-between">
      <div>{key.name}</div>
      {modified && <ButtonIcon icon={faSave} onClick={handleSave} />}
    </div>
  )

  return (
    <DataItem
      Label={Label}
      draft={draft}
      saved={saved}
      type={KEY_TYPE}
      onChange={handleChange}
    />
  )
}