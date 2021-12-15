import { Grid, SxProps } from '@mui/material'

import { mergeSx, WEIGHT } from '../theme'

export type ShelfSpacing = 'none' | 'sm' | 'md' | 'lg'

export interface ShelfClassProps {
  sx?: SxProps
  row?: boolean
  sm?: boolean
  border?: boolean
  spacing?: ShelfSpacing
  noPadding?: boolean
}

export interface ShelfProps extends ShelfClassProps {}
export function Shelf({
  children,
  sx = [],
  row = false,
  sm = false,
  border = false,
  spacing = 'md',
  noPadding = false,
}: React.PropsWithChildren<ShelfProps>) {
  return (
    <Grid
      container
      spacing={WEIGHT[spacing]}
      sx={mergeSx(
        {
          padding: noPadding ? 0 : WEIGHT[spacing],
          border: border ? 1 : 0,
        },
        sx,
      )}
    >
      {children}
    </Grid>
  )
}
