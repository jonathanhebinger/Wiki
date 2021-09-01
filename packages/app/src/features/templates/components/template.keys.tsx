import React from 'react'
import { Button } from 'src/blocs/button'
import { Section } from 'src/blocs/structure/section'
import { Shelf } from 'src/blocs/structure/shelf'
import { DataE } from 'src/features/data'
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
  const { keys, keys$update, keys$create } = useTemplate()

  const Keys = keys.map(key => {
    return (
      <DataE
        key={key.id}
        Label={<>{key.name}</>}
        draft={key}
        saved={key}
        type={KEY_TYPE}
        onChange={keys$update}
      ></DataE>
    )
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
