import { NodeId } from '@brainote/common'
import {
  faEye,
  faEyeSlash,
  faPlus,
  faTimes,
  faTrash,
} from '@fortawesome/free-solid-svg-icons'
import { useState } from 'react'
import { useDialogContext } from 'src/blocs/dialog'
import { Icon } from 'src/blocs/icon'
import { Block } from 'src/blocs/structure/block'
import { Title } from 'src/blocs/typo/title'
import {
  useActions,
  useModel,
  useNavActions,
} from 'src/features/root/root.store'
import { TemplateSearch } from 'src/features/templates/template.search'

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

  function handleTemplatesAdd() {
    dialog.$open({
      Content: (
        <>
          <TemplateSearch
            onChange={ids => {
              ids.forEach(template_id => {
                actions.attach({
                  node_id,
                  template_id,
                })
                //  dialog.$close()
              })
            }}
            exclude={nodes.node(node_id)['root.templates']}
          />
        </>
      ),
      clickOutsideHandler() {
        dialog.$close()
      },
    })
  }
  function handleTemplatesHide() {
    hidden$set(!hidden)
  }

  return (
    <NodeProvider id={node_id}>
      <div>
        <Block
          opened
          Label={<NodeTitle />}
          Content={<NodeInfos />}
          actions={[
            {
              Label: <Icon icon={hidden ? faEye : faEyeSlash} />,
              handler: handleTemplatesHide,
            },
            { Label: <Icon icon={faPlus} />, handler: handleTemplatesAdd },
            { Label: <Icon icon={faTrash} />, handler: handleClose },
            { Label: <Icon icon={faTimes} />, handler: handleClose },
          ]}
        />
        {hidden || <NodeTemplates />}
      </div>
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
