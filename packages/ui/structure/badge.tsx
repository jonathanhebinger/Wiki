import { Grid, SxProps } from '@mui/material'
import React from 'react'

import { mergeSx } from '../theme'
import { badgeActionSx, badgeItemSx, BadgeSize, badgeSx } from './Badge.sx'
import { Divider } from './Divider'

export interface BadgeProps {
  size?: BadgeSize
  label: React.ReactNode
  onClick?: () => void
  onDelete?: () => void
  actions?: {
    label: React.ReactNode
    action: () => void
  }[]
  sx?: SxProps
}
export function Badge({
  size = 'small',
  label,
  onClick,
  onDelete,
  actions = [],
  sx = [],
}: BadgeProps) {
  if (onDelete) {
    actions.push({ label: 'X', action: onDelete })
  }

  const Actions = actions.map(({ action, label }, index) => (
    <BadgeAction action={action} key={index} size={size}>
      {label}
    </BadgeAction>
  ))

  return (
    <Grid
      container
      justifyContent="space-between"
      sx={mergeSx(badgeSx(!!onClick), sx)}
      onClick={e => {
        e.stopPropagation()
        onClick && onClick()
      }}
    >
      <Grid item sx={badgeItemSx(size)}>
        {label}
      </Grid>
      {Actions}
    </Grid>
  )
}

export interface BadgeActionProps {
  size: BadgeSize
  action: () => void
}
export function BadgeAction({
  action,
  children,
  size,
}: React.PropsWithChildren<BadgeActionProps>) {
  return (
    <>
      <Divider />
      <Grid
        item
        sx={badgeActionSx(size)}
        onClick={e => {
          e.stopPropagation()
          action()
        }}
      >
        {children}
      </Grid>
    </>
  )
}
