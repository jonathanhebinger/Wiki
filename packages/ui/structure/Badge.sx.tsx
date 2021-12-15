import { SxBuilder } from '../theme'
import { surfaceSx } from './Surface.sx'

export type BadgeSize = 'small' | 'medium'

export const badgeSx: SxBuilder<boolean> = pointer => {
  return surfaceSx({
    border: 'md',
    shadow: 'md',
    radius: 'lg',
    sx: [{ overflow: 'hidden' }, pointer ? { cursor: 'pointer' } : {}],
  })
}
export const badgeItemSx: SxBuilder<BadgeSize> = size => {
  return {
    px: size === 'small' ? 2 : 3,
    py: size === 'small' ? 0 : 1,
  }
}
export const badgeActionSx: SxBuilder<BadgeSize> = size => {
  return {
    '&:hover': {
      bgcolor: 'grey.100',
    },
    cursor: 'pointer',
    ...badgeItemSx(size),
  }
}
