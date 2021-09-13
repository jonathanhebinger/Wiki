import { FontAwesomeIcon, FontAwesomeIconProps } from '@fortawesome/react-fontawesome'

export interface IconProps extends Omit<FontAwesomeIconProps, 'size'> {
  className?: string
}
export function Icon({ className = '', onClick, ...props }: IconProps) {
  return (
    <div className={`flex ` + className} onClick={onClick as any}>
      <FontAwesomeIcon className="flex-grow h-full w-full" {...props} />
    </div>
  )
}
