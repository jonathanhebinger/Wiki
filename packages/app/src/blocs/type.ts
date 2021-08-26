export type QuickProps<
  E extends HTMLElement = HTMLDivElement,
  P extends keyof React.DetailedHTMLProps<React.HTMLAttributes<E>, E> = 'id',
> = {
  children?: React.ReactNode
  className?: string
  htmlProps?: React.DetailedHTMLProps<React.HTMLAttributes<E>, E>
} & Partial<Pick<React.DetailedHTMLProps<React.HTMLAttributes<E>, E>, P>>
