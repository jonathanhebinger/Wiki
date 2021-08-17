export function clone(value: any) {
  if (Array.isArray(value)) {
    return value.map(value => clone(value))
  } else if (typeof value === 'object') {
    return Object.fromEntries(
      Object.entries(([key, value]) => {
        return [key, clone(value)]
      }),
    )
  }
  return value
}
