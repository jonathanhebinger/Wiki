import { faTimes, faTrash } from '@fortawesome/free-solid-svg-icons'
import { useState } from 'react'
import { Collapse } from 'src/blocs/animation/collapse'
import { ButtonIcon } from 'src/blocs/button.icon'
import { GroupItem } from 'src/blocs/structure/group'
import { Section } from 'src/blocs/structure/section'
import { Shelf } from 'src/blocs/structure/shelf'
import { Title } from 'src/blocs/typo/title'
import { TemplateId } from 'src/types/template'
import { Type } from 'src/types/type'

import { DataE } from '../data'
import { useStoreActions } from '../root/root.store'
import { TemplateProvider, useTemplate } from './templates.context'

export interface TemplateEProps {
  templateId: TemplateId
}
export function TemplateE({ templateId: templateId }: TemplateEProps) {
  const [collapsed, collapsed$set] = useState(false)

  function toggle() {
    collapsed$set(!collapsed)
  }

  return (
    <TemplateProvider templateId={templateId}>
      <GroupItem shadow="lg" border="none">
        <TemplateTitle toggle={toggle} />
        <Collapse collapsed={collapsed}>
          <Shelf>
            <Section Label={<>Info</>}>
              <Shelf noPadding></Shelf>
            </Section>
            <TemplateKeys />
            <TemplateData />
          </Shelf>
        </Collapse>
      </GroupItem>
    </TemplateProvider>
  )
}

const KEY_TYPE: Type.Object = {
  type: 'object',
  keys: [
    { id: 'name', name: 'name', type: { type: 'string' } },
    { id: 'type', name: 'type', type: { type: 'type' } },
    { id: 'required', name: 'required', type: { type: 'boolean' } },
  ],
}

function TemplateTitle({ toggle }: { toggle: () => void }) {
  const { name, id } = useTemplate()

  const $close = useStoreActions(state => state.nav.$close)

  function handleClose(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
    //$close(template.id)
    e.stopPropagation()
  }

  return (
    <Title
      className="px-2 py-1 flex justify-between"
      pointer
      size="lg"
      onClick={toggle}
    >
      {name}
      <Shelf noPadding row>
        <ButtonIcon contrast icon={faTrash} onClick={handleClose} />
        <ButtonIcon contrast icon={faTimes} onClick={handleClose} />
      </Shelf>
    </Title>
  )
}

function TemplateKeys() {
  const { keys } = useTemplate()

  const Keys = keys.map(key => {
    return (
      <DataE
        Label={<>{key.name}</>}
        draft={key}
        saved={key}
        type={KEY_TYPE}
        onChange={console.log}
      ></DataE>
    )
  })

  return (
    <Section Label={<>Keys - {keys.length}</>}>
      <Shelf noPadding>{Keys}</Shelf>
    </Section>
  )
}

function TemplateData() {
  const { keys } = useTemplate()

  const Keys = keys.map(key => {
    return (
      <DataE
        Label={<>{key.name}</>}
        draft={key}
        saved={key}
        type={KEY_TYPE}
        onChange={console.log}
      ></DataE>
    )
  })

  return (
    <Section Label={<>Data - {keys.length}</>}>
      <Shelf noPadding>{Keys}</Shelf>
    </Section>
  )
}
