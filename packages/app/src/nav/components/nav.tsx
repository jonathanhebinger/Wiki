import { Shelf, Surface } from '@brainote/ui/structure'

import { NavCreate } from './nav.create'
import { NavOpened } from './nav.opened'
import { NavSearch } from './nav.search'

export function Nav() {
  return (
    <Surface>
      <Shelf>
        <NavCreate />
        <NavSearch />
        <NavOpened />
      </Shelf>
    </Surface>
  )
}
