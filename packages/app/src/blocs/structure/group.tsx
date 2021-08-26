import { Shelf$class, Shelf_Props } from 'src/blocs/structure/shelf'
import { Title, TitleProps } from 'src/blocs/typo/title'
import { mergeClassNames } from 'src/blocs/util'

import { Surface, Surface_Props } from './surface'

export interface GroupProps extends Surface_Props, Shelf_Props {
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
        Shelf$class({ spacing, row, noPadding }),
        className,
      )}
      contrast={contrast}
      {...props}
    />
  )
}

export function GroupItem({ className = '', ...props }: Surface_Props) {
  return <Surface className={`bg-white ${className}`} {...props} />
}

export function GroupTitle(props: TitleProps) {
  return <Title color="contrast" size="lg" {...props} />
}
