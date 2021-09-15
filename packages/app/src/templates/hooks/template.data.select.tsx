import { TemplateData, TemplateId } from '@brainote/common'
import { Select } from '@brainote/ui/forms'
import { useMemo, useState } from 'react'

import { useMain } from '../../main'

export function useTemplateDataSelect(
  templateId: TemplateId,
  nameBuilder: (data: TemplateData) => string = data => data.name as string,
) {
  const main = useMain()
  const data = main.datas[templateId]
  const template = main.template(templateId)

  const [selected, select] = useState(data[0]?.id)

  const options = useMemo(() => {
    return data.map(data => ({
      id: data.id,
      label: nameBuilder(data),
    }))
  }, [data])

  return {
    selected,
    Select: <Select options={options} onSelect={select} value={selected} />,
  }
}
