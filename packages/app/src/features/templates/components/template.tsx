import { faPlus, faTimes, faTrash } from '@fortawesome/free-solid-svg-icons'
import { Icon } from 'src/blocs/icon'
import { Block } from 'src/blocs/structure/block'
import { Section } from 'src/blocs/structure/section'
import { Shelf } from 'src/blocs/structure/shelf'
import { Title } from 'src/blocs/typo/title'
import { TemplateId } from 'src/types/template'

import { useStoreActions } from '../../root/root.store'
import { TemplateProvider, useTemplate } from '../templates.context'
import { TemplateInfos } from './template.info'
import { TemplateKeys } from './template.keys'

export interface TemplateMainProps {
  templateId: TemplateId
}
export function TemplateMain({ templateId: templateId }: TemplateMainProps) {
  const $close = useStoreActions(state => state.nav.$close)
  const { data$create } = useStoreActions(state => state.templates)

  function handleClose() {
    $close({ type: 'template', template: templateId })
  }

  function handleNewData() {
    data$create({ templateId })
  }

  return (
    <TemplateProvider templateId={templateId}>
      <Block
        Label={<TemplateTitle />}
        Content={
          <Shelf>
            <TemplateInfos />
            <TemplateKeys />
            <TemplateData />
          </Shelf>
        }
        actions={[
          { Label: <Icon icon={faPlus} />, handler: handleNewData },
          { Label: <Icon icon={faTrash} />, handler: handleClose },
          { Label: <Icon icon={faTimes} />, handler: handleClose },
        ]}
      ></Block>
    </TemplateProvider>
  )
}

function TemplateTitle() {
  const { name } = useTemplate()

  return (
    <Title underline={false} uppercase>
      {name}
    </Title>
  )
}

function TemplateData() {
  const { keys } = useTemplate()

  return (
    <Section Label={<>Data - {keys.length}</>}>
      <Shelf noPadding>{}</Shelf>
    </Section>
  )
}
