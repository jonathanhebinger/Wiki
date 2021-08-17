import React from 'react'
import { Divider } from 'src/blocs/divider'
import { surface_className } from 'src/blocs/surface'

export interface Badge_Props {
  className?: string
  size?: Badge_Props_Sizing
  label: React.ReactNode
  onClick?: () => void
  onDelete?: () => void
  actions?: {
    label: React.ReactNode
    action: () => void
  }[]
}
export type Badge_Props_Sizing = 'small' | 'medium'

export function Badge({
  size = 'small',
  className = '',
  label,
  onClick,
  onDelete,
  actions = [],
}: Badge_Props) {
  const CURSOR = onClick ? 'cursor-pointer' : ''
  const CLASS = `${SURFACE} ${CONTENT} ${CURSOR} ${className}`

  if (onDelete) {
    actions.push({ label: 'X', action: onDelete })
  }

  const Actions = actions.map(({ action, label }, index) => (
    <BadgeAction action={action} key={index} size={size}>
      {label}
    </BadgeAction>
  ))

  return (
    <div className={CLASS} onClick={onClick}>
      <div className={SPACING[size]}>{label}</div>
      {Actions}
    </div>
  )
}

export interface BadgeActionProps {
  size: Badge_Props_Sizing
  action: () => void
  children: React.ReactNode
}
export function BadgeAction({ action, children, size }: BadgeActionProps) {
  return (
    <>
      <Divider direction="vertical" />
      <span
        className={`${SPACING[size]} hover:bg-gray-100 cursor-pointer`}
        onClick={action}
      >
        {children}
      </span>
    </>
  )
}

const SPACING: Record<Badge_Props_Sizing, string> = {
  small: 'px-2', //tw
  medium: 'px-3 py-1', //tw
}
const SURFACE = surface_className({
  border: 'rounded',
  shadow: 'normal',
  radius: 'large',
})
const CONTENT = 'flex justify-between overflow-hidden' //tw
