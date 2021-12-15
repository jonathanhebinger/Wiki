import { Box } from '@mui/material'
import React, { useState } from 'react'

import { mergeSx } from '../theme'
import { Collapse, CollapseIcon } from '../transition/collapse'
import { Shelf } from './Shelf'
import { Surface } from './Surface'
import { surfaceSx } from './Surface.sx'

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
  noBottom = false,
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
      <Box
        key={index}
        sx={{
          ...surfaceSx({
            squared: true,
            shadowless: true,
          }),
          height: 7,
          width: 7,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          cursor: 'pointer',
          '&:hover': {
            bgcolor: 'grey.100',
          },
        }}
        onClick={handler}
      >
        {Label}
      </Box>
    )
  })

  const Gutter = (
    <Surface
      squared
      shadowless
      sx={{ width: 3, py: 3, bgcolor: hovered ? 'grey.50' : 'white' }}
    />
  )

  return (
    <div
      onMouseEnter={() => hovered$set(true)}
      onMouseLeave={() => hovered$set(false)}
    >
      <div className="flex h-7">
        <Box
          sx={mergeSx(
            surfaceSx({ squared: true, shadowless: true }),
            {
              flexGrow: 1,
              alignItems: 'center',
              px: 2,
              py: 1,
              cursor: 'pointer',
            },
            hovered
              ? { bgcolor: 'grey.200', borderColor: 'grey.200' }
              : { bgcolor: 'grey.50' },
          )}
          onClick={toggle}
        >
          <div className="flex-grow flex space-x-2 items-center font-mono font-bold h-7">
            {Content && <CollapseIcon collapsed={opened} />}
            <div>{Label}</div>
          </div>
        </Box>
        <div className="flex">{Actions}</div>
        {Inline && (
          <Collapse
            collapsed={opened}
            className="w-1/2 items-center overflow-hidden"
            direction="both"
          >
            <Surface
              squared
              shadowless
              sx={{
                height: '100%',
                display: 'flex',
                alignItems: 'center',
              }}
            >
              <Shelf spacing="sm" sx={{ flexGrow: 1 }}>
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
        {noBottom || (
          <Surface
            squared
            shadowless
            sx={[
              { pt: 1 },
              hovered
                ? { bgcolor: 'grey.100', borderColor: 'grey.200' }
                : { bgcolor: 'grey.50' },
            ]}
          />
        )}
      </Collapse>
    </div>
  )
}
