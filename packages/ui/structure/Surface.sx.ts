import { SxProps } from '@mui/material'

import { mergeSx, SxBuilder, WEIGHT } from '../theme'

export interface SurfaceSxProps {
  sx?: SxProps

  shadow?: 'none' | 'sm' | 'md' | 'lg' | 'xl'
  shadowless?: boolean

  border?: 'none' | 'sm' | 'md' | 'lg'
  borderless?: boolean

  squared?: boolean
  radius?: 'none' | 'sm' | 'md' | 'lg' | 'full'

  contrast?: boolean
}

export const surfaceSx: SxBuilder<SurfaceSxProps> = props => {
  const {
    shadowless = false,
    shadow = shadowless ? 'none' : 'md',

    borderless = false,
    border = borderless ? 'none' : 'sm',

    squared = false,
    radius = squared ? 'none' : 'sm',

    sx = [],
  } = props

  return mergeSx(
    {
      border: WEIGHT[border],
      borderRadius: WEIGHT[radius],
      boxShadow: WEIGHT[shadow],
    },
    sx,
  )
}
