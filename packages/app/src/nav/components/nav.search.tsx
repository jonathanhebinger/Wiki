import { Icon, Input } from '@brainote/ui/forms'
import { Block, Shelf } from '@brainote/ui/structure'
import { faTimes } from '@fortawesome/free-solid-svg-icons'
import { useState } from 'react'

import { useMain, useNavActions } from '../../main'
import { useTemplateDataSelect } from '../../templates'

export function NavSearch() {
  const main = useMain()
  const navActions = useNavActions()

  const [searchString, search] = useState('')

  const { Select, selected } = useTemplateDataSelect('template')

  const nodes = main.datas[selected] || []
  const filtered = searchString
    ? nodes.filter(node => (node.name as string).includes(searchString))
    : nodes

  const Items = filtered.map(node => {
    function handleOpen() {
      navActions.open({
        templateId: selected,
        dataId: node.id,
      })
    }

    return (
      <Block key={node.id} Label={node.name} onClick={handleOpen} noBottom />
    )
  })

  const Content = (
    <>
      <Shelf sm border>
        {Select}
        <Shelf noPadding row>
          <Input
            className="flex-grow"
            type="text"
            onChange={search}
            value={searchString}
          />
          {searchString && (
            <Icon
              icon={faTimes}
              className="p-1 cursor-pointer"
              onClick={() => search('')}
            />
          )}
        </Shelf>
      </Shelf>
      {Items}
    </>
  )

  return <Block Label="Search" Inline={Select} Content={Content} />
}
