import { TemplateId } from '@brainote/domain'
import { Select } from '@brainote/ui/src/components/forms'
import { useMemo, useState } from 'react'

import { useMain } from '../../main'
import { selectTemplate, selectTemplateDataList } from '../../main/state/main.selector'

export function useNodeSelect(
  templateId: TemplateId,
  defaultTemplateDataId?: TemplateId,
) {
  const template = useMain(selectTemplate(templateId))
  const nodeList = useMain(selectTemplateDataList(templateId))

  const [selected, select] = useState(defaultTemplateDataId || nodeList[0][0])

  const options = useMemo(() => {
    return nodeList.map(([id, node]) => ({
      id,
      label: node[template.namePath] as string,
    }))
  }, [nodeList])

  return {
    selected,
    select,
    Select: <Select options={options} onSelect={select} value={selected} />,
  }
}
