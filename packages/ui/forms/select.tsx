export interface SelectOption {
  id: string
  label: string
}
export function Select({
  options,
  onSelect,
  value,
  className = '',
}: {
  options: SelectOption[]
  onSelect: (option: string) => void
  value?: string
  className?: string
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
      className={
        'outline-none px-1 text-gray-600 border-b-2 border-gray-300 ' +
        className
      }
      onChange={handleSelect}
      value={value}
    >
      {Options}
    </select>
  )
}
