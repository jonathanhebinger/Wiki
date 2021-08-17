export function onDefined<T, R>(item: T | undefined, handler: (item: T) => R) {
  if (item !== undefined) {
    return handler(item)
  }
}
