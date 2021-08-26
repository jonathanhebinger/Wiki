export type ThemeColor = 'primary' | 'contrast'

export const THEME_TEXT_COLOR: Record<ThemeColor, string> = {
  primary: 'text-gray-400', //tw
  contrast: 'text-white', //tw
}
export const THEME_BORDER_COLOR: Record<ThemeColor, string> = {
  primary: 'border-gray-300', //tw
  contrast: 'border-white', //tw
}
export type Surface_Border = 'none' | 'squared' | 'rounded'
export type Surface_Radius = 'none' | 'sm' | 'md' | 'lg'

export const SURFACE_BORDER: Record<Surface_Border, string> = {
  none: '', //tw
  squared: 'border', //tw
  rounded: 'border rounded', //tw
}

export namespace Theme {
  export type Shadow = 'none' | 'sm' | 'md' | 'lg' | 'xl'
  export type Border = 'none' | 'md' | 'lg'
  export type Radius = 'none' | 'sm' | 'md' | 'lg'
}

export const THEME: {
  SHADOW: Record<Theme.Shadow, string>
  BORDER: Record<Theme.Border, string>
  RADIUS: Record<Theme.Radius, string>
} = {
  SHADOW: {
    none: 'shadow-none hover:shadow-none', //tw
    sm: 'shadow-sm hover:shadow', //tw
    md: 'shadow hover:shadow-md', //tw
    lg: 'shadow-md hover:shadow-lg', //tw
    xl: 'shadow-lg hover:shadow-xl', //tw
  },
  BORDER: {
    none: 'border-0', //tw
    md: 'border', //tw
    lg: 'border-2', //tw
  },
  RADIUS: {
    none: 'rounded-none', //tw
    sm: 'rounded', //tw
    md: 'rounded-lg', //tw
    lg: 'rounded-2xl', //tw
  },
}
export function theme$shadow(shadow: Theme.Shadow) {
  return THEME.SHADOW[shadow]
}
export function theme$border(border: Theme.Border) {
  return THEME.BORDER[border]
}
export function theme$radius(radius: Theme.Radius) {
  return THEME.RADIUS[radius]
}
