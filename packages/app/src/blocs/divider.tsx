export function Divider({
  direction = 'horizontal',
  className = '',
}: {
  direction?: 'vertical' | 'horizontal'
  className?: string
}) {
  return direction === 'horizontal' ? (
    <div className={'border-t-2 self-stretch ' + className}></div>
  ) : (
    <div className={'border-r-2 self-stretch ' + className}></div>
  )
}
