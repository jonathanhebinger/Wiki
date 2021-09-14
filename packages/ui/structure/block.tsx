import React, { useState } from 'react'

import { Shelf } from '../structure/shelf'
import { Collapse, CollapseIcon } from '../transition/collapse'
import { mergeClassNames } from '../util/class'
import { Surface } from './surface'

export interface BlockAction {
  Label: string | React.ReactNode
  handler: () => void
}

export interface BlockProps {
  Label: React.ReactNode
  Inline?: React.ReactNode
  Content?: React.ReactNode
  actions?: BlockAction[]
  opened?: boolean
  noGutter?: boolean
  noBottom?: boolean
  onClick?: () => void
}

export function Block({
  Label,
  Inline,
  Content,
  actions = [],
  opened: defaultOpened = false,
  noGutter = false,
  onClick,
}: BlockProps) {
  const [opened, opened$set] = useState(defaultOpened)
  const [hovered, hovered$set] = useState(false)

  function toggle() {
    opened$set(!opened)
    onClick && onClick()
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

  const Gutter = (
    <Surface
      squared
      shadowless
      className={mergeClassNames(
        'w-3 py-3',
        hovered ? 'bg-blue-50' : 'bg-white',
      )}
    />
  )

  return (
    <div
      onMouseEnter={() => hovered$set(true)}
      onMouseLeave={() => hovered$set(false)}
    >
      <div className="flex h-7">
        <Surface
          squared
          shadowless
          className={mergeClassNames(
            'flex-grow',
            'flex items-center px-2 py-1 cursor-pointer',
            hovered ? 'bg-gray-200 border-gray-300' : 'bg-gray-50',
          )}
          htmlProps={{ onClick: toggle }}
        >
          <div className="flex-grow flex space-x-2 items-center font-mono font-bold h-7">
            {Content && <CollapseIcon collapsed={opened} />}
            <div>{Label}</div>
          </div>
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
        <div className="flex">
          {noGutter || !Content || Gutter}
          <div className="flex-grow bg-white">{Content}</div>
          {noGutter || !Content || Gutter}
        </div>
        <Surface
          squared
          shadowless
          className={mergeClassNames(
            'pt-1',
            hovered ? 'bg-gray-100 border-gray-200' : 'bg-gray-50',
          )}
        />
      </Collapse>
    </div>
  )
}
