import './App.scss'

import { Container } from '@material-ui/core'
import React from 'react'

import { createNote, Note, NoteProvider } from './playground'

const App: React.FC = () => {
  return (
    <Container maxWidth="sm">
      <NoteProvider note={createNote()}>
        <Note />
      </NoteProvider>
    </Container>
  )
}

export default App
