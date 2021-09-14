import { TemplateDataId, TemplateId } from '@brainote/common'
import { Select } from '@brainote/ui/forms'
import React, { useEffect, useMemo, useState } from 'react'

import { useMain } from '../main'

export function TemplateDataSelect({
  templateId,
  onSelect,
  className = '',
}: {
  templateId: TemplateId
  onSelect: (id: TemplateDataId) => void
  className?: string
}) {
  const main = useMain()
  const data = main.datas[templateId]

  const [current, current$set] = useState(data[0]?.id)

  useEffect(() => {
    handleSelect(current)
  }, [])

  function handleSelect(id: TemplateDataId) {
    current$set(id)

    id && onSelect(id)
  }

  return (
    <Select
      className={className}
      options={data.map(data => ({
        id: data.id,
        label: data.name as string,
      }))}
      onSelect={handleSelect}
      value={current}
    />
  )
}

export function useTemplateDataSelect(templateId: TemplateId) {
  const main = useMain()
  const data = main.datas[templateId]

  const [selected, selected$set] = useState(data[0]?.id)

  const options = useMemo(() => {
    return data.map(data => ({
      id: data.id,
      label: data.name as string,
    }))
  }, [data])

  return {
    selected,
    Select: (
      <Select options={options} onSelect={selected$set} value={selected} />
    ),
  }
}
