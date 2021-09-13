import React, { useMemo, useState } from 'react'

import { useDataContext } from '../data.context'
import { DataArray } from './data.array'
import { DataObject } from './data.object'

export function DataBlock() {
  const { type } = useDataContext()

  switch (type.type) {
    case 'array':
      return <DataArray />
    case 'object':
      return <DataObject />
  }

  return null
}
