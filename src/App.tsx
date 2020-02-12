import './App.scss'

import { Container, Grid } from '@material-ui/core'
import React from 'react'
import { Provider } from 'react-redux'
import { Note } from 'src/components/note'
import { store } from 'src/state'
import uuid from 'uuid'

import { NoteProvider } from './providers'

const App: React.FC = () => {
  const note = {
    id: uuid.v4(),
    title: 'New note',
    content: '42',
    creation: Date.now(),
    modification: Date.now(),
  }
  return (
    <Provider store={store}>
      <NoteProvider note={note}>
        <Container maxWidth="md">
          <Grid container spacing={2}>
            <Grid item xs={3}>
              <Note />
            </Grid>
            <Grid item xs={9}>
              <Note />
            </Grid>
          </Grid>
        </Container>
      </NoteProvider>
    </Provider >
  )
}

export default App
