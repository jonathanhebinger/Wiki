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
  export type Shadow = 'none' | 'sm' | 'md' | 'lg'
  export type Border = 'none' | 'sm' | 'md' | 'lg'
  export type Radius = 'none' | 'sm' | 'md' | 'lg' | 'full'
}

export function theme$shadow(shadow: Theme.Shadow, hover = true) {
  return `shadow--${shadow} ${hover ? 'shadow--hover' : ''}`
}
export function theme$border(border: Theme.Border) {
  return `border--${border}`
}
export function theme$radius(radius: Theme.Radius) {
  return `radius--${radius}`
}
