export interface SelectOption {
  id: string
  label: string
}
export function Select({
  options,

  onSelect,
  value,
}: {
  options: SelectOption[]
  onSelect: (option: string) => void
  value?: string
}) {
  function handleSelect(event: React.ChangeEvent<HTMLSelectElement>) {
    onSelect(event.target.value)
  }

  const Options = options.map(option => {
    return (
      <option value={option.id} key={option.id}>
        {option.label}
      </option>
    )
  })

  return (
    <select
      className="outline-none border border-gray-300 rounded px-2 py-1 text-gray-500 shadow-md"
      onChange={handleSelect}
      value={value}
    >
      {Options}
    </select>
  )
}
