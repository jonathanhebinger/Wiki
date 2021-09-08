import './bang/hooks/system'
import './index.css'

import ReactDOM from 'react-dom'
import { Dialog, DialogContextProvider } from 'src/blocs/dialog'
import { Shelf } from 'src/blocs/structure/shelf'
import { Nav } from 'src/features/nav/components/nav'

import { NavContextProvider } from './features/nav/nav.store'
import { MainList } from './features/root/main.list'
import { TemplatesContextProvider } from './features/templates/templates.store'

ReactDOM.render(<Root />, document.getElementById('root'))

function Root() {
  return (
    <TemplatesContextProvider>
      <NavContextProvider>
        <DialogContextProvider>
          <Dialog />
          <Shelf
            className="min-h-screen text-gray-500 font-medium bg-gray-100"
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
      </NavContextProvider>
    </TemplatesContextProvider>
  )
}
