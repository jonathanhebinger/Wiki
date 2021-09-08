import { faLink } from '@fortawesome/free-solid-svg-icons'
import { Icon } from 'src/blocs/icon'
import { Shelf } from 'src/blocs/structure/shelf'
import { Surface } from 'src/blocs/structure/surface'
import { Title } from 'src/blocs/typo/title'
import { useStoreActions, useStoreState } from 'src/features/root/root.store'
import { TemplateDataId } from 'src/types/template'
import { Type } from 'src/types/type'

import { useDataContext } from '../data.context'
import { DataArray } from './data.array'
import { DataObject } from './data.object'
import { DataType } from './type/data.type'

export function DataBlock() {
  const { type } = useDataContext()

  switch (type.type) {
    case 'array':
      return <DataArray />
    case 'object':
      return <DataObject />
    case 'join':
      return <JoinNode />
    case 'type':
      return <DataType />
  }

  return null
}

function JoinNode() {
  const actions = useStoreActions()
  const { type, draft, $change } = useDataContext<Type.Join, TemplateDataId>()

  function handleChange([id]: TemplateDataId[]) {
    id && $change(id)
  }
  function handleClick() {
    actions.nav.$open({ type: 'data', template: type.template, data: draft })
  }

  const data = useStoreState(state => state.templates.dictionnary)[
    type.template
  ]?.data.find(data => data.id === draft)

  return (
    <Shelf>
      {data && (
        <Surface
          className="cursor-pointer"
          htmlProps={{ onClick: handleClick }}
        >
          <Title>
            <Shelf row>
              <Icon icon={faLink}></Icon>
              <div>{data.name}</div>
            </Shelf>
          </Title>
        </Surface>
      )}
      {/* <NodeSearch onChange={handleChange} /> */}
    </Shelf>
  )
}
