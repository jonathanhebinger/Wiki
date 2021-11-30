export type Classname = string | undefined | false
export function mergeClassNames(...classNames: Classname[]): string {
  return classNames.reduce((classes: string, className) => {
    return className ? `${classes} ${className}` : classes
  }, '')
}
