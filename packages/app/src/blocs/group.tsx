import { Surface, Surface_Props } from './surface'

const SPACING: Record<GroupPropsSpacing, string> = {
  sm: 'p-1 space-y-1', //tw
  md: 'p-2 space-y-2', //tw
  lg: 'p-3 space-y-3', //tw
}

export type GroupProps = Surface_Props & { spacing?: GroupPropsSpacing }
export type GroupPropsSpacing = 'sm' | 'md' | 'lg'
export function Group({
  className = '',
  spacing = 'md',
  ...props
}: GroupProps) {
  return (
    <Surface
      shadow="small"
      className={`flex flex-col bg-gray-200 ${SPACING[spacing]} ${className}`}
      {...props}
    />
  )
}

export function GroupItem({ className = '', ...props }: Surface_Props) {
  return <Surface className={`bg-white ${className}`} {...props} />
}

export function GroupLabel({ children }: { children: React.ReactNode }) {
  return (
    <div className="uppercase text-white font-bold text-lg">{children}</div>
  )
}
