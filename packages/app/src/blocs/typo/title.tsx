import { QuickProps } from 'src/blocs/type'

import { THEME_BORDER_COLOR, THEME_TEXT_COLOR } from '../theme'
import { DivProps, mergeClassNames } from '../util'

export type TitleSizing = 'sm' | 'md' | 'lg' | 'xl'

export const TITLE_TEXT_SIZE: Record<TitleSizing, string> = {
  sm: 'text-sm', //tw
  md: 'text-base', //tw
  lg: 'text-lg', //tw
  xl: 'text-xl', //tw
}

export type TitleProps = Pick<DivProps, 'onClick'> &
  QuickProps & {
    size?: TitleSizing
    color?: 'primary' | 'contrast'
    uppercase?: boolean
    underline?: boolean
    bold?: boolean
    pointer?: boolean
  }

export function Title({
  size = 'md',
  color = 'primary',
  uppercase = true,
  underline = true,
  bold = true,
  pointer = false,
  children,
  className,
  ...props
}: TitleProps) {
  const CLASS = mergeClassNames(
    bold && 'font-bold',
    uppercase && 'uppercase',
    underline && `border-b ${THEME_BORDER_COLOR[color]}`,
    pointer && 'cursor-pointer',
    THEME_TEXT_COLOR[color],
    TITLE_TEXT_SIZE[size],
    className,
  )
  return (
    <div className={CLASS} {...props}>
      {children}
    </div>
  )
}
