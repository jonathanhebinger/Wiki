export function Checkbox({
  checked,
  onChange,
  className = '',
}: {
  checked: boolean
  onChange: (checked: boolean) => void
  className?: string
}) {
  return (
    <input
      type="checkbox"
      className={'w-5 h-5 ' + className}
      checked={checked}
      onChange={e => {
        onChange(e.target.checked)
        e.stopPropagation()
      }}
      onClick={e => {
        e.stopPropagation()
      }}
    />
  )
}
