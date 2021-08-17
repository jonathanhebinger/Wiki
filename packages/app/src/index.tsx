import './index.css'

import { StoreProvider } from 'easy-peasy'
import { useEffect, useState } from 'react'
import ReactDOM from 'react-dom'
import { Badge } from 'src/blocs/badge'
import { Divider } from 'src/blocs/divider'
import { Modal, useModalControl } from 'src/blocs/modal'
import { Surface } from 'src/blocs/surface'
import { Node_Data } from 'src/node/components/data'
import { NodeSearch } from 'src/node/components/search'
import { NodeProvider, useNode } from 'src/node/context'
import { Node } from 'src/node/type'
import { store, useStoreState } from 'src/store'

ReactDOM.render(<Root />, document.getElementById('root'))

function Root() {
  return (
    <StoreProvider store={store}>
      <Node_List />
      <NodeSearch />
    </StoreProvider>
  )
}

function Node_List() {
  const nodes = useStoreState(state => state.nodes.entities)

  return (
    <div className="flex flex-col space-y-2 p-4">
      {nodes.map(node => (
        <Node_Main node={node} key={node.id}></Node_Main>
      ))}
    </div>
  )
}

function Node_Main({ node }: { node: Node }) {
  return (
    <NodeProvider node={node}>
      <Surface shadow="large">
        <div className="p-2">{node.name}</div>
        <Divider />
        <div className="flex">
          <div className="p-2 flex-1">
            <Node_Tags />
            <Node_Info />
            <Node_Data />
          </div>
          <Divider direction="vertical" />
          <div className="p-2 flex-1">
            <Node_Tagged />
          </div>
        </div>
      </Surface>
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
