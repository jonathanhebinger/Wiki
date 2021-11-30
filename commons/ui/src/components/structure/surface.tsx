import { forwardRef } from 'react'

import { Theme, theme$border, theme$radius, theme$shadow } from '../../theme'
import { mergeClassNames } from '../../util/class'
import { QuickProps } from '../../util/type'

export interface SurfaceProps extends SurfaceClassProps, QuickProps {}

export const Surface = forwardRef<HTMLDivElement, SurfaceProps>(
  ({ children, htmlProps, ...props }, ref) => {
    return (
      <div className={getSurfaceClass(props)} {...htmlProps} ref={ref}>
        {children}
      </div>
    )
  },
)

export type Surface_Border = 'none' | 'squared' | 'rounded'
export type Surface_Radius = 'none' | 'sm' | 'md' | 'lg'

export const SURFACE_BORDER: Record<Surface_Border, string> = {
  none: '', //tw
  squared: 'border', //tw
  rounded: 'border rounded', //tw
}
export const SURFACE_RADIUS: Record<Surface_Radius, string> = {
  none: '',
  sm: 'rounded', //tw
  md: 'rounded-lg', //tw
  lg: 'rounded-2xl', //tw
}
export interface SurfaceClassProps {
  className?: string
  border?: Theme.Border
  radius?: Theme.Radius
  shadow?: Theme.Shadow
  squared?: boolean
  contrast?: boolean
  borderless?: boolean
  shadowless?: boolean
}
export function getSurfaceClass({
  className = '',
  radius = 'sm',
  border = 'md',
  shadow = 'md',
  squared = false,
  contrast = false,
  borderless = false,
  shadowless = false,
}: SurfaceClassProps): string {
  return mergeClassNames(
    borderless || theme$border(border),
    squared || theme$radius(radius),
    shadowless || theme$shadow(shadow),
    contrast ? 'bg-gray-200' : 'bg-white',
    className,
  )
}
