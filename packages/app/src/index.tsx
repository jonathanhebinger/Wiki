import { Dialog, DialogContextProvider } from '@brainote/ui/forms'
import Grid from '@mui/material/Grid'
import { StoreProvider } from 'easy-peasy'
import ReactDOM from 'react-dom'

import { MainList } from './main/components/main.list'
import { store } from './main/root.store'
import { Nav } from './nav/components/nav'


ReactDOM.render( <Root />, document.getElementById( 'root' ) )

function Root() {
  return (
    <StoreProvider store={store}>
      <DialogContextProvider>
        <Dialog />
        <Grid
          container
          spacing={2}
          sx={{
            fontSize: '14px',
            minHeight: '100vh',
          }}
          className="text-gray-500 font-medium bg-blue-100"
        >
          <Grid item xs={3}>
            <Nav />
          </Grid>
          <Grid item xs={9}>
            <MainList />
          </Grid>
        </Grid>
      </DialogContextProvider>
    </StoreProvider>
  )
}
