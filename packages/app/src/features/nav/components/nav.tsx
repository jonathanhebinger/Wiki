import { Shelf } from 'src/blocs/structure/shelf'
import { Surface } from 'src/blocs/structure/surface'

import { NavActions } from './nav.actions'
import { NavNodes } from './nav.nodes'
import { NavOpened } from './nav.opened'
import { NavSearch } from './nav.search'
import { NavTemplates } from './nav.templates'

export function Nav() {
  return (
    <Surface>
      <Shelf>
        <NavActions />
        <NavSearch />
        <NavOpened />
        <NavNodes />
        <NavTemplates />
      </Shelf>
    </Surface>
  )
}
