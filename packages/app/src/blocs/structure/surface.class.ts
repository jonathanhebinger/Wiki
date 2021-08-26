import { Theme, theme$border, theme$radius, theme$shadow } from 'src/blocs/theme'
import { mergeClassNames } from 'src/blocs/util'

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
export interface Surface$class_Props {
  className?: string
  border?: Theme.Border
  radius?: Theme.Radius
  shadow?: Theme.Shadow
  squared?: boolean
  contrast?: boolean
}
export function Surface$class({
  className = '',
  radius = 'sm',
  border = 'md',
  shadow = 'md',
  squared = false,
  contrast = false,
}: Surface$class_Props): string {
  return mergeClassNames(
    theme$border(border),
    theme$radius(squared ? 'none' : radius),
    theme$shadow(shadow),
    contrast ? 'bg-gray-200' : 'bg-white',
    className,
  )
}
