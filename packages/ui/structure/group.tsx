import { Box } from '@mui/material'
import React from 'react'

import { Title, TitleProps } from '../typo/title'
import { Shelf, ShelfProps } from './Shelf'
import { SurfaceProps } from './Surface'
import { surfaceSx } from './Surface.sx'

export type GroupProps = Pick<SurfaceProps, 'shadow' | 'contrast'> & ShelfProps
export function Group({
  contrast = true,
  spacing = 'md',
  sx = [],
  ...props
}: GroupProps) {
  return (
    <Shelf
      sx={surfaceSx({ shadow: 'sm', contrast, sx })}
      spacing={spacing}
      {...props}
    />
  )
}

export function GroupItem(props: SurfaceProps) {
  return <Box sx={surfaceSx({ ...props, sx: { background: 'white' } })} />
}
export function GroupTitle(props: TitleProps) {
  return <Title color="contrast" size="lg" {...props} />
}
