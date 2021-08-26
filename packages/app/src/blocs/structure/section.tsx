import React, { useMemo, useState } from 'react'
import { Collapse, CollapseIcon } from 'src/blocs/animation/collapse'
import { Shelf } from 'src/blocs/structure/shelf'
import { QuickProps } from 'src/blocs/type'
import { Title } from 'src/blocs/typo/title'

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
