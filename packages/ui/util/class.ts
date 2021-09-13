export function mergeClassNames(
  ...classNames: (string | undefined | boolean)[]
) {
  return classNames.filter(className => className).join(' ')
}

export type DivProps = React.DetailedHTMLProps<
  React.HTMLAttributes<HTMLDivElement>,
  HTMLDivElement
>
