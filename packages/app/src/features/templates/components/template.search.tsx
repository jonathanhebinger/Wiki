import { useEffect, useMemo, useRef } from 'react'
import { useSystem } from 'src/bang/hooks/system'
import { Particle } from 'src/bang/particle'
import { Search, SearchContext, SearchOptionProps, useSearchStore } from 'src/blocs/search'
import { Template, TemplateId } from 'src/types/template'

import { useTemplatesContext } from '../templates.store'

function useParticle<S>(state: S) {
  const particle = new Particle(state)

  useEffect(() => {
    particle.state = state
    particle.emit()
  }, [state])

  return particle
}

export function TemplateSearch({
  multiple = false,
  exclude = [],
  onChange,
}: {
  multiple?: boolean
  exclude?: TemplateId[]
  onChange: (
    ids: TemplateId[],
    context: SearchContext<TemplateSearch_Option>,
  ) => void
}) {
  const [templates, , refs] = useTemplatesContext()

  const excludeParticle = useParticle(exclude)

  useSystem({
    list: refs.list,
    exclude: excludeParticle,

    get options() {
      const list = this.list as Template[]

      return list
        .filter(template => !this.exclude.includes(template.id))
        .map(template => ({
          id: template.id,
          name: template.name,
          test: template.name.toLowerCase(),
        }))
    },
  })

  const options = useMemo<TemplateSearch_Option[]>(
    () =>
      templates.list
        .filter(template => !exclude.includes(template.id))
        .map(template => ({
          id: template.id,
          name: template.name,
          test: template.name.toLowerCase(),
        })),
    [templates, exclude],
  )

  const store = useSearchStore({
    options,
    Option,
    Selected: ({ option }) => <div>{option.name}</div>,
    multiple,
  })

  useEffect(() => {
    onChange(
      store.state.selected.map(option => option.id),
      store,
    )
  }, [store.state.selected])

  return <Search store={store} />
}

interface TemplateSearch_Option {
  id: TemplateId
  name: string
  test: string
}

function Option({
  option,
  selected,
  onSelect,
}: SearchOptionProps<TemplateSearch_Option>) {
  return (
    <div
      className={`px-2 py-1 flex justify-between items-center cursor-pointer hover:bg-gray-100 ${
        selected ? 'bg-gray-200' : ''
      }`}
      onClick={onSelect}
    >
      {option.name}
    </div>
  )
}
