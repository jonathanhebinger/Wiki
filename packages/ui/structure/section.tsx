import React, { useState } from 'react'

import { Collapse, CollapseIcon } from '../transition/collapse'
import { Title } from '../typo/title'
import { Shelf } from './Shelf'

export interface SectionProps {
  Label: React.ReactNode
  opened?: boolean
}

export function Section(props: React.PropsWithChildren<SectionProps>) {
  const [opened, $set] = useState(props.opened || false)

  const $toggle = () => $set(!opened)

  return (
    <Shelf noPadding>
      <Title className="flex justify-between" onClick={$toggle}>
        {props.Label}
        <CollapseIcon collapsed={!opened} />
      </Title>
      <Collapse collapsed={!opened}>{props.children}</Collapse>
    </Shelf>
  )
}
