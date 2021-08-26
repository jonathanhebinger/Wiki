import { forwardRef } from 'react'
import { QuickProps } from 'src/blocs/type'

import { Surface$class, Surface$class_Props } from './surface.class'

export type Surface_Props = Surface$class_Props & QuickProps

export const Surface = forwardRef<HTMLDivElement, Surface_Props>(
  ({ children, htmlProps, ...props }, ref) => {
    return (
      <div className={Surface$class(props)} {...htmlProps} ref={ref}>
        {children}
      </div>
    )
  },
)
