import { Data, Key, NodeId } from '@brainote/common'
import { faPlus, faTimes, faTrash } from '@fortawesome/free-solid-svg-icons'
import { useState } from 'react'
import { Icon } from 'src/blocs/icon'
import { Block } from 'src/blocs/structure/block'
import { Section } from 'src/blocs/structure/section'
import { Shelf } from 'src/blocs/structure/shelf'
import { Title } from 'src/blocs/typo/title'
import { DataItem } from 'src/features/data'
import { useNavContext } from 'src/features/nav/nav.store'
import { useNodesContext } from 'src/features/nodes/nodes.system'

import {
  NodeProvider,
  NodeTemplate as INodeTemplate,
  useNode,
} from '../node.context'

export interface NodeMainProps {
  nodeId: NodeId
}
export function NodeMain({ nodeId }: NodeMainProps) {
  const [, nav] = useNavContext()
  const [, nodes] = useNodesContext()

  function handleClose() {
    nav.close({ type: 'node', node: nodeId })
  }

  function handleNewData() {
    const node = nodes.create('New node')

    nodes.attach(node.id, nodeId)
  }

  return (
    <NodeProvider nodeId={nodeId}>
      <Block
        Label={<NodeTitle />}
        Content={
          <Shelf>
            {/* <NodeInfos /> */}
            {/* <NodeKeys /> */}
            <NodeTemplateList />
          </Shelf>
        }
        actions={[
          { Label: <Icon icon={faPlus} />, handler: handleNewData },
          { Label: <Icon icon={faTrash} />, handler: handleClose },
          { Label: <Icon icon={faTimes} />, handler: handleClose },
        ]}
      ></Block>
    </NodeProvider>
  )
}

function NodeTitle() {
  const { name } = useNode()

  return (
    <Title underline={false} uppercase>
      {name}
    </Title>
  )
}

function NodeTemplateList() {
  const { templates } = useNode()

  const Items = templates.map(({ data, template }) => {
    return <NodeTemplate data={data} template={template} key={template.id} />
  })

  return <Shelf noPadding>{Items}</Shelf>
}

function NodeTemplate({ template, data }: INodeTemplate) {
  return (
    <Section
      Label={
        <>
          {template.name} - {data.length}
        </>
      }
    >
      <Shelf noPadding>
        {data.map(({ data, key }) => {
          return (
            <DataItem
              key={key.id}
              Label={<>{key.name}</>}
              draft={data}
              saved={data}
              type={key.data['key.type']}
              onChange={console.log}
              onSave={console.log}
            />
          )
        })}
      </Shelf>
    </Section>
  )
}

function NodeTemplateKey({ data, key }: { key: Key; data: Data.Any }) {
  const [, actions] = useNodesContext()
  const { id } = useNode()

  const [draft, draft$set] = useState(data)

  function handleSave() {
    actions.update_data(id, { [key.id]: draft })
  }

  return (
    <DataItem
      key={key.id}
      Label={<>{key.name}</>}
      draft={draft}
      saved={data}
      type={key.data['key.type']}
      onChange={draft$set}
      onSave={handleSave}
    />
  )
}
