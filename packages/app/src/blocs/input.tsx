export function Input({ value }: { value: string | number }) {
  return (
    <input
      type="text"
      className="outline-none bg-gray-100 rounded px-2 text-gray-700"
      defaultValue={value}
    />
  )
}
