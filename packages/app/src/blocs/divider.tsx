export function Divider({
  direction = 'horizontal',
  className = '',
}: {
  direction?: 'vertical' | 'horizontal'
  className?: string
}) {
  return direction === 'horizontal' ? (
    <div className={'border-t self-stretch ' + className}></div>
  ) : (
    <div className={'border-r self-stretch ' + className}></div>
  )
}
