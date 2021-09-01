import React, { useState } from 'react'
import { Collapse } from 'src/blocs/animation/collapse'
import { Shelf } from 'src/blocs/structure/shelf'
import { mergeClassNames } from 'src/blocs/util'

import { Surface } from './surface'

export interface BlockProps {
  Label: React.ReactNode
  Inline: React.ReactNode
  Content: React.ReactNode
  inlineClickable?: boolean
}

export function Block({ Label, Inline, Content, inlineClickable }: BlockProps) {
  const [opened, opened$set] = useState(false)
  const [hovered, hovered$set] = useState(false)

  function toggle() {
    opened$set(!opened)
  }

  function handleHeaderClick() {
    inlineClickable && toggle()
  }

  return (
    <Surface
      squared
      borderless
      htmlProps={{
        onMouseEnter: () => hovered$set(true),
        onMouseLeave: () => hovered$set(false),
      }}
    >
      <div className="flex" onClick={handleHeaderClick}>
        <Surface
          squared
          shadowless
          className={mergeClassNames(
            'flex-grow',
            'flex items-center px-2 py-1 cursor-pointer',
            hovered ? 'bg-gray-200' : 'bg-gray-50',
          )}
          htmlProps={{ onClick: toggle }}
        >
          <div className="flex-grow">{Label}</div>
        </Surface>
        <Collapse
          collapsed={opened}
          className="w-1/2 items-center overflow-hidden"
          direction="both"
        >
          <Surface squared shadowless className="h-full flex items-center">
            <Shelf spacing="sm">{Inline}</Shelf>
          </Surface>
        </Collapse>
      </div>
      <Collapse collapsed={!opened}>
        <Surface squared shadowless>
          {Content}
        </Surface>
      </Collapse>
    </Surface>
  )
}
