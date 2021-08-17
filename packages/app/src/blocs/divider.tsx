export function Divider({
  direction = 'horizontal',
}: {
  direction?: 'vertical' | 'horizontal'
}) {
  return direction === 'horizontal' ? (
    <div className="border-t self-stretch"></div>
  ) : (
    <div className="border-r self-stretch"></div>
  )
}
