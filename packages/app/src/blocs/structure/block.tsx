import React, { useState } from 'react'
import { Collapse } from 'src/blocs/animation/collapse'
import { Shelf } from 'src/blocs/structure/shelf'
import { mergeClassNames } from 'src/blocs/util'

import { Surface } from './surface'

export interface BlockAction {
  Label: string | React.ReactNode
  handler: () => void
}

export interface BlockProps {
  Label: React.ReactNode
  Inline?: React.ReactNode
  Content: React.ReactNode
  inlineClickable?: boolean
  actions?: BlockAction[]
  opened?: boolean
}

export function Block({
  Label,
  Inline,
  Content,
  inlineClickable,
  actions = [],
  opened: defaultOpened = false,
}: BlockProps) {
  const [opened, opened$set] = useState(defaultOpened)
  const [hovered, hovered$set] = useState(false)

  function toggle() {
    opened$set(!opened)
  }

  function handleHeaderClick() {
    inlineClickable && toggle()
  }

  const Actions = actions.map(({ Label, handler }, index) => {
    return (
      <Surface
        key={index}
        squared
        shadowless
        className={mergeClassNames(
          'h-7 w-7 flex items-center justify-center cursor-pointer hover:bg-gray-100',
        )}
        htmlProps={{ onClick: handler }}
      >
        {Label}
      </Surface>
    )
  })

  return (
    <Surface
      squared
      borderless
      htmlProps={{
        onMouseEnter: () => hovered$set(true),
        onMouseLeave: () => hovered$set(false),
      }}
    >
      <div className="flex h-7" onClick={handleHeaderClick}>
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
        <div className="flex">{Actions}</div>
        {Inline && (
          <Collapse
            collapsed={opened}
            className="w-1/2 items-center overflow-hidden"
            direction="both"
          >
            <Surface squared shadowless className="h-full flex items-center">
              <Shelf spacing="sm" className="flex-grow">
                {Inline}
              </Shelf>
            </Surface>
          </Collapse>
        )}
      </div>
      <Collapse collapsed={!opened}>
        <Surface squared shadowless>
          {Content}
        </Surface>
      </Collapse>
    </Surface>
  )
}
