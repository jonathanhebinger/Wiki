import React, { useMemo, useState } from 'react'

import { useDataContext } from '../data.context'
import { DataArray } from './data.array'
import { DataObject } from './data.object'

export function DataBlock() {
  const { typeName } = useDataContext()

  switch (typeName) {
    case 'list':
      return <DataArray />
    case 'object':
      return <DataObject />
  }

  return null
}
