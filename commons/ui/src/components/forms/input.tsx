export function Input({
  type = 'text',
  value,
  onChange,
  className = '',
}: {
  type?: 'text' | 'number'
  value: string | number
  onChange: (value: string) => void
  className?: string
}) {
  return (
    <input
      type={type}
      className={
        'outline-none px-2 text-gray-600 border-b-2 border-gray-300 ' +
        className
      }
      value={value}
      onChange={e => onChange(e.target.value)}
    />
  )
}
