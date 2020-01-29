import './App.scss'

import { Container } from '@material-ui/core'
import React from 'react'
import { Provider } from 'react-redux'
import { Workout } from 'src/components'
import { store } from 'src/state'

const App: React.FC = () => {
  return (
    <Provider store={store}>
      <Container maxWidth="sm">
        <Workout />
      </Container>
    </Provider>
  )
}

export default App
