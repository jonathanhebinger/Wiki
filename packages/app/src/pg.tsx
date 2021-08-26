import { Action, action, Computed, computed, useLocalStore } from 'easy-peasy'

interface ChunkNavigator_PathItem {
  label: React.ReactNode
  chunk: React.ReactNode
}

interface ChunkNavigatorStore {
  path: ChunkNavigator_PathItem[]
  index: number
  current: Computed<this, ChunkNavigator_PathItem>

  $move: Action<this, number>
  $open: Action<this, ChunkNavigator_PathItem>
  $close: Action<this>
}

function useChunkNavigatorStore() {
  const {} = useLocalStore<ChunkNavigatorStore>(() => ({
    path: [],
    index: 0,
    current: computed(state => state.path[state.index]),

    $move: action((state, index) => {
      state.index = index
    }),
    $open: action((state, item) => {
      state.path = [...state.path.slice(0, state.index), item]
      state.index++
    }),
    $close: action(state => {
      state.path = state.path.slice(0, state.index - 1)
      state.index--
    }),
  }))
}

function ChunkNavigator_Item({ item }: { item: ChunkNavigator_PathItem }) {}
