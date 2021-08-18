import './index.css'

import { Action, action, Computed, computed, StoreProvider, useLocalStore } from 'easy-peasy'
import React, { useEffect, useState } from 'react'
import ReactDOM from 'react-dom'
import { Badge } from 'src/blocs/badge'
import { Divider } from 'src/blocs/divider'
import { Group, GroupItem } from 'src/blocs/group'
import { Modal, useModalControl } from 'src/blocs/modal'
import { Node_Data } from 'src/node/components/data'
import { NodeSearch } from 'src/node/components/node.search'
import { NodeProvider, useNode } from 'src/node/context'
import { Node } from 'src/node/type'
import { store, useStoreState } from 'src/store'

ReactDOM.render(<Root />, document.getElementById('root'))

function Root() {
  return (
    <StoreProvider store={store}>
      <Node_List />
    </StoreProvider>
  )
}

function Node_List() {
  const nodes = useStoreState(state => state.nodes.entities)

  return (
    <Group className="flex flex-col" border="squared" spacing="lg">
      {nodes.map(node => (
        <Node_Main node={node} key={node.id} />
      ))}
    </Group>
  )
}

function Node_Main({ node }: { node: Node }) {
  return (
    <NodeProvider node={node}>
      <GroupItem shadow="large" border="none">
        <div className="p-2">{node.name}</div>
        <Divider />
        <div className="flex">
          <div className="flex-1">
            <div className="p-2">
              <Node_Tags />
            </div>
            <Divider />
            <div className="p-2">
              INFO
              <Node_Info />
            </div>
            <Node_Data />
          </div>
          <Divider direction="vertical" />
          <div className="p-2 flex-1">
            <Node_Tagged />
          </div>
        </div>
      </GroupItem>
    </NodeProvider>
  )
}

function Node_Info() {
  return null
}

function Node_Tags() {
  const { tags, tags$remove } = useNode()

  const badges = tags.map(parent => {
    return (
      <Badge
        className="m-2"
        label={parent.name}
        onClick={() => {}}
        onDelete={() => tags$remove(parent)}
        key={parent.id}
      />
    )
  })

  const modal = useModalControl({ closeOnClickOut: true })

  return (
    <div className="flex flex-row -m-2">
      {badges}
      <Badge className="m-2" label="+" onClick={modal.open} />
      <Modal control={modal} className="w-1/2 h-1/4 p-4 flex">
        <NodeSearch />
      </Modal>
    </div>
  )
}

function Node_Tagged() {
  const { tagged, tagged$remove } = useNode()

  const badges = tagged.map(parent => {
    return (
      <Badge
        label={parent.name}
        onClick={() => {}}
        onDelete={() => tagged$remove(parent)}
        key={parent.id}
      />
    )
  })

  return <div className="flex flex-col space-y-2">{badges}</div>
}

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
