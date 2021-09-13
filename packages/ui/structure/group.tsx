import React from 'react'

import { Title, TitleProps } from '../typo/title'
import { mergeClassNames } from '../util/class'
import { getShelfClass, ShelfProps } from './shelf'
import { Surface, SurfaceProps } from './surface'

export interface GroupProps extends SurfaceProps, ShelfProps {
  contrast?: boolean
}
export function Group({
  className = '',
  contrast = true,
  spacing = 'md',
  noPadding,
  row,
  ...props
}: GroupProps) {
  return (
    <Surface
      shadow="sm"
      className={mergeClassNames(
        getShelfClass({ spacing, row, noPadding }),
        className,
      )}
      contrast={contrast}
      {...props}
    />
  )
}

export function GroupItem({ className = '', ...props }: SurfaceProps) {
  return <Surface className={`bg-white ${className}`} {...props} />
}

export function GroupTitle(props: TitleProps) {
  return <Title color="contrast" size="lg" {...props} />
}
