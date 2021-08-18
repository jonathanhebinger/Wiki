import { forwardRef } from 'react'

export type Surface_Props = Surface_Classname_Props & {
  children?: React.ReactNode
  htmlProps?: React.DetailedHTMLProps<
    React.HTMLAttributes<HTMLDivElement>,
    HTMLDivElement
  >
}
export type Surface_Props_Border = 'none' | 'squared' | 'rounded'
export type Surface_Props_Radius = 'none' | 'small' | 'normal' | 'large'
export type Surface_Props_Shadow = 'none' | 'small' | 'normal' | 'large'

const BORDER: Record<Surface_Props_Border, string> = {
  none: '', //tw
  squared: 'border', //tw
  rounded: 'border rounded', //tw
}
const RADIUS: Record<Surface_Props_Radius, string> = {
  none: '',
  small: 'rounded', //tw
  normal: 'rounded-lg', //tw
  large: 'rounded-2xl', //tw
}
const SHADOW: Record<Surface_Props_Shadow, string> = {
  none: '',
  small: 'shadow-sm hover:shadow', //tw
  normal: 'shadow hover:shadow-md', //tw
  large: 'shadow-md hover:shadow-lg', //tw
}

export interface Surface_Classname_Props {
  className?: string
  border?: Surface_Props_Border
  radius?: Surface_Props_Radius
  shadow?: Surface_Props_Shadow
}
export function surface_className({
  className = '',
  radius = 'small',
  border = 'rounded',
  shadow = 'normal',
}: Surface_Classname_Props): string {
  return (
    ` ${BORDER[border]}` +
    ` ${border !== 'squared' ? RADIUS[radius] : ''}` +
    ` ${SHADOW[shadow]}` +
    ` ${className}`
  )
}

export const Surface = forwardRef<HTMLDivElement, Surface_Props>(
  ({ children, htmlProps, ...props }, ref) => {
    return (
      <div className={surface_className(props)} {...htmlProps} ref={ref}>
        {children}
      </div>
    )
  },
)
