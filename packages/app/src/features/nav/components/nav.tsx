import { Button, Card, CardContent, Divider } from '@material-ui/core'

import { NavContextProvider, useNavContext } from '../context'
import { MenuNodeListFavorite } from './nav.node.list.favorite'
import { MenuNodeListOpened } from './nav.node.list.opened'
import { MenuNodeListRecent } from './nav.node.list.recent'
import { NavNodeSearch } from './nav.node.search'

export function Nav() {
  return (
    <NavContextProvider>
      <Card className="w-1/4">
        <CardContent>
          <NavActions />
        </CardContent>
        <Divider />
        <MenuNodeListOpened />
        <Divider />
        <MenuNodeListFavorite />
        <Divider />
        <MenuNodeListRecent />
      </Card>
    </NavContextProvider>
  )
}

export function NavActions() {
  const { add } = useNavContext()

  return (
    <div className="space-y-2">
      <Button fullWidth variant="outlined" onClick={add}>
        Create
      </Button>
      <NavNodeSearch />
    </div>
  )
}
