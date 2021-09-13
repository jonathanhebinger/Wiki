import React, { useState } from 'react'

import { Collapse, CollapseIcon } from '../transition/collapse'
import { Title } from '../typo/title'
import { QuickProps } from '../util/type'
import { Shelf } from './shelf'

export interface SectionProps extends QuickProps {
  Label: React.ReactNode
  opened?: boolean
}

export function Section(props: SectionProps) {
  const [opened, $set] = useState(props.opened || false)

  const $toggle = () => $set(!opened)

  return (
    <Shelf noPadding className={props.className} htmlProps={props.htmlProps}>
      <Title className="flex justify-between" onClick={$toggle}>
        {props.Label}
        <CollapseIcon collapsed={!opened} />
      </Title>
      <Collapse collapsed={!opened}>{props.children}</Collapse>
    </Shelf>
  )
}
