import './border.scss'
import './radius.scss'
import './shadow.scss'

import { forwardRef } from 'react'

import { Theme } from '../../theme'
import { mergeClassNames } from '../../util/class'
import { BaseProps, QuickProps } from '../../util/type'

export type SurfaceProps = BaseProps<SurfaceClassProps> & QuickProps

export const Surface = forwardRef<HTMLDivElement, SurfaceProps>(
  ({ children, htmlProps, className, ...props }, ref) => {
    const classes = mergeClassNames(getSurfaceClass(props), className)

    return (
      <div className={classes} ref={ref} {...htmlProps}>
        {children}
      </div>
    )
  },
)

export interface SurfaceClassProps {
  contrast?: boolean
  border?: Theme.Border
  radius?: Theme.Radius
  shadow?: Theme.Shadow
}
export function getSurfaceClass({
  contrast = false,
  radius = 'sm',
  border = 'sm',
  shadow = 'sm',
}: SurfaceClassProps): string {
  return mergeClassNames(
    `border--${border}`,
    `radius--${radius}`,
    `shadow--${shadow} shadow--hover`,
    contrast ? 'bg-gray-200' : 'bg-white',
  )
}
