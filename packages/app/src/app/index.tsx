import { StoreProvider } from 'easy-peasy'
import { store } from 'src/app/store'
import { Nav } from 'src/features/nav'
import { NodeList } from 'src/features/node'

export function App() {
  return (
    <StoreProvider store={store}>
      <div className="flex m-4 space-x-4 items-start">
        <Nav />
        <div className="w-3/4">
          <NodeList />
        </div>
      </div>
    </StoreProvider>
  )
}
