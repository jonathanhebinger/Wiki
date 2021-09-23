import { Icon, Input } from '@brainote/ui/forms'
import { Block, Shelf } from '@brainote/ui/structure'
import { faTimes } from '@fortawesome/free-solid-svg-icons'
import { useState } from 'react'

import { useMain, useNavActions } from '../../main'
import { selectTemplate } from '../../main/state/main.selector'
import { useTemplateSelect } from '../../templates'

export function NavSearch() {
  const navActions = useNavActions()

  const [searchString, search] = useState('')

  const { Select, selected } = useTemplateSelect()

  const template = useMain(selectTemplate(selected))
  const nodeList = template.data
  const filtered = searchString
    ? nodeList.filter(node => (node.name as string).includes(searchString))
    : nodeList

  const Items = filtered.map(node => {
    function handleOpen() {
      navActions.open({
        type: 'data',
        templateId: selected,
        templateDataId: node.id,
      })
    }

    return (
      <Block
        key={node.id}
        Label={node[template.namePath]}
        onClick={handleOpen}
        noBottom
      />
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
