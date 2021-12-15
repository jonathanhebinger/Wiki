import { Box } from '@mui/material'

import { surfaceSx, SurfaceSxProps } from './Surface.sx'

export interface SurfaceProps extends SurfaceSxProps {}

export function Surface({ children, ...props }: React.PropsWithChildren<SurfaceProps>) {
  return <Box sx={surfaceSx(props)}>{children}</Box>
}
