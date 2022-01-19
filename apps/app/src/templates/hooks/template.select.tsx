import { TemplateId } from '@brainote/domain'
import { Select } from '@brainote/ui/src/components/forms'
import { useMemo, useState } from 'react'

import { useMain } from '../../main'

export function useTemplateSelect(defaultTemplateId?: TemplateId) {
  const templatePairList = useMain(state => state.templates)

  const [selected, select] = useState(
    defaultTemplateId || templatePairList[0][0],
  )

  const options = useMemo(() => {
    return templatePairList.map(([templateId]) => ({
      id: templateId,
      label: templateId,
    }))
  }, [templatePairList])

  return {
    selected,
    select,
    Select: <Select options={options} onSelect={select} value={selected} />,
  }
}
