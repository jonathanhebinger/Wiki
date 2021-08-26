import { QuickProps } from 'src/blocs/type'
import { mergeClassNames } from 'src/blocs/util'

export type ShelfSpacing = 'sm' | 'md' | 'lg'
export const SHELF_PADDING: Record<ShelfSpacing, string> = {
  sm: 'p-1', //tw
  md: 'p-2', //tw
  lg: 'p-3', //tw
}
export const SHELF_SPACING_COL: Record<ShelfSpacing, string> = {
  sm: 'space-y-1', //tw
  md: 'space-y-2', //tw
  lg: 'space-y-3', //tw
}
export const SHELF_SPACING_ROW: Record<ShelfSpacing, string> = {
  sm: 'space-x-1', //tw
  md: 'space-x-2', //tw
  lg: 'space-x-3', //tw
}

export interface Shelf_Props extends Shelf$class_Props, QuickProps {
  spacing?: ShelfSpacing
  htmlProps?: React.DetailedHTMLProps<
    React.HTMLAttributes<HTMLDivElement>,
    HTMLDivElement
  >
}
export function Shelf({
  children,
  htmlProps,
  className,
  ...props
}: Shelf_Props) {
  const CLASS = mergeClassNames(Shelf$class(props), className)

  return (
    <div className={CLASS} {...htmlProps}>
      {children}
    </div>
  )
}

export interface Shelf$class_Props {
  row?: boolean
  sm?: boolean
  spacing?: ShelfSpacing
  noPadding?: boolean
}
export function Shelf$class({
  row = false,
  sm = false,
  spacing = 'md',
  noPadding = false,
}: Shelf$class_Props) {
  spacing = sm ? 'sm' : spacing

  return mergeClassNames(
    'flex',
    row ? 'flex-row' : 'flex-col',
    row ? SHELF_SPACING_ROW[spacing] : SHELF_SPACING_COL[spacing],
    noPadding ? 'p-0' : SHELF_PADDING[spacing],
  )
}
