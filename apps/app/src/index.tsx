import './index.css'

import { Dialog, DialogContextProvider } from '@brainote/ui/src/components/forms'
import { Shelf } from '@brainote/ui/src/components/structure'
import { StoreProvider } from 'easy-peasy'
import ReactDOM from 'react-dom'

import { MainList } from './main/components/main.list'
import { store } from './main/root.store'
import { Nav } from './nav/components/nav'

ReactDOM.render(<Root />, document.getElementById('root'))

function Root() {
  return (
    <StoreProvider store={store}>
      <DialogContextProvider>
        <Dialog />
        <Shelf
          className="min-h-screen text-gray-500 font-medium bg-blue-100"
          spacing="lg"
          row
          htmlProps={{ style: { fontSize: '14px' } }}
        >
          <div className="w-1/4">
            <Nav />
          </div>
          <div className="w-3/4">
            <MainList />
          </div>
        </Shelf>
      </DialogContextProvider>
    </StoreProvider>
  )
}
