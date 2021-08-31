import { faTimes, faTrash } from '@fortawesome/free-solid-svg-icons'
import { useState } from 'react'
import { Collapse } from 'src/blocs/animation/collapse'
import { ButtonIcon } from 'src/blocs/button.icon'
import { GroupItem } from 'src/blocs/structure/group'
import { Section } from 'src/blocs/structure/section'
import { Shelf } from 'src/blocs/structure/shelf'
import { Title } from 'src/blocs/typo/title'
import { NodeData } from 'src/features/node/components/node.data'
import { Node_Tagged } from 'src/features/node/components/node.tagged'
import { Node_Tags } from 'src/features/node/components/node.tags'
import { NodeProvider } from 'src/features/node/node.context'
import { useStoreActions } from 'src/features/root/root.store'
import { Node as iNode } from 'src/types/node'

export function Node({ node }: { node: iNode }) {
  const [collapsed, collapsed$set] = useState(false)
  const $close = useStoreActions(state => state.nav.$close)

  function toggle() {
    collapsed$set(!collapsed)
  }

  return (
    <NodeProvider node={node}>
      <GroupItem shadow="lg" border="none">
        <Title
          className="px-2 py-1 flex justify-between"
          pointer
          size="lg"
          onClick={toggle}
        >
          {node.name}
          <Shelf noPadding row>
            <ButtonIcon
              contrast
              icon={faTrash}
              onClick={e => {
                $close({ type: 'node', node: node.id })
                e.stopPropagation()
              }}
            />
            <ButtonIcon
              contrast
              icon={faTimes}
              onClick={e => {
                $close({ type: 'node', node: node.id })
                e.stopPropagation()
              }}
            />
          </Shelf>
        </Title>
        <Collapse collapsed={collapsed}>
          <Shelf>
            <Node_Tags />
            <Node_Info />
            <NodeData />
            <Node_Tagged />
          </Shelf>
        </Collapse>
      </GroupItem>
    </NodeProvider>
  )
}

function Node_Info() {
  return <Section Label={<>INFO</>}></Section>
}
