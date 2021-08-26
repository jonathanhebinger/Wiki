import { Shelf } from 'src/blocs/structure/shelf'
import { Surface } from 'src/blocs/structure/surface'
import { NavActions } from 'src/features/nav/components/nav.actions'
import { NavOpened } from 'src/features/nav/components/nav.opened'
import { NavRecent } from 'src/features/nav/components/nav.recent'
import { NavSearch } from 'src/features/nav/components/nav.search'

export function Nav() {
  return (
    <Surface>
      <Shelf>
        <NavActions />
        <NavSearch />
        <NavRecent />
        <NavOpened />
      </Shelf>
    </Surface>
  )
}
