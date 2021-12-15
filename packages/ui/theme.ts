import { SxProps } from '@mui/material'

export const WEIGHT = {
  none: 0,
  sm: 1,
  md: 2,
  lg: 3,
  xl: 4,
  full: '50%',
}

export type SxBuilder<Props> = (props: Props) => SxProps

export function mergeSx(...sxs: SxProps[]) {
  return sxs.flat()
}
