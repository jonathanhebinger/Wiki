import { faLink } from '@fortawesome/free-solid-svg-icons'
import { Icon } from 'src/blocs/icon'
import { Shelf } from 'src/blocs/structure/shelf'
import { Surface } from 'src/blocs/structure/surface'
import { Title } from 'src/blocs/typo/title'
import { NodeSearch } from 'src/features/node/components/node.search'
import { useStoreActions, useStoreState } from 'src/features/root/root.store'
import { NodeId } from 'src/types/node'
import { Type } from 'src/types/type'

import { useDataContext } from '../data.context'
import { ValueArray } from './data.array'
import { ValueObject } from './data.object'
import { ValueType } from './type/data.type'

export function ValueBlock() {
  const { type } = useDataContext()

  switch (type.type) {
    case 'array':
      return <ValueArray />
    case 'object':
      return <ValueObject />
    case 'join':
      return <ValueNode />
    case 'type':
      return <ValueType />
  }

  return null
}

function ValueNode() {
  const actions = useStoreActions()
  const { draft, $change } = useDataContext<Type.Join, NodeId>()

  function handleChange([id]: NodeId[]) {
    id && $change(id)
  }
  function handleClick() {
    actions.nav.$open({ type: 'node', node: draft })
  }

  const node = useStoreState(state => state.nodes.dictionnary)[draft]

  return (
    <Shelf>
      {node && (
        <Surface
          className="cursor-pointer"
          htmlProps={{ onClick: handleClick }}
        >
          <Title>
            <Shelf row>
              <Icon icon={faLink}></Icon>
              <div>{node.name}</div>
            </Shelf>
          </Title>
        </Surface>
      )}
      <NodeSearch onChange={handleChange} />
    </Shelf>
  )
}
