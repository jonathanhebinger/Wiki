import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Button, ButtonProps } from 'src/blocs/button'
import { IconProps } from 'src/blocs/icon'
import { mergeClassNames } from 'src/blocs/util'

export type ButtonIconSize = 'xs' | 'sm' | 'md' | 'lg'
export const BUTTON_ICON_SIZE: Record<ButtonIconSize, string> = {
  xs: 'h-6 w-6',
  sm: 'h-7 w-7',
  md: 'h-8 w-8',
  lg: 'h-10 w-10',
}

export function ButtonIcon({
  size = 'sm',
  icon,
  iconProps,
  className,
  ...props
}: ButtonProps & {
  size?: ButtonIconSize
  icon: IconProps['icon']
  iconProps?: Omit<IconProps, 'icon'>
}) {
  return (
    <Button
      className={mergeClassNames(
        'p-1 flex justify-center content-center',
        BUTTON_ICON_SIZE[size],
        className,
      )}
      {...props}
    >
      <FontAwesomeIcon
        className="flex-grow h-full w-full"
        icon={icon}
        {...iconProps}
      />
    </Button>
  )
}
