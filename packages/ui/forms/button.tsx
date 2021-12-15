import { Button as MatButton, SxProps } from '@mui/material'
import React from 'react'

import { SurfaceProps } from '../structure'

export type ButtonProps = Pick<SurfaceProps, 'contrast' | 'squared'> & {
  sx?: SxProps
  onClick?: () => void
}

export function Button({
  contrast,
  squared,
  ...props
}: React.PropsWithChildren<ButtonProps>) {
  return <MatButton {...props} variant={contrast ? 'contained' : 'outlined'} />
}
