export function mergeClassNames(...classNames: (string | undefined | false)[]) {
  return classNames.filter(className => className).join(' ')
}

export type DivProps = React.DetailedHTMLProps<
  React.HTMLAttributes<HTMLDivElement>,
  HTMLDivElement
>
