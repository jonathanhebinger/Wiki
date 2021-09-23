import { TemplateId } from '@brainote/common'
import { Select } from '@brainote/ui/forms'
import { useMemo, useState } from 'react'

import { useMain } from '../../main'
import { selectTemplate } from '../../main/state/main.selector'

export function useNodeSelect(
  templateId: TemplateId,
  defaultTemplateDataId?: TemplateId,
) {
  const template = useMain(selectTemplate(templateId))
  const data = template.data

  const [selected, select] = useState(defaultTemplateDataId || data[0]?.id)

  const options = useMemo(() => {
    return data.map(node => ({
      id: node.id,
      label: node[template.namePath] as string,
    }))
  }, [data])

  return {
    selected,
    select,
    Select: <Select options={options} onSelect={select} value={selected} />,
  }
}
