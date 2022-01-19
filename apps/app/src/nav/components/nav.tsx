import { Shelf, Surface } from '@brainote/ui/src/components/structure'
import React from 'react'

import { NavCreate } from './nav.create'
import { NavOpened } from './nav.opened'
import { NavSearch } from './nav.search'
import { NavTemplates } from './nav.templates'

export function Nav() {
  return (
    <Surface squared>
      <Shelf>
        <NavCreate />
        <NavSearch />
        <NavTemplates />
        <NavOpened />
      </Shelf>
    </Surface>
  )
}
