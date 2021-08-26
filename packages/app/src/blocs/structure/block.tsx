import React, { useState } from 'react'
import { Collapse } from 'src/blocs/animation/collapse'
import { Divider } from 'src/blocs/structure/divider'
import { GroupItem } from 'src/blocs/structure/group'
import { Shelf } from 'src/blocs/structure/shelf'
import { mergeClassNames } from 'src/blocs/util'

export interface BlockProps {
  Label: React.ReactNode
  Inline: React.ReactNode
  Content: React.ReactNode
  inlineClickable?: boolean
}

export function Block({
  Label,
  Inline,
  Content,
  inlineClickable: collapsedClickable,
}: BlockProps) {
  const [opened, opened$set] = useState(false)
  const [hovered, hovered$set] = useState(false)

  function toggle() {
    opened$set(!opened)
  }

  return (
    <GroupItem
      radius="none"
      htmlProps={{
        onMouseEnter: () => hovered$set(true),
        onMouseLeave: () => hovered$set(false),
      }}
    >
      <div className="flex">
        <div
          className={mergeClassNames(
            'flex-grow flex cursor-pointer self-stretch bg-gray-50',
            hovered && 'bg-gray-200',
          )}
          onClick={toggle}
        >
          <div className="px-2 py-1 flex-grow self-center">{Label}</div>
        </div>
        <Collapse
          collapsed={opened}
          className="w-1/2 flex items-center self-stretch"
          direction="both"
        >
          <Divider />
          <Shelf
            spacing="sm"
            className="flex-grow max-h-full overflow-hidden"
            htmlProps={collapsedClickable ? { onClick: toggle } : {}}
          >
            {Inline}
          </Shelf>
        </Collapse>
      </div>
      <Collapse collapsed={!opened}>
        <Divider />
        {Content}
      </Collapse>
    </GroupItem>
  )
}
