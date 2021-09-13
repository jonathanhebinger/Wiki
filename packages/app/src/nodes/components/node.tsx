import { NodeId } from '@brainote/common'
import { Icon, useDialogContext } from '@brainote/ui/forms'
import { Block, Surface } from '@brainote/ui/structure'
import { Collapse } from '@brainote/ui/transition/collapse'
import { Title } from '@brainote/ui/typo'
import {
  faEye,
  faEyeSlash,
  faTimes,
  faTrash,
} from '@fortawesome/free-solid-svg-icons'
import React, { useState } from 'react'

import { useActions, useModel, useNavActions } from '../../root'
import { NodeProvider, useNode } from '../node.context'
import { NodeInfos } from './node.infos'
import { NodeTemplates } from './node.templates'

export function NodeMain({ id: node_id }: { id: NodeId }) {
  const nav = useNavActions()

  const nodes = useModel(state => state.nodes)
  const actions = useActions(actions => actions.nodes)

  function handleClose() {
    nav.close(node_id)
  }
  const dialog = useDialogContext()

  const [hidden, hidden$set] = useState(false)

  function handleTemplatesHide() {
    hidden$set(!hidden)
  }

  return (
    <NodeProvider id={node_id}>
      <Surface squared borderless>
        <Block
          opened
          Label={<NodeTitle />}
          Content={<NodeInfos />}
          actions={[
            {
              Label: <Icon icon={hidden ? faEye : faEyeSlash} />,
              handler: handleTemplatesHide,
            },
            { Label: <Icon icon={faTrash} />, handler: handleClose },
            { Label: <Icon icon={faTimes} />, handler: handleClose },
          ]}
        />
        <Collapse collapsed={hidden}>
          <NodeTemplates />
        </Collapse>
      </Surface>
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
