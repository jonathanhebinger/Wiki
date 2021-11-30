import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import { mergeClassNames } from '../../util/class'
import { Button, ButtonProps } from './button'
import { IconProps } from './icon'

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
