import './App.scss'

import { Container, Grid } from '@material-ui/core'
import React from 'react'
import { Provider } from 'react-redux'
import { Modal, ModalProvider } from 'src/blocs'
import { Navigator, NotesOpened } from 'src/components'
import { store } from 'src/state'

const App: React.FC = () => {
  return (
    <Provider store={store}>
      <ModalProvider>
        <Container maxWidth="md">
          <Grid container spacing={2}>
            <Grid item xs={3}>
              <Navigator />
            </Grid>
            <Grid item xs={9}>
              <NotesOpened />
            </Grid>
          </Grid>
        </Container>
        <Modal />
      </ModalProvider>
    </Provider>
  )
}

export default App
