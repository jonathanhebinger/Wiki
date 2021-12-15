import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { SxProps } from '@mui/material'

import { Button, ButtonProps } from './Button'
import { IconProps } from './icon'

export type ButtonIconSize = 'xs' | 'sm' | 'md' | 'lg'
export const BUTTON_ICON_SIZE: Record<ButtonIconSize, number> = {
  xs: 6,
  sm: 7,
  md: 8,
  lg: 10,
}

export function ButtonIcon({
  sx = [],
  size = 'sm',
  icon,
  iconProps,
  ...props
}: ButtonProps & {
  sx?: SxProps
  size?: ButtonIconSize
  icon: IconProps['icon']
  iconProps?: Omit<IconProps, 'icon'>
}) {
  return (
    <Button
      sx={{
        p: 1,
        display: 'flex',
        justifyContent: 'center',
        alignContent: 'center',
        width: BUTTON_ICON_SIZE[size],
        height: BUTTON_ICON_SIZE[size],
      }}
      {...props}
    >
      <FontAwesomeIcon
        style={{
          flexGrow: 1,
          width: '100%',
          height: '100%',
        }}
        icon={icon}
        {...iconProps}
      />
    </Button>
  )
}
