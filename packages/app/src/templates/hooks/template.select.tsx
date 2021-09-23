import { TemplateId } from '@brainote/common'
import { Select } from '@brainote/ui/forms'
import { useMemo, useState } from 'react'

import { useMain } from '../../main'
import { selectTemplateList } from '../../main/state/main.selector'

export function useTemplateSelect(defaultTemplateId?: TemplateId) {
  const data = useMain(selectTemplateList)

  const [selected, select] = useState(defaultTemplateId || data[0]?.id)

  const options = useMemo(() => {
    return data.map(template => ({
      id: template.id,
      label: template.name,
    }))
  }, [data])

  return {
    selected,
    select,
    Select: <Select options={options} onSelect={select} value={selected} />,
  }
}
